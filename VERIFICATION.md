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
