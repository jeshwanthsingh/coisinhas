# coisinhas.

_um pequeno museu de nós_

A tiny illustrated apartment at night, built around six observations. Explore the can, eye-roll portrait, laptop, jabuticaba, television, and elusive cat. Finding all six opens an unfinished room about continuing to discover someone. The optional returning cat hides a confidential file. Portuguese is the default; English is available throughout.

React + TypeScript + Vite, plain CSS and original inline SVG. No routes, backend, database, analytics, external fonts, external images, trackers, embeds, or generated voice. The original chapter targets 4–7 minutes; the optional extension brings the combined design target to 7–10 minutes, depending on exploration. There is no forced minimum duration.

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
npm test
npm run build
npm run preview
```

`npm run build` type-checks before emitting `dist/`. The lockfile is committed so GitHub Actions can use `npm ci`.

## Chapter two: depois do fechamento.

After the original ending, a small lit doorway offers an optional second chapter. Returning visitors with all six discoveries also see a shortcut. The earlier version did not store whether its ending had been read, so six discoveries are the backward-compatible eligibility rule. Neither cat secret is required.

The new illustrated studio contains three replayable scenes, available in any order:

- **Central de dengo:** a wooden radio with a clickable dial, native tuning slider, keyboard controls, three station presets, a signal treatment, research stamp, and worm dilemma.
- **Duas janelas, um céu:** carry a light through the sky by dragging, using arrow keys, or tapping a window/button; discover a laugh, silence, and longing.
- **Mapa das coisinhas:** connect four original constellations using large star buttons or the next-star alternative, then discover an unnamed star.

Once all three are complete, a folded envelope unlocks a letter about ordinary things still ahead. The cat's paper-star collar leads to a separate optional drawer and certificate. The room becomes slightly warmer after the letter. The original museum, ending, and five-tap cat secret remain available.

The combined experience targets **7–10 minutes**; this is a design intention, not a measured visitor duration. Timed copy has a continue alternative, and reduced motion removes animation.

## Add your actual voice

The real recording is still absent. The existing cassette has play/pause, seeking, duration, playback-state animation, error handling, and an intentional skip. When no file exists, it shows a quiet visitor-facing message and makes no missing audio request.

See [VOICE_RECORDING_GUIDE.md](VOICE_RECORDING_GUIDE.md) for the complete suggested personal script and recording checklist. Place an actual AAC `.m4a` at `public/audio/coisinhas.m4a`, restart Vite, rebuild, and test the actual file on iPhone Safari. Audio presence is detected at Vite startup/build time. No synthesized voice is included.

## Bilingual copy and objects

Original copy lives in `src/content/museumContent.ts`; new chapter copy and constellation data live in `src/chapter/content.ts`. Every translated item has `{ pt: "…", en: "…" }`. Intentional shared English jokes remain English in both entries. Edit the `objects` array to change exhibit titles, body text, asides, or museum metadata. Keep object IDs stable: saved progress uses those IDs. The `words`, `eyeRolls`, and `ending` data contain the rest of the experience.

Language uses the `coisinhas.language.v1` localStorage key. Discoveries use `coisinhas.found.v1`; optional secret cat taps use `coisinhas.cat.v1`. Chapter two uses the separate versioned key `coisinhas.after-hours.v1` for availability, visits, distinct stations, completed windows and constellations, the unnamed star, letter completion, and the optional certificate. Storage contains only these local preferences/progress, never telemetry. Malformed saved values are ignored; blocked storage does not prevent a visit. Clearing this site’s storage starts a fresh collection.

The main cat moves twice, then opens its card on the third tap. After that, five additional taps on the returning cat reveal the optional file. It returns 4.5 seconds after a tap, and occasionally changes position while waiting. Modals pause its idle movement. Once unlocked, another cat tap reopens the file. A separate text button rereads the original cat exhibit without consuming secret taps.

## Publish updates to the existing GitHub repository

The existing repository is `jeshwanthsingh/coisinhas`. Do not initialize a replacement or overwrite history. These are manual owner steps; chapter two has not been pushed or deployed by this implementation.

```sh
cd "/Users/jeshwanthsingh/Documents/New project/coisinhas"
git status
git remote -v
npm ci
npm run lint
npm test
npm run build
git diff --check
git diff
```

Review the copy and optional recording, then stage the intended project changes:

```sh
git add README.md VERIFICATION.md VOICE_RECORDING_GUIDE.md CHAPTER_TWO_PLAN.md
git add src tests package.json package-lock.json vite.config.ts eslint.config.js .gitignore
# Only after personally reviewing the real recording, if added:
# git add public/audio/coisinhas.m4a
git commit -m "Add Coisinhas after-hours chapter"
git push origin main
```

In GitHub **Settings → Pages → Build and deployment → Source**, use **GitHub Actions**. Preserve the existing Pages configuration; do not switch to a branch or `/docs`. If `configure-pages` returns “Get Pages site failed”, check that Pages is enabled with that source, then rerun the failed workflow.

Under **Settings → Actions → General**, allow the official actions used by `.github/workflows/deploy-pages.yml`. The unchanged workflow uses separate build/deploy jobs, Node 22, `npm ci`, lint, build, configure-pages, artifact upload from `./dist`, and deploy-pages. Its permissions are `contents: read`, `pages: write`, and `id-token: write`; the deployment environment is `github-pages`. No custom token is needed.

After pushing, open **Actions → Deploy coisinhas to Pages**. Wait for both jobs to succeed and open the deployment link. If necessary, use **Run workflow → main**. The expected URL is:

[https://jeshwanthsingh.github.io/coisinhas/](https://jeshwanthsingh.github.io/coisinhas/)

The general project URL format is `https://<username>.github.io/<repository>/`.

