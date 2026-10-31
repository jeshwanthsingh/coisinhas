# O Esconderijo — add a new card in 2 minutes

Every card is one block in `src/esconderijo/cards.ts`. Nothing else needs to change.

1. Open `src/esconderijo/cards.ts` and copy the last block in the `cards` array.
2. Paste it at the **top** of the array and change:
   - `id`: new, short, never reused (e.g. `"first-extraction"`). Saves remember opened cards by this id.
   - `addedOn`: today, `YYYY-MM-DD`. Newest date shows first.
   - `rarity`: `"comum"`, `"raro"` or `"lendario"`. It is a joke, not a ranking of moments.
   - `icon`: one name from the list below.
   - `title`, `story` (shown on the front, as short lines (one per sentence)), `noticed` (the back of the tag, one line about her), each with `pt` and `en`.
   - Delete the `draft: true` line (drafts only show in `npm run dev`).
3. Run `npm test`. It checks unique ids, dates, icons and that every text field has both languages.
4. Commit. Push when you are ready; the existing Pages workflow publishes it.

When a card is published and she has not opened it, the hub entry and the crate show "tem coisa nova no baú" until she does.

## Icons
`backpack`, `flare`, `zipline`, `key`, `battery`, `musicbox`, `duck`, `can`, `collar`, `star`, `bolt` (heart-shaped), `map`.
A new icon is a new entry in `src/esconderijo/Artwork.tsx` plus its name in `iconNames` in `cards.ts`.

## Content rules
Only real moments, only what you noticed. No hugs, dates or kisses as memories (hopes only), no promises or labels she has not made, no guilt, nothing she has to answer. First names and city-level only: the site is public.

## Placeholders to replace
The three `draft: true` cards (`draft-1`, `draft-2`, `draft-3`) are fake. Replace or delete them. In production they never appear, so with no published card the crate shows its empty state and the ending does not trigger.
