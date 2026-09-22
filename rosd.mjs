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
  console.log("ROSD | Initialisation de Rangers of Shadow Deep");
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
  DSC.registerSheet(Actor, "rosd", RangerSheet, { types: ["ranger"], makeDefault: true, label: "Fiche de ranger" });
  DSC.registerSheet(Actor, "rosd", CompanionSheet, { types: ["companion"], makeDefault: true, label: "Fiche de compagnon" });
  DSC.registerSheet(Item, "rosd", ObjectSheet, { types: ["objet"], makeDefault: true, label: "Fiche d'objet" });
  DSC.registerSheet(Actor, "rosd", CreatureSheet, { types: ["creature"], makeDefault: true, label: "Fiche de créature" });

  game.settings.register("rosd", "players", {
    name: "Nombre de joueurs",
    hint: "Sert au calcul des points de recrutement et du nombre de compagnons activés en phase des Rangers.",
    scope: "world", config: true, type: Number, default: 1,
    choices: { 1: "1 joueur (solo)", 2: "2 joueurs", 3: "3 joueurs", 4: "4 joueurs" },
    onChange: () => { for (const app of foundry.applications.instances.values()) if (app.document?.type === "ranger") app.render(); }
  });
  game.settings.register("rosd", "shootTieHits", {
    name: "Égalité au tir = touché",
    hint: "Les règles précisent seulement que le tir touche si le tireur a le score le plus haut. Cochez pour qu'une égalité touche quand même.",
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
    "systems/rosd/templates/parts/items.hbs"
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
  btn.innerHTML = `<i class="fa-solid fa-dragon"></i> Importer le bestiaire ROSD`;
  btn.addEventListener("click", () => importBestiary());
  const footer = root.querySelector(".directory-footer") ?? root.querySelector(".header-actions") ?? root;
  footer.append(btn);
});

async function importBestiary() {
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Importer le bestiaire" },
    content: `<p>Créer ${Object.keys(ROSD.bestiary).length} créatures et ${Object.keys(ROSD.companions).length} compagnons types dans deux dossiers ?</p>`
  });
  if (!ok) return;
  const folderC = await Folder.create({ name: "ROSD — Bestiaire", type: "Actor" });
  const folderF = await Folder.create({ name: "ROSD — Compagnons types", type: "Actor" });
  const toStats = ([m, f, s, a, w]) => ({
    move: { value: m, mod: 0 }, fight: { value: f, mod: 0 }, shoot: { value: s, mod: 0 },
    armour: { value: a, mod: 0 }, will: { value: w, mod: 0 }
  });
  const creatures = Object.entries(ROSD.bestiary).map(([key, p]) => ({
    name: p.label, type: "creature", folder: folderC.id,
    system: {
      profile: key, xp: p.xp, stats: toStats(p.stats), health: { value: p.stats[5], max: p.stats[5] },
      traits: p.traits, weapons: { melee: p.melee ?? "natural", ranged: p.ranged ?? "none" },
      flags: { undead: !!p.undead, animal: !!p.animal, large: !!p.large, flying: !!p.flying,
        poison: !!p.poison, disease: p.disease ?? 0, horrific: p.horrific ?? 0, partialImmunity: !!p.partialImmunity }
    }
  }));
  const companions = Object.entries(ROSD.companions).map(([key, p]) => ({
    name: p.label, type: "companion", folder: folderF.id,
    system: {
      profile: key, rp: p.rp, stats: toStats(p.stats), health: { value: p.stats[5], max: p.stats[5] },
      baseGear: p.gear, animal: !!p.animal, skills: p.skills ?? {},
      weapons: { melee: p.melee ?? "hand", ranged: p.ranged ?? "none" }
    }
  }));
  await Actor.createDocuments([...creatures, ...companions]);
  ui.notifications.info("Bestiaire et compagnons importés.");
}

/* Bouton d'import des objets des règles dans l'onglet Objets (MJ) */
Hooks.on("renderItemDirectory", (app, html) => {
  if (!game.user.isGM) return;
  const root = html instanceof HTMLElement ? html : html[0];
  if (root.querySelector(".rosd-import")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "rosd-import";
  btn.innerHTML = `<i class="fa-solid fa-sack"></i> Importer les objets ROSD`;
  btn.addEventListener("click", () => importItems());
  const footer = root.querySelector(".directory-footer") ?? root.querySelector(".header-actions") ?? root;
  footer.append(btn);
});

async function importItems() {
  const total = ROSD.itemCatalog.reduce((n, f) => n + f.items.length, 0);
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Importer les objets" },
    content: `<p>Créer les ${total} objets des règles (équipement de base, herbes et potions, armes et armures magiques, objets magiques) dans le dossier « ROSD — Objets » ?</p>
      <p>Les objets déjà présents dans ce dossier (même nom) ne sont pas recréés.</p>`
  });
  if (!ok) return;
  let root = game.folders.find(f => f.type === "Item" && f.name === "ROSD — Objets" && !f.folder);
  root ??= await Folder.create({ name: "ROSD — Objets", type: "Item" });
  let created = 0;
  for (const group of ROSD.itemCatalog) {
    let folder = game.folders.find(f => f.type === "Item" && f.name === group.folder && f.folder?.id === root.id);
    folder ??= await Folder.create({ name: group.folder, type: "Item", folder: root.id });
    const existing = new Set(game.items.filter(i => i.folder?.id === folder.id).map(i => i.name));
    const data = group.items.filter(i => !existing.has(i.name)).map(i => ({ ...foundry.utils.deepClone(i), folder: folder.id }));
    if (data.length) { await Item.createDocuments(data); created += data.length; }
  }
  ui.notifications.info(`${created} objet(s) importé(s) dans « ROSD — Objets ».`);
}
