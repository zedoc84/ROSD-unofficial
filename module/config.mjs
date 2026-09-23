/**
 * Rangers of Shadow Deep — rules data (Deluxe Edition).
 * Descriptions are condensed paraphrases of the rulebook.
 */
export const ROSD = {};

ROSD.stats = {
  move:   { label: "Move", abbr: "M" },
  fight:  { label: "Fight",  abbr: "F" },
  shoot:  { label: "Shoot",  abbr: "S" },
  armour: { label: "Armour", abbr: "A" },
  will:   { label: "Will",   abbr: "W" }
};

ROSD.skills = {
  acrobatics:  "Acrobatics",
  ancientLore: "Ancient Lore",
  armoury:     "Armoury",
  climb:       "Climb",
  leadership:  "Leadership",
  navigation:  "Navigation",
  perception:  "Perception",
  pickLock:    "Pick Lock",
  readRunes:   "Read Runes",
  stealth:     "Stealth",
  strength:    "Strength",
  survival:    "Survival",
  swim:        "Swim",
  track:       "Track",
  traps:       "Traps"
};

/* ---------------------------------------------------------------- */
/* Heroic Abilities                                               */
/* ---------------------------------------------------------------- */
ROSD.abilities = {
  blendIntoShadows: { label: "Blend into the Shadows", en: "Blend into the Shadows",
    desc: "When an evil creature is about to move into combat with the ranger, resolve its action as though the ranger were not on the table." },
  callToAction: { label: "Call to Action", en: "Call to Action",
    desc: "When the ranger activates, he may activate one more companion than normal during the Ranger Phase." },
  dash: { label: "Dash", en: "Dash",
    desc: "On activation: +2 Move until the end of the turn, OR one move action becomes a leap of up to his Move in any direction, including vertically." },
  deadlyShot: { label: "Deadly Shot", en: "Deadly Shot",
    desc: "A natural 18 or 19 on a shooting roll counts as a Critical Hit." },
  deadlyStrike: { label: "Deadly Strike", en: "Deadly Strike",
    desc: "A natural 18 or 19 in a melee combat roll counts as a Critical Hit." },
  distraction: { label: "Distraction", en: "Distraction",
    desc: "When an evil creature must make a random move or move toward the Target Point, the player moves it wherever he wishes (it may not be harmed or forced to swim)." },
  diveForCover: { label: "Dive for Cover", en: "Dive for Cover",
    desc: "+10 to the Fight Roll against a shooting attack. Declare before the roll." },
  eldritchRecall: { label: "Eldritch Recall", en: "Eldritch Recall",
    desc: "At any point, regain the use of one spell already cast during the scenario." },
  enhancedPower: { label: "Enhanced Power", en: "Enhanced Power",
    desc: "For a spell that generates a shooting attack, roll three dice for each attack and keep the best. Declare beforehand. This is an exception to the one ability or spell per activation rule." },
  evade: { label: "Evade", en: "Evade",
    desc: "If the ranger activates while in combat, he may make a free 1 inch move out of the combat (no one may force combat), then activate as normal." },
  focus: { label: "Focus", en: "Focus",
    desc: "+8 to one Skill Roll. Declare before the roll." },
  frenziedAttack: { label: "Frenzied Attack", en: "Frenzied Attack",
    desc: "+5 to one Fight Roll. Declare before the roll." },
  haltUndead: { label: "Halt Undead", en: "Halt Undead",
    desc: "Every undead within 10 inches and line of sight must make a Will Roll (TN20) or lose its next activation." },
  handOfFate: { label: "Hand of Fate", en: "Hand of Fate",
    desc: "The ranger may reroll one die." },
  innerStrength: { label: "Inner Strength", en: "Inner Strength",
    desc: "+5 to one Will Roll. May be used after the roll." },
  parry: { label: "Parry", en: "Parry",
    desc: "After the Fight Rolls, add +10 to the ranger roll. If he wins, he inflicts no damage, but may push back or step back." },
  powerfulBlow: { label: "Powerful Blow", en: "Powerful Blow",
    desc: "+3 damage to a melee attack that has already inflicted at least 1 point of damage." },
  quickCast: { label: "Quick Cast", en: "Quick Cast",
    desc: "If the figure has two or more actions, it may use two actions to cast spells during that activation." },
  rollWithThePunch: { label: "Roll with the Punch", en: "Roll with the Punch",
    desc: "If the ranger loses a melee combat, he suffers only half the damage, rounding up." },
  shove: { label: "Shove", en: "Shove",
    desc: "If the ranger wins a melee combat, he may push his opponent back up to 4 inches instead of 1." },
  splitCast: { label: "Split Cast", en: "Split Cast",
    desc: "For a spell that targets a figure or a point, choose two different targets; each suffers the full effect." },
  steadyAim: { label: "Steady Aim", en: "Steady Aim",
    desc: "+5 Shoot for one shooting roll. Declare before the roll." }
};

