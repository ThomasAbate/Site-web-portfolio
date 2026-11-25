/* ─────────────────────────────────────────────────────────────────────────────
   data.js  –  Toutes les données des projets du portfolio

   COMMENT MODIFIER CE FICHIER :
   - Pour ajouter un projet  → copie un bloc existant et remplis les champs
   - Pour supprimer un projet → supprime son bloc entier (de { jusqu'au }, suivant)
   - Pour modifier l'ordre   → change "homeFeaturedOrder" ou le tri dans CATEGORY_ORDER
   - Les images doivent être dans /picture/<id-du-projet>/
   ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   STRUCTURE D'UN PROJET — Explication de chaque champ
   ─────────────────────────────────────────────────────────────────────────────
   {
     id:            Identifiant unique du projet (string, sans espace, en minuscules)
                    → Utilisé dans l'URL : project.html?id=MON-ID
                    → Doit correspondre exactement au nom du dossier dans /picture/

     name:          Nom affiché du projet (string)
                    → Affiché sur les cartes et en bannière de la page projet

     category:      Catégorie technique (string) — 3 valeurs possibles :
                    'personal' | 'school' | 'gamejam'
                    → Utilisé pour les filtres sur la page Works

     categoryLabel: Libellé affiché de la catégorie (string)
                    → Exemple : 'Personal Project', 'Game Jam', 'School Project'

     year:          Année du projet (string, ex: '2025' ou '2026')

     shortDesc:     Courte description affichée sur la carte (string, ~1 ligne)

     intro:         Paragraphe d'introduction affiché en haut de la page projet (string)

     bullets:       Liste des points clés du projet (tableau d'objets)
                    → Chaque bullet a un 'title' et un 'text'
                    → Affiché comme une liste à la page projet

     mainImageSlug: Chemin de l'image principale (string)
                    → Format : 'picture/ID-PROJET/nom-du-fichier.png'
                    → Utilisé comme image de la carte ET bannière de la page projet
                    → null = aucune image (placeholder affiché)

     trailerID:     ID YouTube de la vidéo de présentation (string)
                    → Exemple : 'hBTu7WFeQU0' (partie après ?v= dans l'URL YouTube)
                    → null = pas de trailer (section trailer cachée)

     engineName:    (optionnel) Nom du moteur affiché dans la sidebar (string)
                    → Défaut si absent : 'Unreal Engine 5'

     engineLogo:    (optionnel) Chemin du logo du moteur affiché dans la sidebar (string)
                    → Défaut si absent : 'picture/icons-unreal-engine-500.png'

     wip:           (optionnel, boolean) true = affiche un badge "Work in Progress"
                    sur la carte du projet et sur sa page de détail
                    → Défaut si absent : false (pas de badge)

     gallery:       Tableau d'images pour le carrousel de la page projet
                    → Chaque image : { slug: 'chemin/vers/image.png', title: 'Légende', desc: 'Texte' }
                    → intent (optionnel) : UNE ligne d'intention, affichée sous la vignette
                      et en tête du panneau quand l'image est ouverte en grand
                    → desc (optionnel) : détail affiché dans le panneau, sous l'intention
                    → alt (optionnel) : description de ce qu'on voit (accessibilité)
                    → legend (optionnel) : légende des couleurs d'un plan, affichée dans le panneau
                      [{ c: '#couleur', s: 'line'|'dot'|'square'|'box'|'bar'|'tri'|'pent'|'loop', t: 'Texte' }]
                    → more: true → image rangée dans le bloc replié "Voir plus"
                    → wip: true → badge "Work in Progress" sur la vignette et dans le panneau
                    Sans intent ni desc ni legend = pas de panneau.

     trailerHls:    (optionnel) URL d'une vidéo HLS (.m3u8), ex. bande-annonce Steam.
                    Prioritaire sur trailerID. trailerPoster = image affichée avant lecture.
     noTrailer:     (optionnel) true = pas de vidéo : la section trailer est cachée
                    (au lieu du message "Gameplay footage coming soon")
     focus:         (optionnel) domaines travaillés, affichés dans la sidebar
                    → Exemple : ['Game Design', 'Economy', 'Monetization']
     galleryThumbs: (optionnel) true = vignettes WebP dans picture/<id>/thumbs/
                    → [] = galerie vide (section galerie cachée)

     featured:      (boolean) Réservé pour un usage futur (non utilisé actuellement)

     homeFeatured:  (boolean) true = affiché dans la section "Selected Works" de l'accueil

     homeFeaturedOrder: (number) Ordre d'affichage sur l'accueil (1 = premier, 2 = deuxième...)
                        → Ignoré si homeFeatured est false
   }
   ───────────────────────────────────────────────────────────────────────────── */

