/* Ledgerly Design System v2 — Blueprint layer
   Generated isometric illustrations + engagement components.
   Mount points: [data-illo="hero|stack|routing|orbit|pipeline"], [data-quiz],
   [data-calc], [data-feed], [data-terminal], [data-cases], [data-inview]. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => Math.round(n).toLocaleString('en-US');

  /* ---------- In-view helper: adds .is-in once, fires 'inview' ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    e.target.dispatchEvent(new CustomEvent('inview'));
    io.unobserve(e.target);
  }), { threshold: 0.25 });
  const watch = el => io.observe(el);

  /* ---------- Isometric kit ---------- */
  const C = Math.cos(Math.PI / 6), S = 0.5;
  const isoAt = (ox, oy) => {
    const P = (x, y, z) => [ox + (x - y) * C, oy + (x + y) * S - z];
    const pts = a => a.map(p => P(...p).map(n => +n.toFixed(1)).join(',')).join(' ');
    return { P, pts };
  };
  const box = (iso, x, y, z, w, d, h, { solid = false, draw = true, delay = 0 } = {}) => {
    const [l, r, t] = solid ? ['solid-l', 'solid-r', 'solid-top'] : ['face-l', 'face-r', 'face-top'];
    const a = draw ? `data-draw="fill" pathLength="1" style="--d:${delay}"` : '';
    return `<polygon class="${l}" ${a} points="${iso.pts([[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x, y + d, z]])}"/>` +
      `<polygon class="${r}" ${a} points="${iso.pts([[x + w, y, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x + w, y, z]])}"/>` +
      `<polygon class="${t}" ${a} points="${iso.pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])}"/>`;
  };
  const rrect = (x, y, w, h, r = 3) => `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  const seg = (a, b) => `M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  const line = (a, b, delay, cls = 'stroke') => `<path class="${cls}" data-draw pathLength="1" style="--d:${delay}" d="${seg(a, b)}"/>`;
  const packet = (path, dur, begin, cls = 'packet', r = 3) => reduced ? '' :
    `<circle class="${cls}" r="${r}" opacity="0"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`;
  const text = (x, y, t, { anchor = 'start', cls = '', delay = 0 } = {}) =>
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" class="${cls}" data-fade style="--d:${delay}">${t}</text>`;

  /* ---------- FIG.01 Hero · payout engine ---------- */
  function heroIllo(svg) {
    const iso = isoAt(380, 440), { P } = iso;
    const Z = [0, 80, 160, 240], h = 8, top = Z[3] + h;
    const names = ['04 · Settle', '03 · Route', '02 · Verify', '01 · Payees'];
    let s = '';

    // Input sources, behind-left of the top plate
    const inY = [-70, -10, 50], inLbl = ['CSV', 'API', 'ERP'];
    inY.forEach((y, i) => {
      s += `<g data-pop style="--d:${1500 + i * 120}">${box(iso, -238, y, top, 58, 34, 6, { draw: false })}</g>`;
      const c = P(-209, y + 17, top + 6);
      s += text(c[0], c[1] + 3, inLbl[i], { anchor: 'middle', cls: 'lbl-strong', delay: 1700 + i * 120 });
    });

    Z.forEach((z, i) => {
      const d0 = i * 240;
      s += box(iso, -100, -100, z, 200, 200, h, { delay: d0 });
      // Layer label + leader
      const L = P(-100, 100, z + h / 2);
      s += line([L[0] - 6, L[1]], [L[0] - 46, L[1]], d0 + 400, 'hair');
      s += text(L[0] - 52, L[1] + 3, names[i], { anchor: 'end', cls: i === 3 ? 'lbl-strong' : '', delay: d0 + 600 });

      const zt = z + h;
      if (i === 0) [-84, -40, 4].forEach((y, k) => s += `<g data-pop style="--d:${900 + k * 90}">${box(iso, 58, y, zt, 30, 30, 20, { draw: false })}</g>`);
      if (i === 1) [[-84, 14], [-52, 32], [-20, 22], [12, 40]].forEach(([x, hh], k) => s += `<g data-pop style="--d:${1100 + k * 90}">${box(iso, x, 56, zt, 24, 30, hh, { draw: false, solid: k === 3 })}</g>`);
      if (i === 2) [-86, -44, -2].forEach((y, k) => {
        s += `<g data-pop style="--d:${1300 + k * 90}">${box(iso, 54, y, zt, 36, 36, 4, { draw: false })}</g>`;
        const t = zt + 4;
        s += `<path class="stroke" data-draw pathLength="1" style="--d:${1600 + k * 120};stroke-width:1.6" d="M${P(63, y + 19, t)} L${P(70, y + 27, t)} L${P(83, y + 10, t)}"/>`;
      });
      if (i === 3) {
        // Input connectors run across the top plate, under the payee cubes
        inY.forEach((y, k) => {
          const a = P(-180, y + 17, top), b = P(-66, y + 17, top);
          s += `<path class="dash flow" data-fade style="--d:${1900 + k * 100}" d="${seg(a, b)}"/>`;
          s += packet(seg(a, b), 2.4, 2 + k * 0.8);
        });
        let k = 0;
        for (const x of [-62, -14, 34]) for (const y of [-62, -14, 34]) {
          const solid = x === -14 && y === -14;
          s += `<g data-pop style="--d:${1200 + k++ * 70}">${box(iso, x, y, top, 28, 28, 18, { draw: false, solid })}</g>`;
        }
        const tag = P(0, 0, top + 18), tagUp = [tag[0], tag[1] - 44];
        s += line(tag, tagUp, 2200, 'stroke');
        s += `<circle class="packet breathe" cx="${tagUp[0]}" cy="${tagUp[1]}" r="3"/>`;
        s += text(tagUp[0] + 8, tagUp[1] - 4, 'pye_82x · verified', { cls: 'lbl-strong', delay: 2400 });
      }
      // Pillars to the next plate (visible corners only)
      if (i < 3) [[100, -100], [100, 100], [-100, 100]].forEach(([x, y], k) =>
        s += line(P(x, y, z + h), P(x, y, Z[i + 1]), d0 + 300 + k * 60));
    });

    // Down the front pillar, then out to currency rails
    const shaft = seg(P(100, 100, top), P(100, 100, h));
    s += packet(shaft, 2.6, 1.2, 'packet');
    const cur = [['USD', -80], ['EUR', -35], ['GBP', 10], ['INR', 55]];
    cur.forEach(([c, y], k) => {
      const a = P(100, y, h / 2), b = P(198, y, h / 2);
      s += `<path class="dash flow" data-fade style="--d:${2100 + k * 90}" d="${seg(a, b)}"/>`;
      s += packet(seg(a, b), 1.8, 3 + k * 0.45, 'packet packet--ok');
      s += `<g data-pop style="--d:${2200 + k * 90}">${box(iso, 200, y - 12, 0, 40, 24, 5, { draw: false })}</g>`;
      const t = P(244, y + 12, 0);
      s += text(t[0] + 6, t[1] + 3, c, { cls: 'lbl-strong', delay: 2400 + k * 90 });
    });

    // Dimension annotation
    const r0 = P(100, -100, 0), r1 = P(100, -100, top);
    const dx = 26;
    s += line([r0[0] + dx, r0[1]], [r1[0] + dx, r1[1]], 2000, 'hair');
    s += line([r0[0] + dx - 4, r0[1]], [r0[0] + dx + 4, r0[1]], 2000, 'hair');
    s += line([r1[0] + dx - 4, r1[1]], [r1[0] + dx + 4, r1[1]], 2000, 'hair');
    s += text(r1[0] + dx + 8, (r0[1] + r1[1]) / 2, 'invite → paid', { delay: 2300 });
    s += text(r1[0] + dx + 8, (r0[1] + r1[1]) / 2 + 13, '≈ 1 business day', { cls: 'lbl-strong', delay: 2400 });

    svg.setAttribute('viewBox', '0 0 760 640');
    svg.innerHTML = s;
  }

  /* ---------- FIG.02 Payout stack inspector ---------- */
  const STACK = [
    { name: 'Onboarding', body: 'Payees add their own bank details and tax forms through a form with your branding.', stat: '6 min', statLbl: 'Median time to onboard' },
    { name: 'Compliance', body: 'Every payee is screened against watchlists and TIN-matched before the first payment goes out.', stat: '100%', statLbl: 'Screened before pay' },
    { name: 'Approvals', body: 'Rules route each batch by amount, entity or payee type, and every decision is logged.', stat: '0', statLbl: 'Unapproved payments' },
    { name: 'Rails', body: 'Each payment takes the fastest, cheapest rail for its country, with automatic failover.', stat: '190+', statLbl: 'Countries reachable' },
    { name: 'Reconciliation', body: 'Settled payments sync back to your ledger with fees and FX already split out.', stat: 'Same day', statLbl: 'Month-end close' }
  ];
  function stackIllo(svg) {
    const iso = isoAt(250, 372), { P } = iso;
    const gap = 58, h = 8;
    let s = '';
    for (let k = STACK.length - 1; k >= 0; k--) {
      const z = (STACK.length - 1 - k) * gap, d0 = (STACK.length - 1 - k) * 180;
      const R = P(85, -85, z + h / 2);
      s += `<g class="layer" data-i="${k}">${box(iso, -85, -85, z, 170, 170, h, { delay: d0 })}` +
        line([R[0] + 6, R[1]], [R[0] + 40, R[1]], d0 + 300, 'hair') +
        text(R[0] + 46, R[1] + 3, `0${k + 1} · ${STACK[k].name}`, { delay: d0 + 500 }) + '</g>';
    }
    svg.setAttribute('viewBox', '0 0 560 470');
    svg.innerHTML = s;
  }
  function mountStack(root) {
    const svg = $('svg', root), list = $('.stack-list', root), detail = $('.stack-detail', root);
    stackIllo(svg);
    list.innerHTML = STACK.map((l, k) => `<button role="tab" aria-selected="false" data-i="${k}"><span class="mono">0${k + 1}</span><b>${l.name}</b><span class="arrow">→</span></button>`).join('');
    const select = k => {
      $$('.layer', svg).forEach(g => g.classList.toggle('is-active', +g.dataset.i === k));
      $$('button', list).forEach(b => b.setAttribute('aria-selected', String(+b.dataset.i === k)));
      const l = STACK[k];
      detail.innerHTML = `<div class="stack"><p class="t-lead" style="font-size:17px">${l.body}</p><div style="display:flex;align-items:baseline;gap:12px"><span class="t-h2">${l.stat}</span><span class="t-source">${l.statLbl} · sample data</span></div></div>`;
    };
    $$('.layer', svg).forEach(g => { g.addEventListener('mouseenter', () => select(+g.dataset.i)); g.addEventListener('click', () => select(+g.dataset.i)); });
    list.addEventListener('click', e => { const b = e.target.closest('button'); if (b) select(+b.dataset.i); });
    list.addEventListener('mouseover', e => { const b = e.target.closest('button'); if (b) select(+b.dataset.i); });
    select(0);
  }

  /* ---------- FIG.03 Routing with failover ---------- */
  function routingIllo(svg) {
    const rails = [['ACH', 'US'], ['SEPA', 'EU'], ['SWIFT', 'GLOBAL'], ['RTP', 'US · INSTANT'], ['FPS', 'UK'], ['UPI', 'IN']];
    const ys = rails.map((_, i) => 40 + i * 56);
    let s = '';
    // Inputs → router
    ['Dashboard', 'CSV', 'API'].forEach((t, i) => {
      const y = 110 + i * 70;
      s += `<path class="stroke" data-draw pathLength="1" style="--d:${i * 100}" d="${rrect(10, y - 14, 96, 28)}"/>`;
      s += text(58, y + 3, t, { anchor: 'middle', delay: 300 + i * 100 });
      const p = `M106,${y} C150,${y} 150,180 196,180`;
      s += `<path class="dash flow" data-fade style="--d:${400 + i * 100}" d="${p}"/>` + packet(p, 1.6, i * 0.5);
    });
    // Router core
    s += `<path class="face-top" data-draw="fill" pathLength="1" style="--d:200" d="${rrect(196, 140, 150, 80)}"/>`;
    s += `<rect class="hair breathe" x="190" y="134" width="162" height="92" rx="6"/>`;
    s += text(271, 172, 'Ledgerly router', { anchor: 'middle', cls: 'lbl-strong', delay: 600 });
    s += text(271, 190, 'cost · speed · fx', { anchor: 'middle', delay: 700 });
    // Router → rails
    rails.forEach(([r, c], i) => {
      const y = ys[i], p = `M346,180 C440,180 440,${y} 540,${y}`;
      s += `<g class="rail" data-i="${i}"><path class="dash flow" data-fade style="--d:${800 + i * 80}" d="${p}"/>` + packet(p, 1.8, 0.3 + i * 0.35, 'packet packet--ok');
      s += `<path class="stroke" data-draw pathLength="1" style="--d:${900 + i * 80}" d="${rrect(540, y - 16, 170, 32)}"/>`;
      s += text(554, y + 3, r, { cls: 'lbl-strong', delay: 1100 + i * 80 });
      s += text(700, y + 3, c, { anchor: 'end', delay: 1150 + i * 80 }) + '</g>';
    });
    s += `<text class="failover-note" x="440" y="372" text-anchor="middle" opacity="0"></text>`;
    svg.setAttribute('viewBox', '0 0 720 380');
    svg.innerHTML = s;
    if (reduced) return;
    // Periodic failover demo: SWIFT degrades, traffic shifts to SEPA/FPS
    let on = false;
    setInterval(() => {
      if (!svg.classList.contains('is-in')) return;
      on = !on;
      const swift = $('.rail[data-i="2"]', svg), note = $('.failover-note', svg);
      swift.style.opacity = on ? .35 : 1;
      $$('.rail', svg).forEach(g => g.classList.toggle('is-boost', on && (g.dataset.i === '1' || g.dataset.i === '4')));
      note.textContent = on ? 'swift degraded · rerouted in 40ms' : '';
      note.setAttribute('opacity', on ? 1 : 0);
      note.style.fill = 'var(--bp-hold)';
    }, 3200);
  }

  /* ---------- FIG.04 Integration orbit ---------- */
  function orbitIllo(svg) {
    const cx = 300, cy = 200;
    const inner = ['ERP', 'GL', 'Bank', 'HRIS'], outer = ['CRM', 'Tax', 'SSO', 'Webhooks', 'Data warehouse', 'Slack'];
    let s = `<circle class="hair" cx="${cx}" cy="${cy}" r="110" stroke-dasharray="2 5"/><circle class="hair" cx="${cx}" cy="${cy}" r="178" stroke-dasharray="2 5"/>`;
    const place = (arr, r, off, d0) => arr.forEach((t, i) => {
      const a = off + i * (2 * Math.PI / arr.length), x = cx + r * Math.cos(a), y = cy + r * Math.sin(a) * 0.82;
      const p = `M${cx},${cy} L${x.toFixed(1)},${y.toFixed(1)}`;
      s += `<path class="dash flow" data-fade style="--d:${d0 + i * 80}" d="${p}"/>` + packet(p, 2.2, i * 0.4 + d0 / 1000, 'packet', 2.5);
      const w = t.length * 7 + 22;
      s += `<g data-pop style="--d:${d0 + 200 + i * 80}"><rect class="face-top" x="${(x - w / 2).toFixed(1)}" y="${(y - 13).toFixed(1)}" width="${w}" height="26" rx="3"/>` +
        `<text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" text-anchor="middle">${t}</text></g>`;
    });
    place(inner, 110, -Math.PI / 4, 400);
    place(outer, 178, -Math.PI / 3, 900);
    s += `<circle class="hair breathe" cx="${cx}" cy="${cy}" r="56"/>`;
    s += `<circle class="solid-top" cx="${cx}" cy="${cy}" r="40" data-pop style="--d:100"/>`;
    s += `<circle fill="#fff" cx="${cx}" cy="${cy}" r="8" data-pop style="--d:300"/>`;
    svg.setAttribute('viewBox', '0 0 600 400');
    svg.innerHTML = s;
  }

  /* ---------- FIG.05 Pipeline walk ---------- */
  function pipelineIllo(svg) {
    const steps = [['Invoice', 'captured'], ['Approve', '2 of 2'], ['Pay', 'SEPA · €11,480'], ['Reconcile', 'synced to GL']];
    const x0 = 20, w = 150, gap = 40;
    let s = '';
    steps.forEach(([t, sub], i) => {
      const x = x0 + i * (w + gap);
      if (i) s += line([x - gap, 60], [x, 60], 200 + i * 150);
      s += `<g class="pstep" data-i="${i}"><path class="face-top" data-draw="fill" pathLength="1" style="--d:${i * 150}" d="${rrect(x, 30, w, 60, 4)}"/>` +
        text(x + 14, 55, `0${i + 1} · ${t}`, { cls: 'lbl-strong', delay: 300 + i * 150 }) +
        text(x + 14, 74, sub, { delay: 350 + i * 150 }) +
        `<circle class="pstep__dot" cx="${x + w - 16}" cy="46" r="4" fill="var(--bp-hair)"/></g>`;
    });
    s += `<circle class="pipe-packet packet" cx="${x0}" cy="60" r="4" style="transition:transform .9s var(--ease-expo)"/>`;
    svg.setAttribute('viewBox', '0 0 740 120');
    svg.innerHTML = s;
    if (reduced) { $$('.pstep__dot', svg).forEach(d => d.setAttribute('fill', 'var(--bp-signal)')); return; }
    let i = 0;
    const tick = () => {
      if (svg.classList.contains('is-in')) {
        $$('.pstep', svg).forEach((g, k) => {
          $('.pstep__dot', g).setAttribute('fill', k <= i ? 'var(--bp-signal)' : 'var(--bp-hair)');
          $('path', g).style.fill = k === i ? 'var(--brand-100)' : '';
        });
        $('.pipe-packet', svg).style.transform = `translateX(${i * (w + gap) + w / 2}px)`;
        i = (i + 1) % (steps.length + 1);
        if (i === 0) $('.pipe-packet', svg).style.transform = 'translateX(0)';
      }
    };
    setInterval(tick, 1200);
  }

  const ILLOS = { hero: heroIllo, routing: routingIllo, orbit: orbitIllo, pipeline: pipelineIllo };
  $$('svg[data-illo]').forEach(svg => {
    const fn = ILLOS[svg.dataset.illo];
    if (fn) fn(svg);
    svg.classList.add('illo');
    watch(svg);
  });
  $$('[data-stack]').forEach(root => { mountStack(root); $('svg', root).classList.add('illo', 'stack-illo'); watch($('svg', root)); });
  $$('[data-inview]').forEach(watch);

  /* ---------- Live payment feed ---------- */
  const PAYEES = ['Aria Studio', 'Dockside Freight', 'M. Okafor', 'Northline Couriers', 'Lumen Audio', 'J. Castillo', 'Tern & Co.', 'Hillcrest Energy', 'R. Mehta', 'Bluewater Labs', 'K. Nakamura', 'Fernhill Media'];
  const CUR = [['USD', '$'], ['EUR', '€'], ['GBP', '£'], ['INR', '₹'], ['CAD', 'C$']];
  const STAT = [['paid', 'Paid', 7], ['review', 'Review', 1], ['held', 'Held', 1], ['blocked', 'Blocked', .3]];
  const pickStatus = () => { let r = Math.random() * STAT.reduce((a, s) => a + s[2], 0); for (const s of STAT) { if ((r -= s[2]) < 0) return s; } return STAT[0]; };
  $$('[data-feed]').forEach(feed => {
    const rows = $('.feed__rows', feed), count = $('.count', feed);
    let n = 2418;
    const row = (isNew) => {
      const [c, sym] = CUR[Math.floor(Math.random() * CUR.length)], st = pickStatus();
      const amt = (Math.random() * (c === 'INR' ? 90000 : 4800) + 60).toFixed(2);
      const t = new Date(); const time = t.toTimeString().slice(0, 8);
      const el = document.createElement('div');
      el.className = 'feed__row' + (isNew ? ' is-new' : '');
      el.innerHTML = `<time>${time}</time><span>${PAYEES[Math.floor(Math.random() * PAYEES.length)]}</span><span class="amt">${sym}${Number(amt).toLocaleString('en-US')} ${c}</span><span class="status status--${st[0]}">${st[1].toUpperCase()}</span>`;
      return el;
    };
    for (let i = 0; i < 6; i++) rows.appendChild(row(false));
    if (reduced) return;
    let visible = false;
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(feed);
    setInterval(() => {
      if (!visible || document.hidden) return;
      rows.prepend(row(true));
      while (rows.children.length > 7) rows.lastChild.remove();
      count.textContent = fmt(++n) + ' today';
    }, 1700);
  });

  /* ---------- Typing terminal ---------- */
  $$('[data-terminal]').forEach(term => {
    const body = $('.terminal__body', term), replay = $('button', term);
    const cmd = [['p', '$ '], ['', 'curl https://api.ledgerly.example/v1/payouts \\\n    -H '], ['s', '"Authorization: Bearer $LEDGERLY_KEY"'], ['', ' \\\n    -d '], ['k', 'payee'], ['', '='], ['s', 'pye_82x'], ['', ' -d '], ['k', 'amount'], ['', '='], ['n', '125000'], ['', ' -d '], ['k', 'currency'], ['', '='], ['s', 'EUR']];
    const out = [
      '', '<span class="c"># 201 Created · 212ms</span>', '{',
      '  <span class="k">"id"</span>: <span class="s">"po_9Fh2kQ"</span>,',
      '  <span class="k">"status"</span>: <span class="s">"in_transit"</span>,',
      '  <span class="k">"rail"</span>: <span class="s">"SEPA_INSTANT"</span>,',
      '  <span class="k">"fx"</span>: { <span class="k">"rate"</span>: <span class="n">0.9184</span>, <span class="k">"spread_bps"</span>: <span class="n">40</span> },',
      '  <span class="k">"eta"</span>: <span class="s">"2026-09-25T09:00:00Z"</span>',
      '}'
    ];
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const run = () => {
      clear();
      body.innerHTML = '';
      const caret = document.createElement('span'); caret.className = 'caret';
      let t = 0;
      cmd.forEach(([cls, str]) => {
        const span = document.createElement('span'); if (cls) span.className = cls;
        timers.push(setTimeout(() => { body.insertBefore(span, caret.parentNode ? caret : null); if (!caret.parentNode) body.appendChild(caret); }, t));
        [...str].forEach(ch => { t += reduced ? 0 : (ch === '\n' ? 180 : 18 + Math.random() * 24); timers.push(setTimeout(() => { span.textContent += ch; }, t)); });
      });
      t += 500;
      out.forEach(l => { t += reduced ? 0 : 110; timers.push(setTimeout(() => { const d = document.createElement('div'); d.innerHTML = l || '&nbsp;'; body.insertBefore(d, caret); }, t)); });
    };
    term.addEventListener('inview', run, { once: true });
    replay?.addEventListener('click', run);
    watch(term);
  });

  /* ---------- Readiness quiz ---------- */
  const QUIZ = [
    { q: 'How do you send payouts today?', o: ['One bank transfer at a time', 'Batch files uploaded to our bank', 'Through an API or payout platform'], rec: 'Move recurring payouts to batches or an API so one approval pays everyone.' },
    { q: 'How do you collect payee tax forms?', o: ['Email and spreadsheets', 'A shared folder and a checklist', 'Automatically, during onboarding'], rec: 'Collect W-9 and W-8 forms at onboarding, before the first payment.' },
    { q: 'How are payouts approved?', o: ['Whoever sends them decides', 'Sign-off over email', 'Rules by amount, with an audit trail'], rec: 'Set approval rules by amount and entity so every payment has a record.' },
    { q: 'How long does monthly reconciliation take?', o: ['More than a week', 'A few days', 'It syncs to the ledger automatically'], rec: 'Sync settled payments to your GL with fees and FX split out.' },
    { q: 'What happens when a payment fails?', o: ['The payee tells us', 'Someone checks the bank portal', 'We get an alert and it retries'], rec: 'Turn on failure alerts and automatic retries on a backup rail.' }
  ];
  $$('[data-quiz]').forEach(root => {
    const main = $('.quiz__main', root), side = $('.quiz__side', root);
    let i = 0, answers = [];
    const sideIdle = () => side.innerHTML = `<svg class="gauge" viewBox="0 0 180 180"><circle class="track" cx="90" cy="90" r="76"/><circle class="val" cx="90" cy="90" r="76" pathLength="1"/><text x="90" y="98" text-anchor="middle">–</text><text class="unit" x="90" y="122" text-anchor="middle">READINESS</text></svg><p class="t-small t-muted" style="max-width:240px">Answer five questions to see how your payout process compares. Nothing is sent anywhere.</p>`;
    const render = () => {
      if (i >= QUIZ.length) return result();
      const q = QUIZ[i];
      main.innerHTML = `<div class="quiz__progress">${QUIZ.map((_, k) => `<i class="${k < i ? 'done' : ''}"></i>`).join('')}</div>
        <div class="quiz__stage"><span class="t-index">Question 0${i + 1} / 0${QUIZ.length}</span><h3 class="quiz__q">${q.q}</h3>
        <div class="quiz__opts">${q.o.map((o, k) => `<button class="quiz__opt" data-v="${k}"><span class="mono">${'ABC'[k]}</span>${o}</button>`).join('')}</div>
        ${i ? '<button class="btn btn--ghost btn--sm" data-back style="margin-top:16px">← Back</button>' : ''}</div>`;
    };
    const result = () => {
      const score = Math.round(answers.reduce((a, b) => a + b, 0) / (QUIZ.length * 2) * 100);
      const tier = score < 40 ? ['Manual mode', 'Your team is doing heroic work by hand. Automation will pay off fast.'] : score < 75 ? ['Getting there', 'The foundations are in place. A few gaps still cost you hours each month.'] : ['Payout-ready', 'You run a tight process. Ledgerly would mainly add scale and global reach.'];
      const recs = QUIZ.filter((_, k) => answers[k] < 2).slice(0, 3).map(q => `<li>${q.rec}</li>`).join('') || '<li>Ask about multi-entity and global rails to keep scaling.</li>';
      main.innerHTML = `<div class="quiz__progress">${QUIZ.map(() => '<i class="done"></i>').join('')}</div><div class="quiz__stage stack"><span class="t-index">Your result</span><h3 class="quiz__q" style="margin-bottom:0">${tier[0]}</h3><p class="t-muted">${tier[1]}</p><ul class="recs">${recs}</ul><div class="demo__row" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px"><a href="#demo" class="btn btn--primary">Get your rollout plan</a><button class="btn btn--secondary" data-restart>Retake</button></div></div>`;
      $('p', side).textContent = `You scored ${score} out of 100. Teams above 75 usually run payouts with a single approval.`;
      const val = $('.gauge .val', side), num = $('.gauge text', side);
      requestAnimationFrame(() => { val.style.opacity = 1; val.style.strokeDashoffset = 1 - score / 100; });
      const t0 = performance.now();
      (function f(n) { const p = Math.min(1, (n - t0) / 1400); num.textContent = Math.round(score * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(f); })(t0);
    };
    main.addEventListener('click', e => {
      const o = e.target.closest('.quiz__opt');
      if (o) { o.classList.add('is-picked'); answers[i] = +o.dataset.v; i++; setTimeout(render, reduced ? 0 : 260); return; }
      if (e.target.closest('[data-back]')) { i--; answers.pop(); render(); return; }
      if (e.target.closest('[data-restart]')) { i = 0; answers = []; sideIdle(); render(); }
    });
    sideIdle(); render();
  });

  /* ---------- Savings calculator ---------- */
  $$('[data-calc]').forEach(root => {
    const ins = $$('input[type=range]', root);
    const tween = new Map();
    const animate = (el, to, f) => {
      const from = tween.get(el) ?? 0, t0 = performance.now();
      tween.set(el, to);
      (function step(n) { const p = reduced ? 1 : Math.min(1, (n - t0) / 600); el.textContent = f(from + (to - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
    };
    const calc = () => {
      const v = Object.fromEntries(ins.map(i => [i.name, +i.value]));
      ins.forEach(i => {
        i.style.setProperty('--p', ((i.value - i.min) / (i.max - i.min) * 100) + '%');
        const o = $(`output[for="${i.id}"]`, root);
        if (o) o.textContent = i.name === 'intl' ? i.value + '%' : i.name === 'avg' ? '$' + fmt(i.value) : i.name === 'mins' ? i.value + ' min' : fmt(i.value);
      });
      const hours = v.payees * v.mins * 0.8 / 60;
      const fx = v.payees * (v.intl / 100) * v.avg * 12 * 0.022;
      const yearly = v.payees * 12;
      animate($('[data-out="hours"]', root), hours, fmt);
      animate($('[data-out="fx"]', root), fx, n => '$' + fmt(n));
      animate($('[data-out="runs"]', root), yearly, fmt);
      animate($('[data-out="fte"]', root), hours / 160, n => n.toFixed(1));
    };
    ins.forEach(i => i.addEventListener('input', calc));
    calc();
  });

  /* ---------- Case-study tabs with autoplay ---------- */
  $$('[data-cases]').forEach(root => {
    const tabs = $$('.cases__tab', root), panels = $$('.case', root);
    let cur = 0;
    const show = k => {
      cur = k;
      tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === k)); const bar = $('i', t); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; });
      panels.forEach((p, n) => { p.hidden = n !== k; if (n === k) { p.classList.remove('is-in'); void p.offsetWidth; requestAnimationFrame(() => p.classList.add('is-in')); } });
    };
    tabs.forEach((t, n) => {
      t.addEventListener('click', () => show(n));
      $('i', t).addEventListener('animationend', () => { if (!reduced) show((cur + 1) % tabs.length); });
    });
    root.addEventListener('mouseenter', () => root.classList.add('is-paused'));
    root.addEventListener('mouseleave', () => root.classList.remove('is-paused'));
    root.addEventListener('focusin', () => root.classList.add('is-paused'));
    if (reduced) root.classList.add('is-paused');
    // Start autoplay only once visible
    root.classList.add('is-paused');
    root.addEventListener('inview', () => { if (!reduced) root.classList.remove('is-paused'); show(0); }, { once: true });
    watch(root);
    show(0);
  });
})();