/* ---------------------------------------------------------------- */
/* Sorts                                                             */
/* attack: magic shooting attack bonus; will: resistance TN */
/* ---------------------------------------------------------------- */
ROSD.spells = {
  amphibious:   { label: "Amphibious", en: "Amphibious",
    desc: "The target automatically passes all Swim Rolls for the rest of the scenario." },
  armour:       { label: "Armour", en: "Armour",
    desc: "The target gains +2 Armour for the rest of the scenario. Only one Armour spell at a time." },
  awareness:    { label: "Awareness", en: "Awareness",
    desc: "Cast when a Perception Roll is called for, even before or after a scenario: the roll succeeds automatically." },
  burningLight: { label: "Burning Light", en: "Burning Light", attack: 3, holyIcon: 4,
    desc: "A +3 shooting attack against every undead within 8 inches and line of sight (+4 with a holy icon)." },
  burningMark:  { label: "Burning Mark", en: "Burning Mark", attack: 5,
    desc: "Place a rune within 6 inches. The first time an evil creature moves within 2 inches of it, it explodes: a +5 magic shooting attack against every evil creature within 2 inches." },
  caltrops:     { label: "Caltrops", en: "Caltrops", will: 12,
    desc: "A 2 inch diameter circle. Any figure moving through it suffers 2 damage and must make a Will Roll (TN12); on a failure its activation ends. Undead ignore the damage." },
  compass:      { label: "Compass", en: "Compass",
    desc: "Cast when a Navigation Roll is called for: the roll succeeds automatically." },
  enchantedSteel: { label: "Enchanted Steel", en: "Enchanted Steel",
    desc: "One melee weapon counts as magic and grants +1 Fight for the rest of the scenario." },
  fireball:     { label: "Fireball", en: "Fireball", attack: 3,
    desc: "Choose a point in line of sight: every figure within 2 inches suffers a +3 shooting attack." },
  glow:         { label: "Glow", en: "Glow",
    desc: "All shooting attacks against the target are made at +3 for the rest of the game." },
  heal:         { label: "Heal", en: "Heal", heal: 5,
    desc: "A figure within 6 inches, including the caster, regains up to 5 points of Health (6 with a holy icon)." },
  holdCreature: { label: "Hold Creature", en: "Hold Creature", will: 16,
    desc: "Will Roll (TN16). On a failure the creature may not force combat this turn and loses its next activation. No effect on large creatures or undead." },
  insectClimb:  { label: "Insect Climb", en: "Insect Climb",
    desc: "No movement penalty for climbing and +10 to Climb Rolls for the rest of the game." },
  ladder:       { label: "Ladder", en: "Ladder",
    desc: "A magic ladder of any height against a vertical surface: climb it without penalty or roll. The caster may dismiss it as a free action if no one is on it." },
  leap:         { label: "Leap", en: "Leap",
    desc: "Ranger or companion only, and not in combat: an immediate 6 inch move in any direction, including upward." },
  light:        { label: "Light", en: "Light",
    desc: "If darkness has reduced maximum line of sight below 24 inches, it is restored to 24 inches." },
  lure:         { label: "Lure", en: "Lure", will: 16,
    desc: "Will Roll (TN16). On a failure the caster moves the target up to 5 inches (it may not be harmed or moved off the table). Not against a figure in combat." },
  magicBolt:    { label: "Magic Bolt", en: "Magic Bolt", attack: 5, ignoreCover: true,
    desc: "A +5 magic shooting attack against one figure in line of sight. Ignores cover and intervening terrain penalties." },
  open:         { label: "Open", en: "Open",
    desc: "Cast when a Pick Lock Roll is called for: the roll succeeds automatically." },
  quickness:    { label: "Quickness", en: "Quickness",
    desc: "The target activates in the Ranger Phase next turn and gains +1 Move for the rest of the scenario." },
  shieldOfLight:{ label: "Shield of Light", en: "Shield of Light",
    desc: "Target within 8 inches and line of sight: all shooting attacks against it are at -3 for the rest of the game (-4 with a holy icon)." },
  slow:         { label: "Slow", en: "Slow", will: 18,
    desc: "Will Roll (TN18). On a failure: -3 Move (minimum 1) for the rest of the scenario." },
  smoke:        { label: "Smoke", en: "Smoke",
    desc: "A 3 inch diameter cloud placed within 3 inches: it blocks line of sight but not movement." },
  strength:     { label: "Strength", en: "Strength",
    desc: "The target inflicts +1 damage in melee for the rest of the scenario and gains +5 to Strength Rolls." },
  strongHeart:  { label: "Strong Heart", en: "Strong Heart",
    desc: "Target within 8 inches: +5 to its next Will Roll, then +4, and so on down to +0." },
  summonCrow:   { label: "Summon Crow", en: "Summon Crow",
    desc: "At the end of the turn a bird (raptor stats, Armour 10, no skills) appears in contact and serves as a companion. After each of its activations, on a 16 or more it flies away." },
  swat:         { label: "Swat", en: "Swat", attack: 8,
    desc: "A +8 attack against one giant fly or giant spider in line of sight." },
  teleport:     { label: "Teleport", en: "Teleport",
    desc: "Move immediately up to 9 inches in any direction. No further actions this turn." },
  translate:    { label: "Translate", en: "Translate",
    desc: "Cast when a Read Runes Roll is called for: the roll succeeds automatically." },
  transpose:    { label: "Transpose", en: "Transpose",
    desc: "Immediately swap the positions of two rangers or companions, even if in combat." },
  weakness:     { label: "Weakness", en: "Weakness", will: 18,
    desc: "Will Roll (TN18). On a failure: -1 Fight, -1 Shoot and -1 Armour for the rest of the scenario." }
};

/* Spellcaster magic items */
ROSD.casterItems = {
  "": "— None —",
  focusingCrystal: "Focusing Crystal (+2 to the Will TN of its spells)",
  holyIcon: "Holy Icon (Heal 6, Burning Light +4, Shield of Light -4)",
  spellbook: "Spellbook (holds one uncast spell)",
  wand: "Wand (+1 to its spell shooting attacks)",
  wizardStaff: "Wizard’s Staff (Health → bonus to Will Rolls)"
};

