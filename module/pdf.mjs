import { ROSD } from "./config.mjs";
import { combatProfile, signed } from "./dice.mjs";

/* ================================================================ */
/* Données de la fiche                                              */
/* ================================================================ */
const TYPE_LABEL = { ranger: "Ranger", companion: "Compagnon", creature: "Creature" };
const clean = t => String(t ?? "").replace(/[“”″]/g, '"').replace(/[‘’]/g, "'").trim();

export function collectSheetData(actor) {
  const s = actor.system;
  const type = actor.type;
  const d = { type, name: actor.name, kicker: `RANGERS OF SHADOW DEEP · ${TYPE_LABEL[type].toUpperCase()} SHEET` };

  if (type === "ranger") {
    d.subtitle = [s.player && `Player: ${s.player}`, `Level ${s.level}`, `${s.xp} XP`,
      `Next level: ${s.nextLevelCost} XP`].filter(Boolean).join("   ·   ");
  } else if (type === "companion") {
    d.subtitle = [ROSD.companions[s.profile]?.label ?? "Compagnon", `${s.rp} RP`, s.owner && `Ranger: ${s.owner}`,
      `Advancement: ${s.progression} AP`].filter(Boolean).join("   ·   ");
  } else {
    d.subtitle = [ROSD.bestiary[s.profile]?.label ?? "Creature", `${s.xp} XP`].join("   ·   ");
  }

  d.stats = Object.entries(ROSD.stats).map(([k, st]) => {
    const v = s.stats[k];
    const f = n => (k === "move" || k === "armour" ? String(n) : signed(n));
    return { label: st.label, value: v.mod ? `${f(v.value)}/${f(v.total)}` : f(v.total) };
  });
  d.stats.push({ label: "Health", value: `${s.health.value}/${s.health.max}`, health: true });

  if (s.skills) d.skills = Object.entries(ROSD.skills).map(([k, l]) => [l, s.skills[k] ? signed(s.skills[k]) : "—"]);

  const cp = combatProfile(actor);
  d.combat = [
    ["Melee", `${ROSD.meleeWeapons[s.weapons.melee]?.label ?? "—"} · Fight ${signed(cp.fight)} · damage ${signed(cp.meleeDmg)}`],
    ["Tir", s.weapons.ranged === "none" ? "—" : `${ROSD.rangedWeapons[s.weapons.ranged]?.label ?? "Other"} · Shoot ${signed(cp.shoot)} · range ${cp.range}"`]
  ];
  if (s.weapons.magic) d.combat.push(["Arme", "Magique"]);
  if (s.weapons.mult > 1) d.combat.push(["Damage", `× ${s.weapons.mult}`]);

  if (s.status) {
    const st = [];
    if (s.status.poisoned) st.push("Poisoned");
    if (s.status.diseased) st.push("Malade");
    if (s.status.hunger) st.push(`Hunger & Thirst ×${s.status.hunger}`);
    d.status = st.length ? st.join(", ") : "Aucun";
  }

  if (type === "ranger") {
    d.gear = ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6"].map((k, i) => [`Slot ${i + 1}`, s.gear[k] || "—"]);
    if (s.gear.freeKnife) d.gear.push(["Free dagger", s.gear.freeKnife]);
    if (s.gear.magicAmmo) d.gear.push(["Magic ammunition", s.gear.magicAmmo]);
    if (s.casterItem) d.gear.push(["Spellcaster item", ROSD.casterItems[s.casterItem]]);
  } else if (type === "companion") {
    d.gear = [["Equipment", s.baseGear || "—"], ["Item 1", s.gear.item1 || "—"], ["Item 2", s.gear.item2 || "—"]];
  } else {
    const f = s.flags, t = [];
    if (f.undead) t.push("Undead");
    if (f.animal) t.push("Animal");
    if (f.large) t.push("Large");
    if (f.flying) t.push("Flying");
    if (f.poison) t.push("Poison");
    if (f.disease) t.push(`Disease (TN ${f.disease})`);
    if (f.horrific) t.push(`Horrific (TN ${f.horrific})`);
    if (f.partialImmunity) t.push("Partial immunity");
    if (f.immuneCrit) t.push("Immune to criticals");
    if (f.spellcaster) t.push("Spellcaster");
    d.gear = [["Traits", t.join(", ") || "—"]];
    if (s.traits) d.gear.push(["Profile notes", s.traits]);
  }

  // Objets glissés sur la fiche
  const items = actor.items?.contents ?? [];
  for (const i of items) {
    d.gear ??= [];
    d.gear.push([i.name, `×${i.system.quantity} · ${i.system.slots} slot(s)${i.system.magic ? " · magic" : ""}${i.system.description ? " — " + i.system.description : ""}`]);
  }

  const list = (arr, table) => (arr ?? []).map(e => {
    const x = table[e.key] ?? {};
    let tag = "";
    if (x.attack) tag = `Attack ${signed(x.attack)}`;
    else if (x.will) tag = `Will TN ${x.will}`;
    else if (x.heal) tag = `Heal ${x.heal}`;
    return { label: x.label ?? e.key, en: x.en ?? "", desc: x.desc ?? "", used: e.used, tag };
  });
  d.abilities = list(s.abilities, ROSD.abilities);
  const tl = (arr, table) => (Array.isArray(arr) ? arr : []).map(e => ({ label: table[e.key]?.label ?? e.key, en: table[e.key]?.cost ?? "",
    desc: table[e.key]?.desc ?? "", used: false, tag: "" }));
  d.traits = tl(s.traits, ROSD.traits ?? {});
  d.limitations = tl(s.limitations, ROSD.limitations ?? {});
  if (s.archetype && ROSD.archetypes?.[s.archetype]) d.subtitle += `   ·   ${ROSD.archetypes[s.archetype].label}`;
  d.spells = list(s.spells, ROSD.spells);

  const notes = [];
  const add = (t, v) => v && clean(v) && notes.push([t, clean(v)]);
  if (type === "ranger") {
    const players = globalThis.game?.settings?.get("rosd", "players") ?? 1;
    const r = ROSD.recruitment[players] ?? ROSD.recruitment[1];
    notes.push(["Recruitment", `${s.brp} base RP · ${Math.max(0, r.calc(s.brp) + (s.skills.leadership ?? 0))} total RP (${players} player${players > 1 ? "s" : ""}) · max ${r.max} companions`]);
    add("Companions", s.companions);
    add("Permanent Injuries", s.injuries);
    add("Personal magic items", s.gear.personalMagic);
    add("Treasure", s.treasure);
    add("Build Points", s.buildPoints);
    add("Background", s.background);
    add("Notes", s.notes);
  } else if (type === "companion") {
    if (s.earnedRewards?.length) notes.push(["Rewards earned", s.earnedRewards.join(" ; ")]);
    notes.push(["Next reward", s.nextReward]);
    add("Permanent Injuries", s.injuries);
    add("Notes", s.notes);
  } else {
    add("Special rules", s.special);
    add("Notes", s.notes);
  }
  d.notes = notes;
  return d;
}

