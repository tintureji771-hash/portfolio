/* ==========================================================================
   ★ THIS IS THE ONLY FILE YOU NEED TO EDIT ★

   Everything on the page — text, links, projects, brand systems, jobs,
   education, quotes — comes from the object below. Change a value, save,
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
    title: "Tintu C Reji — Brand Guidelines & Visual Designer",
    description:
      "Tintu C Reji is a brand guidelines designer and visual designer based in Kerala, India — brand identity systems, guideline documents, editorial layout and motion graphics.",
    ogTitle: "", // blank = reuse title
    ogDescription:
      "Brand guidelines designer and visual designer. Identity systems, guideline documentation, editorial layout and motion graphics.",
    ogImage: "assets/img/og.svg",
    favicon: "assets/img/favicon.svg",
    url: "",
  },

  /* ---------- who you are (used all over the page) --------------------- */
  profile: {
    name: "Tintu C Reji",
    initials: "TR", // the little logo mark; blank = auto
    role: "Brand Guidelines Designer · Visual Designer",
    email: "tintureji@gmail.com",
    location: "Kerala, India — IST",
  },

  /* ---------- navigation ----------------------------------------------- */
  nav: [
    { label: "Reel", href: "#reel" },
    { label: "Work", href: "#work" },
    { label: "Projects", href: "#identity" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#journey" },
    { label: "Education", href: "#awards" },
    { label: "Contact", href: "#contact" },
  ],

  header: {
    cta: { label: "Let's Talk", href: "#contact" },
  },

  /* ---------- social links (header + footer) --------------------------- */
  socials: [
    { label: "Behance", icon: "behance", href: "https://www.behance.net/tintucreji" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/tintu-reji/" },
    { label: "Email", icon: "mail", href: "mailto:tintureji@gmail.com" },
  ],

  /* ---------- hero ------------------------------------------------------ */
  hero: {
    chip: "Brand Identity & Systems",
    chipIcon: "star",
    heading: "I'm *Tintu C Reji*",
    intro:
      "I design brand identities and the guideline systems that keep them consistent — logo usage, clear space, colour, typography and layout rules documented so any team can apply them without me in the room.",
    image: "", // e.g. 'assets/img/portrait.jpg'
    floats: ["Brand Guidelines", "Identity Systems", "Editorial Layout", "Motion Graphics"],
    seal: "Brand Guidelines · Visual Identity · Systems", // '' removes the spinning badge
    buttons: [
      { label: "View Portfolio", href: "#work" },
      { label: "Hire Me", href: "#contact", dark: true },
    ],
    socialsLabel: "Find me on",
    reviews: {
      // null removes the whole block
      count: "75-page",
      note: "brand guideline system documented end to end",
      rating: "", // e.g. '4.9 of 5' — adds the five-star row; blank hides it
      faces: ["GS", "RZ", "NZ"], // [] = auto from testimonials initials
    },
  },

  /* ---------- scrolling strip ------------------------------------------ */
  marquee: [
    "Brand Guidelines",
    "Brand Identity Systems",
    "Logo Usage & Clear Space",
    "Typography & Editorial Layout",
    "Grid & Layout Systems",
    "Visual Hierarchy",
    "Presentation Design",
    "Motion Graphics",
  ],

  /* ---------- showreel --------------------------------------------------
     Paste a Vimeo/YouTube embed URL or an .mp4 path into `embed` and the
     modal plays it. Left blank for now — the section still shows.
     ---------------------------------------------------------------------- */
  reel: {
    chip: "Watch — Nizhalattam",
    chipIcon: "play",
    title: "A Documentary on *Shadow Puppetry*",
    intro:
      "Nizhalattam — title identity and animated title sequence for a documentary on traditional shadow puppetry, from concept development through to final execution.",
    // Vimeo/YouTube *embed* URL or an .mp4 path.
    //   • must be the /embed/ form — a youtu.be or /watch?v= link will not
    //     load in an iframe, YouTube blocks it
    //   • autoplay=1 starts it when the modal opens, rel=0 keeps the
    //     end-screen suggestions to this channel
    embed: "https://www.youtube.com/embed/xu-XLWYgO-g?autoplay=1&rel=0",
    meta: [
      "Title Design · Motion Graphics",
      "After Effects · Premiere Pro · Illustrator",
    ],
  },

  /* ---------- portfolio grid --------------------------------------------
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
    title: "Identity, Layout *and Motion*",
    allLabel: "All",
    projects: [
      {
        name: "Green Square — Brand Guidelines & Visual Identity",
        meta: "Brand Identity · Guidelines — 2026",
        category: "Brand Identity",
        art: "mark",
        wide: true,
        href: "https://www.behance.net/gallery/252894607/Brand-Book-Green-Square",
        cta: "View on Behance",
        // Save the file into assets/img/ — until it exists you just see the
        // built-in artwork, no broken image.
        image: "assets/img/green-square-cover.jpg",
      },
      {
        name: "Green Square — Packaging & Applications",
        meta: "Branding · Packaging — 2026",
        category: "Branding",
        art: "stationery",
        href: "https://www.behance.net/gallery/252894607/Brand-Book-Green-Square",
        cta: "View on Behance",
        image: "assets/img/green-square-packaging.jpg",
      },
      {
        name: "Green Square — Colour & Type System",
        meta: "Branding · Systems — 2026",
        category: "Branding",
        art: "palette",
        href: "https://www.behance.net/gallery/252894607/Brand-Book-Green-Square",
        cta: "View on Behance",
        image: "assets/img/green-square-palette.jpg",
      },
      {
        name: "Reelz — Film Magazine",
        meta: "Editorial · Print — Academic",
        category: "Editorial",
        art: "wordmark",
        href: "https://www.behance.net/gallery/250105911/Magazine-Project-College-Project",
        cta: "View on Behance",
        image: "assets/img/reelz-cover.jpg",
      },
      {
        name: "Nizhalattam — Documentary Titles",
        meta: "Title Design · Motion — Academic",
        category: "Motion",
        art: "titles",
        href: "https://youtu.be/xu-XLWYgO-g",
        cta: "Watch on YouTube",
        // YouTube serves this thumbnail publicly — no download needed.
        image: "https://img.youtube.com/vi/xu-XLWYgO-g/maxresdefault.jpg",
      },
      {
        name: "Branded Video & Multimedia Content",
        meta: "Motion Graphics — 2024/25",
        category: "Motion",
        art: "bars",
        href: "#reel",
        cta: "Watch",
        image: "",
      },
    ],
  },

  /* ---------- selected projects ------------------------------------------
     One card per project: the mark, the palette, the type pairing.
       monogram  — the letters shown on the coloured tile (or set `image`)
       color     — the tile background; markColor is the mark itself
       palette   — any number of hex values; hover reveals the codes
     ⚠ The hex values and type pairings below are indicative — swap them for
       the exact ones from each project file.
     ---------------------------------------------------------------------- */
  identity: {
    chip: "Selected Projects",
    chipIcon: "palette",
    title: "Systems, Not Just *Logos*",
    intro:
      "Every identity ships as a working kit: logo suite, clear-space and minimum-size rules, colour and type systems, layout principles and a guideline document a team can actually implement.",
    items: [
      {
        name: "Green Square",
        year: "2026",
        scope: "Brand guidelines · Visual identity",
        monogram: "GS",
        // Set `image` to replace the monogram tile with a real logo shot.
        image: "assets/img/green-square-mark.jpg",
        color: "#1f4d2e",
        markColor: "#f5e9d0",
        palette: ["#1f4d2e", "#8bb174", "#f5e9d0", "#c96a3b"],
        type: "Display + editorial pairing",
        typeNote: "Retail & packaging",
        href: "https://www.behance.net/gallery/252894607/Brand-Book-Green-Square",
        linkLabel: "View the brand book",
        note: "A 75-page brand guideline system for an urban organic and healthy food retail brand — primary and secondary logo systems, clear-space and minimum-size rules, colour palette, typography hierarchy, imagery direction and tone of voice, extended across packaging, uniforms, signage, delivery vehicles, kiosks, websites, apps and advertising.",
      },
      {
        name: "Reelz",
        year: "Academic project",
        scope: "Film magazine · Editorial design",
        monogram: "RZ",
        image: "assets/img/reelz-cover.jpg",
        color: "#1b1815",
        markColor: "#f0a32c",
        palette: ["#1b1815", "#f0a32c", "#f7f2e9", "#6b7f6e"],
        type: "Editorial serif + grotesk",
        typeNote: "Print-first magazine",
        href: "https://www.behance.net/gallery/250105911/Magazine-Project-College-Project",
        linkLabel: "View on Behance",
        note: "A film-focused magazine — cover design, contents pages, feature layouts, biographical content, film history and awards sections — built on editorial design principles, grid systems, typographic hierarchy and page-to-page visual consistency.",
      },
      {
        name: "Nizhalattam",
        year: "Academic project",
        scope: "Title identity · Motion",
        monogram: "NZ",
        image: "https://img.youtube.com/vi/xu-XLWYgO-g/maxresdefault.jpg",
        color: "#2f2418",
        markColor: "#e5d3b3",
        palette: ["#2f2418", "#e5d3b3", "#c96a3b", "#8a9a7b"],
        type: "Cultural display type",
        typeNote: "Documentary titles",
        href: "https://youtu.be/xu-XLWYgO-g",
        linkLabel: "Watch on YouTube",
        note: "Title identity and animated title sequence for a documentary on traditional shadow puppetry — cultural references, typography, motion and composition carried from concept development through to final execution.",
      },
    ],
    deliverables: [
      "Logo & mark suite",
      "Clear space & minimum sizes",
      "Colour system",
      "Typography hierarchy",
      "Grid & layout systems",
      "Imagery direction & tone of voice",
      "Packaging & signage",
      "Presentation & social templates",
    ],
  },

  /* ---------- about ----------------------------------------------------- */
  about: {
    chip: "About Me",
    chipIcon: "dot",
    title: "Who is *Tintu C Reji?*",
    image: "", // e.g. 'assets/img/about.jpg'
    paragraphs: [
      "I'm a detail-oriented brand and visual designer currently working as a freelancer, with over two years of combined industry and academic experience across brand identity, brand guidelines, visual communication, motion graphics, editorial layout and multimedia design.",
      "Most of my work is translating brand concepts into structured visual systems — comprehensive guideline documents, presentation layouts, digital assets and branded applications across multiple touchpoints. Typography, visual hierarchy, layout systems and brand consistency are the parts I care about most. Illustrator, Photoshop, After Effects and Premiere Pro daily, with InDesign and Figma alongside them.",
    ],
    signature: "Tintu C Reji", // handwritten-style sign-off
    badge: {
      title: "2+ years",
      note: "brand, visual & motion design",
      icon: "star",
    },
    stats: [
      { value: 2, suffix: "+", label: "Years of experience" },
      { value: 75, suffix: "-page", label: "Brand guideline system" },
      { value: 6, suffix: "", label: "Design tools in daily use" },
    ],
    button: { label: "Get in Touch", href: "#contact", icon: "mail" },
  },

  /* ---------- tools ------------------------------------------------------ */
  tools: {
    chip: "My Toolkit",
    chipIcon: "square",
    title: "The Software *Behind My Work*",
    items: [
      { abbr: "Ai", name: "Illustrator", note: "Marks & type", color: "#310000" },
      { abbr: "Ps", name: "Photoshop", note: "Retouch & mockups", color: "#001e36" },
      { abbr: "Ae", name: "After Effects", note: "Motion graphics", color: "#00005b" },
      { abbr: "Pr", name: "Premiere Pro", note: "Video editing", color: "#2a0634" },
      { abbr: "Id", name: "InDesign", note: "Guidelines & print", color: "#49021f" },
      { abbr: "Fig", name: "Figma", note: "Layouts & handover", color: "#0acf83" },
      { abbr: "PPT", name: "PowerPoint", note: "Presentation design", color: "#b7472a" },
    ],
  },

  /* ---------- services (accordion) --------------------------------------- */
  services: {
    chip: "What I Do",
    chipIcon: "star",
    title: "How I Bring *Brands to Life*",
    intro:
      "Available for freelance projects, onsite or remote — from a single mark to a full guideline document.",
    items: [
      {
        name: "Brand Guidelines Development",
        icon: "book",
        text: "Structured guideline documents covering logo usage, clear space, minimum sizes, correct and incorrect applications, colour systems, typography, visual hierarchy, imagery and tone of voice — organised so complex brand information stays clear and implementation-ready.",
        tags: ["Guideline documents", "Logo usage rules", "Design system documentation", "Brand governance"],
      },
      {
        name: "Brand Identity Systems",
        icon: "grid",
        text: "Primary and secondary logo systems, colour palettes, typeface guidelines and visual identity application — built as a system so the brand holds together across every touchpoint rather than one hero lock-up.",
        tags: ["Identity design", "Logo systems", "Colour & typeface guidelines", "Brand consistency"],
      },
      {
        name: "Typography & Editorial Layout",
        icon: "type",
        text: "Grid and layout systems, typographic hierarchy, image placement and page-to-page consistency for magazines, reports and long-form documents — editorial precision applied to whatever the format asks for.",
        tags: ["Grid systems", "Typography", "Editorial design", "Print layout"],
      },
      {
        name: "Branded Applications & Collateral",
        icon: "layers",
        text: "Identities adapted across digital, print, packaging, signage, environmental graphics, merchandise, websites, mobile, social and advertising — plus mock-ups and marketing materials in Illustrator, Photoshop, InDesign and Figma.",
        tags: ["Packaging", "Signage", "Social & ad templates", "Mock-ups"],
      },
      {
        name: "Presentation & Digital Design",
        icon: "screen",
        text: "Presentation layouts, decks, digital assets and social media creatives built on the same grid and type discipline as the rest of the identity, so a slide looks like it came from the same brand as the packaging.",
        tags: ["Presentation design", "Decks", "Digital assets", "Social creatives"],
      },
      {
        name: "Motion Graphics & Video",
        icon: "play",
        text: "Motion graphics, branded videos, animations, transitions and title sequences — plus video editing, green-screen compositing, voice-over synchronisation and integration of 2D and 3D elements for multimedia and e-learning content.",
        tags: ["After Effects", "Premiere Pro", "Title sequences", "Compositing"],
      },
    ],
  },

  /* ---------- work history ----------------------------------------------- */
  journey: {
    chip: "Experience",
    chipIcon: "square",
    title: "My *Design Journey*",
    intro: "Freelance today, teaching yesterday, production before that.",
    items: [
      {
        when: "Apr 2026 — Now",
        role: "Freelance Brand and Visual Designer",
        where: "Self-Employed — Remote",
        text: "Brand identities, visual guidelines, presentation layouts, social media creatives and branded applications for independent and portfolio-based projects. Structured guideline documents covering logo usage, clear space, colour, typography, hierarchy, imagery and tone of voice, adapted across digital, print, packaging, signage and environmental graphics — from first concept through client feedback to final polished deliverables.",
      },
      {
        when: "Jun 2025 — Mar 2026",
        role: "Assistant Professor — Motion Graphics & Visual Communication",
        where: "Chetana College of Media and Performing Arts — Kerala",
        text: "Taught motion graphics, visual communication, graphic design, advertising design, animation principles, video editing and multimedia production to undergraduates. Built industry-oriented assignments around branding, visual identity, layout and portfolio development, and guided students in turning creative concepts into consistent visual systems.",
      },
      {
        when: "Feb 2024 — Jun 2025",
        role: "Motion Graphics Designer",
        where: "Maieutic Edutech Pvt. Ltd. — Bengaluru",
        text: "Motion graphics, branded videos, visual assets and multimedia content for clients including Dayananda Sagar University, Coursera and the National Instructional Media Institute. Applied established brand elements consistently across digital content, and worked with creative teams, content developers and subject-matter experts to turn information into clear visual narratives.",
      },
    ],
  },

  /* ---------- education & recognition -------------------------------------- */
  awards: {
    chip: "Education",
    chipIcon: "star",
    title: "Study & *Recognition*",
    items: [
      {
        year: "2023",
        name: "Master of Arts in Multimedia",
        icon: "trophy",
        text: "*University of Calicut* — Second Rank Holder. Graphic design, visual communication, animation, video production, branding and multimedia design.",
      },
      {
        year: "2021",
        name: "BSc Mathematics",
        icon: "book",
        text: "*University of Calicut* — bachelor's degree, and where the structural thinking behind the grid systems started.",
      },
      {
        year: "Languages",
        name: "English & Malayalam",
        icon: "globe",
        text: "Fluent in both, working comfortably with *remote and onsite* teams.",
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
        title: "Understand",
        text: "Requirements first — who the brand is for, where it has to live, and which touchpoints it needs to survive. References and audit before anything gets drawn.",
      },
      {
        title: "Concept",
        text: "Mark exploration and visual direction presented as real applications, not a logo on white, so the decision is made against how it will actually be used.",
      },
      {
        title: "Systemise",
        text: "Logo suite, colour, typography, grid and layout rules resolved together, then documented — clear space, minimum sizes, correct and incorrect usage.",
      },
      {
        title: "Hand Over",
        text: "The guideline document, organised source files, reusable assets and final deliverables, so your team can keep applying the brand consistently.",
      },
    ],
  },

  /* ---------- testimonials ------------------------------------------------
     ⚠ PLACEHOLDER QUOTES — replace the text, name and role with real ones
       before this goes live, or empty `items` to hide the section.
     ---------------------------------------------------------------------- */
  testimonials: {
    chip: "Testimonials",
    chipIcon: "star",
    title: "What Clients *Say*",
    intro: "Add a line from a client, a colleague or a course lead here.",
    items: [
      {
        text: "Quote goes here — what the project was, and what changed after it shipped.",
        name: "Client name",
        role: "Role, Company",
      },
      {
        text: "Quote goes here — something about the guidelines being clear enough to use without you.",
        name: "Client name",
        role: "Role, Company",
      },
      {
        text: "Quote goes here — a line about working style, turnaround or attention to detail.",
        name: "Client name",
        role: "Role, Company",
      },
    ],
  },

  /* ---------- closing call to action -------------------------------------- */
  cta: {
    chip: "Open to onsite & remote opportunities",
    chipIcon: "dot",
    title: "Got a Brand *to Build?*",
    text: "A full guideline system, a single identity, or a set of layouts — send a brief, a deck, or three sentences and a deadline. Kerala, India · +91 75618 80064.",
    buttonLabel: "", // blank = your email address
    buttonHref: "", // blank = mailto: your email
  },

  /* ---------- footer ------------------------------------------------------- */
  footer: {
    blurb:
      "Brand guidelines, visual identity and motion design. Kerala, India — available onsite and remote.",
    columns: [
      { title: "Site", from: "nav" }, // reuses the nav list above
      { title: "Elsewhere", from: "socials" }, // reuses the socials list above
      { title: "Contact", from: "contact", items: ["+91 75618 80064", "Onsite & remote"] },
    ],
    note: "Brand Guidelines Designer & Visual Designer.",
  },
};
