# SAVATE — The Art of French Boxing

A cinematic, offline-ready six-slide English presentation about a traditional French sport. Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide React.

## Run locally

Requires Node.js 22.12+ (or Node.js 20.19+) and npm.

```sh
npm install
npm run dev
```

Open the local URL Vite prints. For a production build:

```sh
npm run build
npm run preview
```

Dependencies need an internet connection for the first installation. Once installed, the presentation runs without an internet connection. Fonts, photographs, icons, and application code are served locally; there are no remote requests or embedded media. Serve the build through a web server (`npm run preview`); do not open `dist/index.html` as a file URL.

## Presenting

- Right arrow or Space: next slide.
- Left arrow: previous slide.
- F: enter or exit browser fullscreen. Escape exits fullscreen and closes notes.
- N or the notebook button: toggle speaker notes, hidden by default.
- Click chapter labels/dots to jump to any slide, or use previous/next buttons. On the smallest phones, chapter dots are hidden to keep controls comfortable to tap.
- The first slide includes a start button; the last includes a restart button.
- Links `#1` through `#6` open individual slides.

Slides never advance automatically. Keyboard navigation respects focused buttons: Space activates a focused button, consistent with accessible native behavior. Fullscreen requires browser support; a helpful message appears if unavailable. Use the desktop browser's fullscreen menu on mobile browsers without the Fullscreen API. Speaker notes are visible to anyone viewing the presentation screen when enabled. The layout supports 1920×1080 projector displays, tablets, and phones. Reduced-motion preferences disable decorative animation and slide transitions. Very short displays can scroll vertically to preserve readable text.

## Photography and licensing

The slides use authentic Savate photography from Wikimedia Commons: World Championship competition and qualifiers (2013), a sport-approved Savate shoe, and an Agence Rol photograph of Victor Castérès demonstrating French boxing (1906), from the Bibliothèque nationale de France collection. No illustrated fighters or generated athletes are used.

Full attribution, source links, license links, and changes are in [public/assets/IMAGE-CREDITS.md](public/assets/IMAGE-CREDITS.md). The presentation links to an offline-readable HTML credits page. Original Commons metadata is preserved in `public/assets/source-metadata.json`. Competition and shoe images are CC BY-SA 3.0; the archive is public domain. The glove detail is an explicitly credited crop of the competition portrait. Photographic derivatives retain their source license.

WebP images have 800 px and 1600 px responsive versions and use `object-fit: cover`. All fonts and images are local: running the downloaded production build on a local server does not require internet. This does not install a service worker or promise offline reopening from a remote host.

The timeline uses broad eras rather than unsupported founding dates. The 1906 archive is captioned separately from the sport’s 19th-century development. The modern competition photographs are labeled 2013 rather than presented as current-season coverage.

Open Sans Condensed and Inter fonts are bundled locally under the SIL Open Font License. License notices are in `public/fonts/`. Lucide icons are ISC licensed.

## Structure

- `src/App.tsx`: presentation state, keyboard/fullscreen controls, slide content, responsive photographs, and notes.
- `src/styles.css`: visual direction, responsive layout, Tailwind integration, reduced-motion behavior.

`npm run build` runs strict TypeScript checking before generating the production build in `dist/`.