/* ================================================================ */
/* Rendu PDF                                                        */
/* ================================================================ */
const SLATE = [44, 50, 55], IRON = [91, 100, 107], SILVER = [195, 202, 208], GREEN = [62, 90, 69];
const BLOOD = [138, 44, 44], STONE = [236, 237, 233], INK = [31, 36, 39], RULE = [182, 186, 179];

export function renderSheetPdf(jsPDF, d, img) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, H = 297, M = 14, CW = W - 2 * M;
  let y = 0;

  const color = (c, what = "text") => doc[{ text: "setTextColor", fill: "setFillColor", draw: "setDrawColor" }[what]](...c);
  const font = (style = "normal", size = 10) => { doc.setFont("helvetica", style); doc.setFontSize(size); };
  const lh = size => size * 0.42;
  const ensure = h => { if (y + h > H - 16) { doc.addPage(); y = M; } };

  const section = title => {
    ensure(24);
    y += 3;
    font("bold", 12.5); color(SLATE); doc.text(title, M, y + 4);
    color(SLATE, "draw"); doc.setLineWidth(0.5); doc.line(M, y + 6, W - M, y + 6);
    y += 9;
  };
  const para = (text, { x = M, w = CW, size = 9.5, style = "normal", c = INK, gap = 1.5 } = {}) => {
    font(style, size); color(c);
    for (const line of doc.splitTextToSize(clean(text), w)) {
      ensure(lh(size) + 0.5); doc.text(line, x, y + lh(size)); y += lh(size) + 0.4;
    }
    y += gap;
  };

  /* En-tête */
  color(SLATE, "fill"); doc.rect(0, 0, W, 36, "F");
  const imgSize = 28, textW = img ? CW - imgSize - 4 : CW;
  font("normal", 7.5); color(SILVER); doc.text(d.kicker, M, 9);
  font("bold", 22); doc.setTextColor(255, 255, 255); doc.text(doc.splitTextToSize(d.name, textW)[0], M, 20);
  font("normal", 9.5); color(SILVER); doc.text(doc.splitTextToSize(d.subtitle, textW)[0], M, 28);
  if (img) {
    try {
      color(SILVER, "fill"); doc.rect(W - M - imgSize - 0.6, 3.4, imgSize + 1.2, imgSize + 1.2, "F");
      doc.addImage(img, "JPEG", W - M - imgSize, 4, imgSize, imgSize);
    } catch (e) { /* image illisible */ }
  }
  y = 43;

  /* Caractéristiques */
  const n = d.stats.length, gap = 2.5, bw = (CW - gap * (n - 1)) / n, bh = 19;
  d.stats.forEach((st, i) => {
    const x = M + i * (bw + gap);
    color(STONE, "fill"); doc.rect(x, y, bw, bh, "F");
    color(st.health ? BLOOD : SLATE, "fill"); doc.rect(x, y, bw, 1.6, "F");
    font("normal", 7.5); color(IRON); doc.text(st.label, x + bw / 2, y + 6, { align: "center" });
    font("bold", st.value.length > 6 ? 13 : 17); color(INK); doc.text(st.value, x + bw / 2, y + 15, { align: "center" });
  });
  y += bh + 4;

  /* Deux colonnes */
  const colW = (CW - 8) / 2, xL = M, xR = M + colW + 8, top = y;
  const colTitle = (t, x, yy) => {
    font("bold", 11); color(SLATE); doc.text(t, x, yy + 4);
    color(SLATE, "draw"); doc.setLineWidth(0.4); doc.line(x, yy + 5.5, x + colW, yy + 5.5);
    return yy + 8;
  };
  const kv = (rows, x, yy, labelW) => {
    for (const [k, v] of rows) {
      font("bold", 8.8); color(IRON); doc.text(k, x, yy + 3.6);
      font("normal", 8.8); color(INK);
      const lines = doc.splitTextToSize(clean(v), colW - labelW);
      lines.forEach((l, i) => doc.text(l, x + labelW, yy + 3.6 + i * 3.8));
      yy += Math.max(1, lines.length) * 3.8 + 1.2;
      color(RULE, "draw"); doc.setLineWidth(0.15); doc.line(x, yy, x + colW, yy); yy += 0.8;
    }
    return yy;
  };
  let yl = top, yr = top;
  if (d.skills) {
    yl = colTitle("Skills", xL, yl);
    for (const [k, v] of d.skills) {
      font(v === "—" ? "normal" : "bold", 9); color(v === "—" ? IRON : INK);
      doc.text(k, xL, yl + 3.6); doc.text(v, xL + colW, yl + 3.6, { align: "right" });
      yl += 4.4; color(RULE, "draw"); doc.setLineWidth(0.15); doc.line(xL, yl, xL + colW, yl); yl += 0.5;
    }
  }
  const rx = d.skills ? xR : xL;
  yr = colTitle("Combat", rx, yr);
  yr = kv(d.combat, rx, yr, 16);
  if (d.status) { yr += 2; yr = colTitle("Status", rx, yr); yr = kv([["Current", d.status]], rx, yr, 16); }
  if (d.gear?.length) { yr += 2; yr = colTitle(d.type === "creature" ? "Traits" : "Equipment", rx, yr); yr = kv(d.gear, rx, yr, 30); }
  y = Math.max(yl, yr) + 3;

  /* Capacités et sorts */
  const powers = (title, arr, usedLabel) => {
    if (!arr?.length) return;
    section(title);
    for (const a of arr) {
      ensure(10);
      color(SLATE, "draw"); doc.setLineWidth(0.3); doc.rect(M, y + 1.2, 3.2, 3.2);
      if (a.used) { font("bold", 8); color(SLATE); doc.text("x", M + 0.8, y + 3.9); }
      font("bold", 10.5); color(INK); doc.text(a.label, M + 5.5, y + 4.2);
      let x = M + 5.5 + doc.getTextWidth(a.label) + 3;
      if (a.tag) {
        font("bold", 7.5); const tw = doc.getTextWidth(a.tag) + 3;
        color(SLATE, "fill"); doc.rect(x, y + 1.1, tw, 3.8, "F");
        doc.setTextColor(255, 255, 255); doc.text(a.tag, x + 1.5, y + 3.9); x += tw + 2;
      }
      if (a.en) { font("italic", 8); color(IRON); doc.text(a.en, x, y + 4.1); }
      y += 6;
      para(a.desc, { x: M + 5.5, w: CW - 5.5, size: 9, gap: 2 });
    }
    font("italic", 7.5); color(IRON); ensure(5); doc.text(usedLabel, M, y + 2); y += 4;
  };
  powers("Heroic Abilities", d.abilities, "A ticked box means the ability has been used this scenario.");
  powers("Spells", d.spells, "A ticked box means the spell has been cast this scenario.");
  powers("Traits", d.traits, "Permanent traits (A Gathering of Heroes).");
  powers("Limitations", d.limitations, "Limitations (A Gathering of Heroes).");

  /* Notes */
  if (d.notes?.length) {
    section(d.type === "creature" ? "Rules & notes" : "Campaign & notes");
    for (const [t, v] of d.notes) {
      ensure(9);
      font("bold", 9.5); color(GREEN); doc.text(t, M, y + 4); y += 5.5;
      para(v, { gap: 2.5 });
    }
  }

  /* Pied de page */
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    font("italic", 7.5); color(IRON);
    doc.text(`${d.name} — Rangers of Shadow Deep`, M, H - 8);
    doc.text(`${i} / ${pages}`, W - M, H - 8, { align: "right" });
  }
  return doc;
}

