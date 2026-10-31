Add one after a good night; set addedOn to that day.

Not imported by the app. Paste a block at the top of the `cards` array in `src/esconderijo/cards.ts` (see ESCONDERIJO_GUIDE.md), set `addedOn`, then run `npm test`.

```ts
  {
    id: "ouvinte-rara",
    addedOn: "YYYY-MM-DD",
    rarity: "raro",
    icon: "star",
    title: { pt: "Ouvinte rara", en: "Rare listener" },
    story: {
      pt: "Item extremamente raro: alguém que me ouve falar de F1, de IA e de sistemas por horas — e ainda diz que gosta.",
      en: "Extremely rare item: someone who listens to me talk about F1, AI and systems for hours — and says she likes it.",
    },
    noticed: {
      pt: "Eu passo horas explicando coisas complicadas. Com você, eu explico mais devagar só pra conversa durar mais.",
      en: "I spend hours explaining complicated things. With you, I explain slower just so the conversation lasts longer.",
    },
  },
  {
    id: "revirada-de-olhos",
    addedOn: "YYYY-MM-DD",
    rarity: "comum",
    icon: "map",
    title: { pt: "Revirada de olhos nº ∞", en: "Eye roll no. ∞" },
    story: {
      pt: "Encontrada toda vez que eu falo alguma bobagem. Ou seja: em toda expedição.",
      en: "Found every time I say something silly. So: on every expedition.",
    },
    noticed: {
      pt: "Já sei diferenciar a revirada de “para” da revirada de “continua”. A de “continua” é a minha favorita.",
      en: "I can tell the “stop” eye roll from the “keep going” one now. The “keep going” one is my favorite.",
    },
  },
  {
    id: "coleira-do-gato",
    addedOn: "YYYY-MM-DD",
    rarity: "raro",
    icon: "collar",
    title: { pt: "Coleira de gato preto", en: "Black cat's collar" },
    story: {
      pt: "Achada perto da escotilha. Pertence a alguém que chega perto quando quer — e do jeito dela.",
      en: "Found near the hatch. Belongs to someone who comes close when she wants to — and in her own way.",
    },
    noticed: {
      pt: "Eu nunca quis te prender. Eu só gosto muito de quando você escolhe ficar perto.",
      en: "I never wanted to hold you in place. I just really like it when you choose to come close.",
    },
  },
  {
    id: "fins-cientificos",
    addedOn: "YYYY-MM-DD",
    rarity: "raro",
    icon: "key",
    title: { pt: "Caderno de campo", en: "Field notebook" },
    story: {
      pt: "Encontrado no meu bolso. Última anotação: “comportamento da Karol na partida — continuar observando. Para fins científicos.”",
      en: "Found in my pocket. Last entry: “Karol's behavior during the match — keep observing. For research purposes.”",
    },
    noticed: {
      pt: "A pesquisa nunca termina, porque você sempre muda os resultados.",
      en: "The research never ends, because you keep changing the results.",
    },
  },
```
