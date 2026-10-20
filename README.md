# coisinhas.

_um pequeno museu de nós_

A tiny illustrated apartment at night, built around six observations. Explore the can, eye-roll portrait, laptop, jabuticaba, television, and elusive cat. Finding all six opens an unfinished room about continuing to discover someone. The optional returning cat hides a confidential file. Portuguese is the default; English is available throughout.

React + TypeScript + Vite, plain CSS and original inline SVG. No routes, backend, database, analytics, external fonts, external images, trackers, embeds, or generated voice. The original chapter targets 4–7 minutes; chapters one and two together target 7–10 minutes. Chapter three is an additional optional visit, with a garden that can be revisited across days. There is no forced minimum duration.

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

## Chapter three: Jogador 2

Read the chapter-two letter through its continuation to reveal a controller doorway. After that, a second shortcut appears below the chapter-two shortcut on the main page. Selecting Karol’s save opens an illustrated co-op room; Jesh’s slot is a deliberately inactive “connected from far away” label. Existing chapters and their storage keys are preserved.

- **Mesma lua:** both city clocks use `Intl.DateTimeFormat`, including San Francisco daylight saving. The greeting follows `America/Sao_Paulo`. A 1.4-second, immediately skippable interstitial draws an approximate current lunar phase locally, using a 29.530588853-day synodic month from the 2000-01-06 new moon. Curitiba’s drawing is rotated 180 degrees as an illustrative hemisphere comparison, not a precise horizon orientation. Reduced motion omits the interstitial.
- **Modo Karol:** four needs, four illustrated care objects, changing moodlets, and a `~` console. `dengolode` fills all bars. Her 280-character museum note stays in browser storage; only explicitly following the WhatsApp link opens a URL-encoded draft. There is no phone number and nothing sends automatically.
- **Missão de Extração:** a native range works with drag, arrows, Home/End, or a next-step button. Five pickups become rereadable memory cards. Four sealed letters include the editable “quando a gente brigar” letter in `letters.fight` within `src/chapter3/content.ts`. Reaching Curitiba completes the mission.
- **Fazendinha:** water once per calendar date in Curitiba. Each watering advances one of 28 stages and shows one of 28 bilingual notes. Missing days changes nothing. Hearts equal waterings plus two for full needs plus two for extraction, capped at ten; 2/4/6/8/10 unlock rereadable memories. The farm completes at ten hearts **or** after the first watering plus viewing the gift card. The ending never requires waiting a month.
- **Conquistas:** unlocked after all three scenes complete; achievements are derived from progress. The first hug remains locked at 0/1, with no countdown. Credits reveal slowly, can be paused, and are static under reduced motion. “Jogar de novo” returns to the hub without deleting progress.

All new visitor-facing copy lives in `src/chapter3/content.ts` as `{ pt, en }`, including daily notes, letters, achievements, and the postcard letter. Original SVG lives in `Artwork.tsx`; no game assets or logos are used. State/reducer/validator live in `state.ts`, with local dates and lunar calculations in `time.ts`. The state key is **`coisinhas.player2.v1`**. It stores the selected slot, needs, cheat, local frame note, distinct loot/letters, extraction, tree stage/date, hearts, seen memories/gift/credits, postcard unlock, and optional backup cooldown. Achievements are not stored. Invalid saves fall back safely; denied storage permits the current visit but cannot preserve progress or notes after refresh.

### Optional backup signal

Disabled by default: without `VITE_NTFY_TOPIC`, the button is not rendered and no ntfy request is made. To enable locally, create a gitignored `.env.local`:

```dotenv
VITE_NTFY_TOPIC=YOUR_LONG_RANDOM_TOPIC
```

Restart Vite or rebuild. For GitHub Pages, a local `.env.local` is not included in the Actions build: set a repository Actions variable named `VITE_NTFY_TOPIC` and explicitly map it into the build step’s `env` when you choose to enable this feature. This task does not change the workflow or account settings. For example, add this to the existing build step:

```yaml
env:
  VITE_NTFY_TOPIC: ${{ vars.VITE_NTFY_TOPIC }}
```

Subscribe to that topic using your own ntfy client. A button press POSTs `dengo solicitado ✧` to `https://ntfy.sh/<topic>`. Each attempt starts a ten-minute local cooldown, including failures, and repeated clicks/reloads during the cooldown are blocked. This is a convenience limit, not server-side abuse prevention. The UI acknowledges service errors; it cannot confirm that a device received or read the notification.