/* ================================================================ */
/* Intégration Foundry                                              */
/* ================================================================ */
async function loadJsPDF() {
  if (globalThis.jspdf?.jsPDF) return globalThis.jspdf.jsPDF;
  await new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = "systems/rosd/lib/jspdf.umd.min.js";
    el.onload = resolve;
    el.onerror = () => reject(new Error("could not load jsPDF"));
    document.head.append(el);
  });
  return globalThis.jspdf.jsPDF;
}

async function imageToJpeg(src) {
  if (!src) return null;
  try {
    const im = new Image();
    await new Promise((res, rej) => { im.onload = res; im.onerror = rej; im.src = src; });
    const size = 400;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#2c3237"; ctx.fillRect(0, 0, size, size);
    const iw = im.naturalWidth || size, ih = im.naturalHeight || size;
    const r = Math.max(size / iw, size / ih);
    ctx.drawImage(im, (size - iw * r) / 2, (size - ih * r) / 2, iw * r, ih * r);
    return canvas.toDataURL("image/jpeg", 0.9);
  } catch (e) {
    console.warn("ROSD | Portrait not exported:", e);
    return null;
  }
}

export async function exportActorPdf(actor) {
  try {
    ui.notifications.info("Creating the PDF…");
    const jsPDF = await loadJsPDF();
    const doc = renderSheetPdf(jsPDF, collectSheetData(actor), await imageToJpeg(actor.img));
    doc.save(`${actor.name.replace(/[\\/:*?"<>|]+/g, "_")} - ROSD sheet.pdf`);
  } catch (err) {
    console.error(err);
    ui.notifications.error(`PDF export failed: ${err.message}`);
  }
}
