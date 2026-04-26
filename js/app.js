/* ─────────────────────────────────────────────────────────────────────────────
   app.js  –  Logique partagée de tout le site

   STRUCTURE DE CE FICHIER (dans l'ordre) :
   1. initNav()          → Navigation : lien actif + menu mobile hamburger
   2. initHeroBgVideo()  → Vidéo de fond du Hero (fondu + boucle sans clignotement)
   3. initReveal()       → Apparition au scroll des éléments .reveal
   4. buildCard()        → Construit le HTML d'une carte de projet
   5. renderFeatured()   → Affiche les projets en vedette sur l'accueil
   6. renderWorks()      → Affiche + filtre les projets sur la page Works
   7. renderProject()    → Construit la page de détail d'un projet
   8. Lightbox           → Visionneuse d'image plein écran
   9. Utilitaires        → setText(), initAnimBg(), initLazyVideo()
   10. initReel()        → Vidéo Demo Reel (hover + modal plein écran)
   11. initDownloadBtns()→ Animation du bouton de téléchargement CV
   12. DOMContentLoaded  → Point d'entrée : appelle toutes les fonctions ci-dessus
   ───────────────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────────────
   1. NAVIGATION — Lien actif et menu mobile
   ─────────────────────────────────────────────────────────────────────────────
   - Surligne automatiquement le lien correspondant à la page en cours
   - Sur about.html : bascule entre "About" et "CV" selon la position du scroll
   - Gère l'ouverture/fermeture du menu hamburger sur mobile
   ───────────────────────────────────────────────────────────────────────────── */
