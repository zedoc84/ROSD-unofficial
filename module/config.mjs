/**
 * Rangers of Shadow Deep — données de règles (Deluxe Edition).
 * Descriptions reformulées et résumées en français.
 */
export const ROSD = {};

ROSD.stats = {
  move:   { label: "Mouvement", abbr: "M" },
  fight:  { label: "Combat",    abbr: "C" },
  shoot:  { label: "Tir",       abbr: "T" },
  armour: { label: "Armure",    abbr: "A" },
  will:   { label: "Volonté",   abbr: "V" }
};

ROSD.skills = {
  acrobatics:  "Acrobatie",
  ancientLore: "Savoir ancien",
  armoury:     "Armurerie",
  climb:       "Escalade",
  leadership:  "Commandement",
  navigation:  "Orientation",
  perception:  "Perception",
  pickLock:    "Crochetage",
  readRunes:   "Lecture des runes",
  stealth:     "Discrétion",
  strength:    "Force",
  survival:    "Survie",
  swim:        "Natation",
  track:       "Pistage",
  traps:       "Pièges"
};

/* ---------------------------------------------------------------- */
/* Capacités héroïques                                               */
/* ---------------------------------------------------------------- */
ROSD.abilities = {
  blendIntoShadows: { label: "Fondre dans l'ombre", en: "Blend into the Shadows",
    desc: "Quand une créature maléfique s'apprête à entrer en combat avec le ranger : résolvez son action comme si le ranger n'était pas sur la table." },
  callToAction: { label: "Appel à l'action", en: "Call to Action",
    desc: "À l'activation du ranger : il peut activer un compagnon de plus que la normale pendant la phase des Rangers." },
  dash: { label: "Sprint", en: "Dash",
    desc: "À l'activation : +2 Mouvement jusqu'à la fin du tour, OU une action de mouvement devient un bond jusqu'à sa valeur de Mouvement dans n'importe quelle direction (y compris verticalement)." },
  deadlyShot: { label: "Tir mortel", en: "Deadly Shot",
    desc: "Sur un 18 ou 19 naturel lors d'un tir : le jet compte comme un Coup critique." },
  deadlyStrike: { label: "Coup mortel", en: "Deadly Strike",
    desc: "Sur un 18 ou 19 naturel lors d'un combat au corps à corps : le jet compte comme un Coup critique." },
  distraction: { label: "Diversion", en: "Distraction",
    desc: "Quand une créature maléfique doit faire un mouvement aléatoire ou vers le Point cible : le joueur la déplace où il veut (sans la blesser ni la forcer à nager)." },
  diveForCover: { label: "Plongeon à couvert", en: "Dive for Cover",
    desc: "+10 au jet de Combat contre une attaque de tir. À déclarer avant le jet." },
  eldritchRecall: { label: "Rappel occulte", en: "Eldritch Recall",
    desc: "À tout moment : récupère l'usage d'un sort déjà lancé pendant le scénario." },
  enhancedPower: { label: "Puissance accrue", en: "Enhanced Power",
    desc: "Lors d'un sort générant une attaque de tir : lancez trois dés par attaque et gardez le meilleur. À déclarer avant. Exception à la règle d'une capacité/sort par activation." },
  evade: { label: "Dérobade", en: "Evade",
    desc: "Si le ranger s'active en combat : mouvement gratuit de 1\" pour quitter le combat (personne ne peut forcer le combat), puis activation normale." },
  focus: { label: "Concentration", en: "Focus",
    desc: "+8 à un jet de Compétence. À déclarer avant le jet." },
  frenziedAttack: { label: "Attaque frénétique", en: "Frenzied Attack",
    desc: "+5 à un jet de Combat. À déclarer avant le jet." },
  haltUndead: { label: "Repousser les morts-vivants", en: "Halt Undead",
    desc: "Tous les morts-vivants à 10\" et en ligne de vue font un jet de Volonté (ND 20) ; en cas d'échec ils perdent leur prochaine activation." },
  handOfFate: { label: "Main du destin", en: "Hand of Fate",
    desc: "Le ranger peut relancer un dé." },
  innerStrength: { label: "Force intérieure", en: "Inner Strength",
    desc: "+5 à un jet de Volonté. Utilisable après le jet." },
  parry: { label: "Parade", en: "Parry",
    desc: "Après les jets de Combat : +10 au jet du ranger. S'il gagne, il n'inflige aucun dégât (mais peut reculer ou repousser)." },
  powerfulBlow: { label: "Coup puissant", en: "Powerful Blow",
    desc: "+3 dégâts à une attaque au corps à corps qui a déjà infligé au moins 1 point de dégât." },
  quickCast: { label: "Incantation rapide", en: "Quick Cast",
    desc: "Si la figurine a deux actions ou plus : elle peut utiliser deux actions pour lancer des sorts pendant cette activation." },
  rollWithThePunch: { label: "Encaisser le coup", en: "Roll with the Punch",
    desc: "Si le ranger perd un combat au corps à corps : il ne subit que la moitié des dégâts (arrondi supérieur)." },
  shove: { label: "Bousculade", en: "Shove",
    desc: "Si le ranger gagne un combat au corps à corps : il peut repousser l'adversaire jusqu'à 4\" au lieu de 1\"." },
  splitCast: { label: "Sort dédoublé", en: "Split Cast",
    desc: "Pour un sort visant une figurine ou un point : deux cibles différentes, effet complet sur chacune." },
  steadyAim: { label: "Visée assurée", en: "Steady Aim",
    desc: "+5 Tir pour un jet de tir. À déclarer avant le jet." }
};

