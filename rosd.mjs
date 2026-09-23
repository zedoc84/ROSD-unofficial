/**
 * Rangers of Shadow Deep — système Foundry VTT (v13/v14)
 */
import { ROSD } from "./module/config.mjs";
import { RangerData, CompanionData, CreatureData, ObjectData } from "./module/data.mjs";
import { ObjectSheet } from "./module/item-sheet.mjs";
import { ROSDActor } from "./module/actor.mjs";
import { RangerSheet, CompanionSheet, CreatureSheet } from "./module/sheets.mjs";
import * as Dice from "./module/dice.mjs";

Hooks.once("init", async () => {
  console.log("ROSD | Initialising Rangers of Shadow Deep");
  CONFIG.ROSD = ROSD;
  game.rosd = { config: ROSD, ...Dice, importBestiary, importItems };

  CONFIG.Actor.documentClass = ROSDActor;
  Object.assign(CONFIG.Actor.dataModels, {
    ranger: RangerData, companion: CompanionData, creature: CreatureData
  });
  CONFIG.Item.dataModels.objet = ObjectData;
  CONFIG.Actor.trackableAttributes = {
    ranger: { bar: ["health"], value: [] },
    companion: { bar: ["health"], value: [] },
    creature: { bar: ["health"], value: [] }
  };
  // Tracker : phase des Rangers (Volonté) > créatures (Santé) > compagnons
  CONFIG.Combat.initiative = { formula: "@init", decimals: 0 };

  const DSC = foundry.applications.apps.DocumentSheetConfig;
  DSC.registerSheet(Actor, "rosd", RangerSheet, { types: ["ranger"], makeDefault: true, label: "Ranger sheet" });
  DSC.registerSheet(Actor, "rosd", CompanionSheet, { types: ["companion"], makeDefault: true, label: "Companion sheet" });
  DSC.registerSheet(Item, "rosd", ObjectSheet, { types: ["objet"], makeDefault: true, label: "Fiche d'objet" });
  DSC.registerSheet(Actor, "rosd", CreatureSheet, { types: ["creature"], makeDefault: true, label: "Creature sheet" });

  game.settings.register("rosd", "players", {
    name: "Number of players",
    hint: "Used to work out Recruitment Points and how many companions activate in the Ranger Phase.",
    scope: "world", config: true, type: Number, default: 1,
    choices: { 1: "1 joueur (solo)", 2: "2 joueurs", 3: "3 joueurs", 4: "4 joueurs" },
    onChange: () => { for (const app of foundry.applications.instances.values()) if (app.document?.type === "ranger") app.render(); }
  });
  game.settings.register("rosd", "heroDiceColor", {
    name: "Hero die colour (Dice So Nice)",
    hint: "Colour of the d20 rolled for rangers and companions. Creatures keep the native Dice So Nice appearance. Format #rrggbb.",
    scope: "client", config: true, type: String, default: "#0d2b5e"
  });
  game.settings.register("rosd", "shootTieHits", {
    name: "Shooting ties hit",
    hint: "The rules only state that a shot hits if the shooter has the higher score. Tick this to let a tie hit as well.",
    scope: "world", config: true, type: Boolean, default: false
  });

  Handlebars.registerHelper("rosdSigned", n => Dice.signed(n));
  Handlebars.registerHelper("rosdAdd", (a, b) => Number(a) + Number(b));

  const load = foundry.applications.handlebars?.loadTemplates ?? loadTemplates;
  await load([
    "systems/rosd/templates/parts/stats.hbs",
    "systems/rosd/templates/parts/skills.hbs",
    "systems/rosd/templates/parts/status.hbs",
    "systems/rosd/templates/parts/weapons.hbs",
    "systems/rosd/templates/parts/abilities.hbs",
    "systems/rosd/templates/parts/spells.hbs",
    "systems/rosd/templates/parts/star.hbs",
    "systems/rosd/templates/parts/emblem.hbs",
    "systems/rosd/templates/parts/items.hbs",
    "systems/rosd/templates/parts/traits.hbs"
  ]);
});

Hooks.once("ready", () => Dice.registerSocket());

Hooks.on("renderChatMessageHTML", (message, html) => Dice.onRenderChatMessage(message, html));