/* Weapons */
ROSD.meleeWeapons = {
  hand:      { label: "Hand Weapon", dmg: 0 },
  twoHanded: { label: "Two-Handed Weapon (+2 dmg)", dmg: 2 },
  dagger:    { label: "Dagger (-1 dmg)", dmg: -1 },
  staff:     { label: "Staff (-1 dmg, opponent -1 dmg)", dmg: -1, staff: true },
  knife:     { label: "Throwing Knife in melee (-2 dmg)", dmg: -2 },
  unarmed:   { label: "Unarmed (-2 Fight, -2 dmg)", dmg: -2, fight: -2 },
  natural:   { label: "Natural Weapons", dmg: 0 }
};

ROSD.rangedWeapons = {
  none:     { label: "— None —", dmg: 0, range: 0 },
  bow:      { label: "Bow (24\", +0)", dmg: 0, range: 24 },
  crossbow: { label: "Crossbow (24\", +2)", dmg: 2, range: 24 },
  knife:    { label: "Throwing Knife (8\", -1)", dmg: -1, range: 8 },
  bones:    { label: "Flung Bones (10\", +0)", dmg: 0, range: 10 },
  other:    { label: "Other", dmg: 0, range: 0 }
};

/* Basic equipment (suggestions for the item slots) */
ROSD.basicEquipment = [
  "Bow", "Crossbow", "Dagger", "Hand Weapon", "Heavy Armour (+2 A, -1 M)", "Light Armour (+1 A)",
  "Quiver", "Rope", "Shield (+1 A)", "Staff", "Throwing Knife", "Two-Handed Weapon (2 slots)"
];

/* Shooting modifiers (added to the target score) */
ROSD.shootingMods = {
  light:   { label: "Light cover (+2)", value: 2 },
  heavy:   { label: "Heavy cover (+4)", value: 4 },
  hurried: { label: "Hurried shot: the shooter moved (+1)", value: 1 },
  large:   { label: "Large target (-2)", value: -2 }
};