/* ---------------------------------------------------------------- */
/* Sorts                                                             */
/* attack : bonus d'attaque de tir magique ; will : ND de résistance */
/* ---------------------------------------------------------------- */
ROSD.spells = {
  amphibious:   { label: "Amphibie", en: "Amphibious",
    desc: "La cible réussit automatiquement tous ses jets de Natation jusqu'à la fin du scénario." },
  armour:       { label: "Armure", en: "Armour",
    desc: "La cible gagne +2 Armure jusqu'à la fin du scénario (un seul sort d'Armure à la fois)." },
  awareness:    { label: "Vigilance", en: "Awareness",
    desc: "Lancé quand un jet de Perception est demandé (même avant/après le scénario) : réussite automatique." },
  burningLight: { label: "Lumière ardente", en: "Burning Light", attack: 3, holyIcon: 4,
    desc: "Attaque de tir +3 contre tous les morts-vivants à 8\" et en ligne de vue (+4 avec une icône sacrée)." },
  burningMark:  { label: "Marque ardente", en: "Burning Mark", attack: 5,
    desc: "Place une rune à 6\". Dès qu'une créature maléfique s'en approche à 2\", elle explose : attaque de tir magique +5 contre toutes les créatures maléfiques à 2\"." },
  caltrops:     { label: "Chausse-trappes", en: "Caltrops", will: 12,
    desc: "Cercle de 2\" de diamètre. Toute figurine qui le traverse subit 2 dégâts et fait un jet de Volonté (ND 12) ; échec : fin de son activation. Morts-vivants immunisés aux dégâts." },
  compass:      { label: "Boussole", en: "Compass",
    desc: "Lancé quand un jet d'Orientation est demandé : réussite automatique." },
  enchantedSteel: { label: "Acier enchanté", en: "Enchanted Steel",
    desc: "Une arme de mêlée devient magique avec +1 Combat jusqu'à la fin du scénario." },
  fireball:     { label: "Boule de feu", en: "Fireball", attack: 3,
    desc: "Point en ligne de vue : toutes les figurines à 2\" subissent une attaque de tir +3." },
  glow:         { label: "Luminescence", en: "Glow",
    desc: "Tous les tirs contre la cible sont à +3 jusqu'à la fin de la partie." },
  heal:         { label: "Soins", en: "Heal", heal: 5,
    desc: "Une figurine à 6\" (y compris le lanceur) récupère jusqu'à 5 points de Santé (6 avec une icône sacrée)." },
  holdCreature: { label: "Immobilisation", en: "Hold Creature", will: 16,
    desc: "Jet de Volonté (ND 16). Échec : ne peut pas forcer le combat ce tour et perd sa prochaine activation. Sans effet sur les grandes créatures et les morts-vivants." },
  insectClimb:  { label: "Escalade de l'insecte", en: "Insect Climb",
    desc: "Pas de pénalité de mouvement en escalade et +10 aux jets d'Escalade jusqu'à la fin de la partie." },
  ladder:       { label: "Échelle", en: "Ladder",
    desc: "Échelle magique de n'importe quelle hauteur contre une surface verticale : escalade sans pénalité ni jet. Le lanceur peut la dissiper (action gratuite) si personne n'est dessus." },
  leap:         { label: "Bond", en: "Leap",
    desc: "Ranger ou compagnon uniquement, hors combat : mouvement immédiat de 6\" dans n'importe quelle direction, y compris vers le haut." },
  light:        { label: "Lumière", en: "Light",
    desc: "Si la ligne de vue maximale est réduite sous 24\" par l'obscurité, elle remonte à 24\"." },
  lure:         { label: "Leurre", en: "Lure", will: 16,
    desc: "Jet de Volonté (ND 16). Échec : le lanceur déplace la cible de 5\" (sans la blesser ni la sortir de la table). Pas sur une cible en combat." },
  magicBolt:    { label: "Trait magique", en: "Magic Bolt", attack: 5, ignoreCover: true,
    desc: "Attaque de tir magique +5 contre une figurine en ligne de vue. Ignore les pénalités de couvert et de terrain intermédiaire." },
  open:         { label: "Ouverture", en: "Open",
    desc: "Lancé quand un jet de Crochetage est demandé : réussite automatique." },
  quickness:    { label: "Célérité", en: "Quickness",
    desc: "La cible s'activera en phase des Rangers au prochain tour et gagne +1 Mouvement jusqu'à la fin du scénario." },
  shieldOfLight:{ label: "Bouclier de lumière", en: "Shield of Light",
    desc: "Cible à 8\" en ligne de vue : tous les tirs contre elle sont à -3 jusqu'à la fin de la partie (-4 avec une icône sacrée)." },
  slow:         { label: "Lenteur", en: "Slow", will: 18,
    desc: "Jet de Volonté (ND 18). Échec : -3 Mouvement (minimum 1) jusqu'à la fin du scénario." },
  smoke:        { label: "Fumée", en: "Smoke",
    desc: "Nuage de 3\" de diamètre placé à 3\" : bloque la ligne de vue, pas le mouvement." },
  strength:     { label: "Force", en: "Strength",
    desc: "La cible inflige +1 dégât au corps à corps jusqu'à la fin du scénario et gagne +5 aux jets de Force." },
  strongHeart:  { label: "Cœur vaillant", en: "Strong Heart",
    desc: "Cible à 8\" : prochain jet de Volonté à +5, puis +4, et ainsi de suite jusqu'à +0." },
  summonCrow:   { label: "Invocation du corbeau", en: "Summon Crow",
    desc: "En fin de tour, un oiseau (profil de rapace, Armure 10, sans compétences) apparaît au contact comme compagnon. Après chacune de ses activations, sur 16+ au dé il s'envole." },
  swat:         { label: "Chasse-mouches", en: "Swat", attack: 8,
    desc: "Attaque +8 contre une mouche géante ou une araignée géante en ligne de vue." },
  teleport:     { label: "Téléportation", en: "Teleport",
    desc: "Déplacement immédiat jusqu'à 9\" dans n'importe quelle direction. Plus aucune action ce tour." },
  translate:    { label: "Traduction", en: "Translate",
    desc: "Lancé quand un jet de Lecture des runes est demandé : réussite automatique." },
  transpose:    { label: "Transposition", en: "Transpose",
    desc: "Échange immédiatement la position de deux rangers ou compagnons (même en combat)." },
  weakness:     { label: "Faiblesse", en: "Weakness", will: 18,
    desc: "Jet de Volonté (ND 18). Échec : -1 Combat, -1 Tir et -1 Armure jusqu'à la fin du scénario." }
};

