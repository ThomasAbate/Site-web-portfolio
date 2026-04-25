/* ─────────────────────────────────────────────────────────────────────────────
   app.js  –  Shared site logic
───────────────────────────────────────────────────────────────────────────── */

/* ─── Nav: active link & mobile toggle ───────────────────────────────────── */
(function initNav() {
  const page    = location.pathname.split('/').pop() || 'index.html';
  const hash    = location.hash;
  const links   = document.querySelectorAll('.nav-links a');
  const toggle  = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  function setActive(href) {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href));
  }

  /* Initial active state: prefer hash match first */
  const fullMatch = page + hash;
  const hasHashLink = [...links].some(a => a.getAttribute('href') === fullMatch);
  if (hasHashLink) {
    setActive(fullMatch);
  } else {
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* On about.html: switch between About / CV on scroll */
  const cvSection = document.getElementById('cv');
  if (cvSection && page === 'about.html') {
    function updateNavOnScroll() {
      const cvTop = cvSection.getBoundingClientRect().top;
      if (cvTop <= window.innerHeight * 0.45) {
        setActive('about.html#cv');
      } else {
        setActive('about.html');
      }
    }
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
    updateNavOnScroll();
  }

  /* Animation clic + scroll to top si même page */
  links.forEach(a => {
    a.addEventListener('click', e => {
      a.classList.remove('nav-clicked');
      void a.offsetWidth;
      a.classList.add('nav-clicked');
      a.addEventListener('animationend', () => a.classList.remove('nav-clicked'), { once: true });

      const href = a.getAttribute('href');
      if (href === page) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', href);
      }
    });
  });

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ─── Hero background video: fade in + seamless loop ────────────────────── */
(function initHeroBgVideo() {
  const video = document.getElementById('heroBgVideo');
  if (!video) return;
  const bg = video.closest('.hero-video-bg');

  /* Reveal once first frame is decoded */
  function reveal() { bg.classList.add('ready'); }
  if (video.readyState >= 3) {
    reveal();
  } else {
    video.addEventListener('canplay', reveal, { once: true });
  }

  /* Seamless loop: restart 0.3s before natural end to avoid the end→start flash */
  video.addEventListener('timeupdate', function () {
    if (this.duration && this.currentTime >= this.duration - 0.3) {
      this.currentTime = 0;
    }
  });
})();

/* ─── Scroll-reveal ──────────────────────────────────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ─── Build a project card element ──────────────────────────────────────── */
function buildCard(project) {
  const imgUrl = cardImageUrl(project.mainImageSlug);

  const a       = document.createElement('a');
  a.className   = 'card reveal';
  a.href        = `project.html?id=${project.id}`;

  a.innerHTML = `
    <div class="card-img">
      ${imgUrl
        ? `<img src="${imgUrl}" alt="${project.name}" loading="lazy">`
        : `<div class="card-img-placeholder"><span>${project.name}</span></div>`
      }
    </div>
    <div class="card-body">
      <div class="card-tag">${project.categoryLabel} &nbsp;·&nbsp; ${project.year}</div>
      <div class="card-name">${project.name}</div>
      <div class="card-desc">${project.shortDesc}</div>
      <span class="card-link">
        View Project
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>`;

  return a;
}

/* ─── Home: render featured projects ────────────────────────────────────── */
function renderFeatured() {
  const wrap = document.getElementById('featuredGrid');
  if (!wrap) return;
  getHomeFeatured().forEach(p => wrap.appendChild(buildCard(p)));
  /* Kick off reveal observer again for newly added nodes */
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    io.observe(el);
  });
}