/* ---------------------------------------------------------------- */
/* Companions — stats: [M, F, S, A, W, Health] */
/* ---------------------------------------------------------------- */
ROSD.companions = {
  arcanist:   { label: "Arcanist", rp: 15, stats: [6,2,0,10,2,10], melee: "hand", ranged: "none",
    gear: "Hand weapon", skills: { ancientLore: 5, readRunes: 5 } },
  archer:     { label: "Archer", rp: 20, stats: [6,2,2,11,1,10], melee: "dagger", ranged: "bow",
    gear: "Bow OR crossbow, dagger, light armour, quiver" },
  barbarian:  { label: "Barbarian", rp: 35, stats: [6,4,0,11,3,14], melee: "hand", ranged: "none",
    gear: "Hand weapon, shield", skills: { strength: 5 } },
  conjuror:   { label: "Conjuror", rp: 20, stats: [6,0,0,10,3,12], melee: "staff", ranged: "none",
    gear: "Staff OR hand weapon. Two spells chosen before each scenario (a third spell: +10 RP)" },
  guardsman:  { label: "Guardsman", rp: 20, stats: [6,3,0,11,2,12], melee: "twoHanded", ranged: "none",
    gear: "Two-handed weapon, light armour" },
  hound:      { label: "Hound", rp: 5, stats: [8,0,0,10,-2,6], melee: "natural", ranged: "none", animal: true,
    gear: "Animal: carries no items or treasure. Limited skills (Acrobatics, Climb, Perception, Stealth, Swim, Track)" },
  warhound:   { label: "War Hound", rp: 10, stats: [8,1,0,10,-2,8], melee: "natural", ranged: "none", animal: true,
    gear: "Animal: carries no items or treasure. Limited skills (Acrobatics, Climb, Perception, Stealth, Swim, Track)" },
  bloodhound: { label: "Tracking Hound", rp: 10, stats: [8,0,0,10,-2,6], melee: "natural", ranged: "none", animal: true,
    gear: "Animal: carries no items or treasure. Limited skills. +2 to the Track Rolls of a ranger within 2\"", skills: { track: 5 } },
  knight:     { label: "Knight", rp: 35, stats: [5,4,0,13,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, shield, heavy armour", skills: { strength: 4 } },
  manAtArms:  { label: "Man-at-Arms", rp: 20, stats: [6,3,0,12,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, shield, light armour" },
  raptor:     { label: "Raptor", rp: 10, stats: [9,0,0,14,3,1], melee: "natural", ranged: "none", animal: true,
    gear: "Flying animal: ignores terrain penalties, automatically passes Climb and Swim. Limited skills (Acrobatics, Perception, Stealth)", skills: { perception: 4 } },
  recruit:    { label: "Recruit", rp: 10, stats: [6,2,0,10,0,10], melee: "hand", ranged: "none",
    gear: "Hand weapon" },
  rogue:      { label: "Rogue", rp: 20, stats: [7,1,1,10,1,10], melee: "dagger", ranged: "knife",
    gear: "Dagger, throwing knife", skills: { climb: 2, perception: 2, pickLock: 5, traps: 5, stealth: 5 } },
  savage:     { label: "Savage", rp: 35, stats: [6,4,0,10,3,14], melee: "twoHanded", ranged: "none",
    gear: "Two-handed weapon", skills: { strength: 5 } },
  swordsman:  { label: "Swordsman", rp: 25, stats: [6,4,0,11,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, dagger, light armour" },
  templar:    { label: "Templar", rp: 35, stats: [5,4,0,12,2,12], melee: "twoHanded", ranged: "none",
    gear: "Two-handed weapon, heavy armour", skills: { strength: 4 } },
  tracker:    { label: "Tracker", rp: 30, stats: [7,2,2,11,2,12], melee: "staff", ranged: "bow",
    gear: "Staff, bow, quiver, light armour", skills: { track: 5 } }
};

/* ---------------------------------------------------------------- */
/* Bestiary — stats: [M, F, S, A, W, Health] */
/* ---------------------------------------------------------------- */
ROSD.bestiary = {
  bloodBat:      { label: "Blood Bat", xp: 1, stats: [8,1,0,12,3,1], traits: "Animal, Flying", animal: true, flying: true },
  burrowWorm:    { label: "Burrow Worm", xp: 8, stats: [5,3,0,10,3,14], traits: "Animal, Burrower (moves through solid terrain)", animal: true },
  civilian:      { label: "Civilian", xp: 0, stats: [6,0,0,10,0,10], traits: "Dagger", melee: "dagger" },
  darkrootBody:  { label: "Darkroot (body)", xp: 6, stats: [0,3,0,14,0,18], traits: "Immobile. Bows, crossbows and knives: maximum 2 damage. If the body dies, all the vines are removed." },
  darkrootVine:  { label: "Darkroot (vine)", xp: 0, stats: [6,1,0,10,0,6], traits: "Mobile vine of the darkroot" },
  fleshGolem:    { label: "Flesh Golem", xp: 5, stats: [5,4,0,10,0,16], traits: "Undead, Horrific (TN8)", undead: true, horrific: 8 },
  ghoul:         { label: "Ghoul", xp: 3, stats: [6,2,0,10,2,10], traits: "Undead", undead: true },
  ghoulFiend:    { label: "Ghoul Fiend", xp: 4, stats: [6,3,0,11,6,14], traits: "Undead", undead: true },
  ghoulFlinger:  { label: "Ghoul Flinger", xp: 3, stats: [6,1,1,10,2,10], traits: "Undead, Flings bones (10\", +0)", undead: true, ranged: "bones" },
  ghoulRotter:   { label: "Ghoul Rotter", xp: 2, stats: [6,1,0,10,0,8], traits: "Undead, Disease (TN14)", undead: true, disease: 14 },
  ghoulSnake:    { label: "Ghoul Snake", xp: 3, stats: [5,2,0,8,0,16], traits: "Undead", undead: true },
  giantFly:      { label: "Giant Fly", xp: 2, stats: [6,0,0,6,0,5], traits: "Animal, Flying, Disease (TN8)", animal: true, flying: true, disease: 8 },
  giantRat:      { label: "Giant Rat", xp: 2, stats: [6,0,0,6,0,1], traits: "Animal, Disease (TN8)", animal: true, disease: 8 },
  giantSpider:   { label: "Giant Spider", xp: 2, stats: [6,0,0,8,0,4], traits: "Animal, Poison, No penalty for rough ground or climbing", animal: true, poison: true },
  giantSnake:    { label: "Giant Snake", xp: 3, stats: [5,2,0,8,0,10], traits: "Animal, Amphibious (giant water snake) or Poison (giant viper)", animal: true },
  gnollFighter:  { label: "Gnoll Fighter", xp: 3, stats: [6,2,0,11,0,10], traits: "Hand weapon, light armour", melee: "hand" },
  gnollArcher:   { label: "Gnoll Archer", xp: 3, stats: [6,1,2,11,0,10], traits: "Dagger, bow or crossbow, quiver, light armour", melee: "dagger", ranged: "bow" },
  gnollSergeant: { label: "Gnoll Sergeant", xp: 3, stats: [6,3,0,11,0,12], traits: "Two-handed weapon, light armour", melee: "twoHanded" },
  gnollShaman:   { label: "Gnoll Shaman", xp: 5, stats: [6,1,0,11,5,12], traits: "Hand weapon, Poison, Inspiring (+2 Will to gnolls within 6\")", melee: "hand", poison: true },
  ogre:          { label: "Ogre", xp: 5, stats: [6,3,0,12,0,14], traits: "Large, Two-handed weapon", large: true, melee: "twoHanded" },
  shadowKnight:  { label: "Shadow Knight", xp: 10, stats: [6,4,0,12,0,14], traits: "Undead, Partial immunity to non-magic weapons (damage ÷2)", undead: true, partialImmunity: true },
  skeletalKnight:{ label: "Skeletal Knight", xp: 2, stats: [6,3,0,13,0,1], traits: "Undead", undead: true },
  skeleton:      { label: "Skeleton", xp: 1, stats: [6,1,0,10,0,1], traits: "Undead", undead: true },
  swampZombie:   { label: "Swamp Zombie", xp: 2, stats: [4,0,0,12,0,6], traits: "Undead, Amphibious", undead: true },
  terrorWing:    { label: "Terror Wing", xp: 20, stats: [6,5,0,14,8,16], traits: "Large, Horrific (TN12), Flying, Spellcaster (see scenario)", large: true, flying: true, horrific: 12 },
  torturedSoul:  { label: "Tortured Soul", xp: 10, stats: [6,0,0,0,0,1], traits: "Undead. -2 Will to all heroes. Never fights and cannot be harmed. Released by a Will or Leadership Roll (TN20) in contact (+10 XP).", undead: true },
  troll:         { label: "Troll", xp: 8, stats: [4,4,0,14,2,16], traits: "Large, Two-handed weapon. On a 20 when placed: two-headed troll (its opponents get one less support bonus)", large: true, melee: "twoHanded" },
  vulture:       { label: "Vulture", xp: 3, stats: [6,0,0,14,0,4], traits: "Animal, Flying", animal: true, flying: true },
  wolf:          { label: "Wolf", xp: 2, stats: [8,1,0,10,0,6], traits: "Animal", animal: true },
  zombie:        { label: "Zombie", xp: 2, stats: [4,0,0,12,0,6], traits: "Undead", undead: true }
};

/* ---------------------------------------------------------------- */
/* Campaign tables */
/* ---------------------------------------------------------------- */
ROSD.survivalTable = [
  { max: 2,  label: "Dead", desc: "The figure is killed. If it is the ranger, the mission ends immediately." },
  { max: 4,  label: "Permanent Injury", desc: "Roll on the Permanent Injury Table.", injury: true },
  { max: 6,  label: "Badly Injured", desc: "Starts the next game at -5 Health (a companion may instead sit out the rest of the mission)." },
  { max: 8,  label: "Close Call", desc: "Minor injuries, but all non-standard equipment is lost." },
  { max: 99, label: "Full Recovery", desc: "Returns to full Health for the next scenario." }
];

ROSD.injuryTable = [
  { max: 2,  label: "Lost Toes", desc: "-0.5 Move (may be taken twice)." },
  { max: 5,  label: "Broken Leg", desc: "-1 Move (may be taken twice)." },
  { max: 10, label: "Crushed Arm", desc: "-1 Fight (may be taken twice)." },
  { max: 12, label: "Lost Fingers", desc: "-1 Shoot (may be taken twice)." },
  { max: 14, label: "Never as Strong", desc: "Starts every game at -1 Health (may be taken twice)." },
  { max: 16, label: "Psychological Scars", desc: "-1 Will (may be taken twice)." },
  { max: 18, label: "Shattered Jaw", desc: "Ranger: only one companion activates in the Ranger Phase and -3 to Leadership Rolls. Companion: no advancement this scenario." },
  { max: 20, label: "Lost Eye", desc: "-1 to Fight Rolls when the figure is the target of a shooting attack. Twice: blinded, career over." }
];

/* XP cost to reach the given level */
ROSD.xpCost = level => {
  if (level <= 5) return 100;
  if (level <= 10) return 150;
  if (level <= 15) return 200;
  if (level <= 20) return 250;
  if (level <= 30) return 300;
  if (level <= 40) return 400;
  if (level <= 50) return 500;
  return 1000;
};

ROSD.levelBonus = level => {
  switch (level % 4) {
    case 1: return "Improve skills (+5 in total, maximum +2 per skill)";
    case 2: return "Improve one stat (+1; maximum M 7, F +5, S +5, W +8, Health 22)";
    case 3: return "+10 Base Recruitment Points";
    default: return "A new Heroic Ability";
  }
};

ROSD.companionRewards = [
  [10, "+1 Health"], [20, "+1 Fight or +1 Shoot"], [30, "+4 to one skill (maximum +10)"],
  [40, "+2 Will"], [50, "One Heroic Ability"], [60, "+1 Health"],
  [70, "+4 to one skill (maximum +10)"], [80, "+2 Will"], [100, "One Heroic Ability"]
];

/* Total Recruitment Points by number of players */
ROSD.recruitment = {
  1: { calc: brp => brp, max: 7, activate: 2 },
  2: { calc: brp => Math.floor(brp * 0.5) - 10, max: 3, activate: 1 },
  3: { calc: brp => Math.floor(brp * 0.3), max: 2, activate: 0 },
  4: { calc: brp => Math.floor(brp * 0.1), max: 1, activate: 0 }
};

ROSD.creatureAI = `<ol>
<li><b>In combat?</b> It fights. If it wins, it stays in contact and does not use its second action.</li>
<li><b>A hero in line of sight?</b> With a missile weapon in range it shoots the closest hero (second action: reload a crossbow). Otherwise it moves toward the closest hero; if it reaches contact it fights, if not it moves again.</li>
<li><b>Target Point?</b> Yes: one action toward the Target Point. No: a random move. Then back to step 2 for the second action.</li>
</ol>
<p>Activation order: highest current Health first. Creatures always force combat, attack the hero with the lowest Health in a multiple combat and never score critical hits.</p>`;

/* ================================================================ */
/* Objets                                                           */
/* ================================================================ */
ROSD.itemCategories = {
  weapon: "Weapon",
  armour: "Armour / shield",
  equipment: "Equipment",
  potion: "Herb or potion",
  magic: "Magic item",
  treasure: "Treasure",
  other: "Other"
};

ROSD.weaponKinds = { "": "—", melee: "Melee", ranged: "Missile", thrown: "Thrown (melee back-up)" };

ROSD.itemProperties = {
  "": "— Aucune —",
  magic: "Magic: activated, +1 Fight (or Shoot) and counts as a magic weapon for the game",
  light: "Light: takes up no item slot (only one light item at a time)",
  brightness: "Brightness: +5 to the Fight Roll against a shooting attack (declare beforehand)",
  blocking: "Blocking: after losing a combat, no damage is suffered",
  elemental: "Elemental Strike: +5 damage when the combat is won",
  fate: "Fate: reroll one die",
  attack: "Attack: the item generates a shooting attack",
  recoverSpell: "Recovers a spell already cast",
  recoverAbility: "Recovers a Heroic Ability already used"
};

/* Compact builder for the catalogue items */
const IT = (name, category, img, sys = {}) => ({ name, type: "objet", img: `icons/svg/${img}.svg`, system: { category, ...sys } });
const B = o => ({ bonus: { move: 0, fight: 0, shoot: 0, armour: 0, will: 0, dmg: 0, ...o } });
const WPN = (kind, base, dmg, range = 0, extra = {}) => ({ weapon: { kind, base, dmg, range, staff: base === "staff", twoHanded: base === "twoHanded", ...extra } });

const BASIC = [
  IT("Bow", "weapon", "target", { slots: 1, ...WPN("ranged", "bow", 0, 24),
    description: "Loaded and shot with a single action. Range 24\", no damage modifier. Requires a quiver (or magic ammunition)." }),
  IT("Crossbow", "weapon", "target", { slots: 1, ...WPN("ranged", "crossbow", 2, 24),
    description: "One action to load, one to shoot (reloading may replace the move action). +2 damage, range 24\". Starts the game loaded. Requires a quiver." }),
  IT("Dagger", "weapon", "sword", { slots: 1, ...WPN("melee", "dagger", -1),
    description: "A knife not balanced for throwing. -1 damage. A ranger’s first dagger or throwing knife takes up no item slot." }),
  IT("Hand Weapon", "weapon", "sword", { slots: 1, ...WPN("melee", "hand", 0),
    description: "Sword, mace, axe, spear… No combat modifier." }),
  IT("Heavy Armour", "armour", "shield", { slots: 1, ...B({ armour: 2, move: -1 }),
    description: "Mostly metal armour: +2 Armour, -1 Move. Only one suit of armour (light or heavy) at a time." }),
  IT("Light Armour", "armour", "shield", { slots: 1, ...B({ armour: 1 }),
    description: "Leather or other non-metal armour: +1 Armour." }),
  IT("Quiver", "equipment", "item-bag", { slots: 1,
    description: "Required to shoot a bow or crossbow normally. Also carries one piece of magic ammunition without using another slot." }),
  IT("Rope", "equipment", "net", { slots: 1,
    description: "At the top of a vertical surface, spend one action to fix the rope. Any figure may then climb it with no movement penalty. One rope per game per item." }),
  IT("Shield", "armour", "shield", { slots: 1, ...B({ armour: 1 }),
    description: "+1 Armour. May not be used with a two-handed weapon or a staff." }),
  IT("Staff", "weapon", "sword", { slots: 1, ...WPN("melee", "staff", -1),
    description: "-1 damage, but the opponent also suffers -1 damage in melee (not against shooting attacks)." }),
  IT("Throwing Knife", "weapon", "thrust", { slots: 1, ...WPN("thrown", "knife", -1, 8),
    description: "One shooting attack per game per knife: range 8\", -1 damage. As a back-up melee weapon: -2 damage. A ranger’s first knife or dagger takes up no item slot." }),
  IT("Two-Handed Weapon", "weapon", "sword", { slots: 2, ...WPN("melee", "twoHanded", 2),
    description: "Greatsword, battleaxe, polearm… +2 damage. Takes up two item slots for a ranger." })
];

const USE = o => ({ consumable: true, use: { heal: 0, fullHeal: false, cure: false, cureDisease: false, tempHealth: 0, attack: 0, range: 0, ...o } });

const HERBS = [
  IT("Dremlocke Herb", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ will: 5 }),
    description: "The user gains +5 to all Will Rolls for the rest of the scenario." }),
  IT("Farlight Leaf", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ shoot: 1, fight: -1, will: -1 }),
    description: "+1 Shoot, but -1 Fight and -1 Will for the rest of the scenario." }),
  IT("Fireheart Green", "potion", "oak", { slots: 1, ...USE(),
    description: "+1 action on the next activation (maximum three actions)." }),
  IT("Fury Leaves", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ dmg: 1, will: -2 }),
    description: "+1 damage whenever the user wins a combat, but -2 Will." }),
  IT("Ironbark Powder", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ armour: 1, will: -2 }),
    description: "+1 Armour, but -2 Will." }),
  IT("Nightnut", "potion", "oak", { slots: 1, ...USE({ cureDisease: true }),
    description: "Taken before a scenario by a diseased figure: the disease is cured and has no effect in the next scenario." }),
  IT("Quickbeam Root", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ move: 2, will: -2 }),
    description: "+2 Move, but -2 Will." }),
  IT("Haik Wheat", "potion", "oak", { slots: 1, ...USE({ tempHealth: 2 }), activation: true, ...B({ will: -1 }),
    description: "+2 temporary Health (may exceed the maximum, for the scenario), but -1 Will." }),
  IT("Silverweed", "potion", "oak", { slots: 1, ...USE(),
    description: "Burned, it gives off a stench gnolls hate: every gnoll in combat with the user suffers -1 Fight." }),
  IT("Anthalas", "potion", "oak", { slots: 1, ...USE(),
    description: "After a game, the ranger or one companion gains +1 to its survival roll. Declare before the roll." }),
  IT("Potion of Healing", "potion", "heal", { slots: 1, ...USE({ heal: 5, cure: true }),
    description: "Restores 5 points of Health (up to the maximum) and removes the effects of poison." }),
  IT("Potion of Strength", "potion", "upgrade", { slots: 1, ...USE(), activation: true, ...B({ fight: 1 }),
    description: "+1 Fight for the rest of the scenario." }),
  IT("Potion of Toughness", "potion", "upgrade", { slots: 1, ...USE(), activation: true, ...B({ armour: 1 }),
    description: "+1 Armour for the rest of the scenario." }),
  IT("Fairy Dust Philtre", "potion", "aura", { slots: 1, ...USE(),
    description: "Sprinkled on a weapon, it counts as magic. On an arrow or bolt the effect lasts for one shot only." }),
  IT("Explosive Cocktail", "potion", "fire", { slots: 1, ...USE({ attack: 3, range: 8 }), property: "attack",
    description: "One action to throw it up to 8\" in line of sight: every figure within 2\" of the impact point suffers a +3 shooting attack." }),
  IT("Spellflame Cordial", "potion", "lightning", { slots: 1, ...USE(), property: "recoverSpell",
    description: "The figure regains the use of one spell already cast during the scenario." }),
  IT("Potion of Ghostwalking", "potion", "invisible", { slots: 1, ...USE(),
    description: "For one turn the figure moves through terrain as though it were not there." }),
  IT("Potion of Slow Fall", "potion", "falling", { slots: 1, ...USE(),
    description: "For one turn the figure may fall from any height without taking damage." }),
  IT("Potion of Heroism", "potion", "upgrade", { slots: 1, ...USE(), property: "recoverAbility",
    description: "The figure regains the use of one Heroic Ability already used during the scenario." }),
  IT("Potion of Restoration", "potion", "regen", { slots: 1, ...USE({ fullHeal: true, cure: true, cureDisease: true }),
    description: "Restores full starting Health and cures poison, disease and temporary stat losses. After a game it also cures one permanent injury of choice." })
];

