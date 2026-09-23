import { ROSD } from "./config.mjs";

/* ================================================================ */
/* Utilitaires                                                       */
/* ================================================================ */
export const signed = n => (Number(n) >= 0 ? `+${Number(n)}` : `${Number(n)}`);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/**
 * Lance un d20. Pour un héros (ranger ou compagnon), le dé prend la couleur
 * choisie dans les paramètres (Dice So Nice) ; les créatures gardent l'apparence native.
 */
async function d20(hero = false) {
  const roll = await new Roll("1d20").evaluate();
  if (hero) {
    const color = game.settings.get("rosd", "heroDiceColor") || "#0d2b5e";
    const appearance = { background: color, edge: color, foreground: "#ffffff", outline: "#000000", texture: "none" };
    for (const die of roll.dice) die.options.appearance = appearance;
  }
  return { roll, value: roll.total };
}
const heroOf = actor => !!actor && actor.type !== "creature";

async function showDice(rolls) {
  if (!game.dice3d) return;
  for (const r of rolls) await game.dice3d.showForRoll(r, game.user, true);
}

function readForm(form) {
  const out = {};
  for (const el of form.elements) {
    if (!el.name) continue;
    if (el.type === "checkbox") out[el.name] = el.checked;
    else if (el.type === "number") out[el.name] = el.value === "" ? 0 : Number(el.value);
    else out[el.name] = el.value;
  }
  return out;
}

async function askDialog(title, content, label = "Lancer") {
  return foundry.applications.api.DialogV2.wait({
    window: { title },
    classes: ["rosd", "rosd-dialog"],
    content,
    buttons: [
      { action: "roll", label, icon: "fa-solid fa-dice-d20", default: true,
        callback: (event, button) => readForm(button.form) },
      { action: "cancel", label: "Annuler" }
    ],
    rejectClose: false
  }).then(r => (r && r !== "cancel" ? r : null));
}

function isHero(actor) { return actor && actor.type !== "creature"; }

function unusedAbility(actor, key) {
  return !!actor?.system?.abilities?.find(a => a.key === key && !a.used);
}

export async function markUsed(actor, listName, key, used = true) {
  if (!actor) return;
  const list = foundry.utils.deepClone(actor.system[listName] ?? []);
  const entry = used ? list.find(e => e.key === key && !e.used) : list.find(e => e.key === key && e.used);
  if (!entry) return;
  entry.used = used;
  await actor.update({ [`system.${listName}`]: list });
}

async function postMessage({ actor, content, rolls = [], flags = {} }) {
  const data = {
    speaker: ChatMessage.getSpeaker({ actor }),
    content, rolls, flags: { rosd: flags }
  };
  ChatMessage.applyRollMode(data, game.settings.get("core", "rollMode"));
  return ChatMessage.create(data);
}

/* Message update: direct when allowed, otherwise through the GM */
async function updateMessage(message, changes) {
  if (message.canUserModify(game.user, "update")) return message.update(changes);
  game.socket.emit("system.rosd", { action: "updateMessage", id: message.id, changes });
}

async function updateActorSafe(actor, changes) {
  if (actor.isOwner) return actor.update(changes);
  game.socket.emit("system.rosd", { action: "updateActor", uuid: actor.uuid, changes });
  ui.notifications.info("Update sent to the GM.");
}

export function registerSocket() {
  game.socket.on("system.rosd", async data => {
    if (!game.user.isActiveGM) return;
    if (data.action === "updateMessage") {
      await game.messages.get(data.id)?.update(data.changes);
    } else if (data.action === "updateActor") {
      const actor = await fromUuid(data.uuid);
      await actor?.update(data.changes);
    }
  });
}

/* Combat profile of an actor */
export function combatProfile(actor) {
  const s = actor.system;
  const w = s.weapons ?? {};
  const mi = s.meleeItem, ri = s.rangedItem;
  const melee = ROSD.meleeWeapons[w.melee] ?? ROSD.meleeWeapons.hand;
  const ranged = ROSD.rangedWeapons[w.ranged] ?? ROSD.rangedWeapons.none;
  const diseaseMalus = s.status?.diseased ? -1 : 0;
  const isMagic = it => !!it && it.system.magic && (it.system.property !== "magic" || it.system.active);

  let meleeDmg, meleeLabel, staff, magicMelee;
  if (mi) {
    const ws = mi.system.weapon;
    meleeDmg = ws.kind === "thrown" ? -2 : ws.dmg;
    meleeLabel = mi.name; staff = ws.staff; magicMelee = isMagic(mi) || !!w.magic;
  } else {
    meleeDmg = melee.dmg; meleeLabel = melee.label.split(" (")[0]; staff = !!melee.staff; magicMelee = !!w.magic;
  }
  let rangedDmg, range, rangedLabel, magicRanged;
  if (ri) {
    rangedDmg = ri.system.weapon.dmg; range = ri.system.weapon.range; rangedLabel = ri.name; magicRanged = isMagic(ri);
  } else {
    rangedDmg = w.ranged === "other" ? w.rangedDmg : ranged.dmg;
    range = w.ranged === "other" ? w.rangedRange : ranged.range;
    rangedLabel = ranged.label.split(" (")[0]; magicRanged = false;
  }
  return {
    fight: s.stats.fight.total + (mi ? 0 : (melee.fight ?? 0)) + (w.fightBonus ?? 0) + diseaseMalus,
    shoot: s.stats.shoot.total + (w.shootBonus ?? 0) + diseaseMalus,
    armour: s.stats.armour.total,
    meleeDmg: meleeDmg + (w.dmgBonus ?? 0) + (s.itemDmg ?? 0),
    rangedDmg, range, rangedLabel, meleeLabel, staff,
    hasRanged: !!ri || (w.ranged && w.ranged !== "none"),
    magic: magicMelee, magicRanged,
    mult: w.mult || 1,
    partialImmunity: !!s.flags?.partialImmunity,
    immuneCrit: !!s.flags?.immuneCrit,
    poison: !!s.flags?.poison,
    disease: s.flags?.disease ?? 0,
    large: !!s.flags?.large
  };
}

