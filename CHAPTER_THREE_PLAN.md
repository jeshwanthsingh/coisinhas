# Chapter three — Jogador 2

## Contract
Extend e0f2ba7 locally. No commits, push, deployment, new runtime dependencies, or voice asset. Preserve chapters 1/2 and all their stored data. Only additive doorway integration may touch chapter two.

## Design and decisions
- Palette: night #172230, indigo #29384b, paper #e2d3b7, lamp #d8b87c, lilac #ae9ab9, leaves #82967b. Georgia titles, existing human sans body, small monospace game labels. No copied game art or neon arcade UI.
- Title: two physical save cartridges. Hub: original room with a desk, map case and balcony tree. Scenes use distinct object interactions, native controls and paper dialogs.
- State: separate coisinhas.player2.v1. Hearts = min(10, waterings + 2 for full needs + 2 for extraction). First watering plus gift card also completes the farm. Nothing decays.
- Dates/clocks: Intl with America/Sao_Paulo and America/Los_Angeles. Watering uses real calendar dates and rejects duplicate/backward dates. Moon is an approximate local synodic calculation; the south-view illustration is rotated 180 degrees as requested.
- No notification request without an explicit button press. Optional ntfy topic is public build-time configuration, not a secret. Cooldown persists in chapter state; mocked requests only in verification.
- Postcard: lowercase/trim then SHA-256; placeholder digest disables unlock until replaced. Hash and letter are editable; no plaintext secret word is stored.

## Phases (lint + test + build after every phase)
- [x] 1. State tests, strict reducer, copy foundation, title/hub, moon transitions, additive entry.
- [x] 2. Extraction, memory pickups, sealed letters; optional backup last.
- [x] 3. Modo Karol, needs/moodlets, cheat console, local frame and deliberate WhatsApp handoff.
- [x] 4. Daily tree, 28 notes, hearts, memories and gift card.
- [x] 5. Derived achievements, credits and postcard digest/dialog.
- [x] 6. Production subpath, mobile/desktop, keyboard/reduced-motion, screenshots; docs and TODO inventory.
