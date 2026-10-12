# Your voice, one little thing at a time

The personal recording is **not included**. No generated voice or sample narration is bundled. The cassette stays quiet, shows an intentional message, and lets Karol continue without listening.

## Record and add the file

1. Record yourself in a quiet room with Voice Memos or another recorder. Speak naturally, with small pauses. The script below is a suggestion, not a performance requirement.
2. Export an AAC-encoded `.m4a`. Renaming a WAV or MP3 does not convert it.
3. Save it as **`public/audio/coisinhas.m4a`**, all lowercase, in this repository.
4. Restart `npm run dev` if already running. Audio presence is checked when Vite starts and again for each production build; this avoids missing-file requests when no recording exists.
5. Open the museum, enter the unfinished room, and continue to the cassette. Tap **ouvir minha voz**. Confirm audible sound, pause/resume, duration, seeking, and completion. Also confirm that **deixar para depois** still works.
6. Test the actual recording in Safari on a real iPhone. Check volume, seeking, pausing, resuming after an interruption, and replay after completion. Desktop checks do not verify a future file's encoding or physical iOS playback.
7. Run `npm run lint`, `npm test`, and `npm run build`. Confirm `dist/audio/coisinhas.m4a` exists. Review it before publishing.

Playback requires a deliberate button press. There is no background audio or autoplay. No transcript is shown because the actual recording has not yet been supplied; a future transcript should match what you actually say.

## Suggested script

> Oi, meu amor.
>
> Eu queria te dizer uma coisinha.
>
> Eu gosto muito da gente quando nada demais acontece.
>
> Quando você começa a rir de uma besteira.
>
> Quando a gente perde a noção do tempo numa conversa.
>
> Quando você revira os olhos pra mim.
>
> Ou quando a gente só fica ali, fazendo companhia um pro outro.
>
> Nem todos os nossos dias são fáceis, eu sei.
>
> E eu também tenho coisas que preciso aprender.
>
> Mas gosto muito desses momentos em que a gente simplesmente consegue ser a gente.
>
> Ainda tem tanta coisa que eu não sei sobre você.
>
> E eu gosto disso.
>
> Não tenho pressa.
>
> Quero continuar descobrindo, uma coisinha de cada vez.
>
> Um beijo, minha teimosinha.
>
> Do seu amorzinho.

## Before publishing

GitHub Pages should be assumed publicly reachable. Anyone able to open the site can download the recording, and a public repository exposes committed files and their history. `noindex,nofollow` is a search-engine request, not access control. Listen to the final file yourself before committing it.
