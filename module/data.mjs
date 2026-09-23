import { ROSD } from "./config.mjs";

const fields = foundry.data.fields;

const num = (initial = 0, opts = {}) =>
  new fields.NumberField({ required: true, nullable: false, initial, ...opts });
const str = (initial = "") => new fields.StringField({ required: true, blank: true, initial });
const bool = (initial = false) => new fields.BooleanField({ initial });

function statField(value, mod = 0) {
  return new fields.SchemaField({ value: num(value), mod: num(mod) });
}

function statsSchema([m, f, s, a, w]) {
  return new fields.SchemaField({
    move: statField(m), fight: statField(f), shoot: statField(s),
    armour: statField(a), will: statField(w)
  });
}

function skillsSchema() {
  const schema = {};
  for (const k of Object.keys(ROSD.skills)) schema[k] = num(0, { integer: true });
  return new fields.SchemaField(schema);
}

function listSchema() {
  return new fields.ArrayField(new fields.SchemaField({
    key: str(), used: bool(), img: str()
  }));
}

function weaponSchema(melee = "hand", ranged = "none") {
  return new fields.SchemaField({
    melee: str(melee),
    ranged: str(ranged),
    rangedDmg: num(0),              // pour "Autre"
    rangedRange: num(0),
    fightBonus: num(0),             // arme magique : bonus de Combat
    dmgBonus: num(0),               // bonus de dégâts divers (sort Force…)
    shootBonus: num(0),
    magic: bool(false),             // arme magique (Chevalier de l'Ombre)
    mult: num(1, { min: 1, integer: true })
  });
}

class BaseFigure extends foundry.abstract.TypeDataModel {
  /** Emblème affiché dans l'en-tête (vide = étoile d'argent). */
  static emblemField() { return new fields.StringField({ required: true, blank: true, initial: "" }); }

  static defineHealth(max) {
    return new fields.SchemaField({ value: num(max), max: num(max) });
  }

  prepareDerivedData() {
    const items = this.parent?.items?.contents ?? [];
    const w = this.weapons ?? {};
    const meleeItem = w.melee?.startsWith("item:") ? this.parent.items.get(w.melee.slice(5)) : null;
    const rangedItem = w.ranged?.startsWith("item:") ? this.parent.items.get(w.ranged.slice(5)) : null;
    const mods = { move: 0, fight: 0, shoot: 0, armour: 0, will: 0, dmg: 0 };
    const sources = { move: [], fight: [], shoot: [], armour: [], will: [], dmg: [] };
    const add = (item, key, v) => { if (v) { mods[key] += v; sources[key].push(`${item.name} ${v > 0 ? "+" : ""}${v}`); } };
    for (const item of items) {
      if (item.type !== "objet") continue;
      const sys = item.system;
      if (sys.isWeapon) {
        // Arme : ses bonus ne comptent que si c'est l'arme utilisée (et activée si besoin)
        const on = !sys.activation || sys.active;
        if (item === meleeItem && on) { add(item, "fight", sys.bonus.fight); add(item, "dmg", sys.bonus.dmg); }
        if (item === rangedItem && on) add(item, "shoot", sys.bonus.shoot);
        continue;
      }
      if (!sys.bonusActive) continue;
      for (const k of Object.keys(mods)) add(item, k, sys.bonus[k]);
    }
    this.itemMods = mods;
    for (const [k, s] of Object.entries(this.stats)) {
      s.item = mods[k] ?? 0;
      s.itemSources = sources[k]?.join(", ") ?? "";
      s.total = s.value + s.mod + s.item;
    }
    this.itemDmg = mods.dmg;
    this.itemDmgSources = sources.dmg.join(", ");
    this.meleeItem = meleeItem ?? null;
    this.rangedItem = rangedItem ?? null;
    this.isCaster = (this.spells?.length ?? 0) > 0;
  }
}