/* ---------- Objets : recherche et charges ---------- */
export function findPropItem(actor, prop) {
  return actor?.items?.find(i => i.type === "objet" && i.system.property === prop && i.system.equipped
    && (i.system.charges.max === 0 || i.system.charges.value > 0) && i.system.quantity > 0) ?? null;
}

/** Spends a charge (or one unit) of an item and removes it when empty. */
export async function spendItem(item) {
  const sys = item.system;
  if (sys.charges.max > 0) {
    const left = Math.max(0, sys.charges.value - 1);
    if (left === 0 && sys.category === "magic") {
      await item.delete();
      ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: item.parent }),
        content: `<div class="rosd-card"><p><b>${esc(item.name)}</b> has run out of charges and crumbles away.</p></div>` });
      return;
    }
    return item.update({ "system.charges.value": left });
  }
  if (sys.consumable) {
    const left = sys.quantity - 1;
    if (left <= 0 && !(sys.activation && sys.active)) return item.delete();
    return item.update({ "system.quantity": Math.max(0, left) });
  }
}

function getTargets() {
  return Array.from(game.user.targets)
    .filter(t => t.actor)
    .map(t => ({ actor: t.actor, name: t.name ?? t.document?.name ?? t.actor.name }));
}

/* ================================================================ */
/* Jets de compétence / caractéristique                              */
/* ================================================================ */
export async function rollCheck(actor, { kind, key, tn = null }) {
  const s = actor.system;
  let label, bonus;
  if (kind === "skill") { label = ROSD.skills[key]; bonus = s.skills[key] ?? 0; }
  else if (key === "health") { label = "Health"; bonus = s.health.value; }
  else { label = ROSD.stats[key].label; bonus = s.stats[key].total; }

  const canFocus = kind === "skill" && unusedAbility(actor, "focus");
  // Objets : bonus permanents et objets à usage (+5, 1 charge)
  const skillItems = kind === "skill" ? actor.items.filter(i => i.type === "objet" && i.system.equipped
    && [i.system.skills.a, i.system.skills.b].includes(key)) : [];
  const passive = skillItems.filter(i => i.system.skills.mode === "passive");
  const usable = skillItems.filter(i => i.system.skills.mode === "use" && (i.system.charges.max === 0 || i.system.charges.value > 0));
  const passiveBonus = passive.reduce((n, i) => n + i.system.skills.value, 0);
  const staff = key === "will" && s.casterItem === "wizardStaff";
  const diseased = s.status?.diseased;

  const content = `
    <p class="rosd-hint"><b>${label}</b> Roll: 1d20 ${signed(bonus)} against a Target Number (TN).</p>
    <div class="form-group"><label>TN</label><input type="number" name="tn" value="${tn ?? 10}"></div>
    <div class="form-group"><label>Modifier</label><input type="number" name="mod" value="0"></div>
    ${diseased ? `<p class="rosd-hint">Diseased: -1 applied automatically.</p>` : ""}
    ${canFocus ? `<div class="form-group"><label>Focus (+8)</label><input type="checkbox" name="focus"></div>` : ""}
    ${passive.length ? `<p class="rosd-hint">Items: ${passive.map(i => `${esc(i.name)} ${signed(i.system.skills.value)}`).join(", ")} (included).</p>` : ""}
    ${usable.map(i => `<div class="form-group"><label>${esc(i.name)} (${signed(i.system.skills.value)}, ${i.system.charges.value} charge(s))</label><input type="checkbox" name="it_${i.id}"></div>`).join("")}
    ${staff ? `<p class="rosd-hint">Wizard’s staff: you may sacrifice Health after the roll.</p>` : ""}`;
  const f = await askDialog(`${actor.name} — ${label}`, content);
  if (!f) return;

  let itemBonus = passiveBonus;
  const itemLabels = passive.map(i => `${signed(i.system.skills.value)} ${i.name}`);
  for (const i of usable) if (f[`it_${i.id}`]) {
    itemBonus += i.system.skills.value; itemLabels.push(`${signed(i.system.skills.value)} ${i.name}`);
    await spendItem(i);
  }
  const { roll, value } = await d20(heroOf(actor));
  const card = {
    type: "check", itemBonus, itemLabels, uuid: actor.uuid, name: actor.name, label, kind, key,
    bonus, mod: f.mod + (diseased ? -1 : 0), tn: f.tn, die: value, dice: [value],
    focus: !!f.focus, inner: false, staffHp: 0, usedAbility: f.focus ? "focus" : null
  };
  if (f.focus) await markUsed(actor, "abilities", "focus");
  await postMessage({ actor, content: renderCheck(card), rolls: [roll], flags: { card } });
}

function evalCheck(c) {
  c.total = c.die + c.bonus + c.mod + (c.itemBonus || 0) + (c.focus ? 8 : 0) + (c.inner ? 5 : 0) + (c.staffHp || 0);
  c.success = c.die === 20 ? true : c.die === 1 ? false : c.total >= c.tn;
  return c;
}

