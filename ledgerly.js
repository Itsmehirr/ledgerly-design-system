/* Ledgerly Design System — behaviors
   Every module is opt-in via data attributes and safe to load on any page. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: transparent at top → white + shadow once scrolled; hides on fast
     downward scroll past the fold, returns on any upward scroll. */
  const header = $('[data-header]');
  if (header) {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      const menuOpen = header.classList.contains('is-open');
      if (!menuOpen && header.dataset.header === 'autohide') {
        header.classList.toggle('is-hidden', y > 600 && y > lastY + 4);
        if (y < lastY) header.classList.remove('is-hidden');
      }
      lastY = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mega menu: hover intent (open 80ms, close 160ms), click toggles,
     Escape closes, focus moving outside closes. */
  const triggers = $$('[data-mega-trigger]');
  const backdrop = $('.mega-backdrop');
  let openId = null, openT, closeT;
  const setMega = (id) => {
    openId = id;
    triggers.forEach(t => t.setAttribute('aria-expanded', String(t.dataset.megaTrigger === id)));
    $$('[data-mega]').forEach(p => p.classList.toggle('is-open', p.dataset.mega === id));
    backdrop?.classList.toggle('is-open', !!id);
    header?.classList.toggle('is-open', !!id);
  };
  triggers.forEach(t => {
    const id = t.dataset.megaTrigger;
    t.addEventListener('mouseenter', () => { clearTimeout(closeT); openT = setTimeout(() => setMega(id), openId ? 0 : 80); });
    t.addEventListener('mouseleave', () => { clearTimeout(openT); closeT = setTimeout(() => setMega(null), 160); });
    t.addEventListener('click', () => setMega(openId === id ? null : id));
  });
  $$('[data-mega]').forEach(p => {
    p.addEventListener('mouseenter', () => clearTimeout(closeT));
    p.addEventListener('mouseleave', () => { closeT = setTimeout(() => setMega(null), 160); });
  });
  backdrop?.addEventListener('click', () => setMega(null));
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMega(null); closeDrawer(); } });
  document.addEventListener('focusin', e => { if (openId && !e.target.closest('[data-header]')) setMega(null); });

  /* Mobile drawer with drill-down sub-panes. */
  const burger = $('[data-burger]');
  const drawer = $('[data-drawer]');
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open', 'has-sub');
    $$('.drawer__pane--sub', drawer).forEach(p => p.classList.remove('is-active'));
    burger?.setAttribute('aria-expanded', 'false');
    header?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  burger?.addEventListener('click', () => {
    const open = !drawer.classList.contains('is-open');
    if (!open) return closeDrawer();
    drawer.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    header?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
  $$('[data-drawer-open]').forEach(b => b.addEventListener('click', () => {
    drawer.classList.add('has-sub');
    $(`[data-drawer-pane="${b.dataset.drawerOpen}"]`, drawer)?.classList.add('is-active');
  }));
  $$('[data-drawer-back]').forEach(b => b.addEventListener('click', () => {
    drawer.classList.remove('has-sub');
    $$('.drawer__pane--sub', drawer).forEach(p => p.classList.remove('is-active'));
  }));
  addEventListener('resize', () => { if (innerWidth >= 1024) closeDrawer(); });

  /* Scroll reveal: 40px rise, 800ms expo-out, 80ms stagger per sibling. */
  const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    revealIO.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('[data-reveal-group]').forEach(g => [...g.children].forEach((c, i) => { c.setAttribute('data-reveal', ''); c.style.setProperty('--i', i); }));
  $$('[data-reveal]').forEach(el => revealIO.observe(el));

  /* Count-up: eases out over 1.4s once visible. data-count="80" data-suffix="%" */
  const countIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', pre = el.dataset.prefix || '';
    const dur = reduced ? 0 : 1400, t0 = performance.now();
    const tick = now => {
      const p = dur ? Math.min(1, (now - t0) / dur) : 1;
      const v = to * (1 - Math.pow(1 - p, 4));
      el.textContent = pre + (Number.isInteger(to) ? Math.round(v) : v.toFixed(1)) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* Marquee: duplicate the track so the loop is seamless. */
  $$('[data-marquee]').forEach(m => {
    const track = $('.marquee__track', m);
    if (track && !m.dataset.ready) { m.appendChild(track.cloneNode(true)).setAttribute('aria-hidden', 'true'); m.dataset.ready = '1'; }
  });

  /* Carousel: prev/next, dots, swipe, keyboard. */
  $$('[data-carousel]').forEach(c => {
    const track = $('.carousel__track', c), slides = [...track.children];
    const prev = $('[data-prev]', c), next = $('[data-next]', c), dots = $('.dots', c);
    let i = 0;
    const perView = () => innerWidth < 768 ? 1 : innerWidth < 1024 ? 2 : 3;
    const max = () => Math.max(0, slides.length - perView());
    if (dots) dots.innerHTML = slides.map((_, n) => `<button aria-label="Go to slide ${n + 1}"></button>`).join('');
    const go = n => {
      i = Math.max(0, Math.min(max(), n));
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.style.transform = `translateX(${-i * (slides[0].offsetWidth + gap)}px)`;
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === max();
      dots && [...dots.children].forEach((d, n) => { d.setAttribute('aria-current', String(n === i)); d.hidden = n > max(); });
    };
    prev?.addEventListener('click', () => go(i - 1));
    next?.addEventListener('click', () => go(i + 1));
    dots?.addEventListener('click', e => { const n = [...dots.children].indexOf(e.target); if (n > -1) go(n); });
    c.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
    let x0 = null;
    track.addEventListener('pointerdown', e => { x0 = e.clientX; });
    addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
    addEventListener('resize', () => go(i));
    go(0);
  });

  /* Tabs with a sliding ink bar (spring easing). */
  $$('[data-tabs]').forEach(t => {
    const btns = $$('[role="tab"]', t), ink = $('.tabs__ink', t);
    const select = b => {
      btns.forEach(x => x.setAttribute('aria-selected', String(x === b)));
      if (ink) { ink.style.width = b.offsetWidth + 'px'; ink.style.transform = `translateX(${b.offsetLeft}px)`; }
      const scope = t.closest('[data-tabs-scope]') || document;
      $$('[role="tabpanel"]', scope).forEach(p => { p.hidden = p.id !== b.getAttribute('aria-controls'); });
    };
    btns.forEach(b => b.addEventListener('click', () => select(b)));
    requestAnimationFrame(() => select(btns.find(b => b.getAttribute('aria-selected') === 'true') || btns[0]));
  });

  /* Sticky split: highlight the list item nearest the viewport center. */
  $$('[data-split-list]').forEach(list => {
    const items = [...list.children];
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { items.forEach(x => x.classList.remove('is-active')); e.target.classList.add('is-active'); }
    }), { rootMargin: '-45% 0px -45% 0px' });
    items.forEach(x => io.observe(x));
    items[0]?.classList.add('is-active');
  });

  /* Segmented control. */
  $$('.segmented').forEach(s => s.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', s).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
})();
