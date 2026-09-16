# Ryan Thomas — Personal Portfolio

A single-page, scroll-driven personal portfolio site inspired by [ollivere.webflow.io](https://ollivere.webflow.io/), built with plain HTML/CSS/JS so it's easy to edit and host for free (e.g. GitHub Pages).

## Structure

- `index.html` — all page content/sections
- `css/style.css` — design system (colors, type, layout) + responsive styles
- `js/main.js` — scroll reveals, sticky nav, mobile menu, Lottie hero animation
- `assets/lottie/portfolio-intro.json` — hero intro animation (exported from Webflow)
- `assets/resume/Ryan-Thomas-Resume.pdf` — downloadable resume, linked from the hero and contact sections

## Sections

Hero → About → Experience → Projects → Skills → Education → Contact

Project cards under **Projects** currently use placeholder "+ Add photo" tiles — swap in real photos later by replacing the `.placeholder-media` div in each `.project-card` with an `<img>` tag pointing at a file in `assets/images/projects/`.

## Local development

No build step required — just serve the folder statically, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploying (GitHub Pages)

1. Push to `main` (or your default branch).
2. In the repo settings, enable **Pages** → deploy from branch → root.
3. Done — no build step needed.

## Next steps / ideas

- Add real photos for each project card
- Write longer case-study pages for individual projects
- Add more work experience / projects as they come up
