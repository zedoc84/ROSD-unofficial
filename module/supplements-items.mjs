/**
 * Rangers of Shadow Deep — supplement items.
 * Weapon Hoard (Ghost Stone), Treasure Hoard (Ashen Sky), herbs (Across the Wastes),
 * special weapons and equipment (A Gathering of Heroes, Blood Moon…).
 * Abilities shown as “(Armoury TN x)” are unlocked after a scenario with a skill roll.
 */
const IT = (name, category, img, sys = {}) => ({ name, type: "objet", img: `icons/svg/${img}.svg`, system: { category, slots: 1, ...sys } });
const W = (kind, base, dmg, range = 0) => ({ weapon: { kind, base, dmg, range, staff: base === "staff", twoHanded: base === "twoHanded" } });
const B = o => ({ bonus: { move: 0, fight: 0, shoot: 0, armour: 0, will: 0, dmg: 0, ...o } });
const SK = (a, value, mode = "passive", b = "") => ({ skills: { a, b, value, mode } });
const USE = o => ({ consumable: true, use: { heal: 0, fullHeal: false, cure: false, cureDisease: false, tempHealth: 0, attack: 0, range: 0, ...o } });

/* Base weapon templates */
const HAND = W("melee", "hand", 0), TWO = W("melee", "twoHanded", 2), DAG = W("melee", "dagger", -1),
  STAFF = W("melee", "staff", -1), KNIFE = W("thrown", "knife", -1, 8), BOW = W("ranged", "bow", 0, 24), XBOW = W("ranged", "crossbow", 2, 24);

/* ------------------------------------------------------------------ */
/* Special weapons and equipment */
/* ------------------------------------------------------------------ */
const SPECIAL = [
  IT("Taref", "weapon", "thrust", { ...W("thrown", "taref", -1, 6),
    description: "Throwing club of the Servants of Seth. Range 6\", -1 damage; against undead it counts as magic and inflicts +1 damage. In melee: -1 Fight, -1 damage, counts as magic." }),
  IT("Hand Crossbow", "weapon", "target", { ...W("ranged", "crossbow", 2, 10),
    description: "One-handed crossbow used by vampire hunters: range 10\", +2 damage, one action to reload. No quiver needed." }),
  IT("Sling", "weapon", "target", { ...W("ranged", "sling", 0, 24),
    description: "Follows the bow rules, but cannot be used if an unengaged enemy is within 3\" and in line of sight, unless there is a difference in height." }),
  IT("Fire Flask", "weapon", "fire", { ...USE({ attack: 4, range: 8 }), property: "attack",
    description: "One action to light and throw it up to 8\": every figure within 1\" suffers a +4 shooting attack. Not magic, but it still inflicts half damage on creatures that are only harmed by magic. Single use." }),
  IT("Fire Wax", "equipment", "fire", { ...USE(), activation: true, ...B({ dmg: 1 }),
    description: "Sets weapons alight as a free action: +1 damage against living creatures, and half damage against ethereal creatures or those immune to normal weapons. Single use (one slot per application)." }),
  IT("Silver Dagger", "weapon", "sword", { ...DAG,
    description: "A large silver dagger (Blood Moon). Against a werewolf: +2 Fight and +2 damage. It may be used with no free item slot during the scenario in which it is found." }),
  IT("Silver-Plated Sword", "weapon", "sword", { ...HAND,
    description: "A silver-plated sword (Blood Moon). Against a werewolf: +2 Fight and +2 damage." }),
  IT("Magic Compass Rose", "magic", "direction", { charges: { value: 1, max: 1 },
    description: "Arisien’s badge: once per mission, reroll a failed Will or Navigation Roll. It must be handed back on returning to Alladore." }),
  IT("Herb Bag", "equipment", "item-bag", {
    description: "Only for figures with Survival +5 or better: one item slot holds four herbs." })
];