/* Objets magiques de lanceur de sorts */
ROSD.casterItems = {
  "": "— Aucun —",
  focusingCrystal: "Cristal de focalisation (+2 au ND de Volonté de ses sorts)",
  holyIcon: "Icône sacrée (Soins 6, Lumière ardente +4, Bouclier -4)",
  spellbook: "Grimoire (conserve 1 sort non lancé)",
  wand: "Baguette (+1 aux attaques de tir de ses sorts)",
  wizardStaff: "Bâton de sorcier (Santé → bonus aux jets de Volonté)"
};

/* Armes */
ROSD.meleeWeapons = {
  hand:      { label: "Arme de main", dmg: 0 },
  twoHanded: { label: "Arme à deux mains (+2 dég.)", dmg: 2 },
  dagger:    { label: "Dague (-1 dég.)", dmg: -1 },
  staff:     { label: "Bâton (-1 dég., adversaire -1 dég.)", dmg: -1, staff: true },
  knife:     { label: "Couteau de lancer en mêlée (-2 dég.)", dmg: -2 },
  unarmed:   { label: "Désarmé (-2 C, -2 dég.)", dmg: -2, fight: -2 },
  natural:   { label: "Attaques naturelles", dmg: 0 }
};

ROSD.rangedWeapons = {
  none:     { label: "— Aucune —", dmg: 0, range: 0 },
  bow:      { label: "Arc (24\", +0)", dmg: 0, range: 24 },
  crossbow: { label: "Arbalète (24\", +2)", dmg: 2, range: 24 },
  knife:    { label: "Couteau de lancer (8\", -1)", dmg: -1, range: 8 },
  bones:    { label: "Os lancés (10\", +0)", dmg: 0, range: 10 },
  other:    { label: "Autre", dmg: 0, range: 0 }
};

/* Équipement de base (suggestions des cases d'objets) */
ROSD.basicEquipment = [
  "Arc", "Arbalète", "Dague", "Arme de main", "Armure lourde (+2 A, -1 M)", "Armure légère (+1 A)",
  "Carquois", "Corde", "Bouclier (+1 A)", "Bâton", "Couteau de lancer", "Arme à deux mains (2 emplacements)"
];

/* Modificateurs de tir (s'ajoutent au score de la cible) */
ROSD.shootingMods = {
  light:   { label: "Couvert léger (+2)", value: 2 },
  heavy:   { label: "Couvert lourd (+4)", value: 4 },
  hurried: { label: "Tir précipité : le tireur a bougé (+1)", value: 1 },
  large:   { label: "Grande cible (-2)", value: -2 }
};

/* ---------------------------------------------------------------- */
/* Compagnons  — stats : [M, C, T, A, V, Santé]                      */
/* ---------------------------------------------------------------- */
ROSD.companions = {
  arcanist:   { label: "Arcaniste", rp: 15, stats: [6,2,0,10,2,10], melee: "hand", ranged: "none",
    gear: "Arme de main", skills: { ancientLore: 5, readRunes: 5 } },
  archer:     { label: "Archer", rp: 20, stats: [6,2,2,11,1,10], melee: "dagger", ranged: "bow",
    gear: "Arc OU arbalète, dague, armure légère, carquois" },
  barbarian:  { label: "Barbare", rp: 35, stats: [6,4,0,11,3,14], melee: "hand", ranged: "none",
    gear: "Arme de main, bouclier", skills: { strength: 5 } },
  conjuror:   { label: "Conjurateur", rp: 20, stats: [6,0,0,10,3,12], melee: "staff", ranged: "none",
    gear: "Bâton OU arme de main. 2 sorts choisis avant chaque scénario (3e sort : +10 PR)" },
  guardsman:  { label: "Garde", rp: 20, stats: [6,3,0,11,2,12], melee: "twoHanded", ranged: "none",
    gear: "Arme à deux mains, armure légère" },
  hound:      { label: "Chien", rp: 5, stats: [8,0,0,10,-2,6], melee: "natural", ranged: "none", animal: true,
    gear: "Animal : ne porte ni objet ni trésor. Jets limités (Acrobatie, Escalade, Perception, Discrétion, Natation, Pistage)" },
  warhound:   { label: "Chien de guerre", rp: 10, stats: [8,1,0,10,-2,8], melee: "natural", ranged: "none", animal: true,
    gear: "Animal : ne porte ni objet ni trésor. Jets limités (Acrobatie, Escalade, Perception, Discrétion, Natation, Pistage)" },
  bloodhound: { label: "Limier", rp: 10, stats: [8,0,0,10,-2,6], melee: "natural", ranged: "none", animal: true,
    gear: "Animal : ne porte ni objet ni trésor. Jets limités. +2 aux jets de Pistage du ranger à 2\"", skills: { track: 5 } },
  knight:     { label: "Chevalier", rp: 35, stats: [5,4,0,13,2,12], melee: "hand", ranged: "none",
    gear: "Arme de main, bouclier, armure lourde", skills: { strength: 4 } },
  manAtArms:  { label: "Homme d'armes", rp: 20, stats: [6,3,0,12,2,12], melee: "hand", ranged: "none",
    gear: "Arme de main, bouclier, armure légère" },
  raptor:     { label: "Rapace", rp: 10, stats: [9,0,0,14,3,1], melee: "natural", ranged: "none", animal: true,
    gear: "Animal volant : ignore les pénalités de terrain, réussit auto. Escalade et Natation. Jets limités (Acrobatie, Perception, Discrétion)", skills: { perception: 4 } },
  recruit:    { label: "Recrue", rp: 10, stats: [6,2,0,10,0,10], melee: "hand", ranged: "none",
    gear: "Arme de main" },
  rogue:      { label: "Roublard", rp: 20, stats: [7,1,1,10,1,10], melee: "dagger", ranged: "knife",
    gear: "Dague, couteau de lancer", skills: { climb: 2, perception: 2, pickLock: 5, traps: 5, stealth: 5 } },
  savage:     { label: "Sauvage", rp: 35, stats: [6,4,0,10,3,14], melee: "twoHanded", ranged: "none",
    gear: "Arme à deux mains", skills: { strength: 5 } },
  swordsman:  { label: "Bretteur", rp: 25, stats: [6,4,0,11,2,12], melee: "hand", ranged: "none",
    gear: "Arme de main, dague, armure légère" },
  templar:    { label: "Templier", rp: 35, stats: [5,4,0,12,2,12], melee: "twoHanded", ranged: "none",
    gear: "Arme à deux mains, armure lourde", skills: { strength: 4 } },
  tracker:    { label: "Pisteur", rp: 30, stats: [7,2,2,11,2,12], melee: "staff", ranged: "bow",
    gear: "Bâton, arc, carquois, armure légère", skills: { track: 5 } }
};

