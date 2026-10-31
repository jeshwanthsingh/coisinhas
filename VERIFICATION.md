# Verification record — chapter two

Verified locally on **2026-10-12**, extending baseline `9270dc7`. This record supersedes the initial implementation notes dated 2026-10-01. The repository and earlier Pages deployment already existed; chapter two was **not committed, pushed, or deployed** in this task. Live GitHub deployment state was not rechecked.

## Build and source checks

- `npm install` / `npm install --save-dev @types/node@^22`: completed. Only build-time Node typings and their type dependency were added; no runtime dependency was added.
- `npm ci`: clean lockfile install passed; 226 packages audited, zero reported vulnerabilities. npm emitted a support/deprecation notice for the existing ESLint 9 dependency. Lint itself remains clean.
- `npm run lint`: passed with `--max-warnings 0`.
- `npm test`: **5/5 passed**. Covers fresh-state gating, deduplicated discoveries, complete journey without secrets, malformed persisted states, and revisiting without clearing discoveries.
- `npm run build`: TypeScript and Vite production build passed. Final output: about 295.31 kB JS / 93.14 kB gzip; 46.54 kB CSS / 11.74 kB gzip.
- `git diff --check`: passed.
- Parsed the unchanged Pages workflow using `js-yaml`; asserted main/manual triggers, separate build/deploy jobs, dependency, environment, permissions, and requested checkout/configure/upload/deploy action versions.
- Asserted relative generated asset references, noindex metadata, and absence of both `public/audio/coisinhas.m4a` and `dist/audio/coisinhas.m4a`.
- Reviewed the integration diff: original exhibit copy and IDs, all three old storage keys, artwork, and Pages workflow remain intact.

## Actual browser checks

Used the installed Playwright CLI with isolated Chromium contexts. Discovery flows used real buttons/ranges; stored-state fixtures were used only for explicit returning-visitor, malformed-save, and storage-unavailable scenarios. A touch-enabled mobile context used actual Playwright `tap()` events.

| Area | Observed result |
| --- | --- |
| Original museum | All six exhibits open; cat evades twice then opens on third tap; eye-roll labels respond; six discoveries persist |
| Original cat | New reread button opens its original card; five additional returning-cat taps still open the old confidential file |
| Original ending | Door and prose sequence work; deliberate audio skip reaches final words, signature, chair/cat, and collection status |
| Fresh entry gate | No chapter-two shortcut after six discoveries within a fresh visit; optional invitation appears after the original ending and records the unlock |
| Returning visitor | Old six-discovery save without a chapter-two key gets the shortcut; original cat counter and discoveries remain unchanged |
| Radio | Clickable dial, range/arrow keys, and presets switch stations; treatment meter, stamp, and both worm outcomes work; distinct count remains three |
| Windows | Mouse drag carries light from 0 to 100; Home/End keyboard controls work; large tap alternative works; three memories complete the scene |
| Atlas | Ordered star buttons and next-star keyboard alternative complete four constellations; unnamed star completes scene |
| Replay | Completed scenes reopen; constellation can be reset locally and traced again with saved progress unchanged |
| Letter | Disabled before prerequisites; unlocks after all three scenes with new secret still false; envelope opens, paper unfolds, continuation reveals signature and postscript |
| New optional secret | Cat reveals drawer; certificate opens; language changes inside dialog; Escape restores drawer focus; eye-roll response closes it |
| Language | PT and EN tested in scenes, letter, and certificate; mid-scene switching retains progress; language survives refresh |
| Storage | Refresh retains all chapter discoveries and original keys; invalid JSON falls back safely; denied storage does not break an exhibit visit |
| Keyboard | Range keys, Enter activation, scene navigation, dialog Escape, and visible solid focus outline verified |
| Reduced motion | No active browser animations observed in new scenes/letter; original ending immediately available |
| Audio absent | Intentional quiet message, no audio element/request, deliberate skip works; no developer placeholder |
| Audio controls | Browser-only five-second silent WAV fixture: no autoplay, click-to-play, visible pause state, pause, end state/time; range-capable response verified pointer seek to 2.5s and keyboard seek to 2.4s |