function renderCheck(c) {
  evalCheck(c);
  const parts = [`die ${c.die}`, `${signed(c.bonus)}`];
  if (c.mod) parts.push(`${signed(c.mod)} mod.`);
  for (const l of c.itemLabels ?? []) parts.push(l);
  if (c.focus) parts.push("+8 Focus");
  if (c.inner) parts.push("+5 Inner Strength");
  if (c.staffHp) parts.push(`+${c.staffHp} staff`);
  const nat = c.die === 20 ? " (natural 20)" : c.die === 1 ? " (natural 1)" : "";
  const btn = [];
  if (!c.usedAbility) {
    btn.push(`<button data-rosd="check-fate" data-owner="${c.uuid}" data-need="handOfFate"><i class="fa-solid fa-dice"></i> Hand of Fate</button>`);
    if (c.key === "will") btn.push(`<button data-rosd="check-inner" data-owner="${c.uuid}" data-need="innerStrength"><i class="fa-solid fa-heart"></i> Inner Strength (+5)</button>`);
  }
  if (!c.fateUsed) btn.push(`<button data-rosd="check-item-fate" data-owner="${c.uuid}" data-prop="fate"><i class="fa-solid fa-gem"></i> Fate Stone</button>`);
  if (c.key === "will" && !c.success) btn.push(`<button data-rosd="check-staff" data-owner="${c.uuid}" data-need-item="wizardStaff"><i class="fa-solid fa-staff-snake"></i> Wizard’s Staff</button>`);
  return `<div class="rosd-card">
    <header><h3>${esc(c.label)}</h3><span class="rosd-tn">TN ${c.tn}</span></header>
    <div class="rosd-result ${c.success ? "ok" : "ko"}">
      <span class="rosd-total">${c.total}</span>
      <span class="rosd-verdict">${c.success ? "Success" : "Failure"}${nat}</span>
    </div>
    <p class="rosd-detail">${parts.join(" · ")}${c.dice.length > 1 ? ` — dice: ${c.dice.join(" → ")}` : ""}</p>
    ${btn.length ? `<div class="rosd-buttons">${btn.join("")}</div>` : ""}
  </div>`;
}

/* ================================================================ */
/* Combat au corps à corps et tir                                   */
/* ================================================================ */
function opponentFields(target, type) {
  if (target) {
    const p = combatProfile(target.actor);
    return `<p class="rosd-hint">Target: <b>${esc(target.name)}</b> — Fight ${signed(p.fight)}, Armour ${p.armour}${type === "melee" ? `, damage ${signed(p.meleeDmg)}` : ""}</p>`;
  }
  return `<p class="rosd-hint">No target selected (press T on a token): enter the opponent.</p>
    <div class="form-group"><label>Name</label><input type="text" name="oppName" value="Opponent"></div>
    <div class="form-group"><label>Fight</label><input type="number" name="oppFight" value="2"></div>
    <div class="form-group"><label>Armour</label><input type="number" name="oppArmour" value="10"></div>
    ${type === "melee" ? `<div class="form-group"><label>Opponent damage mod.</label><input type="number" name="oppDmg" value="0"></div>
    <div class="form-group"><label>Opponent is an evil creature</label><input type="checkbox" name="oppEvil" checked></div>` : ""}`;
}

function sideFromActor(actor, name, type) {
  const p = combatProfile(actor);
  return {
    uuid: actor.uuid, name, isHero: isHero(actor),
    stat: type === "shoot-atk" ? p.shoot : p.fight,
    armour: p.armour,
    dmgMod: type === "melee" ? p.meleeDmg : type === "shoot-atk" ? p.rangedDmg : 0,
    weaponName: type === "melee" ? p.meleeLabel : type === "shoot-atk" ? p.rangedLabel : "",
    mult: type === "def" ? 1 : p.mult, staff: p.staff,
    magic: type === "shoot-atk" ? p.magicRanged : p.magic,
    partialImmunity: p.partialImmunity, immuneCrit: p.immuneCrit,
    poison: p.poison, disease: p.disease, mod: 0, modLabels: [], usedAbility: null
  };
}

function sideManual(f) {
  return {
    uuid: null, name: f.oppName || "Opponent", isHero: f.oppEvil === false,
    stat: f.oppFight ?? 0, armour: f.oppArmour ?? 10, dmgMod: f.oppDmg ?? 0, mult: 1,
    staff: false, magic: false, partialImmunity: false, immuneCrit: false,
    poison: false, disease: 0, mod: 0, modLabels: [], usedAbility: null
  };
}

export async function rollMelee(actor) {
  const target = getTargets()[0];
  const me = combatProfile(actor);
  const frenzy = unusedAbility(actor, "frenziedAttack");
  const defFrenzy = target && unusedAbility(target.actor, "frenziedAttack");
  const content = `
    <p class="rosd-hint"><b>${esc(actor.name)}</b> — Fight ${signed(me.fight)}, ${esc(me.meleeLabel)} (damage ${signed(me.meleeDmg)})</p>
    ${opponentFields(target, "melee")}
    <fieldset><legend>Support (+2 per ally in contact and not fighting elsewhere)</legend>
      <div class="form-group"><label>My supporting allies</label><input type="number" name="supMe" value="0" min="0"></div>
      <div class="form-group"><label>Its supporting allies</label><input type="number" name="supOpp" value="0" min="0"></div>
    </fieldset>
    <div class="form-group"><label>My modifier</label><input type="number" name="modMe" value="0"></div>
    <div class="form-group"><label>Opponent modifier</label><input type="number" name="modOpp" value="0"></div>
    ${frenzy ? `<div class="form-group"><label>Frenzied Attack (+5)</label><input type="checkbox" name="frenzy"></div>` : ""}
    ${defFrenzy ? `<div class="form-group"><label>Defender: Frenzied Attack (+5)</label><input type="checkbox" name="defFrenzy"></div>` : ""}`;
  const f = await askDialog(`${actor.name} — Melee Combat`, content);
  if (!f) return;

  const atk = sideFromActor(actor, actor.name, "melee");
  const def = target ? sideFromActor(target.actor, target.name, "melee") : sideManual(f);
  applySupport(atk, def, f.supMe, f.supOpp);
  if (f.modMe) { atk.mod += f.modMe; atk.modLabels.push(`${signed(f.modMe)} mod.`); }
  if (f.modOpp) { def.mod += f.modOpp; def.modLabels.push(`${signed(f.modOpp)} mod.`); }
  if (f.frenzy) { atk.mod += 5; atk.modLabels.push("+5 frenzied"); atk.usedAbility = "frenziedAttack"; await markUsed(actor, "abilities", "frenziedAttack"); }
  if (f.defFrenzy) { def.mod += 5; def.modLabels.push("+5 frenzied"); def.usedAbility = "frenziedAttack"; await markUsed(target.actor, "abilities", "frenziedAttack"); }

  await launchContest("melee", actor, atk, def);
}

