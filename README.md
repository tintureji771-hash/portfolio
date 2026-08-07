# Unfold — Creative Agency & Portfolio Template

A dark, editorial one-page website template for creative studios, agencies and
portfolios. Zero dependencies, zero build step — three files and a GitHub Actions
workflow that publishes to GitHub Pages on every push to `main`.

Design inspired by the [Unfold Creative Agency Portfolio Website Template](https://dribbble.com/shots/27390290-Unfold-Creative-Agency-Portfolio-Website-Template)
concept on Dribbble. All copy, brand names, testimonials and imagery here are
original and fictional.

---

## Features

- **No build step.** Plain HTML, CSS and ES2020 — open `index.html` and it works.
- **Dark & light themes** — follows the OS preference, overridable by a toggle,
  persisted to `localStorage`.
- **Fluid typography** — every size is a `clamp()`; the layout has no fixed
  breakpoint jumps in the type scale.
- **Motion, tastefully** — preloader, scroll reveals, animated counters, seamless
  marquee, lerped custom cursor, scroll-spy nav and a hide-on-scroll header.
- **`prefers-reduced-motion` respected throughout** — animations are disabled,
  counters snap to their final value, the cursor is off.
- **Accessible** — skip link, visible focus rings, real `aria-expanded` /
  `aria-pressed` / `aria-selected` state, Escape closes the menu.
- **Self-contained artwork** — project thumbnails are inline SVG, so there are no
  image files to optimise and nothing to 404.
- **Resilient JS** — each module is wrapped in `try/catch`; one failure can't take
  the page down, and the preloader has a hard 4s timeout so it can never trap the page.

---

## Structure

```
.
├── index.html                     # every section, in order
├── assets/
│   ├── css/style.css              # tokens → reset → primitives → components
│   ├── js/main.js                 # one init function per behaviour
│   └── img/                       # favicon + Open Graph card (SVG)
├── .github/workflows/deploy.yml   # GitHub Pages deployment
└── .nojekyll                      # serve files as-is, don't run Jekyll
```

Sections: Hero · Marquee · Ethos + stats · Services accordion · Work grid with
filters · Process · Testimonials · CTA · Footer.

---

## Running locally

Any static server works. With Node installed:

```bash
npx serve .
# or
npx http-server -p 3000
```

Then open <http://localhost:3000>. Opening `index.html` directly with `file://`
also works — nothing depends on a server.

---

## Deploying to GitHub Pages

1. Create a repository on GitHub and push this folder:

   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

2. In the repo, go to **Settings → Pages → Build and deployment** and set
   **Source** to **GitHub Actions**.

3. Push to `main`. The workflow publishes the site and prints the URL in the run
   summary — typically `https://<you>.github.io/<repo>/`.

All asset paths are relative, so the site works from a project subpath
(`/<repo>/`) as well as from a custom domain at the root.

### Custom domain

Add a file named `CNAME` at the repo root containing your domain
(e.g. `unfold.studio`), then configure the domain under **Settings → Pages**.

---

## Making it yours

| What | Where |
| --- | --- |
| Colours, fonts, spacing, motion | The `:root` token block at the top of `assets/css/style.css` |
| Light theme | The `:root[data-theme="light"]` block just below it |
| Accent colour | `--accent` — also update the `#c8f169` fills in the inline SVGs |
| Copy, sections, nav | `index.html` — sections are commented and in source order |
| Projects | The `<article class="project">` blocks in `#workGrid`. `data-cat` drives the filter buttons; `project--wide` makes a card full-bleed |
| Real images | Replace a `<svg class="project__canvas">` with `<img class="project__canvas" src="…" alt="…">` — the CSS already covers both |
| Stats | `data-count` and `data-suffix` on the `.stat__num` elements |
| Meta / social card | The `<head>` of `index.html` and `assets/img/og.svg` |

To add a filter category, add a `.filter` button with a new `data-filter` value
and set the matching `data-cat` on the projects. No JS changes needed.

---

## Browser support

Modern evergreen browsers. Uses `IntersectionObserver`, CSS custom properties,
`clamp()`, `color-mix()` and `aspect-ratio` — all with graceful degradation:
without `IntersectionObserver`, revealed content simply shows immediately.

---

## License

[MIT](LICENSE) — free for personal and commercial use. Attribution appreciated
but not required.