The audio test used a temporary development configuration and intercepted network bytes, not a file in `public/`. The configuration and test server were removed/stopped afterward. No real or synthesized voice was generated or bundled. This does not validate the encoding, audibility, or iOS compatibility of a future personal recording.

## Responsive checks

Checked original entrance/museum and all five chapter-two views (studio, radio, windows, atlas, folded letter) at:

- 375×812
- 390×844
- 430×932
- 1280×900
- 1440×1000
- 375×600 short viewport

No horizontal document overflow was observed. Original object targets remained at least 44×44 CSS pixels; new primary controls use 44–54px minimum dimensions, and the touch context completed all three new scenes. Short screens scroll naturally instead of shrinking the copy. New scene layout checks found no undersized controls after transitions settled.

## Production project subpath

Served the actual generated `dist/` beneath a local static root:

`http://127.0.0.1:4180/coisinhas/`

Ran the original six-object flow and ending, the new scene walkthrough, an old-save touch walkthrough, language changes, and refresh under this path. **No HTTP error responses or uncaught application errors were observed in these production flows.** The missing recording now creates no 404 request. Assets remain relative; no router fallback is needed.

Development-only Vite restart messages during source formatting were excluded from production results. One atlas automation attempt was interrupted by that reload and was rerun successfully against the settled app.

## Visual evidence

Screenshots are real browser captures under **`output/playwright/chapter-two/`** (gitignored), and representative mobile/desktop captures were actually inspected. Useful artifacts:

- `original-entrance-390x844.png` and `original-entrance-1440x1000.png`
- `02-museum-390.png`
- `03-after-hours-390.png` and `room-1440-final.png`
- `04-radio-390.png` and `radio-1440.png`
- `05-windows-390.png` and `windows-430x932.png`
- `06-atlas-390.png` and `atlas-1280.png`
- `07-folded-letter-390.png`
- `08-original-ending-390.png`
- `09-letter-ending-390.png`
- `certificate-en-390.png`
- `voice-absent-390.png`
- `audio-controls-fixture-390.png` (silent test response only)

The visual pass led to stronger certificate language contrast, a smaller desktop studio, a window hint moved clear of the lamp, readable original mobile copy, and a separate original-cat reread control. Some rapid viewport-resize captures showed compositor duplication at the bottom; DOM inspection confirmed one root and one header, and the final desktop studio was recaptured cleanly. Do not use those intermediate captures as shareable artwork.

## Remaining owner checks

1. Supply the actual personal recording using `VOICE_RECORDING_GUIDE.md`.
2. Test the real file on a physical iPhone/Safari, including interruptions and volume. Touch emulation is not a hardware test.
3. Review the copy/recording, then publish manually using README steps. Confirm the new GitHub Actions build/deploy and hosted URL after that push.
4. The 7–10 minute combined experience remains a design target, not a measured visitor study.

GitHub Pages should be assumed publicly reachable; noindex is not access control.


# Verification record — chapter three: Jogador 2

Verified locally on **2026-10-20**, extending baseline `e0f2ba7`. Chapter three was later committed and deployed (live at `88783d3`, confirmed 2026-10-31). Existing Pages settings and hosted deployment were not changed or rechecked.

## Phase gates

The required `npm run lint && npm test && npm run build` sequence passed after each implementation phase, before work began on the next:

| Phase | Result |
| --- | --- |
| 1 — state, title, hub, moon, entry | lint clean; 13 tests; production build passed |
| 2 — Extraction, letters, optional backup | lint clean; 14 tests; production build passed |
| 3 — needs, cheat, local frame | lint clean; 14 tests; production build passed |
| 4 — tree, daily notes, hearts, memories | lint clean; 14 tests; production build passed |
| 5 — achievements, credits, postcard | lint clean; 19 tests; production build passed |
| 6 — review, browser checks, docs | lint clean; 20 tests; production build passed |

