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

     gallery:       Tableau d'images pour le carrousel de la page projet
                    → Chaque image : { slug: 'chemin/vers/image.png', title: 'Légende' }
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
    mainImageSlug: 'picture/mask-snatchers/main.png',
    trailerID:     'hBTu7WFeQU0',
    ggjURL:        'https://globalgamejam.org/games/2026/mask-snatchers-5',
    gallery: [
      { slug: 'picture/mask-snatchers/gallery-Animation de course du joueur.png', title: 'Animation de course du joueur' },
      { slug: 'picture/mask-snatchers/gallery-Shared player camera.png',          title: 'Shared Player Camera' },
      { slug: 'picture/mask-snatchers/gallery-Shared player camera Bleuprint.png', title: 'Shared Player Camera Blueprint' },
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
    mainImageSlug: 'picture/siamese-cowboy-cat-saloon/main.png',
    trailerID:     'j9lCIWWBivQ',
    ggjURL:        'https://globalgamejam.org/games/2024/siamese-siamese-cowboy-cat-saloon-7',
    gallery: [
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-feedback_liste.png',      title: 'Feedback – Liste' },
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-animation-blueprint.png', title: 'Player Animation Blueprint' },
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-player-blueprint.png',    title: 'Player Blueprint' },
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
    mainImageSlug: 'picture/splinter-cell-prototype/main.png',
    trailerID:     'P28pe9pNZCQ',
    gallery: [
      { slug: 'picture/splinter-cell-prototype/gallery-Shadow_Map.png',           title: 'Shadow Map' },
      { slug: 'picture/splinter-cell-prototype/gallery-light-sensor.png',         title: 'Light Sensor' },
      { slug: 'picture/splinter-cell-prototype/gallery-Seencomponet2d.png',         title: 'Scene Capture 2D' },
      { slug: 'picture/splinter-cell-prototype/gallery-light-sensor-blueprint.png', title: 'Light Sensor Blueprint' },
    ],
    featured: true,
    homeFeatured: true,
    homeFeaturedOrder: 2, /* ← 2ème carte sur l'accueil */
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
    mainImageSlug: 'picture/tikivolcano/main.png',
    trailerID:     'gVtPi6dOryk',
    gallery: [
      { slug: 'picture/tikivolcano/gallery-selection-preview-in-game.png',       title: 'Selection Preview (In Game)' },
      { slug: 'picture/tikivolcano/gallery-selection-preview-in-editor.png',     title: 'Selection Preview (In Editor)' },
      { slug: 'picture/tikivolcano/gallery-bleuprint-selection-de-niveau.png',   title: 'Blueprint – Level Selection' },
      { slug: 'picture/tikivolcano/gallery-bleuprint-GameInstance.png',          title: 'Blueprint – Game Instance' },
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
    mainImageSlug: 'picture/night-city/main.png',
    trailerID:     't_TlF8FDUsU',
    gallery: [
      { slug: 'picture/night-city/gallery-run-1.jpg',          title: 'Gameplay – Run 1' },
      { slug: 'picture/night-city/gallery-run-2.jpg',          title: 'Gameplay – Run 2' },
      { slug: 'picture/night-city/gallery-BP-Jump-input-1.jpg', title: 'Jump Mechanics Blueprint – Part 1' },
      { slug: 'picture/night-city/gallery-BP-Jump-input-2.jpg', title: 'Jump Mechanics Blueprint – Part 2' },
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
    mainImageSlug: 'picture/evil-house/main.png',
    trailerID:     '19qvPKIn0f0',
    gallery: [
      { slug: 'picture/evil-house/gallery-mouvement-inpute.jpg',        title: 'Movement Input' },
      { slug: 'picture/evil-house/gallery-animation-blueprint.png',    title: 'Animation Blueprint' },
      { slug: 'picture/evil-house/gallery-camera-blueprint.png',       title: 'Camera Blueprint' },
      { slug: 'picture/evil-house/gallery-camera-world-blueprint.png', title: 'Camera – World Blueprint' },
      { slug: 'picture/evil-house/gallery-camera-world-phone.png',     title: 'Camera – World Phone' },
      { slug: 'picture/evil-house/gallery-camera-world-wine.png',      title: 'Camera – World Wine' },
    ],
    featured: false,
    homeFeatured: false,
  },

  /* ════════════════════════════════════════════════
     SCHOOL — Projets scolaires (ARTFX)
  ════════════════════════════════════════════════ */
  {
    id:            'fk-this-job',
    name:          'F**K This Job',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2026',
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
    mainImageSlug: 'picture/fk-this-job/main.png',
    trailerID:     'mSV1teYZh-c',
    itchURL:       'placeholder',
    steamURL:      'placeholder',
    gallery: [
      /* — Autre — */
      { slug: 'picture/fk-this-job/Gallery-FeedBack For Player.jpg',                      title: 'Feedback For Player' },
      { slug: 'picture/fk-this-job/Gallery-Weapon Positioning.jpg',                       title: 'Weapon Positioning' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Gamplay_1.png',                  title: 'Gameplay 1' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Gamplay_2.png',                  title: 'Gameplay 2' },
      /* — Tuto — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Tuto_Shoot.png',                 title: 'Tutorial – Shoot' },
      /* — Open Space — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Start_Open_Space.png',           title: 'Start – Open Space' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Start_Office_Open_Space.png',    title: 'Start – Office Open Space' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Work_Space_Open_Space.png',      title: 'Work Space – Open Space' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Storage_Open_Space.png',         title: 'Storage – Open Space' },
      /* — Dark Open Space — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Office_Dark_Open_Space.png',     title: 'Office – Dark Open Space' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Arena_Dark_Open_Space.png',      title: 'Arena – Dark Open Space' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Puzzle_Dark_Open_Space.png',     title: 'Puzzle – Dark Open Space' },
      /* — Lab — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Reception_Lab.png',              title: 'Reception – Lab' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Arena_Lab.png.png',              title: 'Arena – Lab' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Control_Room_Lab.png.png',       title: 'Control Room – Lab' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_TankRoom_Lab.png.png',           title: 'Tank Room – Lab' },
      /* — CEO — */
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Hallway_CEO.png',                title: 'Hallway – CEO' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Office_CEO.png',                 title: 'Office – CEO' },
      { slug: 'picture/fk-this-job/Gallery-Fuck_This_Job_Serveur_Room_CEO.png',           title: 'Server Room – CEO' },
    ],
    featured: false,
    homeFeatured: true,
    homeFeaturedOrder: 1, /* ← 1ère carte sur l'accueil (le projet de diplôme en avant) */
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
    mainImageSlug: 'picture/heart-of-darkness/main.png',
    trailerID:     '-CHgOl1frsc',
    itchURL:       'https://artfx-school.itch.io/heart-of-darkness-remake',
    gallery: [
      { slug: 'picture/heart-of-darkness/Gallery_Bones_Render.png',          title: 'Bones Render' },
      { slug: 'picture/heart-of-darkness/Gallery_EndTreeOutside_Render.png', title: 'End Tree – Outside' },
      { slug: 'picture/heart-of-darkness/Gallery_Tuto_Render.png',           title: 'Tutorial Level Render' },
      { slug: 'picture/heart-of-darkness/Gallery_EndTreeInside_Render.png',  title: 'End Tree – Inside' },
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
    mainImageSlug: 'picture/workshop-jetpack/main.png',
    trailerID:     'W9RousB5hsQ',
    gallery: [
      { slug: 'picture/workshop-jetpack/gallery-ingame-1.png',   title: 'In-Game 1' },
      { slug: 'picture/workshop-jetpack/gallery-ingame-2.png',   title: 'In-Game 2' },
      { slug: 'picture/workshop-jetpack/gallery-ingame-3.png',   title: 'In-Game 3' },
      { slug: 'picture/workshop-jetpack/gallery-checkpoint.png', title: 'Checkpoint' },
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
    mainImageSlug: 'picture/workshop-enviro-storytelling/main.png',
    trailerID:     'MKBPMPc3r18',
    gallery: [
      { slug: 'picture/workshop-enviro-storytelling/gallery-inside-1.jpg', title: 'Inside 1' },
      { slug: 'picture/workshop-enviro-storytelling/gallery-inside-2.jpg', title: 'Inside 2' },
      { slug: 'picture/workshop-enviro-storytelling/gallery-inside-3.jpg', title: 'Inside 3' },
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

/* Construit l'URL d'embed YouTube avec les paramètres appropriés
   - rel=0          : n'affiche pas les vidéos recommandées en fin
   - color=white    : barre de progression blanche
   - autoplay=1     : démarre automatiquement (muet par défaut si requis)
   - loop=1         : boucle infinie
   - playlist=id    : nécessaire pour que loop=1 fonctionne sur YouTube */
function youtubeEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?rel=0&color=white&autoplay=1&mute=1&loop=1&playlist=${id}`;
}
