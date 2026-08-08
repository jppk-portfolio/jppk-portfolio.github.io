# Personal Portfolio — J.P. Park

A minimal editorial portfolio for a data analyst, built to the *Portfolio website wireframe*
design handoff. One scrolling home page (hero → experience → selected work → contact) plus one
case-study page per project.

Deliberately low-motion: a hover tint on project blocks and a 3px arrow nudge are the only
transitions. No build step, no framework — plain HTML, CSS and JavaScript.

```
index.html                        home page
work/kpi-dashboard.html           case study 01
work/reporting-automation.html    case study 02
work/sales-performance.html       case study 03  (placeholder copy)
work/query-library.html           case study 04  (placeholder copy)
css/style.css                     all styling — design tokens at the top
js/main.js                        theme toggle (the only interactive state)
```

> **Note:** the site uses sample copy and the name "J.P. Park" (guessed from the email address
> `jppk.park@gmail.com`). See **Copy still needed** below.
> When you edit `css/style.css` or `js/main.js`, bump the `?v=` number on their `<link>`/`<script>`
> tags — in `index.html` *and* in all four `work/*.html` pages — so browsers fetch the new files.

## Run it locally

```
python -m http.server 4173
```

then open http://localhost:4173. (Double-clicking `index.html` also works — the relative links
between pages resolve over `file://` too.)

## Structure

Each case-study page is a real, standalone HTML file, so the URLs are shareable and the content
is visible without JavaScript. The pages repeat the header and footer markup; that duplication is
intentional for a five-page static site — the styling and behaviour live in the two shared files.

## Design tokens

Everything is a CSS custom property at the top of `css/style.css`, defined twice: `:root` for
light and `html[data-th="dark"]` for dark.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#f1ebdf` | `#16140f` |
| `--ink` | `#211e19` | `#ece5d6` |
| `--muted` | `rgba(33,30,25,.62)` | `#9a9280` |
| `--accent` | `#a4562e` | `#d1804f` |
| `--panel` | `rgba(33,30,25,.04)` | `rgba(236,229,214,.045)` |
| `--hair` | `rgba(33,30,25,.15)` | `rgba(236,229,214,.18)` |

Type: **Space Grotesk** 400/500 (display) and **Inter** 400/500 (body), from Google Fonts.
Radii: 3px icon slots, 12px tags, 22px CTA pills, 50% theme toggle. No shadows — hairlines only.
One breakpoint, at 820px.

## Theme

`data-th="light" | "dark"` on `<html>`, persisted to `localStorage["jpp-theme"]`. A small blocking
script in each page's `<head>` reads that (falling back to `prefers-color-scheme`) *before* first
paint, so the theme never flashes. `js/main.js` only wires up the toggle button.

## Copy still needed

- Real name confirmation, location (`City, Country · UTC+9` appears in the hero and contact panel)
  and LinkedIn URL (currently `https://www.linkedin.com/`).
- Company names and cities in Experience (`Company Name · City` ×2).
- A résumé PDF — the Résumé links point at `#`.
- Result headlines, facts, tags, blurbs and all case-study prose for projects **03 Sales
  performance model** and **04 Standardised query library** (marked "Add …" throughout).

## Assets

Every image is a dashed placeholder with a label. To swap one in, replace the
`<div class="ph …">` with an `<img>`:

- Home page: 1 screenshot per project, min 230px tall, roughly 4:3.
- Per case study: 1 hero (1600×900) + 2 detail views (270px tall).

## Tool icons

The tool row in the hero uses inline [Lucide](https://lucide.dev) glyphs at 18×18px, sized by the
`.tool svg` rule in `css/style.css`. They are monochrome and drawn with `stroke="currentColor"`,
so they inherit the ink colour and follow the light/dark theme — no per-theme asset needed.

Brand logos were deliberately not used. Simple Icons removed every Microsoft mark in v13.0.0
(June 2024) at Microsoft's request, so no permissively-licensed monochrome Power BI or Excel icon
exists; Microsoft's own icons are full-colour and licensed only for "architectural diagrams,
training materials, or documentation", with modification and recolouring disallowed. SQL has no
logo at all. Neutral glyphs sidestep all of that and read as one system at 18px.

To swap a glyph, copy another one's `d` attributes from https://lucide.dev/icons — keep the
`viewBox="0 0 24 24"` and `stroke="currentColor"`. Do **not** add `fill` to the `.tool svg` CSS
rule: the Tableau scatter icon's dots carry their own `fill="currentColor"` attribute, and a CSS
`fill` would override it and erase them.

> Lucide icons are ISC licensed — © Lucide Contributors, https://lucide.dev/license
> (some are derived from Feather, MIT, © Cole Bemis).

## Free hosting

### Option 1 — GitHub Pages (recommended)
1. Create a public repository on github.com (e.g. `my-portfolio`).
2. In this folder run:
   ```
   git init
   git add .
   git commit -m "Personal portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / root → Save**.
4. After ~1 minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

Updates: `git add . && git commit -m "update" && git push`.

### Option 2 — Netlify Drop (no git, fastest)
Drag this whole folder onto https://app.netlify.com/drop.

### Option 3 — Firebase Hosting
`firebase init hosting` → public directory `public` (copy these files into it), **not** a
single-page app. Set `"cleanUrls": true` so `/work/kpi-dashboard` resolves without the extension.
Do **not** add a catch-all rewrite to `index.html` — it would break the case-study pages.