State tests were first run against a stub reducer and failed as expected before implementation. During final review, an additional regression test exposed acceptance of impossible unselected/extracted saves; the validator was tightened and the test passed. Final tests include all five unchanged chapter-two tests, plus chapter-three gating, deduplication, date guards, 28-stage/10-heart caps, first-day completion, invalid saves, independent old state, cooldown, timezone/DST, lunar phase math, and normalized SHA-256 comparisons.

Final production output is approximately **338.91 kB JS / 108.95 kB gzip** and **59.03 kB CSS / 14.50 kB gzip**, including all three chapters. No runtime dependency or lockfile change. `git diff --check` passed. Existing chapter-one/two copy, original state modules/keys, hooks, audio handling, and Pages workflow are unchanged. The chapter-two UI diff only accepts and renders a doorway after the existing letter continuation. No personal audio file was added; generated assets remain relative and noindex metadata remains present.

## Production browser evidence

Served the actual production build at **`http://127.0.0.1:4183/coisinhas/`**, through a static server with the repository name in the path. Used Playwright Chromium, including isolated mobile touch contexts. Chapter-two completion fixtures were used to enter the new chapter; new progress was then earned through actual controls. A separate doorway check began with the chapter-two letter unread and completed its existing buttons.

| Area | Observed result |
| --- | --- |
| Entry | Fresh visitor has no chapter-three shortcut; unread chapter-two letter has no doorway; its continuation reveals the doorway and opens the save screen |
| Save slots / hub | Karol selectable; Jesh inactive; three scene controls and progress work; ending disabled before completion |
| Moon | Transition appears, current phase caption renders, southern drawing rotates 180 degrees; skip works; reduced motion omits transition |
| Modo Karol | All four care buttons fill their respective needs in a touch flow; cap at 100; moodlets change; unknown cheat rejects; mixed-case/space-padded `dengolode` fills all bars |
| Her frame | Editable note persists; WhatsApp URL contains the exact encoded note and no phone number; link was inspected, not sent |
| Extraction | Native range End key reaches destination; next-step touch alternative completes five steps; all five memory cards and all four letters open and close |
| Dialogs | Native modal, PT/EN changes inside, Escape closes and restores trigger focus; tabbing never reaches background controls (Chromium may tab to browser chrome between cycles) |
| Garden | First watering advances and disables repeat; gift card plus first watering completes scene; a simulated Curitiba-midnight boundary permits exactly the next calendar date |
| Memories | Heart threshold gates; reduced motion shows all lines immediately; final keep button records the memory |
| Ending | Full first-day journey unlocks with five hearts; first hug stays locked 0/1; credits render; keyboard focus moves to the credits heading; replay retains all progress |
| Persistence | Language, needs, loot, extraction, note, garden, and ending survive refresh under the project subpath; chapter-two saved state unchanged by chapter-three walkthrough |
| Invalid/blocked storage | Malformed chapter-three JSON falls back safely; denied chapter-three reads/writes still allow an in-memory visit and cheat interaction without uncaught errors |
| Keyboard | Tab/Enter-only entry, hub navigation, extraction steps, envelope opening; visible focus outline; Escape/focus restoration; range keyboard support |
| Reduced motion | No active animations observed in credits; interstitial omitted; memory prose static |
| Default network | No external requests, HTTP error responses, or uncaught application errors in the monitored touch walkthrough; absent backup button confirmed |

## Optional feature fixtures

A separate **gitignored fixture build** substituted a test-only postcard hash and test-only ntfy topic. It did not modify production source constants or the default `dist/` configuration.

- A trimmed, case-insensitive matching word used real browser Web Crypto and opened the postcard dialog. English switching worked. The shipped all-zero hash remains inactive.
- Intercepted ntfy requests verified the POST body `dengo solicitado ✧`, success message, immediate cooldown, reload persistence, retry after ten minutes, and a graceful 503 error. **No real notification was sent.** No external WhatsApp handoff was performed.
- A local cooldown is intentionally not authentication, authorization, or server-side rate limiting. The README explains the public topic and public bundled-letter limitations.

## Layout and visual inspection

