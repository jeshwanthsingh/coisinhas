# Chapter Two implementation plan

## Contract
Extend the museum at baseline 9270dc7. Preserve all three existing localStorage keys and the six exhibits, ending, cat secret, and Pages workflow. No remote push or deployment in this task. The supplied Chapter Two brief is the design specification.

## Decisions
- Use original SVG, native CSS, and accessible HTML controls; no added runtime library.
- App owns navigation and a separate versioned `coisinhas.after-hours.v1` state. Existing six-discovery saves qualify for the returning shortcut because the old release did not persist ending completion.
- Each experience is a full scene, not a text modal: radio with range/presets; windows with a draggable/keyboard light plus tap destination; atlas with ordered star buttons.
- Envelope becomes available only after three radio stations, windows, four constellations and the unnamed star. Secrets never gate it. All scenes remain replayable.
- Missing voice is determined by the build, avoiding a known-missing network request. Reuse the cassette, improve seeking, and provide an honest quiet absence message and recording guide.

## Slices and proof
- [x] A: inspect baseline, clean status, lint/build.
- [x] B: readable original text, independent cat replay, audio readiness. Verify original flow and absent audio.
- [x] C: additive state and room/navigation. Test corrupted storage, duplicate events, legacy unlock, reload.
- [x] D: radio, windows, atlas. Test each completion and pointer/touch/keyboard alternatives; language changes preserve state.
- [x] E: letter, doorway invitation and collar-star drawer secret. Verify prerequisites and replay.
- [x] F: inspect real screenshots at 375/390/430/1280/1440 and short screen; correct overlap/overflow.
- [x] G: lint, typecheck/build, state tests, production subpath browser run, source review, README/verification/voice guide.

## Scope and validation limits
No personal recording supplied at baseline. Real iOS hardware cannot be claimed from desktop emulation. 7–10 minutes is a design target, not a measured reading time. Keep all provided shared details, no inferred private history.

## Final refinements from verification
- Fresh visits keep the new invitation behind the original ending; only initial legacy six-discovery saves get the earlier shortcut.
- Atlas retracing resets the local drawing without removing saved discoveries.
- Certificate language contrast and desktop studio size corrected after screenshot inspection.
- Real recording still absent; temporary silent browser fixture tested existing controls and was removed from the test setup.
- Exact browser evidence and publishing limits are recorded in VERIFICATION.md. No remote changes made.