/* ------------------------------------------------------------------ */
/* Herbs of Advanced Herbalism (Across the Wastes) */
/* ------------------------------------------------------------------ */
const H = (name, desc, extra = {}) => IT(name, "potion", "oak", { ...USE(extra.use ?? {}), ...(extra.bonus ? { activation: true, ...B(extra.bonus) } : {}), description: desc });
const HERBS_ADV = [
  H("Bellingin Root", "Restores 1 point of Health as a free action. One dose per scenario.", { use: { heal: 1 } }),
  H("Borrish Thorns", "A figure with Psychological Scars regains the lost Will for the game."),
  H("Cleareye", "+3 to all Perception Rolls. (Addiction 2)"),
  H("Crackling Suthpod", "Used when casting Magic Bolt: +1 damage."),
  H("Dlinn Seeds", "In darkness, +6\" line of sight (maximum 24\")."),
  H("Eris Flower", "A figure with a Broken Leg regains 1 point of Move for the game."),
  H("Green Quick", "No Will penalty from tortured souls; +3 Leadership to lay them to rest."),
  H("Grolief Berries", "Will Roll (TN6): cures a Lost Eye. (Addiction 8)"),
  H("Hurn Seeds", "Used with Hold Creature: the resistance TN rises to 17."),
  H("Jelgervine", "Smeared on a weapon: +1 damage against all ghouls."),
  H("Kolient Nut", "Will Roll (TN6): cures one addiction."),
  H("Moorfang Thistle", "Recovers one Heroic Ability already used during the scenario. (Addiction 4)"),
  H("Mother’s Tears", "Cures any poison. May be used on animals. (Addiction 3)", { use: { cure: true } }),
  H("Nil Weed", "+4 to all Swim Rolls."),
  H("Orloop Berries", "Removes all hunger and thirst. May be used on animals."),
  H("Papic", "Restores 2 points of Health. (Addiction 2)", { use: { heal: 2 } }),
  H("Pipe Leaf", "A chosen addiction: reroll addiction rolls for other herbs. Three doses per item slot; three doses give 1 XP between missions. (Addiction 4)"),
  H("Ravenwood", "Used with Fireball: a +4 attack instead of +3."),
  H("Ronkin Stem", "Restores 5 points of Health, on animals only."),
  H("Samhine Light", "+5 to all rolls against disease."),
  H("Spider Bite", "Smeared on a weapon: +2 damage against all spiders."),
  H("Tindle Flower", "Cancels the effects of a Crushed Arm for one scenario."),
  H("Turnapich", "Used with Teleport: range 11\"."),
  H("Umlocke Threads", "Cancels Never as Strong for that scenario. (Addiction 3)"),
  H("Varlish Sap", "After a scenario without a full recovery: +2 Health regained. May be used on animals. (Addiction 2)"),
  H("Violet Sheer", "Its juice on a weapon: +2 damage against darkroots and their vines."),
  H("Wolfsbane", "The only cure for lycanthropy: the afflicted figure makes a Will Roll (TN10). Found with a Survival Roll (TN18) after a mission."),
  H("Xanis Flower", "Restores 3 points of Health, or 2 on an animal. (Addiction 2)", { use: { heal: 3 } }),
  H("Yunyun Ball", "Used with Smoke: a 4\" diameter cloud."),
  H("Zikris Root", "Used with Caltrops: a 3\" diameter circle.")
];