function applySupport(a, b, supA = 0, supB = 0) {
  const net = (supA - supB) * 2;
  if (net > 0) { a.mod += net; a.modLabels.push(`+${net} support`); }
  if (net < 0) { b.mod += -net; b.modLabels.push(`+${-net} support`); }
}

export async function rollShoot(actor, spell = null) {
  const targets = getTargets();
  const me = combatProfile(actor);
  const sp = typeof spell === "string" ? ROSD.spells[spell] : spell;
  if (!sp && !me.hasRanged) {
    return ui.notifications.warn("No missile weapon equipped (see the Equipment tab).");
  }
  const aim = !sp && unusedAbility(actor, "steadyAim");
  const enhanced = sp && unusedAbility(actor, "enhancedPower");
  const item = actor.system.casterItem;
  let spellBonus = 0;
  if (sp?.isItem) spellBonus = sp.attack;
  else if (sp) spellBonus = (item === "holyIcon" && sp.holyIcon ? sp.holyIcon : sp.attack) + (item === "wand" ? 1 : 0);

  const modsHtml = Object.entries(ROSD.shootingMods).map(([k, m]) =>
    `<div class="form-group"><label>${m.label}</label><input type="checkbox" name="sm_${k}"></div>`).join("");
  const defDive = targets.length === 1 && unusedAbility(targets[0].actor, "diveForCover");
  const defBright = targets.length === 1 && findPropItem(targets[0].actor, "brightness");

  const content = `
    <p class="rosd-hint"><b>${esc(actor.name)}</b> — ${sp
      ? `${sp.isItem ? "item" : "spell"} <b>${sp.label}</b>: attack ${signed(spellBonus)} (Shoot is not added)${!sp.isItem && item === "wand" ? ", wand included" : ""}`
      : `Shoot ${signed(me.shoot)}, ${esc(me.rangedLabel)}, range ${me.range}", damage ${signed(me.rangedDmg)}`}</p>
    ${targets.length > 1 && sp ? `<p class="rosd-hint">${targets.length} targets: one attack each.</p>` : opponentFields(targets[0], "shoot")}
    ${sp?.ignoreCover ? `<p class="rosd-hint">Ignores cover and intervening terrain.</p>` : `
    <fieldset><legend>Modifiers (added to the target’s score)</legend>
      <div class="form-group"><label>Intervening terrain pieces (+1 each)</label><input type="number" name="terrain" value="0" min="0"></div>
      ${modsHtml}
    </fieldset>`}
    <div class="form-group"><label>My modifier</label><input type="number" name="modMe" value="0"></div>
    <div class="form-group"><label>Target modifier</label><input type="number" name="modOpp" value="0"></div>
    ${aim ? `<div class="form-group"><label>Steady Aim (+5)</label><input type="checkbox" name="aim"></div>` : ""}
    ${enhanced ? `<div class="form-group"><label>Enhanced Power (3 dice, keep the best)</label><input type="checkbox" name="enhanced"></div>` : ""}
    ${defDive ? `<div class="form-group"><label>Target: Dive for Cover (+10)</label><input type="checkbox" name="dive"></div>` : ""}
    ${defBright ? `<div class="form-group"><label>Target: ${esc(defBright.name)} — Brightness (+5, 1 charge)</label><input type="checkbox" name="bright"></div>` : ""}
    <p class="rosd-hint">You may not shoot at a figure in melee combat (unless it is the only “Large” figure involved).</p>`;
  const f = await askDialog(`${actor.name} — ${sp ? sp.label : "Shoot"}`, content);
  if (!f) return;

  let targetMod = 0; const tLabels = [];
  if (!sp?.ignoreCover) {
    if (f.terrain) { targetMod += f.terrain; tLabels.push(`+${f.terrain} terrain`); }
    for (const [k, m] of Object.entries(ROSD.shootingMods)) {
      if (f[`sm_${k}`]) { targetMod += m.value; tLabels.push(`${signed(m.value)} ${m.label.split(" (")[0].toLowerCase()}`); }
    }
  }
  if (f.modOpp) { targetMod += f.modOpp; tLabels.push(`${signed(f.modOpp)} mod.`); }

  if (f.aim) await markUsed(actor, "abilities", "steadyAim");
  if (f.enhanced) await markUsed(actor, "abilities", "enhancedPower");
  if (f.dive) await markUsed(targets[0].actor, "abilities", "diveForCover");
  if (f.bright && defBright) await spendItem(defBright);

  const list = sp ? (targets.length ? targets : [null]) : [targets[0] ?? null];
  for (const t of list) {
    const atk = sideFromActor(actor, actor.name, "shoot-atk");
    if (sp) { atk.stat = spellBonus; atk.dmgMod = 0; atk.magic = true; atk.mult = 1; atk.spell = sp.label; atk.isItem = !!sp.isItem; atk.weaponName = ""; }
    if (f.modMe) { atk.mod += f.modMe; atk.modLabels.push(`${signed(f.modMe)} mod.`); }
    if (f.aim) { atk.mod += 5; atk.modLabels.push("+5 aim"); atk.usedAbility = "steadyAim"; }
    atk.enhanced = !!f.enhanced;
    const def = t ? sideFromActor(t.actor, t.name, "def") : sideManual(f);
    def.mod += targetMod; def.modLabels.push(...tLabels);
    if (f.dive && t) { def.mod += 10; def.modLabels.push("+10 dive"); def.usedAbility = "diveForCover"; }
    if (f.bright && t) { def.mod += 5; def.modLabels.push("+5 brightness"); }
    await launchContest("shoot", actor, atk, def);
  }
}

async function launchContest(type, actor, atk, def) {
  const rolls = [];
  const a = await d20(atk.isHero); rolls.push(a.roll);
  atk.die = a.value; atk.dice = [a.value];
  if (atk.enhanced) {
    for (let i = 0; i < 2; i++) { const x = await d20(atk.isHero); rolls.push(x.roll); atk.dice.push(x.value); }
    atk.die = Math.max(...atk.dice);
  }
  const d = await d20(def.isHero); rolls.push(d.roll);
  def.die = d.value; def.dice = [d.value];
  const card = { type, atk, def, tieHits: game.settings.get("rosd", "shootTieHits"), applied: {} };
  await postMessage({ actor, content: renderContest(card), rolls, flags: { card } });
}

function resolveContest(c) {
  const { atk: A, def: D } = c;
  const critOf = (s, allowDeadly) => s.isHero && (s.die === 20 || (s.deadly && (s.die === 18 || s.die === 19)));
  for (const s of [A, D]) {
    s.score = s.die + s.stat + s.mod + (s.parry ? 10 : 0);
    s.crit = critOf(s);
  }
  // En tir, le 20 naturel du défenseur lui fait simplement éviter le tir.
  if (c.type === "shoot") D.crit = D.die === 20;

  let winners;
  if (A.crit && !D.crit) winners = ["atk"];
  else if (D.crit && !A.crit) winners = ["def"];
  else if (A.score > D.score) winners = ["atk"];
  else if (D.score > A.score) winners = ["def"];
  else winners = c.type === "melee" ? ["atk", "def"] : (c.tieHits ? ["atk"] : []);
  if (c.type === "shoot") winners = winners.filter(w => w === "atk");
  c.winners = winners;

  c.results = winners.map(w => {
    const W = c[w], L = c[w === "atk" ? "def" : "atk"];
    const lines = [];
    let dmg = W.score + W.dmgMod;
    if (W.dmgMod || W.weaponName) lines.push(`${signed(W.dmgMod)} ${W.weaponName || "weapon"}`);
    if (c.type === "melee" && L.staff) { dmg -= 1; lines.push("-1 opponent’s staff"); }
    if (W.crit && !L.immuneCrit) { dmg += 5; lines.push("+5 critical"); }
    dmg -= L.armour; lines.push(`-${L.armour} armour`);
    dmg = Math.max(0, dmg);
    if (W.mult > 1 && dmg > 0) { dmg *= W.mult; lines.push(`×${W.mult}`); }
    if (W.powerful && dmg > 0) { dmg += 3; lines.push("+3 Powerful Blow"); }
    if (W.elemental && dmg > 0) { dmg += 5; lines.push("+5 Elemental Strike"); }
    if (L.partialImmunity && !W.magic && dmg > 0) { dmg = Math.floor(dmg / 2); lines.push("÷2 partial immunity"); }
    if (W.parry) { dmg = 0; lines.push("Parry: no damage"); }
    if (L.rollPunch && dmg > 0) { dmg = Math.ceil(dmg / 2); lines.push("÷2 Roll with the Punch"); }
    if (L.block && dmg > 0) { dmg = 0; lines.push("blocked by the item"); }
    return { from: w, to: w === "atk" ? "def" : "atk", dmg, lines };
  });
  return c;
}

function sideHtml(s, label) {
  const dice = s.dice.length > 1 ? `<span class="rosd-dice">${s.dice.join(" / ")}</span>` : "";
  const nat = s.die === 20 ? "nat20" : s.die === 1 ? "nat1" : "";
  return `<div class="rosd-side ${s.win ? "win" : ""}">
    <div class="rosd-side-name">${label} <b>${esc(s.name)}</b></div>
    <div class="rosd-side-roll"><span class="rosd-die ${nat}">${s.die}</span>${dice}
      <span class="rosd-score">${s.score}</span></div>
    <div class="rosd-side-mods">${signed(s.stat)} ${s.spell ? "spell" : ""} ${s.modLabels.join(" ")}${s.parry ? " +10 Parry" : ""}${s.crit ? ` <b class="rosd-crit">${s.die === 20 ? "Critical" : "Critical (Deadly)"}</b>` : ""}</div>
  </div>`;
}

function renderContest(c) {
  resolveContest(c);
  c.atk.win = c.winners.includes("atk");
  c.def.win = c.winners.includes("def");
  const isMelee = c.type === "melee";
  const title = isMelee ? "Melee Combat" : c.atk.spell ? `${c.atk.isItem ? "Item" : "Spell"}: ${c.atk.spell}` : `Shooting${c.atk.weaponName ? ` — ${c.atk.weaponName}` : ""}`;

  let verdict;
  if (isMelee) {
    verdict = c.winners.length === 2 ? "Tie: both fighters strike and remain in combat."
      : `<b>${esc(c[c.winners[0]].name)}</b> wins the fight.`;
  } else verdict = c.winners.length ? "Hit!" : "Miss.";

  const results = c.results.map((r, i) => {
    const target = c[r.to];
    const applied = c.applied?.[i];
    const btn = r.dmg > 0 && target.uuid && !applied
      ? `<button data-rosd="apply-dmg" data-index="${i}"><i class="fa-solid fa-heart-crack"></i> Apply ${r.dmg} to ${esc(target.name)}</button>` : "";
    return `<div class="rosd-dmg"><span class="rosd-dmg-n">${r.dmg}</span>
      <span>damage to <b>${esc(target.name)}</b>${applied ? " ✔" : ""}
      <small>score ${c[r.from].score} · ${r.lines.join(" · ")} = <b>${r.dmg}</b></small></span>${btn}</div>`;
  }).join("");

  const btns = [];
  for (const side of ["atk", "def"]) {
    const s = c[side];
    if (!s.isHero || !s.uuid || s.usedAbility) continue;
    const res = c.results.find(r => r.from === side);
    const taken = c.results.find(r => r.to === side);
    const b = (need, label, icon) => btns.push(
      `<button data-rosd="use" data-side="${side}" data-need="${need}" data-owner="${s.uuid}"><i class="fa-solid ${icon}"></i> ${esc(s.name)} : ${label}</button>`);
    b("handOfFate", "Hand of Fate", "fa-dice");
    if ((s.die === 18 || s.die === 19) && !s.deadly) {
      if (isMelee) b("deadlyStrike", "Deadly Strike", "fa-skull");
      else if (side === "atk") b("deadlyShot", "Deadly Shot", "fa-bullseye");
    }
    if (isMelee) {
      if (!s.parry) b("parry", "Parry (+10)", "fa-shield-halved");
      if (res && res.dmg >= 1 && !s.powerful && !s.parry) b("powerfulBlow", "Powerful Blow (+3)", "fa-hammer");
      if (taken && taken.dmg > 0 && !s.rollPunch) b("rollWithThePunch", "Roll with the Punch (÷2)", "fa-person-falling");
    }
  }
  // Objets aux propriétés spéciales (indépendants des capacités héroïques)
  for (const side of ["atk", "def"]) {
    const s = c[side];
    if (!s.uuid) continue;
    const res = c.results.find(r => r.from === side);
    const taken = c.results.find(r => r.to === side);
    const b = (prop, label, icon) => btns.push(
      `<button data-rosd="item" data-side="${side}" data-prop="${prop}" data-owner="${s.uuid}"><i class="fa-solid ${icon}"></i> ${esc(s.name)} : ${label}</button>`);
    if (!s.fateUsed) b("fate", "Fate Stone (reroll)", "fa-gem");
    if (isMelee && taken && taken.dmg > 0 && !s.block) b("blocking", "Blocking (no damage)", "fa-shield");
    if (isMelee && res && res.dmg >= 1 && !s.elemental) b("elemental", "Elemental Strike (+5)", "fa-bolt");
  }

  return `<div class="rosd-card rosd-contest">
    <header><h3>${title}</h3></header>
    <div class="rosd-sides">${sideHtml(c.atk, isMelee ? "Attacker" : "Shooter")}${sideHtml(c.def, isMelee ? "Defender" : "Target")}</div>
    <p class="rosd-verdict-line">${verdict}</p>
    ${results}
    ${isMelee && c.winners.length === 1 ? `<p class="rosd-hint">The winner may stay in contact, push the loser back 1" or move back 1".</p>` : ""}
    ${btns.length ? `<div class="rosd-buttons">${btns.join("")}</div>` : ""}
  </div>`;
}

/* ================================================================ */
/* Sorts et capacités                                               */
/* ================================================================ */
export async function castSpell(actor, key) {
  const sp = ROSD.spells[key];
  if (!sp) return;
  if (!actor.system.spells.find(s => s.key === key && !s.used)) {
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: sp.label }, content: `<p>This spell has already been cast this scenario. Cast it anyway?</p>`
    });
    if (!ok) return;
  }
  const img = actor.system.spells.find(s => s.key === key && s.img)?.img ?? "";
  await markUsed(actor, "spells", key);
  if (sp.attack) return rollShoot(actor, key);

  const targets = getTargets();
  const item = actor.system.casterItem;
  const card = { type: "spell", uuid: actor.uuid, name: actor.name, key, img,
    targets: targets.map(t => ({ uuid: t.actor.uuid, name: t.name })), done: {} };
  if (sp.will) card.will = sp.will + (item === "focusingCrystal" ? 2 : 0);
  if (sp.heal) card.heal = sp.heal + (item === "holyIcon" ? 1 : 0);
  await postMessage({ actor, content: renderSpell(card), flags: { card } });
}

function renderSpell(c) {
  const sp = ROSD.spells[c.key];
  const tgt = c.targets.length ? c.targets : [{ uuid: "", name: "selected token" }];
  const btns = [];
  if (c.will) tgt.forEach((t, i) => !c.done[i] && btns.push(
    `<button data-rosd="resist" data-index="${i}" data-tn="${c.will}"><i class="fa-solid fa-brain"></i> ${esc(t.name)}: Will TN ${c.will}</button>`));
  if (c.heal) {
    const list = c.targets.length ? c.targets : [{ uuid: c.uuid, name: c.name }];
    list.forEach((t, i) => !c.done[`h${i}`] && btns.push(
      `<button data-rosd="heal" data-index="${i}" data-amount="${c.heal}"><i class="fa-solid fa-hand-holding-heart"></i> Heal ${esc(t.name)} (+${c.heal})</button>`));
  }
  const tline = c.targets.length ? `<p class="rosd-hint">Target(s): ${c.targets.map(t => esc(t.name)).join(", ")}</p>` : "";
  return `<div class="rosd-card rosd-spell">
    <header><h3>${c.img ? `<img class="rosd-card-icon" src="${esc(c.img)}" alt="">` : `<i class="fa-solid fa-wand-sparkles"></i>`} ${sp.label}</h3><span class="rosd-tn">${esc(c.name)}</span></header>
    <p>${sp.desc}</p>${tline}
    ${btns.length ? `<div class="rosd-buttons">${btns.join("")}</div>` : ""}
  </div>`;
}

export async function useAbility(actor, key, { mark = true } = {}) {
  const ab = ROSD.abilities[key];
  if (!ab) return;
  const img = actor.system.abilities.find(a => a.key === key && a.img)?.img ?? "";
  if (mark) await markUsed(actor, "abilities", key);
  const targets = getTargets();
  const card = { type: "ability", uuid: actor.uuid, name: actor.name, key, img,
    targets: targets.map(t => ({ uuid: t.actor.uuid, name: t.name })), done: {} };
  if (key === "haltUndead") card.will = 20;
  if (key === "eldritchRecall") card.recall = true;
  await postMessage({ actor, content: renderAbility(card), flags: { card } });
}

function renderAbility(c) {
  const ab = ROSD.abilities[c.key];
  const btns = [];
  if (c.will) {
    const tgt = c.targets.length ? c.targets : [{ uuid: "", name: "selected token" }];
    tgt.forEach((t, i) => !c.done[i] && btns.push(
      `<button data-rosd="resist" data-index="${i}" data-tn="${c.will}"><i class="fa-solid fa-brain"></i> ${esc(t.name)}: Will TN ${c.will}</button>`));
  }
  return `<div class="rosd-card rosd-ability">
    <header><h3>${c.img ? `<img class="rosd-card-icon" src="${esc(c.img)}" alt="">` : `<i class="fa-solid fa-star"></i>`} ${ab.label}</h3><span class="rosd-tn">${esc(c.name)}</span></header>
    <p>${ab.desc}</p>
    ${c.recall ? `<p class="rosd-hint">Untick a cast spell on the sheet to recover it.</p>` : ""}
    ${btns.length ? `<div class="rosd-buttons">${btns.join("")}</div>` : ""}
  </div>`;
}

/* ================================================================ */
/* Tables de campagne                                                */
/* ================================================================ */
export async function rollSurvival(actor) {
  const { roll, value } = await d20(heroOf(actor));
  const card = { type: "survival", uuid: actor.uuid, name: actor.name, die: value, plus: 0,
    canPlus: actor.type === "ranger", injury: null };
  const res = ROSD.survivalTable.find(r => value <= r.max);
  const rolls = [roll];
  if (res.injury) { const i = await d20(heroOf(actor)); rolls.push(i.roll); card.injury = i.value; }
  await postMessage({ actor, content: renderSurvival(card), rolls, flags: { card } });
}

function renderSurvival(c) {
  const total = c.die + c.plus;
  const res = ROSD.survivalTable.find(r => total <= r.max);
  let inj = "";
  if (res.injury && c.injury) {
    const ir = ROSD.injuryTable.find(r => c.injury <= r.max);
    inj = `<div class="rosd-injury"><b>Injury (${c.injury}): ${ir.label}</b><br>${ir.desc}</div>`;
  } else if (res.injury) {
    inj = `<button data-rosd="roll-injury"><i class="fa-solid fa-bone"></i> Roll the permanent injury</button>`;
  }
  const plusBtn = c.canPlus && !c.plus
    ? `<div class="rosd-buttons"><button data-rosd="survival-plus" data-owner="${c.uuid}"><i class="fa-solid fa-plus"></i> Add +1 (ranger)</button></div>` : "";
  return `<div class="rosd-card">
    <header><h3>Survival Table</h3><span class="rosd-tn">${esc(c.name)}</span></header>
    <div class="rosd-result ${total >= 9 ? "ok" : total <= 2 ? "ko" : ""}">
      <span class="rosd-total">${total}</span><span class="rosd-verdict">${res.label}</span></div>
    <p>${res.desc}</p>${inj}${plusBtn}</div>`;
}

/* ================================================================ */
/* Gestion des boutons des cartes                                    */
/* ================================================================ */
export function onRenderChatMessage(message, html) {
  const card = message.getFlag("rosd", "card");
  if (!card) return;
  const root = html instanceof HTMLElement ? html : html[0];

  root.querySelectorAll("[data-rosd]").forEach(btn => {
    // Hide buttons reserved for an actor’s owner or for abilities it does not have
    const owner = btn.dataset.owner;
    if (owner) {
      const a = fromUuidSync(owner);
      if (!a?.isOwner) { btn.remove(); return; }
      if (btn.dataset.need && !unusedAbility(a, btn.dataset.need)) { btn.remove(); return; }
      if (btn.dataset.needItem && a.system.casterItem !== btn.dataset.needItem) { btn.remove(); return; }
      if (btn.dataset.prop && !findPropItem(a, btn.dataset.prop)) { btn.remove(); return; }
    }
    btn.addEventListener("click", ev => {
      ev.preventDefault();
      btn.disabled = true;
      handleButton(message, btn).finally(() => { btn.disabled = false; });
    });
  });
}

async function handleButton(message, btn) {
  const card = foundry.utils.deepClone(message.getFlag("rosd", "card"));
  const action = btn.dataset.rosd;
  const save = async (html, rolls = []) => {
    await showDice(rolls);
    return updateMessage(message, { content: html, "flags.rosd.card": card });
  };

  switch (action) {
    /* ---- tests ---- */
    case "check-fate": {
      const actor = await fromUuid(card.uuid);
      const { roll, value } = await d20(heroOf(actor));
      card.die = value; card.dice.push(value); card.usedAbility = "handOfFate";
      await markUsed(actor, "abilities", "handOfFate");
      return save(renderCheck(card), [roll]);
    }
    case "check-inner": {
      const actor = await fromUuid(card.uuid);
      card.inner = true; card.usedAbility = "innerStrength";
      await markUsed(actor, "abilities", "innerStrength");
      return save(renderCheck(card));
    }
    case "check-staff": {
      const actor = await fromUuid(card.uuid);
      evalCheck(card);
      const need = Math.max(0, card.tn - card.total);
      const hp = actor.system.health.value;
      if (need <= 0 || need >= hp) return ui.notifications.warn(`You would need ${need} Health (you have ${hp}).`);
      card.staffHp = (card.staffHp || 0) + need;
      await actor.update({ "system.health.value": hp - need });
      return save(renderCheck(card));
    }

    /* ---- combats ---- */
    case "use": {
      const side = card[btn.dataset.side];
      const need = btn.dataset.need;
      const actor = await fromUuid(side.uuid);
      const rolls = [];
      if (need === "handOfFate") {
        const { roll, value } = await d20(side.isHero);
        side.die = value; side.dice.push(value); rolls.push(roll);
      }
      if (need === "deadlyStrike" || need === "deadlyShot") side.deadly = true;
      if (need === "parry") side.parry = true;
      if (need === "powerfulBlow") side.powerful = true;
      if (need === "rollWithThePunch") side.rollPunch = true;
      side.usedAbility = need;
      await markUsed(actor, "abilities", need);
      return save(renderContest(card), rolls);
    }
    case "item": {
      const side = card[btn.dataset.side];
      const prop = btn.dataset.prop;
      const actor = await fromUuid(side.uuid);
      const item = findPropItem(actor, prop);
      if (!item) return ui.notifications.warn("No usable item.");
      const rolls = [];
      if (prop === "fate") {
        const { roll, value } = await d20(side.isHero);
        side.die = value; side.dice.push(value); side.fateUsed = true; rolls.push(roll);
      }
      if (prop === "blocking") side.block = true;
      if (prop === "elemental") side.elemental = true;
      side.modLabels.push(`[${item.name}]`);
      await spendItem(item);
      return save(renderContest(card), rolls);
    }
    case "check-item-fate": {
      const actor = await fromUuid(card.uuid);
      const item = findPropItem(actor, "fate");
      if (!item) return;
      const { roll, value } = await d20(heroOf(actor));
      card.die = value; card.dice.push(value); card.fateUsed = true;
      await spendItem(item);
      return save(renderCheck(card), [roll]);
    }
    case "apply-dmg": {
      resolveContest(card);
      const i = Number(btn.dataset.index);
      const r = card.results[i];
      const src = card[r.from], tgt = card[r.to];
      const actor = await fromUuid(tgt.uuid);
      if (!actor) return;
      await applyDamage(actor, r.dmg, src);
      card.applied = { ...(card.applied ?? {}), [i]: true };
      return save(renderContest(card));
    }

    /* ---- sorts / capacités ---- */
    case "resist": {
      const i = Number(btn.dataset.index);
      const t = card.targets[i];
      let actor = t ? await fromUuid(t.uuid) : canvas.tokens.controlled[0]?.actor;
      if (!actor) return ui.notifications.warn("Select the token making the roll.");
      if (!actor.isOwner) return ui.notifications.warn("Only the owner (or the GM) can make this roll.");
      await rollCheck(actor, { kind: "stat", key: "will", tn: Number(btn.dataset.tn) });
      if (t) { card.done[i] = true; return save(card.type === "spell" ? renderSpell(card) : renderAbility(card)); }
      return;
    }
    case "heal": {
      const i = Number(btn.dataset.index);
      const list = card.targets.length ? card.targets : [{ uuid: card.uuid, name: card.name }];
      const actor = await fromUuid(list[i].uuid);
      if (!actor) return;
      const h = actor.system.health;
      const value = Math.min(h.max, h.value + Number(btn.dataset.amount));
      const changes = { "system.health.value": value };
      if (value >= h.max && actor.system.status?.poisoned) changes["system.status.poisoned"] = false;
      await updateActorSafe(actor, changes);
      card.done[`h${i}`] = true;
      return save(renderSpell(card));
    }

    /* ---- survie ---- */
    case "survival-plus": { card.plus = 1; return save(renderSurvival(card)); }
    case "disease": {
      const actor = await fromUuid(card.uuid);
      const { roll, value } = await d20(heroOf(actor));
      const total = value + actor.system.health.value;
      const ok = value === 20 || (value !== 1 && total >= card.tn);
      if (!ok) await actor.update({ "system.status.diseased": true });
      card.done = true;
      await postMessage({ actor, rolls: [roll], content: `<div class="rosd-card"><header><h3>Health Roll (disease)</h3><span class="rosd-tn">ND ${card.tn}</span></header>
        <div class="rosd-result ${ok ? "ok" : "ko"}"><span class="rosd-total">${total}</span><span class="rosd-verdict">${ok ? "Resists" : "Malade"}</span></div>
        <p class="rosd-detail">die ${value} + current Health ${actor.system.health.value}${ok ? "" : " — next scenario of the mission: -3 Health and -1 to all rolls."}</p></div>` });
      return save(`<div class="rosd-card"><header><h3>Disease</h3></header><p>Health Roll made.</p></div>`);
    }
    case "roll-injury": {
      const { roll, value } = await d20(true);
      card.injury = value;
      return save(renderSurvival(card), [roll]);
    }
  }
}


export async function applyDamage(actor, dmg, source = {}) {
  const h = actor.system.health;
  const value = h.value - dmg;
  const changes = { "system.health.value": value };
  if (source.poison && dmg > 0 && actor.system.status) changes["system.status.poisoned"] = true;
  await updateActorSafe(actor, changes);

  const notes = [];
  if (value <= 0) notes.push(isHero(actor)
    ? `<b>${esc(actor.name)}</b> is out of the fight (roll on the Survival Table after the game).`
    : `<b>${esc(actor.name)}</b> is killed${actor.system.xp ? ` (+${actor.system.xp} PX)` : ""}.`);
  if (changes["system.status.poisoned"]) notes.push(`<b>${esc(actor.name)}</b> is poisoned: one action per activation.`);
  if (source.disease && dmg > 0 && isHero(actor) && !actor.system.status?.diseased) {
    notes.push(`Disease: <b>${esc(actor.name)}</b> must pass a Health Roll (TN ${source.disease}).`);
    const card = { type: "disease", uuid: actor.uuid, tn: source.disease };
    const content = `<div class="rosd-card"><header><h3>Maladie</h3></header><p>${notes.join("<br>")}</p>
      <div class="rosd-buttons"><button data-rosd="disease" data-owner="${actor.uuid}"><i class="fa-solid fa-virus"></i> Jet de Santé ND ${source.disease}</button></div></div>`;
    return postMessage({ actor, content, flags: { card } });
  }
  if (notes.length) await postMessage({ actor, content: `<div class="rosd-card"><p>${notes.join("<br>")}</p></div>` });
}