Checked the hub and all three activities at **375×812, 390×812, 430×812, and 1440×900**. Title, ending, and dialog screenshots were also captured at mobile size; desktop captures cover the hub and activities/achievements. No horizontal document overflow was observed. New rendered buttons and form controls measured at least approximately 44×44 CSS pixels. Shorter displays scroll naturally.

Actual screenshots were captured and inspected, including title, hub, needs/frame, Extraction, argument letter, garden, credits, and desktop layouts. The pass aligned the moving light exactly with the drawn route, prevented overlap between hub hit areas, and set the cheat input to 16px to avoid iPhone’s small-input zoom behavior. Reduced-motion screenshots were used for stable layout inspection; an early moon capture caught its fade-in and should not be used as a final artwork reference.

Evidence is kept locally under **`output/playwright/chapter-three/`** (gitignored), including:

- `title-375.png`, `hub-375.png`, `hub-1440.png`
- `mode-375.png`, `karol-mode-1440.png`
- `extraction-375.png`, `extraction-mission-1440.png`, `fight-375.png`
- `farm-375.png`, `little-farm-1440.png`
- `achievements-375.png`, `achievements-1440.png`, `credits-375.png`
- `doorway-375.png`, `touch-complete-375.png`, `keyboard-375.png`, `moon-final-375.png`, `hub-final-1440.png`
- `postcard-fixture-375.png` (placeholder letter with test-only unlock)
- `checks.js`, `keyboard-storage.js`, `optional.js`, `final-browser-check.log`

## Remaining owner checks

1. Replace the two `TODO(jesh)` items: postcard hash (`src/chapter3/postcard.ts`) and personal bilingual postcard letter (`src/chapter3/content.ts`). Hash generation is documented in README.
2. Review the tender/teasing copy, especially `letters.fight`; it is deliberately easy to edit. No other personal facts need to be invented to finish the current flow.
3. Physical iPhone Safari, VoiceOver, real WhatsApp handling, and real ntfy device delivery were **not** tested. Chromium touch/keyboard checks do not establish these results.
4. Lunar phase is a documented synodic approximation, not an astronomical ephemeris or exact horizon orientation. Real visitors’ reading duration was not measured.
5. GitHub-hosted refresh/deployment has not been verified for this unpushed chapter; the production project-subpath check was local. No voice recording was added or tested in this task.


## Follow-up: repeated “I’m already here” screen — 2026-10-20

Retested the running development site at `http://127.0.0.1:5173/` with Playwright Chromium after the owner reported seeing the moon screen before every game. No application behavior was changed in this audit. Tests used isolated browser contexts and did not change the owner’s in-app browser saves.

**Finding:** this is the programmed interstitial, not a return to Karol’s save slot and not real resource-loading latency. `Player2.enter()` sets a pending destination for every transition; `MoonLoading` completes it after 1,400 ms. It also appears when returning to the hub. The selected game’s title is already visible during the interstitial, which can make the repeated screen feel like an unexpected intermediate page. Showing it only on chapter entry would reduce repetition, but would change the originally requested between-scenes behavior; this audit leaves that decision unchanged.

| Automatic transition | 375×812 | 1440×900 |
| --- | ---: | ---: |
| Karol mode | 1,561 ms | 1,829 ms |
| Extraction mission | 1,525 ms | 1,874 ms |
| Little farm | 1,469 ms | 1,834 ms |

Measurements run from the Playwright click command to visible game content and include browser/automation overhead, rather than measuring only the 1,400 ms timer.

Additional checks passed:

