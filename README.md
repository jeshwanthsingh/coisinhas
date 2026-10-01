# coisinhas.

_um pequeno museu de nós_

A tiny illustrated apartment at night, built around six observations. Explore the can, eye-roll portrait, laptop, jabuticaba, television, and elusive cat. Finding all six opens an unfinished room about continuing to discover someone. The optional returning cat hides a confidential file. Portuguese is the default; English is available throughout.

React + TypeScript + Vite, plain CSS and original inline SVG. No routes, backend, database, analytics, external fonts, external images, trackers, embeds, or generated voice. The usual visit is intended to take 4–7 minutes, depending on reading and exploration; there is no forced minimum duration.

## Local development

Use Node.js 22 (22.12+ recommended) or a supported newer LTS and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a clean install and production check:

```sh
npm ci
npm run lint
npm run build
npm run preview
```

`npm run build` type-checks before emitting `dist/`. The lockfile is committed so GitHub Actions can use `npm ci`.

## Add your actual voice

1. Personally record the note using Voice Memos on your iPhone or another recorder. Do not synthesize a voice.
2. Export/share the recording as an AAC-encoded `.m4a` file. Merely renaming an unrelated format to `.m4a` does not convert it.
3. Name it exactly `coisinhas.m4a` and place it at `public/audio/coisinhas.m4a` (lowercase).
4. Run `npm run dev`, discover the six objects, enter the door, and continue to the cassette. Tap **ouvir minha voz**. Confirm play/pause, duration, and audible sound.
5. Test the actual recording on iPhone Safari as well. Playback is called directly from a tap, and nothing autoplays. Test with the phone’s volume turned up.
6. Commit and push the recording. Vite copies it into `dist/audio/`. It uses the same relative project base as the rest of the site.

The app checks whether the file exists, handles missing/invalid audio gracefully, and lets the visitor intentionally skip. There is no bundled sample or artificial voice. Playing at least once also allows continuing; she does not have to finish the recording.

Suggested personal script:

> Oi, meu amor.
>
> Isso aqui é só pra você ouvir minha voz por um minuto.
>
> Não precisa responder nada.
>
> Só fica confortável aí.
>
> Eu ainda acho ridículo você estar tão longe.
>
> Mas eu gosto que, mesmo assim, a gente conseguiu virar parte do dia um do outro.
>
> E eu gosto de continuar descobrindo você, uma coisinha de cada vez.
>
> Durma quando você quiser dormir, minha teimosinha.
>
> Eu tô aqui.

## Bilingual copy and objects

All visitor-facing copy lives in `src/content/museumContent.ts`. Every translated item has `{ pt: "…", en: "…" }`. Intentional shared English jokes remain English in both entries. Edit the `objects` array to change exhibit titles, body text, asides, or museum metadata. Keep object IDs stable: saved progress uses those IDs. The `words`, `eyeRolls`, and `ending` data contain the rest of the experience.

Language uses the `coisinhas.language.v1` localStorage key. Discoveries use `coisinhas.found.v1`; optional secret cat taps use `coisinhas.cat.v1`. Storage contains only these local preferences/progress, never telemetry. Malformed saved values are ignored; blocked storage does not prevent a visit. Clearing this site’s storage starts a fresh collection.

The main cat moves twice, then opens its card on the third tap. After that, five additional taps on the returning cat reveal the optional file. It returns 4.5 seconds after a tap, and occasionally changes position while waiting. Modals pause its idle movement. Once unlocked, another cat tap reopens the file.

## GitHub repository and Pages

This directory is a standalone project. Make **this folder**, not its parent workspace, the repository root. The workflow assumes `package.json` and `.github/` are at the root.

1. On GitHub, create an empty repository, for example `coisinhas`. Do not initialize it with a README or license because this project already has files.
2. In your terminal, enter this project directory and run:

```sh
cd "/Users/jeshwanthsingh/Documents/New project/coisinhas"
git init -b main
git add .
git commit -m "Build coisinhas museum"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with the actual values. If you already initialized this folder, do not initialize or replace its remote again; check `git status` and `git remote -v` first.

3. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. Do not select a `/docs` folder or branch deployment.
4. Under **Settings → Actions → General**, ensure GitHub Actions and the official actions in the workflow are permitted. The workflow requests `contents: read`, `pages: write`, and `id-token: write`; no custom secret/token is needed.
5. Open **Actions → Deploy coisinhas to Pages → Run workflow → main → Run workflow** if the initial push ran before Pages was enabled. Future pushes to `main` deploy automatically.
6. Wait for both `build` and `deploy` jobs to finish successfully. The `github-pages` environment and deployment output link to the site.

Expected project URL:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

The workflow uses separate build/deploy jobs, Node 22, `npm ci`, lint, build, configure-pages, artifact upload from `./dist`, and deploy-pages. GitHub’s official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Relative assets and repository names

`vite.config.ts` sets `base: './'`. The HTML, generated JS/CSS, favicon, and voice recording therefore work below any repository path. No React Router or deep routes means refreshing the root Pages URL works without a SPA fallback. Use the trailing slash in the project URL.

Changing the repository name normally needs **no code change**. If you prefer a fixed base, change `base` to `'/YOUR_REPO/'`, including both slashes, and rebuild. The voice source already uses `import.meta.env.BASE_URL`.

## Privacy

**Assume a GitHub Pages deployment is publicly reachable.** A quiet design, an unshared URL, a private repository, and `noindex,nofollow` do not make this an authenticated private site. Search engines may ignore noindex. Anyone who can access the site can read its bundled copy and download the recording. A public repository also exposes its history.

The page title and social metadata are neutral. It contains first names only and has no contact details, private screenshots, location data, trackers, or external embeds. Review the copy and your recording before publishing. If actual access control is required, GitHub Pages in this configuration is not sufficient.

## Accessibility and verification

Objects are semantic buttons with descriptive names; the cat has an expanded hit area. Native dialogs trap focus, close with Escape, and return focus. Language controls expose pressed state. Discovery count is announced politely. Reduced motion disables ambient and transition animation and immediately reveals timed prose. Touch does not need hover or gyroscope access. There is no audio autoplay.

Browser results and visual evidence are documented in `VERIFICATION.md`. Screenshots are kept locally under `output/playwright/` (gitignored). A real iOS Safari check with the personal recording remains necessary before sending the link.
