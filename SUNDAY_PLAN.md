# O domingo que ainda não aconteceu — implementation plan

Baseline: clean main at 4ba9acc, 2026-10-26. Baseline lint, 20 tests and build passed. Existing chapters use React state navigation, independently validated useSaved keys, relative Vite assets and build-time audio detection.

## Design contract
One original SVG apartment stays mounted as the day changes: broad window, window seat, lilac sofa, breakfast table, TV/books, lamp, plant, two featureless storybook silhouettes, blanket and cat. A portrait-friendly composition keeps objects large; readable choices sit immediately below the room. Cream/blue morning, soft afternoon, amber/lilac sunset, indigo evening. No new runtime dependency. CSS responds to choices; progression never waits for animation.

Sunday loads lazily from a calendar in the existing Player 2 hub. Its state is independent (`coisinhas.sunday.v1`), including the current scene and a separately saved latest postcard. Replay clears the current day but keeps the saved postcard. No account or cross-device claims. Exit returns to the hub; ending also offers the original museum.

Postcards use complete bilingual sentences for every weather/morning/activity/outcome/location/closeness choice. They describe an imagined day, never a real shared memory. Saving is local with truthful failure feedback; optional clipboard copy never sends a message.

The moon interstitial is kept for title -> hub only. Other Player 2 transitions are immediate. Existing reducers and keys remain unchanged. Separate optional domingo.m4a detection leaves the original voice component untouched.

## Vertical slices and evidence
- [x] 1. Inspect current code, clean tree and baseline checks.
- [x] 2. Validated state/tests, lazy hub entry, persistent apartment, opening/navigation; mobile browser inspection.
- [x] 3. Weather/alarm and distinct food/TV/game interactions; branch checks.
- [x] 4. Sunset/closeness, optional real audio, deterministic postcard and ending; first-visit walkthrough.
- [x] 5. Art, transitions, language, keyboard and reduced-motion polish.
- [x] 6. npm ci/lint/test/build/diff; static /coisinhas/ browser verification, 12 mobile and desktop views inspected, README/recording guide/verification record.

Do not commit, push, change hosting, generate voice, or send messages. Personal recording is the only owner-supplied asset. Physical iPhone Safari and the eventual real recording must be reported separately from browser emulation.
