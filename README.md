# Noa Vega — Motion Designer Portfolio

A dark, editorial single-page portfolio for a motion designer / animator.
Showreel player, animated project previews, toolkit and career timeline.
Zero dependencies, zero build step — three files and a GitHub Actions workflow
that publishes to GitHub Pages on every push to `main`.

Visual direction inspired by the [Unfold Creative Agency Portfolio Website Template](https://dribbble.com/shots/27390290-Unfold-Creative-Agency-Portfolio-Website-Template)
concept on Dribbble.

> **The identity is a placeholder.** "Noa Vega", the email addresses, the
> testimonials and the CV entries are fictional. See
> [Making it yours](#making-it-yours) for the find-and-replace list.

---

## Features

- **No build step.** Plain HTML, CSS and ES2020 — open `index.html` and it works.
- **Showreel player** — click-to-open modal, focus-trapped, Escape to close, and
  the embed is torn down on close so nothing keeps playing in the background.
- **Animated project previews** — every thumbnail is a looping inline SVG that
  speeds up on hover. Nothing to encode, nothing to buffer, and it demonstrates
  motion on a motion portfolio.
- **Dark & light themes** — follows the OS preference, overridable by a toggle,
  persisted to `localStorage`.
- **Fluid typography** — every size is a `clamp()`; no fixed breakpoint jumps in
  the type scale.
- **`prefers-reduced-motion` respected throughout** — preview loops stop, counters
  and toolkit bars snap to final values, the custom cursor is off.
- **Accessible** — skip link, visible focus rings, real `aria-expanded` /
  `aria-pressed` / `aria-selected` state, dialog semantics on the reel modal.
- **Resilient JS** — each module is isolated in `try/catch`; one failure can't take
  the page down, and the preloader has a hard 4s timeout so it can never trap the page.

---

## Sections

| # | Section | Notes |
| --- | --- | --- |
| — | Hero | Availability badge, headline, quick facts |
| 01 | Showreel | Poster + play button → modal player |
| — | Marquee | Scrolling software list |
| 02 | Work | 6 animated previews, filterable by 3D / 2D / Titles / UI |
| 03 | About | Avatar, bio, animated stat counters |
| 04 | What I do | Four-discipline accordion |
| 05 | Toolkit | Software proficiency bars |
| 06 | Experience | Career timeline |
| 07 | Words | Rotating testimonials |
| 08 | Contact | Email CTA + footer |

---

## Structure

```
.
├── index.html                     # every section, in source order, commented
├── assets/
│   ├── css/style.css              # tokens → reset → primitives → components
│   ├── js/main.js                 # one init function per behaviour
│   └── img/                       # favicon + Open Graph card (SVG)
├── .github/workflows/deploy.yml   # GitHub Pages deployment
└── .nojekyll                      # serve files as-is, don't run Jekyll
```

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

## Wiring up the showreel

The player opens a modal with a placeholder inside. Point it at a real video by
adding **`data-embed`** to the `#reelBtn` button in `index.html`:

```html
<!-- Vimeo -->
<button class="reel" id="reelBtn" type="button"
        data-embed="https://player.vimeo.com/video/76979871?autoplay=1">

<!-- YouTube -->
<button class="reel" id="reelBtn" type="button"
        data-embed="https://www.youtube.com/embed/VIDEO_ID?autoplay=1">

<!-- Self-hosted file -->
<button class="reel" id="reelBtn" type="button"
        data-embed="assets/video/reel-2026.mp4">
```

Anything ending in `.mp4`, `.webm` or `.mov` is injected as a `<video>` element
with native controls; anything else becomes an `<iframe>`. The embed is created
on open and destroyed on close, so a paused reel never keeps loading in the
background.

To replace the animated poster behind the play button, swap the
`<svg class="reel__bg">` for an `<img>` — the CSS already covers both.

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
(e.g. `noavega.tv`), then configure the domain under **Settings → Pages**.

---

## Making it yours

Start with the identity — three global find-and-replaces cover most of it:

| Find | Replace with |
| --- | --- |
| `Noa Vega` | your name |
| `hey@noavega.tv` | your email |
| `Barcelona` | your city |

Then the rest:

| What | Where |
| --- | --- |
| Colours, fonts, spacing, motion | The `:root` token block at the top of `assets/css/style.css` |
| Light theme | The `:root[data-theme="light"]` block just below it |
| Accent colour | `--accent` — also update the `#c8f169` fills in the inline SVGs |
| Copy, sections, nav | `index.html` — sections are commented and in source order |
| Showreel | See [Wiring up the showreel](#wiring-up-the-showreel) |
| Projects | The `<article class="project">` blocks in `#workGrid`. `data-cat` drives the filters; `project--wide` makes a card full-bleed |
| Real thumbnails | Replace a `<svg class="project__canvas">` with `<img class="project__canvas" src="…" alt="…">`, or a muted autoplay `<video>` — the CSS covers all three |
| Stats | `data-count` and `data-suffix` on the `.stat__num` elements |
| Toolkit bars | `data-fill="0–100"` on each `.tool__fill` |
| Timeline | The `<article class="tl">` blocks in `#experience` |
| Avatar | The `<svg>` inside `.avatar` — swap for `<img src="…" alt="">` |
| Meta / social card | The `<head>` of `index.html` and `assets/img/og.svg` |

To add a filter category, add a `.filter` button with a new `data-filter` value
and set the matching `data-cat` on the projects. No JS changes needed.

### Animating your own previews

The preview animations are utility classes applied to shapes inside the SVG —
see section 18 of `style.css`:

| Class | Motion |
| --- | --- |
| `a-rise` | bob up and down |
| `a-orbit` | continuous rotation |
| `a-scan` | vertical sweep (scanlines, wipes) |
| `a-pulse` | scale + fade pulse |
| `a-slide` | horizontal shuttle |
| `a-morph` | scale + rotate |
| `a-blink` | hard on/off, stepped |

Add `d1`–`d5` alongside to offset the start time so sibling shapes feel
choreographed rather than synchronised. All of them require the `anim` class,
which sets `transform-box: fill-box` so shapes rotate around their own centre.

---

## Browser support

Modern evergreen browsers. Uses `IntersectionObserver`, CSS custom properties,
`clamp()`, `color-mix()`, `aspect-ratio` and `transform-box` — all with graceful
degradation: without `IntersectionObserver`, revealed content simply shows
immediately.

---

## License

[MIT](LICENSE) — free for personal and commercial use. Attribution appreciated
but not required.