(function initNav() {
  /* ── Normalisation de l'URL ───────────────────────────────────────────────
     Sur un serveur de production, l'URL peut être /works (sans .html)
     alors que les hrefs dans le HTML sont "works.html".
     On normalise tout en retirant .html pour comparer correctement.
     Exemples :
       Local      : pathname = '/works.html' → rawPage = 'works.html' → page = 'works'
       Production : pathname = '/works'      → rawPage = 'works'      → page = 'works'
       Accueil    : pathname = '/'           → rawPage = ''           → page = 'index'
     ─────────────────────────────────────────────────────────────────────── */
  const rawPage = location.pathname.split('/').pop() || 'index.html';
  const page    = rawPage.replace(/\.html$/, '') || 'index'; /* Retire .html */
  const hash    = location.hash;                             /* Ex: '#cv' */
  const links   = document.querySelectorAll('.nav-links a');
  const toggle  = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  /* Normalise un href : retire .html pour la comparaison
     'works.html' → 'works'  |  'about.html#cv' → 'about#cv' */
  function norm(href) {
    return href.replace(/\.html(?=#|$)/, '');
  }

  /* Active visuellement le lien dont le href normalisé correspond à 'target' */
  function setActive(target) {
    links.forEach(a => a.classList.toggle('active', norm(a.getAttribute('href')) === target));
  }

  /* Détermine quel lien activer au chargement de la page */
  const fullMatch = page + hash; /* Ex: 'about#cv' ou 'works' */
  const hasHashLink = [...links].some(a => norm(a.getAttribute('href')) === fullMatch);
  if (hasHashLink) {
    setActive(fullMatch);
  } else {
    links.forEach(a => {
      if (norm(a.getAttribute('href')) === page) {
        a.classList.add('active');
      }
    });
  }

  /* ── Sur about.html : change l'actif entre "About" et "CV" au scroll ──
     Quand la section #cv atteint 45% du haut de l'écran, le lien "CV" s'active */
  const cvSection = document.getElementById('cv');
  if (cvSection && page === 'about') {
    function updateNavOnScroll() {
      const cvTop = cvSection.getBoundingClientRect().top;
      if (cvTop <= window.innerHeight * 0.45) { /* ← MODIFIABLE */
        setActive('about#cv');
      } else {
        setActive('about');
      }
    }
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
    updateNavOnScroll();
  }

  /* ── Animation de clic + scroll vers le haut si on clique sur la page en cours ── */
  links.forEach(a => {
    a.addEventListener('click', e => {
      a.classList.remove('nav-clicked');
      void a.offsetWidth;
      a.classList.add('nav-clicked');
      a.addEventListener('animationend', () => a.classList.remove('nav-clicked'), { once: true });

      const hrefNorm = norm(a.getAttribute('href'));
      /* Si la partie page (avant #) correspond à la page courante ET pas d'ancre → scroll haut */
      if (hrefNorm.split('#')[0] === page && !hrefNorm.includes('#')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', a.getAttribute('href'));
      }
    });
  });

  /* ── Menu hamburger mobile ────────────────────────────────────────────── */
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');  /* Bascule la classe .open */
      toggle.classList.toggle('open', open);          /* Anime le hamburger → ✕ */
      document.body.style.overflow = open ? 'hidden' : ''; /* Bloque le scroll quand ouvert */
    });

    /* Ferme le menu quand on clique sur un lien (navigation sur mobile) */
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();


/* ─────────────────────────────────────────────────────────────────────────────
   2. VIDÉO DE FOND DU HERO — Fondu d'apparition + boucle sans flash
   ─────────────────────────────────────────────────────────────────────────────
   - La vidéo reste invisible jusqu'à ce que le premier frame soit décodé
   - Redémarre 0.3s avant la fin pour éviter le flash de noir au changement de boucle
   MODIFIER LA VIDÉO : changer l'attribut src dans index.html (balise <source>)
   ───────────────────────────────────────────────────────────────────────────── */
(function initHeroBgVideo() {
  const video = document.getElementById('heroBgVideo');
  if (!video) return; /* La vidéo n'existe que sur index.html */
  const bg = video.closest('.hero-video-bg');

  /* Rend la vidéo visible dès que le premier frame est prêt (évite le flash blanc) */
  function reveal() { bg.classList.add('ready'); } /* .ready → opacity: 1 en CSS */
  if (video.readyState >= 3) {
    /* readyState 3 = HAVE_FUTURE_DATA : assez de données pour jouer sans saccade */
    reveal();
  } else {
    video.addEventListener('canplay', reveal, { once: true }); /* { once } = écoute une seule fois */
  }

  /* Boucle sans clignotement : on repart à t=0 quand il reste 0.3s avant la fin
     ← MODIFIABLE : augmente 0.3 si tu vois encore un flash, diminue pour une boucle plus propre */
  video.addEventListener('timeupdate', function () {
    if (this.duration && this.currentTime >= this.duration - 0.3) {
      this.currentTime = 0;
    }
  });
})();


/* ─────────────────────────────────────────────────────────────────────────────
   3. SCROLL-REVEAL — Apparition des éléments au défilement
   ─────────────────────────────────────────────────────────────────────────────
   IntersectionObserver observe les éléments .reveal et leur ajoute .visible
   quand ils entrent dans la zone visible de l'écran.
   Le CSS dans style.css gère l'animation (opacity + translateY).
   POUR AJOUTER L'ANIMATION SUR UN ÉLÉMENT : ajouter la classe "reveal" dans le HTML
   ───────────────────────────────────────────────────────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      /* Quand l'élément est visible : ajoute .visible et arrête de l'observer */
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    {
      threshold: 0.12 /* L'élément doit être visible à 12% pour déclencher l'animation
                         ← MODIFIABLE : 0 = dès qu'un pixel entre, 0.5 = à moitié visible */
    }
  );
  /* Observe tous les éléments marqués .reveal dans la page */
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();


/* ─────────────────────────────────────────────────────────────────────────────
   4. BUILD CARD — Construit le HTML d'une carte de projet
   ─────────────────────────────────────────────────────────────────────────────
   Crée un élément <a> cliquable avec l'image, le titre, la description, etc.
   POUR MODIFIER LE DESIGN DES CARTES : changer le innerHTML ci-dessous
   POUR MODIFIER LES STYLES : éditer .card dans style.css
   ───────────────────────────────────────────────────────────────────────────── */
function buildCard(project) {
  /* Récupère l'URL de l'image principale (ou null si pas d'image) */
  const imgUrl = cardImageUrl(project.mainImageSlug);

  /* Crée l'élément <a> qui enveloppe toute la carte */
  const a       = document.createElement('a');
  a.className   = 'card reveal';            /* .reveal = animation d'apparition au scroll */
  a.href        = `project.html?id=${project.id}`; /* Lien vers la page de détail */

  /* Construction du HTML interne de la carte */
  a.innerHTML = `
    <div class="card-img">
      ${imgUrl
        /* Si une image existe : balise img avec chargement différé (lazy) */
        ? `<img src="${imgUrl}" alt="${project.name}" loading="lazy">`
        /* Sinon : placeholder avec le nom du projet */
        : `<div class="card-img-placeholder"><span>${project.name}</span></div>`
      }
    </div>
    <div class="card-body">
      <!-- Label en petit : "Game Jam · 2024" -->
      <div class="card-tag">${project.categoryLabel} &nbsp;·&nbsp; ${project.year}</div>
      <!-- Nom du projet -->
      <div class="card-name">${project.name}</div>
      <!-- Description courte -->
      <div class="card-desc">${project.shortDesc}</div>
      <!-- Lien "View Project →" -->
      <span class="card-link">
        View Project
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>`;

  return a;
}


/* ─────────────────────────────────────────────────────────────────────────────
   5. RENDER FEATURED — Affiche les projets en vedette sur l'accueil
   ─────────────────────────────────────────────────────────────────────────────
   Injecte les cartes dans le div#featuredGrid (défini dans index.html).
   Les projets affichés sont ceux avec homeFeatured: true dans data.js,
   triés par homeFeaturedOrder.
   ───────────────────────────────────────────────────────────────────────────── */
function renderFeatured() {
  const wrap = document.getElementById('featuredGrid');
  if (!wrap) return; /* N'existe que sur index.html */

  /* Récupère les projets en vedette (filtrés et triés dans data.js) */
  getHomeFeatured().forEach(p => wrap.appendChild(buildCard(p)));

  /* Re-déclenche le scroll-reveal pour les nouvelles cartes injectées dynamiquement
     (le premier initReveal() au chargement ne voit pas les éléments créés après) */
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    io.observe(el);
  });
}


