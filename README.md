# Nehal S — Portfolio

A hand-built, six-page portfolio site. No framework, no build step, no template.
Open `index.html` in any browser and it runs.

## Pages

| File | What's on it |
|---|---|
| `index.html` | Home — hero, three doors, "currently" log |
| `about.html` | Bio, the story, four capabilities |
| `ventures.html` | AIRO + its 3 divisions, AIRO Media detail, SPREAD Media, Rotaract role |
| `work.html` | Four live projects (AIRO, Rotaract, SPREAD, HMS) with screenshots, plus the pipeline |
| `lab.html` | GitHub push dashboard — contribution heatmap, repos, deployments |
| `contact.html` | WhatsApp, email, and all ten channels |

## Structure

```
nehal-portfolio/
├── index.html  about.html  ventures.html
├── work.html   lab.html    contact.html
├── README.md
└── assets/
    ├── css/style.css     ← all styling for every page
    ├── js/main.js        ← all behaviour + the icon sprite
    ├── logos/            ← AIRO, AIRO Media/Farms/Events, SPREAD
    └── shots/            ← screenshots of the live sites
```

Every page shares `assets/css/style.css` and `assets/js/main.js`.
**Change the CSS once and all six pages update.**

## How to edit

**Your details** — phone, email, links — appear in each page's markup.
To change the WhatsApp number everywhere:

```bash
cd ~/Documents/nehal-portfolio
grep -rl "919743242161" . | xargs sed -i '' 's/919743242161/YOURNUMBER/g'
```

**Colours** live at the top of `assets/css/style.css` under `:root`:

- `--acc` — the orange accent
- `--airo`, `--media`, `--farms`, `--events`, `--spread`, `--rota` — brand colours per venture
- `--glass`, `--brd`, `--blur` — the frosted-glass look

**The GitHub heatmap** in `assets/js/main.js` holds a `LEVELS` string:
366 characters, one digit (0–4) per day, starting 10 Aug 2025.
To refresh it later, re-read the levels from
`https://github.com/users/NEHAL-S-DEVLR/contributions` and replace the string.
The tile numbers (79 / 23 / 7 / 9 / 5) are in `lab.html`.

**Screenshots** in `assets/shots/` were captured from the live sites.
To retake one:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --window-size=1440,900 --screenshot=assets/shots/rotaract.png \
  "https://nehals.me/Rotaract.mandya/"
```

## Publishing to nehals.me

You already own `nehals.me`, and it currently serves your
`NEHAL-S-DEVLR.github.io` repo. To put this site there, replace that repo's
contents with these files and push:

```bash
cd ~/Documents/nehal-portfolio
git init && git add -A && git commit -m "New portfolio"
git remote add origin https://github.com/NEHAL-S-DEVLR/NEHAL-S-DEVLR.github.io.git
git push -u --force origin main
```

Your existing project sites (`nehals.me/Rotaract.mandya/`, `/SPREAD-media/`,
and the rest) live in their own repos and are unaffected.

## Notes

- Fonts (Syne, Manrope, JetBrains Mono) load from Google Fonts, so text needs a
  connection to look right. Everything else works fully offline.
- If JavaScript doesn't run, nothing is hidden — the scroll animations are
  gated behind an `html.js` class, so the page stays readable either way.
- Respects `prefers-reduced-motion`.
