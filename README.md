# Project SWE — The Midnight Surprise

A static, mobile-first birthday website starter.

## Run locally
Open `index.html` in a browser. For best results, use VS Code Live Server or run:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Add the 14 PDF photos
The PDF itself was not available in the current working files when this starter was generated. Export its pages as JPG/PNG images, then place them in `assets/memories/` using these filenames:

- `memory-1.jpg` through `memory-3.jpg` — childhood chapter
- `portrait-1.jpg` through `portrait-5.jpg` — portrait chapter
- `couple-1.jpg` through `couple-6.jpg` — couple chapter (including the two additional moments)

You can choose which source PDF page goes into each slot. The layout automatically displays any correctly named image.

## Personalise the letter
Edit the `letter-message` block in `index.html` (or the text instructions in `script.js`) with your own message.

## Password note
The current password gate is a client-side convenience gate, not strong security. The password is visible in `script.js` to anyone who inspects the site files. Anyone with the link may be able to bypass it. For a genuinely private site, add server-side authentication before deployment.

## Music
The site embeds YouTube video `2SiWMD0nKFQ`. Playback is initiated by the visitor using the music control because browsers restrict autoplay.

## Deploy
This is a static site and can be deployed to Vercel, Netlify, or GitHub Pages. Keep the whole folder structure intact.