## Relative assets and repository names

`vite.config.ts` sets `base: './'`. The HTML, generated JS/CSS, favicon, and voice recording therefore work below any repository path. No React Router or deep routes means refreshing the root Pages URL works without a SPA fallback. Use the trailing slash in the project URL.

Changing the repository name normally needs **no code change**. If you prefer a fixed base, change `base` to `'/YOUR_REPO/'`, including both slashes, and rebuild. The voice source already uses `import.meta.env.BASE_URL`.

## Privacy

**Assume a GitHub Pages deployment is publicly reachable.** A quiet design, an unshared URL, a private repository, and `noindex,nofollow` do not make this an authenticated private site. Search engines may ignore noindex. Anyone who can access the site can read its bundled copy and download the recording. A public repository also exposes its history.

The page title and social metadata are neutral. It contains first names only and has no contact details, private screenshots, location data, trackers, or external embeds. Review the copy and your recording before publishing. If actual access control is required, GitHub Pages in this configuration is not sufficient.

## Accessibility and verification

Objects are semantic buttons with descriptive names; the cat has an expanded hit area. Native dialogs trap focus, close with Escape, and return focus. Language controls expose pressed state. Discovery count is announced politely. Reduced motion disables ambient and transition animation and immediately reveals timed prose. Touch does not need hover or gyroscope access. There is no audio autoplay.

Browser results and visual evidence are documented in `VERIFICATION.md`. Screenshots are kept locally under `output/playwright/` (gitignored). A real iOS Safari check with the personal recording remains necessary before sending the link.

## Main source files

- `src/App.tsx`: original/new chapter entry and shared language state.
- `src/components/`: preserved museum illustrations, exhibits, original ending, and cassette.
- `src/chapter/AfterHours.tsx`, `Artwork.tsx`, `chapter.css`: second-room composition and scene navigation.
- `src/chapter/Radio.tsx`, `Windows.tsx`, `Atlas.tsx`: the three interaction models.
- `src/chapter/Letter.tsx`, `Certificate.tsx`, `Invitation.tsx`: letter, optional secret, and original-ending doorway.
- `src/chapter/content.ts`: bilingual chapter copy and original constellation coordinates.
- `src/chapter/state.ts`: validated, versioned progress and unlock rules.
- `tests/chapter-state.test.mjs`: distinct discoveries, invalid-save rejection, unlock gating, and backward-independent progress tests.

No runtime dependency was added. `@types/node` is a build-time TypeScript dependency for Vite's local audio-file check.
