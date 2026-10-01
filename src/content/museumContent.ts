export type Language = "pt" | "en";
export type Copy = { pt: string; en: string };
export type ObjectId = "monster" | "frame" | "sims" | "fruit" | "tv" | "cat";
export const words = {
  brand: { pt: "coisinhas.", en: "coisinhas." },
  tagline: { pt: "um pequeno museu de nós", en: "a little museum of us" },
  subtitle: {
    pt: "um pequeno museu de você, de mim\ne das coisas que foram acontecendo no meio.",
    en: "a little museum of you, of me,\nand everything that happened in between.",
  },
  intro: {
    pt: "Você me contou uma vez que gosta de observar\nas pequenas coisas que as pessoas fazem\nquando ninguém está tentando impressionar ninguém.\n\nAcho que comecei a fazer isso com você\nsem perceber.",
    en: "You once told me you like noticing\nthe little things people do\nwhen they’re just existing.\n\nI think I started doing that with you\nwithout realizing it.",
  },
  enter: { pt: "entra, meu amor", en: "come in, my love" },
  welcome: {
    pt: "pode reparar nas pequenas coisas.",
    en: "take a look at the little things.",
  },
  instruction: {
    pt: "toque no que despertar sua curiosidade",
    en: "touch whatever makes you curious",
  },
  roomLabel: {
    pt: "sala 01 / as coisas que eu reparo",
    en: "room 01 / the things I notice",
  },
  roomName: { pt: "fica à vontade.", en: "make yourself at home." },
  progress: { pt: "coisinhas encontradas:", en: "little things found:" },
  growing: {
    pt: "aparentemente a coleção continua crescendo.",
    en: "apparently the collection keeps growing.",
  },
  door: {
    pt: "tem mais um cantinho. entra?",
    en: "there’s one more little room. come in?",
  },
  doorLabel: {
    pt: "Entrar no quarto inacabado",
    en: "Enter the unfinished room",
  },
  close: { pt: "guardar e continuar", en: "keep this & keep looking" },
  exhibit: { pt: "peça", en: "exhibit" },
  discovered: { pt: "já encontrada", en: "already found" },
  language: { pt: "Idioma", en: "Language" },
  catMove: { pt: "pspsps… quase.", en: "pspsps… almost." },
  catAgain: { pt: "tá. mais uma tentativa.", en: "okay. one more try." },
  catSecret: { pt: "um visitante recorrente", en: "a returning visitor" },
  archiveTitle: {
    pt: "arquivo confidencial da Karol",
    en: "Karol’s confidential file",
  },
  archive: {
    pt: "alega ser entediante\nevidências: inexistentes\n\nalega não ser mandona\nevidências: também inexistentes\n\nalega ser imprevisível\nJesh infelizmente já aprendeu alguns padrões\n\nstatus:\ninvestigação em andamento 🔍",
    en: "claims to be boring\nevidence: none\n\nclaims not to be bossy\nevidence: also none\n\nclaims to be unpredictable\nJesh has unfortunately learned a few patterns\n\nstatus:\ninvestigation ongoing 🔍",
  },
  there: { pt: "there she is.", en: "there she is." },
  reaction: { pt: "🙄", en: "🙄" },
  archiveReaction: {
    pt: "Reagir com um revirar de olhos",
    en: "React with an eye roll",
  },
  research: { pt: "for research purposes", en: "for research purposes" },
  unfinishedLabel: {
    pt: "sala 02 / em construção, felizmente",
    en: "room 02 / a work in progress, thankfully",
  },
  unfinishedTitle: { pt: "o quarto inacabado.", en: "the unfinished room." },
  unknown: {
    pt: "coisas que eu ainda não sei sobre a Karol:",
    en: "things I still don’t know about Karol:",
  },
  many: { pt: "muitas, espero.", en: "a lot, hopefully." },
  decipher: {
    pt: "eu não quero te decifrar.",
    en: "I don’t want to figure you out.",
  },
  discover: {
    pt: "quero continuar te descobrindo.",
    en: "I want to keep discovering you.",
  },
  next: { pt: "continua", en: "continue" },
  more: {
    pt: "toda vez que eu acho que já te conheço,\nvocê aparece com outra história,\noutra opinião estranhamente específica,\noutra palavra em português,\nou outro pedacinho seu\nque eu ainda não tinha visto.\n\nbom.\n\nespero que você nunca fique\ncompletamente previsível para mim.",
    en: "Every time I think I already know you,\nyou show up with another story,\nanother weirdly specific opinion,\nanother Portuguese word,\nor another little piece of you\nI hadn’t seen yet.\n\nGood.\n\nI hope you never become\ncompletely predictable to me.",
  },
  becoming: {
    pt: "eu não quero uma versão pronta de você.\n\neu gosto de conhecer\nquem você vai se tornando.",
    en: "I don’t want a finished version of you.\n\nI like meeting\nwho you’re becoming.",
  },
  voiceTitle: {
    pt: "uma coisa que texto não consegue fazer",
    en: "one thing text can’t do",
  },
  voiceSub: {
    pt: "algumas coisas ficam melhores na minha voz.",
    en: "some things are better in my voice.",
  },
  voicePlaceholder: { pt: "voice note goes here", en: "voice note goes here" },
  voiceMissing: {
    pt: "esse pedacinho ainda está esperando a minha voz.",
    en: "this little piece is still waiting for my voice.",
  },
  voiceError: {
    pt: "não deu para tocar agora. tenta mais uma vez?",
    en: "couldn’t play just now. try once more?",
  },
  voicePlay: { pt: "ouvir minha voz", en: "hear my voice" },
  voicePause: { pt: "pausar", en: "pause" },
  voiceSkip: { pt: "deixar para depois", en: "leave this for later" },
  voiceContinue: { pt: "fica mais um pouquinho", en: "stay a little longer" },
  voiceChecking: { pt: "preparando a fita…", en: "getting the tape ready…" },
  cassette: { pt: "só pra você", en: "just for you" },
  back: { pt: "voltar ao museu", en: "back to the museum" },
  final: {
    pt: "Ainda quero descobrir o resto.",
    en: "I still want to discover the rest.",
  },
  signature: { pt: "— seu amorzinho", en: "— seu amorzinho" },
  collection: {
    pt: "collection status: still growing.",
    en: "collection status: still growing.",
  },
  endingLabel: {
    pt: "uma coisinha de cada vez",
    en: "one little thing at a time",
  },
} satisfies Record<string, Copy>;