**The topic must be hard to guess, but it is not secret:** Vite embeds it in public JavaScript, and anybody inspecting the site can find it and potentially publish to or subscribe to the topic. Do not put sensitive content in notifications or use the topic as authentication. Enabling this feature opts into an external service that receives the request and ordinary connection metadata. The default site has no such requests. WhatsApp also receives the note when the visitor deliberately opens the sharing link.

### Your postcard word

The all-zero placeholder hash in `src/chapter3/postcard.ts` keeps this Easter egg inactive. Generate a SHA-256 digest of your chosen word (lowercased and trimmed) locally:

```sh
node -e 'const {createHash}=require("node:crypto"); console.log(createHash("sha256").update(process.argv[1].trim().toLowerCase()).digest("hex"))' 'YOUR_POSTCARD_WORD'
```

Replace only `POSTCARD_HASH` with the resulting 64-character hex digest. Never put the plaintext word in application source. Entering the matching word in the `~` console opens the extra dialog and saves its unlock; the console then offers a reread button. `dengolode` is reserved for the public needs cheat, so choose a different word. Web Crypto requires HTTPS (or localhost for development).

Replace `postcardLetter` in `src/chapter3/content.ts` with your personal letter in both languages. These are the two marked `TODO(jesh)` items. The hash avoids storing the word directly; it does **not** make the bundled letter private, and short words can be guessed offline. The same public-site privacy warning applies to all chapter copy.

## Add your actual voice

The real recording is still absent. The existing cassette has play/pause, seeking, duration, playback-state animation, error handling, and an intentional skip. When no file exists, it shows a quiet visitor-facing message and makes no missing audio request.

See [VOICE_RECORDING_GUIDE.md](VOICE_RECORDING_GUIDE.md) for the complete suggested personal script and recording checklist. Place an actual AAC `.m4a` at `public/audio/coisinhas.m4a`, restart Vite, rebuild, and test the actual file on iPhone Safari. Audio presence is detected at Vite startup/build time. No synthesized voice is included.

## Bilingual copy and objects

Original copy lives in `src/content/museumContent.ts`; new chapter copy and constellation data live in `src/chapter/content.ts`. Every translated item has `{ pt: "…", en: "…" }`. Intentional shared English jokes remain English in both entries. Edit the `objects` array to change exhibit titles, body text, asides, or museum metadata. Keep object IDs stable: saved progress uses those IDs. The `words`, `eyeRolls`, and `ending` data contain the rest of the experience.

Language uses the `coisinhas.language.v1` localStorage key. Discoveries use `coisinhas.found.v1`; optional secret cat taps use `coisinhas.cat.v1`. Chapter two uses the separate versioned key `coisinhas.after-hours.v1` for availability, visits, distinct stations, completed windows and constellations, the unnamed star, letter completion, and the optional certificate. Storage contains only these local preferences/progress, never telemetry. Malformed saved values are ignored; blocked storage does not prevent a visit. Clearing this site’s storage starts a fresh collection.

The main cat moves twice, then opens its card on the third tap. After that, five additional taps on the returning cat reveal the optional file. It returns 4.5 seconds after a tap, and occasionally changes position while waiting. Modals pause its idle movement. Once unlocked, another cat tap reopens the file. A separate text button rereads the original cat exhibit without consuming secret taps.

## Publish updates to the existing GitHub repository

The existing repository is `jeshwanthsingh/coisinhas`. Do not initialize a replacement or overwrite history. These are manual owner steps; chapter three is left uncommitted and has not been pushed or deployed by this implementation.

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
git add README.md VERIFICATION.md CHAPTER_THREE_PLAN.md
git add src tests package.json package-lock.json vite.config.ts eslint.config.js .gitignore
# Only after personally reviewing the real recording, if added:
# git add public/audio/coisinhas.m4a
git commit -m "Add Coisinhas Player 2 chapter"
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

The page title and social metadata are neutral. It contains first names only and has no contact details, private screenshots, addresses, trackers, or external embeds. Chapter three names San Francisco and Curitiba as explicitly chosen city-level context; it contains no live location tracking. Review the copy and your recording before publishing. If actual access control is required, GitHub Pages in this configuration is not sufficient.

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
- `src/chapter3/`: chapter-three shell, title, hub, three activities, achievements, original SVG, copy, time helpers, postcard verification, and independent state.
- `tests/player2-state.test.mjs`, `tests/player2-time.test.mjs`: chapter-three reducer, malformed saves, independent old state, timezone/moon math, and postcard digest tests.
- `tests/chapter-state.test.mjs`: distinct discoveries, invalid-save rejection, unlock gating, and backward-independent progress tests.

No runtime dependency was added. `@types/node` is a build-time TypeScript dependency for Vite's local audio-file check.