/* ─── Works page: render & filter ───────────────────────────────────────── */
function renderWorks() {
  const grid = document.getElementById('worksGrid');
  const btns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  function render(cat) {
    grid.innerHTML = '';
    const list = getProjectsByCategory(cat);
    if (list.length === 0) {
      grid.innerHTML = '<p style="color:var(--muted);padding:32px 0;grid-column:1/-1">No projects in this category.</p>';
      return;
    }
    list.forEach((p, i) => {
      const card = buildCard(p);
      /* On the works page skip scroll-reveal; stagger with a CSS delay instead */
      card.classList.add('visible');
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.45s ease ${i * 60}ms, transform 0.45s ease ${i * 60}ms`;
      grid.appendChild(card);
      /* Trigger animation next frame */
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.style.opacity  = '1';
        card.style.transform = 'translateY(0)';
      }));
    });
  }

  const TITLES = {
    all:      'All <span>Projects</span>',
    personal: 'Personal <span>Projects</span>',
    gamejam:  'Game Jam <span>Projects</span>',
    school:   'School <span>Projects</span>',
  };

  const pageTitle = document.getElementById('worksPageTitle');

  render('all');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 150);
      const cat = btn.dataset.cat;
      render(cat);
      if (pageTitle) {
        pageTitle.classList.remove('title-in');
        pageTitle.classList.add('title-out');
        setTimeout(() => {
          pageTitle.innerHTML = TITLES[cat] || TITLES.all;
          pageTitle.classList.remove('title-out');
          pageTitle.classList.add('title-in');
        }, 180);
      }
    });
  });
}

/* ─── Project detail page ────────────────────────────────────────────────── */
function renderProject() {
  /* Only run on project.html */
  if (!document.getElementById('projectTitle')) return;

  const params  = new URLSearchParams(location.search);
  const id      = params.get('id');
  const project = id ? getProjectById(id) : null;

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

  document.title = `${project.name} — Thomas Abate`;

  /* Banner */
  const bannerEl = document.getElementById('projectBanner');
  if (bannerEl) {
    const imgUrl = bannerImageUrl(project.mainImageSlug);
    if (imgUrl) {
      bannerEl.querySelector('img').src = imgUrl;
      bannerEl.querySelector('img').alt = project.name;
    } else {
      bannerEl.style.background = 'var(--bg-2)';
      bannerEl.querySelector('img').style.display = 'none';
    }
  }

  /* Tag / Title / Subtitle */
  setText('projectTag',      `${project.categoryLabel} · ${project.year}`);
  setText('projectTitle',    project.name);
  setText('projectSubtitle', project.shortDesc);

  /* Sidebar */
  setText('sideCategory', project.categoryLabel);
  setText('sideYear',     project.year);

  /* Prev / Next project navigation */
  const allProjects = getProjectsByCategory('all');
  const idx = allProjects.findIndex(p => p.id === project.id);
  const arrowL = '<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M6 1L2 5l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const arrowR = '<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const prevEl = document.getElementById('prevProject');
  const nextEl = document.getElementById('nextProject');
  if (prevEl) {
    const prev = allProjects[idx - 1];
    if (prev) { prevEl.href = `project.html?id=${prev.id}`; prevEl.innerHTML = `${arrowL} ${prev.name}`; }
    else prevEl.style.visibility = 'hidden';
  }
  if (nextEl) {
    const next = allProjects[idx + 1];
    if (next) { nextEl.href = `project.html?id=${next.id}`; nextEl.innerHTML = `${next.name} ${arrowR}`; }
    else nextEl.style.visibility = 'hidden';
  }

  /* Description */
  setText('projectIntro', project.intro);

  const bulletList = document.getElementById('projectBullets');
  if (bulletList) {
    bulletList.innerHTML = project.bullets.map(b => `
      <li class="bullet-item reveal">
        <div class="bullet-title">${b.title}</div>
        <div class="bullet-text">${b.text}</div>
      </li>`).join('');
  }

  /* Trailer */
  const trailerSection = document.getElementById('trailerSection');
  if (trailerSection) {
    if (project.trailerID) {
      const trailerFrame = document.getElementById('trailerFrame');
      initLazyVideo(trailerFrame, youtubeEmbedUrl(project.trailerID), trailerSection);
    } else {
      trailerSection.style.display = 'none';
    }
  }

  /* Gallery filmstrip */
  const gallerySection = document.getElementById('gallerySection');
  const galleryGrid    = document.getElementById('galleryGrid');
  if (gallerySection && galleryGrid) {
    if (project.gallery && project.gallery.length) {
      const imgs = project.gallery;
      const GAP = 12;
      const VISIBLE = 3;
      let offset = 0;

      const strip = document.createElement('div');
      strip.className = 'gallery-filmstrip';
      const track = document.createElement('div');
      track.className = 'gallery-track';

      imgs.forEach((img, i) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `
          <img src="${galleryImageUrl(img.slug)}" alt="${img.title}" loading="${i < VISIBLE ? 'eager' : 'lazy'}">
          <div class="gallery-slide-caption">${img.title}</div>`;
        slide.addEventListener('click', () => openLightbox(imgs, i));
        track.appendChild(slide);
      });

      /* Arrow buttons on the filmstrip */
      const prevBtn = document.createElement('button');
      prevBtn.className = 'gallery-arrow prev';
      prevBtn.setAttribute('aria-label', 'Previous');
      prevBtn.innerHTML = '&#8592;';
      prevBtn.disabled = true;

      const nextBtn = document.createElement('button');
      nextBtn.className = 'gallery-arrow next';
      nextBtn.setAttribute('aria-label', 'Next');
      nextBtn.innerHTML = '&#8594;';

      strip.appendChild(track);
      strip.appendChild(prevBtn);
      strip.appendChild(nextBtn);

      /* Counter below */
      const counter = document.createElement('div');
      counter.className = 'gallery-counter';

      galleryGrid.appendChild(strip);
      galleryGrid.appendChild(counter);

      function getVis() { return window.innerWidth < 640 ? 1 : VISIBLE; }

      function updateStrip() {
        const vis = getVis();
        /* Pixel-accurate translation accounting for gap */
        const slideW = (strip.offsetWidth - GAP * (vis - 1)) / vis;
        track.style.transform = `translateX(-${offset * (slideW + GAP)}px)`;
        counter.textContent = `${offset + 1} — ${Math.min(offset + vis, imgs.length)} / ${imgs.length}`;
        prevBtn.disabled = offset === 0;
        nextBtn.disabled = offset >= imgs.length - vis;
      }

      prevBtn.addEventListener('click', () => { offset = Math.max(0, offset - 1); updateStrip(); });
      nextBtn.addEventListener('click', () => { offset = Math.min(imgs.length - getVis(), offset + 1); updateStrip(); });

      document.addEventListener('keydown', e => {
        if (document.getElementById('lightbox')?.classList.contains('open')) return;
        if (e.key === 'ArrowLeft')  prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
      });

      window.addEventListener('resize', updateStrip);
      updateStrip();

    } else {
      gallerySection.style.display = 'none';
    }
  }

  /* Re-trigger reveal for dynamically added elements */
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    io.observe(el);
  });
}

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
let _lbImgs = [];
let _lbIdx  = 0;

function openLightbox(imgs, idx) {
  _lbImgs = Array.isArray(imgs) ? imgs : [{ slug: imgs, title: idx || '' }];
  _lbIdx  = Array.isArray(imgs) ? idx : 0;

  let lb = document.getElementById('lightbox');
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
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); _lbMove(-1); });
    document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); _lbMove(1); });
    document.addEventListener('keydown', e => {
      if (!document.getElementById('lightbox')?.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   _lbMove(-1);
      if (e.key === 'ArrowRight')  _lbMove(1);
    });
  }
  _lbRender();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  const trailerFrame = document.getElementById('trailerFrame');
  if (trailerFrame?.src) trailerFrame.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*'
  );
}

function _lbMove(dir) {
  _lbIdx = (_lbIdx + dir + _lbImgs.length) % _lbImgs.length;
  _lbRender();
}

function _lbRender() {
  const item   = _lbImgs[_lbIdx];
  const img    = document.getElementById('lbImg');
  const caption = document.getElementById('lbCaption');
  const lb     = document.getElementById('lightbox');
  const isOpen = lb && lb.classList.contains('open');

  const show = _lbImgs.length > 1;
  document.getElementById('lbPrev').style.display = show ? '' : 'none';
  document.getElementById('lbNext').style.display = show ? '' : 'none';

  if (isOpen) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = lightboxImageUrl(item.slug);
      img.alt = item.title || '';
      if (caption) caption.textContent = item.title || '';
      img.style.opacity = '1';
    }, 200);
  } else {
    img.src = lightboxImageUrl(item.slug);
    img.alt = item.title || '';
    if (caption) caption.textContent = item.title || '';
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';

  const trailerFrame = document.getElementById('trailerFrame');
  if (trailerFrame?.src) trailerFrame.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*'
  );
}

/* ─── Utility ────────────────────────────────────────────────────────────── */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ─── Animated background orbs (all pages) ──────────────────────────────── */
function initAnimBg() {
  const bg = document.createElement('div');
  bg.className = 'bg-anim';
  bg.innerHTML = `
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>`;
  document.body.prepend(bg);
}

/* ─── Lazy video: précharge dès l'entrée, joue à 35 % ───────────────────── */
function initLazyVideo(iframe, src, target) {
  const preloadSrc = src.replace('autoplay=1', 'autoplay=0') + '&enablejsapi=1';

  const sendPlay = () => iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*'
  );

  let preloaded = false;
  let played    = false;

  const observer = new IntersectionObserver(entries => {
    const ratio = entries[0].intersectionRatio;

    if (!preloaded && ratio > 0) {
      iframe.src = preloadSrc;
      preloaded  = true;
    }

    if (preloaded && !played && ratio >= 0.35) {
      played = true;
      observer.disconnect();
      sendPlay();
      setTimeout(sendPlay, 800);
    }
  }, { threshold: [0, 0.1, 0.2, 0.35] });

  observer.observe(target);
}

/* ─── Demo Reel ──────────────────────────────────────────────────────────── */
function initReel() {
  const iframe  = document.getElementById('reelIframe');
  const section = document.getElementById('reel');
  if (!iframe || !section) return;

  initLazyVideo(iframe, iframe.dataset.src, section);

  const overlay = document.getElementById('reelOverlay');
  const frame   = iframe.closest('.reel-frame');
  if (!overlay || !frame) return;

  const VIDEO_SRC = 'https://www.youtube.com/embed/e88P-_075KE?rel=0&modestbranding=1&color=white&autoplay=1';

  /* ── YouTube postMessage helper ── */
  const ytCmd = (func) => iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args: '' }), '*'
  );

  /* ── Modal ── */
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

  function openModal() {
    ytCmd('pauseVideo');
    modalIframe.src = VIDEO_SRC;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { modalIframe.src = ''; }, 380);
  }

  overlay.addEventListener('click', openModal);
  overlay.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ─── CV download button animation ──────────────────────────────────────── */
function initDownloadBtns() {
  document.querySelectorAll('a[download]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.remove('dl-anim');
      void btn.offsetWidth;
      btn.classList.add('dl-anim');
      setTimeout(() => btn.classList.remove('dl-anim'), 700);
    });
  });
}


/* ─── Init ───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAnimBg();
  renderFeatured();
  renderWorks();
  renderProject();
  initReel();
  initDownloadBtns();
});