/* ---------------------------------------------------------------- */
/* Bestiaire — stats : [M, C, T, A, V, Santé]                        */
/* ---------------------------------------------------------------- */
ROSD.bestiary = {
  bloodBat:      { label: "Chauve-souris sanguinaire", xp: 1, stats: [8,1,0,12,3,1], traits: "Animal, Volant", animal: true, flying: true },
  burrowWorm:    { label: "Ver fouisseur", xp: 8, stats: [5,3,0,10,3,14], traits: "Animal, Fouisseur (traverse le terrain solide)", animal: true },
  civilian:      { label: "Civil", xp: 0, stats: [6,0,0,10,0,10], traits: "Dague", melee: "dagger" },
  darkrootBody:  { label: "Racinoire (corps)", xp: 6, stats: [0,3,0,14,0,18], traits: "Immobile. Arc, arbalète ou couteau : 2 dégâts maximum. Si le corps meurt, toutes les lianes disparaissent." },
  darkrootVine:  { label: "Racinoire (liane)", xp: 0, stats: [6,1,0,10,0,6], traits: "Liane mobile du racinoire" },
  fleshGolem:    { label: "Golem de chair", xp: 5, stats: [5,4,0,10,0,16], traits: "Mort-vivant, Horrifique (ND 8)", undead: true, horrific: 8 },
  ghoul:         { label: "Goule", xp: 3, stats: [6,2,0,10,2,10], traits: "Mort-vivant", undead: true },
  ghoulFiend:    { label: "Goule démoniaque", xp: 4, stats: [6,3,0,11,6,14], traits: "Mort-vivant", undead: true },
  ghoulFlinger:  { label: "Goule lanceuse", xp: 3, stats: [6,1,1,10,2,10], traits: "Mort-vivant, Lance des os (10\", +0)", undead: true, ranged: "bones" },
  ghoulRotter:   { label: "Goule putride", xp: 2, stats: [6,1,0,10,0,8], traits: "Mort-vivant, Maladie (ND 14)", undead: true, disease: 14 },
  ghoulSnake:    { label: "Serpent goule", xp: 3, stats: [5,2,0,8,0,16], traits: "Mort-vivant", undead: true },
  giantFly:      { label: "Mouche géante", xp: 2, stats: [6,0,0,6,0,5], traits: "Animal, Volant, Maladie (ND 8)", animal: true, flying: true, disease: 8 },
  giantRat:      { label: "Rat géant", xp: 2, stats: [6,0,0,6,0,1], traits: "Animal, Maladie (ND 8)", animal: true, disease: 8 },
  giantSpider:   { label: "Araignée géante", xp: 2, stats: [6,0,0,8,0,4], traits: "Animal, Poison, Aucune pénalité en terrain difficile ni en escalade", animal: true, poison: true },
  giantSnake:    { label: "Serpent géant", xp: 3, stats: [5,2,0,8,0,10], traits: "Animal, Amphibie (serpent d'eau) ou Poison (vipère)", animal: true },
  gnollFighter:  { label: "Gnoll combattant", xp: 3, stats: [6,2,0,11,0,10], traits: "Arme de main, armure légère", melee: "hand" },
  gnollArcher:   { label: "Gnoll archer", xp: 3, stats: [6,1,2,11,0,10], traits: "Dague, arc ou arbalète, carquois, armure légère", melee: "dagger", ranged: "bow" },
  gnollSergeant: { label: "Sergent gnoll", xp: 3, stats: [6,3,0,11,0,12], traits: "Arme à deux mains, armure légère", melee: "twoHanded" },
  gnollShaman:   { label: "Chaman gnoll", xp: 5, stats: [6,1,0,11,5,12], traits: "Arme de main, Poison, Inspirant (+2 Volonté aux gnolls à 6\")", melee: "hand", poison: true },
  ogre:          { label: "Ogre", xp: 5, stats: [6,3,0,12,0,14], traits: "Grand, Arme à deux mains", large: true, melee: "twoHanded" },
  shadowKnight:  { label: "Chevalier de l'Ombre", xp: 10, stats: [6,4,0,12,0,14], traits: "Mort-vivant, Immunité partielle aux armes non magiques (dégâts ÷2)", undead: true, partialImmunity: true },
  skeletalKnight:{ label: "Chevalier squelette", xp: 2, stats: [6,3,0,13,0,1], traits: "Mort-vivant", undead: true },
  skeleton:      { label: "Squelette", xp: 1, stats: [6,1,0,10,0,1], traits: "Mort-vivant", undead: true },
  swampZombie:   { label: "Zombie des marais", xp: 2, stats: [4,0,0,12,0,6], traits: "Mort-vivant, Amphibie", undead: true },
  terrorWing:    { label: "Aile de terreur", xp: 20, stats: [6,5,0,14,8,16], traits: "Grand, Horrifique (ND 12), Volant, Lanceur de sorts (voir scénario)", large: true, flying: true, horrific: 12 },
  torturedSoul:  { label: "Âme torturée", xp: 10, stats: [6,0,0,0,0,1], traits: "Mort-vivant. -2 Volonté à tous les héros. Ne combat jamais, ne peut être blessée. Libérée par un jet de Volonté ou de Commandement (ND 20) au contact (+10 PX).", undead: true },
  troll:         { label: "Troll", xp: 8, stats: [4,4,0,14,2,16], traits: "Grand, Arme à deux mains. Sur 20 au placement : troll à deux têtes (un soutien de moins pour ses adversaires)", large: true, melee: "twoHanded" },
  vulture:       { label: "Vautour", xp: 3, stats: [6,0,0,14,0,4], traits: "Animal, Volant", animal: true, flying: true },
  wolf:          { label: "Loup", xp: 2, stats: [8,1,0,10,0,6], traits: "Animal", animal: true },
  zombie:        { label: "Zombie", xp: 2, stats: [4,0,0,12,0,6], traits: "Mort-vivant", undead: true }
};

