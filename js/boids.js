/* ─── Simulation de Boids — Page About ───────────────────────────────────────
   Les "Boids" sont des agents autonomes qui simulent le comportement d'un banc
   de poissons ou d'un vol d'oiseaux. Chaque boid suit 3 règles simples :
     1. Séparation  : évite ses voisins trop proches
     2. Alignement  : se dirige dans la même direction que ses voisins
     3. Cohésion    : se rapproche du centre de masse du groupe

   Ce fichier n'est chargé que sur about.html (il cherche #boidsCanvas).

   PARAMÈTRES FACILEMENT MODIFIABLES :
   - COUNT  : nombre de boids (ligne ~93)  → plus = plus dense, moins = plus rapide
   - PERC   : rayon de perception (ligne ~35) → plus grand = ils se regroupent mieux
   - SEP_R  : distance de séparation (ligne ~36) → plus grand = ils s'écartent plus
   - MAX    : vitesse maximale (ligne ~64) → augmente pour les rendre plus rapides
   - MIN    : vitesse minimale (ligne ~64) → augmente pour empêcher les boids de s'arrêter
   - fillStyle dans draw() → changer la couleur/opacité des boids
   ─────────────────────────────────────────────────────────────────────────── */
(function initBoids() {
  /* Récupère le canvas HTML — si absent (autre page), la fonction s'arrête */
  const canvas = document.getElementById('boidsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d'); /* Contexte de dessin 2D */

  let W, H;                          /* Largeur et hauteur du canvas (mises à jour au resize) */
  const mouse = { x: -9999, y: -9999 }; /* Position de la souris (hors écran par défaut) */
  let rafId;                         /* ID de la frame d'animation (pour l'annuler si besoin) */

  /* Adapte la taille du canvas à la fenêtre — appelé au chargement et au resize */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  /* Suit la position de la souris pour que les boids la fuient */
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  /* Quand la souris sort de l'écran : remet les coordonnées hors-champ (désactive la fuite) */
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  /* ─── Classe Boid : représente un seul agent ───────────────────────────── */
  class Boid {
    constructor() {
      /* Position initiale aléatoire dans le canvas */
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;

      /* Direction et vitesse initiales aléatoires */
      const a   = Math.random() * Math.PI * 2; /* Angle aléatoire (0 à 360°) */
      const spd = 1.1 + Math.random() * 1.2;   /* Vitesse initiale ← MODIFIABLE (ex: 0.8 à 2.5) */
      this.vx   = Math.cos(a) * spd;            /* Composante X de la vélocité */
      this.vy   = Math.sin(a) * spd;            /* Composante Y de la vélocité */

      /* Taille (rayon) du boid ← MODIFIABLE (ex: 3 + random*4 pour des boids plus grands) */
      this.size = 5 + Math.random() * 2.5;
    }

    /* Met à jour la position et la vélocité du boid à chaque frame */
    update(all) {
      /* ── Constantes de perception ──────────────────────────────────────── */
      const PERC  = 90;  /* Rayon de vision : boids dans ce rayon = "voisins" ← MODIFIABLE */
      const SEP_R = 28;  /* Distance de séparation : en dessous → fuite ← MODIFIABLE */

      /* Accumulateurs pour les 3 règles (s=séparation, a=alignement, c=cohésion) */
      let sx = 0, sy = 0, sc = 0; /* Force et compte de séparation */
      let ax = 0, ay = 0, ac = 0; /* Force et compte d'alignement */
      let cx = 0, cy = 0, cc = 0; /* Centre et compte de cohésion */

      /* ── Parcours de tous les autres boids ───────────────────────────── */
      for (const o of all) {
        if (o === this) continue;            /* Ignore lui-même */
        const dx = o.x - this.x;
        const dy = o.y - this.y;
        const d  = Math.sqrt(dx * dx + dy * dy); /* Distance euclidienne */
        if (d > PERC) continue;              /* Hors de portée, ignoré */

        /* Cohésion : mémorise la position du voisin pour trouver le centre */
        cx += o.x; cy += o.y; cc++;

        /* Alignement : mémorise la direction du voisin */
        ax += o.vx; ay += o.vy; ac++;

        /* Séparation : si trop proche, calcule une force de répulsion */
        if (d < SEP_R && d > 0) {
          /* La force est inversement proportionnelle à la distance : plus proche = plus forte */
          sx -= dx / d;
          sy -= dy / d;
          sc++;
        }
      }

      /* ── Application des 3 règles ─────────────────────────────────────── */

      /* Règle 1 : Séparation — s'éloigne des voisins trop proches
         0.13 = force de séparation ← MODIFIABLE (0 = désactivé, 0.5 = très fort) */
      if (sc > 0) { this.vx += sx / sc * 0.13; this.vy += sy / sc * 0.13; }

      /* Règle 2 : Alignement — s'aligne sur la direction moyenne des voisins
         0.05 = force d'alignement ← MODIFIABLE (0.15 = très fort, les boids volent tous ensemble) */
      if (ac > 0) { this.vx += (ax / ac - this.vx) * 0.05; this.vy += (ay / ac - this.vy) * 0.05; }

      /* Règle 3 : Cohésion — se rapproche du centre du groupe
         0.004 = force de cohésion ← MODIFIABLE (0.01 = groupe serré, 0 = pas de regroupement) */
      if (cc > 0) { this.vx += (cx / cc - this.x) * 0.004; this.vy += (cy / cc - this.y) * 0.004; }

      /* ── Fuite de la souris ───────────────────────────────────────────── */
      const mdx = this.x - mouse.x;
      const mdy = this.y - mouse.y;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 110 && md > 0) { /* 110 = rayon d'influence de la souris ← MODIFIABLE */
        /* Force proportionnelle à la proximité (1 = contact, 0 = bord du rayon) */
        const f = (1 - md / 110) * 0.6; /* 0.6 = intensité de la fuite ← MODIFIABLE */
        this.vx += mdx / md * f;
        this.vy += mdy / md * f;
      }

      /* ── Limite de vitesse ────────────────────────────────────────────── */
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const MAX = 2.6; /* Vitesse maximale (pixels/frame) ← MODIFIABLE */
      const MIN = 0.9; /* Vitesse minimale — empêche les boids de s'arrêter ← MODIFIABLE */
      if (spd > MAX) { this.vx = this.vx / spd * MAX; this.vy = this.vy / spd * MAX; }
      if (spd < MIN && spd > 0) { this.vx = this.vx / spd * MIN; this.vy = this.vy / spd * MIN; }

      /* ── Déplacement ──────────────────────────────────────────────────── */
      this.x += this.vx;
      this.y += this.vy;

      /* ── Wrap-around des bords (téléportation bord-à-bord) ───────────── */
      /* M = marge invisible hors-écran avant téléportation (évite un clignotement) */
      const M = 48; /* ← MODIFIABLE */
      if (this.x < -M)     this.x = W + M;  /* Sort à gauche → réapparaît à droite */
      if (this.x > W + M)  this.x = -M;     /* Sort à droite → réapparaît à gauche */
      if (this.y < -M)     this.y = H + M;  /* Sort en haut → réapparaît en bas */
      if (this.y > H + M)  this.y = -M;     /* Sort en bas → réapparaît en haut */
    }

    /* Dessine le boid sous forme de flèche triangulaire pointant dans sa direction */
    draw() {
      /* Calcule l'angle de la vélocité pour orienter le triangle */
      const angle = Math.atan2(this.vy, this.vx);
      ctx.save();
      ctx.translate(this.x, this.y); /* Déplace l'origine au centre du boid */
      ctx.rotate(angle);             /* Tourne le canvas dans la direction du mouvement */

      /* Dessine un triangle pointu (pointe vers la droite, symétrique) */
      ctx.beginPath();
      ctx.moveTo(this.size,         0);                 /* Pointe avant */
      ctx.lineTo(-this.size * 0.6,  this.size * 0.4);  /* Coin arrière gauche */
      ctx.lineTo(-this.size * 0.35, 0);                 /* Encoche centrale (queue) */
      ctx.lineTo(-this.size * 0.6, -this.size * 0.4);  /* Coin arrière droit */
      ctx.closePath();

      /* Couleur de remplissage des boids ← MODIFIABLE
         rgba(255, 255, 255, 0.13) = blanc à 13% d'opacité (très discret)
         Pour les rendre plus visibles : augmente la dernière valeur (ex: 0.25)
         Pour les colorer : remplace 255,255,255 par ex: 220,140,70 (orange) */
      ctx.fillStyle = 'rgba(255,255,255,0.13)';
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Création de la population de boids ──────────────────────────────────
     COUNT = nombre de boids ← MODIFIABLE
     Plus de boids = effet plus dense mais plus lourd pour le CPU
     Valeurs suggérées : 40 (léger) à 120 (dense) */
  const COUNT = 72;
  const boids = Array.from({ length: COUNT }, () => new Boid());

  /* ── Boucle d'animation principale ───────────────────────────────────────
     requestAnimationFrame appelle loop() ~60 fois par seconde */
  function loop() {
    ctx.clearRect(0, 0, W, H); /* Efface le canvas entier */

    /* Mise à jour de chaque boid (calcul physique) */
    for (const b of boids) b.update(boids);

    /* Dessin de chaque boid (rendu graphique)
       Séparé du update pour garantir que tous les boids sont calculés avant d'en dessiner un */
    for (const b of boids) b.draw();

    /* Planifie la prochaine frame */
    rafId = requestAnimationFrame(loop);
  }

  /* ── Pause quand l'onglet n'est pas visible (économise les ressources) ── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId); /* Arrête l'animation */
    else rafId = requestAnimationFrame(loop);          /* Reprend l'animation */
  });

  /* Lance la boucle d'animation */
  rafId = requestAnimationFrame(loop);
})();
