<div align="center">

# 💌 my-love

**A heartfelt website template — built to be gifted.**

*Made with React + Vite + Tailwind. Deployed to GitHub Pages in minutes. No coding required to personalize.*

[![Use this template](https://img.shields.io/badge/Use_this_template-238636?style=for-the-badge&logo=github&logoColor=white)](https://github.com/N0ctaneDev/my-love/generate)
[![Live Demo](https://img.shields.io/badge/Live_Demo-b06080?style=for-the-badge&logo=githubpages&logoColor=white)](https://N0ctaneDev.github.io/my-love)

</div>

---

## What is this?

`my-love` is a personal surprise website you can gift to someone you care about. It walks them through three pages:

- **Home** — A soft hero landing with an animated emoji background and a message to draw them in.
- **Memories** — An auto-scrolling gallery of moments with little captions you write yourself.
- **Confess** — The final reveal: a question, a heartbeat moment, and a response they'll remember.

Everything that matters — names, colors, messages, photos — lives in one file: `__config__.jsx`. You don't need to touch any other code.

---

## Getting Started

### Step 1 — Create your own repo from this template

1. Click **"Use this template"** → **"Create a new repository"** at the top of this page.
2. On the next screen, make sure to check **"Include all branches"** — this is important. The `deployed-website` branch is what GitHub Pages will serve from.
3. Give your repo any name you like (e.g. `for-her`, `surprise`, `hey-you`).
4. Set visibility to **Private** if you want to keep it secret until you're ready. *(You can make it public later.)*
5. Click **"Create repository"**.

### Step 2 — Enable GitHub Pages

1. Go to your new repo → **Settings** → **Pages** (in the left sidebar under *Code and automation*).
2. Under **"Build and deployment"**, set the source to **"Deploy from a branch"**.
3. Set the branch to **`gh-pages`** and folder to **`/ (root)`**.
4. Click **Save**.

Your site will be live at `https://<your-username>.github.io/<repo-name>` within a minute or two after your first push.

### Step 3 — Personalize `__config__.jsx`

Open `__config__.jsx` at the root of the repo. This is the only file you need to edit.

```js
// !!!!-- REPLACE THIS WITH YOUR REPO NAME FIRST --!!!
export const _REPO = "your-repo-name-here"
```

> **This one is critical.** The build uses `_REPO` to set the correct base URL for GitHub Pages. If this is wrong, the site will load blank.

Here's a full reference for every option:

| Variable | What it does |
|---|---|
| `_REPO` | Your repo name (must match exactly) |
| `_name` | The browser tab title / site name |
| `_dearName` | Their name — used in messages with `` `${_dearName}` `` |
| `_bgEmoji` | The emoji that floats across the background |
| `_themeColor` | Accent color — use something light/pastel, the theme dims it automatically |
| `_HeroTitle` | The big opening line on the homepage |
| `_HeroPara` | The paragraph below it |
| `_MemoryGallerySpeed` | Scroll speed of the memory gallery (lower = slower) |
| `_MemoryMessages` | Array of memory cards, each with a `title` and `content` |
| `_ConfessRevealText` | The first line shown on the confession page |
| `_ConfessFinalText` | The big question — **no emojis here**, keep it clean |
| `_ConfessEmoji` | Emoji shown on the confession page |
| `_ConfessButtons` | The three response buttons (yes/no/maybe) |
| `_FinalText` | What shows when they say yes |
| `_FinalCompliment` | The line below it |
| `_FinalGif` | A GIF shown on top of those texts |

**Tip:** You can use `_dearName` inside any string using template literals:
```js
content: `I still think about that day, ${_dearName}.`
```

### Step 4 — Add memory photos

1. Put your photos inside `/public/memories/`.
2. Edit `/public/memories/index.json` to list the filenames:

```json
["photo1.jpg", "us_at_beach.png", "that_one_night.jpg"]
```

The gallery will pick them up automatically in that order.
> it needs atleast 7 images, or else no gallery, only the emoji BG

### Step 5 — Push and wait

Commit and push your changes to `main`. The GitHub Actions workflow will automatically build the site and push the output to the `deployed-website` branch.

```bash
git add .
git commit -m "personalize"
git push
```

Go to the **Actions** tab in your repo to watch the build. Once it's green, your site is live.

---

## Project Structure

```
my-love/
├── __config__.jsx         ← everything you need to change is here
├── public/
│   └── memories/
│       ├── index.json     ← list your photo filenames here
│       └── *.jpg / *.png  ← drop your photos here
├── src/                   ← React source (no need to edit)
├── .github/workflows/     ← auto-deploy on push to main
├── index.html
└── package.json
```

---

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- No react-router — page transitions handled with `useState`
- Canvas-based animated emoji background
- Auto-deployed to GitHub Pages via GitHub Actions

---

## Local Development

If you want to preview locally before gifting:

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

---

## License

GPL-3.0 — see [LICENSE](./LICENSE).

---

<div align="center">
<sub>made with something that felt too big to just say out loud</sub>
</div>