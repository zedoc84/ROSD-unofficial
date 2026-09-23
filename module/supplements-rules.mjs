/**
 * Rangers of Shadow Deep — supplement content (1/2)
 * Heroic Abilities, spells, traits, limitations and archetypes.
 * Sources : A Gathering of Heroes, Temple of Madness, Ghost Stone, Blood Moon,
 * Incinerator, Menagerie, Across the Wastes, Ashen Sky, Tenebrous Citadel.
 * Texts are condensed paraphrases.
 */

/* ------------------------------------------------------------------ */
/* New Heroic Abilities */
/* ------------------------------------------------------------------ */
export const SUP_ABILITIES = {
  flashingBlade: { label: "Flashing Blade", en: "Flashing Blade", src: "A Gathering of Heroes",
    desc: "If the figure activates while in combat, it makes an immediate free attack against one opponent in contact, then activates as normal." },
  quickStrike: { label: "Quick Strike", en: "Quick Strike", src: "A Gathering of Heroes",
    desc: "When the figure forces combat with an enemy, it immediately makes a free attack against it." },
  tumble: { label: "Tumble", en: "Tumble", src: "A Gathering of Heroes",
    desc: "During a move, name one enemy: it may not force combat provided the figure ends its move more than 1 inch away." },
  doubleShot: { label: "Double Shot", en: "Double Shot", src: "A Gathering of Heroes",
    desc: "With one shooting action, make two attacks against two different enemies that are within 6 inches of one another." },
  fireShot: { label: "Fire Shot", en: "Fire Shot", src: "A Gathering of Heroes",
    desc: "After a shot that inflicts damage, the arrow explodes and inflicts an extra 5 points of magic damage." },
  smokeShot: { label: "Smoke Shot", en: "Smoke Shot", src: "A Gathering of Heroes",
    desc: "A 3 inch smoke cloud that blocks line of sight, centred on the chosen point or on the figure hit. At the end of each turn, on a 1 or 2 it disperses." },
  whirlingDeath: { label: "Whirling Death", en: "Whirling Death", src: "A Gathering of Heroes",
    desc: "If the figure activates in combat with more than one enemy, it may use one action to attack each of them; no support bonuses apply on either side." },
  sneakAttack: { label: "Sneak Attack", en: "Sneak Attack", src: "A Gathering of Heroes",
    desc: "If the figure was disguised as the enemy at the start of the turn, all of its attacks are at +2 that turn." }
};

/* ------------------------------------------------------------------ */
/* New spells */
/* ------------------------------------------------------------------ */
export const SUP_SPELLS = {
  darkVision: { label: "Dark Vision", en: "Dark Vision", src: "A Gathering of Heroes",
    desc: "One figure within 6 inches and line of sight sees in the dark: it suffers no penalties from darkness." },
  purifyBlood: { label: "Purify Blood", en: "Purify Blood", src: "A Gathering of Heroes",
    desc: "A figure in line of sight is cured of poison and disease and gains +1 to Will Rolls for the rest of the game." },
  sproutMushrooms: { label: "Sprout Mushrooms", en: "Sprout Mushrooms", src: "A Gathering of Heroes",
    desc: "Cast just before a game: up to four figures no longer suffer from hunger and thirst." },
  invisibility: { label: "Invisibility", en: "Invisibility", src: "A Gathering of Heroes",
    desc: "Until the caster next activates, no one may force combat with him or draw line of sight to him. While invisible he may not attack or pick up treasure." },
  paperCrane: { label: "Paper Crane", en: "Paper Crane", src: "A Gathering of Heroes",
    desc: "Creates a paper bird companion (M7, F+0, S+0, A10, W+0, H1; flying, maximum damage 5). Only one crane at a time; it burns if it comes within 2 inches of an open flame." },
  detonation: { label: "Detonation", en: "Detonation", src: "Ghost Stone", attack: 5,
    desc: "Place a marker: it explodes at the end of the following turn. Every figure within 4 inches suffers a +5 shooting attack and one small piece of scenery in contact is destroyed." }
};

