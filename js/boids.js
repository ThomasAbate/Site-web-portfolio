/* ─── Champ de particules reliées — Page About ────────────────────────────────
   Particules qui dérivent lentement. Quand deux particules sont proches,
   une ligne semi-transparente les connecte. La souris crée des connexions
   orangées supplémentaires avec les particules dans son rayon.

   PARAMÈTRES MODIFIABLES :
   - COUNT       : nombre de particules (~40 = léger, ~80 = dense)
   - CONNECT_R   : distance max pour relier deux particules (pixels)
   - MOUSE_R     : rayon d'influence de la souris (pixels)
   - speed       : vitesse de dérive des particules
   ─────────────────────────────────────────────────────────────────────────── */
(function initParticles() {

  /* Crée et insère le canvas en premier enfant du body (derrière tout) */
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H;
  const mouse = { x: -9999, y: -9999 };
  let rafId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  /* ── Paramètres ──────────────────────────────────────────────────────────── */
  const COUNT     = 55;   /* Nombre de particules ← MODIFIABLE */
  const CONNECT_R = 160;  /* Distance max de connexion (px) ← MODIFIABLE */
  const MOUSE_R   = 200;  /* Rayon d'influence souris (px) ← MODIFIABLE */

  /* ── Création des particules ─────────────────────────────────────────────── */
  const pts = Array.from({ length: COUNT }, () => {
    const a   = Math.random() * Math.PI * 2;
    const spd = 0.2 + Math.random() * 0.35; /* Dérive lente ← MODIFIABLE */
    return {
      x:    Math.random() * window.innerWidth,
      y:    Math.random() * window.innerHeight,
      vx:   Math.cos(a) * spd,
      vy:   Math.sin(a) * spd,
      size: 1.4 + Math.random() * 1.2,
    };
  });

  /* ── Boucle d'animation ──────────────────────────────────────────────────── */
  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* Déplacement + rebond sur les bords */
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= W) { p.vx *= -1; p.x = Math.max(0, Math.min(W, p.x)); }
      if (p.y <= 0 || p.y >= H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)); }
    }

    /* Connexions entre particules (crème très discret) */
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b  = pts[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d > CONNECT_R) continue;
        const alpha = (1 - d / CONNECT_R) * 0.13; /* Opacité max 13% ← MODIFIABLE */
        ctx.strokeStyle = `rgba(237,229,213,${alpha})`;
        ctx.lineWidth   = 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    /* Connexions souris → particules (orange, plus visible) */
    for (const p of pts) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d > MOUSE_R) continue;
      const alpha = (1 - d / MOUSE_R) * 0.45; /* Opacité max 45% ← MODIFIABLE */
      ctx.strokeStyle = `rgba(220,112,32,${alpha})`;
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }

    /* Points */
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(237,229,213,0.22)';
      ctx.fill();
    }

    rafId = requestAnimationFrame(loop);
  }

  /* Pause quand l'onglet est masqué */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(loop);
  });

  rafId = requestAnimationFrame(loop);
})();
