# Ledgerly Design System v2.0 — Editorial × Blueprint

A static, dependency-free design system and marketing site for the placeholder brand "Ledgerly".

## Open it
Pages load their CSS/JS relatively, and some features (fonts, Unsplash photos) need a network connection.
Serve the folder locally so everything works:

    cd path/to/ledgerly-design-system
    python3 serve.py          # then open http://localhost:4173/design-system.html
    python3 serve.py 4174     # use another port if 4173 is busy

(`serve.py` is a tiny no-cache static server. Any static server works.)

## Pages
- `design-system.html` — living documentation: tokens, type, motion, microinteractions, components, blueprint layer, engagement components, photography, journal
- `index.html` — landing page built on the system (mega menus with promo banners, illustrations, quiz, calculator, live feed, case studies)
- `blog.html` — journal index (featured story, sticky filters + search, load more, newsletter)
- `blog-post.html` — article template (reading progress, TOC scroll-spy, prose styles, share rail)

## Files
| File | Layer |
|---|---|
| `ledgerly.css` / `ledgerly.js` | Core: tokens, base, components, motion, header, mega menu, drawer, carousel, tabs |
| `ledgerly-blueprint.css` / `ledgerly-blueprint.js` | Blueprint: mono annotation, generated isometric illustrations, engagement components, photo treatment, mega promo |
| `ledgerly-editorial.css` / `ledgerly-editorial.js` | Editorial: journal index + article template |

Load order: core → blueprint → editorial. Behaviors are opt-in via `data-*` attributes (see "Using the system" in design-system.html).

## Palette
Monochrome: cool neutrals + one brand blue `#0040f7` (`--brand-100…700`). Green/amber/red are status-only.

## Before shipping
Stats, customer stories, testimonials, authors and trust badges are placeholders. The newsletter form is not connected.
Photos are from Unsplash (free license), hotlinked from images.unsplash.com.
