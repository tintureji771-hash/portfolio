# Motion & Brand Identity Designer Portfolio

A warm, card-based single-page portfolio for a designer who works across both
motion graphics **and** brand identity. Showreel player, animated project
previews, a brand-systems section with real palettes, tools grid and career
journey.
Zero dependencies, zero build step — and **all of your content lives in a single
file, [`content.js`](content.js)**. A GitHub Actions workflow publishes to
GitHub Pages on every push to `main`.

Visual direction follows a cream-and-amber personal-portfolio style: a floating
pill nav, oversized name, badge-annotated portrait, rounded cards and chip labels.

> **The identity is a placeholder.** "Noa Vega", the email addresses, the
> testimonials and the CV entries are fictional. Replace them by editing
> `content.js` — see [Making it yours](#making-it-yours). You should not need to
> touch `index.html` at all.

---

## Features

- **One file to edit.** Every word, link, project, job, award and quote lives in
  `content.js`. `index.html` is an empty skeleton that `render.js` fills in —
  add a project by adding one line to an array, not by copying markup.
- **No build step.** Plain HTML, CSS and ES2020 — open `index.html` and it works.
- **Showreel player** — click-to-open modal, focus-trapped, Escape to close, and
  the embed is torn down on close so nothing keeps playing in the background.
- **Animated project previews** — every thumbnail is a looping inline SVG that
  speeds up on hover. Nothing to encode, nothing to buffer, and it demonstrates
  motion on a motion portfolio.
- **Light & dark themes** — cream by default, follows the OS preference,
  overridable by a toggle, persisted to `localStorage`.
- **Fluid typography** — every size is a `clamp()`; no fixed breakpoint jumps in
  the type scale.
- **`prefers-reduced-motion` respected throughout** — preview loops and floating
  badges stop, counters snap to final values, the custom cursor is off.
- **Accessible** — skip link, visible focus rings, real `aria-expanded` /
  `aria-pressed` / `aria-selected` state, dialog semantics on the reel modal.
- **Resilient JS** — each module is isolated in `try/catch`; one failure can't take
  the page down, and the preloader has a hard 4s timeout so it can never trap the page.

---

## Sections

| # | Section | Notes |
| --- | --- | --- |
| — | Hero | Award chip, big name, badge-annotated portrait, review strip |
| — | Showreel | Animated poster + play button → modal player |
| — | Marquee | Scrolling software list |
| — | Work | Animated previews, filterable — categories build themselves from the data |
| — | Identity | Brand systems: mark, palette swatches, type pairing, deliverables |
| — | About | Portrait card, bio, signature, animated stat counters |
| — | Services | Discipline accordion with icon tiles |
| — | Tools | Software cards on a dark panel |
| — | Journey | Career cards, then awards and process |
| — | Testimonials | Rotating quotes in a card |
| — | Contact | Dark CTA panel + footer |

---

## Structure

```
.
├── content.js                     # ★ ALL your content — the only file you edit
├── index.html                     # empty skeleton; mount points only
├── assets/
│   ├── css/style.css              # tokens → reset → primitives → components
│   ├── js/render.js               # builds the page from content.js (icons + artwork live here)
│   ├── js/main.js                 # one init function per behaviour
│   └── img/                       # favicon + Open Graph card (SVG)
├── .github/workflows/deploy.yml   # GitHub Pages deployment
└── .nojekyll                      # serve files as-is, don't run Jekyll
```

The three scripts load in order — `content.js` → `render.js` → `main.js` — all
`defer`red, so your data exists before the page is built and the page exists
before the interactions are wired up.

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
filling in `reel.embed` in `content.js`:

```js
reel: {
  // Vimeo
  embed: 'https://player.vimeo.com/video/76979871?autoplay=1',
  // YouTube
  embed: 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1',
  // Self-hosted file
  embed: 'assets/video/reel-2026.mp4'
}
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

**Open `content.js` and work top to bottom.** It's one plain JavaScript object,
commented throughout, and it holds every piece of content on the page. Save,
reload, done — no build, no other file to touch.

```js
profile: {
  name: 'Noa Vega',
  initials: 'NV',                // the logo mark; leave blank to auto-generate
  role: 'Motion Designer & Animator',
  email: 'hey@noavega.tv',
  location: 'Barcelona — CET'
}
```

Three conventions are worth knowing:

| Convention | What it does |
| --- | --- |
| `*stars*` in a heading | Renders that part in the accent colour — `'My *Recent Work*'` |
| `icon: 'trophy'` | Picks from the icon library in `render.js` (`star`, `dot`, `square`, `play`, `layers`, `stack`, `type`, `frame`, `phone`, `screen`, `trophy`, `camera`, `code`, `pen`, `sparkle`, `globe`, `mail`, `link`, `vimeo`, `instagram`, `behance`, `linkedin`, `github`, `dribbble`, `youtube`, `x`) |
| `image: ''` | Keeps the built-in placeholder artwork; set a path to use your own photo |

### Common edits

| What you want | What to change in `content.js` |
| --- | --- |
| Your name, email, city | `profile` |
| Tab title, description, social card | `meta` |
| Nav links, header button | `nav`, `header.cta` |
| Social icons (header **and** footer) | `socials` — the footer reuses this list via `from: 'socials'`, and `from: 'contact'` reuses your email and city |
| Add a project | One more object in `work.projects`. `category` builds the filter buttons automatically; `wide: true` makes it full-bleed; `art` picks the animated placeholder or set `image` to your own thumbnail |
| Add a brand identity | One more object in `identity.items` — see [Brand identity cards](#brand-identity-cards) |
| Add a job, award, service, quote, tool, process step | One more object in the matching array |
| Stat counters | `about.stats` — `value` counts up, `suffix` is the little superscript |
| Showreel video | `reel.embed` — see [Wiring up the showreel](#wiring-up-the-showreel) |
| Portraits | `hero.image` and `about.image` |
| Remove a whole section | Set it to `null` (e.g. `awards: null`) or empty its `items` — the section deletes itself. Drop its `nav` entry too |

Styling still lives in CSS, and the two are independent:

| What | Where |
| --- | --- |
| Colours, fonts, spacing, motion | The `:root` token block at the top of `assets/css/style.css` |
| Dark theme | The `:root[data-theme="dark"]` block just below it |
| Accent colour | `--accent` (fills) and `--accent-fg` (accent-coloured text) — also the `#f0a32c` fills in the artwork inside `render.js` |
| New icons or placeholder artwork | The `ICONS` and `ART` blocks near the top of `assets/js/render.js`; name your addition in `content.js` |
| Social card image | `assets/img/og.svg` |

### Brand identity cards

The Identity section is for the static half of the work — one card per brand
system, each showing the mark, its palette and its type pairing:

```js
{
  name: 'Meridian',
  year: '2026',
  scope: 'Visual identity · Motion system',
  monogram: 'M',                 // or image: 'assets/img/meridian-mark.svg'
  color: '#0f2f2b',              // the tile the mark sits on
  markColor: '#f5e9d0',          // the mark itself
  palette: ['#0f2f2b', '#f0a32c', '#f5e9d0', '#c96a3b'],  // any number
  type: 'Outfit / Source Serif',
  typeNote: 'Display + editorial',
  note: 'One or two sentences on the thinking.'
}
```

Hex codes appear under the swatches on hover, and the whole palette is exposed
to screen readers as one labelled image. `identity.deliverables` is the chip
row underneath — what a client actually receives.

Set `identity: null` to drop the section entirely (and remove its `nav` entry).

### Project preview artwork

With no `image`, a project uses one of the built-in animated SVGs — six tuned
for motion work, four for branding:

| Motion | | Branding | |
| --- | --- | --- | --- |
| `bars` | type/equaliser blocks | `mark` | logo on a construction grid |
| `orbit` | 3D orbit rings | `palette` | colour swatch columns |
| `titles` | title cards + scanline | `wordmark` | letterforms on baseline guides |
| `fluid` | simulation contours | `stationery` | cards and print collateral |
| `ui` | phone UI stack | | |
| `ident` | brand ident orbit | | |

Omit `art` and one is picked by position. Add your own in the `ART` block of
`assets/js/render.js`.

### Animating your own previews

The preview animations are utility classes applied to shapes inside the SVG —
see the “Animated project previews” section of `style.css`:

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
which sets `transform-box: fill-box` so shapes transform around their own centre.
Add `anim--vb` when a *group* must orbit a point in viewBox coordinates instead,
paired with an inline `transform-origin`.

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