const PROJECTS = [

  /* ════════════════════════════════════════════════
     GAME JAM — Projets réalisés lors de Game Jams
  ════════════════════════════════════════════════ */
  {
    id:            'mask-snatchers',
    name:          'Mask Snatchers',
    category:      'gamejam',
    categoryLabel: 'Game Jam',
    year:          '2026',
    shortDesc:     'Game Jam Project (2026)',
    intro:         "For this Game Jam I focused on creating a high-energy, 'juicy' experience while maintaining player clarity under pressure. My contributions centred on three core pillars:",
    bullets: [
      {
        title: '3C Design',
        text:  "Designed and balanced the core gameplay loop to ensure intuitive and responsive movement.",
      },
      {
        title: 'Dynamic Camera System',
        text:  "Implemented a smart camera that seamlessly splits or merges based on the distance between players, ensuring optimal visibility and spatial awareness at all times.",
      },
      {
        title: 'Technical Animation',
        text:  "Developed a speed-matching locomotion system where animation speed scales with character velocity, and created impactful attack animations to maximise gameplay feedback.",
      },
      {
        title: 'Sound Design & Immersion',
        text:  "Curated an arcade-style soundscape with a focus on 'intentional chaos.' Every action triggers strong audio feedback to heighten the game's intensity and keep the player's adrenaline pumping.",
      },
    ],
    focus:         ['3C', 'Camera', 'Technical Animation', 'Sound Design'],
    mainImageSlug: 'picture/mask-snatchers/main.png',
    trailerID:     'hBTu7WFeQU0',
    ggjURL:        'https://globalgamejam.org/games/2026/mask-snatchers-5',
    gallery: [
      { slug: 'picture/mask-snatchers/gallery-Animation de course du joueur.png', title: 'Animation de course du joueur',
        desc: "The hands are animated procedurally. A looping timeline swings each hand between two positions, and the result is blended with the rest pose using velocity ÷ max speed. Standing still keeps the hands at rest and full speed gives the full swing, so the animation always matches what the player is doing with the stick." },
      { slug: 'picture/mask-snatchers/gallery-Shared player camera.png',          title: 'Shared Player Camera',
        desc: "Both players share a single top-down view while they stay close, so each always sees where the other is and the fight stays readable." },
      { slug: 'picture/mask-snatchers/gallery-Shared player camera Bleuprint.png', title: 'Shared Player Camera Blueprint',
        desc: "Top: while the players are within 1500 units of each other, both controllers use the shared camera and the split UI stays hidden. Beyond that distance the screen splits and each player gets their own view. Bottom: every tick, the camera moves to the midpoint between the players (Lerp, alpha 0.5) and its orthographic width follows their distance, clamped between 768 and 1500. The view zooms out smoothly first and only splits as a last resort." },
    ],
    featured: false,
    homeFeatured: false,
  },
  {
    id:            'siamese-siamese-cowboy-cat-saloon',
    name:          'Siamese Siamese Cowboy Cat Saloon',
    category:      'gamejam',
    categoryLabel: 'Game Jam',
    year:          '2024',
    shortDesc:     'Game Jam Project (2024)',
    intro:         "For this project I focused on creating a chaotic, high-stakes service experience where the 'game feel' was paramount. My contributions centred on enhancing tactile feedback and character presence:",
    bullets: [
      {
        title: 'Morph-Based Animation',
        text:  "Integrated expressive 'Grab' and 'Slap' hand interactions using Unreal Engine Morph Targets to ensure fluid, character-driven visuals.",
      },
      {
        title: 'Procedural Weight & Inertia',
        text:  "Implemented a procedural arm-lag system to simulate physical resistance, giving the character's movement a distinct, satisfying sense of weight and \"heaviness.\"",
      },
      {
        title: 'Visceral Feedback Systems',
        text:  "Engineered a feedback loop featuring tiered camera shakes for soul-snatching phases and haptic Force Feedback for player-vs-player collisions, intensifying the impact of every action.",
      },
    ],
    focus:         ['Game Feel', 'Technical Animation', 'Feedback Systems'],
    mainImageSlug: 'picture/siamese-cowboy-cat-saloon/main.png',
    trailerID:     'j9lCIWWBivQ',
    ggjURL:        'https://globalgamejam.org/games/2024/siamese-siamese-cowboy-cat-saloon-7',
    gallery: [
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-feedback_liste.png',      title: 'Feedback – Liste',
        desc: "The feedback toolkit: three levels of camera shake that escalate with the soul-snatching phases, plus a Force Feedback effect on slaps. The player feels every step of the duel getting more intense." },
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-animation-blueprint.png', title: 'Player Animation Blueprint',
        desc: "Grab and slap are driven by Morph Targets, not skeletal animations. Pressing the input plays a timeline whose 0→1 value sets the morph weight, and releasing the input reverses it. A Do Once gate stops the slap from re-triggering while the button is held, and the slap sound only plays when the timeline finishes, so the audio lands exactly on the impact." },
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-player-blueprint.png',    title: 'Player Blueprint',
        desc: "The arm hangs from its own spring arm (“Lag Bra”) with camera rotation lag set to 16. When the player turns, the paw trails slightly behind the view, and that small delay gives it weight and inertia without any extra code." },
    ],
    featured: false,
    homeFeatured: false,
  },

  /* ════════════════════════════════════════════════
     PERSONAL — Projets personnels
  ════════════════════════════════════════════════ */
  {
    id:            'splinter-cell-prototype',
    name:          'Splinter Cell : Prototype',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2026',
    shortDesc:     'Prototyping luminance-driven detection and systemic stealth mechanics',
    intro:         "The objective of this prototype was to engineer a systemic stealth framework where player visibility is calculated in real-time based on global illumination (Direct Light and VFX):",
    bullets: [
      {
        title: 'Real-Time Luminance Extraction',
        text:  "Engineered a visibility detection system using a SceneCaptureComponent2D parented to a proxy mesh above the player. By sampling the Render Target data, I extracted raw luminance values to calculate a precise exposure float, which is the core variable for the player's detection state.",
      },
      {
        title: 'Unified Light Feedback (Direct & VFX)',
        text:  "Unlike standard distance-based light checks, this method captures all light sources within the engine, including Static/Dynamic lights and Niagara VFX. This ensures consistent behaviour in complex environments where traditional line-trace methods would fail to detect ambient or particle-based lighting.",
      },
      {
        title: 'Multi-Modal AI Perception',
        text:  "Integrated the luminance data with an acoustic movement system. These variables (Light + Sound) are fed into the AI Perception Component, creating a high-stakes stealth loop where player velocity and environmental positioning directly impact NPC detection thresholds.",
      },
    ],
    focus:         ['Systems Design', 'AI Perception', 'Technical Design'],
    mainImageSlug: 'picture/splinter-cell-prototype/main.png',
    trailerID:     'P28pe9pNZCQ',
    gallery: [
      { slug: 'picture/splinter-cell-prototype/gallery-Shadow_Map.png',           title: 'Shadow Map',
        desc: "Debug view of the lit (yellow) and shadowed (blue) areas. It lets me read the level the way the AI does: every blue zone is a hiding spot, every yellow one is exposure." },
      { slug: 'picture/splinter-cell-prototype/gallery-light-sensor.png',         title: 'Light Sensor',
        desc: "The light sensor is a capture camera pointed at a small proxy mesh that follows the player. The mesh receives the same light as the player, so its brightness tells the game how visible the player is." },
      { slug: 'picture/splinter-cell-prototype/gallery-Seencomponet2d.png',         title: 'Scene Capture 2D',
        desc: "The Scene Capture 2D renders the proxy mesh into a small render target (T_LightSensor). Because this is a real render, it picks up every light in the scene, including static and dynamic lights and Niagara VFX. A line trace towards each light would miss many of them." },
      { slug: 'picture/splinter-cell-prototype/gallery-light-sensor-blueprint.png', title: 'Light Sensor Blueprint',
        desc: "Every tick, three pixels of the render target are read from different faces of the mesh. Their red values are added together and multiplied by a tuning value. Three samples instead of one keep a single shaded face from distorting the result. The final value goes to the HUD through an interface (BPI Sensor) and becomes the player's current visibility, which the AI uses for detection." },
    ],
    featured: true,
    homeFeatured: false, /* Retiré de l'accueil (reste sur la page Works) */
  },
  {
    id:            'tikivolcano',
    name:          'TikiVolcano',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2026',
    shortDesc:     'Prototyping a modular level-selection hub from scratch',
    intro:         "For this project I took full ownership of the development lifecycle, from system architecture to implementation. My focus was on creating a modular and scalable level-select hub inspired by classic platformers, centred on three core technical pillars:",
    bullets: [
      {
        title: 'Spline-Based Modular Hub',
        text:  "Engineered a spline-driven path system in Unreal that allows for rapid iteration, significantly streamlining the hub creation workflow.",
      },
      {
        title: 'State Persistence & Management',
        text:  "Utilised the GameInstance to handle cross-level state persistence, ensuring player progress is accurately tracked, saved, and recalled between sessions.",
      },
      {
        title: 'Progression Gatekeeping',
        text:  "Developed a robust validation system that enforces strict level-locking logic. Implemented a 'first-time completion' verification check, preventing unauthorised access to locked content and ensuring progression rewards are only triggered upon the initial clear.",
      },
    ],
    focus:         ['Technical Design', 'Progression', 'Level Tools'],
    mainImageSlug: 'picture/tikivolcano/main.png',
    trailerID:     'gVtPi6dOryk',
    gallery: [
      { slug: 'picture/tikivolcano/gallery-selection-preview-in-game.png',       title: 'Selection Preview (In Game)',
        desc: "When the player lands on a level pad, the level name appears and a burst of VFX confirms the selection, so the player always knows where they are on the hub." },
      { slug: 'picture/tikivolcano/gallery-selection-preview-in-editor.png',     title: 'Selection Preview (In Editor)',
        desc: "The level pads are placed along a spline. Moving one point reshapes the whole path, so the hub layout can be changed in seconds without touching any code." },
      { slug: 'picture/tikivolcano/gallery-bleuprint-selection-de-niveau.png',   title: 'Blueprint – Level Selection',
        desc: "The Next and Previous inputs add or subtract 1 from the current level index, clamped between 0 and the unlock index stored in the Game Instance, so the player can never reach a locked level. The new pad's arrow gives the target location and the spline gives the rotation at that point. The character then moves there, the level name UI updates and the camera blends to the new view." },
      { slug: 'picture/tikivolcano/gallery-bleuprint-GameInstance.png',          title: 'Blueprint – Game Instance',
        desc: "The Game Instance survives level loads, so it holds the player's progress. When a level is finished, its name is checked against the list of completed levels. Only if it is NOT already there does the unlock index go up and the name get added, so replaying a level never unlocks an extra one. The Game Instance also stores the last selected level, so the player comes back on the right pad." },
    ],
    featured: true,
    homeFeatured: true,
    homeFeaturedOrder: 3, /* ← 3ème carte sur l'accueil */
  },
  {
    id:            'night-city',
    name:          'Night City',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2025',
    shortDesc:     'Prototyping fast-paced platformers',
    intro:         "Inspired by the fluid momentum of Mirror's Edge and Ghostrunner, I developed a high-speed movement prototype focused on kinetic feedback and precise player control. My work centred on creating a seamless synergy between player velocity and visual immersion :",
    bullets: [
      {
        title: 'Kinetic Feedback & Velocity Visualisation',
        text:  "Engineered a dynamic VFX suite to simulate high-speed movement. Developed a system that scales speed lines, a tunnel-vision shader, and radial blur intensity in real-time based on the player's current velocity, creating an instinctive sense of acceleration.",
      },
      {
        title: 'Advanced Momentum-Based 3C',
        text:  "Designed a responsive movement set including wall jumping and a velocity-aware slide system. The slide logic performs real-time velocity checks to transition the character into a crouched state, allowing players to maintain momentum while navigating tight spaces.",
      },
      {
        title: 'Technical Platforming Logic',
        text:  "Implemented a variable jump system where jump height is determined by input duration, alongside a bunny-hopping mechanic. Focused on the mathematical tuning of gravity and air control to ensure the platforming felt rewarding for skilled players.",
      },
    ],
    focus:         ['3C', 'Game Feel', 'Movement', 'VFX'],
    mainImageSlug: 'picture/night-city/main.png',
    trailerID:     't_TlF8FDUsU',
    gallery: [
      { slug: 'picture/night-city/gallery-run-1.jpg',          title: 'Gameplay – Run 1',
        desc: "Wall run at full speed. Speed lines, radial blur and tunnel vision scale with velocity, so the player feels the acceleration without reading a single number." },
      { slug: 'picture/night-city/gallery-run-2.jpg',          title: 'Gameplay – Run 2',
        desc: "Grey-box layout with bright openings as targets. The light pulls the eye towards the next line, so the player keeps their flow at high speed." },
      { slug: 'picture/night-city/gallery-BP-Jump-input-1.jpg', title: 'Jump Mechanics Blueprint – Part 1',
        desc: "Holding jump while grounded starts a charge: Jump Z Velocity rises towards a maximum and the camera dips slightly to sell the crouch. On release the character jumps and Max Walk Speed gets a bonus, clamped to a cap. That bonus is the core of the bunny hop: every chained jump adds speed." },
      { slug: 'picture/night-city/gallery-BP-Jump-input-2.jpg', title: 'Jump Mechanics Blueprint – Part 2',
        desc: "The charge loop: while charging, Jump Z Velocity grows in small steps every 0.02 s, the UI gauge fills and a light camera shake builds tension. After the jump, a 1.5 s retriggerable delay resets the walk speed to 900. Jumping again before it ends restarts the timer and keeps the bonus, and that window is what rewards good timing." },
    ],
    featured: false,
    homeFeatured: false,
  },
  {
    id:            'evil-house',
    name:          'Evil House',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2025',
    shortDesc:     'Prototyping logic-driven 3D object inspection & spatial puzzles',
    intro:         "For this prototype I wanted to recreate the iconic interaction and inspection system from the Resident Evil series. My goal was to turn 3D object manipulation into a fluid and intuitive puzzle mechanic:",
    bullets: [
      {
        title: '360° Multi-Input Inspection',
        text:  "Engineered a comprehensive inspection system allowing players to rotate items across all axes. Ensured full compatibility between mouse/keyboard and controller, providing smooth and responsive feedback that keeps the object at the heart of the player experience.",
      },
      {
        title: 'Tolerance-Based Puzzle Logic',
        text:  "Developed a validation logic that compares player rotation against a target reference. Implemented a 5-degree tolerance threshold that automatically triggers the win-state and snaps the object to the correct angle once reached.",
      },
      {
        title: 'Editor-to-Game Workflow',
        text:  "Established an efficient Blueprint workflow using an editor-only 'target object' to define solutions. This system translates standard light shadows into functional gameplay keys, streamlining the design iteration process for various spatial puzzles.",
      },
    ],
    focus:         ['Puzzle Design', 'Interaction', 'Technical Design'],
    mainImageSlug: 'picture/evil-house/main.png',
    trailerID:     '19qvPKIn0f0',
    gallery: [
      { slug: 'picture/evil-house/gallery-mouvement-inpute.jpg',        title: 'Movement Input',
        desc: "The look input (mouse or right stick) is split into X and Y and applied as roll and pitch to the inspected object, so the same code works on both devices. When the player lets go, a win check runs." },
      { slug: 'picture/evil-house/gallery-animation-blueprint.png',    title: 'Animation Blueprint',
        desc: "Once the solution is found, a timeline lerps the object from where the player left it to the exact correct angle. The snap confirms the success visually, then the reward is given and the puzzle is marked as solved." },
      { slug: 'picture/evil-house/gallery-camera-blueprint.png',       title: 'Camera Blueprint',
        desc: "The win check compares the up vector of the inspected object with that of an editor-only reference. If their dot product is ≥ 0.95, the two are almost aligned and the puzzle is solved. Comparing vectors instead of rotation values avoids false negatives, since two rotations can look identical while having different numbers." },
      { slug: 'picture/evil-house/gallery-camera-world-blueprint.png', title: 'Camera – World Blueprint',
        desc: "The puzzle in context: the TV shows the shadow the bottle has to cast. The player rotates the object until its silhouette matches, which turns a simple shadow into a gameplay key." },
      { slug: 'picture/evil-house/gallery-camera-world-phone.png',     title: 'Camera – World Phone',
        desc: "During inspection everything around goes dark and a warm light isolates the object, keeping the player's attention on what they hold." },
      { slug: 'picture/evil-house/gallery-camera-world-wine.png',      title: 'Camera – World Wine',
        desc: "A single pool of light in the dark tells the player what can be picked up, with no UI needed." },
    ],
    featured: false,
    homeFeatured: false,
  },
  {
    id:            'slime-defender',
    name:          'Slime Defender',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2026',
    shortDesc:     'Free-to-play tower defense on Roblox, solo and PvP. Solo project (design and development).',
    intro:         "Free-to-play tower defense on Roblox with a solo progression loop and a 1v1 PvP mode (ranked and unranked). I design and develop it alone.",
    bullets: [
      {
        title: 'Wave design & difficulty',
        text:  "All waves are defined in Google Sheets, per difficulty mode (Noob, Normal, Expert, Infinite). Each wave is a list of enemy groups (Basic, Fast, Tank, Armored, Cursed, MiniBoss, Boss) with configurable parameters: count, spawn interval, delay, and sequencing options (sequential, after, pause).",
      },
      {
        title: 'Wave Editor (built with AI)',
        text:  "To produce and test waves faster, I had Claude generate an in-game wave editor. Each enemy group is edited field by field without touching code, a timeline shows when every enemy spawns, and a wave written in the spreadsheet (in Lua table format) can be pasted in and tested right away.",
      },
      {
        title: 'Progression & retention',
        text:  "XP and gold rewards are modeled per wave and per difficulty in Google Sheets to extend player lifetime. Solo loop: farm a currency that unlocks cosmetics. Cosmetics and emotes stay visible in PvP as status markers. Three leaderboards target three player profiles.",
      },
      {
        title: 'Monetization (in progress)',
        text:  "A first price grid is drafted but not yet in the game: VIP at 400 Robux, x4 player speed at 40 Robux, x4 wave speed at 64 Robux and emotes at 8 Robux. A price benchmark across Roblox games of all genres, tower defense included, is under way. First observations: offers cluster at very low prices (entry items at a few Robux), then jump straight to 10 to 15 euro packs, often time-limited, with almost nothing in between. My rules: in PvP, only cosmetics and emotes are sold, never power. In solo, paid options save time on short sessions, but everything stays reachable for free.",
      },
    ],
    wip:           true,
    focus:         ['Game Design', 'Economy', 'Monetization'],
    engineName:    'Roblox Studio',
    engineLogo:    'picture/Roblox_Studio_2025_Logo.png',
    mainImageSlug: 'picture/slime-defender/main.jpg',
    trailerID:     null,
    noTrailer:     true, /* Fichiers du jeu perdus : pas de vidéo, section trailer cachée */
    gallery: [
      { slug: 'picture/slime-defender/gallery-wave-table.jpg', title: 'Waves – Spreadsheet',
        intent: "Every wave of every difficulty in one sheet, readable and tunable at a glance.",
        desc: "Each cell is one wave: a list of enemy groups with their count, spawn interval and delay. The sequential, after and pause options chain the groups, so a wave can build pressure in steps instead of sending everything at once. Noob ends at wave 10, Normal at wave 20, and Expert keeps going with MiniBoss and Boss waves.",
        alt: "Google Sheets table with waves 1 to 21 in rows and the Noob, Normal and Expert difficulties in columns. Each cell lists the enemy groups of the wave with their count, interval and delay." },
      { slug: 'picture/slime-defender/gallery-wave-editor-timeline.jpg', title: 'Wave Editor – Timeline',
        intent: "See when every enemy spawns before playing the wave.",
        desc: "Each enemy group is a line in the editor, and the timeline draws one bar per group. Here a Tank group, then Armored after a 5 second delay, then Cursed that only starts once the previous group is done. The last spawn lands at 46 seconds, so the length of a wave is read at a glance. A wave written in the spreadsheet can be pasted in as text and tested right away.",
        alt: "Wave editor panel with three enemy groups (Tank, Armored, Cursed, 15 each), an import field for a wave written as text, and a timeline with three horizontal bars showing when each group spawns, last spawn at 46 seconds." },
      { slug: 'picture/slime-defender/gallery-xp-gold-per-wave.png', title: 'Progression – XP & Gold per Wave',
        intent: "Every wave pays out XP and gold, and the hardest mode pays the most.",
        desc: "For each wave: its sequence of enemies, the total enemy count, an end-of-wave gold bonus that grows by 10 every wave, then the XP and kill gold earned in each difficulty. The hardest mode (named Giga Chad in this sheet) gives 1.5 times the XP of Normal. After wave 20 it continues with bonus waves that replay waves 1 to 12 scaled up by 0.12 each time, so its rewards keep climbing for players who stay.",
        alt: "Spreadsheet listing waves 1 to 32 with, for each one, a description of the enemy sequence, the total number of enemies, the end-of-wave gold bonus, and the XP and kill gold earned in the Noob, Normal and Giga Chad difficulties." },
      { slug: 'picture/slime-defender/gallery-price-grid.png', title: 'Monetization – Price Grid', wip: true,
        intent: "A first price grid built on time savers and cosmetics.",
        desc: "Draft prices, not yet in the game. The two x4 speed options save time in solo sessions, and emotes are cosmetic only, so nothing on sale changes the outcome of a PvP match.",
        alt: "Spreadsheet table with two columns, Name and Robux / Euro: VIP 400 Robux, x4 Speed Player 40 Robux, x4 Speed Wave 64 Robux, Emote 8 Robux." },
      { slug: 'picture/slime-defender/gallery-shop-emotes.jpg', title: 'Shop – Emotes',
        intent: "Emotes sold for premium tickets: status in PvP, never power.",
        desc: "The Cosmetics tab of the premium shop holds profile backgrounds, borders, backdrops, text styles and emotes. Emotes cost 200 to 350 tickets. They are visible in PvP, so they give status without changing the balance of a match.",
        alt: "Premium shop window on the Cosmetics tab, Emotes section: a grid of emotes such as T-Pose, Happy, Dizzy, Monkey and BB Dance, each with a price between 200 and 350 tickets." },
      { more: true, slug: 'picture/slime-defender/gallery-solo-hud.jpg', title: 'Solo – In-Game HUD',
        intent: "Level, XP and currencies always in view, every menu one click away.",
        desc: "The XP bar and player level sit at the top centre, next to lives and the currencies, so progress is visible during every wave. Shop, Duel, Levels, daily reward and Profile are grouped on the left, which keeps short sessions fast.",
        alt: "Roblox avatar standing on a grass map. At the top, lives, currencies and an XP bar showing level 11. On the left, menu buttons such as Shop, Duel and Profile. At the bottom right, a Next Wave button." },
      { more: true, slug: 'picture/slime-defender/gallery-pvp-ranked.png', title: 'PvP – Ranked Match',
        intent: "Before a ranked duel, both players face each other with their rank.",
        desc: "The versus screen shows each player's avatar, name and current rank, here Noob 4 for both. It is the moment where what a player has earned is shown to the opponent.",
        alt: "Versus screen with two Roblox avatars on either side of a red VS, their usernames below, and the rank Noob 4 under each one." },
    ],
    featured: false,
    homeFeatured: true,
    homeFeaturedOrder: 2, /* ← 2ème carte sur l'accueil */
  },
  /* ════════════════════════════════════════════════
     SCHOOL — Projets scolaires (ARTFX)
  ════════════════════════════════════════════════ */
  {
    id:            'fk-this-job',
    name:          'F**K This Job',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2025-2026',
    shortDesc:     'Graduation Project',
    intro:         "A project that places nervous gameplay and visual clarity at the heart of every design decision, with DOOM 2016 as a reference.",
    bullets: [
      {
        title: 'Game Design & 3C',
        text:  "My work revolved around a single core goal : crafting an <strong>immediate, reactive and visceral feeling</strong>, on par with the intensity of modern FPS games.<ul><li><strong>Weapon Positioning</strong> : Drawing on a Techland GDC talk (Dying Light) and the principles of the <strong>Golden Ratio</strong>, I optimized the weapon placement on screen. The result : <strong>precise visual balance, zero clipping</strong>, and a strong weapon presence without ever obstructing the player's field of view.</li><li><strong>Game Feel & Impact</strong> : I integrated and calibrated <strong>camera shakes</strong> specific to each type of action, to add weight to interactions and amplify combat readability.</li></ul>",
      },
      {
        title: 'Level Design & Pacing',
        text:  "I designed the game space to be both <strong>immediately readable and rhythmically efficient</strong>, following the conventions of arena combat.<ul><li><strong>Tension Curve</strong> : I orchestrated enemy spawns and health resource distribution to build a <strong>controlled tension</strong>, alternating between intense pressure and breathing room, keeping the player in a constant state of engagement.</li><li><strong>Spatial Readability</strong> : Every space was designed to <strong>communicate its purpose at a glance</strong> (arena, transition zone, narrative room), ensuring fluid action and intuitive navigation.</li><li><strong>DOOM 2016 Metrics</strong> : The level architecture is built on <strong>precise metrics drawn directly from DOOM 2016 analysis</strong>, ensuring full consistency between player movement and environment dimensions.</li></ul>",
      },
      {
        title: 'QA & Polish',
        text:  "Particular attention was given to <strong>polish</strong>, both on a technical and documentary level.<ul><li><strong>In-Game Cinematics</strong> : I designed and integrated all cinematic sequences, ensuring a <strong>seamless transition between gameplay and narrative</strong>.</li><li><strong>QA & Debug</strong> : I maintained <strong>rigorous debug documentation</strong> throughout development, allowing me to stabilize the experience and refine the details that make the difference in the final build.</li></ul>",
      },
    ],
    focus:         ['Level Design', '3C', 'Game Feel', 'Pacing', 'Cinematics'],
    mainImageSlug: 'picture/fk-this-job/main.png',
    /* Bande-annonce officielle (fiche Steam, "Launch trailer"), lue en HLS.
       Ancienne vidéo YouTube (soluce d'une autre chaîne) : 'l_fxtcFOdt4' */
    trailerHls:    'https://video.akamai.steamstatic.com/store_trailers/4822520/188980123/18ac96b6c341d87bb9336bff31037a8a41ed3010/1782900863/hls_264_master.m3u8',
    trailerPoster: 'picture/fk-this-job/main.png',
    itchURL:       'https://artfx-school.itch.io/fuck-this-job',
    steamURL:      'https://store.steampowered.com/app/4822520/Fuck_This_Job/',
    galleryThumbs: true, /* Vignettes WebP légères dans picture/fk-this-job/thumbs/ (false = images d'origine) */
    gallery: [
      /* ── GALERIE PRINCIPALE ─────────────────────────────────────────── */
      /* — a. Plan d'ensemble — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD_Overview.png', title: 'Level Design – Overview',
        intent: "Every level on one page: golden path, enemies and resources.",
        desc: "Top-down maps of the five levels with the golden path, start and end points, turrets, drones, breakers and healing points (vending machines, water dispensers).",
        alt: "Top-down maps of the five levels of F**K This Job, annotated with the golden path, start and end points, turrets, drones, breakers and healing points.",
        legend: [
          { c: '#ff2a2a', s: 'line', t: 'Golden path' },
          { c: '#2ee62e', s: 'dot',  t: 'Start' },
          { c: '#1f3dff', s: 'dot',  t: 'End' },
          { c: '#ff2bff', s: 'pent', t: 'Turret' },
          { c: '#2ee62e', s: 'pent', t: 'Drone' },
          { c: '#2ee62e', s: 'bar',  t: 'Vending machine (heal)' },
          { c: '#19e6ff', s: 'tri',  t: 'Water dispenser (heal)' },
          { c: '#ffe81a', s: 'dot',  t: 'Breaker' },
        ] },

      /* — b. Lab : intention → blockout → final → capture — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD3_Intention.png', title: 'Lab – Intention Map',
        intent: "Every room gets a purpose and a reference before the first wall.",
        desc: "Intention map for the Lab: reception, research centre, call centre, “Wall Street” trading floor, tank room. Each room's role and visual references are set before blockout.",
        alt: "Top-down intention map of the Lab with labelled rooms (reception, research centre, call centre, Wall Street trading floor, tank room) and reference photos." },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD3_Blockout.png', title: 'Lab – Blockout v0.1',
        intent: "Walls and doors only: flow and room sizes tested before any art.",
        desc: "First blockout of the Lab. Layout, circulation and room sizes are tested in grey-box, so they can change cheaply before art goes in.",
        alt: "Grey-box blockout of the Lab seen from above: white walls, doors and placeholder desks." },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD_Labo.jpg', title: 'Lab – Final',
        intent: "Each zone has its own lighting colour, so the player always knows where they are.",
        desc: "Final version of the Lab, built from the intention map and the blockout: green tank room, warm reception, blue research centre, teal call centre.",
        alt: "Top-down view of the finished Lab level, each room lit in a different colour: green, orange, blue and teal." },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Arena_Lab.png', title: 'Lab – Arena',
        intent: "A central lane, cover on the sides, a landmark at the far end.",
        desc: "A symmetrical arena: desks on both sides give cover, and the MEGAZON logo at the end keeps the player oriented during combat.",
        alt: "In-game view of the Lab arena: a long central aisle between rows of desks, stock-market screens on the walls and the MEGAZON logo at the far end." },

      /* — c. Autres niveaux, dans l'ordre du jeu — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD_Tuto.png', title: 'Tutorial – Top View',
        intent: "One mechanic per space: kick, then vacuum, then the first enemy.",
        desc: "The kick is taught first (yellow), then suction, vacuum shooting and the objects that react to it (green), and finally the first enemy (pink). Each skill is learned in a safe space before it is needed under pressure.",
        alt: "Top-down map of the tutorial level: a corridor with a red golden path and three framed zones in yellow, green and pink.",
        legend: [
          { c: '#ff2a2a', s: 'line', t: 'Golden path' },
          { c: '#ffe81a', s: 'box',  t: 'Learn the kick' },
          { c: '#2ee62e', s: 'box',  t: 'Learn suction, vacuum shot and reactive objects' },
          { c: '#ff2bff', s: 'box',  t: 'First enemy' },
        ] },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Tuto_Shoot.png', title: 'Tutorial – Shoot',
        intent: "The controls are taught by the world itself, not by a pop-up.",
        desc: "A poster on the wall explains the shoot input, keeping the tutorial inside the world and in the game's tone of humour.",
        alt: "Small office room with a comic-style poster explaining the shoot button, next to a door, a plant and cleaning supplies." },

      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD1_Open_Space.png', title: 'Open Space – Top View',
        intent: "The exit is visible from the first room but out of reach: the goal is set.",
        desc: "From the start, the player already sees the exit and what it looks like, then loops around the level to reach it. Turrets and patrolling drones pace the route, and the cyan zone marks a shift in atmosphere where the player starts to realise the company is hiding something dark.",
        alt: "Top-down map of the Open Space level: a red golden path loops from a blue start square to a yellow exit square, with green dots for enemies and a cyan frame on one room.",
        legend: [
          { c: '#ff2a2a', s: 'line',   t: 'Golden path' },
          { c: '#1f3dff', s: 'square', t: 'Start' },
          { c: '#ffe81a', s: 'square', t: 'Exit' },
          { c: '#33e633', s: 'dot',    t: 'Turret' },
          { c: '#16805a', s: 'dot',    t: 'Drone' },
          { c: '#f2f2f2', s: 'line',   t: 'Drone patrol' },
          { c: '#19e6ff', s: 'box',    t: 'Atmosphere shift' },
        ] },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Work_Space_Open_Space.png', title: 'Open Space – Work Space',
        intent: "The yellow floor line draws the route before the first step.",
        desc: "Cubicles on one side, a clear path on the other: the player reads where to go at a glance.",
        alt: "In-game view of a warm-lit open-plan office: cubicles on the left, an open lane on the right with a yellow line painted on the carpet." },

      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD_Dark_Office.jpg', title: 'Dark Office – Top View',
        intent: "Employees reduced to work tools: the space tells Megazon's story before any dialogue.",
        desc: "Playtests showed some players getting lost; coloured guide lines on the floor, like those in hospitals, point them the way. Short on time to dress every room, I ranked the rooms by priority and cut the least essential ones.",
        alt: "Top-down map of the Dark Office level: dim rooms crowded with desks and paper, a red golden path, blue and green floor guide lines and white loops.",
        legend: [
          { c: '#ff2a2a', s: 'line', t: 'Golden path' },
          { c: '#2f6bff', s: 'line', t: 'Floor guide line' },
          { c: '#2ee62e', s: 'line', t: 'Floor guide line' },
          { c: '#f2f2f2', s: 'loop', t: 'Drone patrol' },
        ] },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Arena_Dark_Open_Space.png', title: 'Dark Office – Arena',
        intent: "Cover on one side, open floor on the other, guide lines to the exit.",
        desc: "Desks piled with paper give cover on the left, the open floor on the right leaves room to dodge, and the red and blue floor lines lead to the exit mid-fight.",
        alt: "In-game view of a dark open-plan office arena: desks buried in paper and coffee cups on the left, an open floor with red and blue lines and a statue of the boss on the right." },

      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD_Boss.png', title: 'CEO – Top View',
        intent: "A rising tension in a straight line, all the way to the CEO.",
        desc: "No detours, no choices: a single red carpet leads to the throne. Each room is wider than the last and the statues lining the path all point forward, so the space grows more imposing with every step.",
        alt: "Top-down map of the CEO level: three rooms of increasing size along a straight red carpet, lined with statues, ending at the CEO's desk.",
        legend: [
          { c: '#ff2a2a', s: 'line', t: 'Golden path (red carpet)' },
        ] },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Hallway_CEO.png', title: 'CEO – Hallway',
        intent: "Every statue points to the door: anticipation builds before the boss.",
        desc: "Everything turns red and the perspective converges on the door at the end of the hall.",
        alt: "In-game view of a long red hallway lined with bookshelves and muscular statues pointing towards a door at the far end." },

      /* — d. Preuves 3C et Game Feel — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Weapon_Positioning.jpg', title: '3C – Weapon Positioning',
        intent: "A strong weapon presence that never blocks the player's view.",
        desc: "Placement based on a Techland (Dying Light) GDC talk and the Golden Ratio: the weapon sits in the lower right of the screen, big and readable, while the centre and the crosshair stay clear.",
        alt: "First-person view of a corridor with the blue vacuum-gun weapon in the lower right of the screen and a clear crosshair in the centre." },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Feedback_For_Player.jpg', title: 'Game Feel – Feedback',
        intent: "One vibration per weapon state, felt without reading the HUD.",
        desc: "Force Feedback for each state of the vacuum gun (light suck, medium/heavy suck, full, empty, shoot) plus a kick camera shake.",
        alt: "Unreal Engine content browser showing six Force Feedback effects for the vacuum gun and a kick camera shake asset." },

      /* — e. Cinématique — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Sequencer_CEO.jpg', title: 'Cinematic – CEO Death',
        intent: "Camera cuts, VFX and audio locked to the same frame.",
        desc: "The CEO's death in Sequencer: three camera cuts (office, big screen, close-up), the Niagara explosion and the audio event share one timeline, so image, effect and sound land together.",
        alt: "Unreal Engine Sequencer timeline with three camera cuts, an audio track and an explosion VFX track, above a frame of the CEO exploding in a comic-style blast." },

      /* ── "VOIR PLUS" (more: true) — repliées sous la galerie principale ── */
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_LD_Tuto_Iterations.jpg', title: 'Tutorial – Iterations',
        intent: "Five versions of the tutorial layout, side by side.",
        alt: "Five top-down versions of the tutorial layout side by side, each a long corridor with branching rooms." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Gameplay_1.png', title: 'Gameplay – Combat',
        intent: "Comic-book effects and a combo score reward every kill.",
        alt: "First-person combat in an orange-lit office: a pink BOOM comic effect, a POP effect and a combo score in the top right." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Gameplay_2.png', title: 'Gameplay – Empty Gauge',
        intent: "The ammo state is read on the weapon, not in the HUD.",
        alt: "First-person view of a green SPLASH effect, with the vacuum gun's gauge showing EMPTY." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Start_Open_Space.png', title: 'Open Space – Start',
        intent: "A warm, calm start before the chaos.",
        alt: "Warm-lit office entrance with a giant M-shaped doorway, plants and a yellow line on the carpet." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Start_Office_Open_Space.png', title: 'Open Space – Side Office',
        intent: "Cameras on the walls: the workplace is watching.",
        alt: "Small office with cubicle partitions, old computers, a wall camera and a caution sign." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Storage_Open_Space.png', title: 'Open Space – Storage',
        intent: "Statues of the boss judge the player from both sides.",
        alt: "Storage room with two large statues of the boss pointing at the player, piles of files and a small drone." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Office_Dark_Open_Space.png', title: 'Dark Office – Desks',
        intent: "“Help me please”: employees buried under their work.",
        alt: "Rows of desks buried under paper and coffee cups, one screen reading HELP ME PLEASE, cameras on the walls." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Puzzle_Dark_Open_Space.png', title: 'Dark Office – Puzzle',
        intent: "A cyan highlight makes the interactive object read at a glance.",
        alt: "Cluttered storage room with a filing cabinet highlighted in cyan." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Reception_Lab.png', title: 'Lab – Reception',
        intent: "Cold blue light and the MEGAZON logo: a new zone, a new tone.",
        alt: "Blue-lit lab reception with a long desk of white machines, shelves of flasks and a glowing MEGAZON logo." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Control_Room_Lab.png', title: 'Lab – Control Room',
        intent: "The central screen pulls the eye to the end of the room.",
        alt: "Teal control room with world-map screens on both sides and a large MEGAZON screen at the far end." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_TankRoom_Lab.png', title: 'Lab – Tank Room',
        intent: "Saturated green and narrow lanes: a more oppressive zone.",
        alt: "Green-lit room full of glowing tanks and pipes, with narrow lanes between machines and screens at the end." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Office_CEO.png', title: 'CEO – Office',
        intent: "Stairs and statues frame the throne as the focal point.",
        alt: "Red CEO office with a symmetrical staircase, two giant statues and a throne under a wall of screens." },
      { more: true, slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Server_Room_CEO.png', title: 'CEO – Server Room',
        intent: "The final choice: two big buttons that read instantly.",
        alt: "Red server room with two large buttons labelled DISABLE AI and CHEESE EMERGENCY, and a hamster wheel between them." },
    ],
    featured: false,
    homeFeatured: true,
    homeFeaturedOrder: 1, /* ← 1ère carte sur l'accueil (le projet le plus abouti) */
  },
  {
    id:            'heart-of-darkness',
    name:          'Heart of Darkness Remake',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2024',
    shortDesc:     '3-Week Team Project: Game, 3C and Level Designer',
    intro:         "For this remake I focused on translating a 2D cinematic classic into a modern 3D experience. My goal was to preserve the original intent of Eric Chahi while modernising the gameplay flow through three core pillars:",
    bullets: [
      {
        title: '3D Character & 3C Adaptation',
        text:  "Re-engineered the original 2D movement logic into a functional 3D system. Adapted the character's weight and agility to ensure the controls felt modern while staying faithful to the deliberate, cinematic feel of the source material.",
      },
      {
        title: 'Progression & GPE Design',
        text:  "Authored a series of Gameplay Elements (GPEs) to introduce mechanical variety. Designed a rhythmic difficulty curve where environmental challenges and enemy encounters scale in complexity as the player progresses.",
      },
      {
        title: 'Cinematic Guidance & Level Flow',
        text:  "Directed in-game cinematics that serve as environmental signposting. Each sequence was crafted to clarify player objectives and orient the player within the 3D space, maintaining the seamless immersion of the original game.",
      },
    ],
    focus:         ['3C', 'Level Design', 'GPE Design', 'Cinematics'],
    mainImageSlug: 'picture/heart-of-darkness/main.png',
    trailerID:     '-CHgOl1frsc',
    itchURL:       'https://artfx-school.itch.io/heart-of-darkness-remake',
    gallery: [
      { slug: 'picture/heart-of-darkness/Gallery_Bones_Render.png',          title: 'Bones Render',
        desc: "A skeleton in the foreground and birds circling overhead set a hostile mood before any enemy shows up." },
      { slug: 'picture/heart-of-darkness/Gallery_EndTreeOutside_Render.png', title: 'End Tree – Outside',
        desc: "Framed by the foliage, the giant tree shows the player the goal of the level from far away." },
      { slug: 'picture/heart-of-darkness/Gallery_Tuto_Render.png',           title: 'Tutorial Level Render',
        desc: "A closed clearing with clear ground gives the player a safe space to learn the controls before the danger starts." },
      { slug: 'picture/heart-of-darkness/Gallery_EndTreeInside_Render.png',  title: 'End Tree – Inside',
        desc: "The glowing flower and the fireflies draw the eye to the end of the level and mark it as a reward." },
    ],
    featured: false,
    homeFeatured: false,
  },
  {
    id:            'workshop-jetpack',
    name:          'Exercise Jetpack',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2025',
    shortDesc:     '1-Week Team Exercise as Game Designer / Level Designer',
    intro:         "During this week-long collaboration, I served as the bridge between design and code. My goal was to create a highly responsive jetpack system by defining clear technical requirements for the programming team while ensuring a polished player experience:",
    bullets: [
      {
        title: '3C Design',
        text:  "Engineered the Character, Controls, and Camera by providing programmers with precise logic and variables. Focused on iterative tuning to ensure the input-to-action loop felt fluid and immediate.",
      },
      {
        title: 'Systems Architecture & Tuning',
        text:  "Designed the jetpack's propulsion physics and fuel mechanics. Collaborated closely with programmers to implement custom parameters for thrust, gravity, and drag to achieve the perfect \"game feel.\"",
      },
      {
        title: 'Onboarding & Level Design',
        text:  "Authored level segments specifically designed to teach the player the jetpack's mechanics and limitations. Mapped out obstacle patterns that gradually introduce complexity as the player masters the controls.",
      },
      {
        title: 'Visual Feedback & UI/UX',
        text:  "Managed the complete feedback loop, including dynamic VFX and a visual fuel gauge. Ensured that every system change (fuel depletion, thrust activation) was clearly communicated through intuitive visual cues.",
      },
    ],
    focus:         ['3C', 'Systems Tuning', 'Onboarding', 'UI/UX'],
    mainImageSlug: 'picture/workshop-jetpack/main.png',
    trailerID:     'W9RousB5hsQ',
    gallery: [
      { slug: 'picture/workshop-jetpack/gallery-ingame-1.png',   title: 'In-Game 1',
        desc: "Lanterns light the safe path between the spikes, and the gauge at the top left shows the jetpack's remaining fuel at all times." },
      { slug: 'picture/workshop-jetpack/gallery-ingame-2.png',   title: 'In-Game 2',
        desc: "A trail of coins in the air shows the player where to fly and teaches the jetpack's reach without a single word." },
      { slug: 'picture/workshop-jetpack/gallery-ingame-3.png',   title: 'In-Game 3',
        desc: "Giant glowing pumpkins and lanterns frame the end of the level like a stage, rewarding the player for arriving." },
      { slug: 'picture/workshop-jetpack/gallery-checkpoint.png', title: 'Checkpoint',
        desc: "A burst of stars confirms the checkpoint, so the player knows their progress is safe and can take risks again." },
    ],
    featured: false,
    homeFeatured: false,
  },
  {
    id:            'workshop-enviro-storytelling',
    name:          'Exercise Enviro Storytelling',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2025',
    shortDesc:     '1-Week Team Exercise as Game Designer / Level Designer',
    intro:         "I designed an immersive horror experience where the player explores an abandoned factory through the lens of a live stream. My goal was to merge industrial realism with a claustrophobic 'Found Footage' aesthetic, centred on three technical pillars:",
    bullets: [
      {
        title: 'Blueprint-Driven Level Design',
        text:  "Engineered a realistic industrial environment inspired by authentic historical brewery floor plans. Implemented a modular sub-level system in Unreal Engine to optimise the technical workflow and ensure a clean, scalable project structure for the art team.",
      },
      {
        title: 'Kinetic 3C & Motor Latency',
        text:  "Developed a custom camera system to simulate the 'Found Footage' look. Engineered a unique kinetic effect simulating motor latency to mimic the physical weight of the head, intentionally slowing response times to heighten player stress and vulnerability.",
      },
      {
        title: 'Atmospheric Environmental Storytelling',
        text:  "Focused on transforming a derelict space into a threatening narrative tool. By combining authentic architectural layouts with calculated lighting and camera feedback, I created a high-tension atmosphere that bridges the gap between reality and nightmare.",
      },
    ],
    focus:         ['Level Design', 'Environmental Storytelling', '3C'],
    mainImageSlug: 'picture/workshop-enviro-storytelling/main.png',
    trailerID:     'MKBPMPc3r18',
    gallery: [
      { slug: 'picture/workshop-enviro-storytelling/gallery-inside-1.jpg', title: 'Inside 1',
        desc: "The LIVE indicator and viewer counter put the player in a streamer's shoes, and the tight framing hides what is behind the vats." },
      { slug: 'picture/workshop-enviro-storytelling/gallery-inside-2.jpg', title: 'Inside 2',
        desc: "Peeling walls and an old advertising poster tell the factory's story without a single line of text." },
      { slug: 'picture/workshop-enviro-storytelling/gallery-inside-3.jpg', title: 'Inside 3',
        desc: "Daylight through the broken roof gives a short moment of relief between dark sections, which makes the next one feel even heavier." },
    ],
    featured: false,
    homeFeatured: false,
  },
];