/* ------------------------------------------------------------------ */
/* Weapon Hoard (Ghost Stone) */
/* ------------------------------------------------------------------ */
const WH = (card, name, base, desc, extra = {}) => {
  const tmpl = { hand: HAND, twoHanded: TWO, dagger: DAG, staff: STAFF, knife: KNIFE, bow: BOW, crossbow: XBOW }[base];
  const cat = tmpl ? "weapon" : (base === "shield" || base === "light" || base === "heavy" ? "armour" : "equipment");
  const armour = base === "shield" ? B({ armour: 1 }) : base === "light" ? B({ armour: 1 }) : base === "heavy" ? B({ armour: 2, move: -1 }) : {};
  return IT(`${name} (${card})`, cat, tmpl ? (base === "bow" || base === "crossbow" ? "target" : "sword") : "shield",
    { slots: base === "twoHanded" ? 2 : 1, ...(tmpl ?? {}), ...armour, ...extra, description: desc });
};
const WEAPON_HOARD = [
  WH("ace of diamonds", "Hand Weapon \u201cShailven\u201d", "hand", "(Armoury 12) Once per scenario: +1 to a Will Roll, after the roll. (Armoury 20) Once per scenario: a Heal spell cast on the bearer restores 2 extra points."),
  WH("king of diamonds", "Two-Handed Axe of Lozenges", "twoHanded", "(Armoury 8) +1 damage against spiders. (Armoury 20) If poisoned, the bearer gets a free Will Roll (TN20) at each activation to shake off the poison."),
  WH("queen of diamonds", "Gilded Dragon Dagger", "dagger", "(Armoury 16) Once per scenario: a magic attack at +2 Fight (declare beforehand). (Armoury 22) Once per scenario: +1 to one die roll (declare beforehand)."),
  WH("jack of diamonds", "Bow of Black Roses", "bow", "(Armoury 18) One action spent in prayer (may replace the move) followed by a shot in the same activation: +1 damage."),
  WH("ten of diamonds", "Silvered Axe", "hand", "(Armoury 6) Silver-plated head: effective against creatures allergic to silver, such as werewolves. (Armoury 12) A throwing knife hidden in the haft, taking up no item slot."),
  WH("nine of diamonds", "Enchanted Heavy Armour", "heavy", "(Armoury 16) Gnoll melee attacks against the wearer inflict -1 damage. (Armoury 26) Once per scenario: +1 to one Skill Roll (declare beforehand)."),
  WH("eight of diamonds", "Enchanted Two-Handed Weapon", "twoHanded", "Magic (3). (Armoury 12) A critical hit inflicts +7 damage instead of +5."),
  WH("seven of diamonds", "Staff of the Traveller", "staff", "(Armoury 14) Once per scenario: +1 to a Navigation Roll, after the roll. (Armoury 22) The same for a Track Roll."),
  WH("six of diamonds", "Enchanted Shield", "shield", "(Armoury 24) Once per scenario: +3 to a Will Roll (declare beforehand)."),
  WH("five of diamonds", "Longsword \u201cBalath\u201d", "hand", "(Armoury 14) Magic (4). (Armoury 26) Once its magic is spent, every scenario in which it is carried but not used restores Magic (1), to a maximum of 1."),
  WH("four of diamonds", "Sighted Crossbow", "crossbow", "(Armoury 5) One action spent aiming (may replace the move) followed by a shot in the same activation: +1 damage, for +3 in total."),
  WH("three of diamonds", "Survivor\u2019s Two-Handed Weapon", "twoHanded", "(Armoury 8) Once per scenario: +1 to a Survival Roll, after the roll. (Armoury 24) Once per scenario: damage taken in melee is reduced by 1."),
  WH("two of diamonds", "Light Armour with Quiver", "light", "(Armoury 2) The quiver takes up no item slot."),
  WH("ace of hearts", "Stealthy Dagger", "dagger", "Magic (5). (Armoury 12) Once per scenario: +1 to a Stealth Roll, after the roll."),
  WH("king of hearts", "Throwing Knife with Compartment", "knife", "(Armoury 12) +1 Shoot when thrown. (Armoury 26) The compartment perfectly preserves any organic matter."),
  WH("queen of hearts", "Swimmer\u2019s Hand Weapon", "hand", "Magic (3). (Read Runes 12) Once per scenario: +1 to a Swim Roll, after the roll."),
  WH("jack of hearts", "Dagger and Weighted Knives", "dagger", "(Armoury 22) The throwing knives that come with it inflict +1 damage."),
  WH("ten of hearts", "Curved Blade with Hard Scabbard", "hand", "(Armoury 6) The scabbard alone counts as a dagger. (Armoury 16) +1 damage against a creature of Armour 11 or less."),
  WH("nine of hearts", "Climber\u2019s Hand Weapon", "hand", "(Armoury 8) Once per scenario: +1 to a Climb Roll, after the roll."),
  WH("eight of hearts", "Enchanted Quiver with Herb Box", "equipment", "(Armoury 6) Holds one dose of herb with no item slot. (Armoury 18) Once per scenario: +1 damage to a bow shot made inside the Shadow Deep."),
  WH("seven of hearts", "Compass Dagger", "dagger", "Magic (1). (Navigation 10) +1 to Navigation Rolls made before or after a scenario."),
  WH("six of hearts", "Sword \u201cGhoulcutter\u201d", "hand", "(Armoury 12) Once per scenario: +1 to a Will Roll, after the roll. (Read Runes 20) +1 damage against undead; against a ghoul, +1 Fight instead."),
  WH("five of hearts", "Drinking Two-Handed Weapon", "twoHanded", "(Armoury 6) The first time each scenario that it wounds a living creature, the bearer regains 2 Health. (Armoury 22) Once it has wounded a living creature it counts as magic for the rest of the scenario."),
  WH("four of hearts", "Enchanted Light Armour", "light", "(Armoury 6) No -2 penalty to Swim Rolls."),
  WH("three of hearts", "Enchanted Bow", "bow", "Counts as magic and grants +1 Shoot. (Armoury 12) +1 damage against flying creatures.", { magic: true, ...B({ shoot: 1 }) }),
  WH("two of hearts", "Shield of Twelve Studs", "shield", "(Armoury 16) Once per scenario, after a non-magic attack: +2 Armour against that attack. One stud vanishes; after twelve uses the shield is ordinary."),
  WH("ace of clubs", "Silver Halberd", "twoHanded", "Counts as silver against animals allergic to it. (Armoury 16) Once per scenario: the head may be thrown as a throwing knife."),
  WH("king of clubs", "Runic Throwing Knife", "knife", "(Armoury 6) Damage +0 instead of -2 in melee. (Read Runes 22) Once per scenario: it bursts into flame when thrown, counting as magic with +2 Shoot."),
  WH("queen of clubs", "Double-Bow Crossbow", "crossbow", "The lower bow gives a second shot: two actions to reload, -1 Shoot. (Armoury 14) The -1 Shoot no longer applies. (Armoury 20) Conceals one dose of herb with no item slot."),
  WH("jack of clubs", "Hunter\u2019s Sword", "hand", "Magic (5). (Armoury 8) +1 damage against animals."),
  WH("ten of clubs", "Sword of Carnelians", "hand", "Magic (6). (Armoury 2) Inside the Shadow Deep: +1 damage but -1 Will."),
  WH("nine of clubs", "Lone Two-Handed Weapon", "twoHanded", "Magic (3). (Armoury 6) In Alladore: +1 Will. (Armoury 20) +1 Fight while no ally is within 8\"."),
  WH("eight of clubs", "Healer\u2019s Dagger", "dagger", "(Armoury 10) +3 to survival rolls to regain Health. (Armoury 20) Haik wheat no longer inflicts its -1 Will."),
  WH("seven of clubs", "Sword of the Deadly Strike", "hand", "(Armoury 16) Deadly Strike on 17-19. (Armoury 18) If a spell is cast on the bearer: +3 Will for the scenario."),
  WH("six of clubs", "Sword of the Dead", "hand", "(Armoury 14) With undead on the table: +2 Will. (Armoury 20) With undead on the table: +1 damage."),
  WH("five of clubs", "Gnollbane Axe", "twoHanded", "(Armoury 6) +1 Fight against gnolls. (Armoury 18) Once per scenario, if reduced to 0 Health in melee: on a 15 or more the bearer stays at 1 Health."),
  WH("four of clubs", "Tracker\u2019s Sword", "hand", "(Armoury 8) +1 to one Survival Roll per scenario. (Armoury 10) +1 to one Track Roll per scenario. (Armoury 18) Once per scenario: +1 damage after winning a combat."),
  WH("three of clubs", "Weapon with Hidden Potion", "hand", "(Armoury 8) Holds a potion of healing, which takes up no item slot. (Armoury 14) +1 damage against figures of Armour 11 or less."),
  WH("two of clubs", "Serpent Sickle", "twoHanded", "(Armoury 8) A natural 20 in melee: +2 XP, up to 6 per scenario. (Armoury 18) Magic (2)."),
  WH("ace of spades", "Two-Handed Weapon \u201cBortrex\u201d", "twoHanded", "(Armoury 8) +2 to Strength Rolls to force a door. (Armoury 12) +1 damage against Armour 13 or more. (Armoury 16) Magic (3)."),
  WH("king of spades", "Sword of Giants", "hand", "Magic (4). (Armoury 6) +1 damage against large creatures. (Armoury 18) +3 RP for the ranger who carries it on a mission."),
  WH("queen of spades", "Serpentbane Dagger", "dagger", "(Armoury 8) Counts as magic and gives +2 Fight against snakes. (Armoury 20) Once per mission: cancels a poisoning as a free action."),
  WH("jack of spades", "Shield of the Convalescent", "shield", "(Armoury 16) In a mission without a full recovery: +1 extra Health regained between scenarios."),
  WH("ten of spades", "Bow of the Leader", "bow", "(Armoury 6) +1 to one Leadership Roll per scenario. (Armoury 9) +1 to one Will Roll per scenario. (Armoury 18) With Evade: a 3\" move instead of 1\"."),
  WH("nine of spades", "Walker\u2019s Staff", "staff", "(Armoury 6) +1 to one Navigation Roll per scenario. (Armoury 16) +1 Armour against bows and crossbows."),
  WH("eight of spades", "Quiver of the Silver Flower", "equipment", "(Armoury 8) Once per scenario: an arrow with +2 damage against an animal. (Armoury 18) A charm: +1 to the die rerolled with Hand of Fate."),
  WH("seven of spades", "Lapis Lazuli Sword", "hand", "(Armoury 4) Holds a potion of heroism, always carried with no item slot. (Armoury 14) Magic (4). (Armoury 24) Once per scenario: if the target is left on 1 Health, +1 damage."),
  WH("six of spades", "Keen Sword", "hand", "Magic (2). (Armoury 2) +1 damage. (Armoury 22) Always counts as magic against undead outside the Shadow Deep."),
  WH("five of spades", "Tollonian Shield-Dagger", "shield", "Also counts as a dagger with no item slot. (Armoury 8) +2 to the first Will Roll of each scenario. (Armoury 18) Once per scenario: +2 Armour until the next activation."),
  WH("four of spades", "Scented Axe", "twoHanded", "(Armoury 6) +1 damage against undead. (Armoury 10) +2 to Strength Rolls to force a door. (Armoury 14) Magic (4). (Armoury 24) At Magic (0), killing an undead restores Magic (1)."),
  WH("three of spades", "Healer\u2019s Blade", "dagger", "(Armoury 18) With Heal, the target regains 6 instead of 5. (Armoury 26) +1 to the bearer\u2019s survival roll."),
  WH("two of spades", "Exorcist\u2019s Sword", "hand", "(Armoury 8) +1 damage against undead. (Armoury 20) Halt Undead affects every undead within 12\".")
];