/* ─────────────────────────────────────────────────────────────────────────────
   6. RENDER WORKS — Affiche et filtre les projets sur la page Works
   ─────────────────────────────────────────────────────────────────────────────
   - Affiche tous les projets par défaut
   - Les boutons de filtre (All / Personal / School / Game Jam) rechargent la grille
   - Chaque carte apparaît avec un décalage en cascade (stagger effect)
   ───────────────────────────────────────────────────────────────────────────── */
function renderWorks() {
  const grid = document.getElementById('worksGrid'); /* Grille de projets */
  const btns = document.querySelectorAll('.filter-btn'); /* Boutons de filtre */
  if (!grid) return; /* N'existe que sur works.html */

  /* Vide la grille et la re-remplit avec les projets de la catégorie 'cat' */
  function render(cat) {
    grid.innerHTML = ''; /* Vide la grille */
    const list = getProjectsByCategory(cat); /* Récupère les projets filtrés */

    if (list.length === 0) {
      grid.innerHTML = '<p style="color:var(--muted);padding:32px 0;grid-column:1/-1">No projects in this category.</p>';
      return;
    }

    list.forEach((p, i) => {
      const card = buildCard(p);

      /* Sur la page Works on n'utilise pas le scroll-reveal : on gère l'animation manuellement
         avec un décalage (stagger) en cascade basé sur l'index 'i' */
      card.classList.add('visible'); /* .visible supprime le opacity:0 du .reveal */
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      /* Chaque carte commence 60ms après la précédente ← MODIFIABLE */
      card.style.transition = `opacity 0.45s ease ${i * 60}ms, transform 0.45s ease ${i * 60}ms`;
      grid.appendChild(card);

      /* Double requestAnimationFrame = garantit que le navigateur a rendu l'état initial
         avant de déclencher l'animation (sinon le départ serait sauté) */
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.style.opacity  = '1';
        card.style.transform = 'translateY(0)';
      }));
    });
  }

  /* Titres affichés selon la catégorie active
     ← MODIFIABLE : change le texte entre les guillemets */
  const TITLES = {
    all:      'All <span>Projects</span>',
    personal: 'Personal <span>Projects</span>',
    gamejam:  'Game Jam <span>Projects</span>',
    school:   'School <span>Projects</span>',
  };

  const pageTitle = document.getElementById('worksPageTitle');

  render('all'); /* Affichage initial : tous les projets */

  /* ── Gestion des clics sur les boutons de filtre ───────────────────────── */
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Retire l'état actif de tous les boutons */
      btns.forEach(b => b.classList.remove('active'));
      /* Active le bouton cliqué */
      btn.classList.add('active');

      /* Micro-animation au clic (classe retirée après 150ms) */
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 150);

      /* data-cat est l'attribut HTML du bouton, ex: data-cat="personal" */
      const cat = btn.dataset.cat;
      render(cat);

      /* Anime le titre de la page (fade out → nouveau titre → fade in) */
      if (pageTitle) {
        pageTitle.classList.remove('title-in');
        pageTitle.classList.add('title-out'); /* Disparaît */
        setTimeout(() => {
          pageTitle.innerHTML = TITLES[cat] || TITLES.all;
          pageTitle.classList.remove('title-out');
          pageTitle.classList.add('title-in'); /* Réapparaît avec le nouveau titre */
        }, 180); /* 180ms = durée de l'animation titleOut ← MODIFIABLE */
      }
    });
  });
}


