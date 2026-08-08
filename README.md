# joon-park.me

Personal portfolio site — a data analyst's selected work. One scrolling home page (hero →
experience → selected work → contact) plus a standalone case-study page per project.

Static HTML, CSS and JavaScript. No build step, no framework, no dependencies.

```
index.html                        home page
work/kpi-dashboard.html           case study 01
work/reporting-automation.html    case study 02
work/sales-performance.html       case study 03
work/query-library.html           case study 04
css/style.css                     all styling — design tokens at the top
js/main.js                        theme toggle (the only interactive state)
CNAME                             custom domain — do not delete
```

## Run it locally

```
python -m http.server 4173
```

then open http://localhost:4173. Double-clicking `index.html` also works — the relative links
between pages resolve over `file://` too.

## Design

Editorial and deliberately low-motion: a hover tint on project blocks and a 3px arrow nudge are
the only transitions. Hairlines only, no shadows. One breakpoint, at 820px.

Type is **Space Grotesk** 400/500 for display and **Inter** 400/500 for body, from Google Fonts.
Radii: 3px icon slots, 12px tags, 22px CTA pills, 50% theme toggle.

Every colour is a CSS custom property at the top of `css/style.css`, defined twice — `:root` for
light and `html[data-th="dark"]` for dark:

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#f1ebdf` | `#16140f` |
| `--ink` | `#211e19` | `#ece5d6` |
| `--muted` | `rgba(33,30,25,.62)` | `#9a9280` |
| `--accent` | `#a4562e` | `#d1804f` |
| `--panel` | `rgba(33,30,25,.04)` | `rgba(236,229,214,.045)` |
| `--hair` | `rgba(33,30,25,.15)` | `rgba(236,229,214,.18)` |

## Theme

`data-th="light" | "dark"` on `<html>`, persisted to `localStorage["jpp-theme"]`. A small blocking
script in each page's `<head>` reads it — falling back to `prefers-color-scheme` — *before* first
paint, so the theme never flashes. `js/main.js` only wires up the toggle button.

## Tool icons

The hero's tool row uses inline [Lucide](https://lucide.dev) glyphs at 18×18px, sized by the
`.tool svg` rule in `css/style.css`. They're monochrome and drawn with `stroke="currentColor"`, so
they inherit the ink colour and follow the theme — no per-theme asset needed.

To swap one, copy another icon's `d` attributes from https://lucide.dev/icons, keeping
`viewBox="0 0 24 24"` and `stroke="currentColor"`. Do **not** add `fill` to the `.tool svg` rule:
the Tableau scatter icon's dots carry their own `fill="currentColor"` attribute, and a CSS `fill`
overrides presentation attributes — it would silently erase them.

> Lucide icons are ISC licensed — © Lucide Contributors, https://lucide.dev/license
> (some are derived from Feather, MIT, © Cole Bemis).

## Editing notes

Each case-study page is a real, standalone HTML file, so its URL is shareable and the content is
visible without JavaScript. The pages repeat the header and footer markup; that duplication is
intentional for a five-page static site — styling and behaviour live in the two shared files.

Images are dashed placeholders until real screenshots land; to swap one in, replace the
`<div class="ph …">` with an `<img>`.

When you change `css/style.css` or `js/main.js`, bump the `?v=` number on their `<link>`/`<script>`
tags — in `index.html` **and** all four `work/*.html` pages — so browsers fetch the new files.

## Deployment

GitHub Pages serves this repo. `CNAME` points the site at **joon-park.me** — deleting that file
breaks the custom domain, so leave it in place on every branch.

Pages deploys from `main` at the repository root, so anything merged to `main` is live within a
minute or two. Work on `dev` and open a pull request to `main`.