/* ─── Fonctions utilitaires ──────────────────────────────────────────────────
   Ces fonctions sont appelées par app.js pour récupérer les données.
   Tu n'as normalement pas besoin de les modifier.
   ─────────────────────────────────────────────────────────────────────────── */

/* Retourne un projet par son id (ou null si pas trouvé) */
function getProjectById(id) {
  return PROJECTS.find(p => p.id === id) || null;
}

/* Ordre d'affichage des catégories dans la grille Works
   1 = affiché en premier, 2 = deuxième, etc.
   ← MODIFIABLE : change les chiffres pour changer l'ordre des sections */
const CATEGORY_ORDER = { personal: 1, school: 2, gamejam: 3 };

/* Retourne les projets filtrés par catégorie, triés par catégorie puis par année (desc) */
function getProjectsByCategory(cat) {
  /* 'all' ou vide = tous les projets ; sinon filtre par catégorie */
  const list = (!cat || cat === 'all') ? [...PROJECTS] : PROJECTS.filter(p => p.category === cat);
  return list.sort((a, b) => {
    const catDiff = (CATEGORY_ORDER[a.category] || 9) - (CATEGORY_ORDER[b.category] || 9);
    if (catDiff !== 0) return catDiff;
    return Number(b.year) - Number(a.year); /* Plus récent en premier dans chaque catégorie */
  });
}