/* ------------------------------------------------------------------ */
/* Treasure Hoard (Ashen Sky) */
/* ------------------------------------------------------------------ */
const T = (card, name, desc, extra = {}) => { const { img, ...rest } = extra; return IT(`${name} (${card})`, "magic", img ?? "aura", { ...rest, description: desc }); };
const TREASURE_HOARD = [
  T("ace of diamonds", "Ring of Clear Sight", "(Read Runes 6) +1 Perception. (RR 12) Violet light: no darkness penalty within 6\". (RR 20) Once per scenario, while moving: regain 1 Health."),
  T("king of diamonds", "Orb of Wisplight", "(Ancient Lore 10) +1 Will. (AL 20) Line of sight across the whole table for casting spells."),
  T("queen of diamonds", "Glove of Gethna", "Spellcasters only. (RR 10) After casting a known spell, roll a d20: on a 1 the caster suffers 1 damage, on 19-20 the spell is not spent. (RR 18) Once per scenario: Hold Creature. (RR 26) +2 Will against magic."),
  T("jack of diamonds", "Greenivory Wand", "Counts as a wand for spellcasters. (RR 16) Once per scenario: Slow or Weakness. (AL 22) Counts as a magic dagger with +0 damage against undead."),
  T("ten of diamonds", "Dragon\u2019s Eye", "Counts as a focusing crystal. (AL 10) Free action: swap one Heroic Ability for Eldritch Recall. (AL 18) Once per scenario: Awareness."),
  T("nine of diamonds", "Medal of Saint Venthra", "Counts as a holy icon. (AL 14) Once per game: Shield of Light. (AL 22) A bearer with no homeland, such as a Lorenthian: +1 Will."),
  T("eight of diamonds", "Book of Caliginous Dreams", "Counts as a spellbook. (RR 12) +2 Armour against magic or elemental shooting attacks. (RR 20) Once per game: Transpose."),
  T("seven of diamonds", "Staff of the Wanderer", "Counts as a wizard\u2019s staff. (AL 12) Once per game: Blend into the Shadows. (AL 20) Paying Health to make it magic also grants +1 Fight for the turn."),
  T("six of diamonds", "Wand of Wingfoot", "(AL 13) +2 Will against magical effects. (RR 20) Once per game: Summon Crow, as a magpie or jay."),
  T("five of diamonds", "Bracelet of the Deep", "(AL 16) +2 to Swim Rolls. (AL 22) Once per game: Amphibious."),
  T("four of diamonds", "Knucklebone of Seth", "(AL 14) +1 melee damage against undead. (AL 20) Once per game: Burning Light. (RR 24) A Servant of Seth: +2 Health."),
  T("three of diamonds", "Book of Twisted Names", "Counts as a spellbook. (AL 8) Fireproofed: +2 Armour against fire. (RR 16) Once per game: Hold Creature. (RR 22) Once per game: Split Cast."),
  T("two of diamonds", "Staff of Stygian Wrath", "(RR 20) Once per game: Eldritch Recall as one action. (RR 28) Once per game: a shield that absorbs the next 3 points of damage."),
  T("ace of clubs", "Green Cloak of the Woods", "(Armoury 6) Holds one potion with no item slot. (AL 16) Once per game: Blend into the Shadows."),
  T("king of clubs", "Boots of the Wanderer", "(RR 8) Once per game: +1 Move until the next activation. (RR 19) +2 Stealth. (RR 24) Once per game: Dive for Cover."),
  T("queen of clubs", "Belt of Ogre Strength", "(RR 8) +3 to the Strength skill. (RR 16) Once per game: +2 damage on a successful melee attack.", { ...SK("strength", 3) }),
  T("jack of clubs", "Gloves of the Grey Mouse", "(RR 8) +1 Pick Lock and +1 Traps. (RR 16) Once per scenario: Insect Climb on the wearer.", { ...SK("pickLock", 1, "passive", "traps") }),
  T("ten of clubs", "Skeleton Key", "(Pick Lock 0) +2 Pick Lock. (PL 6) Takes up no item slot. (PL 16) +4 Pick Lock instead of +2. (RR 20) Once per game: reroll a failed Pick Lock Roll.", { ...SK("pickLock", 2) }),
  T("nine of clubs", "Acrobat\u2019s Bracers", "(AL 6) +2 Acrobatics and +1 Climb. (AL 16) +2 Armour against fire. (AL 20) Once per game: reroll a roll that would cause a fall.", { ...SK("acrobatics", 2) }),
  T("eight of clubs", "Spectacles of Clear Sight", "(AL 8) +1 Ancient Lore and +1 Read Runes. (AL 16) Once per game: one Read Runes Roll counts as a 20, with no bonuses.", { ...SK("ancientLore", 1, "passive", "readRunes") }),
  T("seven of clubs", "Rings of the Waterweaver", "(AL 8) +2 Swim, and the wearer never drops below 1 Health from drowning. (RR 20) Once per game: Amphibious on a target within 12\"."),
  T("six of clubs", "Torc of Command", "(Leadership 8) +2 Leadership. (AL 16) Once per scenario: Strong Heart.", { ...SK("leadership", 2) }),
  T("five of clubs", "Enchanted Blade Oil", "(Armoury 8) One application before a game makes a weapon magic. (A 16) Two applications: magic, +1 Fight and +1 damage. Applying it during a game takes one action."),
  T("four of clubs", "Soullight Crystal", "(Perception 5) +1 Will. (P 15) One action: fully heal the bearer or a figure within 1\"; the crystal is destroyed. (P 17) One extra action; the crystal is destroyed."),
  T("three of clubs", "Black Gauntlet of Orven", "(Armoury 0) Counts as a dagger. (RR 14) Once per scenario: Shove. (AL 22) Or once: Parry. Only one of the two per game."),
  T("two of clubs", "Icon of Saint Emilia", "(Perception 0) Counts as a holy icon. (P 8) +1 Will. (AL 12) Once per game: Halt Undead. (AL 20) Once per game: the Light spell."),
  T("ace of spades", "Blue Dragonfly", "(Perception 10) +1 Swim. (RR 18) Once per mission the brooch becomes a raptor companion; if it dies, on a 1 the brooch is destroyed."),
  T("king of spades", "Boots of Haste", "(RR 12) Once per scenario: +2 Move for the activation. (RR 20) Up to three times, taking 2 damage for each use after the first."),
  T("queen of spades", "Horn of Despair", "(AL 14) Once per scenario: each creature, on a 15 or more, does not activate in the next creature phase. (AL 20) Sacrificing 3 Health lowers this to 13 or more."),
  T("jack of spades", "Amulet of Mind Shock", "(Will 14) +1 Will. (W 18) Once per scenario: one combat is resolved using Will. (W 22) Once: a mental shot at 18\" resolved using Will."),
  T("ten of spades", "Holy Prayer Beads", "(Perception 10) +1 to Will Rolls. (AL 10) +1 Armour against undead. (AL 20) A spellcaster may cast Armour, Enchanted Steel, Heal or Light: 2 damage and one of the five beads."),
  T("nine of spades", "Book of Warding Songs", "(AL 10) After a mission, a companion reads a song: +1 advancement point. (AL 18) A song read before a scenario casts Armour. Five songs in all."),
  T("eight of spades", "Amulet of the Serpent Queen", "(Perception 8) Immune to snake poison. (P 18) +1 Fight against snakes."),
  T("seven of spades", "Ring of Unshakeable Command", "(RR 10) Automatically passes any Will Roll caused by a horrific creature. (RR 18) A companion within 6\" may use the ranger\u2019s Will."),
  T("six of spades", "Sphere of Foresight", "(AL 20) Once per mission: draw two event cards and choose one."),
  T("five of spades", "Medal of the Sun", "(Armoury 4) Takes up no item slot. (AL 18) Sacrificed: a natural 1 becomes a 20."),
  T("four of spades", "Horn of Allies", "(AL 12) Once per scenario: +2 to the Will Rolls of every hero that turn. (RR 22) Once per mission: a call for help (d20: destruction, damage, a raptor, a war hound, a barbarian\u2026)."),
  T("three of spades", "Pouch of Deadly Acorns", "(Armoury 12) Takes up no item slot. (RR 16) One action: throw an acorn up to 6\" to grow a darkroot vine hostile to everyone."),
  T("two of spades", "Bracelet of Endless Threads", "(Perception 2) Takes up no item slot. (P 16) Serves as a rope. (P 22) Sacrificed: absorbs all the damage from one attack."),
  T("ace of hearts", "Cloak of a Thousand Pockets", "(Armoury 2) Takes up no item slot. (Perception 10) Holds one herb or potion with no slot. (P 18) Two of them. (RR 15) Holds a focusing crystal with no slot."),
  T("king of hearts", "Blood of Rage", "A potion of four doses, one per scenario and always the same drinker. First dose: +1 Fight, +2 Health. Second: +2 Fight, +2 Health. Third: +3 Fight, +2 Health, -1 to survival. Fourth: +4 Fight, +4 Health and a compulsory survival roll at -2.", { img: "blood" }),
  T("queen of hearts", "Luck Talisman", "(RR 14) Once per scenario: 2 Health for +1 to a roll, after the roll. (RR 20) On the turn after an ace is drawn as an event: +1 to all rolls."),
  T("jack of hearts", "Ring of Presence", "(Leadership 12) +2 RP. (RR 14) +1 to Will and Leadership Rolls. (RR 18) Once per scenario: +5 to a Leadership Roll, declared beforehand."),
  T("ten of hearts", "Staff of Smoke", "(AL 10) Counts as a wizard\u2019s staff. (AL 14) Once per scenario: Smoke. (AL 22) Once per mission: Fireball, with 3 damage to the caster."),
  T("nine of hearts", "Orb of Protection", "(RR 10) Once per scenario: +2 Armour this turn and the next. (RR 16) Or: +2 Armour for the bearer and allies within 3\" this turn. (RR 20) Once per mission: +2 Armour for every ally; the orb shatters if one of them falls."),
  T("eight of hearts", "Executioner\u2019s Mask", "(AL 10) Once per scenario: 2 Health for +1 damage. (RR 15) After the first enemy is killed: +1 Fight, -3 Will. (RR 20) Once: Weakness, with 2 damage to the wearer."),
  T("seven of hearts", "Silver Bell", "(RR 16) Once per scenario: every hero regains 1 Health. (RR 22) Once per mission: figures that fell this turn or the previous one return at 1 Health; on a 1-7 the bell cracks."),
  T("six of hearts", "Mother\u2019s Ring", "Takes up no item slot. (AL 16) Given to a child: 24 hours of protection (+2 Armour, damage shared with the giver). Once per mission."),
  T("five of hearts", "Necklace of Fangs", "(RR 12) +1 melee damage while at least one fang remains. (RR 16) Spend a fang: +1 damage. (RR 20) Two fangs: summons a wolf, using war hound stats, for the scenario."),
  T("four of hearts", "Ring of Grace", "(Leadership 10) +2 RP. (Armoury 12) +1 Armour while wearing no heavy armour or shield. (L 20) Once per mission: Heal."),
  T("three of hearts", "Cloak of the Night Thief", "(Traps 10) +4 to avoid a trap. (T 16) +1 Traps. (Pick Lock 16) +1 Pick Lock. (Stealth 18) +2 Stealth."),
  T("two of hearts", "Golden Whistle", "(AL 14) Once per scenario: every gnoll suffers -1 Fight that turn. (AL 22) Once per scenario, as an action: a +2 attack against gnolls within 3\".")
];


export const SUP_ITEM_CATALOG = [
  { folder: "Special Weapons & Equipment", items: SPECIAL },
  { folder: "Advanced Herbalism", items: HERBS_ADV },
  { folder: "Weapon Hoard (Ghost Stone)", items: WEAPON_HOARD },
  { folder: "Treasure Hoard (Ashen Sky)", items: TREASURE_HOARD }
];
