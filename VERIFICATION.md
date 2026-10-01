# Verification record

Verified locally on 2026-10-01. This records observed results, not a claim that the site has been deployed.

## Build and configuration

- `npm install`: completed; 224 packages audited, zero reported vulnerabilities. npm emitted an ESLint 9 support/deprecation notice; lint itself is clean.
- `npm run lint`: passed with `--max-warnings 0`.
- `npm run build`: TypeScript and Vite production build passed.
- Parsed `.github/workflows/deploy-pages.yml` with `js-yaml` and asserted the main push/manual triggers, separate build/deploy jobs, github-pages environment, requested permissions, official action versions, and dependency between jobs.
- Checked generated HTML for noindex metadata and relative asset references.
- No repository was created, no push was made, and no GitHub deployment was triggered.

## Browser checks

Used an isolated Chromium session through the installed Playwright CLI. Assertions exercised actual buttons and dialogs, not direct state injection for progression.

| Check | Observed result |
| --- | --- |
| Main room at 375×812, 390×844, 430×932, 1440×1000 | No horizontal overflow; all six main object targets at least 44×44 CSS px; no overlapping main object targets |
| Short screen at 375×667 | Room remains usable; no horizontal overflow |
| Opening at 320, 768, 800, 801, 1024, 1280 px | No horizontal overflow |
| Opening and ending at 375, 390, 430, 1440 px | No horizontal overflow |
| Six objects | All cards open; discovery set reaches six |
| Eye-roll frame | Individual emoji labels respond to interaction |
| Keyboard/dialog | Escape closes and returns focus to the originating object |
| Language | PT default; EN works in room, cards, unfinished prose, and ending; choice survives refresh |
| Progress | All six discoveries survive refresh and the door remains available |
| Main cat | Two evasions, card on third tap |
| Optional cat | Five returning taps open the confidential file; counter persists; eye-roll response shows “there she is.” and closes |
| Unfinished room | Door works; staged lines reveal; chapter controls advance the prose |
| Missing recording | Graceful placeholder; deliberate skip reaches ending |
| Audio present | Test-only silent WAV response verified no autoplay, play after click, visible pause state, pause, and continue after playback starts |
| Reduced motion | Timed text immediately available; zero active browser animations observed |
| Ending | Final line, signature, cat beside chair, and collection-status text appear |

No real voice was generated or bundled. The audio fixture existed only as a browser-intercepted test response.

## Production subpath

Copied `dist/` beneath a local static server root and opened:

```text
http://127.0.0.1:4173/coisinhas/
```

Repeated all six discoveries in that build, switched language, refreshed, and entered the unlocked room. JavaScript, CSS, favicon, and voice-note requests all remained below `/coisinhas/`. Inline SVG data URLs are self-contained assets, not network dependencies. The intentionally absent recording returns HTTP 404 and is handled by the placeholder; no uncaught application error was observed in the production flow.

## Visual evidence

Captured and inspected mobile and desktop screenshots. Artifacts live under `output/playwright/` and are gitignored. Useful captures include:

- `opening-390.png`
- `opening-1440.png`
- `card-390.png`
- `unfinished-390.png`
- `voice-placeholder-390.png`
- `audio-playing-390.png` (test response only)
- `ending-detail-390.png`

Some full-page captures exhibited browser capture/stitching artifacts. The DOM had one root, one header, and one ending; viewport-only captures were used to inspect the final detail. Do not use those stitched full-page captures as shareable artwork.

The visual pass led to separated can/laptop and cat/fruit touch targets, a door clear of the TV, more space between the unfinished-room illustration and its label, a small chair/cat ending detail on mobile, and a restrained pre-dawn palette.

## Remaining verification requiring the owner

1. Add the personally recorded AAC `.m4a` described in README.
2. Check that actual recording on a real iPhone in Safari, including play, pause, volume, and resuming after interruptions. Desktop Chromium and a test response do not prove physical iOS behavior or the encoding of a future file.
3. Create the repository, enable GitHub Pages with GitHub Actions, and confirm the first hosted build/deploy succeeds. Local subpath testing does not execute GitHub infrastructure.
4. Read the public-reachability warning in README before publishing intimate text or audio.
