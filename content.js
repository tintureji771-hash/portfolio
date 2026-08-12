/* ==========================================================================
   ★ THIS IS THE ONLY FILE YOU NEED TO EDIT ★

   Everything on the page — text, links, projects, brand systems, jobs,
   awards, quotes — comes from the object below. Change a value, save,
   reload. Nothing else.

   Three small conventions:
     • *stars*   in a heading render as the highlighted part  →  My *Recent Work*
     • icon: '…' picks from the icon library in assets/js/render.js
              (star, dot, square, play, layers, stack, type, frame, phone,
               screen, trophy, camera, code, pen, sparkle, globe, palette,
               grid, book, tag, compass, mail, link, vimeo, instagram,
               behance, linkedin, github, dribbble, youtube, x, twitter)
     • image: '' leaves the built-in placeholder artwork in place.
              Point it at a file (e.g. 'assets/img/me.jpg') to use a photo.

   Delete a whole section (set it to null, or empty its items) and it
   disappears from the page — nav links to it should go too.
   ========================================================================== */

window.SITE = {
  /* ---------- browser tab, search results, social previews ------------- */
  meta: {
    lang: "en",
    title: "Tintu Reji — Motion & Brand Identity Designer",
    description:
      "Tintu Reji is a freelance motion designer and brand identity designer — logos, visual identity systems and the animation that brings them to life.",
    ogTitle: "", // blank = reuse title
    ogDescription:
      "Motion designer and brand identity designer. Identity systems, logo animation, 3D and kinetic type.",
    ogImage: "assets/img/og.svg",
    favicon: "assets/img/favicon.svg",
    url: "",
  },

  /* ---------- who you are (used all over the page) --------------------- */
  profile: {
    name: "Tintu Reji",
    initials: "TR", // the little logo mark; blank = auto
    role: "Motion & Brand Identity Designer",
    email: "hey@noavega.tv", // ← your real address
    location: "Barcelona — CET", // ← your city and timezone
  },

  /* ---------- navigation ----------------------------------------------- */
  nav: [
    { label: "Reel", href: "#reel" },
    { label: "Work", href: "#work" },
    { label: "Identity", href: "#identity" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],

  header: {
    cta: { label: "Let's Talk", href: "#contact" },
  },

  /* ---------- social links (header + footer) --------------------------- */
  socials: [
    { label: "Behance", icon: "behance", href: "#contact" },
    { label: "Instagram", icon: "instagram", href: "#contact" },
    { label: "Vimeo", icon: "vimeo", href: "#contact" },
    { label: "LinkedIn", icon: "linkedin", href: "#contact" },
  ],

  /* ---------- hero ------------------------------------------------------ */
  hero: {
    chip: "Motion & Brand Identity Designer",
    chipIcon: "star",
    heading: "I'm *Tintu Reji*",
    intro:
      "I build brand identities and then make them move — logos, type and colour systems designed to work standing still and at 24 frames a second.",
    image: "", // e.g. 'assets/img/portrait.jpg'
    floats: ["Identity Systems", "Logo & Marks", "3D & Motion", "Kinetic Type"],
    seal: "Brand & Motion Design · Since 2016", // '' removes the spinning badge
    buttons: [
      { label: "View Portfolio", href: "#work" },
      { label: "Hire Me", href: "#contact", dark: true },
    ],
    socialsLabel: "Follow me on",
    reviews: {
      // null removes the whole block
      count: "40+ Brands",
      note: "identities designed, animated and shipped",
      rating: "", // e.g. '4.9 of 5' — adds the five-star row; blank hides it
      faces: [], // [] = auto from testimonials initials
    },
  },

  /* ---------- scrolling strip ------------------------------------------ */
  marquee: [
    "Brand Identity",
    "Logo & Wordmarks",
    "Brand Guidelines",
    "Kinetic Typography",
    "3D & CGI",
    "Title Sequences",
    "Packaging",
    "Motion Systems",
  ],

  /* ---------- showreel -------------------------------------------------- */
  reel: {
    chip: "Showreel 2026",
    chipIcon: "play",
    title: "Ninety Seconds, *No Filler*",
    intro:
      "A cut of the last eighteen months — identity launches, logo builds, campaign work and two things that never aired.",
    // Paste a Vimeo/YouTube embed URL or an .mp4 path — it opens in the modal.
    embed: "",
    meta: [
      "01:32 · 4K · Stereo",
      "Illustrator · After Effects · Cinema 4D",
    ],
  },

  /* ---------- portfolio -------------------------------------------------
     The filter buttons build themselves from the `category` values below,
     in the order they first appear. `wide: true` makes a project span the
     full row. `art` picks the built-in animated artwork:
       motion    — bars | orbit | titles | fluid | ui | ident
       branding  — mark | palette | wordmark | stationery
     …or set `image` to your own thumbnail instead.
     ---------------------------------------------------------------------- */
  work: {
    chip: "My Portfolio",
    chipIcon: "square",
    title: "Identity, and How It *Moves*",
    allLabel: "All",
    projects: [
      {
        name: "Meridian — Full Identity",
        meta: "Identity · Motion — 2026",
        category: "Identity",
        art: "mark",
        wide: true,
        href: "#work",
        image: "",
      },
      {
        name: "Fold — Wordmark & Rebrand",
        meta: "Identity — 2025",
        category: "Identity",
        art: "wordmark",
        href: "#work",
        image: "",
      },
      {
        name: "Sabbia — Palette & Packaging",
        meta: "Branding · Print — 2025",
        category: "Branding",
        art: "palette",
        href: "#work",
        image: "",
      },
      {
        name: "Nova — Kinetic Campaign",
        meta: "2D · Type — 2026",
        category: "2D",
        art: "bars",
        href: "#work",
        image: "",
      },
      {
        name: "Aurora — Product Loop",
        meta: "3D — 2026",
        category: "3D",
        art: "orbit",
        href: "#work",
        image: "",
      },
      {
        name: "Signal — Title Sequence",
        meta: "Titles — 2025",
        category: "Titles",
        art: "titles",
        href: "#work",
        image: "",
      },
      {
        name: "Küpe — Stationery System",
        meta: "Branding · Print — 2024",
        category: "Branding",
        art: "stationery",
        href: "#work",
        image: "",
      },
      {
        name: "Tempo — UI Motion System",
        meta: "UI · Lottie — 2025",
        category: "UI",
        art: "ui",
        href: "#work",
        image: "",
      },
      {
        name: "Orbit — Brand Ident",
        meta: "Identity · Motion — 2024",
        category: "Identity",
        art: "ident",
        href: "#work",
        image: "",
      },
    ],
  },

  /* ---------- brand identity systems -------------------------------------
     One card per identity: the mark, the palette, the type pairing.
       monogram  — the letters shown on the coloured tile (or set `image`)
       color     — the tile background; markColor is the mark itself
       palette   — any number of hex values; hover reveals the codes
     ---------------------------------------------------------------------- */
  identity: {
    chip: "Brand & Identity",
    chipIcon: "palette",
    title: "Systems, Not Just *Logos*",
    intro:
      "Every identity ships as a working kit: marks, palette, type scale, motion rules and a guideline doc your team can use without me in the room.",
    items: [
      {
        name: "Meridian",
        year: "2026",
        scope: "Visual identity · Motion system",
        monogram: "M",
        color: "#0f2f2b",
        markColor: "#f5e9d0",
        palette: ["#0f2f2b", "#f0a32c", "#f5e9d0", "#c96a3b"],
        type: "Outfit / Source Serif",
        typeNote: "Display + editorial",
        note: "A navigation brand for a shipping-logistics platform. The mark is a compass rose that unfolds into a route line on load.",
      },
      {
        name: "Fold Studio",
        year: "2025",
        scope: "Rebrand · Wordmark",
        monogram: "FS",
        color: "#1b1815",
        markColor: "#f0a32c",
        palette: ["#1b1815", "#f0a32c", "#f7f2e9", "#6b7f6e"],
        type: "Söhne / Reckless",
        typeNote: "Grotesk + contrast serif",
        note: "Ten years of studio work under one wordmark, with a folding ligature that animates between the two Fs.",
      },
      {
        name: "Sabbia",
        year: "2025",
        scope: "Identity · Packaging",
        monogram: "SB",
        color: "#e5d3b3",
        markColor: "#2f2418",
        palette: ["#e5d3b3", "#2f2418", "#c96a3b", "#8a9a7b"],
        type: "GT Alpina / Suisse",
        typeNote: "Serif-led, print first",
        note: "A ceramics label built for the shelf first: warm neutrals, a hand-cut mark, and a label system that scales from a mug to a crate.",
      },
      {
        name: "Tempo",
        year: "2024",
        scope: "Product identity · Motion specs",
        monogram: "T",
        color: "#141b2d",
        markColor: "#7cc6ff",
        palette: ["#141b2d", "#7cc6ff", "#f7f2e9", "#f0a32c"],
        type: "Inter / JetBrains Mono",
        typeNote: "Product + code",
        note: "An app identity handed to engineering as tokens and Lottie files, not a PDF — the motion rules ship with the colour ones.",
      },
    ],
    deliverables: [
      "Logo & mark suite",
      "Colour system",
      "Type scale",
      "Brand guidelines",
      "Motion principles",
      "Social & ad templates",
      "Packaging",
      "Design tokens",
    ],
  },

  /* ---------- about ----------------------------------------------------- */
  about: {
    chip: "About Me",
    chipIcon: "dot",
    title: "Who is *Tintu Reji?*",
    image: "", // e.g. 'assets/img/about.jpg'
    paragraphs: [
      "I started in a broadcast basement cutting promos, then spent years on the other side of the brief — drawing the logos and building the systems the animation was meant to serve. I do both now, which is the point: an identity that was never tested in motion tends to fall apart the first time it has to move.",
      "A typical project runs from naming support and mark exploration through to the guideline doc, the launch film and the templates your team uses on a Tuesday. Illustrator and Figma for the static half, After Effects and Cinema 4D for the moving half.",
    ],
    signature: "Tintu Reji", // handwritten-style sign-off
    badge: {
      title: "10 years",
      note: "branding & motion for studios",
      icon: "star",
    },
    stats: [
      { value: 10, suffix: "+", label: "Years designing" },
      { value: 40, suffix: "+", label: "Identities shipped" },
      { value: 230, suffix: "+", label: "Spots delivered" },
    ],
    button: { label: "Download CV", href: "#contact", icon: "download" },
  },

  /* ---------- tools ------------------------------------------------------ */
  tools: {
    chip: "My Favourite Tools",
    chipIcon: "square",
    title: "Exploring the Tools *Behind My Work*",
    items: [
      { abbr: "Ai", name: "Illustrator", note: "Marks & type", color: "#310000" },
      {
        abbr: "Fig",
        name: "Figma",
        note: "Systems & handover",
        color: "#0acf83",
      },
      {
        abbr: "Ae",
        name: "After Effects",
        note: "Daily driver",
        color: "#00005b",
      },
      {
        abbr: "C4D",
        name: "Cinema 4D",
        note: "Modelling & lighting",
        color: "#0d2b45",
      },
      { abbr: "Id", name: "InDesign", note: "Guidelines & print", color: "#49021f" },
      { abbr: "Ps", name: "Photoshop", note: "Retouch & mockups", color: "#001e36" },
      { abbr: "Rs", name: "Redshift", note: "Rendering", color: "#b31b1b" },
      { abbr: "Hou", name: "Houdini", note: "Simulation", color: "#ff4713" },
      {
        abbr: "Bl",
        name: "Blender",
        note: "Quick turnarounds",
        color: "#e87d0d",
      },
      {
        abbr: "Lot",
        name: "Lottie",
        note: "UI handover",
        color: "#1a1a1a",
      },
    ],
  },

  /* ---------- services (accordion) --------------------------------------- */
  services: {
    chip: "My Services",
    chipIcon: "star",
    title: "How I Bring *Ideas to Life*",
    intro:
      "Day rate, fixed project fee, or a full identity package. Strategy and sketches always come before a single keyframe.",
    items: [
      {
        name: "Brand Identity Systems",
        icon: "grid",
        text: "The whole kit: positioning workshop, mark exploration, colour and type systems, art direction and a guideline document that stays useful after handover. Built to survive a marketing team, not just a portfolio shot.",
        tags: [
          "Identity design",
          "Art direction",
          "Guidelines",
          "Design tokens",
        ],
      },
      {
        name: "Logos, Marks & Wordmarks",
        icon: "pen",
        text: "Drawn, not generated — construction grids, optical corrections and a size range tested from favicon to building signage. Delivered with responsive lock-ups and every file format your printer will ask for.",
        tags: ["Logo design", "Wordmarks", "Monograms", "Lock-ups"],
      },
      {
        name: "Brand in Motion",
        icon: "compass",
        text: "The bridge between the two halves of my work: logo animation, brand idents and documented motion principles — easing, duration and choreography rules that make everything your brand does feel like the same brand.",
        tags: ["Logo animation", "Idents", "Motion principles", "Launch films"],
      },
      {
        name: "3D & CGI",
        icon: "layers",
        text: "Product loops, abstract environments and simulation work — modelled, lit and rendered in-house. Redshift for beauty, Houdini when physics has to do the acting.",
        tags: ["Cinema 4D", "Houdini", "Redshift", "Lookdev"],
      },
      {
        name: "Kinetic Typography",
        icon: "type",
        text: "Type that carries the message instead of decorating it. Social cutdowns, campaign beds and lyric work — built to survive being muted and watched at 20% screen size.",
        tags: ["After Effects", "Type design", "Social cutdowns", "Captions"],
      },
      {
        name: "Collateral & Packaging",
        icon: "book",
        text: "Where an identity actually meets people: packaging, stationery, decks, signage and social templates — set up as editable master files so your team can keep shipping without re-hiring me for every asset.",
        tags: ["Packaging", "Print", "Templates", "Artwork"],
      },
    ],
  },

  /* ---------- work history ----------------------------------------------- */
  journey: {
    chip: "Experience",
    chipIcon: "square",
    title: "My Award-Winning *Design Journey*",
    intro: "Full CV on request — it has more logos and fewer opinions.",
    items: [
      {
        when: "2022 — Now",
        role: "Freelance Brand & Motion Designer",
        where: "Independent — Barcelona & remote",
        text: "Direct-to-brand and studio overflow work. Identity systems, launch films and campaigns across Europe and the US, usually as the only designer on the job.",
      },
      {
        when: "2019 — 2022",
        role: "Senior Designer — Brand & Motion",
        where: "Fold Studio — Berlin",
        text: "Led identity and motion on rebrands for fintech and music clients. Built the studio's guideline template and its 3D pipeline, and mentored two juniors into mid-weights.",
      },
      {
        when: "2017 — 2019",
        role: "Motion & Graphic Designer",
        where: "Northlight — London",
        text: "Broadcast idents, sports packages and channel branding — plus a lot of very fast social cutdowns. Learned to animate to a deadline measured in hours.",
      },
      {
        when: "2016 — 2017",
        role: "Junior Editor & Animator",
        where: "Canal Vint-i-U — Barcelona",
        text: "Regional broadcast. Cut promos overnight, built the lower-third system, and discovered design was the part I actually wanted.",
      },
    ],
  },

  /* ---------- awards ------------------------------------------------------ */
  awards: {
    chip: "Recognition",
    chipIcon: "star",
    title: "Awards & *Mentions*",
    items: [
      {
        year: "2026",
        name: "Brand Impact — Shortlist",
        icon: "tag",
        text: "Visual identity of the year for *Meridian*, shortlisted in Transport & Logistics.",
      },
      {
        year: "2025",
        name: "Motion Awards — Gold",
        icon: "trophy",
        text: "Best Title Sequence for *Signal*, judged across 900+ entries.",
      },
      {
        year: "2024",
        name: "Site of the Day",
        icon: "stack",
        text: "Awwwards SOTD for the *Orbit* ident microsite and its motion system.",
      },
    ],
  },

  /* ---------- how you work ------------------------------------------------ */
  process: {
    chip: "My Process",
    chipIcon: "dot",
    title: "The Way *I Work*",
    steps: [
      {
        title: "Discover",
        text: "Who you're for, who you're against, and where this has to live. Audit and reference boards before anything gets drawn.",
      },
      {
        title: "Direction",
        text: "Two or three routes as real applications — never a logo floating on white. We pick one and I say why.",
      },
      {
        title: "Build & Animate",
        text: "Mark, palette, type and motion resolved together. Weekly WIPs, so you see it move long before it's finished.",
      },
      {
        title: "Hand Over",
        text: "Guidelines, master files, templates and every export you need, plus a handover call with your team.",
      },
    ],
  },

  /* ---------- testimonials ------------------------------------------------ */
  testimonials: {
    chip: "Testimonials",
    chipIcon: "star",
    title: "What Clients *Say*",
    intro:
      "Founders, creative directors and one very patient head of product.",
    items: [
      {
        text: "We got a logo, a full system and the launch film from one person, and none of it felt bolted together afterwards.",
        name: "Rosa Marchetti",
        role: "Founder, Meridian",
      },
      {
        text: "The only designer I've briefed who sends back a better idea than the one I asked for.",
        name: "Daniel Okonkwo",
        role: "Creative Director, Northlight",
      },
      {
        text: "The guidelines are the first ones our team has actually opened twice. The motion rules shipped as tokens, not a PDF.",
        name: "Saoirse Nolan",
        role: "Head of Product, Tempo",
      },
    ],
  },

  /* ---------- closing call to action -------------------------------------- */
  cta: {
    chip: "Available from September 2026",
    chipIcon: "dot",
    title: "Got a Brand *to Build?*",
    text: "A rebrand, a single mark, or ninety seconds of film — send a brief, a deck, or three sentences and a deadline.",
    buttonLabel: "", // blank = your email address
    buttonHref: "", // blank = mailto: your email
  },

  /* ---------- footer ------------------------------------------------------- */
  footer: {
    blurb:
      "Brand identity and motion design. Barcelona, and wherever the render farm is.",
    columns: [
      { title: "Site", from: "nav" }, // reuses the nav list above
      { title: "Elsewhere", from: "socials" }, // reuses the socials list above
      { title: "Contact", from: "contact", items: ["Remote worldwide"] },
    ],
    note: "Template. Fictional content.",
  },
};