/* ------------------------------------------------------------------ */
/* Traits (A Gathering of Heroes) */
/* ------------------------------------------------------------------ */
export const TRAITS = {
  animalFriend: { label: "Animal Friend", cost: "\u00bd BP", desc: "An animal companion costs 10 RP less (minimum 0)." },
  calling: { label: "Calling", cost: "\u00bd BP", desc: "A personal goal or oath: +2 to +15 XP (agreed in advance) in each scenario where it is fulfilled." },
  darkVision: { label: "Dark Vision", cost: "\u00bd BP", desc: "No penalties from gloom or darkness." },
  deflectArrows: { label: "Deflect Arrows", cost: "\u00bd BP", desc: "With a shield: +4 Fight against shooting attacks." },
  determineWeakness: { label: "Determine Weakness", cost: "1 BP", desc: "One action and an Ancient Lore Roll (TN 10 + the creature\u2019s Will). On a success, all heroes gain +1 Fight against that exact type of creature for the rest of the scenario." },
  diseaseImmunity: { label: "Disease Immunity", cost: "\u00bd BP", desc: "Completely immune to disease." },
  enchantArrow: { label: "Enchant Arrow", cost: "\u00bd BP", desc: "One action (may replace the move): the next bow shot counts as magic and inflicts +1 damage." },
  endureHardship: { label: "Endure Hardship", cost: "\u00bd BP", desc: "Hunger and thirst cost only -1 Health instead of -2. +5 to rolls against disease." },
  favouredEnemy: { label: "Favoured Enemy", cost: "\u00bd BP", desc: "Against one type (animals, gnolls, corporeal undead, ethereal undead, arachnids, snakes, ogres and trolls): +1 Fight and attacks count as magic. May be taken again for a different type." },
  favouredMagicalEquipment: { label: "Favoured Magical Equipment", cost: "\u00bd BP", desc: "The first spellcaster magic item of the chosen type takes up no item slot." },
  favouredWeapon: { label: "Favoured Weapon", cost: "\u00bd BP", desc: "One type of weapon takes up one item slot less (the first one only)." },
  heavyArmourProficient: { label: "Heavy Armour Proficient", cost: "\u00bd BP", desc: "No -1 Move penalty for wearing heavy armour." },
  innateSpell: { label: "Innate Spell", cost: "\u00bd BP", desc: "Choose one spell from the core rulebook: a known spell may be swapped for it at any time as a free action." },
  inspirational: { label: "Inspirational", cost: "\u00bd BP", desc: "+1 Leadership. Figures that can see him gain +1 to Will Rolls (not himself)." },
  magicResistance: { label: "Magic Resistance", cost: "\u00bd BP", desc: "+3 to Will Rolls against spells. Against a spell attack: +3 Fight to avoid it and +3 Armour if hit." },
  packRat: { label: "Pack Rat", cost: "1 BP", desc: "One extra item slot." },
  poisonImmunity: { label: "Poison Immunity", cost: "\u00bd BP", desc: "Completely immune to poison." },
  quickTranslate: { label: "Quick Translate", cost: "\u00bd BP", desc: "Once per game, automatically pass a Read Runes Roll (declare before the roll)." },
  rareCompanion: { label: "Rare Companion", cost: "\u00bd BP", desc: "Access to an archetype companion (paid for as normal)." },
  rareHeroicAbility: { label: "Rare Heroic Ability", cost: "\u00bd BP", desc: "Access to a Heroic Ability belonging to an archetype." },
  rareSpell: { label: "Rare Spell", cost: "\u00bd BP", desc: "Access to a spell belonging to an archetype." },
  rareWeapon: { label: "Rare Weapon", cost: "\u00bd BP", desc: "Access to a weapon belonging to an archetype." },
  scrollmaster: { label: "Scrollmaster of Melnoth", cost: "\u00bd BP", desc: "Three scrolls per item slot. May copy a scroll into an empty spellbook; the scroll is destroyed." },
  shadowDeepVeteran: { label: "Shadow Deep Veteran", cost: "\u00bd BP",
    desc: "+4\" line of sight when darkness limits it. Inside the Shadow Deep: +1 to Acrobatics, Climb, Navigation, Perception, Stealth and Survival Rolls." },
  skillMaster: { label: "Skill Master", cost: "\u00bd BP", desc: "+3 to one skill. May be taken more than once for different skills." },
  spellbookCaster: { label: "Spellbook Caster", cost: "1 BP", desc: "May buy an \u201copen\u201d spell slot (1 BP): with a spellbook he may cast any spell from the core rulebook. The spellbook takes up no item slot." },
  spellcaster: { label: "Spellcaster", cost: "\u00bd BP", desc: "Counts as a spellcaster even with no spells; may use scrolls and spellbooks." },
  steadyFeet: { label: "Steady Feet", cost: "\u00bd BP", desc: "Reroll a failed roll that would cause a fall." },
  steelMind: { label: "Mind of Steel", cost: "\u00bd BP", desc: "+3 to Will Rolls against hypnosis and mind control." },
  throwingKnifeMaster: { label: "Throwing Knife Master", cost: "\u00bd BP", desc: "Two knives per item slot with no -1 damage; may throw at a figure in combat with no risk of hitting an ally." },
  twoWeaponFighter: { label: "Two Weapon Fighter", cost: "\u00bd BP", desc: "Two hand weapons (or weapon and dagger) and no shield: +2 melee damage, and the opponent gains only +1 per supporting figure." },
  weaponDedication: { label: "Weapon Dedication", cost: "\u00bd BP", desc: "Before each scenario, one carried weapon gains +1 damage, magic weapons included." },
  /* Archetype traits */
  saveTheChildren: { label: "Save the Children", cost: "archetype", desc: "+15 XP in any scenario where a child is saved." },
  plantWarden: { label: "Plant Warden", cost: "archetype", desc: "+3 Fight and +3 Armour against plants such as darkroots." },
  boatmen: { label: "Boatman", cost: "archetype", desc: "+3 to all rolls to handle a boat." },
  swimmingMaster: { label: "Swimming Master", cost: "archetype",
    desc: "On a failed Swim Roll: half damage, and a 3\" move is still allowed if unarmoured." },
  treasureKeeper: { label: "Treasure Keeper", cost: "archetype", desc: "\u201cGold and jewels\u201d: +15 XP, or 2 advancement points split between two companions." },
  undeadFighter: { label: "Undead Fighter", cost: "archetype", desc: "Against undead: +1 melee damage and attacks count as magic." },
  endOfLife: { label: "End of Life", cost: "archetype", desc: "When a companion dies, the servant stops it rising as undead: +3 XP for everyone." },
  innateHalt: { label: "Innate Heroic Action", cost: "archetype", desc: "May swap one Heroic Ability for Halt Undead at any time." },
  craftBow: { label: "Craft Bow", cost: "archetype", desc: "After a scenario, may craft a temporary bow (-1 damage)." },
  enhancedQuiver: { label: "Enhanced Quiver", cost: "archetype", desc: "Up to three magic arrows in the quiver with no item slot." },
  bloodPrice: { label: "Blood Price", cost: "archetype", desc: "On activation, may suffer 1 damage: its attacks against undead count as magic and inflict +1 damage until its next activation." },
  chosenFoe: { label: "Chosen Foe", cost: "archetype", desc: "A vampire killed during the scenario: +5 XP for all heroes (+10 if he kills it himself)." },
  seekersOfKnowledge: { label: "Seeker of Knowledge", cost: "archetype", desc: "+1 XP in any scenario where the group finds a book or a scroll." },
  disguisedAsEnemy: { label: "Disguised as the Enemy", cost: "archetype", desc: "For the first two turns inside the Shadow Deep, creatures ignore him as long as he neither attacks nor shoots." }
};

