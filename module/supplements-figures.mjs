/**
 * Rangers of Shadow Deep — supplement content (2/2)
 * Companions and creatures. stats: [M, F, S, A, W, Health]
 */

/* Additional weapons */
export const SUP_RANGED = {
  handCrossbow: { label: "Hand Crossbow (10\", +2)", dmg: 2, range: 10 },
  sling: { label: "Sling (24\", +0)", dmg: 0, range: 24 },
  taref: { label: "Taref (6\", -1; +1 against undead)", dmg: -1, range: 6 },
  boneSpit: { label: "Bone Spit (12\", +0)", dmg: 0, range: 12 },
  fireFlask: { label: "Fire Flask (8\", +4 area)", dmg: 0, range: 8 }
};

/* ------------------------------------------------------------------ */
/* Companions */
/* ------------------------------------------------------------------ */
const ANIMAL = "Animal: carries no items or treasure; limited skills (Acrobatics, Climb, Navigation, Perception, Stealth, Strength, Survival, Swim, Track).";
const SMALL = "Can Be Carried (moves with its bearer, may neither lend support nor be attacked while carried), Reduced Support (+1 only)";

export const SUP_COMPANIONS = {
  /* Temple of Madness / A Gathering of Heroes */
  battleMage: { label: "Battle-Mage", src: "Temple of Madness", rp: 20, stats: [6,2,0,11,2,10], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour. Spell: Fireball.", spells: ["fireball"] },
  healer: { label: "Healer", src: "Temple of Madness", rp: 15, stats: [6,1,0,10,3,10], melee: "hand", ranged: "none",
    gear: "Hand weapon. Spell: Heal (a second Heal spell for +5 RP).", spells: ["heal"] },
  illusionist: { label: "Illusionist", src: "Temple of Madness", rp: 25, stats: [6,1,0,10,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon. Spells: Smoke, Teleport, Transpose.", spells: ["smoke", "teleport", "transpose"] },
  spy: { label: "Spy", src: "Temple of Madness", rp: 25, stats: [6,3,0,11,4,12], melee: "hand", ranged: "none",
    gear: "Hand weapon. Spell: Distraction (Lure).", skills: { pickLock: 3, stealth: 3 }, spells: ["lure"] },
  herbalist: { label: "Herbalist", src: "Across the Wastes", rp: 15, stats: [6,1,0,11,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon or staff, herb bag. Survival +8 when searching for herbs.", skills: { perception: 2, survival: 3 } },

  /* Compagnons d'archétypes (A Gathering of Heroes) */
  squire: { label: "Squire", src: "A Gathering of Heroes", rp: 10, stats: [6,2,0,11,1,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour. Weapon bearer: carries one extra weapon, exchanged with its knight within 1\" as a free action." },
  redHawkKnight: { label: "Red Hawk Knight", src: "A Gathering of Heroes", rp: 40, stats: [6,4,0,13,3,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, dagger, shield, heavy armour. Heavy Armour Proficient, Deflect Arrows (+4 Fight against shooting). No missile weapons; protects children.",
    skills: { strength: 4, leadership: 4, readRunes: 2 } },
  largeSpider: { label: "Large Spider", src: "A Gathering of Heroes", rp: 2, stats: [6,1,0,14,2,2], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} ${SMALL}, maximum damage 5, Expert Climber, poison.`, skills: { perception: 3, stealth: 3 } },
  chthonianMage: { label: "Chthonian Mage", src: "A Gathering of Heroes", rp: 35, stats: [6,1,0,10,3,12], melee: "staff", ranged: "none",
    gear: "Staff or hand weapon. Three spells. Dark Vision, innate spells (Compass, Dark Vision, Hold Creature, Purify Blood, Sprout Mushrooms), Plant Warden." },
  riverShark: { label: "River Shark", src: "A Gathering of Heroes", rp: 25, stats: [6,3,2,10,3,12], melee: "hand", ranged: "knife",
    gear: "Hand weapon, dagger, two throwing knives. Two Weapon Fighter, Throwing Knife Master, Swimming Master, Boatman.",
    skills: { swim: 6, climb: 5, acrobatics: 5 } },
  sethServant: { label: "Servant of Seth", src: "A Gathering of Heroes", rp: 35, stats: [6,3,1,11,3,12], melee: "staff", ranged: "taref",
    gear: "Staff or hand weapon, light armour, holy icon, taref. Spell: Heal (may be swapped for Burning Light, Shield of Light or Magic Bolt). Undead Fighter.",
    spells: ["heal"], abilities: ["haltUndead"] },
  initiate: { label: "Initiate of Seth", src: "A Gathering of Heroes", rp: 18, stats: [6,0,0,10,2,10], melee: "hand", ranged: "taref",
    gear: "Hand weapon or staff, taref. Spell: Heal.", spells: ["heal"] },
  fletcher: { label: "Fletcher", src: "A Gathering of Heroes", rp: 18, stats: [6,1,2,11,1,10], melee: "dagger", ranged: "bow",
    gear: "Bow, quiver, dagger, light armour. Within 2\" of its Varakian archer: one action to hand it an enchanted arrow." },
  varakianArcher: { label: "Varakian Archer", src: "A Gathering of Heroes", rp: 40, stats: [6,2,3,11,2,12], melee: "hand", ranged: "bow",
    gear: "Bow, quiver, hand weapon, light armour. Enchant Arrow, Craft Bow, Enhanced Quiver.", abilities: ["fireShot", "smokeShot"] },
  scrivener: { label: "Scrivener", src: "A Gathering of Heroes", rp: 10, stats: [6,1,0,10,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon. Scroll bearer: carries two extra scrolls, which it may not use itself.", skills: { ancientLore: 3, readRunes: 3, perception: 3 } },
  vampireHunter: { label: "Vampire Hunter", src: "A Gathering of Heroes", rp: 35, stats: [6,3,2,11,4,12], melee: "hand", ranged: "handCrossbow",
    gear: "Hand weapon, hand crossbow, light armour. Blood Price, Mind of Steel.", skills: { ancientLore: 4, stealth: 4, pickLock: 3, traps: 3 } },
  scrollmasterComp: { label: "Scrollmaster", src: "A Gathering of Heroes", rp: 35, stats: [6,1,0,10,3,12], melee: "staff", ranged: "none",
    gear: "Staff or hand weapon, spellbook. Three spells chosen before each game, including Invisibility and Paper Crane. Magic Resistance, Scrollmaster." },
  delver: { label: "Encarnoth Delver", src: "A Gathering of Heroes", rp: 20, stats: [6,2,0,11,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour, rope. Determine Weakness, Endure Hardship.",
    skills: { ancientLore: 4, climb: 3, navigation: 3, perception: 3, pickLock: 2, readRunes: 3, stealth: 2, survival: 3, traps: 3 } },
  firesword: { label: "Wasteland Firesword", src: "A Gathering of Heroes", rp: 40, stats: [7,4,1,11,3,12], melee: "hand", ranged: "fireFlask",
    gear: "Hand weapon, dagger, light armour, fire wax and fire flask, replaced each mission. Endure Hardship. Cannot swim.", skills: { survival: 4, climb: 4 } },
  sandflyComp: { label: "Tame Sandfly", src: "A Gathering of Heroes", rp: 6, stats: [6,1,0,8,5,5], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} Flying.` },

  /* Menagerie */
  bear: { label: "Bear", src: "Menagerie", rp: 25, stats: [6,4,0,12,0,14], melee: "natural", ranged: "none", animal: true, dmg: 2,
    gear: `${ANIMAL} Strong (+2 damage).`, skills: { strength: 5 } },
  boar: { label: "Boar", src: "Menagerie", rp: 15, stats: [6,2,0,12,2,8], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} Tusks: +2 Fight if it moves into combat and attacks in the same activation.`, skills: { strength: 3 } },
  ferret: { label: "Ferret (or Otter)", src: "Menagerie", rp: 3, stats: [4,-1,0,14,3,1], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} ${SMALL}, maximum damage 3. Choose one: Stealth +6 or Amphibious.` },
  lion: { label: "Lion", src: "Menagerie", rp: 20, stats: [8,3,0,10,2,10], melee: "natural", ranged: "none", animal: true,
    gear: ANIMAL, skills: { acrobatics: 3, climb: 5, stealth: 3, track: 3 } },
  lynx: { label: "Lynx", src: "A Gathering of Heroes", rp: 8, stats: [7,0,0,10,2,6], melee: "natural", ranged: "none", animal: true, dmg: 1,
    gear: `${ANIMAL} Expert Climber, sharp claws (+1 damage).`, skills: { stealth: 5, swim: 3 } },
  monkey: { label: "Monkey", src: "Menagerie", rp: 5, stats: [6,0,0,8,4,4], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} Expert Climber (no climbing penalty), maximum damage 5.`, skills: { acrobatics: 6, climb: 10 } },
  snakeComp: { label: "Snake", src: "Menagerie", rp: 3, stats: [4,0,0,14,2,1], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} ${SMALL}, maximum damage 5. Choose two: Amphibious, Nimble (no rough ground penalty), Poison.` },
  songbird: { label: "Songbird", src: "Menagerie", rp: 2, stats: [6,-2,0,15,4,1], melee: "natural", ranged: "none", animal: true,
    gear: `${ANIMAL} Flying, ${SMALL}, maximum damage 1. Beautiful Song: heroes within 2\" gain +1 to Will Rolls.` },
  tiger: { label: "Tiger", src: "Menagerie", rp: 25, stats: [6,4,0,10,1,14], melee: "natural", ranged: "none", animal: true, dmg: 2,
    gear: `${ANIMAL} Strong (+2 damage).`, skills: { acrobatics: 2, stealth: 3, swim: 5 } },

  /* Ashen Sky : compagnons à 10 points */
  retiredSoldier: { label: "Retired Soldier", src: "Ashen Sky", rp: 10, stats: [6,2,0,12,1,10], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour, shield. Old Age. May take a two-handed weapon instead (Armour 11)." },
  cutpurse: { label: "Cutpurse", src: "Ashen Sky", rp: 10, stats: [7,1,0,10,0,10], melee: "dagger", ranged: "none",
    gear: "Dagger.", skills: { stealth: 5 } },
  hedgeWizard: { label: "Hedge Wizard", src: "Ashen Sky", rp: 10, stats: [6,0,0,10,0,10], melee: "hand", ranged: "none",
    gear: "Hand weapon or staff. One random spell per scenario (d20: 1-2 Caltrops, 3-4 Enchanted Steel, 5-6 Heal, 7-8 Hold Creature, 9-10 Lure, 11-12 Smoke, 13-14 Strong Heart, 15-16 Summon Crow, 17-18 Transpose, 19-20 Weakness). Cannot read spellbooks or scrolls." },
  magicalAdept: { label: "Magical Adept", src: "Ashen Sky", rp: 10, stats: [6,1,0,10,2,10], melee: "hand", ranged: "none",
    gear: "Hand weapon or staff. A spellcaster with no spells: may use spellbooks and scrolls.", skills: { readRunes: 3 } },
  recklessSibling: { label: "Reckless Sibling", src: "Ashen Sky", rp: 10, stats: [6,2,0,12,2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour, shield. Family burden: if reduced to 0 Health its ranger loses 10 XP; if it dies the ranger gains no XP for the scenario." },
  sailor: { label: "Sailor", src: "Ashen Sky", rp: 10, stats: [6,1,0,10,1,10], melee: "hand", ranged: "none",
    gear: "Hand weapon, dagger. +5 to handle or board a boat.", skills: { swim: 5, acrobatics: 3, climb: 3 } },
  scarredVeteran: { label: "Scarred Veteran", src: "Ashen Sky", rp: 10, stats: [6,3,0,12,-2,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour, shield. Two “Fear of…” limitations. May take a two-handed weapon instead (Armour 11)." },
  youngShepherd: { label: "Young Shepherd", src: "Ashen Sky", rp: 10, stats: [6,0,1,10,-1,8], melee: "staff", ranged: "sling",
    gear: "Staff, sling (bow rules; unusable if an unengaged enemy is within 3\" and in line of sight)." },

  /* Auxiliaires de missions */
  seb: { label: "Seb", src: "Blood Moon", rp: 20, stats: [6,3,0,10,2,14], melee: "twoHanded", ranged: "none",
    gear: "Two-handed weapon. A former lumberjack from the forest of Nar.", skills: { strength: 4 } },
  covin: { label: "Covin", src: "Blood Moon", rp: 15, stats: [6,2,0,11,1,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour. A veteran missing three fingers.", skills: { leadership: 3, perception: 3 } },
  nicolan: { label: "Nicolan", src: "Blood Moon", rp: 20, stats: [6,3,0,11,1,12], melee: "hand", ranged: "none",
    gear: "Hand weapon, dagger, light armour. A fallen aristocrat.", skills: { ancientLore: 3, armoury: 3, readRunes: 2 } },
  orla: { label: "Orla", src: "Blood Moon", rp: 20, stats: [6,1,2,11,3,10], melee: "dagger", ranged: "bow",
    gear: "Bow, quiver, dagger, light armour. A young hunter.", skills: { track: 4, stealth: 3 } },
  gorbin: { label: "Gorbin the Ogre", src: "Incinerator", rp: 30, stats: [6,3,0,12,0,14], melee: "twoHanded", ranged: "none",
    gear: "Large. Two-handed weapon. When first met: unarmed (-2 Fight, -2 damage), Move 5 and 8 Health.", skills: { strength: 8, swim: 3 } },
  nesra: { label: "Nesra", src: "Ghost Stone", rp: 40, stats: [6,2,0,11,6,14], melee: "hand", ranged: "none",
    gear: "Hand weapon, light armour, wand. Spells: Fireball (x2), Detonation.", spells: ["fireball", "fireball", "detonation"], abilities: ["enhancedPower"] },
  arisien: { label: "Arisien, Royal Cartographer", src: "Across the Wastes", rp: 25, stats: [6,1,0,11,4,12], melee: "staff", ranged: "none",
    gear: "Staff, magic compass rose (once per mission: reroll a failed Will or Navigation Roll).",
    skills: { navigation: 10, leadership: 5, ancientLore: 3 }, abilities: ["parry"] },
  pabrim: { label: "Pabrim, Camel Driver", src: "Across the Wastes", rp: 20, stats: [6,2,1,11,3,12], melee: "hand", ranged: "bow",
    gear: "Hand weapon, bow, quiver, light armour. Camel expert; Survival +10 in the desert.",
    skills: { ancientLore: 3, navigation: 4, perception: 3, survival: 5 } },
  packCamel: { label: "Pack Camel", src: "Across the Wastes", rp: 5, stats: [6,1,0,11,5,16], melee: "natural", ranged: "none", animal: true,
    gear: "Pack animal: five item slots, must be led (Leadership TN8), automatically survives in the desert, never lends support." },
  princeRuthic: { label: "Prince Ruthic of Lorenthie", src: "Tenebrous Citadel", rp: 0, stats: [6,1,0,10,4,12], melee: "unarmed", ranged: "none",
    gear: "Five item slots. Freed with no weapon or armour, at 8 Health. +1 to survival rolls.", abilities: ["evade", "handOfFate", "parry"] }
};

/* ------------------------------------------------------------------ */
/* Creatures */
/* ------------------------------------------------------------------ */
export const SUP_BESTIARY = {
  /* A Gathering of Heroes / Ghost Stone */
  cultist: { label: "Cultist", src: "Ghost Stone", xp: 3, stats: [6,2,0,11,2,10], melee: "hand", traits: "Hand weapon, light armour." },
  cultistLeader: { label: "Cultist Leader", src: "Ghost Stone", xp: 5, stats: [5,4,0,12,6,14], melee: "hand", dmg: 1,
    traits: "Hand weapon (+1 damage), shield, light armour. Cultists within 12\" gain +2 Will." },
  spectralHorseman: { label: "Spectral Horseman", src: "Ghost Stone", xp: 10, stats: [6,4,0,12,10,14], undead: true, flying: true, partialImmunity: true,
    traits: "Undead, flying, damage ÷2 from non-magic weapons. Its victims have a maximum Armour of 11. It charges and attacks the hero with the highest Fight." },
  spectre: { label: "Spectre", src: "Ghost Stone", xp: 3, stats: [6,1,0,10,10,10], undead: true, flying: true, partialImmunity: true,
    traits: "Undead, flying, damage ÷2 from non-magic weapons. Death scream: when reduced to 0 Health, figures in combat with it must make a Will Roll (TN12) or lose their next activation." },
  woundedSoldier: { label: "Wounded Alladorean Soldier", src: "Ghost Stone", xp: 0, stats: [5,1,0,12,0,1], melee: "hand", traits: "Wounded: one action per activation only." },
  /* Blood Moon */
  grimWolf: { label: "Grim Wolf", src: "Blood Moon", xp: 2, stats: [8,3,0,10,0,10], animal: true, traits: "Animal." },
  werewolf: { label: "Werewolf", src: "Blood Moon", xp: 10, stats: [6,4,0,12,5,18], dmg: 2,
    traits: "+2 damage. Regeneration: regains 2 Health whenever it activates. Silver allergy: +2 Fight and +2 damage with a silver weapon. Expert Climber. Infection (lycanthropy: Will Roll TN8 after surviving)." },
  /* Incinerator / Temple of Madness / Menagerie */
  skeletalOgre: { label: "Skeletal Ogre", src: "Incinerator", xp: 4, stats: [5,3,0,11,0,4], undead: true, large: true, dmg: 2, traits: "Powerful (+2 damage)." },
  templeGuardian: { label: "Temple Guardian", src: "Temple of Madness", xp: 3, stats: [6,2,0,11,2,10], melee: "twoHanded", traits: "Two-handed weapon, light armour." },
  templeGuardianArcher: { label: "Temple Guardian Archer", src: "Temple of Madness", xp: 3, stats: [6,1,1,11,2,10], melee: "hand", ranged: "bow",
    traits: "Bow, quiver, hand weapon, light armour." },
  warden: { label: "Warden", src: "Incinerator", xp: 5, stats: [6,4,0,11,4,12], melee: "hand", traits: "Two hand weapons, light armour." },
  greviks: { label: "Greviks the Beast-Man", src: "Temple of Madness", xp: 10, stats: [6,4,0,14,3,18], melee: "twoHanded",
    traits: "Two-handed weapon. Trekatis’ bodyguard: stays within 1\" of him, takes the shooting attacks aimed at him and intercepts anyone trying to engage him." },
  trekatis: { label: "Trekatis the Dark Sorcerer", src: "Temple of Madness", xp: 20, stats: [6,2,0,12,8,16], melee: "staff", spellcaster: true,
    traits: "Imbued staff: a figure it damages must make a Will Roll (TN14) or be thrown back 6\" and lose its next activation. Robe of protection. Spellcaster." },
  gnollBeastHandler: { label: "Gnoll Beast-Handler", src: "Menagerie", xp: 3, stats: [6,2,0,11,0,10], melee: "twoHanded", traits: "Two-handed weapon, light armour." },
  bearWild: { label: "Bear (wild)", src: "Menagerie", xp: 4, stats: [6,4,0,12,0,14], animal: true, dmg: 2, traits: "Animal, Strong (+2 damage)." },
  tigerWild: { label: "Tiger (wild)", src: "Menagerie", xp: 4, stats: [6,4,0,10,1,14], animal: true, dmg: 2, traits: "Animal, Strong (+2 damage)." },
  boarWild: { label: "Boar (wild)", src: "Menagerie", xp: 3, stats: [6,2,0,12,2,8], animal: true, traits: "Animal. +2 Fight when it charges." },
  lionWild: { label: "Lion (wild)", src: "Menagerie", xp: 3, stats: [8,3,0,10,2,10], animal: true, traits: "Animal." },
  /* Across the Wastes */
  djinn: { label: "Djinn of Ba'tel", src: "Across the Wastes", xp: 20, stats: [6,4,0,12,8,18], flying: true, spellcaster: true, immuneCrit: true,
    traits: "Extraplanar entity: immune to all damage until its true name is spoken (see the scenario). Magic attacks, flying, spellcaster." },
  giantScorpion: { label: "Giant Scorpion", src: "Across the Wastes", xp: 10, stats: [5,4,0,12,5,16], animal: true, large: true, poison: true, dmg: 2,
    traits: "Large, Powerful (+2 damage), poison. Drags its prey: pulls a figure reduced to 0 Health 4\" toward the table edge (-2 to its survival roll)." },
  guardianStatue: { label: "Guardian Statue", src: "Across the Wastes", xp: 4, stats: [3,1,0,13,0,12], dmg: 2,
    traits: "Powerful (+2 damage). Armour 16 against bows, crossbows and thrown weapons." },
  humpback: { label: "Humpback", src: "Across the Wastes", xp: 10, stats: [6,4,0,13,3,14], large: true, poison: true, dmg: 2,
    traits: "Large, Powerful (+2 damage), poison, +5 Will against magic. Intimidating: on the first combat, Will Roll (TN12) or -1 Fight against it. Attacks the hero with the highest Fight." },
  sandblade: { label: "Sandblade", src: "Across the Wastes", xp: 8, stats: [6,3,0,12,5,12], undead: true, partialImmunity: true,
    traits: "Semi-ethereal undead (damage ÷2 from non-magic weapons). No movement penalties. On a natural 1 in combat against it, a weapon, armour or shield is destroyed." },
  sandfly: { label: "Sandfly", src: "Across the Wastes", xp: 2, stats: [6,1,0,8,5,5], animal: true, flying: true, disease: 8, traits: "Animal, flying, disease (TN8)." },
  sandhusk: { label: "Sandhusk", src: "Across the Wastes", xp: 3, stats: [5,2,0,12,0,12], undead: true,
    traits: "Bows, crossbows and knives: maximum 2 damage. Spits sand as it engages: a +0 shooting attack with no damage; if it hits, -1 Fight for the game." },
  skeletalArcher: { label: "Skeletal Archer", src: "Across the Wastes", xp: 2, stats: [6,1,1,10,0,1], undead: true, ranged: "bow", traits: "Undead, bow, quiver." },
  zombieCamel: { label: "Zombie Camel", src: "Across the Wastes", xp: 3, stats: [5,1,0,11,0,14], undead: true, dmg: 2, traits: "Powerful (+2 damage)." },
  /* Ashen Sky */
  ashJackal: { label: "Ash Jackal", src: "Ashen Sky", xp: 3, stats: [7,3,0,10,0,8], animal: true, traits: "Animal." },
  ashJackalAlpha: { label: "Ash Jackal Alpha", src: "Ashen Sky", xp: 6, stats: [7,4,0,10,0,16], animal: true, dmg: 2, partialImmunity: true,
    traits: "Animal, Strong (+2 damage), partial immunity to normal weapons." },
  /* Tenebrous Citadel */
  armouredSpider: { label: "Armoured Spider", src: "Tenebrous Citadel", xp: 2, stats: [6,2,0,10,0,6], animal: true, poison: true,
    traits: "Animal, poison, no penalty for rough ground or climbing." },
  boneSpitter: { label: "Bone Spitter", src: "Tenebrous Citadel", xp: 1, stats: [6,1,2,10,0,1], undead: true, ranged: "boneSpit", traits: "Undead, shoots to 12\"." },
  colossalSerpent: { label: "Colossal Serpent", src: "Tenebrous Citadel", xp: 20, stats: [6,5,0,12,6,20], animal: true, large: true, poison: true, horrific: 10, dmg: 2,
    traits: "Large, Strong (+2 damage), amphibious, expert climber, horrific (TN10). Its poison lasts until the end of the mission. Only a large figure may push it back. Whoever kills it earns the title of Dragon Slayer." },
  doppelganger: { label: "Doppelganger", src: "Tenebrous Citadel", xp: 2, stats: [6,1,0,10,3,12],
    traits: "Its opponents must make a Perception Roll (TN14) or suffer -2 Fight against it." },
  mindShrike: { label: "Mind Shrike", src: "Tenebrous Citadel", xp: 3, stats: [6,0,0,12,4,12],
    traits: "Battle of wills: in melee and against shooting, both sides use Will instead of Fight or Shoot. It levitates (no terrain penalties, never falls)." },
  shadowLord: { label: "Shadow Lord", src: "Tenebrous Citadel", xp: 100, stats: [5,7,0,14,12,28], undead: true, horrific: 14, partialImmunity: true, dmg: 3,
    traits: "Immune to normal weapons; damage ÷2 from magic weapons and attacks. Horrific (TN14). +3 damage. Its opponents use the lower of their Fight or Will; support gives +1 only. Its victims suffer -2 to survival rolls. When it dies, no creature activates until the end of the following turn." },
  shadowWalker: { label: "Shadow Walker", src: "Tenebrous Citadel", xp: 5, stats: [6,3,0,12,5,16], undead: true, partialImmunity: true,
    traits: "Counts as undead, damage ÷2 from non-magic weapons. Shadow Walk (see the scenario)." }
};