/* ---------------------------------------------------------------- */
/* Tables de campagne                                                */
/* ---------------------------------------------------------------- */
ROSD.survivalTable = [
  { max: 2,  label: "Mort", desc: "La figurine meurt. Si c'est le ranger, la mission s'achève immédiatement." },
  { max: 4,  label: "Blessure permanente", desc: "Lancez sur la table des blessures permanentes.", injury: true },
  { max: 6,  label: "Grièvement blessé", desc: "Commence la partie suivante à -5 Santé (un compagnon peut plutôt sauter le reste de la mission)." },
  { max: 8,  label: "De justesse", desc: "Blessures mineures, mais perd tout l'équipement non standard." },
  { max: 99, label: "Rétablissement complet", desc: "Revient à pleine Santé au scénario suivant." }
];

ROSD.injuryTable = [
  { max: 2,  label: "Orteils perdus", desc: "-0,5 Mouvement (cumulable 2 fois)." },
  { max: 5,  label: "Jambe brisée", desc: "-1 Mouvement (cumulable 2 fois)." },
  { max: 10, label: "Bras broyé", desc: "-1 Combat (cumulable 2 fois)." },
  { max: 12, label: "Doigts perdus", desc: "-1 Tir (cumulable 2 fois)." },
  { max: 14, label: "Plus jamais aussi fort", desc: "Commence chaque partie à -1 Santé (cumulable 2 fois)." },
  { max: 16, label: "Cicatrices psychologiques", desc: "-1 Volonté (cumulable 2 fois)." },
  { max: 18, label: "Mâchoire fracassée", desc: "Ranger : un seul compagnon activé en phase des Rangers et -3 aux jets de Commandement. Compagnon : pas de progression ce scénario." },
  { max: 20, label: "Œil perdu", desc: "-1 au jet de Combat quand la figurine est la cible d'un tir. Deux fois : aveugle, fin de carrière." }
];

/* Coût en PX pour atteindre le niveau indiqué */
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
    case 1: return "Améliorer les compétences (+5 au total, +2 max par compétence)";
    case 2: return "Améliorer une caractéristique (+1 ; max M 7, C +5, T +5, V +8, Santé 22)";
    case 3: return "+10 Points de recrutement de base";
    default: return "Nouvelle capacité héroïque";
  }
};

ROSD.companionRewards = [
  [10, "+1 Santé"], [20, "+1 Combat ou +1 Tir"], [30, "+4 à une compétence (max +10)"],
  [40, "+2 Volonté"], [50, "Une capacité héroïque"], [60, "+1 Santé"],
  [70, "+4 à une compétence (max +10)"], [80, "+2 Volonté"], [100, "Une capacité héroïque"]
];

/* Points de recrutement totaux selon le nombre de joueurs */
ROSD.recruitment = {
  1: { calc: brp => brp, max: 7, activate: 2 },
  2: { calc: brp => Math.floor(brp * 0.5) - 10, max: 3, activate: 1 },
  3: { calc: brp => Math.floor(brp * 0.3), max: 2, activate: 0 },
  4: { calc: brp => Math.floor(brp * 0.1), max: 1, activate: 0 }
};

ROSD.creatureAI = `<ol>
<li><b>En combat ?</b> Elle combat. Si elle gagne, elle reste au contact et n'utilise pas sa 2e action.</li>
<li><b>Un héros en ligne de vue ?</b> Avec une arme de tir et à portée : elle tire sur le héros le plus proche (2e action : recharger une arbalète). Sinon elle marche vers le héros le plus proche ; au contact, elle combat, sinon elle se rapproche encore.</li>
<li><b>Point cible ?</b> Oui : une action vers le Point cible. Non : un mouvement aléatoire. Puis retour à l'étape 2 pour la 2e action.</li>
</ol>
<p>Ordre d'activation : Santé actuelle décroissante. Elles forcent toujours le combat, visent le héros à la Santé la plus basse en mêlée multiple et ne font jamais de coup critique.</p>`;

/* ================================================================ */
/* Objets                                                           */
/* ================================================================ */
ROSD.itemCategories = {
  weapon: "Arme",
  armour: "Armure / bouclier",
  equipment: "Équipement",
  potion: "Herbe ou potion",
  magic: "Objet magique",
  treasure: "Trésor",
  other: "Autre"
};

ROSD.weaponKinds = { "": "—", melee: "Mêlée", ranged: "Tir", thrown: "Lancer (mêlée de secours)" };

ROSD.itemProperties = {
  "": "— Aucune —",
  magic: "Magie : activée, +1 Combat (ou Tir) et arme magique pour la partie",
  light: "Légère : n'occupe pas d'emplacement (1 seul objet léger)",
  brightness: "Éclat : +5 au jet de Combat contre un tir (à déclarer avant)",
  blocking: "Blocage : après un combat perdu, aucun dégât subi",
  elemental: "Frappe élémentaire : +5 dégâts si le combat est gagné",
  fate: "Destin : relancer un dé",
  attack: "Attaque : l'objet génère une attaque de tir",
  recoverSpell: "Récupère un sort déjà lancé",
  recoverAbility: "Récupère une capacité héroïque déjà utilisée"
};