/* ------------------------------------------------------------------ */
/* Limitations (A Gathering of Heroes) */
/* ------------------------------------------------------------------ */
export const LIMITATIONS = {
  bloodRage: { label: "Blood Rage", cost: "major", desc: "When wounded: Will Roll (TN20) or fly into a rage (must charge or attack the nearest enemy and push back its opponents). Healing or a new roll at the end of the turn ends it." },
  chronicDisease: { label: "Chronic Disease", cost: "major", desc: "Before every game: Health Roll (TN32) or suffer the effects of disease for that game." },
  frail: { label: "Frail", cost: "major", desc: "Starting Armour 9." },
  grimLoner: { label: "Grim Loner", cost: "major", desc: "-10 Recruitment Points, applied after the calculation for the number of players." },
  nearSighted: { label: "Near-Sighted", cost: "major",
    desc: "Line of sight limited to 12\"; -2 to Perception Rolls." },
  oldAge: { label: "Old Age", cost: "major", desc: "After each mission, on a 1-2: -1 to Move, Fight, Shoot or Health in turn, including the matching maximum." },
  oneArm: { label: "One Arm", cost: "major", desc: "No shield, two-handed weapon, bow or crossbow. -2 to Acrobatics, Climb, Pick Lock and Swim." },
  oneLeg: { label: "One Leg", cost: "major", desc: "-1 Move (and maximum), -1 to Move Rolls; -3 Acrobatics, Climb and Swim; -1 Stealth." },
  slowRecovery: { label: "Slow Recovery", cost: "major", desc: "After each game, for every ability or spell used: on a 1-2 it is not recovered for the next scenario. Everything returns at the end of the mission." },
  absentMinded: { label: "Absent-Minded", cost: "minor", desc: "-4 to Perception Rolls; Perception may not exceed +3." },
  allergy: { label: "Allergy", cost: "minor", desc: "Automatically fails all rolls against disease." },
  cannotSwim: { label: "Cannot Swim", cost: "minor", desc: "-3 to Swim Rolls; the skill may never be increased." },
  fearHeights: { label: "Fear of Heights", cost: "minor",
    desc: "To climb, or to move within 1\" of a drop of more than 3\": Will Roll (TN10) or the action is lost." },
  fearInsects: { label: "Fear of Insects", cost: "minor", desc: "With an insect on the table: -2 to Will Rolls; -1 Fight against them." },
  fearRats: { label: "Fear of Rats", cost: "minor", desc: "With a rat on the table: -2 to Will Rolls; -1 Fight against them." },
  fearSnakes: { label: "Fear of Snakes", cost: "minor", desc: "With a snake on the table: -2 to Will Rolls; -1 Fight against them." },
  fearSpiders: { label: "Fear of Spiders", cost: "minor", desc: "With an arachnid on the table: -2 to Will Rolls; -1 Fight against them." },
  fearWater: { label: "Fear of Water", cost: "minor", desc: "To enter water: Will Roll (TN10) or the action is lost; -1 to Swim Rolls." },
  illiterate: { label: "Illiterate", cost: "minor", desc: "Automatically fails all Read Runes Rolls; may never use scrolls." },
  illFated: { label: "Ill-Fated", cost: "minor", desc: "May not take Hand of Fate." },
  lowPain: { label: "Low Pain Threshold", cost: "minor", desc: "At 5 Health or less: only one action per activation." },
  magicVulnerability: { label: "Magic Vulnerability", cost: "minor", desc: "-4 to Will Rolls to resist spells and magical effects." },
  noCharisma: { label: "No Charisma", cost: "minor", desc: "-2 RP and -2 to Leadership Rolls; Leadership may not exceed +2." },
  noBalance: { label: "No Balance", cost: "minor", desc: "-3 to Move Rolls made to avoid a fall." },
  noDirection: { label: "No Sense of Direction", cost: "minor", desc: "-4 to Navigation Rolls; Navigation may not exceed +2." },
  notNaturalLeader: { label: "Not a Natural Leader", cost: "minor", desc: "Activates one fewer companion in the Ranger Phase; -2 to Leadership Rolls." },
  peacefulSpellcaster: { label: "Peaceful Spellcaster", cost: "minor", desc: "Never casts a spell that inflicts damage, directly or indirectly." },
  poorEyesight: { label: "Poor Eyesight", cost: "minor",
    desc: "Line of sight limited to 16\"; -1 to Perception Rolls." },
  spellDrain: { label: "Spell Drain", cost: "minor", desc: "Every spell cast inflicts 1 damage on the caster (never below 1 Health)." },
  weak: { label: "Weak", cost: "minor", desc: "-3 to Strength Rolls; Strength may not exceed +1." },
  /* Archetype limitations */
  cannotBeSpellcaster: { label: "Cannot Be a Spellcaster", cost: "archetype", desc: "No spells, scrolls or spellbooks." },
  noMissileWeapons: { label: "No Missile Weapons", cost: "archetype", desc: "May not use any weapon that generates a shooting attack." },
  protectChildren: { label: "Protect the Children", cost: "archetype", desc: "Will not voluntarily leave the table while a child on it is in danger." },
  noHeavyEquipment: { label: "No Heavy Equipment", cost: "archetype", desc: "No heavy armour and no two-handed weapons." },
  noHeavyArmourShield: { label: "No Heavy Armour or Shield", cost: "archetype", desc: "No heavy armour and no shield (and, for some archetypes, no crossbow)." },
  noSpells: { label: "No Spells", cost: "archetype", desc: "May neither learn nor cast spells." },
  noArmour: { label: "No Armour", cost: "archetype", desc: "No light armour, heavy armour or shield." },
  noBladedWeapons: { label: "No Bladed Weapons", cost: "archetype", desc: "No bow, crossbow, throwing knife or magic bladed or piercing weapon (the taref is allowed)." },
  limitedSpells: { label: "Limited Spells", cost: "archetype", desc: "Certain spells may only be taken once." },
  phobia: { label: "Phobia", cost: "archetype", desc: "Choose one: fear of insects, rats, snakes or spiders." }
};

