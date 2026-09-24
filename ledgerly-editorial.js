/* Ledgerly Design System v2 — Editorial behaviors
   [data-journal] filter + search + load more · [data-newsletter] · [data-article]
   reading progress, TOC scroll-spy, copy link. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toast = (() => {
    let el, t;
    return msg => {
      if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
      el.textContent = msg; el.classList.add('is-on');
      clearTimeout(t); t = setTimeout(() => el.classList.remove('is-on'), 1600);
    };
  })();

  /* ---------- Journal index: filters, search, load more ---------- */
  $$('[data-journal]').forEach(root => {
    const cards = $$('.post-card', root);
    const filters = $$('.filter', root.closest('main') || document);
    const search = $('[data-search]');
    const count = $('.results-count');
    const empty = $('.empty', root);
    const more = $('[data-loadmore]');
    const bar = more && $('.progress__bar', more.parentElement);
    const PAGE = +root.dataset.page || 9;
    let cat = 'all', q = '', shown = PAGE;

    // Per-category counts in the filter chips
    filters.forEach(f => {
      const c = f.dataset.cat, n = c === 'all' ? cards.length : cards.filter(x => x.dataset.cat === c).length;
      const sup = $('sup', f); if (sup) sup.textContent = n;
    });

    const apply = (animate = true) => {
      const match = cards.filter(c => (cat === 'all' || c.dataset.cat === cat) &&
        (!q || c.textContent.toLowerCase().includes(q)));
      let i = 0;
      cards.forEach(c => {
        const idx = match.indexOf(c), visible = idx > -1 && idx < shown;
        const was = !c.hidden;
        c.hidden = !visible;
        if (visible && (!was || animate) && !reduced) {
          c.classList.remove('is-entering'); void c.offsetWidth;
          c.style.setProperty('--i', i++); c.classList.add('is-entering');
        }
      });
      const vis = Math.min(shown, match.length);
      if (count) count.textContent = `Showing ${vis} of ${match.length}`;
      if (empty) empty.hidden = match.length > 0;
      if (more) { more.hidden = vis >= match.length; if (bar) bar.style.setProperty('--value', (vis / Math.max(1, match.length) * 100) + '%'); }
    };

    filters.forEach(f => f.addEventListener('click', () => {
      cat = f.dataset.cat; shown = PAGE;
      filters.forEach(x => x.setAttribute('aria-pressed', String(x === f)));
      apply();
      const top = root.getBoundingClientRect().top + scrollY - 140;
      if (scrollY > top) scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    }));

    let t;
    search?.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { q = search.value.trim().toLowerCase(); shown = PAGE; apply(); }, 120); });
    // "/" focuses search, Esc clears it
    addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== search && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); search?.focus(); }
      if (e.key === 'Escape' && document.activeElement === search) { search.value = ''; q = ''; apply(); search.blur(); }
    });
    $('[data-clear]', root)?.addEventListener('click', () => {
      if (search) search.value = ''; q = ''; cat = 'all';
      filters.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.cat === 'all')));
      apply();
    });
    more?.addEventListener('click', () => { shown += PAGE; apply(false); });

    apply(false);
  });

  /* ---------- Newsletter (local demo state; wire to your ESP) ---------- */
  $$('[data-newsletter]').forEach(nl => {
    const form = $('form', nl);
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('input[type=email]', form);
      if (!input.checkValidity()) { input.reportValidity(); return; }
      nl.classList.add('is-done');
    });
  });

  /* ---------- Article: progress, TOC, copy link ---------- */
  $$('[data-article]').forEach(article => {
    const prose = $('.prose', article);
    const heads = $$('h2[id]', prose);

    // Build TOC(s) from h2s
    $$('[data-toc]').forEach(toc => {
      toc.innerHTML = heads.map(h => `<a href="#${h.id}">${h.dataset.toc || h.textContent.replace(/^\d+\s*/, '')}</a>`).join('');
    });
    $$('.toc-mobile a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));

    // Reading progress
    const bar = $('.read-progress');
    const onScroll = () => {
      if (!bar) return;
      const r = prose.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.4 - r.top) / r.height));
      bar.style.setProperty('--p', p.toFixed(4));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // Scroll-spy
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      $$('[data-toc] a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-15% 0px -75% 0px' });
    heads.forEach(h => spy.observe(h));

    // Read time from word count
    const words = prose.textContent.trim().split(/\s+/).length;
    $$('[data-readtime]').forEach(el => el.textContent = `${Math.max(1, Math.round(words / 230))} min read`);

    // Share
    $$('[data-copy-link]').forEach(b => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); } catch { /* clipboard blocked */ }
      toast('Link copied');
    }));
  });
})();