/* Construction compacte des objets du catalogue */
const IT = (name, category, img, sys = {}) => ({ name, type: "objet", img: `icons/svg/${img}.svg`, system: { category, ...sys } });
const B = o => ({ bonus: { move: 0, fight: 0, shoot: 0, armour: 0, will: 0, dmg: 0, ...o } });
const WPN = (kind, base, dmg, range = 0, extra = {}) => ({ weapon: { kind, base, dmg, range, staff: base === "staff", twoHanded: base === "twoHanded", ...extra } });

const BASIC = [
  IT("Arc", "weapon", "target", { slots: 1, ...WPN("ranged", "bow", 0, 24),
    description: "Se charge et tire en une seule action. Portée 24\", aucun modificateur de dégâts. Nécessite un carquois (ou une munition magique)." }),
  IT("Arbalète", "weapon", "target", { slots: 1, ...WPN("ranged", "crossbow", 2, 24),
    description: "Une action pour charger, une pour tirer (le mouvement peut être remplacé par le rechargement). +2 dégâts, portée 24\". Commence la partie chargée. Nécessite un carquois." }),
  IT("Dague", "weapon", "sword", { slots: 1, ...WPN("melee", "dagger", -1),
    description: "Couteau non équilibré pour le lancer. -1 dégâts. La première dague ou le premier couteau de lancer du ranger n'occupe pas d'emplacement." }),
  IT("Arme de main", "weapon", "sword", { slots: 1, ...WPN("melee", "hand", 0),
    description: "Épée, masse, hache, lance… Aucun modificateur en combat." }),
  IT("Armure lourde", "armour", "shield", { slots: 1, ...B({ armour: 2, move: -1 }),
    description: "Armure principalement métallique : +2 Armure, -1 Mouvement. Une seule armure (légère ou lourde) à la fois." }),
  IT("Armure légère", "armour", "shield", { slots: 1, ...B({ armour: 1 }),
    description: "Armure de cuir ou d'autres matières non métalliques : +1 Armure." }),
  IT("Carquois", "equipment", "item-bag", { slots: 1,
    description: "Indispensable pour tirer normalement à l'arc ou à l'arbalète. Permet de porter une munition magique sans emplacement supplémentaire." }),
  IT("Corde", "equipment", "net", { slots: 1,
    description: "Au sommet d'une structure verticale : une action pour fixer la corde. Toute figurine l'escalade ensuite sans pénalité de mouvement. Une corde par partie et par objet." }),
  IT("Bouclier", "armour", "shield", { slots: 1, ...B({ armour: 1 }),
    description: "+1 Armure. Incompatible avec une arme à deux mains ou un bâton." }),
  IT("Bâton", "weapon", "sword", { slots: 1, ...WPN("melee", "staff", -1),
    description: "-1 dégâts, mais l'adversaire a aussi -1 dégâts au corps à corps (pas contre les tirs)." }),
  IT("Couteau de lancer", "weapon", "thrust", { slots: 1, ...WPN("thrown", "knife", -1, 8),
    description: "Une attaque de tir par partie et par couteau : portée 8\", -1 dégâts. En mêlée de secours : -2 dégâts. Le premier couteau ou la première dague du ranger n'occupe pas d'emplacement." }),
  IT("Arme à deux mains", "weapon", "sword", { slots: 2, ...WPN("melee", "twoHanded", 2),
    description: "Épée à deux mains, hache de bataille, arme d'hast… +2 dégâts. Occupe deux emplacements pour un ranger." })
];

const USE = o => ({ consumable: true, use: { heal: 0, fullHeal: false, cure: false, cureDisease: false, tempHealth: 0, attack: 0, range: 0, ...o } });

const HERBS = [
  IT("Herbe de Dremlocke", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ will: 5 }),
    description: "L'utilisateur reçoit +5 à tous ses jets de Volonté jusqu'à la fin du scénario." }),
  IT("Feuille de Loinlumière", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ shoot: 1, fight: -1, will: -1 }),
    description: "+1 Tir, mais -1 Combat et -1 Volonté jusqu'à la fin du scénario." }),
  IT("Verte de Cœurdefeu", "potion", "oak", { slots: 1, ...USE(),
    description: "+1 action à la prochaine activation (3 actions maximum)." }),
  IT("Feuilles de fureur", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ dmg: 1, will: -2 }),
    description: "+1 dégât chaque fois que l'utilisateur gagne un combat, mais -2 Volonté." }),
  IT("Poudre d'écorce-de-fer", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ armour: 1, will: -2 }),
    description: "+1 Armure, mais -2 Volonté." }),
  IT("Noctenoix", "potion", "oak", { slots: 1, ...USE({ cureDisease: true }),
    description: "À prendre avant un scénario par une figurine malade : la maladie est guérie et n'a aucun effet au scénario suivant." }),
  IT("Racine de Vifrayon", "potion", "oak", { slots: 1, ...USE(), activation: true, ...B({ move: 2, will: -2 }),
    description: "+2 Mouvement, mais -2 Volonté." }),
  IT("Blé de Haïk", "potion", "oak", { slots: 1, ...USE({ tempHealth: 2 }), activation: true, ...B({ will: -1 }),
    description: "+2 points de Santé temporaires (peut dépasser le maximum, pour la durée du scénario), mais -1 Volonté." }),
  IT("Argentine", "potion", "oak", { slots: 1, ...USE(),
    description: "Brûlée, elle dégage une odeur répugnante pour les gnolls : tous les gnolls en combat avec l'utilisateur ont -1 Combat." }),
  IT("Anthalas", "potion", "oak", { slots: 1, ...USE(),
    description: "Après une partie, le ranger ou un compagnon gagne +1 à son jet de survie. À décider avant le jet." }),
  IT("Potion de soins", "potion", "heal", { slots: 1, ...USE({ heal: 5, cure: true }),
    description: "Rend 5 points de Santé (sans dépasser le maximum) et supprime les effets du poison." }),
  IT("Potion de force", "potion", "upgrade", { slots: 1, ...USE(), activation: true, ...B({ fight: 1 }),
    description: "+1 Combat jusqu'à la fin du scénario." }),
  IT("Potion de robustesse", "potion", "upgrade", { slots: 1, ...USE(), activation: true, ...B({ armour: 1 }),
    description: "+1 Armure jusqu'à la fin du scénario." }),
  IT("Philtre de poussière de fée", "potion", "aura", { slots: 1, ...USE(),
    description: "Saupoudrée sur une arme, celle-ci compte comme magique. Sur une flèche ou un carreau, l'effet ne sert qu'une fois." }),
  IT("Cocktail explosif", "potion", "fire", { slots: 1, ...USE({ attack: 3, range: 8 }), property: "attack",
    description: "Une action pour le lancer jusqu'à 8\" en ligne de vue : chaque figurine à 2\" du point d'impact subit une attaque de tir +3." }),
  IT("Cordial de flamme-sort", "potion", "lightning", { slots: 1, ...USE(), property: "recoverSpell",
    description: "La figurine récupère l'usage d'un sort déjà lancé pendant le scénario." }),
  IT("Potion de marche-spectre", "potion", "invisible", { slots: 1, ...USE(),
    description: "Pendant un tour, la figurine traverse le terrain comme s'il n'existait pas." }),
  IT("Potion de chute lente", "potion", "falling", { slots: 1, ...USE(),
    description: "Pendant un tour, la figurine peut tomber de n'importe quelle hauteur sans dégât." }),
  IT("Potion d'héroïsme", "potion", "upgrade", { slots: 1, ...USE(), property: "recoverAbility",
    description: "La figurine récupère l'usage d'une capacité héroïque déjà utilisée pendant le scénario." }),
  IT("Potion de restauration", "potion", "regen", { slots: 1, ...USE({ fullHeal: true, cure: true, cureDisease: true }),
    description: "Rend toute la Santé de départ, guérit poison, maladie et baisses temporaires de caractéristiques. Après une partie : guérit une blessure permanente au choix." })
];

