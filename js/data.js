/* ─────────────────────────────────────────────────────────────────────────────
   data.js  –  All portfolio project data
   Images are stored locally in /picture/<project-id>/
───────────────────────────────────────────────────────────────────────────── */

/* ─── Project Data ────────────────────────────────────────────────────────── */
const PROJECTS = [

  /* ════════════════════════════════════════════════
     GAME JAM
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
    gallery: [
      { slug: 'picture/mask-snatchers/gallery-animation-blueprint.png', title: "Animation Blueprint – player's run" },
      { slug: 'picture/mask-snatchers/gallery-camera-blueprint.png',    title: 'Shared player camera Blueprint' },
      { slug: 'picture/mask-snatchers/gallery-camera-world.png',        title: 'Shared player camera – world space' },
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
    gallery: [
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-feedback-drunk-slap.png', title: 'Feedback – Drunk and Slap' },
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-player-viewport.png',     title: 'Player Viewport' },
      { slug: 'picture/siamese-cowboy-cat-saloon/gallery-animation-blueprint.png', title: 'Player Animation Blueprint' },
    ],
    featured: false,
    homeFeatured: false,
  },

  /* ════════════════════════════════════════════════
     PERSONAL PROJECTS
  ════════════════════════════════════════════════ */
  {
    id:            'splinter-cell-prototype',
    name:          'Splinter Cell : Prototype',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2026',
    shortDesc:     'Prototyping luminance-driven detection and systemic stealth mechanics',
    intro:         "The objective of this prototype was to engineer a systemic stealth framework where player visibility is calculated in real-time based on global illumination (Direct, Emissive, and VFX):",
    bullets: [
      {
        title: 'Real-Time Luminance Extraction',
        text:  "Engineered a visibility detection system using a SceneCaptureComponent2D parented to a proxy mesh above the player. By sampling the Render Target data, I extracted raw luminance values to calculate a precise exposure float, which is the core variable for the player's detection state.",
      },
      {
        title: 'Unified Light Feedback (Direct, Emissive & VFX)',
        text:  "Unlike standard distance-based light checks, this method captures all light sources within the engine, including Static/Dynamic lights, Emissive materials, and Niagara VFX. This ensures consistent behaviour in complex environments where traditional line-trace methods would fail to detect ambient or particle-based lighting.",
      },
      {
        title: 'Multi-Modal AI Perception',
        text:  "Integrated the luminance data with an acoustic movement system. These variables (Light + Sound) are fed into the AI Perception Component, creating a high-stakes stealth loop where player velocity and environmental positioning directly impact NPC detection thresholds.",
      },
    ],
    mainImageSlug: 'picture/splinter-cell-prototype/main.png',
    trailerID:     '-CHgOl1frsc',
    gallery:       [],
    featured: true,
    homeFeatured: true,
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
    trailerID:     '-CHgOl1frsc',
    gallery: [
      { slug: 'picture/tikivolcano/gallery-hub-overview.png',          title: 'Hub Overview' },
      { slug: 'picture/tikivolcano/gallery-level-select.png',          title: 'Level Select' },
      { slug: 'picture/tikivolcano/gallery-spline-system.png',         title: 'Spline System' },
      { slug: 'picture/tikivolcano/gallery-blueprint-progression-1.png', title: 'Blueprint – Progression 1' },
      { slug: 'picture/tikivolcano/gallery-blueprint-progression-2.png', title: 'Blueprint – Progression 2' },
      { slug: 'picture/tikivolcano/gallery-blueprint-progression-3.png', title: 'Blueprint – Progression 3' },
    ],
    featured: true,
    homeFeatured: true,
  },
  {
    id:            'night-city',
    name:          'Night City',
    category:      'personal',
    categoryLabel: 'Personal Project',
    year:          '2025',
    shortDesc:     'Prototyping fast-paced platformers',
    intro:         "Inspired by the fluid momentum of Mirror's Edge and Ghostrunner, I developed a high-speed movement prototype focused on kinetic feedback and precise player control. My work centred on creating a seamless synergy between player velocity and visual immersion:",
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
     SCHOOL PROJECTS
  ════════════════════════════════════════════════ */
  {
    id:            'fk-this-job',
    name:          'F**K This Job',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2026',
    shortDesc:     'Graduation Project (In Progress)',
    intro:         "A satirical office environment merging corporate architecture with DOOM-inspired gameplay. This is my graduation project at ARTFX, currently in active development.",
    bullets: [
      {
        title: 'Work In Progress',
        text:  "Full case study will be published upon completion. Stay tuned.",
      },
    ],
    mainImageSlug: 'picture/fk-this-job/main.png',
    trailerID:     null,
    gallery: [
      { slug: 'picture/fk-this-job/gallery-concept-art.png', title: 'Concept Art' },
    ],
    featured: false,
    homeFeatured: true,
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
    name:          'WorkShop Jetpack',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2025',
    shortDesc:     '1-Week Team Workshop as Game Designer / Level Designer',
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
      { slug: 'picture/workshop-jetpack/gallery-gameplay-1.png', title: 'Gameplay 1' },
      { slug: 'picture/workshop-jetpack/gallery-gameplay-2.png', title: 'Gameplay 2' },
      { slug: 'picture/workshop-jetpack/gallery-gameplay-3.png', title: 'Gameplay 3' },
      { slug: 'picture/workshop-jetpack/gallery-gameplay-4.png', title: 'Gameplay 4' },
    ],
    featured: false,
    homeFeatured: false,
  },
  {
    id:            'workshop-enviro-storytelling',
    name:          'WorkShop Enviro Storytelling',
    category:      'school',
    categoryLabel: 'School Project',
    year:          '2025',
    shortDesc:     '1-Week Team Workshop as Game Designer / Level Designer',
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
      { slug: 'picture/workshop-enviro-storytelling/gallery-scene-1.jpg', title: 'Scene 1' },
      { slug: 'picture/workshop-enviro-storytelling/gallery-scene-2.jpg', title: 'Scene 2' },
      { slug: 'picture/workshop-enviro-storytelling/gallery-scene-3.jpg', title: 'Scene 3' },
      { slug: 'picture/workshop-enviro-storytelling/gallery-scene-4.jpg', title: 'Scene 4' },
    ],
    featured: false,
    homeFeatured: false,
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function getProjectById(id) {
  return PROJECTS.find(p => p.id === id) || null;
}

function getProjectsByCategory(cat) {
  if (!cat || cat === 'all')
    return [...PROJECTS].sort((a, b) => Number(b.year) - Number(a.year));
  return PROJECTS.filter(p => p.category === cat);
}

function getHomeFeatured() {
  return PROJECTS.filter(p => p.homeFeatured);
}

function cardImageUrl(slug)     { return slug || null; }
function bannerImageUrl(slug)   { return slug || null; }
function galleryImageUrl(slug)  { return slug || null; }
function lightboxImageUrl(slug) { return slug || null; }

function youtubeEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?rel=0&color=white&autoplay=1&mute=1&loop=1&playlist=${id}`;
}