/* Bouton d'import du bestiaire dans l'onglet Acteurs (MJ) */
Hooks.on("renderActorDirectory", (app, html) => {
  if (!game.user.isGM) return;
  const root = html instanceof HTMLElement ? html : html[0];
  if (root.querySelector(".rosd-import")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "rosd-import";
  btn.innerHTML = `<i class="fa-solid fa-dragon"></i> Import the ROSD bestiary`;
  btn.addEventListener("click", () => importBestiary());
  const footer = root.querySelector(".directory-footer") ?? root.querySelector(".header-actions") ?? root;
  footer.append(btn);
});

async function importBestiary() {
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Import the bestiary" },
    content: `<p>Create ${Object.keys(ROSD.bestiary).length} creatures and ${Object.keys(ROSD.companions).length} companion profiles, sorted by book?</p>
      <p>Actors already in those folders (same name) are not created again.</p>`
  });
  if (!ok) return;

  // Root folder plus one sub-folder per source book
  const getFolder = async (name, parent = null) =>
    game.folders.find(f => f.type === "Actor" && f.name === name && (f.folder?.id ?? null) === (parent?.id ?? null))
    ?? Folder.create({ name, type: "Actor", folder: parent?.id ?? null });
  const rootC = await getFolder("ROSD — Bestiary");
  const rootF = await getFolder("ROSD — Companion profiles");
  const sub = {};
  const folderFor = async (root, src) => {
    const k = `${root.id}:${src}`;
    return sub[k] ??= await getFolder(src || "Core Rulebook", root);
  };

  const toStats = ([m, f, s, a, w]) => ({
    move: { value: m, mod: 0 }, fight: { value: f, mod: 0 }, shoot: { value: s, mod: 0 },
    armour: { value: a, mod: 0 }, will: { value: w, mod: 0 }
  });
  const ranged = r => (ROSD.rangedWeapons[r] ? r : "none");
  const list = e => (e ?? []).map(key => ({ key, used: false, img: "" }));
  const exists = (folder, name) => game.actors.some(x => x.folder?.id === folder.id && x.name === name);

  const data = [];
  for (const [key, p] of Object.entries(ROSD.bestiary)) {
    const folder = await folderFor(rootC, p.src);
    if (exists(folder, p.label)) continue;
    data.push({
      name: p.label, type: "creature", folder: folder.id, img: "icons/svg/skull.svg",
      system: {
        profile: key, xp: p.xp, stats: toStats(p.stats), health: { value: p.stats[5], max: p.stats[5] },
        traits: p.traits, weapons: { melee: p.melee ?? "natural", ranged: ranged(p.ranged), dmgBonus: p.dmg ?? 0 },
        flags: { undead: !!p.undead, animal: !!p.animal, large: !!p.large, flying: !!p.flying,
          poison: !!p.poison, disease: p.disease ?? 0, horrific: p.horrific ?? 0, partialImmunity: !!p.partialImmunity,
          spellcaster: !!p.spellcaster, immuneCrit: !!p.immuneCrit }
      }
    });
  }
  for (const [key, p] of Object.entries(ROSD.companions)) {
    const folder = await folderFor(rootF, p.src);
    if (exists(folder, p.label)) continue;
    data.push({
      name: p.label, type: "companion", folder: folder.id, img: "icons/svg/shield.svg",
      system: {
        profile: key, rp: p.rp, stats: toStats(p.stats), health: { value: p.stats[5], max: p.stats[5] },
        baseGear: p.gear, animal: !!p.animal, skills: p.skills ?? {},
        spells: list(p.spells), abilities: list(p.abilities),
        weapons: { melee: p.melee ?? (p.animal ? "natural" : "hand"), ranged: ranged(p.ranged), dmgBonus: p.dmg ?? 0 }
      }
    });
  }
  if (data.length) await Actor.createDocuments(data);
  ui.notifications.info(`${data.length} actor(s) imported.`);
}

/* Bouton d'import des objets des règles dans l'onglet Objets (MJ) */
Hooks.on("renderItemDirectory", (app, html) => {
  if (!game.user.isGM) return;
  const root = html instanceof HTMLElement ? html : html[0];
  if (root.querySelector(".rosd-import")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "rosd-import";
  btn.innerHTML = `<i class="fa-solid fa-sack"></i> Import the ROSD items`;
  btn.addEventListener("click", () => importItems());
  const footer = root.querySelector(".directory-footer") ?? root.querySelector(".header-actions") ?? root;
  footer.append(btn);
});

async function importItems() {
  const total = ROSD.itemCatalog.reduce((n, f) => n + f.items.length, 0);
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Import the items" },
    content: `<p>Create the ${total} items from the books (basic equipment, herbs and potions, magic weapons and armour, magic items) in the “ROSD — Items” folder?</p>
      <p>Items already in that folder (same name) are not created again.</p>`
  });
  if (!ok) return;
  let root = game.folders.find(f => f.type === "Item" && f.name === "ROSD — Items" && !f.folder);
  root ??= await Folder.create({ name: "ROSD — Items", type: "Item" });
  let created = 0;
  for (const group of ROSD.itemCatalog) {
    let folder = game.folders.find(f => f.type === "Item" && f.name === group.folder && f.folder?.id === root.id);
    folder ??= await Folder.create({ name: group.folder, type: "Item", folder: root.id });
    const existing = new Set(game.items.filter(i => i.folder?.id === folder.id).map(i => i.name));
    const data = group.items.filter(i => !existing.has(i.name)).map(i => ({ ...foundry.utils.deepClone(i), folder: folder.id }));
    if (data.length) { await Item.createDocuments(data); created += data.length; }
  }
  ui.notifications.info(`${created} item(s) imported into “ROSD — Items”.`);
}