export const objects: {
  id: ObjectId;
  number: string;
  name: Copy;
  title: Copy;
  body: Copy;
  aside?: Copy;
  metadata?: Copy;
}[] = [
  {
    id: "monster",
    number: "01",
    name: { pt: "A latinha", en: "The can" },
    title: { pt: "O MONSTRO", en: "THE MONSTER" },
    body: {
      pt: "aparentemente responsável por aproximadamente\n73% dos crimes da Karol.",
      en: "apparently responsible for approximately\n73% of Karol’s crimes.",
    },
    aside: {
      pt: "you created a monster.\nnow deal with it.",
      en: "you created a monster.\nnow deal with it.",
    },
    metadata: {
      pt: "origin: questionable\ndanger level: doidinha",
      en: "origin: questionable\ndanger level: doidinha",
    },
  },
  {
    id: "frame",
    number: "02",
    name: { pt: "O quadro", en: "The frame" },
    title: { pt: "idioma oficial da Karol", en: "Karol’s official language" },
    body: {
      pt: "Português: fluente\nEnglish: fluent\n🙄: língua materna",
      en: "Português: fluent\nEnglish: fluent\n🙄: native language",
    },
    aside: {
      pt: "de alguma forma eu já reconheço\npelo menos sete significados diferentes.",
      en: "Somehow I already recognize\nat least seven different meanings.",
    },
  },
  {
    id: "sims",
    number: "03",
    name: { pt: "O laptop", en: "The laptop" },
    title: { pt: "só mais cinco minutinhos.", en: "just five more minutes." },
    body: {
      pt: "entre trabalho, universidade,\nsono e uma crise existencial ocasional...\n\nainda existe tempo para The Sims.",
      en: "Between work, university,\nsleep, and the occasional existential crisis...\n\nsomehow there is still time for The Sims.",
    },
    metadata: {
      pt: "prioridades: questionáveis\ncomprometimento: admirável",
      en: "priorities: questionable\ncommitment: admirable",
    },
  },
  {
    id: "fruit",
    number: "04",
    name: { pt: "A jabuticaba", en: "The jabuticaba" },
    title: { pt: "olhos de jabuticaba", en: "jabuticaba eyes" },
    body: {
      pt: "Você me ensinou uma forma brasileira\nde descrever os meus olhos.\n\nEu ainda acho que os seus\ncontam histórias melhores.",
      en: "You taught me a Brazilian way\nto describe my eyes.\n\nI still think yours\ntell better stories.",
    },
  },
  {
    id: "tv",
    number: "05",
    name: { pt: "A televisão", en: "The television" },
    title: {
      pt: "a noite em que nada importante aconteceu",
      en: "the night nothing important happened",
    },
    body: {
      pt: "a gente viu Fleabag.\n\na gente riu.\n\nvocê estava ali.\n\neu estava meio meh antes.\n\ndepois eu estava melhor.\n\naparentemente você consegue fazer isso agora.",
      en: "we watched Fleabag.\n\nwe laughed.\n\nyou were there.\n\nI felt kinda meh before.\n\nafterward I felt better.\n\napparently that’s a thing\nyou can do now.",
    },
  },
  {
    id: "cat",
    number: "06",
    name: { pt: "O gato", en: "The cat" },
    title: { pt: "no tempo dele.", en: "in its own time." },
    body: {
      pt: "aparentemente você não corre atrás do gato.\n\nvocê só deixa um cantinho confortável por perto.\n\nse ele gostar de você o suficiente,\numa hora ele aparece.\n\n(normalmente com atitude.)",
      en: "Apparently you don’t chase the cat.\n\nYou just leave a comfortable spot nearby.\n\nIf it likes you enough,\neventually it shows up.\n\n(usually with attitude.)",
    },
  },
];
export const eyeRolls: Copy[] = [
  { pt: "não", en: "no" },
  { pt: "Jesh...", en: "Jesh..." },
  { pt: "você é idiota", en: "you’re an idiot" },
  { pt: "talvez", en: "maybe" },
  { pt: "continua falando", en: "keep talking" },
  {
    pt: "eu gostei mas não vou admitir",
    en: "I liked that but won’t admit it",
  },
  { pt: "🙄", en: "🙄" },
];
export const ending: Copy[] = [
  {
    pt: "acho que é isso que eu gosto na gente.",
    en: "I think that’s what I like about us.",
  },
  { pt: "não teve um grande momento.", en: "There wasn’t one huge moment." },
  { pt: "foram centenas de coisinhas.", en: "It was hundreds of little ones." },
  { pt: "um bom dia.", en: "A good morning." },
  { pt: "um 🙄.", en: "An eye roll." },
  { pt: "uma história aleatória.", en: "A random story." },
  { pt: "uma discussão idiota.", en: "A stupid argument." },
  {
    pt: "uma call que ficou mais longa do que devia.",
    en: "A call that went much longer than it was supposed to.",
  },
  {
    pt: "“meu amor” ficando estranhamente normal.",
    en: "“meu amor” becoming strangely normal.",
  },
  {
    pt: "e, em algum momento entre tudo isso...",
    en: "And somewhere between all of that...",
  },
  {
    pt: "você virou uma coisa bem grande na minha vida.",
    en: "you became a pretty big thing in my life.",
  },
];