/* ------------------------------------------------------------ */
export class RangerData extends BaseFigure {
  static defineSchema() {
    return {
      player: str(), background: str(), concept: str(), emblem: this.emblemField(),
      level: num(0, { integer: true, min: 0 }),
      xp: num(0, { integer: true }),
      buildPoints: str(""),
      brp: num(100, { integer: true }),
      stats: statsSchema([6, 2, 1, 10, 4]),
      health: this.defineHealth(18),
      skills: skillsSchema(),
      abilities: listSchema(),
      spells: listSchema(),
      traits: listSchema(),
      limitations: listSchema(),
      archetype: str(""),
      weapons: weaponSchema("hand", "bow"),
      casterItem: str(""),
      gear: new fields.SchemaField({
        slot1: str(), slot2: str(), slot3: str(), slot4: str(), slot5: str(), slot6: str(),
        freeKnife: str(), magicAmmo: str(), personalMagic: str()
      }),
      status: new fields.SchemaField({
        poisoned: bool(), diseased: bool(), hunger: num(0, { integer: true, min: 0 })
      }),
      injuries: str(), treasure: str(), notes: str(), companions: str()
    };
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    this.nextLevelCost = ROSD.xpCost(this.level + 1);
    this.nextLevelBonus = ROSD.levelBonus(this.level + 1);
  }
}

/* ------------------------------------------------------------ */
export class CompanionData extends BaseFigure {
  static defineSchema() {
    return {
      profile: str(""), emblem: this.emblemField(),
      rp: num(0, { integer: true }),
      owner: str(""),
      stats: statsSchema([6, 2, 0, 10, 0]),
      health: this.defineHealth(10),
      skills: skillsSchema(),
      abilities: listSchema(),
      spells: listSchema(),
      traits: listSchema(),
      limitations: listSchema(),
      weapons: weaponSchema("hand", "none"),
      animal: bool(false),
      baseGear: str(""),
      gear: new fields.SchemaField({ item1: str(), item2: str() }),
      progression: num(0, { integer: true, min: 0, max: 100 }),
      status: new fields.SchemaField({
        poisoned: bool(), diseased: bool(), hunger: num(0, { integer: true, min: 0 })
      }),
      injuries: str(), notes: str()
    };
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    const next = ROSD.companionRewards.find(([pp]) => pp > this.progression);
    this.nextReward = next ? `${next[0]} PP : ${next[1]}` : "Progression maximale atteinte";
    this.earnedRewards = ROSD.companionRewards.filter(([pp]) => pp <= this.progression)
      .map(([pp, r]) => `${pp} PP : ${r}`);
  }
}

/* ------------------------------------------------------------ */
export class CreatureData extends BaseFigure {
  static defineSchema() {
    return {
      profile: str(""), emblem: this.emblemField(),
      xp: num(0, { integer: true }),
      stats: statsSchema([6, 2, 0, 10, 0]),
      health: this.defineHealth(10),
      weapons: weaponSchema("natural", "none"),
      traits: str(""),
      special: str(""),
      flags: new fields.SchemaField({
        undead: bool(), animal: bool(), large: bool(), flying: bool(),
        poison: bool(), disease: num(0, { integer: true, min: 0 }),
        horrific: num(0, { integer: true, min: 0 }),
        partialImmunity: bool(), immuneCrit: bool(), spellcaster: bool()
      }),
      notes: str()
    };
  }
}

/* ------------------------------------------------------------ */
export class ObjectData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      category: str("equipment"),
      slots: num(1, { integer: true, min: 0 }),
      quantity: num(1, { integer: true, min: 0 }),
      equipped: bool(true),
      magic: bool(false),            // compte comme arme magique
      property: str(""),             // voir ROSD.itemProperties
      activation: bool(false),       // les bonus ne s'appliquent qu'une fois l'objet activé / consommé
      active: bool(false),
      consumable: bool(false),
      charges: new fields.SchemaField({ value: num(0, { integer: true, min: 0 }), max: num(0, { integer: true, min: 0 }) }),
      weapon: new fields.SchemaField({
        kind: str(""), base: str(""), dmg: num(0), range: num(0),
        staff: bool(false), twoHanded: bool(false)
      }),
      bonus: new fields.SchemaField({
        move: num(0), fight: num(0), shoot: num(0), armour: num(0), will: num(0), dmg: num(0)
      }),
      skills: new fields.SchemaField({ a: str(""), b: str(""), value: num(0), mode: str("passive") }),
      use: new fields.SchemaField({
        heal: num(0), fullHeal: bool(false), cure: bool(false), cureDisease: bool(false),
        tempHealth: num(0), attack: num(0), range: num(0)
      }),
      description: str(""),
      notes: str("")
    };
  }

  get isWeapon() { return this.category === "weapon" && !!this.weapon.kind; }
  /** Les bonus de l'objet sont-ils actuellement en vigueur ? */
  get bonusActive() {
    if (this.activation) return this.active;
    return this.equipped && this.category !== "potion";
  }
}
