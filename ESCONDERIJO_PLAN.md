# O Esconderijo, Drop 1: plan

Baseline: clean main at 88783d3 (lint, 30 tests, build pass). Branch `feat/esconderijo-drop-1`. Local commits only; no push or deploy.

## Shape
A lazy-loaded Jogador 2 hub scene (`Scene = "esconderijo"`), same pattern as Sunday. State `coisinhas.esconderijo.v1` = `{ version, seen[], openingDone, endingSeen }`. Cards are data in `src/esconderijo/cards.ts`; drafts are filtered out of production by the pure `visibleCards(list, dev)` (called with `import.meta.env.DEV` from `published.ts`, so it is testable without Vite).

## Phases (lint + test + build after each)
- [x] a) state + tests + content skeleton + hub entry + lazy shell
- [x] b) room artwork + opening
- [x] c) crate + cards + dialog + "new" logic + empty state
- [x] d) ending + polish + reduced motion + language
- [x] e) docs (guide, README section, VERIFICATION entry, stale-line fixes)
- [x] f) production build under /coisinhas/ in Playwright at 390x844, 375x600, 1280x800

## Decisions
- Unknown saved ids are pruned on read (`prune`), so removing a card never breaks a save.
- The hub entry reads the save read-only (`readEsconderijo`) and never writes it.
- No real memories: exactly 3 `draft: true` placeholder cards. Ending only triggers after a card is opened and closed, and only if a published card exists.
