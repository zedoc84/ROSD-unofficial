# Rangers of Shadow Deep — système Foundry VTT

Système non officiel pour **Rangers of Shadow Deep – Deluxe Edition** (Joseph A. McCullough).
Compatible Foundry VTT v13 et v14. Le livre de règles reste nécessaire : les descriptions sont des résumés.

## Installation
1. Décompressez l'archive : vous obtenez un dossier `rosd`.
2. Copiez-le dans `Données utilisateur/Data/systems/` (le chemin final doit être `.../Data/systems/rosd/system.json`).
3. Relancez Foundry, créez un monde avec le système « Rangers of Shadow Deep ».
4. Paramètres du monde : indiquez le nombre de joueurs (points de recrutement, compagnons activés).

## Contenu
- **Ranger (héros)** : caractéristiques divisées (base/effective), 15 compétences, capacités héroïques et sorts en listes déroulantes, 6 emplacements d'objets, états, recrutement, niveaux et PX.
- **Compagnon (suivant)** : profils des 17 compagnons du livre à appliquer en un clic, équipement, progression.
- **Créature** : 30 profils du bestiaire, traits (mort-vivant, poison, maladie, immunité partielle…), rappel du comportement des créatures.
- **Icônes modifiables** (PNG ou JPEG) : clic sur le portrait, sur l'emblème en haut à droite ou sur l'icône de chaque capacité et sort. Clic droit sur une icône : retour à l'icône par défaut.
- **Export PDF** : bouton PDF dans la barre de titre de chaque fiche (à côté des boutons de Foundry). La fiche est téléchargée en A4, avec le portrait.
- **Objets** : type d'objet « Objet » (catégorie, emplacements, quantité, magique, description). Glissez-les sur une fiche depuis l'onglet Objets, un compendium ou une autre fiche. Entre deux fiches, l'objet est transféré (maintenez Ctrl pour le copier). Les objets identiques non magiques s'empilent. La fiche compte les emplacements (6 pour un ranger, 2 objets pour un compagnon) et refuse les objets sur les animaux.
- **Objets des règles** : bouton « Importer les objets ROSD » dans l'onglet Objets (MJ) : 72 objets (équipement de base, 20 herbes et potions, 20 armes et armures magiques, 20 objets magiques).
- **Bonus automatiques** : les armures et objets portés, et l'arme en main, ajoutent leurs bonus aux caractéristiques (ligne « Objets » sous Mod.). Les dégâts de l'arme en main sont utilisés dans les attaques.
- Bouton **« Importer le bestiaire ROSD »** dans l'onglet Acteurs (MJ).

## Jets de dés
- Clic sur une caractéristique ou une compétence : 1d20 + valeur contre un ND (20 naturel = réussite, 1 = échec).
- **Mêlée / Tir** : ciblez l'adversaire (touche T), les deux d20 sont lancés, soutiens, armes, couverts, critiques, dégâts, multiplicateurs et immunité partielle sont calculés. Bouton pour appliquer les dégâts (poison et maladie gérés).
- Capacités utilisables depuis le chat : Main du destin, Coup/Tir mortel, Parade, Coup puissant, Encaisser le coup, Force intérieure. Les autres (Attaque frénétique, Visée assurée, Plongeon, Concentration, Puissance accrue) se cochent avant le jet.
- **Sorts** : attaques magiques automatiques, boutons de résistance en Volonté, bouton de soins. Objets de lanceur (baguette, cristal, icône sacrée, bâton de sorcier) pris en compte.
- **Table de survie** et **blessures permanentes** après la partie.
- Bouton **Nouveau scénario** : réinitialise capacités et sorts utilisés.
- Initiative du tracker : rangers (par Volonté), puis créatures (par Santé), puis compagnons.

## Licence tierce
L'export PDF utilise jsPDF (licence MIT), inclus dans `lib/`.
