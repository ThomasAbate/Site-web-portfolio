/* ─── Boids simulation — About page ─────────────────────────────────────── */
(function initBoids() {
  const canvas = document.getElementById('boidsCanvas');
  if (!canvas) return;
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

  /* ── Boid ── */
  class Boid {
    constructor() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      const a   = Math.random() * Math.PI * 2;
      const spd = 1.1 + Math.random() * 1.2;
      this.vx   = Math.cos(a) * spd;
      this.vy   = Math.sin(a) * spd;
      this.size = 5 + Math.random() * 2.5;
    }

    update(all) {
      const PERC  = 90;   // perception radius
      const SEP_R = 28;   // separation radius
      let sx = 0, sy = 0, sc = 0;
      let ax = 0, ay = 0, ac = 0;
      let cx = 0, cy = 0, cc = 0;

      for (const o of all) {
        if (o === this) continue;
        const dx = o.x - this.x;
        const dy = o.y - this.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d > PERC) continue;
        cx += o.x; cy += o.y; cc++;
        ax += o.vx; ay += o.vy; ac++;
        if (d < SEP_R && d > 0) { sx -= dx / d; sy -= dy / d; sc++; }
      }

      /* Separation */
      if (sc > 0) { this.vx += sx / sc * 0.13; this.vy += sy / sc * 0.13; }
      /* Alignment */
      if (ac > 0) { this.vx += (ax / ac - this.vx) * 0.05; this.vy += (ay / ac - this.vy) * 0.05; }
      /* Cohesion */
      if (cc > 0) { this.vx += (cx / cc - this.x) * 0.004; this.vy += (cy / cc - this.y) * 0.004; }

      /* Mouse avoidance */
      const mdx = this.x - mouse.x;
      const mdy = this.y - mouse.y;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 110 && md > 0) {
        const f = (1 - md / 110) * 0.6;
        this.vx += mdx / md * f;
        this.vy += mdy / md * f;
      }

      /* Speed clamp */
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const MAX = 2.6, MIN = 0.9;
      if (spd > MAX) { this.vx = this.vx / spd * MAX; this.vy = this.vy / spd * MAX; }
      if (spd < MIN && spd > 0) { this.vx = this.vx / spd * MIN; this.vy = this.vy / spd * MIN; }

      this.x += this.vx;
      this.y += this.vy;

      /* Wrap edges */
      const M = 48;
      if (this.x < -M) this.x = W + M;
      if (this.x > W + M) this.x = -M;
      if (this.y < -M) this.y = H + M;
      if (this.y > H + M) this.y = -M;
    }

    draw() {
      const angle = Math.atan2(this.vy, this.vx);
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(this.size,         0);
      ctx.lineTo(-this.size * 0.6,  this.size * 0.4);
      ctx.lineTo(-this.size * 0.35, 0);
      ctx.lineTo(-this.size * 0.6, -this.size * 0.4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.13)';
      ctx.fill();
      ctx.restore();
    }
  }

  const COUNT = 72;
  const boids = Array.from({ length: COUNT }, () => new Boid());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const b of boids) b.update(boids);
    for (const b of boids) b.draw();
    rafId = requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(loop);
  });

  rafId = requestAnimationFrame(loop);
})();