const CH = n => ({ charges: { value: n, max: n } });
const MAGICW = (name, base, kind, dmg, range, slots, img) =>
  IT(`${name}, Magic`, "weapon", img, { slots, magic: true, property: "magic", activation: true, ...CH(5), ...WPN(kind, base, dmg, range),
    ...B(kind === "ranged" ? { shoot: 1 } : { fight: 1 }),
    description: `Magic weapon (5 charges). At any point the bearer may activate it (1 charge): it counts as magic and grants +1 ${kind === "ranged" ? "Shoot" : "Fight"} for the rest of the game. With no charges left it is an ordinary weapon.` });

const WEAPONS_ARMOUR = [
  MAGICW("Hand Weapon", "hand", "melee", 0, 0, 1, "sword"),
  MAGICW("Two-Handed Weapon", "twoHanded", "melee", 2, 0, 2, "sword"),
  MAGICW("Bow", "bow", "ranged", 0, 24, 1, "target"),
  MAGICW("Crossbow", "crossbow", "ranged", 2, 24, 1, "target"),
  MAGICW("Staff", "staff", "melee", -1, 0, 1, "sword"),
  IT("Hand Weapon, Light", "weapon", "sword", { slots: 0, property: "light", ...WPN("melee", "hand", 0),
    description: "Precious alloy: takes up no item slot. Only one light item at a time. Unlimited use." }),
  IT("Two-Handed Weapon, Light", "weapon", "sword", { slots: 0, property: "light", ...WPN("melee", "twoHanded", 2),
    description: "+2 damage. Takes up no item slot. Only one light item at a time." }),
  IT("Dagger, Light", "weapon", "sword", { slots: 0, property: "light", ...WPN("melee", "dagger", -1),
    description: "-1 damage. Takes up no item slot. Only one light item at a time." }),
  IT("Throwing Knife, Light", "weapon", "thrust", { slots: 0, property: "light", ...WPN("thrown", "knife", -1, 8),
    description: "Range 8\", -1 damage. Takes up no item slot. Only one light item at a time." }),
  IT("Shield, Brightness", "armour", "holy-shield", { slots: 1, property: "brightness", ...CH(5), ...B({ armour: 1 }),
    description: "+1 Armour. Brightness (5 charges): when the bearer is the target of a shooting attack, +5 to its Fight Roll (declare before the roll)." }),
  IT("Light Armour, Brightness", "armour", "holy-shield", { slots: 1, property: "brightness", ...CH(5), ...B({ armour: 1 }),
    description: "+1 Armour. Brightness (5 charges): +5 to the Fight Roll against a shooting attack (before the roll)." }),
  IT("Heavy Armour, Brightness", "armour", "holy-shield", { slots: 1, property: "brightness", ...CH(5), ...B({ armour: 2, move: -1 }),
    description: "+2 Armour, -1 Move. Brightness (5 charges): +5 to the Fight Roll against a shooting attack (before the roll)." }),
  IT("Hand Weapon, Elemental Strike", "weapon", "lightning", { slots: 1, property: "elemental", ...CH(3), ...WPN("melee", "hand", 0),
    description: "Elemental Strike (3 charges): after winning a combat that inflicts at least 1 damage, +5 elemental magic damage." }),
  IT("Two-Handed Weapon, Elemental Strike", "weapon", "lightning", { slots: 2, property: "elemental", ...CH(3), ...WPN("melee", "twoHanded", 2),
    description: "+2 damage. Elemental Strike (3 charges): +5 damage after winning a combat that inflicts at least 1 damage." }),
  IT("Staff, Elemental Strike", "weapon", "lightning", { slots: 1, property: "elemental", ...CH(3), ...WPN("melee", "staff", -1),
    description: "Staff. Elemental Strike (3 charges): +5 damage after winning a combat that inflicts at least 1 damage." }),
  IT("Shield, Blocking", "armour", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...B({ armour: 1 }),
    description: "+1 Armour. Blocking (1 charge): after losing a melee combat, the bearer suffers no damage." }),
  IT("Light Armour, Blocking", "armour", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...B({ armour: 1 }),
    description: "+1 Armour. Blocking (1 charge): after losing a combat, no damage is suffered." }),
  IT("Heavy Armour, Blocking", "armour", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...B({ armour: 2, move: -1 }),
    description: "+2 Armour, -1 Move. Blocking (1 charge): after losing a combat, no damage is suffered." }),
  IT("Hand Weapon, Blocking", "weapon", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...WPN("melee", "hand", 0),
    description: "Blocking (1 charge): after losing a melee combat, no damage is suffered." }),
  IT("Two-Handed Weapon, Blocking", "weapon", "mage-shield", { slots: 2, property: "blocking", ...CH(1), ...WPN("melee", "twoHanded", 2),
    description: "+2 damage. Blocking (1 charge): after losing a combat, no damage is suffered." })
];