const CH = n => ({ charges: { value: n, max: n } });
const MAGICW = (name, base, kind, dmg, range, slots, img) =>
  IT(`${name}, Magie`, "weapon", img, { slots, magic: true, property: "magic", activation: true, ...CH(5), ...WPN(kind, base, dmg, range),
    ...B(kind === "ranged" ? { shoot: 1 } : { fight: 1 }),
    description: `Arme magique (5 charges). À tout moment, le porteur peut l'activer (1 charge) : elle compte comme magique et donne +1 ${kind === "ranged" ? "Tir" : "Combat"} jusqu'à la fin de la partie. Sans charge, elle redevient une arme ordinaire.` });

const WEAPONS_ARMOUR = [
  MAGICW("Arme de main", "hand", "melee", 0, 0, 1, "sword"),
  MAGICW("Arme à deux mains", "twoHanded", "melee", 2, 0, 2, "sword"),
  MAGICW("Arc", "bow", "ranged", 0, 24, 1, "target"),
  MAGICW("Arbalète", "crossbow", "ranged", 2, 24, 1, "target"),
  MAGICW("Bâton", "staff", "melee", -1, 0, 1, "sword"),
  IT("Arme de main, Légère", "weapon", "sword", { slots: 0, property: "light", ...WPN("melee", "hand", 0),
    description: "Alliage précieux : n'occupe pas d'emplacement. Un seul objet léger à la fois. Usage illimité." }),
  IT("Arme à deux mains, Légère", "weapon", "sword", { slots: 0, property: "light", ...WPN("melee", "twoHanded", 2),
    description: "+2 dégâts. N'occupe pas d'emplacement. Un seul objet léger à la fois." }),
  IT("Dague, Légère", "weapon", "sword", { slots: 0, property: "light", ...WPN("melee", "dagger", -1),
    description: "-1 dégâts. N'occupe pas d'emplacement. Un seul objet léger à la fois." }),
  IT("Couteau de lancer, Léger", "weapon", "thrust", { slots: 0, property: "light", ...WPN("thrown", "knife", -1, 8),
    description: "Portée 8\", -1 dégâts. N'occupe pas d'emplacement. Un seul objet léger à la fois." }),
  IT("Bouclier, Éclat", "armour", "holy-shield", { slots: 1, property: "brightness", ...CH(5), ...B({ armour: 1 }),
    description: "+1 Armure. Éclat (5 charges) : quand le porteur est la cible d'un tir, +5 à son jet de Combat (avant le jet)." }),
  IT("Armure légère, Éclat", "armour", "holy-shield", { slots: 1, property: "brightness", ...CH(5), ...B({ armour: 1 }),
    description: "+1 Armure. Éclat (5 charges) : +5 au jet de Combat contre un tir (avant le jet)." }),
  IT("Armure lourde, Éclat", "armour", "holy-shield", { slots: 1, property: "brightness", ...CH(5), ...B({ armour: 2, move: -1 }),
    description: "+2 Armure, -1 Mouvement. Éclat (5 charges) : +5 au jet de Combat contre un tir (avant le jet)." }),
  IT("Arme de main, Frappe élémentaire", "weapon", "lightning", { slots: 1, property: "elemental", ...CH(3), ...WPN("melee", "hand", 0),
    description: "Frappe élémentaire (3 charges) : après un combat gagné infligeant au moins 1 dégât, +5 dégâts de magie élémentaire." }),
  IT("Arme à deux mains, Frappe élémentaire", "weapon", "lightning", { slots: 2, property: "elemental", ...CH(3), ...WPN("melee", "twoHanded", 2),
    description: "+2 dégâts. Frappe élémentaire (3 charges) : +5 dégâts après un combat gagné infligeant au moins 1 dégât." }),
  IT("Bâton, Frappe élémentaire", "weapon", "lightning", { slots: 1, property: "elemental", ...CH(3), ...WPN("melee", "staff", -1),
    description: "Bâton. Frappe élémentaire (3 charges) : +5 dégâts après un combat gagné infligeant au moins 1 dégât." }),
  IT("Bouclier, Blocage", "armour", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...B({ armour: 1 }),
    description: "+1 Armure. Blocage (1 charge) : après un combat au corps à corps perdu, le porteur ne subit aucun dégât." }),
  IT("Armure légère, Blocage", "armour", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...B({ armour: 1 }),
    description: "+1 Armure. Blocage (1 charge) : après un combat perdu, aucun dégât subi." }),
  IT("Armure lourde, Blocage", "armour", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...B({ armour: 2, move: -1 }),
    description: "+2 Armure, -1 Mouvement. Blocage (1 charge) : après un combat perdu, aucun dégât subi." }),
  IT("Arme de main, Blocage", "weapon", "mage-shield", { slots: 1, property: "blocking", ...CH(1), ...WPN("melee", "hand", 0),
    description: "Blocage (1 charge) : après un combat au corps à corps perdu, aucun dégât subi." }),
  IT("Arme à deux mains, Blocage", "weapon", "mage-shield", { slots: 2, property: "blocking", ...CH(1), ...WPN("melee", "twoHanded", 2),
    description: "+2 dégâts. Blocage (1 charge) : après un combat perdu, aucun dégât subi." })
];