/* ─────────────────────────────────────────────────────────────────────────────
   7. RENDER PROJECT — Construit la page de détail d'un projet
   ─────────────────────────────────────────────────────────────────────────────
   - Lit l'ID du projet dans l'URL (project.html?id=nom-du-projet)
   - Récupère les données depuis data.js et remplit tous les éléments HTML
   - Gère : bannière, titre, sidebar, navigation Précédent/Suivant,
             description + bullets, trailer YouTube, galerie filmstrip
   POUR MODIFIER LA MISE EN PAGE : éditer project.html et les classes .project-* dans style.css
   ───────────────────────────────────────────────────────────────────────────── */
function renderProject() {
  /* Cette fonction ne tourne que sur project.html (vérifie la présence d'un élément clé) */
  if (!document.getElementById('projectTitle')) return;

  /* Lit le paramètre "id" dans l'URL */
  const params  = new URLSearchParams(location.search);
  const id      = params.get('id');
  const project = id ? getProjectById(id) : null;

  /* ── Page d'erreur si le projet n'existe pas ──────────────────────────── */
  if (!project) {
    document.body.innerHTML = `
      <nav style="display:flex;align-items:center;padding:0 56px;height:64px;border-bottom:1px solid rgba(255,255,255,0.08);background:#0f0f0f">
        <a href="index.html" style="font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase">THOMAS ABATE</a>
      </nav>
      <div style="padding:160px 56px;text-align:center">
        <p style="font-size:13px;color:#777;letter-spacing:.1em;text-transform:uppercase">Project not found</p>
        <a href="works.html" style="display:inline-block;margin-top:32px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;border:1px solid rgba(255,255,255,.2);padding:14px 36px;transition:.3s" onmouseenter="this.style.background='#f0f0f0';this.style.color='#111'" onmouseleave="this.style.background='';this.style.color=''">Back to Works</a>
      </div>`;
    return;
  }

  /* ── Met à jour le titre de l'onglet du navigateur ───────────────────── */
  document.title = `${project.name} — Thomas Abate`;

  /* ── Bannière image ───────────────────────────────────────────────────── */
  const bannerEl = document.getElementById('projectBanner');
  if (bannerEl) {
    const imgUrl = bannerImageUrl(project.mainImageSlug);
    if (imgUrl) {
      bannerEl.querySelector('img').src = imgUrl;
      bannerEl.querySelector('img').alt = project.name;
    } else {
      /* Pas d'image → fond uni + cache l'<img> */
      bannerEl.style.background = 'var(--bg-2)';
      bannerEl.querySelector('img').style.display = 'none';
    }
  }

  /* ── Textes principaux (tag, titre, sous-titre) ───────────────────────── */
  setText('projectTag',      `${project.categoryLabel} · ${project.year}`);
  setText('projectTitle',    project.name);
  setText('projectSubtitle', project.shortDesc);

  /* ── Sidebar (informations rapides) ──────────────────────────────────── */
  setText('sideCategory', project.categoryLabel);
  setText('sideYear',     project.year);

  /* ── Navigation Précédent / Suivant ──────────────────────────────────── */
  const allProjects = getProjectsByCategory('all'); /* Liste complète dans l'ordre de tri */
  const idx = allProjects.findIndex(p => p.id === project.id); /* Position du projet courant */

  /* SVG des flèches ← et → */
  const arrowL = '<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M6 1L2 5l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const arrowR = '<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const prevEl = document.getElementById('prevProject');
  const nextEl = document.getElementById('nextProject');

  if (prevEl) {
    const prev = allProjects[idx - 1];
    if (prev) { prevEl.href = `project.html?id=${prev.id}`; prevEl.innerHTML = `${arrowL} ${prev.name}`; }
    else prevEl.style.visibility = 'hidden'; /* Caché (mais garde sa place) si pas de précédent */
  }
  if (nextEl) {
    const next = allProjects[idx + 1];
    if (next) { nextEl.href = `project.html?id=${next.id}`; nextEl.innerHTML = `${next.name} ${arrowR}`; }
    else nextEl.style.visibility = 'hidden'; /* Caché si pas de suivant */
  }

  /* ── Description et bullets ───────────────────────────────────────────── */
  setText('projectIntro', project.intro);

  const bulletList = document.getElementById('projectBullets');
  if (bulletList) {
    bulletList.innerHTML = project.bullets.map(b => `
      <li class="bullet-item reveal">
        <div class="bullet-title">${b.title}</div>
        <div class="bullet-text">${b.text}</div>
      </li>`).join('');
  }

  /* ── Trailer YouTube ──────────────────────────────────────────────────── */
  const trailerSection = document.getElementById('trailerSection');
  if (trailerSection) {
    if (project.trailerID) {
      /* Lance le chargement "lazy" de l'iframe YouTube (voir initLazyVideo) */
      const trailerFrame = document.getElementById('trailerFrame');
      initLazyVideo(trailerFrame, youtubeEmbedUrl(project.trailerID), trailerSection);
    } else {
      /* Pas de trailerID dans data.js → cache toute la section trailer */
      trailerSection.style.display = 'none';
    }
  }

  /* ── Galerie filmstrip ────────────────────────────────────────────────── */
  const gallerySection = document.getElementById('gallerySection');
  const galleryGrid    = document.getElementById('galleryGrid');
  if (gallerySection && galleryGrid) {
    if (project.gallery && project.gallery.length) {
      const imgs = project.gallery; /* Tableau d'images du projet */
      const GAP     = 12; /* Espace en pixels entre les slides ← MODIFIABLE */
      const VISIBLE = 3;  /* Nombre de slides visibles à la fois (desktop) ← MODIFIABLE */
      let offset = 0;     /* Index du premier slide visible (0 = début) */

      /* Crée le conteneur du filmstrip */
      const strip = document.createElement('div');
      strip.className = 'gallery-filmstrip';
      const track = document.createElement('div');
      track.className = 'gallery-track'; /* Se déplace par transform: translateX */

      /* Crée un slide <div> pour chaque image */
      imgs.forEach((img, i) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `
          <img src="${galleryImageUrl(img.slug)}" alt="${img.title}"
               loading="${i < VISIBLE ? 'eager' : 'lazy'}">
          <!-- Légende en bas de l'image (visible au survol via CSS) -->
          <div class="gallery-slide-caption">${img.title}</div>`;

        /* Au clic sur un slide : ouvre la lightbox à cet index */
        slide.addEventListener('click', () => openLightbox(imgs, i));
        track.appendChild(slide);
      });

      /* ── Boutons de navigation ← → ──────────────────────────────────── */
      const prevBtn = document.createElement('button');
      prevBtn.className = 'gallery-arrow prev';
      prevBtn.setAttribute('aria-label', 'Previous');
      prevBtn.innerHTML = '&#8592;'; /* ← */
      prevBtn.disabled = true; /* Désactivé au départ (on est au début) */

      const nextBtn = document.createElement('button');
      nextBtn.className = 'gallery-arrow next';
      nextBtn.setAttribute('aria-label', 'Next');
      nextBtn.innerHTML = '&#8594;'; /* → */

      strip.appendChild(track);
      strip.appendChild(prevBtn);
      strip.appendChild(nextBtn);

      /* Compteur "1 — 3 / 8" sous le carrousel */
      const counter = document.createElement('div');
      counter.className = 'gallery-counter';

      galleryGrid.appendChild(strip);
      galleryGrid.appendChild(counter);

      /* Sur mobile (< 640px) : 1 slide visible à la fois, sinon VISIBLE slides */
      function getVis() { return window.innerWidth < 640 ? 1 : VISIBLE; }

      /* Met à jour la position de la piste et l'état des boutons */
      function updateStrip() {
        const vis    = getVis();
        /* Largeur d'un slide = (largeur totale - somme des gaps) / nb slides visibles */
        const slideW = (strip.offsetWidth - GAP * (vis - 1)) / vis;
        /* Déplace la piste de (offset × largeur d'un slide + gap) pixels vers la gauche */
        track.style.transform = `translateX(-${offset * (slideW + GAP)}px)`;
        /* Texte du compteur */
        counter.textContent = `${offset + 1} — ${Math.min(offset + vis, imgs.length)} / ${imgs.length}`;
        /* Désactive les boutons aux extrémités */
        prevBtn.disabled = offset === 0;
        nextBtn.disabled = offset >= imgs.length - vis;
      }

      /* Clics sur les flèches : change l'offset d'une image à la fois */
      prevBtn.addEventListener('click', () => { offset = Math.max(0, offset - 1); updateStrip(); });
      nextBtn.addEventListener('click', () => { offset = Math.min(imgs.length - getVis(), offset + 1); updateStrip(); });

      /* Navigation clavier avec les flèches (uniquement quand la lightbox est fermée) */
      document.addEventListener('keydown', e => {
        if (document.getElementById('lightbox')?.classList.contains('open')) return;
        if (e.key === 'ArrowLeft')  prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
      });

      /* Recalcule les tailles au redimensionnement de la fenêtre */
      window.addEventListener('resize', updateStrip);
      updateStrip(); /* Initialisation */

    } else {
      /* Pas d'images dans gallery[] → cache la section galerie */
      gallerySection.style.display = 'none';
    }
  }

  /* Re-déclenche le scroll-reveal pour les éléments ajoutés dynamiquement (bullets...) */
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    io.observe(el);
  });
}