const SK = (a, value, mode = "passive", b = "") => ({ skills: { a, b, value, mode } });

const MAGIC_ITEMS = [
  IT("Spellflame Gem", "magic", "lightning", { slots: 1, property: "recoverSpell", ...CH(1),
    description: "Lets the bearer cast one of its spells without spending it for the scenario (1 charge)." }),
  IT("Sunfire Pendant", "magic", "sun", { slots: 1, ...CH(3),
    description: "Free action (3 charges): for the rest of the game all of the bearer’s attacks against undead count as magic, and undead in combat with it suffer -2 Fight and -2 Armour." }),
  IT("Herb Pouch", "magic", "item-bag", { slots: 1,
    description: "Takes up one item slot but holds two herbs." }),
  IT("Book of Lore", "magic", "book", { slots: 1, ...SK("ancientLore", 2, "passive", "readRunes"),
    description: "+2 to all Ancient Lore and Read Runes Rolls." }),
  IT("Enchanted Lockpicks", "magic", "padlock", { slots: 1, ...CH(5), ...SK("pickLock", 5, "use"),
    description: "+5 to one Pick Lock Roll, declared before the roll (5 charges)." }),
  IT("Greyleaf Cloak", "magic", "invisible", { slots: 1, ...SK("stealth", 2),
    description: "+2 to all Stealth Rolls." }),
  IT("Gauntlets of Strength", "magic", "upgrade", { slots: 1, ...CH(5), ...SK("strength", 5, "use"),
    description: "+5 to one Strength Roll, declared before the roll (5 charges)." }),
  IT("Amulet of Command", "magic", "aura", { slots: 1,
    description: "+5 to the total Recruitment Points of the ranger carrying it for the coming mission." }),
  IT("Climbing Gloves", "magic", "upgrade", { slots: 1, ...CH(5), ...SK("climb", 5, "use"),
    description: "+5 to one Climb Roll, declared before the roll (5 charges)." }),
  IT("Eagle-Eye Brooch", "magic", "eye", { slots: 1, ...SK("perception", 2),
    description: "+2 to all Perception Rolls." }),
  IT("Ring of Teleportation", "magic", "portal", { slots: 1, ...CH(1),
    description: "One action (1 charge): the figure immediately moves up to 10\" in any direction, to a point in line of sight." }),
  IT("Boots of Soft Tread", "magic", "upgrade", { slots: 1, ...CH(2),
    description: "Activated during an activation (2 charges): until the end of the turn, ignore rough ground penalties." }),
  IT("Cloak of Invisibility", "magic", "invisible", { slots: 1, ...CH(2),
    description: "At any point (2 charges): until the end of the turn no evil creature forces combat with the figure or takes it into account. +8 to Stealth Rolls while invisible." }),
  IT("Fishglass", "magic", "waterfall", { slots: 1, ...CH(1),
    description: "Once swallowed (1 charge), the figure automatically passes all Swim Rolls for the rest of the game." }),
  IT("Lightheart Gem", "magic", "sun", { slots: 1, ...CH(1),
    description: "Discard it during an activation: one extra action (maximum three actions)." }),
  IT("Spell Ring", "magic", "mage-shield", { slots: 1, ...CH(1),
    description: "Choose a spell when the ring is found (note it here). The bearer may spend one action to cast it; the ring is then destroyed." }),
  IT("Tool Kit", "magic", "item-bag", { slots: 1, ...SK("armoury", 2, "passive", "traps"),
    description: "+2 to all Armoury and Traps Rolls." }),
  IT("Spellward Pendant", "magic", "holy-shield", { slots: 1, ...CH(1),
    description: "When the bearer must make a Will Roll to resist a spell, it may discard the pendant to cancel the spell, even after the roll." }),
  IT("Fireball Orb", "magic", "fire", { slots: 1, ...CH(1), ...USE({ attack: 5, range: 10 }), property: "attack",
    description: "One action to throw it up to 10\": every figure within 2\" of the impact point suffers a +5 elemental magic shooting attack." }),
  IT("Fate Stone", "magic", "dice-target", { slots: 1, property: "fate", ...CH(1),
    description: "Allows one die to be rerolled (1 charge)." })
];