/* ------------------------------------------------------------------ */
/* Archetypes (A Gathering of Heroes) */
/* stats: [M, F, S, A, W, Health] */
/* ------------------------------------------------------------------ */
const SK = (acrobatics, ancientLore, armoury, climb, leadership, navigation, perception, pickLock, readRunes, stealth, strength, survival, swim, track, traps) =>
  ({ acrobatics, ancientLore, armoury, climb, leadership, navigation, perception, pickLock, readRunes, stealth, strength, survival, swim, track, traps });

export const ARCHETYPES = {
  ranger: { label: "Ranger (core rules)", bp: 10, rp: 100, stats: [6,2,1,10,4,18], skills: SK(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    traits: [], limitations: [], notes: "Standard character creation from the core rulebook." },
  redHawk: { label: "Red Hawk Knight", bp: 8, rp: 100, stats: [6,3,0,10,4,18], skills: SK(0,0,2,0,2,0,0,-2,0,-1,1,1,0,-1,-2),
    traits: ["heavyArmourProficient", "deflectArrows", "saveTheChildren"], limitations: ["cannotBeSpellcaster", "noMissileWeapons", "protectChildren"],
    notes: "Up to 5 BP on abilities: Call to Action, Dash, Deadly Strike (x2), Distraction, Dive for Cover (x2), Evade, Flashing Blade, Frenzied Attack, Hand of Fate, Inner Strength, Parry (x2), Powerful Blow (x2), Quick Strike, Roll with the Punch, Shove. Special companion: squire." },
  chthonian: { label: "Chthonian Mage", bp: 10, rp: 100, stats: [6,2,1,10,4,18], skills: SK(-1,-1,-1,-1,0,1,1,-1,0,1,0,1,0,0,0),
    traits: ["darkVision", "innateSpell", "plantWarden"], limitations: ["limitedSpells", "noHeavyEquipment"],
    notes: "Innate spells: Compass, Dark Vision, Hold Creature, Purify Blood, Sprout Mushrooms. 3 to 5 BP on spells (Armour, Burning Light, Fireball, Magic Bolt: once each). No spellbook or wand; -2 Fight/Shoot with a bow, crossbow or two-handed weapon. Special companion: large spider." },
  riverShark: { label: "River Shark", bp: 9, rp: 98, stats: [6,2,1,10,4,18], skills: SK(2,0,0,2,-2,0,0,0,-1,0,0,0,3,-1,0),
    traits: ["boatmen", "swimmingMaster", "throwingKnifeMaster", "treasureKeeper", "twoWeaponFighter"], limitations: ["noHeavyEquipment", "noSpells"],
    notes: "Abilities: Call to Action, Dash, Deadly Shot (x2), Deadly Strike, Distraction, Dive for Cover (x2), Evade, Flashing Blade, Frenzied Attack, Hand of Fate, Inner Strength, Parry (x2), Powerful Blow, Roll with the Punch, Shove, Steady Aim, Tumble. A ferret, otter, monkey, songbird or snake costs 1 RP less." },
  sethServant: { label: "Servant of Seth", bp: 9, rp: 100, stats: [6,2,1,10,5,18], skills: SK(0,1,0,0,0,1,0,-1,1,0,0,0,0,0,-1),
    traits: ["undeadFighter", "endOfLife", "innateHalt", "innateSpell"], limitations: ["noBladedWeapons"],
    notes: "Free holy icon. Innate spells: Burning Light, Shield of Light, Magic Bolt. 2 to 3 BP on spells. A taref replaces the free dagger. Special companion: initiate." },
  varakian: { label: "Varakian Archer", bp: 9, rp: 100, stats: [6,1,2,10,4,18], skills: SK(0,-1,1,0,0,0,1,-1,-1,0,0,0,0,0,-1),
    traits: ["craftBow", "enchantArrow", "enhancedQuiver"], limitations: ["noHeavyArmourShield", "noSpells"],
    notes: "Shoot may be improved twice. Abilities: Blend into the Shadows, Dash, Deadly Shot (x2), Dive for Cover, Double Shot, Evade, Fire Shot (x2), Hand of Fate, Inner Strength, Parry, Roll with the Punch, Smoke Shot (x2), Steady Aim (x2). Special companion: fletcher." },
  vampireHunter: { label: "Vampire Hunter", bp: 9, rp: 98, stats: [6,2,1,10,4,18], skills: SK(0,2,1,0,-1,0,1,1,0,2,0,0,0,1,1),
    traits: ["bloodPrice", "chosenFoe", "steelMind"], limitations: ["limitedSpells"],
    notes: "May use a hand crossbow. No focusing crystal, wand or wizard\u2019s staff. Spells (once each): Awareness, Burning Light, Compass, Enchanted Steel, Glow, Hold Creature, Insect Climb, Light, Lure, Open, Slow, Smoke, Summon Crow, Swat, Translate, Weakness. Special companion: scrivener." },
  scrollmaster: { label: "Scrollmaster of Melnoth", bp: 10, rp: 98, stats: [6,1,0,10,4,18], skills: SK(-1,2,-1,-1,-1,0,0,-1,3,0,0,0,-1,-1,-1),
    traits: ["magicResistance", "scrollmaster", "seekersOfKnowledge", "spellbookCaster"], limitations: ["noArmour", "noHeavyEquipment"],
    notes: "No armour or shield; no two-handed weapon, bow or crossbow. Up to 5 BP on spells, including Invisibility and Paper Crane. Abilities: Distraction, Dive for Cover, Eldritch Recall, Enhanced Power, Evade, Focus, Hand of Fate, Inner Strength, Quick Cast, Roll with the Punch, Split Cast." },
  delver: { label: "Encarnoth Delver", bp: 8, rp: 100, stats: [6,2,1,10,4,18], skills: SK(2,3,1,3,0,3,3,2,3,2,0,3,0,1,3),
    traits: ["determineWeakness", "endureHardship", "packRat", "skillMaster"], limitations: ["noHeavyArmourShield"],
    notes: "No heavy armour, shield or two-handed weapon. Seven item slots. Free songbird. Abilities and spells (5 BP): Blend into the Shadows, Call to Action, Dash, Distraction, Dive for Cover, Evade, Focus, Hand of Fate, Inner Strength, Parry, Roll with the Punch, Shove, Steady Aim; Awareness, Compass, Heal, Insect Climb, Ladder, Leap, Open, Quickness, Slow, Smoke, Translate." },
  firesword: { label: "Wasteland Firesword", bp: 8, rp: 98, stats: [6,3,1,10,4,18], skills: SK(0,1,1,0,0,1,0,0,-1,0,0,1,-2,1,0),
    traits: ["endureHardship", "twoWeaponFighter"], limitations: ["noHeavyArmourShield", "cannotBeSpellcaster", "cannotSwim"],
    notes: "No heavy armour, shield or crossbow. Fire flask and fire wax. Abilities: Call to Action, Dash, Deadly Shot, Deadly Strike (x2), Distraction, Dive for Cover, Evade (x2), Flashing Blade, Frenzied Attack, Hand of Fate, Inner Strength, Parry (x2), Powerful Blow, Roll with the Punch, Shove, Steady Aim, Whirling Death. Special companion: sandfly." },
  survivor: { label: "Shadow Deep Survivor or Deserter", bp: 10, rp: 90, stats: [6,2,1,10,3,17], skills: SK(0,1,0,0,0,0,0,0,0,0,0,1,0,0,0),
    traits: ["disguisedAsEnemy", "favouredEnemy", "shadowDeepVeteran"], limitations: ["magicVulnerability", "phobia"],
    notes: "5 BP on abilities or spells from the core rulebook, plus Sneak Attack for free. Only one deserter per mission." }
};