/* ─────────────────────────────────────────────────────────────────────────────
   8. LIGHTBOX — Visionneuse d'image en plein écran
   ─────────────────────────────────────────────────────────────────────────────
   S'ouvre quand on clique sur une image de la galerie.
   Supporte la navigation entre images (flèches, clavier, clic sur le fond).
   Pause/reprend le trailer YouTube quand la lightbox s'ouvre/se ferme.
   ───────────────────────────────────────────────────────────────────────────── */
let _lbImgs = []; /* Tableau des images de la lightbox en cours */
let _lbIdx  = 0;  /* Index de l'image actuellement affichée */

/* Ouvre la lightbox sur l'image à l'index 'idx' du tableau 'imgs' */
function openLightbox(imgs, idx) {
  /* Normalise le format : tableau d'objets {slug, title} ou image unique */
  _lbImgs = Array.isArray(imgs) ? imgs : [{ slug: imgs, title: idx || '' }];
  _lbIdx  = Array.isArray(imgs) ? idx : 0;

  let lb = document.getElementById('lightbox');

  /* Crée la lightbox la première fois (elle est réutilisée ensuite) */
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" id="lbClose">&times;</button>
      <button class="lightbox-arrow lb-prev" id="lbPrev">&#8592;</button>
      <img id="lbImg" src="" alt="">
      <button class="lightbox-arrow lb-next" id="lbNext">&#8594;</button>
      <div class="lightbox-caption" id="lbCaption"></div>`;
    document.body.appendChild(lb);

    /* Ferme en cliquant sur le fond (pas sur l'image) */
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.getElementById('lbClose').addEventListener('click', closeLightbox);

    /* Navigation entre images */
    document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); _lbMove(-1); });
    document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); _lbMove(1); });

    /* Navigation clavier dans la lightbox */
    document.addEventListener('keydown', e => {
      if (!document.getElementById('lightbox')?.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   _lbMove(-1);
      if (e.key === 'ArrowRight')  _lbMove(1);
    });
  }

  _lbRender(); /* Affiche l'image courante */
  lb.classList.add('open');
  document.body.style.overflow = 'hidden'; /* Bloque le scroll de la page */

  /* Pause le trailer YouTube si en cours de lecture */
  const trailerFrame = document.getElementById('trailerFrame');
  if (trailerFrame?.src) trailerFrame.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*'
  );
}

/* Déplace l'index de l'image affichée (dir = +1 ou -1, boucle sur lui-même) */
function _lbMove(dir) {
  _lbIdx = (_lbIdx + dir + _lbImgs.length) % _lbImgs.length;
  _lbRender();
}

/* Met à jour l'image et la légende affichées dans la lightbox */
function _lbRender() {
  const item    = _lbImgs[_lbIdx];
  const img     = document.getElementById('lbImg');
  const caption = document.getElementById('lbCaption');
  const lb      = document.getElementById('lightbox');
  const isOpen  = lb && lb.classList.contains('open');

  /* Affiche/cache les flèches (inutiles si une seule image) */
  const show = _lbImgs.length > 1;
  document.getElementById('lbPrev').style.display = show ? '' : 'none';
  document.getElementById('lbNext').style.display = show ? '' : 'none';

  if (isOpen) {
    /* Transition fondu : efface puis charge la nouvelle image */
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = lightboxImageUrl(item.slug);
      img.alt = item.title || '';
      if (caption) caption.textContent = item.title || '';
      img.style.opacity = '1';
    }, 200); /* 200ms = durée du fondu ← MODIFIABLE */
  } else {
    /* Lors du premier rendu (avant que .open soit ajouté) : pas de fondu */
    img.src = lightboxImageUrl(item.slug);
    img.alt = item.title || '';
    if (caption) caption.textContent = item.title || '';
  }
}

/* Ferme la lightbox et reprend le trailer YouTube si applicable */
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';

  /* Reprend le trailer YouTube */
  const trailerFrame = document.getElementById('trailerFrame');
  if (trailerFrame?.src) trailerFrame.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*'
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   9. UTILITAIRES
   ───────────────────────────────────────────────────────────────────────────── */

/* Remplace le texte d'un élément par son id (sans toucher au HTML) */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ── Orbes d'ambiance — injectées dans le <body> de toutes les pages ─────── */
function initAnimBg() {
  const bg = document.createElement('div');
  bg.className = 'bg-anim';
  /* 3 orbes positionnées différemment, animées par CSS (keyframes orbFloat) */
  bg.innerHTML = `
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>`;
  document.body.prepend(bg); /* Insère avant tous les autres éléments */
}

/* ── Chargement paresseux de la vidéo YouTube du trailer ────────────────────
   Phase 1 (dès que visible) : charge l'iframe en muet sans autoplay
   Phase 2 (à 35% visible)   : envoie la commande playVideo via l'API YouTube
   Évite de charger YouTube pour des projets jamais scrollés jusqu'au trailer.
   ─────────────────────────────────────────────────────────────────────────── */
function initLazyVideo(iframe, src, target) {
  /* Version "précharge" : autoplay=0 pour ne pas démarrer + enablejsapi pour les commandes */
  const preloadSrc = src.replace('autoplay=1', 'autoplay=0') + '&enablejsapi=1';

  /* Commande YouTube via postMessage (API IFrame Player) */
  const sendPlay = () => iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*'
  );

  let preloaded = false; /* L'iframe a été injectée */
  let played    = false; /* La lecture a démarré */

  const observer = new IntersectionObserver(entries => {
    const ratio = entries[0].intersectionRatio; /* 0 = hors écran, 1 = entièrement visible */

    /* Phase 1 : précharge dès qu'un pixel est visible */
    if (!preloaded && ratio > 0) {
      iframe.src = preloadSrc;
      preloaded  = true;
    }

    /* Phase 2 : joue quand 35% de la section trailer est visible ← MODIFIABLE */
    if (preloaded && !played && ratio >= 0.35) {
      played = true;
      observer.disconnect();
      sendPlay();
      /* Retry après 800ms au cas où l'API YouTube n'était pas encore prête ← MODIFIABLE */
      setTimeout(sendPlay, 800);
    }
  }, { threshold: [0, 0.1, 0.2, 0.35] }); /* Points de contrôle pour l'observer */

  observer.observe(target);
}


/* ─────────────────────────────────────────────────────────────────────────────
   10. DEMO REEL — Vidéo YouTube avec hover-to-play et modal plein écran
   ─────────────────────────────────────────────────────────────────────────────
   - La vidéo joue (muette) au survol de la frame, pause à la sortie
   - Un clic ouvre un modal plein écran avec la vidéo en son
   POUR CHANGER LA VIDÉO :
   1. Changer data-src dans index.html (vidéo en hover)
   2. Changer MODAL_SRC ci-dessous (vidéo dans le modal plein écran)
   ───────────────────────────────────────────────────────────────────────────── */
function initReel() {
  const iframe  = document.getElementById('reelIframe');
  const section = document.getElementById('reel');
  if (!iframe || !section) return; /* N'existe que sur index.html */

  const overlay = document.getElementById('reelOverlay'); /* Calque cliquable par-dessus l'iframe */
  const frame   = iframe.closest('.reel-frame');
  if (!overlay || !frame) return;

  /* URL de la vidéo inline (survol) — chargée sans autoplay pour préchargement */
  const INLINE_SRC = iframe.dataset.src
    .replace('autoplay=1', 'autoplay=0')
    + '&enablejsapi=1'; /* enablejsapi permet les commandes play/pause par postMessage */

  /* URL de la vidéo dans le modal plein écran (avec autoplay et son)
     ← MODIFIABLE : remplace l'ID YouTube (e88P-_075KE) par le nouvel ID */
  const MODAL_SRC = 'https://www.youtube.com/embed/e88P-_075KE?rel=0&modestbranding=1&color=white&autoplay=1';

  /* Raccourci pour envoyer des commandes à YouTube via l'API IFrame */
  const ytCmd = (func) => iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args: '' }), '*'
  );

  /* Charge l'iframe dès que la section Demo Reel entre dans le viewport */
  let loaded = false;
  const loadObserver = new IntersectionObserver(entries => {
    if (entries[0].intersectionRatio > 0 && !loaded) {
      iframe.src = INLINE_SRC; /* Injecte le src → YouTube commence à charger */
      loaded = true;
      loadObserver.disconnect();
    }
  }, { threshold: [0] });
  loadObserver.observe(section);

  /* ── Miniature : cachée dès que la vidéo commence à jouer ───────────── */
  const thumbnail = document.getElementById('reelThumbnail');
  function hideThumbnail() {
    if (thumbnail) thumbnail.classList.add('reel-thumbnail--hidden');
  }

  /* ── Survol : joue la vidéo | Sortie : pause ─────────────────────────── */
  frame.addEventListener('mouseenter', () => {
    ytCmd('playVideo');
    /* Retry si l'API YouTube n'était pas encore prête au premier essai */
    setTimeout(() => ytCmd('playVideo'), 500); /* ← MODIFIABLE */
    /* Cache la miniature après un court délai (temps que YouTube réponde) */
    setTimeout(hideThumbnail, 800);
  });

  frame.addEventListener('mouseleave', () => {
    ytCmd('pauseVideo');
  });

  /* ── Modal plein écran ───────────────────────────────────────────────── */
  const modal = document.createElement('div');
  modal.className = 'reel-modal';
  modal.id = 'reelModal';
  modal.innerHTML = `
    <div class="reel-modal-inner">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <button class="reel-modal-close" aria-label="Close">&times;</button>
  `;
  document.body.appendChild(modal);

  const modalIframe = modal.querySelector('iframe');
  const closeBtn    = modal.querySelector('.reel-modal-close');

  /* Ouvre le modal et lance la vidéo plein écran */
  function openModal() {
    modalIframe.src = MODAL_SRC; /* Injecte la vidéo avec autoplay */
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; /* Bloque le scroll */
  }

  /* Ferme le modal et arrête la vidéo (en vidant son src) */
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Délai pour que l'animation de fermeture se finisse avant de couper la vidéo */
    setTimeout(() => { modalIframe.src = ''; }, 380); /* ← MODIFIABLE : doit correspondre à la transition CSS */
  }

  /* Ouvre le modal au clic ou via clavier (accessibilité) */
  overlay.addEventListener('click', openModal);
  overlay.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });

  /* Ferme le modal */
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); }); /* Clic sur le fond */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); }); /* Touche Échap */
}


/* ─────────────────────────────────────────────────────────────────────────────
   11. BOUTON DE TÉLÉCHARGEMENT CV — Animation au clic
   ─────────────────────────────────────────────────────────────────────────────
   Ajoute la classe .dl-anim sur les liens [download] au clic.
   Le CSS dans style.css gère les keyframes (dlPress, dlRipple, dlArrow).
   ───────────────────────────────────────────────────────────────────────────── */
function initDownloadBtns() {
  document.querySelectorAll('a[download]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.remove('dl-anim');
      void btn.offsetWidth; /* Force un reflow pour permettre le restart de l'animation */
      btn.classList.add('dl-anim');
      /* Retire la classe après 700ms (durée totale de l'animation) ← doit correspondre au CSS */
      setTimeout(() => btn.classList.remove('dl-anim'), 700);
    });
  });
}


/* ─────────────────────────────────────────────────────────────────────────────
   13. TRANSITIONS DE PAGE — Fondu noir entre les pages
   ─────────────────────────────────────────────────────────────────────────────
   - Crée un overlay .page-transition (défini dans style.css)
   - Au chargement : l'overlay disparaît en fondu (animation ptEnter)
   - Au clic sur un lien interne : l'overlay apparaît (ptLeave), puis navigue
   - Liens ignorés : externes (_blank), mailto:, ancres (#...), download
   ───────────────────────────────────────────────────────────────────────────── */
function initPageTransitions() {
  /* Récupère l'overlay déjà présent dans le HTML (évite le flicker au chargement) */
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  /* Cache l'overlay (pointer-events off) une fois le fondu d'entrée terminé */
  overlay.addEventListener('animationend', () => {
    if (!overlay.classList.contains('leaving')) {
      overlay.style.pointerEvents = 'none';
      overlay.style.opacity = '0';
    }
  });

  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    /* Ignore les liens non-navigants */
    if (
      link.target === '_blank'       ||
      link.hasAttribute('download')  ||
      href.startsWith('mailto:')     ||
      href.startsWith('tel:')        ||
      href.startsWith('javascript:')
    ) return;

    /* Ignore les ancres et les liens vers la même page */
    const destFile    = href.split('#')[0];
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    if (!destFile || destFile === currentFile) return;

    /* Ignore si modificateur clavier (Ctrl/Cmd = nouvel onglet) */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    /* Lance le fondu de sortie puis navigue après la fin de l'animation */
    overlay.style.opacity = '';
    overlay.style.pointerEvents = 'all';
    overlay.classList.add('leaving');
    overlay.addEventListener('animationend', () => {
      window.location.href = href;
    }, { once: true });
  });
}


/* ─────────────────────────────────────────────────────────────────────────────
   12. INITIALISATION — Point d'entrée du script
   ─────────────────────────────────────────────────────────────────────────────
   DOMContentLoaded = le HTML est entièrement parsé (mais images pas encore chargées).
   Chaque fonction vérifie elle-même si ses éléments existent (if (!el) return)
   donc toutes peuvent être appelées sur toutes les pages sans erreur.
   ───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions(); /* Transitions fluides entre pages (toutes les pages) */
  initAnimBg();          /* Orbes en arrière-plan (toutes les pages) */
  renderFeatured();      /* Grille des projets en vedette (index.html uniquement) */
  renderWorks();         /* Grille + filtres de la page Works (works.html uniquement) */
  renderProject();       /* Page de détail d'un projet (project.html uniquement) */
  initReel();            /* Demo Reel hover + modal (index.html uniquement) */
  initDownloadBtns();    /* Animation boutons CV (about.html uniquement) */
});