ROSD.itemCatalog = [
  { folder: "Basic Equipment", items: BASIC },
  { folder: "Herbs & Potions", items: HERBS },
  { folder: "Magic Weapons & Armour", items: WEAPONS_ARMOUR },
  { folder: "Magic Items", items: MAGIC_ITEMS }
];

/* ================================================================ */
/* Supplements */
/* ================================================================ */
import { SUP_ABILITIES, SUP_SPELLS, TRAITS, LIMITATIONS, ARCHETYPES } from "./supplements-rules.mjs";
import { SUP_RANGED, SUP_COMPANIONS, SUP_BESTIARY } from "./supplements-figures.mjs";
import { SUP_ITEM_CATALOG } from "./supplements-items.mjs";

for (const v of Object.values(ROSD.abilities)) v.src ??= "Core Rulebook";
for (const v of Object.values(ROSD.spells)) v.src ??= "Core Rulebook";
for (const v of Object.values(ROSD.companions)) v.src ??= "Core Rulebook";
for (const v of Object.values(ROSD.bestiary)) v.src ??= "Core Rulebook";
ROSD.spells.lure.en = "Lure / Distraction";
Object.assign(ROSD.abilities, SUP_ABILITIES);
Object.assign(ROSD.spells, SUP_SPELLS);
Object.assign(ROSD.rangedWeapons, SUP_RANGED);
Object.assign(ROSD.companions, SUP_COMPANIONS);
Object.assign(ROSD.bestiary, SUP_BESTIARY);
ROSD.traits = TRAITS;
ROSD.limitations = LIMITATIONS;
ROSD.archetypes = ARCHETYPES;
ROSD.itemCatalog.push(...SUP_ITEM_CATALOG);