- All three illustrated-object targets and text navigation alternatives enter the correct game. Skip by button or Enter completes without waiting for the full timer; measured skip checks were below 900 ms including automation.
- Eighteen rapid double-click/skip/back round trips across mobile and desktop caused no wrong destinations or stale navigation. Focus returns to the correct room object and moves to the game heading after entry.
- Switching PT/EN during loading, enabling reduced motion mid-transition, and reloading during loading do not strand the app. Reduced motion skips the interstitial for all three games.
- Actual mobile taps fill all four needs, collect all five loot items, open all five memory cards and all four letters, water the tree, view the gift card, unlock first-day achievements, and reach/replay credits.
- Unknown cheats reject; whitespace/case-normalized `dengolode` works. The note enforces 280 characters, survives refresh, and produces the exact encoded WhatsApp draft URL without sending anything.
- Extraction resumes at its saved 40-percent pickup checkpoint; replaying the route does not duplicate loot or hearts. Watering stays disabled after a same-day reload. Needs, note, language, and full scene progress persist.
- Bilingual dialogs close with Escape and restore focus. Keyboard-only entry/navigation and denied-storage checks passed. Original chapter-two state remained unchanged through the new chapter flow.
- No horizontal overflow or undersized chapter controls in the tested activity layouts at 375, 390, 430, and 1440 pixels. Inspected fresh mobile screenshots of the repeated moon screen, Modo Karol, and garden.
- No uncaught application errors or HTTP error responses in monitored transition/gameplay contexts. No external requests during the default touch walkthrough.

Reran `npm run lint`, `npm test` (20/20), and `npm run build`: all passed. No commits or pushes. Physical iPhone Safari and VoiceOver remain untested.

Scripts, CLI logs, and screenshots for this follow-up are in the gitignored `output/playwright/karol-audit/` directory: `transitions.js`, `transitions.log`, `games-check.js`, `games-check.log`, `edges.js`, `edges.log`, and the mobile/desktop scene captures.


## Sunday experience — 2026-10-26

Baseline was clean `main` at `4ba9acc`. Baseline lint, 20 tests and build passed before implementation. This addition was later committed and deployed (live at `88783d3`, confirmed 2026-10-31). The existing deployment workflow, App, chapter-one copy, chapter-two reducer, chapter-three reducer and original voice component have no diff from that baseline.

### Implementation phases

1. **Inspect/protect:** confirmed React state navigation, safe storage hooks, relative Vite base and separate chapter keys. Recorded the design and checks in `SUNDAY_PLAN.md`.
2. **Basic experience:** added an independent strict state model, lazy calendar entry, original SVG apartment and user-paced opening. Inspected the 390px mobile composition before building the interaction branches.
3. **Meaningful choices:** rain/sun, alarm/cat responses, sushi/pasta with share/defend, comedy/drama and co-op/competitive interactions. Exercised all three activities via visible controls and verified unique saved progress and actual food outcomes.
4. **Emotional progression:** sofa/window positioning, three closeness states, optional cat, night cassette, deterministic bilingual postcard, local save/review/copy, ending/replay/museum return. Completed full PT/EN journeys.
5. **Polish:** corrected window-seat occlusion behind the sofa, increased the little game’s size, made leaning visibly meet, hid the daytime sun in rainy weather, tightened the desktop composition and separated overlapping object hit areas. Added explicit Tab wrapping after the keyboard audit found focus could reach browser chrome past the saved-card dialog’s last button.
6. **Verification:** all commands and browser checks below passed after the relevant fixes. No public deployment or voice recording was created.

### Commands and results

- `npm ci` — passed, 225 packages installed. npm emitted the existing ESLint 9.39.5 support/deprecation notice; no dependency versions were changed as part of this feature.
- `npm run lint` — passed, zero lint errors/warnings.
- `npm test` — **30 tests passed**, including all 20 existing tests. Sunday coverage includes gating, all activity types, deduplication, save/resume/replay, immutable state, malformed values, backtracking, all **192 single-activity combinations in both languages**, and multi-activity postcard ordering/outcomes.
- `npm run build` — passed. Sunday has its own lazy JS/CSS chunks (~29.45 KB JS / 10.06 KB CSS before gzip); no runtime dependency was added.
- `git diff --check` — passed.
- Local production server served the unchanged relative-base build at `http://127.0.0.1:4184/coisinhas/`, including lazy chunks. Production journey recorded no page errors or HTTP responses >=400. Refresh and subsequent re-entry resumed the saved Sunday scene.

### Browser proof

Playwright CLI drove Chromium using the actual rendered controls. Local reproducible scripts/logs and screenshots are in ignored `output/playwright/sunday/`:

- `journey.js` / `journey.log`: full journey at **390×844 and 1440×900**, every afternoon branch and variant, both weather/morning choices, both seats, all closeness choices, optional cat, missing audio, saved-card dialog, replay and museum/hub return. PT→EN during an activity and EN→PT during the ending worked. Saving kept the completed snapshot while restart cleared only the current day. Earlier chapter and cat saves remained unchanged.
- `edges.js` / `edges.log`: direct navigation to/from all three Chapter 3 games with **no moon interstitial**; malformed Sunday JSON recovery; refresh at sunset; return focus to the hub calendar; a full keyboard-only Sunday under reduced motion; zero running Sunday animations in reduced mode; clipboard contents matched the chosen day; 375/430 postcard layout; dialog Tab containment, Escape and focus restoration; a complete visit with all Storage reads/writes throwing; honest save-failure feedback; unchanged Player 2 save.
- `touch.js` / `touch.log`: fresh mobile Chromium contexts with `hasTouch: true`, `isMobile: true`, DPR 2 at **375×812 and 430×932**. Tapped real room hotspots, changed choices, completed one game, reached the ending without the other activities and returned to the museum. No horizontal overflow or overlapping room-object hit areas during the journey.
- Measured Sunday buttons at 390/1440: no rendered target below approximately 44×44px. Additional **1280×900** composition/overflow check passed.

### Visual evidence inspected

Inspected all 13 mobile and 13 desktop captures (the required 12 scenes plus leaning), and the additional 375/430 touch/postcard and 1280 desktop captures. Stable captures finish finite animations so text is not photographed halfway through its fade; normal-motion interactions were exercised separately.

`mobile-` and `desktop-` filenames: `01-entrance`, `02-rain`, `03-sun`, `04-food`, `05-tv`, `06-game`, `07-sunset`, `08-hands`, `08b-lean`, `09-quiet`, `10-cassette`, `11-postcard`, `12-ending`. Each has a `.png` extension. Also `touch-375.png`, `touch-430.png`, `postcard-375.png`, `postcard-430.png`, `desktop-1280.png`.

The room remains recognizable from morning to night; text sits outside the illustrated touch areas. Long postcards scroll naturally. No clipped Portuguese text or horizontal overflow was observed. All three closeness choices use equal controls and produce distinct figure arrangements.

### Remaining owner/device checks

- **Owner asset:** optional real `public/audio/domingo.m4a`. No file was fabricated. The absent-file path was tested and makes no audio request; actual play/pause/seek/codec behavior cannot be verified until Jesh supplies the recording. Installation and an editable script are in `DOMINGO_RECORDING_GUIDE.md`.
- **Not verified:** physical iPhone Safari, VoiceOver, the eventual real audio, real-person reading duration, or hosted GitHub Pages deployment at the time of writing (it has since deployed). Chromium touch emulation is not an iOS Safari claim.
- No new `TODO(jesh)` placeholders occur in Sunday code. The existing Chapter 3 owner-editable content and unrelated TODOs remain unchanged.

## O Esconderijo, Drop 1 — 2026-10-31

Baseline: clean `main` at `88783d3`; lint, 30 tests and build passed. Branch `feat/esconderijo-drop-1`, local commits only (not pushed or deployed).

- `npm run lint`, `npm test` (38/38: 30 existing + 8 new covering state, prune, "has new", draft filtering, ordering, card data) and `npm run build` pass.
- Chromium, dev server (drafts visible) at 390x844: hub entry shows "tem coisa nova no baú"; tap-through opening; crate; card dialog (focus trap, Escape, focus restored); ending after the first card; pinned-note reread; EN; hub entry still glows while cards remain unopened; no console errors, no non-local requests, no horizontal overflow, no target under 44px. Reduced motion showed all opening lines at once.
- Chromium, production build under `/coisinhas/` at 390x844, 375x600 and 1280x800: no draft cards, empty state shown, ending does not trigger, no console errors, no non-local requests, no overflow, no target under 44px.
- **Not verified:** physical iPhone Safari, VoiceOver, real cards (only 3 fake drafts exist), real-person reading time. Chapter 2/3 progress was seeded in localStorage to reach the hub.