const SK = (a, value, mode = "passive", b = "") => ({ skills: { a, b, value, mode } });

const MAGIC_ITEMS = [
  IT("Gemme de flamme-sort", "magic", "lightning", { slots: 1, property: "recoverSpell", ...CH(1),
    description: "Permet de lancer un de ses sorts sans le dépenser pour le scénario (1 charge)." }),
  IT("Pendentif du feu solaire", "magic", "sun", { slots: 1, ...CH(3),
    description: "Action gratuite (3 charges) : jusqu'à la fin de la partie, toutes les attaques du porteur contre les morts-vivants comptent comme magiques, et les morts-vivants en combat avec lui ont -2 Combat et -2 Armure." }),
  IT("Bourse à herbes", "magic", "item-bag", { slots: 1,
    description: "Occupe un emplacement mais contient deux herbes." }),
  IT("Livre du savoir", "magic", "book", { slots: 1, ...SK("ancientLore", 2, "passive", "readRunes"),
    description: "+2 à tous les jets de Savoir ancien et de Lecture des runes." }),
  IT("Crochets enchantés", "magic", "padlock", { slots: 1, ...CH(5), ...SK("pickLock", 5, "use"),
    description: "+5 à un jet de Crochetage, à déclarer avant le jet (5 charges)." }),
  IT("Cape de feuille-grise", "magic", "invisible", { slots: 1, ...SK("stealth", 2),
    description: "+2 à tous les jets de Discrétion." }),
  IT("Gantelets de force", "magic", "upgrade", { slots: 1, ...CH(5), ...SK("strength", 5, "use"),
    description: "+5 à un jet de Force, à déclarer avant le jet (5 charges)." }),
  IT("Amulette de commandement", "magic", "aura", { slots: 1,
    description: "+5 au total de Points de recrutement du ranger qui la porte pour la mission à venir." }),
  IT("Gants d'escalade", "magic", "upgrade", { slots: 1, ...CH(5), ...SK("climb", 5, "use"),
    description: "+5 à un jet d'Escalade, à déclarer avant le jet (5 charges)." }),
  IT("Broche œil-d'aigle", "magic", "eye", { slots: 1, ...SK("perception", 2),
    description: "+2 à tous les jets de Perception." }),
  IT("Anneau de téléportation", "magic", "portal", { slots: 1, ...CH(1),
    description: "Une action (1 charge) : la figurine se déplace immédiatement de 10\" dans n'importe quelle direction, vers un point en ligne de vue." }),
  IT("Bottes de pas léger", "magic", "upgrade", { slots: 1, ...CH(2),
    description: "Activées pendant l'activation (2 charges) : jusqu'à la fin du tour, ignore les pénalités de terrain difficile." }),
  IT("Cape d'invisibilité", "magic", "invisible", { slots: 1, ...CH(2),
    description: "À tout moment (2 charges) : jusqu'à la fin du tour, aucune créature maléfique ne force le combat avec la figurine ni ne la prend en compte. +8 aux jets de Discrétion pendant l'invisibilité." }),
  IT("Verre-poisson", "magic", "waterfall", { slots: 1, ...CH(1),
    description: "Une fois avalée (1 charge), la figurine réussit automatiquement tous ses jets de Natation jusqu'à la fin de la partie." }),
  IT("Gemme de cœur-lumière", "magic", "sun", { slots: 1, ...CH(1),
    description: "À défausser pendant l'activation : une action supplémentaire (3 actions maximum)." }),
  IT("Anneau de sort", "magic", "mage-shield", { slots: 1, ...CH(1),
    description: "Choisissez un sort à la découverte (notez-le ici). Le porteur peut dépenser une action pour le lancer ; l'anneau est ensuite détruit." }),
  IT("Trousse à outils", "magic", "item-bag", { slots: 1, ...SK("armoury", 2, "passive", "traps"),
    description: "+2 à tous les jets d'Armurerie et de Pièges." }),
  IT("Pendentif pare-sort", "magic", "holy-shield", { slots: 1, ...CH(1),
    description: "Quand le porteur doit faire un jet de Volonté pour résister à un sort, il peut défausser le pendentif pour annuler le sort (même après le jet)." }),
  IT("Orbe de boule de feu", "magic", "fire", { slots: 1, ...CH(1), ...USE({ attack: 5, range: 10 }), property: "attack",
    description: "Une action pour la lancer jusqu'à 10\" : chaque figurine à 2\" du point d'impact subit une attaque de tir magique élémentaire +5." }),
  IT("Pierre du destin", "magic", "dice-target", { slots: 1, property: "fate", ...CH(1),
    description: "Permet de relancer un dé (1 charge)." })
];

ROSD.itemCatalog = [
  { folder: "Équipement de base", items: BASIC },
  { folder: "Herbes et potions", items: HERBS },
  { folder: "Armes et armures magiques", items: WEAPONS_ARMOUR },
  { folder: "Objets magiques", items: MAGIC_ITEMS }
];