/* Retourne uniquement les projets affichés sur l'accueil, triés par homeFeaturedOrder */
function getHomeFeatured() {
  return PROJECTS.filter(p => p.homeFeatured)
                 .sort((a, b) => (a.homeFeaturedOrder || 99) - (b.homeFeaturedOrder || 99));
}

/* ─── Constructeurs d'URL d'images ───────────────────────────────────────────
   Ces fonctions renvoient directement le slug (chemin relatif de l'image).
   Elles existent pour permettre de centraliser la logique d'URL plus tard
   (par exemple ajouter un CDN ou un sous-domaine d'images).
   ─────────────────────────────────────────────────────────────────────────── */
function cardImageUrl(slug)     { return slug || null; } /* Image de la carte */
function bannerImageUrl(slug)   { return slug || null; } /* Image de la bannière de page projet */
function galleryImageUrl(slug)  { return slug || null; } /* Image dans le carrousel */
function lightboxImageUrl(slug) { return slug || null; } /* Image en plein écran (lightbox) */

/* Vignette légère d'une image de galerie.
   Si le projet a galleryThumbs: true → picture/<projet>/thumbs/<nom>.webp
   (générées à partir des originaux, l'original reste utilisé en plein écran).
   Sinon → l'image d'origine. */
function galleryThumbUrl(project, slug) {
  if (!project || !project.galleryThumbs || !slug) return galleryImageUrl(slug);
  const i = slug.lastIndexOf('/');
  const name = slug.slice(i + 1).replace(/\.[^.]+$/, '');
  return `${slug.slice(0, i)}/thumbs/${name}.webp`;
}

/* Construit l'URL d'embed YouTube avec les paramètres appropriés
   - rel=0          : n'affiche pas les vidéos recommandées en fin
   - color=white    : barre de progression blanche
   - autoplay=1     : démarre automatiquement (muet par défaut si requis)
   - loop=1         : boucle infinie
   - playlist=id    : nécessaire pour que loop=1 fonctionne sur YouTube */
function youtubeEmbedUrl(id, start) {
  /* playsinline=1 : sur iPhone, lit la vidéo dans la page au lieu de forcer le plein écran */
  return `https://www.youtube.com/embed/${id}?rel=0&color=white&autoplay=1&mute=1&loop=1&playsinline=1&playlist=${id}${start ? `&start=${start}` : ''}`;
}
