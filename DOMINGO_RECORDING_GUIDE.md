# Domingo — a recording in Jesh’s own voice

This optional recording belongs to **O domingo que ainda não aconteceu**. It is separate from the original museum cassette. The experience is complete without it and uses a quiet, visitor-facing fallback. No recording or generated voice is supplied.

## Record and export

1. Edit the suggested Portuguese script below until it sounds like you. Record your actual voice in a quiet room, at a comfortable speaking distance from your phone. Leave natural pauses; no music is needed.
2. Listen once for clipping, loud breaths and abrupt cuts. Keep it relaxed rather than performing a speech.
3. Export **AAC audio in an MPEG-4 `.m4a` container**. Voice Memos usually exports this format. Renaming an MP3 or WAV extension does not convert it. A mono 44.1 or 48 kHz recording is sufficient; 96–128 kbps is plenty for speech.
4. Name it exactly `domingo.m4a` (lowercase) and copy it to `public/audio/domingo.m4a` in this repository. Keep `coisinhas.m4a` unchanged.
5. Restart the Vite development server, then run `npm run build`. Presence is checked at Vite startup/build time, so adding the file to an already-running server is not enough.
6. Open the Sunday from the Chapter 3 calendar and reach evening. No audio should play on arrival. Tap the cassette, then the play button. Check play/pause, seeking, ending and leaving the scene. Check on **physical iPhone Safari** using the real file.
7. Once you approve publication, include the recording in the same normal commit/push as the site, or in a later commit. GitHub Pages serves it at `https://jeshwanthsingh.github.io/coisinhas/audio/domingo.m4a`. It is publicly reachable, just like the site; `noindex` is not access control.

## Editable Portuguese script

"Oi, meu amor.

Sabe uma coisa engraçada?

Eu fico imaginando como seria passar um dia completamente normal com você.

Nada extraordinário.

Talvez a gente ficasse em casa, assistisse alguma coisa, comesse alguma besteira e discutisse sobre quem é mais teimoso.

Provavelmente você ganharia essa discussão.

Mas acho que é justamente isso que eu gosto de imaginar.

Não precisa ser um dia perfeito.

Eu só gosto da ideia de ter você por perto.

A gente ainda não viveu essas coisinhas juntos.

Mas eu gosto de pensar que um dia a gente pode viver.

Um beijo, minha teimosinha.

Do seu amorzinho."

## English meaning

"Hi, my love.

You know something funny?

I keep imagining what it would be like to spend a completely normal day with you.

Nothing extraordinary.

Maybe we'd stay home, watch something, eat something silly, and argue about who's more stubborn.

You'd probably win that argument.

But I think that's exactly what I like imagining.

It doesn't have to be a perfect day.

I just like the idea of having you nearby.

We haven't experienced these little things together yet.

But I like thinking that one day we might.

A kiss, my stubborn little girl.

From your amorzinho."

## If something fails

- Missing file: the cassette offers a quiet message and continuing still works. There is no audio 404 request.
- Unsupported/corrupt file or playback failure: the player gives a gentle fallback and continuing still works.
- Verify the export format and filename, restart Vite, and rebuild before debugging iOS.
- Do not add synchronized captions until you have the final recording and its real timing.
