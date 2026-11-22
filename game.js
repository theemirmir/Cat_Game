'use strict';

const VW = 1280, VH = 720, GRAV = 1580, JUMP_V = 575, DEPTH = 220;
const SAVE_KEY = 'tjh-save-v2';
const SAVES_ON = false;
const LANG_KEY = 'tjh-lang';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let scale = 1, offX = 0, offY = 0, narrow = false, touchUsed = false;

const FONT = '"Segoe UI","Yu Gothic UI","Yu Gothic","Malgun Gothic","Microsoft JhengHei","Microsoft YaHei","Nirmala UI","Leelawadee UI",sans-serif';

const LANGS = [
  { id: 'en', name: 'English', rtl: false },
  { id: 'zh-Hant', name: '繁體中文', rtl: false },
  { id: 'zh-Hans', name: '简体中文', rtl: false },
  { id: 'es', name: 'Español', rtl: false },
  { id: 'fr', name: 'Français', rtl: false },
  { id: 'de', name: 'Deutsch', rtl: false },
  { id: 'ja', name: '日本語', rtl: false },
  { id: 'ko', name: '한국어', rtl: false },
  { id: 'pt', name: 'Português', rtl: false },
  { id: 'it', name: 'Italiano', rtl: false },
  { id: 'ru', name: 'Русский', rtl: false },
  { id: 'ar', name: 'العربية', rtl: true },
  { id: 'hi', name: 'हिन्दी', rtl: false },
  { id: 'vi', name: 'Tiếng Việt', rtl: false },
  { id: 'th', name: 'ไทย', rtl: false },
  { id: 'id', name: 'Bahasa Indonesia', rtl: false },
  { id: 'tr', name: 'Türkçe', rtl: false },
  { id: 'pl', name: 'Polski', rtl: false },
  { id: 'nl', name: 'Nederlands', rtl: false },
  { id: 'uk', name: 'Українська', rtl: false }
];

const STR = {};
STR.en = {
  title: "The Journey Home",
  chapter: "Chapter 1  -  The Barren Land",
  begin: "Begin",
  continue_game: "Continue",
  hunger: "Hunger",
  thirst: "Thirst",
  stamina: "Stamina",
  wind: "Wind",
  objective: "Objective",
  obj_water: "Cross the barren land and find water.",
  obj_drink: "Drink from the pool.",
  obj_mole: "Follow Earth and catch a mole.",
  obj_survive: "Hunt to live. Mind the wind.",
  obj_quest: "Bring Dune two moles.",
  obj_tracks: "Follow the machine tracks.",
  obj_back: "Someone behind you still needs help.",
  intro1: "You were born in the wild.",
  intro2: "For two weeks, the forest held you and your mother.",
  intro3: "Then a great machine came.",
  intro4: "It broke the wood apart and carried your mother away.",
  intro5: "The land it left has nothing soft to drink.",
  name_earth: "Earth",
  name_you: "You",
  name_stray: "Dune",
  name_mother: "Mother",
  dlg_earth1: "I am Earth. This is the only clean water left on this barren land. What still lives here treats it as precious.",
  dlg_you1: "What do you eat out here?",
  dlg_earth2: "Moles. Stay low, stay quiet, and jump when the ground gives them up.",
  dlg_earth3: "Come. I will show you the loose earth where they hunt.",
  dlg_earth4: "There. A mole. Wait until it breaks the surface, then pounce.",
  dlg_earth5: "You have the idea. Deep in the desert lives an old cat named Dune. He knows things I do not. Go and find him.",
  dlg_stray1: "I am Dune. This desert has been my home for many seasons, but my paws are too old for digging now.",
  dlg_stray2: "Bring me two moles. In return, I will teach you how to carry two catches at once.",
  dlg_stray_wait: "Two moles. They move under the loose sand. Listen for them.",
  dlg_stray3: "Two moles. You kept your word. Watch how I hold them.",
  dlg_stray4: "Hold the first one gently, then take the second beside it. Now you can carry two catches at once. The road ahead is long.",
  tut_title: "Earth shows you how",
  tut_move: "Move with A and D, or the arrow keys. Shift sprints. Space jumps.",
  tut_actions: "Hold S to stalk, quiet and low. Hold J to gather a pounce, then release. E drinks, eats, and speaks.",
  tut_mole: "Moles travel under the soil. Follow the moving mound without rushing. When the mole pops up, pounce.",
  tut_wind: "Keep the wind in your face, blowing from the prey toward you. If it carries your scent, they run sooner.",
  tut_touch: "On a small screen, the buttons do the same. They flash blue when you press them.",
  tut_ok: "I understand",
  tip_mouse: "Earth: A mouse is all stalking. Creep the whole way, then pounce. One fast step and it is gone.",
  tip_vole: "Earth: Stalk the vole. The moment it bolts, sprint after it. The chase is short.",
  tip_rabbit: "Earth: Do not creep. A rabbit runs for its burrow. Sprint, and catch it before the hole.",
  tip_sparrow: "Earth: Stalk close. When the sparrow leaves the ground, jump and pounce in that instant.",
  tip_fox: "Earth: A fox hunts you back. It cannot follow onto high ground. Climb.",
  reward_jump: "Double jump learned",
  end1: "Tread marks cut through the dust, straight toward the highway.",
  end2: "Your mother was taken that way. The journey home has only begun.",
  end3: "To be continued",
  faint: "The wild is not kind. You wake where you last felt safe.",
  caught: "Caught",
  drink: "Drink",
  eat: "Eat",
  give: "Give",
  language: "Language",
  checkpoint: "A place to remember",
  hint_keys: "A D move   Space jump   J pounce   K paw   S stalk   E interact   Enter emotes",
  emote_title: "Emotes: press 1 to 4",
  emote_sleep: "Sleep",
  emote_purr: "Purr",
  emote_meow: "Meow",
  emote_sit: "Sit",
  prey_mole: "Mole",
  prey_mouse: "Mouse",
  prey_vole: "Vole",
  prey_rabbit: "Rabbit",
  prey_sparrow: "Sparrow",
  fox: "Fox",
  left: "left",
  right: "right",
  hold_pounce: "Gathering pounce",
  mouth_full: "Eat or deliver what you already carry.",
  hint_begin: "Click anywhere, or press Enter",
  hint_skip: "Click to skip",
  obj_dune: "Find the cat in the middle of the desert.",
  dlg_stray_one: "One. Good. Bring me one more.",
  reward_carry: "You can now carry two catches at once"
};
STR['zh-Hant'] = {
  title: "歸途",
  chapter: "第一章  —  荒地",
  begin: "開始",
  continue_game: "繼續",
  hunger: "飢餓",
  thirst: "口渴",
  stamina: "體力",
  wind: "風向",
  objective: "目標",
  obj_water: "穿越荒地，找到水。",
  obj_drink: "喝水窪裡的水。",
  obj_mole: "跟著 Earth，抓住一隻鼴鼠。",
  obj_survive: "獵食求生。注意風向。",
  obj_quest: "帶兩隻鼴鼠給 Dune。",
  obj_tracks: "跟著機器的履帶痕跡走。",
  obj_back: "後面還有人需要你幫忙。",
  intro1: "你出生在荒野。",
  intro2: "兩個星期裡，森林裡只有你和媽媽。",
  intro3: "然後，一台巨大的機器來了。",
  intro4: "它拆碎了樹林，把媽媽帶走。",
  intro5: "它留下的土地上，沒有能喝的水。",
  name_earth: "Earth",
  name_you: "你",
  name_stray: "Dune",
  name_mother: "媽媽",
  dlg_earth1: "我是 Earth。這是荒地上僅剩的乾淨水。還活著的動物都把它看得很珍貴。",
  dlg_you1: "這裡能吃什麼？",
  dlg_earth2: "鼴鼠。把身子放低，保持安靜，等地面把它們送出來再跳。",
  dlg_earth3: "來。我帶你去看牠們覓食的鬆土。",
  dlg_earth4: "那裡有一隻鼴鼠。等牠冒出地面，再撲上去。",
  dlg_earth5: "你學會了。沙漠深處住著一隻叫 Dune 的老貓，他懂得我不懂的事。去找他吧。",
  dlg_stray1: "我是 Dune。這片沙漠是我住了許多季節的家，但我的爪子已經老得挖不動了。",
  dlg_stray2: "帶兩隻鼴鼠給我。作為回報，我會教你一次叼住兩份獵物。",
  dlg_stray_wait: "兩隻鼴鼠。牠們在鬆軟的沙子底下移動，仔細聽。",
  dlg_stray3: "兩隻鼴鼠。你遵守了承諾。看好我怎麼叼住牠們。",
  dlg_stray4: "先輕輕咬住第一隻，再把第二隻叼在旁邊。現在你能一次帶兩份獵物了。前方的路還很長。",
  tut_title: "Earth 教你怎麼做",
  tut_move: "用 A、D 或方向鍵移動。Shift 衝刺。空白鍵跳躍。",
  tut_actions: "按住 S 潛行，又低又安靜。按住 J 蓄力，放開就撲擊。E 用來喝水、進食和對話。",
  tut_mole: "鼴鼠在土裡移動。跟著移動的土堆，不要急。牠冒出來時再撲。",
  tut_wind: "讓風從獵物吹向你。如果風把你的氣味送過去，牠們會更早逃走。",
  tut_touch: "小螢幕上的按鈕也一樣。按下時會閃藍光。",
  tut_ok: "我懂了",
  tip_mouse: "Earth：抓老鼠只能潛行。全程慢慢靠近再撲。快一步，牠就沒了。",
  tip_vole: "Earth：先潛行靠近田鼠。牠一逃，立刻衝刺追上去。追逐很短。",
  tip_rabbit: "Earth：別蹲著走。兔子會衝回洞穴。全力跑，在牠進洞前抓住。",
  tip_sparrow: "Earth：潛行靠近。麻雀離地的那一瞬間，跳起來撲。",
  tip_fox: "Earth：狐狸會反過來獵你。牠上不了高處。爬上去。",
  reward_jump: "學會了二段跳",
  end1: "塵土裡的履帶痕跡，直直通向公路。",
  end2: "媽媽就是被帶去那個方向。歸途才剛開始。",
  end3: "未完待續",
  faint: "荒野並不溫柔。你在最後感到安全的地方醒來。",
  caught: "抓到了",
  drink: "喝水",
  eat: "吃",
  give: "給牠",
  language: "語言",
  checkpoint: "記住這個地方",
  hint_keys: "A D 移動   空白跳躍   J 撲擊   K 揮爪   S 潛行   E 互動   Enter 表情",
  emote_title: "表情動作：按 1 到 4",
  emote_sleep: "睡覺",
  emote_purr: "呼嚕",
  emote_meow: "喵叫",
  emote_sit: "坐下",
  prey_mole: "鼴鼠",
  prey_mouse: "老鼠",
  prey_vole: "田鼠",
  prey_rabbit: "兔子",
  prey_sparrow: "麻雀",
  fox: "狐狸",
  left: "左",
  right: "右",
  hold_pounce: "正在蓄力",
  mouth_full: "先吃掉或送出手上的獵物。",
  hint_begin: "點畫面任意處，或按 Enter",
  hint_skip: "點一下略過",
  obj_dune: "找到沙漠中央的那隻貓。",
  dlg_stray_one: "一隻。很好，再帶一隻來。",
  reward_carry: "現在你能一次帶兩份獵物"
};
STR['zh-Hans'] = {
  title: "归途",
  chapter: "第一章  —  荒地",
  begin: "开始",
  continue_game: "继续",
  hunger: "饥饿",
  thirst: "口渴",
  stamina: "体力",
  wind: "风向",
  objective: "目标",
  obj_water: "穿过荒地，找到水。",
  obj_drink: "喝水洼里的水。",
  obj_mole: "跟着 Earth，抓住一只鼹鼠。",
  obj_survive: "猎食求生。注意风向。",
  obj_quest: "带两只鼹鼠给 Dune。",
  obj_tracks: "跟着机器的履带痕迹走。",
  obj_back: "后面还有人需要你帮忙。",
  intro1: "你出生在荒野。",
  intro2: "两个星期里，森林里只有你和妈妈。",
  intro3: "然后，一台巨大的机器来了。",
  intro4: "它拆碎了树林，把妈妈带走。",
  intro5: "它留下的土地上，没有能喝的水。",
  name_earth: "Earth",
  name_you: "你",
  name_stray: "Dune",
  name_mother: "妈妈",
  dlg_earth1: "我是 Earth。这是荒地上仅剩的干净水。还活着的动物都把它看得很珍贵。",
  dlg_you1: "这里能吃什么？",
  dlg_earth2: "鼹鼠。把身子放低，保持安静，等地面把它们送出来再跳。",
  dlg_earth3: "来。我带你去看它们觅食的松土。",
  dlg_earth4: "那里有一只鼹鼠。等它冒出地面，再扑上去。",
  dlg_earth5: "你学会了。沙漠深处住着一只叫 Dune 的老猫，他懂得我不懂的事。去找他吧。",
  dlg_stray1: "我是 Dune。这片沙漠是我住了许多季节的家，但我的爪子已经老得挖不动了。",
  dlg_stray2: "带两只鼹鼠给我。作为回报，我会教你一次叼住两份猎物。",
  dlg_stray_wait: "两只鼹鼠。它们在松软的沙子底下移动，仔细听。",
  dlg_stray3: "两只鼹鼠。你遵守了承诺。看好我怎么叼住它们。",
  dlg_stray4: "先轻轻咬住第一只，再把第二只叼在旁边。现在你能一次带两份猎物了。前方的路还很长。",
  tut_title: "Earth 教你怎么做",
  tut_move: "用 A、D 或方向键移动。Shift 冲刺。空格键跳跃。",
  tut_actions: "按住 S 潜行，又低又安静。按住 J 蓄力，放开就扑击。E 用来喝水、进食和对话。",
  tut_mole: "鼹鼠在土里移动。跟着移动的土堆，不要急。它冒出来时再扑。",
  tut_wind: "让风从猎物吹向你。如果风把你的气味送过去，它们会更早逃走。",
  tut_touch: "小屏幕上的按钮也一样。按下时会闪蓝光。",
  tut_ok: "我懂了",
  tip_mouse: "Earth：抓老鼠只能潜行。全程慢慢靠近再扑。快一步，它就没了。",
  tip_vole: "Earth：先潜行靠近田鼠。它一逃，立刻冲刺追上去。追逐很短。",
  tip_rabbit: "Earth：别蹲着走。兔子会冲回洞穴。全力跑，在它进洞前抓住。",
  tip_sparrow: "Earth：潜行靠近。麻雀离地的那一瞬间，跳起来扑。",
  tip_fox: "Earth：狐狸会反过来猎你。它上不了高处。爬上去。",
  reward_jump: "学会了二段跳",
  end1: "尘土里的履带痕迹，直直通向公路。",
  end2: "妈妈就是被带去那个方向。归途才刚开始。",
  end3: "未完待续",
  faint: "荒野并不温柔。你在最后感到安全的地方醒来。",
  caught: "抓到了",
  drink: "喝水",
  eat: "吃",
  give: "给它",
  language: "语言",
  checkpoint: "记住这个地方",
  hint_keys: "A D 移动   空格跳跃   J 扑击   K 挥爪   S 潜行   E 互动   Enter 表情",
  emote_title: "表情动作：按 1 到 4",
  emote_sleep: "睡觉",
  emote_purr: "呼噜",
  emote_meow: "喵叫",
  emote_sit: "坐下",
  prey_mole: "鼹鼠",
  prey_mouse: "老鼠",
  prey_vole: "田鼠",
  prey_rabbit: "兔子",
  prey_sparrow: "麻雀",
  fox: "狐狸",
  left: "左",
  right: "右",
  hold_pounce: "正在蓄力",
  mouth_full: "先吃掉或送出手上的猎物。",
  hint_begin: "点击画面任意处，或按 Enter",
  hint_skip: "点击跳过",
  obj_dune: "找到沙漠中央的那只猫。",
  dlg_stray_one: "一只。很好，再带一只来。",
  reward_carry: "现在你能一次带两份猎物"
};
STR.es = {
  title: "El camino a casa",
  chapter: "Capítulo 1  -  La tierra yerma",
  begin: "Empezar",
  continue_game: "Continuar",
  hunger: "Hambre",
  thirst: "Sed",
  stamina: "Energía",
  wind: "Viento",
  objective: "Objetivo",
  obj_water: "Cruza la tierra yerma y encuentra agua.",
  obj_drink: "Bebe del charco.",
  obj_mole: "Sigue a Earth y atrapa un topo.",
  obj_survive: "Caza para vivir. Mira el viento.",
  obj_quest: "Lleva dos topos a Dune.",
  obj_tracks: "Sigue las huellas de la máquina.",
  obj_back: "Alguien atrás todavía necesita ayuda.",
  intro1: "Naciste en la naturaleza.",
  intro2: "Durante dos semanas, el bosque te tuvo a ti y a tu madre.",
  intro3: "Entonces llegó una gran máquina.",
  intro4: "Rompió el bosque y se llevó a tu madre.",
  intro5: "La tierra que dejó no tiene nada blando para beber.",
  name_earth: "Earth",
  name_you: "Tú",
  name_stray: "Dune",
  name_mother: "Madre",
  dlg_earth1: "Soy Earth. Esta es la única agua limpia que queda en esta tierra yerma. Quien aún vive aquí la trata como un tesoro.",
  dlg_you1: "¿Qué se come aquí?",
  dlg_earth2: "Topos. Quédate bajo, quédate quieto, y salta cuando el suelo los entrega.",
  dlg_earth3: "Ven. Te enseñaré la tierra suelta donde cazan.",
  dlg_earth4: "Ahí. Un topo. Espera a que rompa la superficie y entonces salta.",
  dlg_earth5: "Ya lo entiendes. En lo profundo del desierto vive un gato viejo llamado Dune. Sabe cosas que yo no. Ve a buscarlo.",
  dlg_stray1: "Soy Dune. Este desierto ha sido mi hogar durante muchas estaciones, pero mis patas ya son muy viejas para cavar.",
  dlg_stray2: "Tráeme dos topos. A cambio, te enseñaré a llevar dos presas a la vez.",
  dlg_stray_wait: "Dos topos. Se mueven bajo la arena suelta. Escúchalos.",
  dlg_stray3: "Dos topos. Cumpliste tu palabra. Mira cómo los sostengo.",
  dlg_stray4: "Sujeta el primero con suavidad y toma el segundo a su lado. Ahora puedes llevar dos presas a la vez. El camino es largo.",
  tut_title: "Earth te enseña",
  tut_move: "Muévete con A y D, o las flechas. Shift corre. Espacio salta.",
  tut_actions: "Mantén S para acechar, bajo y en silencio. Mantén J para cargar un salto y suelta. E bebe, come y habla.",
  tut_mole: "Los topos viajan bajo la tierra. Sigue el montículo sin apurarte. Cuando salga, salta sobre él.",
  tut_wind: "Que el viento te dé en la cara, desde la presa hacia ti. Si lleva tu olor, huirán antes.",
  tut_touch: "En una pantalla pequeña, los botones hacen lo mismo. Brillan en azul al pulsarlos.",
  tut_ok: "Entendido",
  tip_mouse: "Earth: Un ratón es puro acecho. Acércate despacio y luego salta. Un paso rápido y desaparece.",
  tip_vole: "Earth: Acecha al topillo. En cuanto huya, corre tras él. La persecución es corta.",
  tip_rabbit: "Earth: No te agaches. El conejo corre a su madriguera. Corre y atrápalo antes del agujero.",
  tip_sparrow: "Earth: Acecha de cerca. Cuando el gorrión deje el suelo, salta en ese instante.",
  tip_fox: "Earth: Un zorro te caza a ti. No puede subir a lo alto. Trepa.",
  reward_jump: "Aprendiste el doble salto",
  end1: "Las huellas cortan el polvo, rectas hacia la carretera.",
  end2: "Tu madre fue llevada por ahí. El camino a casa apenas empieza.",
  end3: "Continuará",
  faint: "Lo salvaje no es amable. Despiertas donde te sentiste a salvo.",
  caught: "Atrapado",
  drink: "Beber",
  eat: "Comer",
  give: "Dar",
  language: "Idioma",
  checkpoint: "Un lugar para recordar",
  hint_keys: "A D mover    Espacio saltar    Shift correr    S acechar    J saltar    K zarpazo    E actuar",
  emote_title: "Gestos: pulsa 1 a 4",
  emote_sleep: "Dormir",
  emote_purr: "Ronronear",
  emote_meow: "Maullar",
  emote_sit: "Sentarse",
  prey_mole: "Topo",
  prey_mouse: "Ratón",
  prey_vole: "Topillo",
  prey_rabbit: "Conejo",
  prey_sparrow: "Gorrión",
  fox: "Zorro",
  left: "izquierda",
  right: "derecha",
  hold_pounce: "Cargando salto",
  mouth_full: "Come o entrega lo que ya llevas.",
  hint_begin: "Haz clic en cualquier lugar o pulsa Enter",
  hint_skip: "Clic para saltar",
  obj_dune: "Encuentra al gato en medio del desierto.",
  dlg_stray_one: "Uno. Bien. Tráeme uno más.",
  reward_carry: "Ahora puedes llevar dos presas a la vez"
};
STR.fr = {
  title: "Le chemin du retour",
  chapter: "Chapitre 1  -  La terre nue",
  begin: "Commencer",
  continue_game: "Continuer",
  hunger: "Faim",
  thirst: "Soif",
  stamina: "Énergie",
  wind: "Vent",
  objective: "Objectif",
  obj_water: "Traverse la terre nue et trouve de l'eau.",
  obj_drink: "Bois dans la mare.",
  obj_mole: "Suis Earth et attrape une taupe.",
  obj_survive: "Chasse pour vivre. Surveille le vent.",
  obj_quest: "Apporte deux taupes à Dune.",
  obj_tracks: "Suis les traces de la machine.",
  obj_back: "Quelqu'un derrière toi a encore besoin d'aide.",
  intro1: "Tu es né dans la nature.",
  intro2: "Pendant deux semaines, la forêt vous a gardés, toi et ta mère.",
  intro3: "Puis une grande machine est arrivée.",
  intro4: "Elle a brisé le bois et emporté ta mère.",
  intro5: "La terre qu'elle a laissée n'a rien de doux à boire.",
  name_earth: "Earth",
  name_you: "Toi",
  name_stray: "Dune",
  name_mother: "Mère",
  dlg_earth1: "Je suis Earth. C'est la seule eau propre qui reste sur cette terre nue. Ce qui vit encore ici la traite comme un trésor.",
  dlg_you1: "Qu'est-ce qu'on mange ici ?",
  dlg_earth2: "Des taupes. Reste bas, reste silencieux, et saute quand le sol les livre.",
  dlg_earth3: "Viens. Je vais te montrer la terre meuble où elles chassent.",
  dlg_earth4: "Là. Une taupe. Attends qu'elle crève la surface, puis bondis.",
  dlg_earth5: "Tu as compris. Au fond du désert vit un vieux chat nommé Dune. Il sait des choses que j'ignore. Va le trouver.",
  dlg_stray1: "Je suis Dune. Ce désert est mon foyer depuis bien des saisons, mais mes pattes sont trop vieilles pour creuser.",
  dlg_stray2: "Apporte-moi deux taupes. En échange, je t'apprendrai à porter deux proies à la fois.",
  dlg_stray_wait: "Deux taupes. Elles bougent sous le sable meuble. Écoute-les.",
  dlg_stray3: "Deux taupes. Tu as tenu parole. Regarde comment je les tiens.",
  dlg_stray4: "Tiens la première doucement, puis prends la seconde à côté. Tu peux maintenant porter deux proies à la fois. La route est longue.",
  tut_title: "Earth te montre",
  tut_move: "Bouge avec A et D, ou les flèches. Maj court. Espace saute.",
  tut_actions: "Maintiens S pour traquer, bas et silencieux. Maintiens J pour charger un bond, puis relâche. E boit, mange et parle.",
  tut_mole: "Les taupes voyagent sous la terre. Suis la motte sans te presser. Quand elle sort, bondis.",
  tut_wind: "Garde le vent sur ton visage, de la proie vers toi. S'il emporte ton odeur, elles fuient plus tôt.",
  tut_touch: "Sur un petit écran, les boutons font la même chose. Ils clignotent en bleu.",
  tut_ok: "J'ai compris",
  tip_mouse: "Earth : Une souris, c'est de la traque. Approche-toi tout doucement, puis bondis. Un pas vif et elle disparaît.",
  tip_vole: "Earth : Traque le campagnol. Dès qu'il file, sprinte derrière. La course est courte.",
  tip_rabbit: "Earth : Ne rampe pas. Un lapin court vers son terrier. Sprinte et attrape-le avant le trou.",
  tip_sparrow: "Earth : Traque de près. Quand le moineau quitte le sol, saute et bondis à cet instant.",
  tip_fox: "Earth : Un renard te chasse en retour. Il ne peut pas monter. Grimpe.",
  reward_jump: "Double saut appris",
  end1: "Des traces de chenilles coupent la poussière, droit vers la route.",
  end2: "Ta mère a été emmenée par là. Le chemin du retour ne fait que commencer.",
  end3: "À suivre",
  faint: "La nature n'est pas douce. Tu te réveilles là où tu t'es senti en sûreté.",
  caught: "Attrapé",
  drink: "Boire",
  eat: "Manger",
  give: "Donner",
  language: "Langue",
  checkpoint: "Un lieu à retenir",
  hint_keys: "A D bouger    Espace sauter    Maj courir    S traquer    J bondir    K patte    E agir",
  emote_title: "Émotes : touches 1 à 4",
  emote_sleep: "Dormir",
  emote_purr: "Ronronner",
  emote_meow: "Miauler",
  emote_sit: "S'asseoir",
  prey_mole: "Taupe",
  prey_mouse: "Souris",
  prey_vole: "Campagnol",
  prey_rabbit: "Lapin",
  prey_sparrow: "Moineau",
  fox: "Renard",
  left: "gauche",
  right: "droite",
  hold_pounce: "Bond en charge",
  mouth_full: "Mange ou donne ce que tu portes déjà.",
  hint_begin: "Clique n'importe où, ou appuie sur Entrée",
  hint_skip: "Cliquer pour passer",
  obj_dune: "Trouve le chat au milieu du désert.",
  dlg_stray_one: "Une. Bien. Apporte-m'en une autre.",
  reward_carry: "Tu peux porter deux proies à la fois"
};
STR.de = {
  title: "Der Weg nach Hause",
  chapter: "Kapitel 1  -  Das öde Land",
  begin: "Beginnen",
  continue_game: "Weiter",
  hunger: "Hunger",
  thirst: "Durst",
  stamina: "Kraft",
  wind: "Wind",
  objective: "Ziel",
  obj_water: "Durchquere das öde Land und finde Wasser.",
  obj_drink: "Trink aus der Pfütze.",
  obj_mole: "Folge Earth und fang einen Maulwurf.",
  obj_survive: "Jage, um zu leben. Achte auf den Wind.",
  obj_quest: "Bring Dune zwei Maulwürfe.",
  obj_tracks: "Folge den Spuren der Maschine.",
  obj_back: "Jemand hinter dir braucht noch Hilfe.",
  intro1: "Du wurdest in der Wildnis geboren.",
  intro2: "Zwei Wochen lang hielt der Wald dich und deine Mutter.",
  intro3: "Dann kam eine große Maschine.",
  intro4: "Sie zerbrach den Wald und nahm deine Mutter mit.",
  intro5: "Das Land, das sie ließ, hat nichts Weiches zu trinken.",
  name_earth: "Earth",
  name_you: "Du",
  name_stray: "Dune",
  name_mother: "Mutter",
  dlg_earth1: "Ich bin Earth. Das ist das einzige saubere Wasser in diesem öden Land. Was hier noch lebt, hütet es wie einen Schatz.",
  dlg_you1: "Was isst du hier draußen?",
  dlg_earth2: "Maulwürfe. Bleib tief, bleib still, und spring, wenn der Boden sie hergibt.",
  dlg_earth3: "Komm. Ich zeige dir die lockere Erde, wo sie jagen.",
  dlg_earth4: "Dort. Ein Maulwurf. Warte, bis er durchbricht, dann spring.",
  dlg_earth5: "Du hast es verstanden. Tief in der Wüste lebt ein alter Kater namens Dune. Er weiß Dinge, die ich nicht weiß. Geh zu ihm.",
  dlg_stray1: "Ich bin Dune. Diese Wüste ist seit vielen Jahreszeiten mein Zuhause, doch meine Pfoten sind zu alt zum Graben.",
  dlg_stray2: "Bring mir zwei Maulwürfe. Dafür zeige ich dir, wie du zwei Beutetiere auf einmal trägst.",
  dlg_stray_wait: "Zwei Maulwürfe. Sie bewegen sich unter dem lockeren Sand. Lausche.",
  dlg_stray3: "Zwei Maulwürfe. Du hast Wort gehalten. Sieh, wie ich sie halte.",
  dlg_stray4: "Halte den ersten sanft und nimm den zweiten daneben. Jetzt kannst du zwei Beutetiere auf einmal tragen. Der Weg ist noch lang.",
  tut_title: "Earth zeigt es dir",
  tut_move: "Bewege dich mit A und D oder den Pfeilen. Shift sprintet. Leertaste springt.",
  tut_actions: "Halte S zum Anschleichen, leise und tief. Halte J zum Aufladen und lass los. E trinkt, frisst und spricht.",
  tut_mole: "Maulwürfe wandern unter der Erde. Folge dem Hügel ohne Eile. Wenn er auftaucht, spring.",
  tut_wind: "Lass den Wind ins Gesicht wehen, von der Beute zu dir. Trägt er deinen Geruch, fliehen sie früher.",
  tut_touch: "Auf einem kleinen Bildschirm tun die Tasten dasselbe. Sie blitzen blau auf.",
  tut_ok: "Verstanden",
  tip_mouse: "Earth: Eine Maus ist nur Schleichen. Kriech den ganzen Weg, dann spring. Ein schneller Schritt und sie ist fort.",
  tip_vole: "Earth: Schleich die Wühlmaus an. Sobald sie losrennt, sprinte hinterher. Die Jagd ist kurz.",
  tip_rabbit: "Earth: Nicht kriechen. Ein Kaninchen läuft zu seinem Bau. Sprinte und fang es vor dem Loch.",
  tip_sparrow: "Earth: Schleich dich nah heran. Wenn der Spatz abhebt, spring in diesem Augenblick.",
  tip_fox: "Earth: Ein Fuchs jagt dich zurück. Er kommt nicht nach oben. Klettere.",
  reward_jump: "Doppelsprung gelernt",
  end1: "Kettenabdrücke schneiden durch den Staub, gerade zur Straße.",
  end2: "Deine Mutter wurde dorthin gebracht. Der Weg nach Hause hat erst begonnen.",
  end3: "Fortsetzung folgt",
  faint: "Die Wildnis ist nicht freundlich. Du wachst dort auf, wo du zuletzt sicher warst.",
  caught: "Gefangen",
  drink: "Trinken",
  eat: "Fressen",
  give: "Geben",
  language: "Sprache",
  checkpoint: "Ein Ort zum Merken",
  hint_keys: "A D laufen    Leertaste Sprung    Shift Sprint    S schleichen    J hechten    K Tatze    E handeln",
  emote_title: "Gesten: Taste 1 bis 4",
  emote_sleep: "Schlafen",
  emote_purr: "Schnurren",
  emote_meow: "Miauen",
  emote_sit: "Sitzen",
  prey_mole: "Maulwurf",
  prey_mouse: "Maus",
  prey_vole: "Wühlmaus",
  prey_rabbit: "Kaninchen",
  prey_sparrow: "Spatz",
  fox: "Fuchs",
  left: "links",
  right: "rechts",
  hold_pounce: "Sprung lädt",
  mouth_full: "Friss oder gib ab, was du schon trägst.",
  hint_begin: "Irgendwo klicken oder Enter drücken",
  hint_skip: "Klicken zum Überspringen",
  obj_dune: "Finde die Katze in der Mitte der Wüste.",
  dlg_stray_one: "Einer. Gut. Bring mir noch einen.",
  reward_carry: "Du kannst jetzt zwei Beutetiere tragen"
};
STR.ja = {
  title: "帰路",
  chapter: "第1章  —  荒れ地",
  begin: "はじめる",
  continue_game: "つづきから",
  hunger: "空腹",
  thirst: "のど",
  stamina: "体力",
  wind: "風",
  objective: "目標",
  obj_water: "荒れ地を越え、水を見つける。",
  obj_drink: "水たまりの水を飲む。",
  obj_mole: "Earth について、モグラを捕まえる。",
  obj_survive: "狩って生きる。風に注意。",
  obj_quest: "Dune にモグラを2匹届けよう。",
  obj_tracks: "機械のキャタピラ跡をたどる。",
  obj_back: "うしろに、まだ助けが必要な者がいる。",
  intro1: "あなたは荒野で生まれた。",
  intro2: "二週間、森にはあなたと母だけがいた。",
  intro3: "それから、巨大な機械が来た。",
  intro4: "森を砕き、母を連れ去った。",
  intro5: "残された土地に、飲める柔らかい水はない。",
  name_earth: "Earth",
  name_you: "あなた",
  name_stray: "Dune",
  name_mother: "母",
  dlg_earth1: "ぼくは Earth。この荒れ地に残ったきれいな水はここだけだ。まだ生きているものは、それを宝物のように扱う。",
  dlg_you1: "ここでは何を食べるの？",
  dlg_earth2: "モグラだ。低く、静かに。地面が差し出したときに跳ぶ。",
  dlg_earth3: "来て。やつらが狩る柔らかい土を見せる。",
  dlg_earth4: "あそこだ。モグラだ。顔を出すまで待って、それから飛びかかれ。",
  dlg_earth5: "わかってきたね。砂漠の奥に Dune という年老いた猫がいる。わたしの知らないことを知っている。会いに行きなさい。",
  dlg_stray1: "わしは Dune。この砂漠に長く暮らしてきたが、もう前足が老いて掘れんのだ。",
  dlg_stray2: "モグラを2匹持ってきておくれ。お礼に、獲物を2つ同時に運ぶ方法を教えよう。",
  dlg_stray_wait: "モグラを2匹だ。やわらかい砂の下を動いている。耳をすませなさい。",
  dlg_stray3: "2匹そろった。約束を守ったな。わしのくわえ方を見ていなさい。",
  dlg_stray4: "1匹目をやさしくくわえ、2匹目をその横に。これで獲物を2つ運べる。この先の道は長いぞ。",
  tut_title: "Earth が教える",
  tut_move: "A と D、または矢印で移動。Shift でダッシュ。Space でジャンプ。",
  tut_actions: "S を押して忍び足。低く静か。J を押して力をため、離すと飛びかかる。E で飲み、食べ、話す。",
  tut_mole: "モグラは土の中を進む。動く土盛りを急がずに追う。顔を出したら飛びかかれ。",
  tut_wind: "風を顔に受け、獲物のほうから吹かせる。においが届くと、もっと早く逃げる。",
  tut_touch: "小さい画面ではボタンが同じ働きをする。押すと青く光る。",
  tut_ok: "わかった",
  tip_mouse: "Earth：ネズミは忍び足だけ。最後までゆっくり近づいてから飛びかかれ。一歩速いと消える。",
  tip_vole: "Earth：ハタネズミに忍び寄り、走り出したらダッシュで追え。追いは短い。",
  tip_rabbit: "Earth：這う必要はない。ウサギは巣穴へ走る。穴に入る前にダッシュで捕まえろ。",
  tip_sparrow: "Earth：近くまで忍び寄れ。スズメが地面を離れた瞬間に跳んで飛びかかれ。",
  tip_fox: "Earth：キツネは君を狩り返す。高い場所には上がれない。登れ。",
  reward_jump: "二段ジャンプを覚えた",
  end1: "キャタピラの跡が土埃を切り、ハイウェイへまっすぐ伸びている。",
  end2: "母はあちらへ連れて行かれた。帰路はまだ始まったばかりだ。",
  end3: "つづく",
  faint: "荒野は優しくない。最後に安全だと感じた場所で目を覚ます。",
  caught: "捕まえた",
  drink: "飲む",
  eat: "食べる",
  give: "渡す",
  language: "言語",
  checkpoint: "覚えておく場所",
  hint_keys: "A D 移動    Space ジャンプ    Shift ダッシュ    S 忍び足    J 飛びかかり    K 前足    E 調べる",
  emote_title: "エモート：1〜4 キー",
  emote_sleep: "眠る",
  emote_purr: "ゴロゴロ",
  emote_meow: "ニャー",
  emote_sit: "おすわり",
  prey_mole: "モグラ",
  prey_mouse: "ネズミ",
  prey_vole: "ハタネズミ",
  prey_rabbit: "ウサギ",
  prey_sparrow: "スズメ",
  fox: "キツネ",
  left: "左",
  right: "右",
  hold_pounce: "力をためている",
  mouth_full: "持っている獲物を先に食べるかか渡して。",
  hint_begin: "どこかをクリック、または Enter",
  hint_skip: "クリックでスキップ",
  obj_dune: "砂漠のまんなかにいる猫を探そう。",
  dlg_stray_one: "1匹。いいぞ。あと1匹だ。",
  reward_carry: "獲物を2つ同時に運べるようになった"
};
STR.ko = {
  title: "집으로 가는 길",
  chapter: "1장  —  메마른 땅",
  begin: "시작",
  continue_game: "이어하기",
  hunger: "배고픔",
  thirst: "목마름",
  stamina: "체력",
  wind: "바람",
  objective: "목표",
  obj_water: "메마른 땅을 건너 물을 찾으세요.",
  obj_drink: "물웅덩이에서 마시세요.",
  obj_mole: "Earth를 따라가 두더지를 잡으세요.",
  obj_survive: "사냥해서 살아남으세요. 바람을 살피세요.",
  obj_quest: "Dune에게 두더지 두 마리를 가져다주자.",
  obj_tracks: "기계의 무한궤도 자국을 따라가세요.",
  obj_back: "뒤에 아직 도움이 필요한 이가 있습니다.",
  intro1: "당신은 들에서 태어났습니다.",
  intro2: "이주 동안, 숲에는 당신과 엄마뿐이었지요.",
  intro3: "그때 거대한 기계가 왔습니다.",
  intro4: "숲을 부수고 엄마를 데려갔습니다.",
  intro5: "남겨진 땅에는 마실 부드러운 물이 없습니다.",
  name_earth: "Earth",
  name_you: "당신",
  name_stray: "Dune",
  name_mother: "엄마",
  dlg_earth1: "나는 Earth야. 이 메마른 땅에 남은 깨끗한 물은 여기뿐이야. 아직 사는 것들은 그걸 보물처럼 아껴.",
  dlg_you1: "여기서는 뭘 먹어?",
  dlg_earth2: "두더지. 몸을 낮추고 조용히 있다가, 땅이 내어 줄 때 뛰어.",
  dlg_earth3: "와. 녀석들이 사냥하는 부드러운 흙을 보여 줄게.",
  dlg_earth4: "저기. 두더지다. 땅 위로 나올 때까지 기다렸다가 덮쳐.",
  dlg_earth5: "이제 감을 잡았구나. 사막 깊은 곳에 Dune이라는 늙은 고양이가 살아. 내가 모르는 걸 알고 있지. 찾아가 보렴.",
  dlg_stray1: "나는 Dune이다. 이 사막은 오랜 세월 내 집이었지만, 이제 내 발은 너무 늙어 땅을 팔 수 없구나.",
  dlg_stray2: "두더지 두 마리를 가져오너라. 그 대가로 사냥감 두 개를 한 번에 나르는 법을 알려 주마.",
  dlg_stray_wait: "두더지 두 마리다. 부드러운 모래 밑을 움직이지. 귀를 기울여라.",
  dlg_stray3: "두 마리구나. 약속을 지켰군. 내가 어떻게 무는지 잘 보거라.",
  dlg_stray4: "첫 마리를 살며시 물고, 두 번째를 그 옆에 물어라. 이제 사냥감 두 개를 한 번에 나를 수 있다. 앞길은 아직 멀다.",
  tut_title: "Earth가 보여 줍니다",
  tut_move: "A와 D, 또는 방향키로 움직입니다. Shift는 질주. Space는 점프.",
  tut_actions: "S를 누르고 낮고 조용히 살금살금. J를 눌러 힘을 모았다가 놓으면 덮칩니다. E는 마시고, 먹고, 말합니다.",
  tut_mole: "두더지는 흙 속을 다닙니다. 움직이는 흙더미를 서두르지 말고 따르세요. 나오면 덮치세요.",
  tut_wind: "바람이 먹이에게서 당신 얼굴로 불게 하세요. 냄새가 실리면 더 일찍 달아납니다.",
  tut_touch: "작은 화면의 버튼도 같습니다. 누르면 파랗게 빛납니다.",
  tut_ok: "알겠어",
  tip_mouse: "Earth: 쥐는 온통 살금살금이야. 끝까지 천천히 다가가 덮쳐. 한 걸음만 빨라도 사라져.",
  tip_vole: "Earth: 들쥐에게 살금살금. 달아나는 순간 질주해서 쫓아. 추격은 짧아.",
  tip_rabbit: "Earth: 엎드리지 마. 토끼는 굴로 뛰어. 구멍에 들어가기 전에 질주해서 잡아.",
  tip_sparrow: "Earth: 가까이 살금살금. 참새가 땅을 뜨는 그 순간에 뛰어서 덮쳐.",
  tip_fox: "Earth: 여우는 너를 되사냥해. 높은 곳은 못 따라와. 올라가.",
  reward_jump: "이단 점프를 배웠다",
  end1: "궤도 자국이 먼지를 가르며 도로를 향해 곧게 나 있다.",
  end2: "엄마는 그쪽으로 끌려갔어. 집으로 가는 길은 이제 시작이야.",
  end3: "다음 이야기에 계속",
  faint: "들은 친절하지 않습니다. 마지막으로 안전하다고 느낀 곳에서 깨어납니다.",
  caught: "잡았다",
  drink: "마시기",
  eat: "먹기",
  give: "주기",
  language: "언어",
  checkpoint: "기억해 둘 곳",
  hint_keys: "A D 이동    Space 점프    Shift 질주    S 살금    J 덮치기    K 앞발    E 상호작용",
  emote_title: "감정 표현: 1~4 키",
  emote_sleep: "잠자기",
  emote_purr: "골골송",
  emote_meow: "야옹",
  emote_sit: "앉기",
  prey_mole: "두더지",
  prey_mouse: "쥐",
  prey_vole: "들쥐",
  prey_rabbit: "토끼",
  prey_sparrow: "참새",
  fox: "여우",
  left: "왼쪽",
  right: "오른쪽",
  hold_pounce: "힘 모으는 중",
  mouth_full: "이미 물고 있는 것을 먹거나 먼저 건네세요.",
  hint_begin: "아무 곳이나 클릭하거나 Enter",
  hint_skip: "클릭해서 건너뛰기",
  obj_dune: "사막 한가운데 있는 고양이를 찾자.",
  dlg_stray_one: "한 마리. 좋다. 한 마리 더 가져오너라.",
  reward_carry: "이제 사냥감 두 개를 한 번에 나를 수 있다"
};
STR.pt = {
  title: "O caminho de casa",
  chapter: "Capítulo 1  -  A terra estéril",
  begin: "Começar",
  continue_game: "Continuar",
  hunger: "Fome",
  thirst: "Sede",
  stamina: "Energia",
  wind: "Vento",
  objective: "Objetivo",
  obj_water: "Atravesse a terra estéril e encontre água.",
  obj_drink: "Beba da poça.",
  obj_mole: "Siga Earth e pegue uma toupeira.",
  obj_survive: "Cace para viver. Olhe o vento.",
  obj_quest: "Leve duas toupeiras para Dune.",
  obj_tracks: "Siga as marcas da máquina.",
  obj_back: "Alguém atrás de você ainda precisa de ajuda.",
  intro1: "Você nasceu no selvagem.",
  intro2: "Por duas semanas, a floresta guardou você e sua mãe.",
  intro3: "Então veio uma grande máquina.",
  intro4: "Ela quebrou o bosque e levou sua mãe.",
  intro5: "A terra que ela deixou não tem nada macio para beber.",
  name_earth: "Earth",
  name_you: "Você",
  name_stray: "Dune",
  name_mother: "Mãe",
  dlg_earth1: "Eu sou Earth. Esta é a única água limpa que resta nesta terra estéril. O que ainda vive aqui a trata como um tesouro.",
  dlg_you1: "O que se come aqui fora?",
  dlg_earth2: "Toupeiras. Fique baixo, fique quieto, e salte quando o chão as entregar.",
  dlg_earth3: "Venha. Vou mostrar a terra solta onde elas caçam.",
  dlg_earth4: "Ali. Uma toupeira. Espere até ela romper a superfície e então salte.",
  dlg_earth5: "Você entendeu. No fundo do deserto vive um gato velho chamado Dune. Ele sabe coisas que eu não sei. Vá encontrá-lo.",
  dlg_stray1: "Eu sou Dune. Este deserto é meu lar há muitas estações, mas minhas patas estão velhas demais para cavar.",
  dlg_stray2: "Traga-me duas toupeiras. Em troca, vou te ensinar a carregar duas presas de uma vez.",
  dlg_stray_wait: "Duas toupeiras. Elas se movem sob a areia solta. Escute.",
  dlg_stray3: "Duas toupeiras. Você cumpriu sua palavra. Veja como eu as seguro.",
  dlg_stray4: "Segure a primeira com cuidado e pegue a segunda ao lado. Agora você pode carregar duas presas de uma vez. O caminho é longo.",
  tut_title: "Earth mostra como",
  tut_move: "Mova-se com A e D, ou as setas. Shift corre. Espaço pula.",
  tut_actions: "Segure S para espreitar, baixo e quieto. Segure J para carregar um bote e solte. E bebe, come e fala.",
  tut_mole: "Toupeiras viajam sob o solo. Siga o monte sem pressa. Quando ela surgir, salte.",
  tut_wind: "Deixe o vento no seu rosto, da presa até você. Se ele levar seu cheiro, elas fogem mais cedo.",
  tut_touch: "Numa tela pequena, os botões fazem o mesmo. Piscando em azul ao apertar.",
  tut_ok: "Entendi",
  tip_mouse: "Earth: Um camundongo é só espreita. Aproxime-se devagar e então salte. Um passo rápido e ele some.",
  tip_vole: "Earth: Espreite o rato-do-campo. No instante em que disparar, corra atrás. A perseguição é curta.",
  tip_rabbit: "Earth: Não se agache. O coelho corre para a toca. Corra e pegue-o antes do buraco.",
  tip_sparrow: "Earth: Espreite de perto. Quando o pardal deixar o chão, salte naquele instante.",
  tip_fox: "Earth: Uma raposa caça você de volta. Ela não sobe no alto. Suba.",
  reward_jump: "Pulo duplo aprendido",
  end1: "Marcas de esteira cortam a poeira, retas até a estrada.",
  end2: "Sua mãe foi levada por ali. O caminho de casa só começou.",
  end3: "Continua",
  faint: "O selvagem não é gentil. Você acorda onde se sentiu seguro pela última vez.",
  caught: "Pegou",
  drink: "Beber",
  eat: "Comer",
  give: "Dar",
  language: "Idioma",
  checkpoint: "Um lugar para lembrar",
  hint_keys: "A D mover    Espaço pular    Shift correr    S espreitar    J saltar    K pata    E agir",
  emote_title: "Emotes: aperte 1 a 4",
  emote_sleep: "Dormir",
  emote_purr: "Ronronar",
  emote_meow: "Miar",
  emote_sit: "Sentar",
  prey_mole: "Toupeira",
  prey_mouse: "Camundongo",
  prey_vole: "Rato-do-campo",
  prey_rabbit: "Coelho",
  prey_sparrow: "Pardal",
  fox: "Raposa",
  left: "esquerda",
  right: "direita",
  hold_pounce: "Carregando bote",
  mouth_full: "Coma ou entregue o que você já carrega.",
  hint_begin: "Clique em qualquer lugar ou pressione Enter",
  hint_skip: "Clique para pular",
  obj_dune: "Encontre o gato no meio do deserto.",
  dlg_stray_one: "Uma. Bom. Traga mais uma.",
  reward_carry: "Agora você carrega duas presas de uma vez"
};
STR.it = {
  title: "La strada di casa",
  chapter: "Capitolo 1  -  La terra brulla",
  begin: "Inizia",
  continue_game: "Continua",
  hunger: "Fame",
  thirst: "Sete",
  stamina: "Energia",
  wind: "Vento",
  objective: "Obiettivo",
  obj_water: "Attraversa la terra brulla e trova l'acqua.",
  obj_drink: "Bevi dalla pozza.",
  obj_mole: "Segui Earth e prendi una talpa.",
  obj_survive: "Caccia per vivere. Guarda il vento.",
  obj_quest: "Porta due talpe a Dune.",
  obj_tracks: "Segui le tracce della macchina.",
  obj_back: "Qualcuno dietro di te ha ancora bisogno di aiuto.",
  intro1: "Sei nato nella natura.",
  intro2: "Per due settimane, la foresta ha tenuto te e tua madre.",
  intro3: "Poi è arrivata una grande macchina.",
  intro4: "Ha spezzato il bosco e ha portato via tua madre.",
  intro5: "La terra che ha lasciato non ha nulla di morbido da bere.",
  name_earth: "Earth",
  name_you: "Tu",
  name_stray: "Dune",
  name_mother: "Madre",
  dlg_earth1: "Sono Earth. Questa è l'unica acqua pulita rimasta in questa terra brulla. Chi vive ancora qui la tratta come un tesoro.",
  dlg_you1: "Cosa si mangia qui fuori?",
  dlg_earth2: "Talpe. Stai basso, stai zitto, e salta quando il suolo le consegna.",
  dlg_earth3: "Vieni. Ti mostro la terra smossa dove cacciano.",
  dlg_earth4: "Lì. Una talpa. Aspetta che rompa la superficie, poi balza.",
  dlg_earth5: "Hai capito. Nel cuore del deserto vive un vecchio gatto di nome Dune. Sa cose che io non so. Vai a cercarlo.",
  dlg_stray1: "Sono Dune. Questo deserto è la mia casa da molte stagioni, ma le mie zampe sono troppo vecchie per scavare.",
  dlg_stray2: "Portami due talpe. In cambio ti insegnerò a portare due prede alla volta.",
  dlg_stray_wait: "Due talpe. Si muovono sotto la sabbia soffice. Ascoltale.",
  dlg_stray3: "Due talpe. Hai mantenuto la parola. Guarda come le tengo.",
  dlg_stray4: "Tieni la prima con delicatezza, poi prendi la seconda accanto. Ora puoi portare due prede alla volta. La strada è lunga.",
  tut_title: "Earth ti mostra come",
  tut_move: "Muoviti con A e D, o le frecce. Shift scatta. Spazio salta.",
  tut_actions: "Tieni S per appostarti, basso e silenzioso. Tieni J per caricare un balzo e rilascia. E beve, mangia e parla.",
  tut_mole: "Le talpe viaggiano sotto il suolo. Segui il cumulo senza fretta. Quando esce, balza.",
  tut_wind: "Tieni il vento in faccia, dalla preda verso di te. Se porta il tuo odore, fuggono prima.",
  tut_touch: "Su uno schermo piccolo, i pulsanti fanno lo stesso. Lampeggiano di blu quando li premi.",
  tut_ok: "Ho capito",
  tip_mouse: "Earth: Un topo è tutto appostamento. Avvicinati piano e poi balza. Un passo veloce e sparisce.",
  tip_vole: "Earth: Appostati sull'arvicola. Appena scatta, sprinta dietro. L'inseguimento è breve.",
  tip_rabbit: "Earth: Non strisciare. Un coniglio corre alla tana. Sprinta e prendilo prima del buco.",
  tip_sparrow: "Earth: Appostati vicino. Quando il passero lascia il suolo, salta in quell'istante.",
  tip_fox: "Earth: Una volpe ti caccia a sua volta. Non può salire in alto. Arrampicati.",
  reward_jump: "Doppio salto imparato",
  end1: "I segni dei cingoli tagliano la polvere, dritti verso la strada.",
  end2: "Tua madre è stata portata da quella parte. La strada di casa è appena iniziata.",
  end3: "Continua",
  faint: "Il selvatico non è gentile. Ti svegli dove ti sei sentito al sicuro.",
  caught: "Preso",
  drink: "Bere",
  eat: "Mangiare",
  give: "Dare",
  language: "Lingua",
  checkpoint: "Un luogo da ricordare",
  hint_keys: "A D muovi    Spazio salta    Shift scatta    S apposta    J balza    K zampa    E agisci",
  emote_title: "Emote: premi da 1 a 4",
  emote_sleep: "Dormire",
  emote_purr: "Fare le fusa",
  emote_meow: "Miagolare",
  emote_sit: "Sedersi",
  prey_mole: "Talpa",
  prey_mouse: "Topo",
  prey_vole: "Arvicola",
  prey_rabbit: "Coniglio",
  prey_sparrow: "Passero",
  fox: "Volpe",
  left: "sinistra",
  right: "destra",
  hold_pounce: "Carica il balzo",
  mouth_full: "Mangia o consegna ciò che porti già.",
  hint_begin: "Clicca ovunque o premi Invio",
  hint_skip: "Clicca per saltare",
  obj_dune: "Trova il gatto in mezzo al deserto.",
  dlg_stray_one: "Una. Bene. Portamene un'altra.",
  reward_carry: "Ora puoi portare due prede alla volta"
};
STR.ru = {
  title: "Дорога домой",
  chapter: "Глава 1  —  Бесплодная земля",
  begin: "Начать",
  continue_game: "Продолжить",
  hunger: "Голод",
  thirst: "Жажда",
  stamina: "Силы",
  wind: "Ветер",
  objective: "Цель",
  obj_water: "Перейди бесплодную землю и найди воду.",
  obj_drink: "Пей из лужи.",
  obj_mole: "Иди за Earth и поймай крота.",
  obj_survive: "Охоться, чтобы жить. Следи за ветром.",
  obj_quest: "Принеси Dune двух кротов.",
  obj_tracks: "Иди по следам машины.",
  obj_back: "Кому-то позади всё ещё нужна помощь.",
  intro1: "Ты родился в дикой природе.",
  intro2: "Две недели лес держал тебя и твою мать.",
  intro3: "Потом пришла огромная машина.",
  intro4: "Она сломала лес и увезла твою мать.",
  intro5: "На земле, что она оставила, нечего мягкого пить.",
  name_earth: "Earth",
  name_you: "Ты",
  name_stray: "Dune",
  name_mother: "Мать",
  dlg_earth1: "Я Earth. Это единственная чистая вода на этой бесплодной земле. Кто ещё жив, бережёт её как сокровище.",
  dlg_you1: "Что здесь едят?",
  dlg_earth2: "Кротов. Держись низко, тихо, и прыгай, когда земля их отдаёт.",
  dlg_earth3: "Идём. Я покажу рыхлую землю, где они охотятся.",
  dlg_earth4: "Там крот. Жди, пока он выйдет на поверхность, потом бросайся.",
  dlg_earth5: "Ты понял. В глубине пустыни живёт старый кот по имени Dune. Он знает то, чего не знаю я. Найди его.",
  dlg_stray1: "Я Dune. Эта пустыня была моим домом много сезонов, но мои лапы слишком стары, чтобы копать.",
  dlg_stray2: "Принеси мне двух кротов. Взамен я научу тебя носить две добычи сразу.",
  dlg_stray_wait: "Двух кротов. Они двигаются под рыхлым песком. Прислушайся.",
  dlg_stray3: "Два крота. Ты сдержал слово. Смотри, как я их держу.",
  dlg_stray4: "Держи первого бережно, а второго возьми рядом. Теперь ты можешь носить две добычи сразу. Путь впереди долгий.",
  tut_title: "Earth показывает",
  tut_move: "Двигайся на A и D или стрелками. Shift — рывок. Пробел — прыжок.",
  tut_actions: "Держи S, чтобы красться низко и тихо. Держи J, чтобы зарядить бросок, и отпусти. E пьёт, ест и говорит.",
  tut_mole: "Кроты идут под землёй. Следуй за холмиком не спеша. Когда выйдет — бросайся.",
  tut_wind: "Пусть ветер дует тебе в лицо, от добычи к тебе. Если он несёт твой запах, они убегут раньше.",
  tut_touch: "На маленьком экране кнопки делают то же самое. Они вспыхивают синим.",
  tut_ok: "Понятно",
  tip_mouse: "Earth: Мышь — это только красться. Подходи тихо весь путь, потом бросайся. Один быстрый шаг — и её нет.",
  tip_vole: "Earth: Подкрадись к полёвке. Как только она рванёт, беги следом. Погоня короткая.",
  tip_rabbit: "Earth: Не крадись. Кролик бежит в нору. Беги и поймай его до норы.",
  tip_sparrow: "Earth: Подкрадись близко. Когда воробей оторвётся от земли, прыгни в тот миг.",
  tip_fox: "Earth: Лиса охотится на тебя. Наверх она не заберётся. Лезь.",
  reward_jump: "Двойной прыжок изучен",
  end1: "Следы гусениц режут пыль прямо к шоссе.",
  end2: "Твою мать увезли туда. Дорога домой только началась.",
  end3: "Продолжение следует",
  faint: "Дикая природа не добра. Ты просыпаешься там, где в последний раз был в безопасности.",
  caught: "Поймано",
  drink: "Пить",
  eat: "Есть",
  give: "Отдать",
  language: "Язык",
  checkpoint: "Место, которое стоит помнить",
  hint_keys: "A D шаг    Пробел прыжок    Shift рывок    S красться    J бросок    K лапа    E действие",
  emote_title: "Эмоции: клавиши 1–4",
  emote_sleep: "Спать",
  emote_purr: "Мурлыкать",
  emote_meow: "Мяукать",
  emote_sit: "Сесть",
  prey_mole: "Крот",
  prey_mouse: "Мышь",
  prey_vole: "Полёвка",
  prey_rabbit: "Кролик",
  prey_sparrow: "Воробей",
  fox: "Лиса",
  left: "слева",
  right: "справа",
  hold_pounce: "Заряд броска",
  mouth_full: "Сначала съешь или отдай то, что уже несёшь.",
  hint_begin: "Нажми в любом месте или Enter",
  hint_skip: "Нажми, чтобы пропустить",
  obj_dune: "Найди кота посреди пустыни.",
  dlg_stray_one: "Один. Хорошо. Принеси ещё одного.",
  reward_carry: "Теперь можно носить две добычи сразу"
};
STR.ar = {
  title: "طريق العودة",
  chapter: "الفصل 1  —  الأرض الجرداء",
  begin: "ابدأ",
  continue_game: "متابعة",
  hunger: "الجوع",
  thirst: "العطش",
  stamina: "الطاقة",
  wind: "الريح",
  objective: "الهدف",
  obj_water: "اعبر الأرض الجرداء وابحث عن الماء.",
  obj_drink: "اشرب من البركة.",
  obj_mole: "اتبع Earth واصطد خلدًا.",
  obj_survive: "اصطد لتعيش. راقب الريح.",
  obj_quest: "أحضر لـ Dune خُلدين.",
  obj_tracks: "اتبع آثار الآلة.",
  obj_back: "ما زال هناك من يحتاج مساعدتك خلفك.",
  intro1: "وُلدت في البرية.",
  intro2: "لأسبوعين، احتضنتك الغابة أنت وأمك.",
  intro3: "ثم جاءت آلة عظيمة.",
  intro4: "حطمت الغابة وأخذت أمك.",
  intro5: "الأرض التي تركتها لا ماء لينًا فيها للشرب.",
  name_earth: "Earth",
  name_you: "أنت",
  name_stray: "Dune",
  name_mother: "الأم",
  dlg_earth1: "أنا Earth. هذا آخر ماء نظيف في هذه الأرض الجرداء. من بقي حيًا هنا يصونه ككنز.",
  dlg_you1: "ماذا تأكلون هنا؟",
  dlg_earth2: "الخلد. ابق منخفضًا وهادئًا، واقفز حين يسلمه التراب.",
  dlg_earth3: "تعال. سأريك التربة الرخوة حيث يصطادون.",
  dlg_earth4: "هناك خلد. انتظر حتى يخرج إلى السطح ثم انقض.",
  dlg_earth5: "لقد فهمت. في عمق الصحراء يعيش قط عجوز اسمه Dune. يعرف أشياء لا أعرفها. اذهب وابحث عنه.",
  dlg_stray1: "أنا Dune. هذه الصحراء بيتي منذ مواسم كثيرة، لكن مخالبي صارت أكبر من أن تحفر.",
  dlg_stray2: "أحضر لي خُلدين. في المقابل سأعلّمك كيف تحمل فريستين معًا.",
  dlg_stray_wait: "خُلدان. يتحركان تحت الرمل الرخو. أنصت إليهما.",
  dlg_stray3: "خُلدان. لقد وفيت بوعدك. انظر كيف أحملهما.",
  dlg_stray4: "أمسك الأول برفق، ثم خذ الثاني بجانبه. الآن يمكنك حمل فريستين معًا. الطريق أمامك طويل.",
  tut_title: "Earth يريك الطريقة",
  tut_move: "تحرك بـ A و D أو الأسهم. Shift للعدو. المسافة للقفز.",
  tut_actions: "أبقِ S للتسلل، منخفضًا وهادئًا. أبقِ J لتجميع الانقضاض ثم أفلته. E للشرب والأكل والكلام.",
  tut_mole: "الخلد يسير تحت التربة. اتبع الكومة المتحركة بلا عجلة. حين يظهر، انقض.",
  tut_wind: "اجعل الريح في وجهك، من الفريسة إليك. إن حملت رائحتك، هربت أبكر.",
  tut_touch: "على الشاشة الصغيرة، الأزرار تفعل الشيء نفسه. تومض بالأزرق حين تضغطها.",
  tut_ok: "فهمت",
  tip_mouse: "Earth: الفأر كله تسلل. اقترب ببطء ثم انقض. خطوة سريعة ويختفي.",
  tip_vole: "Earth: تسلل إلى جرذ الحقل. ما إن يفر، اعدُ خلفه. المطاردة قصيرة.",
  tip_rabbit: "Earth: لا تزحف. الأرنب يركض إلى جحره. اعدُ وأمسكه قبل الحفرة.",
  tip_sparrow: "Earth: تسلل قريبًا. حين يغادر العصفور الأرض، اقفز وانقض في تلك اللحظة.",
  tip_fox: "Earth: الثعلب يصطادك أنت. لا يستطيع الصعود. تسلق.",
  reward_jump: "تعلمت القفزة المزدوجة",
  end1: "آثار الجنزير تشق الغبار مستقيمة نحو الطريق السريع.",
  end2: "أُخذت أمك إلى هناك. طريق العودة قد بدأ للتو.",
  end3: "يتبع",
  faint: "البرية ليست رحيمة. تستيقظ حيث شعرت بالأمان آخر مرة.",
  caught: "أُمسك",
  drink: "اشرب",
  eat: "كُل",
  give: "أعطِ",
  language: "اللغة",
  checkpoint: "مكان لتذكره",
  hint_keys: "A D تحرك    مسافة اقفز    Shift اعدُ    S تسلل    J انقض    K مخلب    E تفاعل",
  emote_title: "تعبيرات: اضغط 1 إلى 4",
  emote_sleep: "نوم",
  emote_purr: "خرخرة",
  emote_meow: "مواء",
  emote_sit: "جلوس",
  prey_mole: "خلد",
  prey_mouse: "فأر",
  prey_vole: "جرذ حقل",
  prey_rabbit: "أرنب",
  prey_sparrow: "عصفور",
  fox: "ثعلب",
  left: "اليسار",
  right: "اليمين",
  hold_pounce: "تجميع الانقضاض",
  mouth_full: "كُل أو سلّم ما تحمله أولًا.",
  hint_begin: "انقر في أي مكان أو اضغط Enter",
  hint_skip: "انقر للتخطي",
  obj_dune: "ابحث عن القط في منتصف الصحراء.",
  dlg_stray_one: "واحد. جيد. أحضر لي واحدًا آخر.",
  reward_carry: "يمكنك الآن حمل فريستين معًا"
};
STR.hi = {
  title: "घर की राह",
  chapter: "अध्याय 1  —  सूखी धरती",
  begin: "शुरू",
  continue_game: "जारी रखें",
  hunger: "भूख",
  thirst: "प्यास",
  stamina: "ताकत",
  wind: "हवा",
  objective: "लक्ष्य",
  obj_water: "सूखी धरती पार कर पानी खोजो।",
  obj_drink: "पोखर से पानी पियो।",
  obj_mole: "Earth के साथ चलो और छछूँदर पकड़ो।",
  obj_survive: "जीने के लिए शिकार करो। हवा देखो।",
  obj_quest: "Dune के लिए दो छछूंदर लाओ।",
  obj_tracks: "मशीन के निशान पर चलो।",
  obj_back: "पीछे किसी को अब भी मदद चाहिए।",
  intro1: "तुम जंगल में जन्मे।",
  intro2: "दो हफ्ते तक जंगल में बस तुम और तुम्हारी माँ थे।",
  intro3: "फिर एक बड़ी मशीन आई।",
  intro4: "उसने जंगल तोड़ दिया और तुम्हारी माँ को ले गई।",
  intro5: "जो धरती बची, उसमें पीने को नरम पानी नहीं।",
  name_earth: "Earth",
  name_you: "तुम",
  name_stray: "Dune",
  name_mother: "माँ",
  dlg_earth1: "मैं Earth हूँ। इस सूखी धरती पर बचा साफ पानी यही है। जो अभी जीवित हैं, उसे खजाना मानते हैं।",
  dlg_you1: "यहाँ क्या खाते हो?",
  dlg_earth2: "छछूँदर। नीचे रहो, चुप रहो, और जब मिट्टी उन्हें दे, तब कूदो।",
  dlg_earth3: "आओ। मैं वह ढीली मिट्टी दिखाता हूँ जहाँ वे शिकार करते हैं।",
  dlg_earth4: "वहाँ। एक छछूँदर। सतह तोड़ने तक रुको, फिर झपटो।",
  dlg_earth5: "तुम समझ गए। रेगिस्तान के भीतर Dune नाम का एक बूढ़ा बिल्ला रहता है। वह वो जानता है जो मैं नहीं जानती। उसे ढूँढो।",
  dlg_stray1: "मैं Dune हूँ। यह रेगिस्तान कई मौसमों से मेरा घर है, पर मेरे पंजे अब खोदने के लिए बहुत बूढ़े हैं।",
  dlg_stray2: "मुझे दो छछूंदर लाकर दो। बदले में मैं तुम्हें एक साथ दो शिकार ले जाना सिखाऊँगा।",
  dlg_stray_wait: "दो छछूंदर। वे ढीली रेत के नीचे चलते हैं। ध्यान से सुनो।",
  dlg_stray3: "दो छछूंदर। तुमने वादा निभाया। देखो मैं उन्हें कैसे पकड़ता हूँ।",
  dlg_stray4: "पहले को धीरे से पकड़ो, फिर दूसरे को उसके पास लो। अब तुम एक साथ दो शिकार ले जा सकते हो। आगे का रास्ता लंबा है।",
  tut_title: "Earth सिखाता है",
  tut_move: "A और D या तीरों से चलो। Shift दौड़। Space छलांग।",
  tut_actions: "S दबाकर दबकर चलो, नीचा और शांत। J दबाकर झपट जमा करो, छोड़ो। E पीता, खाता और बोलता है।",
  tut_mole: "छछूँदर मिट्टी के नीचे चलती है। चलते टीले के पीछे बिना जल्दबाजी चलो। जब निकले, झपटो।",
  tut_wind: "हवा चेहरे पर रखो, शिकार से तुम्हारी ओर। अगर तुम्हारी गंध जाए, वे जल्दी भागेंगे।",
  tut_touch: "छोटी स्क्रीन पर बटन वही करते हैं। दबाने पर नीली चमक आती है।",
  tut_ok: "समझ गया",
  tip_mouse: "Earth: चूहा सिर्फ दबकर चलने से मिलता है। पूरे रास्ते धीरे जाओ, फिर झपटो। एक तेज कदम और वह गया।",
  tip_vole: "Earth: वोल के पास दबकर जाओ। जैसे ही भागे, दौड़कर पकड़ो। पीछा छोटा है।",
  tip_rabbit: "Earth: रेंगो मत। खरगोश बिल की ओर दौड़ता है। दौड़ो और गड्ढे से पहले पकड़ो।",
  tip_sparrow: "Earth: पास तक दबकर जाओ। गौरैया जमीन छोड़े, उसी क्षण कूदकर झपटो।",
  tip_fox: "Earth: लोमड़ी तुम्हारा शिकार करती है। ऊँचाई पर नहीं चढ़ती। चढ़ जाओ।",
  reward_jump: "दोहरी छलांग सीखी",
  end1: "पटरी के निशान धूल को काटते हुए सड़क की ओर सीधे जाते हैं।",
  end2: "तुम्हारी माँ उसी ओर ले जाई गई। घर की राह अभी शुरू हुई है।",
  end3: "आगे जारी",
  faint: "जंगल दयालु नहीं। तुम वहाँ जागते हो जहाँ आखिरी बार सुरक्षित लगे थे।",
  caught: "पकड़ा",
  drink: "पियो",
  eat: "खाओ",
  give: "दो",
  language: "भाषा",
  checkpoint: "याद रखने की जगह",
  hint_keys: "A D चलो    Space कूदो    Shift दौड़ो    S दबकर    J झपटो    K पंजा    E क्रिया",
  emote_title: "भाव: 1 से 4 दबाएँ",
  emote_sleep: "सोना",
  emote_purr: "घुरघुराना",
  emote_meow: "म्याऊँ",
  emote_sit: "बैठना",
  prey_mole: "छछूँदर",
  prey_mouse: "चूहा",
  prey_vole: "वोल",
  prey_rabbit: "खरगोश",
  prey_sparrow: "गौरैया",
  fox: "लोमड़ी",
  left: "बाएँ",
  right: "दाएँ",
  hold_pounce: "झपट जमा हो रही है",
  mouth_full: "पहले जो पकड़ा है उसे खाओ या दे दो।",
  hint_begin: "कहीं भी क्लिक करें या Enter दबाएँ",
  hint_skip: "छोड़ने के लिए क्लिक करें",
  obj_dune: "रेगिस्तान के बीच वाली बिल्ली को ढूँढो।",
  dlg_stray_one: "एक। अच्छा। एक और लाओ।",
  reward_carry: "अब तुम एक साथ दो शिकार ले जा सकते हो"
};
STR.vi = {
  title: "Đường về nhà",
  chapter: "Chương 1  -  Vùng đất cằn",
  begin: "Bắt đầu",
  continue_game: "Tiếp tục",
  hunger: "Đói",
  thirst: "Khát",
  stamina: "Sức",
  wind: "Gió",
  objective: "Mục tiêu",
  obj_water: "Băng qua vùng đất cằn và tìm nước.",
  obj_drink: "Uống nước ở vũng.",
  obj_mole: "Đi theo Earth và bắt một con chuột chũi.",
  obj_survive: "Săn để sống. Để ý hướng gió.",
  obj_quest: "Mang hai con chuột chũi cho Dune.",
  obj_tracks: "Đi theo vết xích của máy.",
  obj_back: "Phía sau vẫn có người cần bạn giúp.",
  intro1: "Bạn sinh ra nơi hoang dã.",
  intro2: "Hai tuần, khu rừng chỉ có bạn và mẹ.",
  intro3: "Rồi một cỗ máy lớn kéo đến.",
  intro4: "Nó phá nát rừng và đưa mẹ bạn đi.",
  intro5: "Mảnh đất nó để lại không còn nước mềm để uống.",
  name_earth: "Earth",
  name_you: "Bạn",
  name_stray: "Dune",
  name_mother: "Mẹ",
  dlg_earth1: "Tôi là Earth. Đây là chỗ nước sạch cuối cùng trên vùng đất cằn. Sinh vật còn sống coi nó như báu vật.",
  dlg_you1: "Ở đây các bạn ăn gì?",
  dlg_earth2: "Chuột chũi. Giữ thấp, giữ im, và nhảy khi đất nhả chúng ra.",
  dlg_earth3: "Đi. Tôi chỉ chỗ đất tơi chúng săn mồi.",
  dlg_earth4: "Kia. Một con chuột chũi. Đợi nó lên mặt đất rồi vồ.",
  dlg_earth5: "Con hiểu rồi. Sâu trong sa mạc có một con mèo già tên Dune. Ông biết những điều ta không biết. Hãy đi tìm ông.",
  dlg_stray1: "Ta là Dune. Sa mạc này là nhà ta nhiều mùa rồi, nhưng chân ta đã quá già để đào.",
  dlg_stray2: "Mang cho ta hai con chuột chũi. Đổi lại, ta sẽ dạy con cách mang hai con mồi cùng lúc.",
  dlg_stray_wait: "Hai con chuột chũi. Chúng di chuyển dưới lớp cát mềm. Hãy lắng nghe.",
  dlg_stray3: "Hai con. Con đã giữ lời. Xem ta ngậm chúng thế nào.",
  dlg_stray4: "Ngậm con đầu thật nhẹ, rồi lấy con thứ hai bên cạnh. Giờ con có thể mang hai con mồi cùng lúc. Đường phía trước còn dài.",
  tut_title: "Earth chỉ cho bạn",
  tut_move: "Di chuyển bằng A và D hoặc phím mũi tên. Shift chạy. Phím cách nhảy.",
  tut_actions: "Giữ S để rón rén, thấp và im. Giữ J để lấy đà rồi thả. E để uống, ăn và nói.",
  tut_mole: "Chuột chũi đi dưới đất. Theo ụ đất đang chuyển, đừng vội. Khi nó trồi lên, hãy vồ.",
  tut_wind: "Để gió thổi vào mặt bạn, từ con mồi tới bạn. Nếu gió mang mùi bạn đi, chúng chạy sớm hơn.",
  tut_touch: "Trên màn hình nhỏ, các nút làm cùng việc. Chúng nháy xanh khi bạn bấm.",
  tut_ok: "Tôi hiểu",
  tip_mouse: "Earth: Chuột chỉ có rón rén. Bò suốt đường rồi vồ. Một bước nhanh là nó mất.",
  tip_vole: "Earth: Rón rén tới chuột đồng. Vừa lúc nó phóng, hãy chạy theo. Cuộc đuổi rất ngắn.",
  tip_rabbit: "Earth: Đừng bò. Thỏ chạy về hang. Chạy nước rút và bắt trước khi nó vào lỗ.",
  tip_sparrow: "Earth: Rón rén lại gần. Khi chim sẻ rời đất, nhảy và vồ đúng khoảnh khắc đó.",
  tip_fox: "Earth: Cáo săn lại bạn. Nó không lên cao được. Hãy trèo.",
  reward_jump: "Đã học nhảy đôi",
  end1: "Vết xích cắt qua bụi, thẳng về phía đường lớn.",
  end2: "Mẹ bạn bị đưa về hướng đó. Đường về nhà mới chỉ bắt đầu.",
  end3: "Còn tiếp",
  faint: "Hoang dã không dịu dàng. Bạn tỉnh dậy ở nơi cuối cùng thấy an toàn.",
  caught: "Bắt được",
  drink: "Uống",
  eat: "Ăn",
  give: "Đưa",
  language: "Ngôn ngữ",
  checkpoint: "Một chỗ để nhớ",
  hint_keys: "A D đi    Cách nhảy    Shift chạy    S rón    J vồ    K vồ    E tương tác",
  emote_title: "Biểu cảm: nhấn 1 đến 4",
  emote_sleep: "Ngủ",
  emote_purr: "Rừ rừ",
  emote_meow: "Meo",
  emote_sit: "Ngồi",
  prey_mole: "Chuột chũi",
  prey_mouse: "Chuột",
  prey_vole: "Chuột đồng",
  prey_rabbit: "Thỏ",
  prey_sparrow: "Chim sẻ",
  fox: "Cáo",
  left: "trái",
  right: "phải",
  hold_pounce: "Đang lấy đà",
  mouth_full: "Hãy ăn hoặc đưa thứ bạn đang ngậm.",
  hint_begin: "Nhấp bất kỳ đâu hoặc nhấn Enter",
  hint_skip: "Nhấp để bỏ qua",
  obj_dune: "Tìm con mèo ở giữa sa mạc.",
  dlg_stray_one: "Một con. Tốt. Mang thêm một con nữa.",
  reward_carry: "Giờ bạn có thể mang hai con mồi cùng lúc"
};
STR.th = {
  title: "ทางกลับบ้าน",
  chapter: "บทที่ 1  -  ดินแดนแห้งแล้ง",
  begin: "เริ่ม",
  continue_game: "เล่นต่อ",
  hunger: "หิว",
  thirst: "กระหาย",
  stamina: "แรง",
  wind: "ลม",
  objective: "เป้าหมาย",
  obj_water: "ข้ามดินแดนแห้งแล้งแล้วหาน้ำ",
  obj_drink: "ดื่มน้ำจากแอ่ง",
  obj_mole: "ตาม Earth ไปจับตัวตุ่น",
  obj_survive: "ล่าเพื่ออยู่รอด ระวังทิศลม",
  obj_quest: "นำตุ่นสองตัวไปให้ Dune",
  obj_tracks: "ตามรอยตีนตะขาบของเครื่องจักร",
  obj_back: "ข้างหลังยังมีคนต้องการความช่วยเหลือ",
  intro1: "เจ้าเกิดในป่า",
  intro2: "สองสัปดาห์ ป่ามีเพียงเจ้ากับแม่",
  intro3: "แล้วเครื่องจักรยักษ์ก็มา",
  intro4: "มันทุบป่าและพาแม่ไป",
  intro5: "แผ่นดินที่เหลือไม่มีน้ำอ่อนให้ดื่ม",
  name_earth: "Earth",
  name_you: "เจ้า",
  name_stray: "Dune",
  name_mother: "แม่",
  dlg_earth1: "ฉันคือ Earth นี่คือน้ำสะอาดแห่งสุดท้ายบนดินแดนนี้ สิ่งที่ยังมีชีวิตถือว่ามันล้ำค่า",
  dlg_you1: "ที่นี่กินอะไร",
  dlg_earth2: "ตัวตุ่น ต่ำไว้ เงียบไว้ แล้วกระโดดเมื่อดินส่งมันออกมา",
  dlg_earth3: "มา ฉันจะพาไปดูดินร่วนที่มันล่า",
  dlg_earth4: "นั่น ตัวตุ่น รอจนมันโผล่ แล้วค่อยกระโจน",
  dlg_earth5: "เจ้าเข้าใจแล้ว ลึกเข้าไปในทะเลทรายมีแมวแก่ชื่อ Dune เขารู้สิ่งที่ข้าไม่รู้ ไปหาเขาเถิด",
  dlg_stray1: "ข้าคือ Dune ทะเลทรายนี้เป็นบ้านข้ามาหลายฤดู แต่อุ้งเท้าข้าแก่เกินจะขุดแล้ว",
  dlg_stray2: "นำตุ่นมาให้ข้าสองตัว แล้วข้าจะสอนวิธีคาบเหยื่อสองตัวพร้อมกัน",
  dlg_stray_wait: "ตุ่นสองตัว พวกมันเคลื่อนอยู่ใต้ทรายร่วน ตั้งใจฟังให้ดี",
  dlg_stray3: "ครบสองตัว เจ้ารักษาคำพูด ดูว่าข้าคาบพวกมันอย่างไร",
  dlg_stray4: "คาบตัวแรกเบาๆ แล้วคาบตัวที่สองไว้ข้างกัน ตอนนี้เจ้าคาบเหยื่อได้สองตัวพร้อมกัน ทางข้างหน้ายังอีกยาวไกล",
  tut_title: "Earth สอนเจ้า",
  tut_move: "เดินด้วย A และ D หรือปุ่มลูกศร Shift คือวิ่ง Space คือกระโดด",
  tut_actions: "กด S ค้างเพื่อย่อง ต่ำและเงียบ กด J ค้างเพื่อรวบพลังแล้วปล่อย E คือดื่ม กิน และพูด",
  tut_mole: "ตัวตุ่นเดินใต้ดิน ตามกองดินที่เคลื่อน โดยไม่รีบ เมื่อมันโผล่ จงกระโจน",
  tut_wind: "ให้ลมปะหน้า จากเหยื่อมาหาเจ้า ถ้าลมนำกลิ่นเจ้าไป พวกมันจะหนีเร็วขึ้น",
  tut_touch: "บนจอเล็ก ปุ่มทำอย่างเดียวกัน กดแล้วจะวาบสีฟ้า",
  tut_ok: "เข้าใจแล้ว",
  tip_mouse: "Earth: หนูต้องย่องตลอดทาง ค่อย ๆ เข้าไปแล้วกระโจน ก้าวเร็วครั้งเดียวมันหาย",
  tip_vole: "Earth: ย่องเข้าหาหนูนา พอมันพุ่ง จงวิ่งตาม การไล่สั้นมาก",
  tip_rabbit: "Earth: อย่าคลาน กระต่ายวิ่งกลับรู จงวิ่งให้ทันก่อนมันลงรู",
  tip_sparrow: "Earth: ย่องเข้าใกล้ เมื่อนกกระจอกลอยจากพื้น จงกระโดดและกระโจนในวินาทีนั้น",
  tip_fox: "Earth: สุนัขจิ้งจอกจะล่าเจ้ากลับ มันขึ้นที่สูงไม่ได้ จงปีน",
  reward_jump: "เรียนรู้การกระโดดสองจังหวะ",
  end1: "รอยตีนตะขาบกรีดฝุ่น ตรงไปสู่ทางหลวง",
  end2: "แม่ถูกพาไปทางนั้น ทางกลับบ้านเพิ่งเริ่ม",
  end3: "ติดตามตอนต่อไป",
  faint: "ป่าไม่ใจดี เจ้าตื่นในที่ที่เคยรู้สึกปลอดภัยครั้งสุดท้าย",
  caught: "จับได้",
  drink: "ดื่ม",
  eat: "กิน",
  give: "ให้",
  language: "ภาษา",
  checkpoint: "ที่ที่ควรจำ",
  hint_keys: "A D เดิน    Space กระโดด    Shift วิ่ง    S ย่อง    J กระโจน    K ตบ    E สื่อสาร",
  emote_title: "ท่าทาง: กด 1 ถึง 4",
  emote_sleep: "นอน",
  emote_purr: "ครางเบาๆ",
  emote_meow: "ร้องเหมียว",
  emote_sit: "นั่ง",
  prey_mole: "ตัวตุ่น",
  prey_mouse: "หนู",
  prey_vole: "หนูนา",
  prey_rabbit: "กระต่าย",
  prey_sparrow: "นกกระจอก",
  fox: "สุนัขจิ้งจอก",
  left: "ซ้าย",
  right: "ขวา",
  hold_pounce: "กำลังรวบพลัง",
  mouth_full: "กินหรือส่งสิ่งที่คาบอยู่ก่อน",
  hint_begin: "คลิกที่ใดก็ได้ หรือกด Enter",
  hint_skip: "คลิกเพื่อข้าม",
  obj_dune: "ตามหาแมวที่อยู่กลางทะเลทราย",
  dlg_stray_one: "หนึ่งตัว ดีมาก นำมาอีกตัว",
  reward_carry: "ตอนนี้คาบเหยื่อได้สองตัวพร้อมกัน"
};
STR.id = {
  title: "Jalan Pulang",
  chapter: "Bab 1  -  Tanah Gersang",
  begin: "Mulai",
  continue_game: "Lanjutkan",
  hunger: "Lapar",
  thirst: "Haus",
  stamina: "Tenaga",
  wind: "Angin",
  objective: "Tujuan",
  obj_water: "Seberangi tanah gersang dan temukan air.",
  obj_drink: "Minum dari genangan.",
  obj_mole: "Ikuti Earth dan tangkap tikus tanah.",
  obj_survive: "Berburu untuk hidup. Perhatikan angin.",
  obj_quest: "Bawakan Dune dua tikus tanah.",
  obj_tracks: "Ikuti jejak mesin.",
  obj_back: "Seseorang di belakang masih butuh bantuan.",
  intro1: "Kau lahir di alam liar.",
  intro2: "Selama dua minggu, hutan menampung kau dan ibumu.",
  intro3: "Lalu sebuah mesin besar datang.",
  intro4: "Ia menghancurkan hutan dan membawa ibumu.",
  intro5: "Tanah yang ditinggalkannya tak punya air lembut untuk diminum.",
  name_earth: "Earth",
  name_you: "Kau",
  name_stray: "Dune",
  name_mother: "Ibu",
  dlg_earth1: "Aku Earth. Ini satu-satunya air bersih yang tersisa di tanah gersang ini. Yang masih hidup menjaganya seperti harta.",
  dlg_you1: "Apa yang dimakan di sini?",
  dlg_earth2: "Tikus tanah. Tetap rendah, tetap diam, dan melompat saat tanah menyerahkannya.",
  dlg_earth3: "Mari. Akan kutunjukkan tanah gembur tempat mereka berburu.",
  dlg_earth4: "Di sana. Seekor tikus tanah. Tunggu sampai ia muncul, lalu menerkam.",
  dlg_earth5: "Kau sudah paham. Jauh di dalam gurun tinggal kucing tua bernama Dune. Dia tahu hal yang tidak kuketahui. Pergilah menemuinya.",
  dlg_stray1: "Aku Dune. Gurun ini rumahku selama banyak musim, tapi cakarku sudah terlalu tua untuk menggali.",
  dlg_stray2: "Bawakan aku dua tikus tanah. Sebagai gantinya, aku akan mengajarimu membawa dua buruan sekaligus.",
  dlg_stray_wait: "Dua tikus tanah. Mereka bergerak di bawah pasir gembur. Dengarkan.",
  dlg_stray3: "Dua tikus tanah. Kau menepati janji. Lihat cara aku menggigitnya.",
  dlg_stray4: "Gigit yang pertama dengan lembut, lalu ambil yang kedua di sampingnya. Sekarang kau bisa membawa dua buruan sekaligus. Jalan masih panjang.",
  tut_title: "Earth menunjukkan caranya",
  tut_move: "Bergerak dengan A dan D, atau tombol panah. Shift lari. Spasi lompat.",
  tut_actions: "Tahan S untuk mengendap, rendah dan sunyi. Tahan J untuk mengumpulkan terkaman, lalu lepas. E minum, makan, dan bicara.",
  tut_mole: "Tikus tanah berjalan di bawah tanah. Ikuti gundukan yang bergerak tanpa terburu. Saat ia muncul, terkam.",
  tut_wind: "Biarkan angin menerpa wajahmu, dari mangsa ke arahmu. Jika angin membawa baumu, mereka lari lebih cepat.",
  tut_touch: "Di layar kecil, tombol melakukan hal yang sama. Mereka berkedip biru saat ditekan.",
  tut_ok: "Aku mengerti",
  tip_mouse: "Earth: Tikus hanya soal mengendap. Mendekat pelan sepanjang jalan, lalu terkam. Satu langkah cepat dan ia hilang.",
  tip_vole: "Earth: Endap vole. Saat ia melesat, larilah mengejar. Kejarannya singkat.",
  tip_rabbit: "Earth: Jangan merayap. Kelinci berlari ke liang. Lari dan tangkap sebelum lubang.",
  tip_sparrow: "Earth: Endap dekat. Saat burung gereja meninggalkan tanah, lompat dan terkam pada saat itu.",
  tip_fox: "Earth: Rubah memburumu balik. Ia tak bisa naik ke tempat tinggi. Panjat.",
  reward_jump: "Lompat ganda dipelajari",
  end1: "Jejak rantai membelah debu, lurus menuju jalan raya.",
  end2: "Ibumu dibawa ke arah itu. Jalan pulang baru saja dimulai.",
  end3: "Bersambung",
  faint: "Alam liar tidak lembut. Kau terbangun di tempat terakhir kau merasa aman.",
  caught: "Tertangkap",
  drink: "Minum",
  eat: "Makan",
  give: "Berikan",
  language: "Bahasa",
  checkpoint: "Tempat untuk diingat",
  hint_keys: "A D gerak    Spasi lompat    Shift lari    S endap    J terkam    K cakar    E interaksi",
  emote_title: "Ekspresi: tekan 1 sampai 4",
  emote_sleep: "Tidur",
  emote_purr: "Mendengkur",
  emote_meow: "Mengeong",
  emote_sit: "Duduk",
  prey_mole: "Tikus tanah",
  prey_mouse: "Tikus",
  prey_vole: "Vole",
  prey_rabbit: "Kelinci",
  prey_sparrow: "Burung gereja",
  fox: "Rubah",
  left: "kiri",
  right: "kanan",
  hold_pounce: "Mengumpulkan terkaman",
  mouth_full: "Makan atau berikan yang sudah kau bawa.",
  hint_begin: "Klik di mana saja, atau tekan Enter",
  hint_skip: "Klik untuk melewati",
  obj_dune: "Temukan kucing di tengah gurun.",
  dlg_stray_one: "Satu. Bagus. Bawakan satu lagi.",
  reward_carry: "Sekarang kau bisa membawa dua buruan sekaligus"
};
STR.tr = {
  title: "Eve Giden Yol",
  chapter: "Bölüm 1  -  Çorak Toprak",
  begin: "Başla",
  continue_game: "Devam",
  hunger: "Açlık",
  thirst: "Susuzluk",
  stamina: "Güç",
  wind: "Rüzgâr",
  objective: "Hedef",
  obj_water: "Çorak toprağı geç ve su bul.",
  obj_drink: "Su birikintisinden iç.",
  obj_mole: "Earth'ü izle ve bir köstebek yakala.",
  obj_survive: "Yaşamak için avlan. Rüzgâra bak.",
  obj_quest: "Dune'a iki köstebek getir.",
  obj_tracks: "Makinenin palet izlerini izle.",
  obj_back: "Arkanda hâlâ yardıma ihtiyacı olan biri var.",
  intro1: "Yabanın içinde doğdun.",
  intro2: "İki hafta boyunca orman seni ve anneni tuttu.",
  intro3: "Sonra büyük bir makine geldi.",
  intro4: "Ormanı parçaladı ve anneni götürdü.",
  intro5: "Bıraktığı toprakta içilecek yumuşak bir şey yok.",
  name_earth: "Earth",
  name_you: "Sen",
  name_stray: "Dune",
  name_mother: "Anne",
  dlg_earth1: "Ben Earth. Bu çorak toprakta kalan tek temiz su burası. Hâlâ yaşayanlar ona hazine gibi bakar.",
  dlg_you1: "Burada ne yenir?",
  dlg_earth2: "Köstebek. Alçak dur, sessiz dur ve toprak onları verdiğinde zıpla.",
  dlg_earth3: "Gel. Avlandıkları gevşek toprağı göstereyim.",
  dlg_earth4: "Orada. Bir köstebek. Yüzeye çıkmasını bekle, sonra üstüne atıl.",
  dlg_earth5: "Anladın. Çölün derinliklerinde Dune adında yaşlı bir kedi yaşar. Benim bilmediğim şeyleri bilir. Git onu bul.",
  dlg_stray1: "Ben Dune. Bu çöl uzun mevsimlerdir evim, ama patilerim artık kazmak için fazla yaşlı.",
  dlg_stray2: "Bana iki köstebek getir. Karşılığında sana iki avı aynı anda taşımayı öğreteceğim.",
  dlg_stray_wait: "İki köstebek. Gevşek kumun altında hareket ederler. Dinle.",
  dlg_stray3: "İki köstebek. Sözünü tuttun. Onları nasıl tuttuğuma bak.",
  dlg_stray4: "Birincisini nazikçe tut, sonra ikincisini yanına al. Artık iki avı aynı anda taşıyabilirsin. Önündeki yol uzun.",
  tut_title: "Earth sana gösterir",
  tut_move: "A ve D ya da oklarla yürü. Shift koşar. Boşluk zıplar.",
  tut_actions: "S'ye basılı tut, alçak ve sessiz süzül. J'ye basılı tutup bırak, atıl. E içer, yer ve konuşur.",
  tut_mole: "Köstebekler toprağın altında gider. Hareket eden tümseği acele etmeden izle. Çıkınca atıl.",
  tut_wind: "Rüzgâr yüzüne gelsin, avdan sana. Kokunu taşırsa daha erken kaçarlar.",
  tut_touch: "Küçük ekranda düğmeler aynı işi yapar. Basınca mavi yanıp söner.",
  tut_ok: "Anladım",
  tip_mouse: "Earth: Fare tamamen süzülmektir. Yol boyunca yavaş yaklaş, sonra atıl. Bir hızlı adım ve gider.",
  tip_vole: "Earth: Tarla faresine süzül. Fırladığı an peşinden koş. Kovalamaca kısadır.",
  tip_rabbit: "Earth: Sürünme. Tavşan yuvasına koşar. Koş ve delikten önce yakala.",
  tip_sparrow: "Earth: Yakına süzül. Serçe yerden kalktığı anda zıpla ve atıl.",
  tip_fox: "Earth: Tilki seni avlar. Yükseğe çıkamaz. Tırman.",
  reward_jump: "Çift zıplama öğrenildi",
  end1: "Palet izleri tozu keser, dümdüz yola gider.",
  end2: "Annen o yöne götürüldü. Eve giden yol yeni başladı.",
  end3: "Devam edecek",
  faint: "Yaban nazik değildir. En son güvende hissettiğin yerde uyanırsın.",
  caught: "Yakalandı",
  drink: "İç",
  eat: "Ye",
  give: "Ver",
  language: "Dil",
  checkpoint: "Hatırlanacak bir yer",
  hint_keys: "A D yürü    Boşluk zıpla    Shift koş    S süzül    J atıl    K pençe    E etkile",
  emote_title: "İfadeler: 1–4 tuşları",
  emote_sleep: "Uyu",
  emote_purr: "Mırla",
  emote_meow: "Miyavla",
  emote_sit: "Otur",
  prey_mole: "Köstebek",
  prey_mouse: "Fare",
  prey_vole: "Tarla faresi",
  prey_rabbit: "Tavşan",
  prey_sparrow: "Serçe",
  fox: "Tilki",
  left: "sol",
  right: "sağ",
  hold_pounce: "Atılış birikiyor",
  mouth_full: "Taşıdığını önce ye ya da teslim et.",
  hint_begin: "Herhangi bir yere tıkla veya Enter'a bas",
  hint_skip: "Atlamak için tıkla",
  obj_dune: "Çölün ortasındaki kediyi bul.",
  dlg_stray_one: "Bir. Güzel. Bir tane daha getir.",
  reward_carry: "Artık iki avı aynı anda taşıyabilirsin"
};
STR.pl = {
  title: "Droga do domu",
  chapter: "Rozdział 1  -  Jałowa ziemia",
  begin: "Start",
  continue_game: "Kontynuuj",
  hunger: "Głód",
  thirst: "Pragnienie",
  stamina: "Siły",
  wind: "Wiatr",
  objective: "Cel",
  obj_water: "Przejdź jałową ziemię i znajdź wodę.",
  obj_drink: "Napij się z kałuży.",
  obj_mole: "Idź za Earth i złap kreta.",
  obj_survive: "Poluj, by żyć. Patrz na wiatr.",
  obj_quest: "Przynieś Dune dwa krety.",
  obj_tracks: "Idź śladami maszyny.",
  obj_back: "Ktoś z tyłu wciąż potrzebuje pomocy.",
  intro1: "Urodziłeś się na wolności.",
  intro2: "Przez dwa tygodnie las trzymał ciebie i twoją matkę.",
  intro3: "Potem przyjechała wielka maszyna.",
  intro4: "Rozbiła las i zabrała twoją matkę.",
  intro5: "Ziemia, którą zostawiła, nie ma nic miękkiego do picia.",
  name_earth: "Earth",
  name_you: "Ty",
  name_stray: "Dune",
  name_mother: "Matka",
  dlg_earth1: "Jestem Earth. To jedyna czysta woda na tej jałowej ziemi. To, co tu jeszcze żyje, chroni ją jak skarb.",
  dlg_you1: "Co tu się je?",
  dlg_earth2: "Krety. Trzymaj się nisko, cicho i skacz, gdy ziemia je oddaje.",
  dlg_earth3: "Chodź. Pokażę ci luźną ziemię, gdzie polują.",
  dlg_earth4: "Tam. Kret. Czekaj, aż przebije powierzchnię, potem skocz.",
  dlg_earth5: "Rozumiesz już. W głębi pustyni żyje stary kot imieniem Dune. Wie rzeczy, których ja nie wiem. Odszukaj go.",
  dlg_stray1: "Jestem Dune. Ta pustynia od wielu pór roku jest moim domem, ale moje łapy są już za stare do kopania.",
  dlg_stray2: "Przynieś mi dwa krety. W zamian nauczę cię nosić dwie zdobycze naraz.",
  dlg_stray_wait: "Dwa krety. Poruszają się pod sypkim piaskiem. Nasłuchuj.",
  dlg_stray3: "Dwa krety. Dotrzymałeś słowa. Patrz, jak je trzymam.",
  dlg_stray4: "Chwyć pierwszego delikatnie, a drugiego weź obok. Teraz możesz nosić dwie zdobycze naraz. Droga przed tobą jest długa.",
  tut_title: "Earth pokazuje jak",
  tut_move: "Ruszaj się A i D albo strzałkami. Shift biegnie. Spacja skacze.",
  tut_actions: "Przytrzymaj S, by skradać się nisko i cicho. Przytrzymaj J, by nabrać skoku, i puść. E pije, je i mówi.",
  tut_mole: "Krety idą pod ziemią. Idź za ruszającym się kopczykiem bez pośpiechu. Gdy wyjdzie, skocz.",
  tut_wind: "Niech wiatr wieje ci w twarz, od zdobyczy do ciebie. Jeśli niesie twój zapach, uciekną wcześniej.",
  tut_touch: "Na małym ekranie przyciski robią to samo. Błyskają na niebiesko.",
  tut_ok: "Rozumiem",
  tip_mouse: "Earth: Mysz to samo skradanie. Idź powoli całą drogę, potem skacz. Jeden szybki krok i jej nie ma.",
  tip_vole: "Earth: Podkradnij się do nornika. Gdy ruszy, biegnij za nim. Pogoń jest krótka.",
  tip_rabbit: "Earth: Nie czołgaj się. Królik biegnie do nory. Biegnij i złap go przed dziurą.",
  tip_sparrow: "Earth: Podkradnij się blisko. Gdy wróbel oderwie się od ziemi, skocz w tej chwili.",
  tip_fox: "Earth: Lis poluje na ciebie. Nie wejdzie na wysokość. Wespnij się.",
  reward_jump: "Podwójny skok poznany",
  end1: "Ślady gąsienic tną kurz, prosto ku szosie.",
  end2: "Twoją matkę zabrano w tamtą stronę. Droga do domu dopiero się zaczęła.",
  end3: "Ciąg dalszy nastąpi",
  faint: "Dzicz nie jest łaskawa. Budzisz się tam, gdzie ostatnio czułeś się bezpiecznie.",
  caught: "Złapane",
  drink: "Pij",
  eat: "Jedz",
  give: "Daj",
  language: "Język",
  checkpoint: "Miejsce do zapamiętania",
  hint_keys: "A D ruch    Spacja skok    Shift bieg    S skradanie    J atak    K łapa    E działanie",
  emote_title: "Emotki: klawisze 1–4",
  emote_sleep: "Śpij",
  emote_purr: "Mrucz",
  emote_meow: "Miaucz",
  emote_sit: "Siad",
  prey_mole: "Kret",
  prey_mouse: "Mysz",
  prey_vole: "Nornik",
  prey_rabbit: "Królik",
  prey_sparrow: "Wróbel",
  fox: "Lis",
  left: "lewo",
  right: "prawo",
  hold_pounce: "Nabieranie skoku",
  mouth_full: "Zjedz albo oddaj to, co już niesiesz.",
  hint_begin: "Kliknij gdziekolwiek albo naciśnij Enter",
  hint_skip: "Kliknij, aby pominąć",
  obj_dune: "Znajdź kota pośrodku pustyni.",
  dlg_stray_one: "Jeden. Dobrze. Przynieś jeszcze jednego.",
  reward_carry: "Możesz teraz nosić dwie zdobycze naraz"
};
STR.nl = {
  title: "De weg naar huis",
  chapter: "Hoofdstuk 1  -  Het kale land",
  begin: "Begin",
  continue_game: "Doorgaan",
  hunger: "Honger",
  thirst: "Dorst",
  stamina: "Kracht",
  wind: "Wind",
  objective: "Doel",
  obj_water: "Trek door het kale land en vind water.",
  obj_drink: "Drink uit de plas.",
  obj_mole: "Volg Earth en vang een mol.",
  obj_survive: "Jaag om te leven. Let op de wind.",
  obj_quest: "Breng Dune twee mollen.",
  obj_tracks: "Volg de sporen van de machine.",
  obj_back: "Iemand achter je heeft nog hulp nodig.",
  intro1: "Je werd geboren in het wild.",
  intro2: "Twee weken hield het bos jou en je moeder.",
  intro3: "Toen kwam er een grote machine.",
  intro4: "Hij brak het bos open en nam je moeder mee.",
  intro5: "Het land dat hij achterliet heeft niets zachts om te drinken.",
  name_earth: "Earth",
  name_you: "Jij",
  name_stray: "Dune",
  name_mother: "Moeder",
  dlg_earth1: "Ik ben Earth. Dit is het enige schone water dat op dit kale land rest. Wat hier nog leeft, bewaakt het als een schat.",
  dlg_you1: "Wat eet je hier?",
  dlg_earth2: "Mollen. Blijf laag, blijf stil, en spring als de grond ze geeft.",
  dlg_earth3: "Kom. Ik wijs je de losse aarde waar ze jagen.",
  dlg_earth4: "Daar. Een mol. Wacht tot hij doorbreekt, en spring dan.",
  dlg_earth5: "Je snapt het. Diep in de woestijn woont een oude kat die Dune heet. Hij weet dingen die ik niet weet. Ga hem zoeken.",
  dlg_stray1: "Ik ben Dune. Deze woestijn is al vele seizoenen mijn thuis, maar mijn poten zijn te oud om te graven.",
  dlg_stray2: "Breng me twee mollen. In ruil leer ik je twee prooien tegelijk te dragen.",
  dlg_stray_wait: "Twee mollen. Ze bewegen onder het losse zand. Luister goed.",
  dlg_stray3: "Twee mollen. Je hebt je woord gehouden. Kijk hoe ik ze vasthoud.",
  dlg_stray4: "Houd de eerste zacht vast en neem de tweede ernaast. Nu kun je twee prooien tegelijk dragen. De weg is nog lang.",
  tut_title: "Earth laat het zien",
  tut_move: "Beweeg met A en D, of de pijlen. Shift rent. Spatie springt.",
  tut_actions: "Houd S in om te sluipen, laag en stil. Houd J in om een sprong te laden en laat los. E drinkt, eet en praat.",
  tut_mole: "Mollen reizen onder de grond. Volg de bewegende bult zonder haast. Als hij opduikt, spring.",
  tut_wind: "Houd de wind in je gezicht, van de prooi naar jou. Draagt hij je geur, dan vluchten ze eerder.",
  tut_touch: "Op een klein scherm doen de knoppen hetzelfde. Ze flitsen blauw als je drukt.",
  tut_ok: "Ik begrijp het",
  tip_mouse: "Earth: Een muis is alleen sluipen. Kruip de hele weg en spring dan. Eén snelle stap en hij is weg.",
  tip_vole: "Earth: Besluip de woelmuis. Zodra hij wegrent, sprint je erachteraan. De jacht is kort.",
  tip_rabbit: "Earth: Niet kruipen. Een konijn rent naar zijn hol. Sprint en vang het vóór het gat.",
  tip_sparrow: "Earth: Sluip dichtbij. Als de mus de grond verlaat, spring op dat moment.",
  tip_fox: "Earth: Een vos jaagt op jou terug. Hij kan niet omhoog. Klim.",
  reward_jump: "Dubbelsprong geleerd",
  end1: "Rupsbanden snijden door het stof, recht naar de weg.",
  end2: "Je moeder werd die kant op gebracht. De weg naar huis is pas begonnen.",
  end3: "Wordt vervolgd",
  faint: "Het wild is niet vriendelijk. Je wordt wakker waar je je het laatst veilig voelde.",
  caught: "Gevangen",
  drink: "Drinken",
  eat: "Eten",
  give: "Geven",
  language: "Taal",
  checkpoint: "Een plek om te onthouden",
  hint_keys: "A D loop    Spatie spring    Shift ren    S sluip    J spring    K poot    E doe",
  emote_title: "Emotes: druk 1 t/m 4",
  emote_sleep: "Slapen",
  emote_purr: "Spinnen",
  emote_meow: "Miauwen",
  emote_sit: "Zitten",
  prey_mole: "Mol",
  prey_mouse: "Muis",
  prey_vole: "Woelmuis",
  prey_rabbit: "Konijn",
  prey_sparrow: "Mus",
  fox: "Vos",
  left: "links",
  right: "rechts",
  hold_pounce: "Sprong laden",
  mouth_full: "Eet of geef wat je al draagt.",
  hint_begin: "Klik ergens of druk op Enter",
  hint_skip: "Klik om over te slaan",
  obj_dune: "Vind de kat midden in de woestijn.",
  dlg_stray_one: "Eén. Goed. Breng me er nog één.",
  reward_carry: "Je kunt nu twee prooien tegelijk dragen"
};
STR.uk = {
  title: "Дорога додому",
  chapter: "Розділ 1  —  Пустка",
  begin: "Почати",
  continue_game: "Продовжити",
  hunger: "Голод",
  thirst: "Спрага",
  stamina: "Сили",
  wind: "Вітер",
  objective: "Ціль",
  obj_water: "Перейди пустку і знайди воду.",
  obj_drink: "Пий із калюжі.",
  obj_mole: "Іди за Earth і злови крота.",
  obj_survive: "Полюй, щоб жити. Стеж за вітром.",
  obj_quest: "Принеси Dune двох кротів.",
  obj_tracks: "Іди слідами машини.",
  obj_back: "Хтось позаду досі потребує допомоги.",
  intro1: "Ти народився в дикій природі.",
  intro2: "Два тижні ліс тримав тебе і твою матір.",
  intro3: "Потім прийшла велика машина.",
  intro4: "Вона зламала ліс і забрала твою матір.",
  intro5: "На землі, яку вона лишила, немає нічого м'якого пити.",
  name_earth: "Earth",
  name_you: "Ти",
  name_stray: "Dune",
  name_mother: "Мати",
  dlg_earth1: "Я Earth. Це єдина чиста вода на цій пустці. Хто ще живий, береже її як скарб.",
  dlg_you1: "Що тут їдять?",
  dlg_earth2: "Кротів. Тримайсь низько, тихо, і стрибай, коли земля їх віддає.",
  dlg_earth3: "Ходімо. Я покажу пухку землю, де вони полюють.",
  dlg_earth4: "Там кріт. Чекай, поки вийде на поверхню, тоді кидайся.",
  dlg_earth5: "Ти зрозумів. У глибині пустелі живе старий кіт на ім'я Dune. Він знає те, чого не знаю я. Знайди його.",
  dlg_stray1: "Я Dune. Ця пустеля була моїм домом багато сезонів, але мої лапи надто старі, щоб копати.",
  dlg_stray2: "Принеси мені двох кротів. Натомість я навчу тебе носити дві здобичі одразу.",
  dlg_stray_wait: "Двох кротів. Вони рухаються під пухким піском. Прислухайся.",
  dlg_stray3: "Два кроти. Ти дотримав слова. Дивись, як я їх тримаю.",
  dlg_stray4: "Тримай першого обережно, а другого візьми поруч. Тепер ти можеш носити дві здобичі одразу. Дорога ще довга.",
  tut_title: "Earth показує",
  tut_move: "Рухайся на A і D або стрілками. Shift — ривок. Пробіл — стрибок.",
  tut_actions: "Тримай S, щоб крастися низько й тихо. Тримай J, щоб зарядити стрибок, і відпусти. E п'є, їсть і говорить.",
  tut_mole: "Кроти йдуть під землею. Іди за горбком без поспіху. Коли вийде — кидайся.",
  tut_wind: "Нехай вітер дме тобі в обличчя, від здобичі до тебе. Якщо несе твій запах, вони втечуть раніше.",
  tut_touch: "На малому екрані кнопки роблять те саме. Вони спалахують синім.",
  tut_ok: "Зрозуміло",
  tip_mouse: "Earth: Миша — це лише крастися. Іди тихо весь шлях, потім кидайся. Один швидкий крок — і її немає.",
  tip_vole: "Earth: Підкрадись до полівки. Щойно вона рвоне, біжи слідом. Погоня коротка.",
  tip_rabbit: "Earth: Не крадись. Кріль біжить до нори. Біжи і злови його до нори.",
  tip_sparrow: "Earth: Підкрадись близько. Коли горобець відірветься від землі, стрибни в ту мить.",
  tip_fox: "Earth: Лисиця полює на тебе. Нагору вона не вилізе. Лізь.",
  reward_jump: "Подвійний стрибок вивчено",
  end1: "Сліди гусениць ріжуть пил просто до шосе.",
  end2: "Твою матір повезли туди. Дорога додому щойно почалася.",
  end3: "Далі буде",
  faint: "Дика природа не лагідна. Ти прокидаєшся там, де востаннє був у безпеці.",
  caught: "Спіймано",
  drink: "Пити",
  eat: "Їсти",
  give: "Віддати",
  language: "Мова",
  checkpoint: "Місце, яке варто пам'ятати",
  hint_keys: "A D крок    Пробіл стрибок    Shift ривок    S крастися    J кидок    K лапа    E дія",
  emote_title: "Емоції: клавіші 1–4",
  emote_sleep: "Спати",
  emote_purr: "Муркотіти",
  emote_meow: "Нявкати",
  emote_sit: "Сісти",
  prey_mole: "Кріт",
  prey_mouse: "Миша",
  prey_vole: "Полівка",
  prey_rabbit: "Кріль",
  prey_sparrow: "Горобець",
  fox: "Лисиця",
  left: "ліворуч",
  right: "праворуч",
  hold_pounce: "Заряд стрибка",
  mouth_full: "Спочатку з'їж або віддай те, що вже несеш.",
  hint_begin: "Клацни будь-де або натисни Enter",
  hint_skip: "Клацни, щоб пропустити",
  obj_dune: "Знайди кота посеред пустелі.",
  dlg_stray_one: "Один. Добре. Принеси ще одного.",
  reward_carry: "Тепер можна носити дві здобичі одразу"
};


let lang = 'en';
function t(k) {
  const pack = STR[lang] || STR.en;
  if (pack && pack[k]) return pack[k];
  return (STR.en && STR.en[k]) || k;
}
function isRtl() {
  const L = LANGS.find(l => l.id === lang);
  return !!(L && L.rtl);
}

const PAL = {
  kitten: { fur: '#e39b4c', dark: '#b86a2a', deep: '#7a4218', belly: '#f7e6cc', stripe: '#8a4c1c', ear: '#f0b0b0', nose: '#e48d92', eye: '#d7e06a', tail: '#f6f1e8' },
  mother: { fur: '#c86c34', dark: '#8e4520', deep: '#5c2e14', belly: '#f0d4b8', stripe: '#6d3416', ear: '#e8a4a4', nose: '#d48088', eye: '#c9dc72', tail: '#f4ece2' },
  earth: { fur: '#8493a3', dark: '#556575', deep: '#33404c', belly: '#d7e0ea', stripe: '#3d4b5a', ear: '#e0aeb4', nose: '#d09098', eye: '#e8c45e', tail: '#e7eef5' },
  dune: { fur: '#8a8078', dark: '#5e5650', deep: '#3a3430', belly: '#d8d0c4', stripe: '#4e4640', ear: '#c89a96', nose: '#a07474', eye: '#e8c040', tail: '#4e4640' },
  fox: { fur: '#e47038', dark: '#b8451a', deep: '#7c2e12', belly: '#f6f3ea', stripe: '#f6f3ea', ear: '#241c18', nose: '#1a1614', eye: '#f2cc4e', tail: '#f7f5ef' }
};

function WX(x) { return x * 10; }
const DESERT_END = 12040;
const DUNE_X = 7360;
const WORLD_W = 23440;
const TERRAIN = [
  [0, 580], [900, 576], [990, 652], [1310, 652], [1440, 566],
  [2060, 550], [2320, 498], [2540, 486], [2680, 602], [5200, 608],
  [5900, 590], [6600, 612], [7360, 596], [8100, 574], [8800, 606],
  [9600, 588], [10400, 612], [11200, 592], [DESERT_END, 590],
  [12340, 586], [13240, 572], [14040, 624], [14840, 590],
  [15840, 552], [16840, 598], [17640, 548], [18640, 586],
  [19440, 612], [20640, 578], [WORLD_W, 600]
];
const PLATS = [
  { x: 1000, y: 508, w: 145, h: 18, z: 0.55 },
  { x: 1210, y: 446, w: 130, h: 18, z: 0.55 },
  { x: 2260, y: 422, w: 165, h: 18, z: 0.42 },
  { x: 17320, y: 468, w: 150, h: 18, z: 0.48 },
  { x: 17600, y: 462, w: 140, h: 18, z: 0.62 },
  { x: 17980, y: 470, w: 160, h: 18, z: 0.4 },
  { x: 18260, y: 478, w: 145, h: 18, z: 0.7 }
];
const BLOCKS = [
  { x: 1644, y: 498, w: 104, h: 180, kind: 'log', z: 0.55, zr: 0.18 },
  { x: 1916, y: 478, w: 74, h: 200, kind: 'pipe', z: 0.4, zr: 0.16 }
];
const STONES = [210, 4120, 5080, DUNE_X, 10000, 13140, 16040, 19120];

const keys = {};
const just = {};
const hold = { left: false, right: false, jump: false, stalk: false, pounce: false, paw: false, interact: false };
const holdPrev = { left: false, right: false, jump: false, stalk: false, pounce: false, paw: false, interact: false };
const flash = { left: 0, right: 0, jump: 0, stalk: 0, pounce: 0, paw: 0, interact: 0 };
const pointers = new Map();

let phase = 'title';
let langOpen = false, langScroll = 0, langDrag = null;
let camX = 0, camY = 0, shake = 0, playT = 0, time = 0;
let wind, player, earth, dune, fox, prey, particles, floats, banner, cp;
let flags, intro, dlg, endingT, faintT, errText;
let emoteMenu = false;
let ac = null, noiseBuf = null, windGain = null;
const streaks = [];
const clouds = [];

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function lerp(a, b, u) { return a + (b - a) * u; }
function rnd(i) { const x = Math.sin(i * 928.371) * 43758.5453; return x - Math.floor(x); }
function terrainY(x) {
  const t = TERRAIN;
  if (x <= t[0][0]) return t[0][1];
  for (let i = 1; i < t.length; i++) {
    if (x <= t[i][0]) {
      const p = (x - t[i - 1][0]) / (t[i][0] - t[i - 1][0]);
      return t[i - 1][1] + (t[i][1] - t[i - 1][1]) * p;
    }
  }
  return t[t.length - 1][1];
}
function overlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function showMobile() { return narrow || touchUsed; }

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, window.innerWidth * dpr);
  canvas.height = Math.max(1, window.innerHeight * dpr);
  const s = Math.min(window.innerWidth / VW, window.innerHeight / VH);
  scale = s * dpr;
  offX = (canvas.width - VW * scale) / 2;
  offY = (canvas.height - VH * scale) / 2;
  narrow = window.innerWidth < 1100 || window.matchMedia('(pointer: coarse)').matches;
}
function toVirtual(cx, cy) {
  const r = canvas.getBoundingClientRect();
  const x = (cx - r.left) * (canvas.width / r.width);
  const y = (cy - r.top) * (canvas.height / r.height);
  return { x: (x - offX) / scale, y: (y - offY) / scale };
}
function hit(r, p) {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

function makeActor(spec) {
  return Object.assign({
    x: 200, y: 400, w: 30, h: 34, vx: 0, vy: 0,
    facing: 1, scale: 1.25, species: 'cat', palette: 'kitten', z: 0.55,
    anim: 'idle', _anim: 'idle', blend: 1, from: null, shown: null, joints: null,
    gait: 0, t: Math.random() * 8, blink: 2 + Math.random() * 2,
    tail: [], onGround: false, slope: 0, hang: null,
    hidden: false, held: null, held2: null, mode: 'idle',
    alert: 0, state: 'idle', stateT: 0, home: 0, wander: 2,
    charge: 0, pouncing: false, pounceT: 0, quietPounce: false, quietT: 0,
    drinkT: 0, sprinting: false, stalking: false, sprintLock: false,
    hunger: 86, thirst: 85, stamina: 100, canDouble: false, doubleUsed: false,
    faint: 0, invuln: 0, coyote: 0, jumpBuf: 0
  }, spec);
}

function startNewGame() {
  bootWorld();
  phase = 'intro';
  intro = { beat: 0, t: 0, hurry: false };
  langOpen = false;
}
function bootWorld() {
  wind = { dir: 1, next: 10, gust: 0 };
  flags = {
    drank: false, mole: false, questTalk: false, questDone: false, molesGiven: 0,
    tipMouse: false, tipVole: false, tipRabbit: false, tipSparrow: false, tipFox: false,
    moleTalk: false, _meet: false
  };
  cp = { x: 180 };
  const stoneSeen = {};
  STONES.forEach(s => { stoneSeen[s] = false; });
  flags.stones = stoneSeen;
  player = makeActor({ x: 170, scale: 1.62, palette: 'kitten' });
  player.y = planeY(player.x, player.z) - player.h;
  earth = makeActor({ x: 4300, scale: 1.72, palette: 'earth', hidden: true, mode: 'wait' });
  dune = makeActor({ x: DUNE_X, scale: 1.7, palette: 'dune', anim: 'sit', _anim: 'sit', facing: -1, z: 0.58 });
  dune.y = planeY(dune.x, dune.z) - dune.h;
  fox = makeActor({ x: 17720, w: 40, h: 38, scale: 1.85, species: 'fox', palette: 'fox', hidden: true, home: 17720, z: 0.5 });
  fox.y = planeY(fox.x, fox.z) - fox.h;
  prey = [makePrey('mole', 4980, { tutorial: true, z: 0.55 })];
  [5320, 5620, 6260, 6880, 7920, 8560, 9300, 10080, 10860, 11600].forEach(x => prey.push(makePrey('mole', x, { z: 0.55 })));
  prey.push(makePrey('vole', 14360, { z: 0.5 }), makePrey('vole', 14720, { z: 0.68 }));
  particles = [];
  floats = [];
  banner = null;
  intro = { beat: 0, t: 0 };
  dlg = null;
  endingT = 0;
  faintT = 0;
  playT = 0;
  applySpawn();
}
function makePrey(kind, x, extra) {
  const h = kind === 'rabbit' ? 26 : kind === 'sparrow' ? 18 : 16;
  const w = kind === 'rabbit' ? 28 : 22;
  const a = makeActor(Object.assign({
    x, home: x, w, h, scale: 1, species: kind, kind, palette: 'kitten', z: 0.58,
    hidden: true, tutorial: false, burrow: x + 400,
    mound: x, moundDir: 1, calm: 0
  }, extra || {}));
  a.y = planeY(x, a.z) - a.h;
  if (kind !== 'mole' || !a.tutorial) a.hidden = true;
  if (a.tutorial) a.hidden = false;
  return a;
}
function herd(kind, a, b, n) {
  const list = [];
  for (let i = 0; i < n; i++) {
    const x = a + (b - a) * (i + 0.5) / n;
    const extra = { z: kind === 'mole' ? 0.55 : 0.48 + (i % 4) * 0.04 };
    if (kind === 'rabbit') extra.burrow = x + 320;
    list.push(makePrey(kind, x, extra));
  }
  return list;
}
function applySpawn() {
  prey.forEach(p => {
    if (p.tutorial) p.hidden = !!p.hidden && p.respawn > 0 ? p.hidden : (p.caughtAway ? p.hidden : false);
    if (p.tutorial && !p.gone) p.hidden = p.hidden;
    if (!p.tutorial) p.hidden = !flags.mole || p.hidden;
  });
  if (flags.mole) {
    prey.forEach(p => { if (!p.tutorial && !p.gone) p.hidden = false; });
    fox.hidden = false;
  } else fox.hidden = true;
  earth.hidden = !flags.drank;
  if (flags.drank && earth.hidden) earth.hidden = false;
}
function resetPrey(p) {
  p.hidden = false;
  p.gone = false;
  p.x = p.home;
  p.y = planeY(p.x, p.z) - p.h;
  p.vx = 0; p.vy = 0;
  p.alert = 0;
  p.state = 'idle';
  p.stateT = 0;
  p.calm = 0;
  p.mound = p.home;
  p.respawn = 0;
}

function burst(x, y, n, color, speed, life) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.3 + Math.random());
    particles.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 20,
      life: life || (0.35 + Math.random() * 0.4), age: 0,
      color, size: 1.5 + Math.random() * 3.5
    });
  }
}
function floatText(text, x, y, color) {
  floats.push({ text, x, y, t: 0, color: color || '#fff8ee' });
}
function showBanner(k) { banner = { k, t: 0 }; }

function ensureAudio() {
  if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ac = new AC();
  const len = ac.sampleRate * 2;
  noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
  const data = noiseBuf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.08 * white) / 1.08;
    data[i] = last * 2.2;
  }
  const src = ac.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 420;
  windGain = ac.createGain();
  windGain.gain.value = 0.0;
  src.connect(filter); filter.connect(windGain); windGain.connect(ac.destination);
  src.start();
}
function tone(freq, dur, type, vol, slide) {
  if (!ac) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type || 'sine';
  o.frequency.setValueAtTime(freq, ac.currentTime);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), ac.currentTime + dur);
  g.gain.setValueAtTime(vol, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  o.connect(g); g.connect(ac.destination);
  o.start(); o.stop(ac.currentTime + dur + 0.03);
}
function noiseHit(dur, vol, freq) {
  if (!ac || !noiseBuf) return;
  const src = ac.createBufferSource();
  src.buffer = noiseBuf;
  const f = ac.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = freq || 300;
  const g = ac.createGain();
  g.gain.setValueAtTime(vol, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  src.connect(f); f.connect(g); g.connect(ac.destination);
  src.start(); src.stop(ac.currentTime + dur + 0.02);
}
function sfxJump() { tone(220, 0.12, 'sine', 0.05, 480); }
function sfxPounce() { noiseHit(0.18, 0.08, 500); tone(180, 0.1, 'triangle', 0.04, 90); }
function sfxMeow() { tone(640, 0.16, 'sine', 0.06, 420); setTimeout(() => tone(720, 0.2, 'sine', 0.05, 380), 140); }
function sfxWater() { noiseHit(0.3, 0.05, 900); tone(520, 0.2, 'sine', 0.03, 240); }
function sfxCatch() { tone(520, 0.08, 'triangle', 0.06, 760); noiseHit(0.12, 0.05, 200); }
function sfxHurt() { tone(140, 0.2, 'sawtooth', 0.04, 70); }
function sfxStep() { noiseHit(0.05, 0.03, 180); }
function sfxPurr() {
  for (let i = 0; i < 4; i++) setTimeout(() => tone(46, 0.2, 'sawtooth', 0.018, 40), i * 230);
}
function sfxRumble() { tone(48, 0.4, 'sawtooth', 0.03, 36); noiseHit(0.4, 0.04, 90); }

function saveGame() {
  if (!SAVES_ON) {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    return;
  }
  const data = {
    x: player.x, hunger: player.hunger, thirst: player.thirst, stamina: player.stamina,
    held: player.held, held2: player.held2, canDouble: player.canDouble, flags, cp,
    earthMode: earth.mode, earthX: earth.x
  };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch (e) {}
}
function hasSave() {
  if (!SAVES_ON) return false;
  try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
}
function loadGame() {
  if (!SAVES_ON) return false;
  try {
    const data = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!data) return false;
    bootWorld();
    Object.assign(flags, data.flags || {});
    if (!flags.stones) flags.stones = {};
    player.x = data.x || 180;
    player.y = planeY(player.x, player.z) - player.h - 4;
    player.hunger = data.hunger; player.thirst = data.thirst; player.stamina = data.stamina;
    player.held = data.held || null;
    player.held2 = data.held2 || null;
    player.canDouble = !!data.canDouble;
    cp = data.cp || { x: player.x };
    earth.mode = data.earthMode || 'wait';
    earth.x = data.earthX || player.x + 60;
    earth.y = planeY(earth.x, earth.z) - earth.h;
    earth.hidden = !flags.drank;
    if (flags.mole) {
      prey.forEach(p => { if (!p.tutorial) { p.hidden = false; p.gone = false; } });
      fox.hidden = false;
    }
    if (flags.mole) {
      const tut = prey.find(p => p.tutorial);
      if (tut) { tut.hidden = true; tut.gone = true; }
    }
    phase = 'play';
    return true;
  } catch (e) { return false; }
}
function setLang(id) {
  if (!STR[id] && id !== 'en') lang = 'en';
  else lang = id;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  langOpen = false;
  if (dlg) dlg.n = 9999;
}

function goalX() {
  if (!flags.drank) return 4100;
  if (!flags.mole) return 4980;
  if (!flags.questDone) return DUNE_X;
  return 21480;
}
function setObjective() {
  const nearPond = player.x > 3860 && player.x < 4380;
  if (!flags.drank) player.obj = nearPond ? 'obj_drink' : 'obj_water';
  else if (!flags.mole) player.obj = 'obj_mole';
  else if (!flags.questTalk) player.obj = 'obj_dune';
  else if (!flags.questDone) player.obj = 'obj_quest';
  else player.obj = 'obj_tracks';
  if (player.x > DESERT_END + 400 && !flags.questDone) player.obj = 'obj_back';
}

function exposed(x) {
  const toward = Math.sign(x - (player.x + player.w * 0.5));
  if (!toward) return false;
  return wind.dir === toward;
}
function playerNoise() {
  if (player.pouncing || player.sprinting) return 1;
  if (!player.onGround && !player.hang) return 0.42;
  if (player.stalking) return 0.12;
  if (Math.abs(player.vx) > 24) return 0.55;
  return 0.05;
}

const FOOD = { mole: 30, mouse: 18, vole: 22, rabbit: 38, sparrow: 16 };

function pounceLaunch(charge) {
  const c = clamp(charge, 0.2, 1);
  return {
    vx: (player.facing || 1) * (240 + c * 420),
    vy: -JUMP_V * (0.7 + c * 0.42)
  };
}
function pounceArc(charge) {
  const launch = pounceLaunch(charge);
  let x = player.x;
  let y = player.y;
  let vx = launch.vx;
  let vy = launch.vy;
  const pts = [];
  const step = 1 / 40;
  for (let i = 0; i < 64; i++) {
    pts.push({ x: x + player.w * 0.5, y: y + player.h });
    vy += GRAV * step;
    x += vx * step;
    y += vy * step;
    const floor = planeY(x + player.w * 0.5, player.z) - player.h;
    if (i > 5 && vy > 0 && y >= floor) {
      pts.push({ x: x + player.w * 0.5, y: floor + player.h, land: true });
      break;
    }
  }
  return pts;
}
function tryPaw() {
  player.pawT = 0.36;
  tone(460, 0.05, 'square', 0.035, 80);
  const dir = player.facing || 1;
  const reach = {
    x: player.x + (dir > 0 ? player.w - 8 : -54),
    y: player.y - 12,
    w: 62,
    h: player.h + 28
  };
  prey.forEach(p => {
    if (p.hidden) return;
    if (!flags.mole && !p.tutorial) return;
    if (p.kind === 'mole') {
      if (p.state !== 'up') return;
      if (Math.abs(player.x + player.w * 0.5 - p.mound) < 64 && sameLane(player, p.z, 0.24)) catchPrey(p);
      return;
    }
    if (overlap(reach, p) && Math.abs(bodyAlt(player) - bodyAlt(p)) < 70) catchPrey(p);
  });
}
function catchPrey(p) {
  if (p.hidden) return;
  if (player.held && (!flags.questDone || player.held2)) { showBanner('mouth_full'); return; }
  if (player.held) player.held2 = p.kind;
  else player.held = p.kind;
  p.hidden = true;
  p.gone = true;
  p.respawn = p.tutorial ? 999 : 12;
  floatText(t('caught'), p.x, p.y - 28, '#ffe1a8');
  sfxCatch();
  burst(p.x, p.y, 12, '#c4a574', 90, 0.45);
  if (p.tutorial && !flags.mole) {
    flags.mole = true;
    prey.forEach(q => { if (!q.tutorial) resetPrey(q); });
    fox.hidden = false;
    fox.x = fox.home;
    fox.y = planeY(fox.home, fox.z) - fox.h;
    saveGame();
    setObjective();
    say([{ who: 'name_earth', k: 'dlg_earth5' }], () => { earth.mode = 'follow'; });
  }
}
function doEat() {
  if (!player.held) return;
  const n = FOOD[player.held2 || player.held] || 16;
  player.hunger = clamp(player.hunger + n, 0, 100);
  player.stamina = clamp(player.stamina + 12, 0, 100);
  floatText(t('eat'), player.x, player.y - 36, '#ffd7a8');
  if (player.held2) player.held2 = null;
  else player.held = null;
  tone(300, 0.1, 'sine', 0.04, 180);
}
function doDrink() {
  player.drinkT = 1.25;
  player.thirst = 100;
  player.stamina = clamp(player.stamina + 18, 0, 100);
  sfxWater();
  burst(player.x + 10, player.y + player.h, 10, '#9fd4e8', 40, 0.5);
  if (!flags.drank) {
    flags.drank = true;
    flags._meet = true;
    earth.hidden = false;
    earth.x = player.x + 340;
    earth.y = planeY(earth.x, player.z) - earth.h;
    earth.z = player.z;
    earth.mode = 'enter';
    earth.facing = -1;
    sfxMeow();
  }
  saveGame();
  setObjective();
}
function doFaint() {
  phase = 'faint';
  faintT = 0;
  player.vx = 0;
}
function respawn() {
  player.x = cp.x;
  player.y = planeY(player.x, player.z) - player.h - 8;
  player.vx = 0; player.vy = 0;
  player.hunger = Math.max(player.hunger, 58);
  player.thirst = Math.max(player.thirst, 62);
  player.stamina = 80;
  player.faint = 0;
  player.invuln = 1.2;
  phase = 'play';
}

function say(lines, onDone) {
  phase = 'dialogue';
  dlg = { lines, i: 0, n: 0, onDone, lang };
}
function advanceDlg() {
  if (!dlg) return;
  const full = t(dlg.lines[dlg.i].k);
  if (dlg.n < full.length) { dlg.n = full.length; return; }
  dlg.i++;
  dlg.n = 0;
  if (dlg.i >= dlg.lines.length) {
    const fn = dlg.onDone;
    dlg = null;
    phase = 'play';
    if (fn) fn();
  }
}
function talkDune() {
  if (!flags.questTalk) {
    flags.questTalk = true;
    setObjective();
    say([
      { who: 'name_stray', k: 'dlg_stray1' },
      { who: 'name_stray', k: 'dlg_stray2' }
    ]);
    return;
  }
  if (flags.questDone) return;
  let given = 0;
  if (player.held2 === 'mole') { player.held2 = null; given++; }
  if (player.held === 'mole') { player.held = player.held2; player.held2 = null; given++; }
  if (!given) { say([{ who: 'name_stray', k: 'dlg_stray_wait' }]); return; }
  flags.molesGiven = Math.min(2, flags.molesGiven + given);
  tone(520, 0.1, 'triangle', 0.05, 640);
  if (flags.molesGiven < 2) { say([{ who: 'name_stray', k: 'dlg_stray_one' }]); return; }
  flags.questDone = true;
  saveGame();
  setObjective();
  say([
    { who: 'name_stray', k: 'dlg_stray3' },
    { who: 'name_stray', k: 'dlg_stray4' }
  ], () => { showBanner('reward_carry'); burst(player.x, player.y, 16, '#fff2c4', 80, 0.6); tone(660, 0.18, 'sine', 0.05, 880); });
}
function tryInteract() {
  if (!flags.questDone && Math.abs(player.x - dune.x) < 78 && Math.abs((player.y) - (dune.y)) < 80) { talkDune(); return; }
  if (player.x > 3860 && player.x < 4380 && player.onGround) { doDrink(); return; }
  if (player.held) doEat();
}
function reachStone(x) {
  if (!flags.stones) flags.stones = {};
  if (flags.stones[x]) return;
  if (Math.abs(player.x - x) < 70 && player.onGround) {
    flags.stones[x] = true;
    cp = { x };
    saveGame();
    showBanner('checkpoint');
    tone(520, 0.12, 'sine', 0.04, 680);
  }
}

function ik(ax, ay, tx, ty, l1, l2, bend) {
  let dx = tx - ax, dy = ty - ay;
  let d = Math.hypot(dx, dy) || 0.0001;
  const max = l1 + l2 - 0.01;
  const min = Math.abs(l1 - l2) + 0.01;
  if (d > max) { dx *= max / d; dy *= max / d; d = max; }
  else if (d < min) { dx *= min / d; dy *= min / d; d = min; }
  const ang = Math.atan2(dy, dx);
  const cosA = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
  const th = ang + bend * Math.acos(cosA);
  return { x: ax + Math.cos(th) * l1, y: ay + Math.sin(th) * l1, fx: ax + dx, fy: ay + dy };
}
function buildTargets(ent) {
  const moving = Math.abs(ent.vx) > 14 && ent.onGround;
  const breathe = Math.sin(ent.t * 2.1);
  let crouch = 0, stretch = 0, ear = 0, jaw = ent.held ? 0.32 : 0;
  if (ent.anim === 'stalk') crouch = 8;
  if (ent.anim === 'pounce') { crouch = 4; stretch = 12; ear = 0.85; jaw = Math.max(jaw, 0.45); }
  if (ent.anim === 'sit') crouch = 4;
  if (ent.anim === 'drink') { crouch = 5; jaw = 0.28; }
  if (ent.anim === 'run') { stretch = 5; ear = 0.45; }
  if (ent.anim === 'hang') crouch = 2;
  if (ent.anim === 'sleep') { crouch = 16; ear = 0.4; }
  if (ent.anim === 'meow') {
    const et = ent.emote ? ent.emote.t : 0;
    jaw = 0.7 * Math.max(0, Math.sin(Math.min(1, et / 0.9) * Math.PI));
  }
  if (ent.pawT > 0) { ear = Math.max(ear, 0.55); jaw = Math.max(jaw, 0.35); }
  const bodyY = -30 + breathe * (ent.anim === 'sleep' ? 1.6 : 0.8) + crouch;
  const bases = [{ x: -18, y: 1 }, { x: -6, y: 0 }, { x: 18, y: 1 }, { x: 30, y: 0 }];
  const paws = bases.map((base, i) => {
    if (ent.pawT > 0 && i === 2) {
      const swing = Math.sin(clamp(1 - ent.pawT / 0.36, 0, 1) * Math.PI);
      return { x: base.x + 24 + 34 * swing, y: -10 - 24 * swing };
    }
    if (ent.anim === 'sleep') return { x: base.x + (i < 2 ? 6 : -4), y: 0 };
    if (ent.anim === 'sit' && i < 2) return { x: base.x - 2, y: 0 };
    if (ent.anim === 'sit') return { x: base.x + 2, y: 0 };
    if (ent.anim === 'drink' && i >= 2) return { x: base.x + 8, y: 0 };
    if (ent.anim === 'pounce' && i >= 2) return { x: base.x + 20, y: -6 };
    if (ent.anim === 'pounce' && i < 2) return { x: base.x - 6, y: 0 };
    if (ent.anim === 'hang' && i >= 2) return { x: base.x + 4, y: -20 };
    if (ent.anim === 'jump') return { x: base.x + (i < 2 ? -8 : 10), y: i < 2 ? -6 : -22 };
    if (ent.anim === 'fall') return { x: base.x + (i < 2 ? -4 : 4), y: -10 };
    if (!moving && ent.anim !== 'stalk') return { x: base.x, y: 0 };
    const off = [0, 0.5, 0.5, 0][i];
    const p = (ent.gait + off) % 1;
    const swing = p > 0.5;
    const k = swing ? Math.sin((p - 0.5) / 0.5 * Math.PI) : 0;
    const stride = ent.anim === 'stalk' ? 6 : ent.anim === 'run' ? 16 : 11;
    const lift = ent.anim === 'stalk' ? 9 : ent.anim === 'run' ? 20 : 14;
    return { x: base.x + Math.cos(p * Math.PI * 2) * stride, y: -k * lift };
  });
  let headX = 40 + stretch * 0.45;
  let headY = bodyY - 16;
  if (ent.anim === 'stalk') { headX += 6; headY += 8; }
  if (ent.anim === 'pounce') { headX += 14; headY += 10; }
  if (ent.anim === 'drink') { headX += 10; headY = -8; }
  if (ent.anim === 'sit') { headY -= 10; headX -= 4; }
  if (ent.anim === 'meow') { headY -= 12; headX -= 2; }
  if (ent.anim === 'sleep') { headX = 26; headY = -7.5; }
  return { bodyY, stretch, crouch, headX, headY, ear, jaw, paws, sit: ent.anim === 'sit' || ent.anim === 'meow' ? 1 : 0 };
}
function cloneT(src) {
  return {
    bodyY: src.bodyY, stretch: src.stretch, crouch: src.crouch,
    headX: src.headX, headY: src.headY, ear: src.ear, jaw: src.jaw, sit: src.sit || 0,
    paws: src.paws.map(p => ({ x: p.x, y: p.y }))
  };
}
function lerpT(a, b, u) {
  return {
    bodyY: lerp(a.bodyY, b.bodyY, u), stretch: lerp(a.stretch, b.stretch, u),
    crouch: lerp(a.crouch, b.crouch, u),     headX: lerp(a.headX, b.headX, u),
    headY: lerp(a.headY, b.headY, u), ear: lerp(a.ear, b.ear, u), jaw: lerp(a.jaw, b.jaw, u),
    sit: lerp(a.sit || 0, b.sit || 0, u),
    paws: a.paws.map((p, i) => ({ x: lerp(p.x, b.paws[i].x, u), y: lerp(p.y, b.paws[i].y, u) }))
  };
}
function jointsFrom(tg) {
  const hip = { x: -10, y: tg.bodyY + 2 };
  const mid = { x: 10 + tg.stretch * 0.35, y: tg.bodyY + 3 };
  const chest = { x: 26 + tg.stretch, y: tg.bodyY - 1 - (tg.sit || 0) * 12 };
  const head = { x: tg.headX, y: tg.headY - (tg.sit || 0) * 6 };
  const L1 = 16, L2 = 16;
  const bl = ik(hip.x - 2, hip.y, tg.paws[0].x, tg.paws[0].y, L1, L2, 1);
  const br = ik(hip.x + 2, hip.y, tg.paws[1].x, tg.paws[1].y, L1, L2, 1);
  const fl = ik(chest.x - 2, chest.y + 2, tg.paws[2].x, tg.paws[2].y, 24, 22, -1);
  const fr = ik(chest.x + 2, chest.y + 2, tg.paws[3].x, tg.paws[3].y, 24, 22, -1);
  return { hip, mid, chest, head, bl, br, fl, fr, tg };
}
function updatePose(ent, dt) {
  const target = buildTargets(ent);
  if (!ent.shown) ent.shown = cloneT(target);
  if (ent.anim !== ent._anim) {
    ent.from = cloneT(ent.shown);
    ent._anim = ent.anim;
    ent.blend = 0;
  }
  if (!ent.from) ent.from = cloneT(target);
  ent.blend = Math.min(1, ent.blend + dt * 6.5);
  const u = ent.blend * ent.blend * (3 - 2 * ent.blend);
  ent.shown = lerpT(ent.from, target, u);
  ent.joints = jointsFrom(ent.shown);
  const hip = ent.joints.hip;
  if (ent.tail.length < 6) {
    ent.tail = [];
    for (let i = 0; i < 6; i++) ent.tail.push({ x: hip.x - i * 7, y: hip.y - 8, a: -2.2 });
  }
  ent.tail[0].x = hip.x - 2;
  ent.tail[0].y = hip.y + 2;
  const wag = Math.sin(ent.t * (ent.anim === 'run' ? 16 : ent.anim === 'stalk' ? 2 : 3.2)) * (ent.anim === 'run' ? 0.45 : 0.18);
  const trail = ent.vx * ent.facing * 0.004;
  for (let i = 1; i < ent.tail.length; i++) {
    const prev = ent.tail[i - 1];
    const desired = -2.15 + i * 0.22 + wag + trail;
    ent.tail[i].a = lerp(ent.tail[i].a, desired, Math.min(1, dt * (5 + i)));
    const len = ent.species === 'fox' ? 9 : 7.2;
    ent.tail[i].x = prev.x + Math.cos(ent.tail[i].a) * len;
    ent.tail[i].y = prev.y + Math.sin(ent.tail[i].a) * len;
  }
  ent.t += dt;
  ent.blink -= dt;
  if (ent.blink < -0.14) ent.blink = 2.4 + Math.random() * 3.2;
}

function capsule(x1, y1, x2, y2, r1, r2) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const px = Math.cos(ang + Math.PI / 2), py = Math.sin(ang + Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(x1 + px * r1, y1 + py * r1);
  ctx.lineTo(x2 + px * r2, y2 + py * r2);
  ctx.arc(x2, y2, r2, ang + Math.PI / 2, ang - Math.PI / 2, true);
  ctx.lineTo(x1 - px * r1, y1 - py * r1);
  ctx.arc(x1, y1, r1, ang - Math.PI / 2, ang + Math.PI / 2, true);
  ctx.closePath();
  ctx.fill();
}
function planeY(x, z) {
  const zz = z == null ? 0.55 : z;
  return terrainY(x) + (zz - 0.55) * DEPTH;
}
function depthScale(z) {
  const zz = z == null ? 0.55 : z;
  return 0.5 + zz * 1.02;
}
function footY(ent) {
  return ent.y + ent.h;
}
function bodyAlt(ent) {
  return planeY(ent.x + ent.w * 0.5, ent.z) - (ent.y + ent.h);
}
function plant(ent) {
  ent.y = planeY(ent.x + ent.w * 0.5, ent.z) - ent.h - (ent.alt || 0);
}
function sameLane(ent, z, radius) {
  return Math.abs((ent.z == null ? 0.55 : ent.z) - z) <= radius;
}
function shelfY(baseY, z) {
  return baseY + ((z == null ? 0.55 : z) - 0.55) * DEPTH;
}
function riseAt(ent, baseY) {
  return terrainY(ent.x + ent.w * 0.5) - baseY;
}
function blockSolid(ent, b) {
  if ((b.zr || 0) < 0.9 && !sameLane(ent, b.z == null ? 0.55 : b.z, b.zr || 0.18)) return false;
  const alt = ent.alt != null ? ent.alt : bodyAlt(ent);
  return alt < riseAt(ent, b.y) - 6;
}
function flatDist(ent, x, z) {
  const ez = ent.z == null ? 0.55 : ent.z;
  const zz = z == null ? 0.55 : z;
  return Math.hypot((ent.x + ent.w * 0.5) - x, (ez - zz) * 480);
}
const VIEW_YAW = 0, VIEW_PITCH = 0.38, CAM_FOCAL = 980;
const CAM_CY = Math.cos(VIEW_YAW), CAM_SY = Math.sin(VIEW_YAW);
const CAM_CP = Math.cos(VIEW_PITCH), CAM_SP = Math.sin(VIEW_PITCH);
const CAM_VIEW = { x: -CAM_SY * CAM_CP, y: -CAM_SP, z: -CAM_CY * CAM_CP };
const CAM_LIGHT = { x: -0.22, y: 0.9, z: 0.3 };
{
  const ll = Math.hypot(CAM_LIGHT.x, CAM_LIGHT.y, CAM_LIGHT.z) || 1;
  CAM_LIGHT.x /= ll; CAM_LIGHT.y /= ll; CAM_LIGHT.z /= ll;
}
const MESH = [];
const VPOOL = [];
let meshN = 0, poolN = 0, meshOX = 0, meshOY = 0, meshOZ = 0;
function rgbOf(hex) {
  if (!hex) return [180, 140, 100];
  if (hex._rgb) return hex._rgb;
  const h = String(hex).replace('#', '');
  const rgb = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return rgb;
}
function beginMesh(ox, oy, oz) {
  meshN = 0; poolN = 0;
  meshOX = ox || 0; meshOY = oy || 0; meshOZ = oz || 0;
}
function vtx(x, y, z, nx, ny, nz) {
  let p = VPOOL[poolN++];
  if (!p) { p = { x: 0, y: 0, z: 0, nx: 0, ny: 1, nz: 0 }; VPOOL.push(p); }
  p.x = x + meshOX; p.y = y + meshOY; p.z = z + meshOZ;
  p.nx = nx || 0; p.ny = ny == null ? 1 : ny; p.nz = nz || 0;
  return p;
}
function camDepth(p) {
  const z1 = -p.x * CAM_SY + p.z * CAM_CY;
  return -p.y * CAM_SP - z1 * CAM_CP;
}
function project3(p) {
  const x1 = p.x * CAM_CY + p.z * CAM_SY;
  const z1 = -p.x * CAM_SY + p.z * CAM_CY;
  const sy = -p.y * CAM_CP + z1 * CAM_SP;
  const depth = -p.y * CAM_SP - z1 * CAM_CP;
  const f = CAM_FOCAL / (CAM_FOCAL + depth);
  return { x: x1 * f, y: sy * f };
}
function groundBlob(rx, rz, alpha) {
  ctx.beginPath();
  for (let i = 0; i <= 18; i++) {
    const a = i / 18 * Math.PI * 2;
    const p = project3({ x: Math.cos(a) * rx, y: 0.4, z: Math.sin(a) * rz });
    if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
  }
  ctx.fillStyle = 'rgba(28,16,10,' + alpha + ')';
  ctx.fill();
}
function addTri(a, b, c, rgb) {
  const ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z;
  const vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const ln = Math.hypot(nx, ny, nz) || 1;
  nx /= ln; ny /= ln; nz /= ln;
  const lx = (a.nx + b.nx + c.nx) / 3, ly = (a.ny + b.ny + c.ny) / 3, lz = (a.nz + b.nz + c.nz) / 3;
  if (nx * lx + ny * ly + nz * lz < 0) { nx = -nx; ny = -ny; nz = -nz; }
  const face = nx * CAM_VIEW.x + ny * CAM_VIEW.y + nz * CAM_VIEW.z;
  if (face >= 0) return;
  const lnl = Math.hypot(lx, ly, lz) || 1;
  const nd = Math.max(0, (lx * CAM_LIGHT.x + ly * CAM_LIGHT.y + lz * CAM_LIGHT.z) / lnl);
  let t = MESH[meshN++];
  if (!t) { t = {}; MESH.push(t); }
  t.a = a; t.b = b; t.c = c; t.rgb = rgb; t.nd = nd;
  t.fres = 1 - Math.max(0, Math.min(1, -face));
  t.z = (camDepth(a) + camDepth(b) + camDepth(c)) / 3;
}
function addEllipsoid(cx, cy, cz, rx, ry, rz, rgb, su, sv) {
  su = su || 14; sv = sv || 8;
  const g = [];
  for (let v = 0; v <= sv; v++) {
    const phi = Math.PI * v / sv;
    const row = [];
    for (let u = 0; u <= su; u++) {
      const th = Math.PI * 2 * u / su;
      const nx = Math.sin(phi) * Math.cos(th);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.sin(th);
      row.push(vtx(cx + nx * rx, cy + ny * ry, cz + nz * rz, nx, ny, nz));
    }
    g.push(row);
  }
  for (let v = 0; v < sv; v++) {
    for (let u = 0; u < su; u++) {
      addTri(g[v][u], g[v + 1][u], g[v + 1][u + 1], rgb);
      addTri(g[v][u], g[v + 1][u + 1], g[v][u + 1], rgb);
    }
  }
}
function addTube(x1, y1, z1, x2, y2, z2, r1, r2, rgb, sides) {
  sides = sides || 10;
  let dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
  const len = Math.hypot(dx, dy, dz) || 1;
  dx /= len; dy /= len; dz /= len;
  let ux = 0, uy = 1, uz = 0;
  if (Math.abs(dy) > 0.82) { ux = 1; uy = 0; }
  let sx = dy * uz - dz * uy, sy = dz * ux - dx * uz, sz = dx * uy - dy * ux;
  const sl = Math.hypot(sx, sy, sz) || 1;
  sx /= sl; sy /= sl; sz /= sl;
  const tx = dy * sz - dz * sy, ty = dz * sx - dx * sz, tz = dx * sy - dy * sx;
  const ring = (x, y, z, r) => {
    const row = [];
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2;
      const nx = sx * Math.cos(a) + tx * Math.sin(a);
      const ny = sy * Math.cos(a) + ty * Math.sin(a);
      const nz = sz * Math.cos(a) + tz * Math.sin(a);
      row.push(vtx(x + nx * r, y + ny * r, z + nz * r, nx, ny, nz));
    }
    return row;
  };
  const A = ring(x1, y1, z1, r1), B = ring(x2, y2, z2, r2);
  for (let i = 0; i < sides; i++) {
    addTri(A[i], B[i], B[i + 1], rgb);
    addTri(A[i], B[i + 1], A[i + 1], rgb);
  }
}
function addBox(cx, cy, cz, hx, hy, hz, rgb) {
  const faces = [
    [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1], [0, 0, 1]],
    [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1], [0, 0, -1]],
    [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1], [1, 0, 0]],
    [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1], [-1, 0, 0]],
    [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1], [0, 1, 0]],
    [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], [0, -1, 0]]
  ];
  faces.forEach(f => {
    const n = f[4];
    const p = f.slice(0, 4).map(s => vtx(
      cx + s[0] * hx, cy + s[1] * hy, cz + s[2] * hz, n[0], n[1], n[2]
    ));
    addTri(p[0], p[1], p[2], rgb);
    addTri(p[0], p[2], p[3], rgb);
  });
}
function addCone(cx, cy, cz, rx, ry, rz, rgb, sides) {
  sides = sides || 10;
  const tip = vtx(cx, cy + ry, cz, 0, 1, 0);
  const ring = [];
  for (let i = 0; i <= sides; i++) {
    const a = i / sides * Math.PI * 2;
    const nx = Math.cos(a), nz = Math.sin(a);
    ring.push(vtx(cx + nx * rx, cy, cz + nz * rz, nx, 0.4, nz));
  }
  for (let i = 0; i < sides; i++) addTri(tip, ring[i], ring[i + 1], rgb);
}
function addRoundBox(cx, cy, cz, hx, hy, hz, rgb, rad) {
  rad = rad == null ? Math.min(hx, hy, hz) * 0.18 : rad;
  rad = Math.max(2, Math.min(rad, hx * 0.42, hy * 0.42, hz * 0.42));
  const ix = Math.max(0.5, hx - rad), iz = Math.max(0.5, hz - rad);
  addBox(cx, cy - rad * 0.35, cz, hx, hy - rad * 0.35, hz, rgb);
  addBox(cx, cy + hy - rad, cz, ix, rad, iz, rgb);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    addEllipsoid(cx + sx * ix, cy + hy - rad, cz + sz * iz, rad, rad, rad, rgb, 5, 3);
  }
}
function paintMesh() {
  const n = meshN;
  const part = MESH.splice(n);
  MESH.sort((a, b) => b.z - a.z);
  for (let i = 0; i < n; i++) {
    const t = MESH[i];
    const A = project3(t.a), B = project3(t.b), C = project3(t.c);
    const nd = t.nd;
    const spec = Math.pow(nd, 20);
    const k = (0.46 + 0.66 * nd) * (1 - 0.42 * t.fres * t.fres);
    const r = Math.min(255, t.rgb[0] * k + 90 * spec);
    const g = Math.min(255, t.rgb[1] * k + 82 * spec);
    const b = Math.min(255, t.rgb[2] * k + 70 * spec);
    ctx.fillStyle = 'rgb(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ')';
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.fill();
  }
  for (let i = 0; i < part.length; i++) MESH.push(part[i]);
}
const BODY_U = [0, 0.05, 0.12, 0.2, 0.26, 0.32, 0.38, 0.44, 0.5, 0.56, 0.62, 0.68, 0.75, 0.82, 0.89, 0.95, 1];
const BODY_R = [0.05, 0.55, 0.84, 0.97, 1, 0.98, 0.94, 0.9, 0.88, 0.88, 0.9, 0.95, 0.99, 1, 0.9, 0.68, 0.05];
const BODY_STRIPES = [[0.26, 0.32], [0.38, 0.44], [0.5, 0.56], [0.62, 0.68]];
function addCatBody(rump, chest, F, k, fur, belly, stripe) {
  let dx = chest.x - rump.x, dy = chest.y - rump.y;
  const dl = Math.hypot(dx, dy) || 1;
  dx /= dl; dy /= dl;
  const sx = rump.x - dx * 9 * k, sy = rump.y - dy * 9 * k;
  const ex = chest.x + dx * 8 * k, ey = chest.y + dy * 8 * k;
  const ux = -dy, uy = dx;
  const RY = 7.6 * k, RZ = 6.6 * k, sides = 12;
  const rings = BODY_U.map((u, ri) => {
    const arch = Math.sin(u * Math.PI) * 1.2;
    const cx = sx + (ex - sx) * u + ux * arch, cy = sy + (ey - sy) * u + uy * arch;
    const ry = RY * BODY_R[ri], rz = RZ * BODY_R[ri];
    const row = [];
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      let nx = ux * ca / RY, ny = uy * ca / RY, nz = sa / RZ;
      if (ri === 0) { nx -= dx * 0.2; ny -= dy * 0.2; }
      if (ri === BODY_U.length - 1) { nx += dx * 0.2; ny += dy * 0.2; }
      const nl = Math.hypot(nx, ny, nz) || 1;
      row.push(vtx((cx + ux * ca * ry) * F, cy + uy * ca * ry, sa * rz, nx / nl * F, ny / nl, nz / nl));
    }
    return { row };
  });
  for (let r = 0; r < rings.length - 1; r++) {
    const um = (BODY_U[r] + BODY_U[r + 1]) / 2;
    const band = stripe && BODY_STRIPES.some(b => um > b[0] && um < b[1]);
    const A = rings[r].row, B = rings[r + 1].row;
    for (let i = 0; i < sides; i++) {
      const ca = Math.cos((i + 0.5) / sides * Math.PI * 2);
      const col = ca < -0.42 ? belly : band && ca > -0.05 ? stripe : fur;
      addTri(A[i], B[i], B[i + 1], col);
      addTri(A[i], B[i + 1], A[i + 1], col);
    }
  }
}
function drawCat(ent) {
  if (!ent.joints) updatePose(ent, 0);
  const j = ent.joints;
  const pal = PAL[ent.palette] || PAL.kitten;
  const fox = ent.species === 'fox';
  const z = ent.z == null ? 0.55 : ent.z;
  const ds = depthScale(z);
  ctx.save();
  ctx.translate(ent.x + ent.w / 2, footY(ent));
  ctx.scale(ent.scale * ds * 2.15, ent.scale * ds * 2.15);
  if (ent.invuln > 0 && Math.sin(ent.t * 40) > 0) { ctx.restore(); return; }
  const grounded = ent.onGround || ent.hang ? 1 : 0.7;
  groundBlob(fox ? 24 : 18, fox ? 16 : 13, 0.32 * grounded);
  const tg = j.tg;
  const F = ent.facing || 1;
  const fur = rgbOf(pal.fur), dark = rgbOf(pal.dark), deep = rgbOf(pal.deep);
  const belly = rgbOf(pal.belly), earC = rgbOf(pal.ear), noseC = rgbOf(pal.nose);
  const shade = (c, k) => [c[0] * k, c[1] * k, c[2] * k];
  const furFar = shade(fur, 0.74), deepFar = shade(deep, 0.74);
  const sit = tg.sit || 0;
  const purring = ent.emote && ent.emote.kind === 'purr';
  const bob = -(tg.bodyY + 30) * 0.5 + (purring ? Math.sin(ent.t * 46) * 0.18 : 0);
  const len = fox ? 1.12 : 1;
  const rump = { x: -9 * len, y: 15 + bob - sit * 6 };
  const chest = { x: 9 * len + tg.stretch * 0.25, y: 16 + bob + sit * 5 };
  const head = {
    x: chest.x + 11 + (tg.headX - 40) * 0.35 + tg.stretch * 0.1,
    y: chest.y + 8 - (tg.headY - tg.bodyY + 16) * 0.4
  };
  beginMesh();
  addCatBody(rump, chest, F, fox ? 1.08 : 1, fur, belly, fox ? null : rgbOf(pal.stripe));
  addTube((chest.x + 4) * F, chest.y + 3, 0, (head.x - 3) * F, head.y - 2, 0, 4.8, 4.2, fur, 8);
  addEllipsoid(head.x * F, head.y, 0, fox ? 7.8 : 7.4, fox ? 7 : 6.8, fox ? 6.6 : 6.4, fur, 10, 6);
  const mx = head.x + (fox ? 7.6 : 5.6), my = head.y - 2.2;
  addEllipsoid(mx * F, my, 0, fox ? 5.6 : 3.4, fox ? 2.8 : 2.6, fox ? 3.2 : 3.6, belly, 8, 5);
  if (fox) addEllipsoid((mx + 2.6) * F, my - 0.6, 0, 3, 1.6, 2.6, [247, 244, 234], 6, 4);
  addEllipsoid((mx + (fox ? 5.2 : 3)) * F, my + 0.8, 0, 1.2, 0.9, 1.1, noseC, 6, 4);
  addEllipsoid((mx - 0.6) * F, my - 2 - tg.jaw * 2.4, 0, fox ? 3.6 : 2.6, 1.3, 2.4, belly, 6, 3);
  [-1, 1].forEach(s => {
    const ex = head.x - 1.4 - tg.ear * 1.6;
    addCone(ex * F, head.y + 4.2, s * 3.1, fox ? 3 : 2.6, (fox ? 9.5 : 7.6) - tg.ear * 1.5, 2, s > 0 ? dark : shade(dark, 0.8), 6);
    if (s > 0) addCone((ex + 0.5) * F, head.y + 4.8, 3.9, 1.3, (fox ? 6.6 : 5) - tg.ear, 0.8, earC, 5);
  });
  const emo = ent.emote ? ent.emote.kind : null;
  let blink = ent.blink < 0 ? clamp(1 + ent.blink * 10, 0.12, 1) : 1;
  if (emo === 'sleep') blink = 0.1;
  if (emo === 'purr') blink = 0.35;
  const eyeC = rgbOf(pal.eye);
  const ex = head.x + 3.6, ey = head.y + 1.2, ez = 5.3;
  addEllipsoid(ex * F, ey, ez, 2.1, 2.3 * blink + 0.15, 1.2, [250, 248, 236], 8, 5);
  addEllipsoid((ex + 0.5) * F, ey, ez + 0.6, 1.5, 1.9 * blink + 0.1, 0.8, eyeC, 8, 4);
  addEllipsoid((ex + 0.8) * F, ey, ez + 1, 0.55, 1.5 * blink, 0.5, [12, 10, 8], 6, 4);
  if (blink > 0.6) addEllipsoid((ex + 1.2) * F, ey + 0.8, ez + 1.3, 0.35, 0.35, 0.3, [255, 255, 255], 4, 3);
  [-1, 0, 1].forEach(s => {
    addTube((mx + 1.4) * F, my - 0.2, 3, (mx + 9) * F, my + s * 1.3, 5.6, 0.22, 0.06, [255, 252, 246], 4);
  });
  const tailC = rgbOf(pal.tail);
  const mode = ent.anim;
  let a0 = 2.25, curl = -0.16, amp = 0.12, spd = 3;
  if (mode === 'walk') { a0 = 2.45; curl = -0.1; amp = 0.16; spd = 6; }
  if (mode === 'run') { a0 = 2.85; curl = -0.04; amp = 0.1; spd = 14; }
  if (mode === 'stalk' || mode === 'pounce') { a0 = 3.05; curl = 0.05; amp = 0.22; spd = 2.2; }
  if (mode === 'sit' || mode === 'meow') { a0 = 3.6; curl = 0.28; amp = emo === 'purr' ? 0.03 : 0.08; spd = 2; }
  if (mode === 'sleep') { a0 = 3.7; curl = 0.34; amp = 0.02; spd = 1; }
  if (mode === 'jump' || mode === 'fall') { a0 = 2.6; curl = -0.06; amp = 0.05; spd = 4; }
  let tp = { x: rump.x - 7.2, y: rump.y + 2.4 };
  let ang = a0;
  const segs = 7, segLen = fox ? 3.9 : 3.2;
  for (let i = 0; i < segs; i++) {
    ang += curl + Math.sin(ent.t * spd - i * 0.7) * amp;
    const np = { x: tp.x + Math.cos(ang) * segLen, y: tp.y + Math.sin(ang) * segLen };
    const r0 = (fox ? 3.4 : 2.3) * (1 - i / segs * (fox ? 0.35 : 0.55));
    const r1 = (fox ? 3.4 : 2.3) * (1 - (i + 1) / segs * (fox ? 0.35 : 0.55));
    const col = i >= segs - 2 ? tailC : fur;
    addTube(tp.x * F, tp.y, 0, np.x * F, np.y, 0, r0, r1, col, 6);
    addEllipsoid(np.x * F, np.y, 0, r1, r1, r1, col, 5, 3);
    tp = np;
  }
  const legDefs = [
    { hip: rump, base: -18, off: -1.2, z: 3.6, bend: -1, near: true },
    { hip: rump, base: -6, off: 1.2, z: -3.6, bend: -1, near: false },
    { hip: chest, base: 18, off: 0.4, z: 3.4, bend: -1, near: true },
    { hip: chest, base: 30, off: 2, z: -3.4, bend: -1, near: false }
  ];
  const L1 = fox ? 8.4 : 7.8, L2 = fox ? 8.2 : 7.6;
  let strike = null;
  legDefs.forEach((d, n) => {
    const hx = d.hip.x + (n < 2 ? 1 : 1.5), hy = d.hip.y - 2;
    const tx = hx + d.off + (tg.paws[n].x - d.base) * 0.55;
    const ty = Math.max(0, -tg.paws[n].y * 0.55);
    const k = ik(hx, hy, tx, ty, L1, L2, d.bend);
    const c = d.near ? fur : furFar;
    if (n < 2) addEllipsoid(hx * F, hy + 1.5, d.z * 0.7, 5.4, 6, 3.4, c, 7, 4);
    else addEllipsoid(hx * F, hy + 1, d.z * 0.7, 3.8, 4.6, 3, c, 7, 4);
    addTube(hx * F, hy, d.z, k.x * F, k.y, d.z, fox ? 3.1 : 2.8, 2.1, c, 6);
    addEllipsoid(k.x * F, k.y, d.z, 2.1, 2.1, 2.1, c, 5, 3);
    addTube(k.x * F, k.y, d.z, k.fx * F, k.fy + 1, d.z, 2.1, 1.7, c, 6);
    addEllipsoid((k.fx + 0.9) * F, k.fy + 1.1, d.z, 2.5, 1.3, 2, d.near ? deep : deepFar, 6, 3);
    if (n === 2) strike = k;
  });
  if (ent.pawT > 0 && strike) {
    for (let c = -1; c <= 1; c++) {
      addTube((strike.fx + 2.4) * F, strike.fy + 1.2 + c * 0.8, 3.4, (strike.fx + 5.2) * F, strike.fy + 1.6 + c * 1.2, 3.4, 0.4, 0.08, [252, 248, 240], 4);
    }
  }
  if (ent.held) addEllipsoid((mx + 1.5) * F, my - 2.8, 2, 4, 2.2, 2.6, [106, 83, 68], 6, 4);
  if (ent.held2) addEllipsoid((mx - 1.5) * F, my - 3.6, 3.6, 3.8, 2.1, 2.4, [92, 72, 60], 6, 4);
  paintMesh();
  ctx.restore();
}

function drawPrey(p) {
  if (p.kind === 'mole' && p.state !== 'up') return;
  const z = p.z == null ? 0.58 : p.z;
  const x = p.kind === 'mole' ? p.mound : p.x + p.w / 2;
  const base = p.kind === 'mole' ? terrainY(p.mound) : footY(p);
  const ds = depthScale(p.kind === 'mole' ? 0.55 : z) * 1.85;
  ctx.save();
  ctx.translate(x, base);
  ctx.scale(ds, ds);
  groundBlob(14, 10, 0.28);
  const F = p.facing || 1;
  const step = Math.sin((p.gait || 0) * Math.PI * 2);
  const up = (x, y, z) => [x * F, -y, z || 0];
  beginMesh();
  const eye = (x, y, z, s) => {
    addEllipsoid(x, y, z, s * 1.1, s, s * 0.6, [248, 250, 242], 7, 4);
    addEllipsoid(x + 0.35 * F, y + 0.1, z + s * 0.45, s * 0.62, s * 0.72, s * 0.4, [20, 16, 14], 6, 4);
    addEllipsoid(x + 0.6 * F, y + s * 0.4, z + s * 0.75, s * 0.2, s * 0.2, s * 0.15, [255, 255, 255], 4, 3);
  };
  if (p.kind === 'mouse' || p.kind === 'vole') {
    const vole = p.kind === 'vole';
    const fur = vole ? [110, 82, 64] : [168, 136, 112];
    const belly = vole ? [214, 186, 160] : [236, 214, 190];
    addEllipsoid(0, 6, 0, vole ? 9 : 7.4, vole ? 5.6 : 4.6, vole ? 6.4 : 5.2, fur, 10, 6);
    const hx = 8 * F, hy = 12;
    addEllipsoid(hx, hy, 0, vole ? 6.4 : 5.8, vole ? 5.6 : 5.2, vole ? 5.8 : 5.4, belly, 10, 6);
    [-1, 1].forEach(s => addEllipsoid(hx - F, hy + 4.5, s * 3.2, 2.2, 3.6, 1.2, [244, 196, 198], 8, 5));
    addEllipsoid(hx + 4 * F, hy - 1, 0, 2.4, 1.6, 2, [240, 180, 184], 8, 5);
    eye(hx + 3 * F, hy + 1.4, 4, 1.15);
    addTube(-6 * F, 5, 0, (vole ? -14 : -18) * F, 6 + step * 2, step, vole ? 1.5 : 0.9, 0.25, [214, 160, 156], 6);
    [[-3, 3.2], [-3, -3.2], [4, 2.6], [4, -2.6]].forEach((L, n) => {
      const hop = Math.max(0, Math.sin((p.gait || 0) * Math.PI * 2 + n * 1.4)) * 3.4;
      addTube(L[0] * F, 4, L[1], L[0] * F + hop * 0.35 * F, 0.4 + hop, L[1], 1.1, 0.7, fur, 6);
    });
  } else if (p.kind === 'rabbit') {
    const kick = p.state === 'flee' ? Math.max(0, step) * 6 : 0;
    addEllipsoid(-1 * F, 8, 0, 10, 6.4, 7.2, [214, 186, 156], 10, 6);
    const hx = 8 * F, hy = 15;
    addEllipsoid(hx, hy, 0, 6.6, 6, 6.2, [244, 232, 216], 10, 6);
    [-1, 1].forEach(s => {
      addEllipsoid(hx - 0.5 * F, hy + 12, s * 2.4, 1.7, 11, 1.4, [228, 206, 180], 8, 6);
      addEllipsoid(hx - 0.5 * F, hy + 12, s * 2.4, 0.8, 7.5, 0.6, [240, 168, 176], 6, 4);
    });
    addEllipsoid(-12 * F, 8, 0, 3.6, 3.6, 3.6, [248, 246, 240], 8, 6);
    const hop = Math.max(0, Math.sin((p.gait || 0) * Math.PI * 2));
    addTube(-2 * F, 5, 4, (-4 - hop * 2) * F, 1 + kick * 0.2 + hop * 4, 5, 3.2, 1.8, [196, 168, 140], 8);
    addTube(-2 * F, 5, -4, -4 * F, 1 + Math.max(0, -hop) * 3, -5, 3.2, 1.8, [196, 168, 140], 8);
    eye(hx + 3.2 * F, hy + 1.5, 4.6, 1.3);
    addEllipsoid(hx + 6 * F, hy - 1.2, 0, 1.5, 1.1, 1.2, [236, 150, 160], 6, 4);
  } else if (p.kind === 'sparrow') {
    const flap = p.state === 'takeoff' || p.state === 'fly' ? Math.sin((p.t || 0) * 28) : Math.sin((p.t || 0) * 5) * 0.3;
    addEllipsoid(0, 6, 0, 8, 4.6, 5,2, [150, 96, 48], 10, 6);
    addEllipsoid(1 * F, 5.2, 1.4, 4.6, 2.2, 3, [244, 228, 196], 10, 6);
    const hx = 7 * F, hy = 11;
    addEllipsoid(hx, hy, 0, 4.4, 4.2, 4.2, [168, 112, 58], 8, 5);
    addEllipsoid(hx + 5.4 * F, hy - 0.2, 0, 3.2, 1.15, 1.25, [230, 176, 72], 8, 5);
    [-1, 1].forEach(side => {
      addEllipsoid(-1 * F, 7 + flap * 4, side * (6 + flap), 6.5, 0.7, 2.8, [110, 72, 40], 8, 4);
    });
    eye(hx + 2.2 * F, hy + 1.2, 3.3, 0.95);
  } else if (p.kind === 'mole') {
    addEllipsoid(0, 7, 0, 11, 7.2, 9, [72, 54, 48], 10, 6);
    const hx = 10 * F, hy = 8;
    addEllipsoid(hx, hy, 0, 6, 4.6, 5,2, [96, 72, 64], 8, 5);
    addEllipsoid(hx + 5 * F, hy - 0.4, 0, 2.6, 2.4, 2.6, [244, 176, 184], 8, 6);
    for (let n = 0; n < 5; n++) {
      const a = -0.8 + n * 0.4;
      addTube(hx + 6 * F, hy, 0, hx + (6 + Math.cos(a) * 3.5) * F, hy + Math.sin(a) * 2.2, (n - 2) * 0.7, 0.4, 0.15, [230, 140, 150], 4);
    }
    eye(hx + 1.5 * F, hy + 2, 3.7, 0.75);
    addEllipsoid(0, 3, 2.5, 6, 1.6, 4, [110, 78, 66], 8, 4);
    [[-4, 5], [-4, -5], [5, 4], [5, -4]].forEach((L, n) => {
      const hop = Math.max(0, Math.sin((p.t || 0) * 8 + n)) * 2.2;
      addTube(L[0] * F, 4, L[1], L[0] * F + (2 + hop) * F, 0.5 + hop, L[1], 1.6, 0.8, [58, 42, 38], 6);
    });
  }
  paintMesh();
  ctx.restore();
  if (p.alert > 4 && p.kind !== 'mole') {
    const a = clamp(p.alert / 100, 0, 1);
    ctx.strokeStyle = a > 0.7 ? '#e2583a' : '#e6c15a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, base - 28 * ds, 8, Math.PI, Math.PI + a * Math.PI * 2);
    ctx.stroke();
  }
}
function drawMound(p) {
  if (p.hidden || p.state === 'up') return;
  const ds = depthScale(0.55);
  ctx.save();
  ctx.translate(p.mound, terrainY(p.mound));
  ctx.scale(ds, ds);
  beginMesh();
  addEllipsoid(0, -1, 0, 30, 6, 14, [138, 92, 58], 10, 5);
  addEllipsoid(-8, 1, 0, 16, 4.2, 9, [176, 124, 78], 8, 4);
  addEllipsoid(7, 0, 0, 6, 2.2, 4.5, [64, 42, 32], 8, 4);
  paintMesh();
  ctx.restore();
}

let lastBucket = { x: 0, y: 0 };
function drawMachine(x, y, t, sc, arm) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sc, sc);
  groundBlob(300, 150, 0.36);
  const sx = -30, sy = -270;
  const len1 = 280;
  const ex = sx + Math.cos(arm) * len1;
  const ey = sy + Math.sin(arm) * len1;
  const a2 = arm + 0.95;
  const len2 = 230;
  const bx = ex + Math.cos(a2) * len2;
  const by = ey + Math.sin(a2) * len2;
  beginMesh();
  addRoundBox(0, 24, 0, 250, 24, 100, [48, 52, 56], 14);
  for (let i = -4; i <= 4; i++) addTube(i * 56, 10, -86, i * 56, 10, 86, 36, 36, [62, 68, 74], 8);
  addRoundBox(-8, 145, 0, 160, 64, 90, [214, 142, 42], 16);
  addEllipsoid(-8, 200, 0, 140, 34, 84, [236, 176, 70], 10, 5);
  addRoundBox(-186, 145, 0, 28, 70, 96, [168, 104, 22], 12);
  addRoundBox(0, 78, 0, 150, 8, 62, [28, 28, 30], 6);
  addRoundBox(0, 66, 0, 140, 6, 50, [240, 206, 78], 5);
  addRoundBox(140, 320, 0, 88, 58, 82, [232, 160, 48], 16);
  addEllipsoid(140, 372, 0, 72, 30, 74, [246, 190, 78], 8, 5);
  addBox(148, 348, -40, 58, 22, 6, [186, 228, 242]);
  addRoundBox(158, 300, 42, 20, 12, 16, [48, 40, 34], 4);
  addTube(sx, -sy, 0, ex, -ey, 0, 22, 18, [32, 32, 34], 8);
  addTube(ex, -ey, 0, bx, -by, 0, 16, 13, [48, 48, 50], 8);
  addBox(bx + 28, -by - 16, 0, 52, 28, 32, [64, 60, 56]);
  for (let i = 0; i < 5; i++) addBox(bx + i * 14, -by - 34, 8, 3, 10, 3, [200, 194, 184]);
  const blink = Math.sin(t * 7) > 0;
  addEllipsoid(230, 450, 40, 10, 10, 10, blink ? [255, 211, 74] : [210, 58, 40], 5, 4);
  paintMesh();
  ctx.fillStyle = 'rgba(70,70,70,0.32)';
  for (let i = 0; i < 6; i++) {
    const puff = project3({
      x: -160 + Math.sin(t * 1.6 + i) * 10,
      y: 240 + i * 26 + (t * 24 % 18),
      z: 8
    });
    ctx.beginPath();
    ctx.arc(puff.x, puff.y, 11 + i * 3, 0, 7);
    ctx.fill();
  }
  const tip = project3({ x: bx, y: -by, z: 0 });
  lastBucket.x = x + tip.x * sc;
  lastBucket.y = y + tip.y * sc;
  ctx.restore();
}
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function physics(ent, dt) {
  ent.vy += GRAV * dt;
  if (ent.vy > 980) ent.vy = 980;
  const wasGround = ent.onGround && ent.vy >= 0;
  const held = wasGround ? ent.plat : null;
  let feet = ent.y + ent.h;
  ent.x += ent.vx * dt;
  if (ent.x < 4) { ent.x = 4; ent.vx = 0; }
  if (ent.x > WORLD_W - 420) { ent.x = WORLD_W - 420; ent.vx = 0; }
  const ground = () => planeY(ent.x + ent.w * 0.5, ent.z);
  if (wasGround && held) ent.alt = riseAt(ent, held.y);
  else if (wasGround) ent.alt = 0;
  else ent.alt = ground() - feet;
  for (const b of BLOCKS) {
    if (!blockSolid(ent, b)) continue;
    if (ent.x + ent.w <= b.x || ent.x >= b.x + b.w) continue;
    if (ent.vx > 0) ent.x = b.x - ent.w;
    else if (ent.vx < 0) ent.x = b.x + b.w;
    else ent.x = (ent.x + ent.w / 2 < b.x + b.w / 2) ? b.x - ent.w : b.x + b.w;
    ent.vx = 0;
  }
  if (!wasGround) ent.alt = ground() - feet;
  ent.onGround = false;
  ent.plat = null;
  const supported = (spec, pad, lane) => {
    if (!spec) return false;
    const horiz = ent.x + ent.w > spec.x + pad && ent.x < spec.x + spec.w - pad;
    if (!horiz) return false;
    if ((spec.zr || 0) >= 0.9) return true;
    return sameLane(ent, spec.z == null ? 0.55 : spec.z, lane);
  };
  if (wasGround && held && supported(held, held.kind ? 6 : 8, held.kind ? (held.zr || 0.18) : 0.1)) {
    ent.alt = riseAt(ent, held.y);
    ent.vy = 0; ent.onGround = true; ent.doubleUsed = false; ent.plat = held;
  } else if (wasGround && !held) {
    ent.alt = 0; ent.vy = 0; ent.onGround = true; ent.doubleUsed = false;
  } else {
    const prevAlt = ent.alt;
    feet += ent.vy * dt;
    ent.alt = ground() - feet;
    for (const b of BLOCKS) {
      if ((b.zr || 0) < 0.9 && !sameLane(ent, b.z == null ? 0.55 : b.z, b.zr || 0.18)) continue;
      if (ent.x + ent.w <= b.x + 6 || ent.x >= b.x + b.w - 6) continue;
      const lift = riseAt(ent, b.y);
      if (ent.vy >= 0 && prevAlt >= lift - 12 && ent.alt <= lift + 4) {
        ent.alt = lift; ent.vy = 0; ent.onGround = true; ent.doubleUsed = false; ent.plat = b;
      }
    }
    for (const p of PLATS) {
      if (ent.x + ent.w <= p.x + 8 || ent.x >= p.x + p.w - 8) continue;
      if (!sameLane(ent, p.z == null ? 0.55 : p.z, 0.1)) continue;
      const lift = riseAt(ent, p.y);
      if (ent.vy >= 0 && prevAlt >= lift - 12 && ent.alt <= lift + 4) {
        ent.alt = lift; ent.vy = 0; ent.onGround = true; ent.doubleUsed = false; ent.plat = p;
      }
    }
    if (!ent.plat && ent.vy >= 0 && ent.alt <= 2) {
      ent.alt = 0; ent.vy = 0; ent.onGround = true; ent.doubleUsed = false;
    }
  }
  ent.y = ground() - ent.alt - ent.h;
  const fx = ent.x + ent.w * 0.5;
  const sl = Math.atan2(terrainY(fx + 10) - terrainY(fx - 10), 20);
  ent.slope = clamp(sl, -0.45, 0.45);
}

function blockedAhead(ent, dir) {
  const probe = {
    x: ent.x + dir * 18, y: ent.y, w: ent.w, h: ent.h, z: ent.z,
    alt: ent.alt != null ? ent.alt : bodyAlt(ent)
  };
  return BLOCKS.some(b => blockSolid(probe, b) && probe.x < b.x + b.w && probe.x + probe.w > b.x);
}
function walkToward(ent, tx, speed) {
  const dir = Math.sign(tx - ent.x);
  if (Math.abs(tx - ent.x) < 12) { ent.vx = 0; if (ent.onGround) ent.anim = ent.mode === 'wait' ? 'sit' : 'idle'; return; }
  ent.facing = dir || ent.facing;
  ent.vx = dir * speed;
  ent.anim = 'walk';
  const aheadY = planeY(ent.x + dir * 36, ent.z);
  const feet = ent.y + ent.h;
  if (ent.onGround && feet - aheadY > 42) ent.vy = -JUMP_V * 0.92;
  if (ent.onGround && blockedAhead(ent, dir)) ent.vy = -JUMP_V;
}

function updateEarth(dt) {
  if (earth.hidden) { updatePose(earth, dt); return; }
  if (earth.onGround) {
    const oz = earth.z == null ? 0.55 : earth.z;
    const tz = player.z == null ? 0.55 : player.z;
    earth.z = lerp(oz, tz, 0.08);
    earth.y += planeY(earth.x + earth.w * 0.5, earth.z) - planeY(earth.x + earth.w * 0.5, oz);
  }
  if (earth.mode === 'enter') walkToward(earth, player.x + 86, 110);
  else if (earth.mode === 'lead') {
    walkToward(earth, 4900, 125);
    if (earth.x > 4860 && Math.abs(player.x - earth.x) < 400) earth.mode = 'wait';
  } else if (earth.mode === 'follow') {
    const tx = player.x - 90;
    if (Math.abs(player.x - earth.x) > 560) {
      earth.x = player.x - 110;
      earth.z = player.z;
      earth.y = planeY(earth.x, earth.z) - earth.h;
      earth.vx = 0;
    } else walkToward(earth, tx, 155);
  } else {
    earth.vx = 0;
    earth.anim = 'sit';
    earth.facing = player.x < earth.x ? -1 : 1;
  }
  if (Math.abs(earth.vx) > 8) earth.gait += Math.abs(earth.vx) * dt * 0.02;
  physics(earth, dt);
  updatePose(earth, dt);
}
function updateDune(dt) {
  dune.anim = 'sit';
  dune.vx = 0;
  dune.z = lerp(dune.z == null ? 0.55 : dune.z, player.z == null ? 0.55 : player.z, 0.02);
  dune.y = planeY(dune.x, dune.z) - dune.h;
  dune.facing = player.x < dune.x ? -1 : 1;
  updatePose(dune, dt);
}

function updateMole(p, dt) {
  if (p.hidden) {
    p.respawn -= dt;
    if (!p.tutorial && p.respawn <= 0) resetPrey(p);
    return;
  }
  p.t += dt;
  const noisy = playerNoise() > (exposed(p.mound) ? 0.28 : 0.5);
  const near = Math.abs(player.x + player.w / 2 - p.mound) < 130 && sameLane(player, p.z == null ? 0.55 : p.z, 0.2);
  if (p.state === 'hide') {
    p.stateT -= dt;
    if (p.stateT <= 0) p.state = 'idle';
    return;
  }
  if (p.state === 'up') {
    p.stateT -= dt;
    const d = Math.abs(player.x + 10 - p.mound);
    if (player.pouncing && d < 48 && sameLane(player, p.z == null ? 0.55 : p.z, 0.18) && bodyAlt(player) < 42) catchPrey(p);
    if (p.stateT <= 0 && !p.hidden) p.state = 'idle';
    return;
  }
  p.mound += p.moundDir * 42 * dt;
  if (p.mound > p.home + 92) p.moundDir = -1;
  if (p.mound < p.home - 92) p.moundDir = 1;
  if (near && noisy) { p.state = 'hide'; p.stateT = 1.6; p.calm = 0; burst(p.mound, terrainY(p.mound), 6, '#8a6244', 40, 0.3); return; }
  if (near && !noisy) p.calm += dt; else p.calm = Math.max(0, p.calm - dt * 1.4);
  const need = p.tutorial ? 1.7 : 2.5;
  if (p.calm > need * (exposed(p.mound) ? 1.35 : 0.85)) {
    p.state = 'up';
    p.stateT = 1.15;
    p.calm = 0;
    burst(p.mound, terrainY(p.mound), 8, '#a07850', 50, 0.35);
  }
}
function updateMouse(p, dt) {
  if (p.hidden) { p.respawn -= dt; if (p.respawn <= 0) resetPrey(p); return; }
  const dist = flatDist(player, p.x, p.z);
  const hear = (exposed(p.x) ? 230 : 98) * (0.35 + playerNoise());
  if (p.state !== 'flee') {
    if (dist < hear) p.alert = Math.min(140, p.alert + dt * (46 + 100 * (1 - dist / Math.max(1, hear))));
    else p.alert = Math.max(0, p.alert - dt * 30);
    p.wander -= dt;
    if (p.wander <= 0) { p.wander = 1.2 + Math.random() * 2; p.facing = Math.random() < 0.5 ? -1 : 1; }
    p.vx = p.alert > 25 ? 0 : p.facing * 26;
    if (Math.abs(p.x - p.home) > 80) p.vx = Math.sign(p.home - p.x) * 26;
    if (p.alert >= 100) { p.state = 'flee'; p.stateT = 1.7; p.fleeDir = Math.sign(p.x - player.x) || 1; }
    if (player.pouncing && dist < 40 && p.alert < 100 && player.quietPounce) catchPrey(p);
  } else {
    p.stateT -= dt;
    p.vx = p.fleeDir * 230;
    p.facing = Math.sign(p.vx) || 1;
    if (p.stateT <= 0) { p.hidden = true; p.respawn = 9; }
  }
  if (Math.abs(p.vx) > 8) p.gait += dt * 6;
  physics(p, dt);
}
function updateVole(p, dt) {
  if (p.hidden) { p.respawn -= dt; if (p.respawn <= 0) resetPrey(p); return; }
  const dist = flatDist(player, p.x, p.z);
  const hear = (exposed(p.x) ? 210 : 120) * (0.4 + playerNoise());
  if (p.state !== 'flee') {
    if (dist < hear) p.alert = Math.min(140, p.alert + dt * 55);
    else p.alert = Math.max(0, p.alert - dt * 22);
    p.vx = Math.sin(p.t * 0.8) * 18;
    p.facing = p.vx >= 0 ? 1 : -1;
    if (p.alert > 72) { p.state = 'flee'; p.stateT = 1.35; p.fleeDir = Math.sign(p.x - player.x) || 1; }
    if (player.pouncing && player.quietPounce && dist < 36 && p.alert < 72) catchPrey(p);
  } else {
    p.stateT -= dt;
    p.vx = p.fleeDir * 268;
    p.facing = Math.sign(p.vx) || 1;
    if ((player.sprinting || player.pouncing) && sameLane(player, p.z, 0.16) && player.x < p.x + p.w && player.x + player.w > p.x && bodyAlt(player) < 40) catchPrey(p);
    if (p.stateT <= 0 && !p.hidden) { p.hidden = true; p.respawn = 9; }
  }
  p.t += dt;
  if (Math.abs(p.vx) > 8) p.gait += dt * 7;
  physics(p, dt);
}
function updateRabbit(p, dt) {
  if (p.hidden) { p.respawn -= dt; if (p.respawn <= 0) resetPrey(p); return; }
  const dist = flatDist(player, p.x, p.z);
  if (p.state !== 'flee') {
    p.vx = Math.sin(p.t) * 10;
    p.facing = 1;
    if (dist < 190 || (player.sprinting && dist < 300) || playerNoise() > 0.8 && dist < 260) {
      p.state = 'flee';
      p.facing = Math.sign(p.burrow - p.x) || 1;
    }
  } else {
    p.vx = Math.sign(p.burrow - p.x) * 252;
    p.facing = Math.sign(p.vx) || 1;
    if ((Math.abs(player.vx) > 200 || player.pouncing) && sameLane(player, p.z, 0.16) && player.x < p.x + p.w && player.x + player.w > p.x && bodyAlt(player) < 46) catchPrey(p);
    if (Math.abs(p.x - p.burrow) < 18 && !p.hidden) { p.hidden = true; p.respawn = 11; burst(p.burrow, terrainY(p.burrow), 8, '#c8b090', 40, 0.3); }
  }
  p.t += dt;
  p.gait += dt * (p.state === 'flee' ? 10 : 2);
  physics(p, dt);
}
function updateSparrow(p, dt) {
  if (p.hidden) { p.respawn -= dt; if (p.respawn <= 0) resetPrey(p); return; }
  const dist = flatDist(player, p.x, p.z);
  p.t += dt;
  if (p.state === 'idle' || p.state === 'idle2') {
    p.y = planeY(p.x, p.z) - p.h;
    p.vx = 0;
    if (player.sprinting && dist < 150) { p.state = 'fly'; p.stateT = 1.2; }
    else if (dist < 96 && player.stalking && playerNoise() < 0.34) { p.state = 'warn'; p.stateT = 0.34; }
  } else if (p.state === 'warn') {
    p.stateT -= dt;
    if (playerNoise() > 0.6) { p.state = 'fly'; p.stateT = 1; }
    if (p.stateT <= 0) { p.state = 'takeoff'; p.stateT = 0.4; p.vy = -80; }
  } else if (p.state === 'takeoff') {
    p.stateT -= dt;
    p.vy -= 280 * dt;
    p.x += p.facing * 30 * dt;
    p.y += p.vy * dt;
    if ((player.pouncing || !player.onGround) && dist < 76) catchPrey(p);
    if (p.stateT <= 0 && !p.hidden) { p.state = 'fly'; p.stateT = 1.1; }
  } else if (p.state === 'fly') {
    p.stateT -= dt;
    p.x += 160 * dt;
    p.y -= 90 * dt;
    if (p.stateT <= 0) { p.hidden = true; p.respawn = 10; }
  }
}
function updateFox(dt) {
  if (fox.hidden) return;
  const zGap = Math.abs((player.z == null ? 0.55 : player.z) - (fox.z == null ? 0.55 : fox.z));
  const dist = Math.hypot(player.x - fox.x, zGap * 480);
  const high = bodyAlt(player) > 68;
  if (!high && dist < 280 && player.invuln <= 0 && phase === 'play') {
    fox.mode = 'chase';
    const dir = Math.sign(player.x - fox.x) || 1;
    fox.facing = dir;
    fox.vx = dir * 215;
    fox.anim = 'run';
    if (!flags.tipFox) { flags.tipFox = true; showBanner('tip_fox'); }
  } else {
    fox.mode = 'patrol';
    const left = 17160, right = 18380;
    if (!fox.patrolDir) fox.patrolDir = 1;
    if (fox.x > right) fox.patrolDir = -1;
    if (fox.x < left) fox.patrolDir = 1;
    fox.vx = fox.patrolDir * 70;
    fox.facing = fox.patrolDir;
    fox.anim = 'walk';
  }
  if (fox.onGround && blockedAhead(fox, fox.facing)) fox.vy = -520;
  physics(fox, dt);
  if (Math.abs(fox.vx) > 8) fox.gait += Math.abs(fox.vx) * dt * 0.02;
  updatePose(fox, dt);
  if (phase === 'play' && zGap < 0.16 && player.x < fox.x + fox.w && player.x + player.w > fox.x && bodyAlt(player) < 48 && player.invuln <= 0 && !high) {
    player.invuln = 1.25;
    player.vy = -340;
    player.vx = Math.sign(player.x - fox.x) * 280 || -260;
    player.hunger = clamp(player.hunger - 14, 0, 100);
    shake = 7;
    sfxHurt();
    burst(player.x, player.y, 8, '#e8d0c0', 80, 0.3);
  }
}

function maybeTips() {
  if (!flags.mole || dlg) return;
  const near = (x, r) => Math.abs(player.x - x) < r;
  if (!flags.tipVole && near(14360, 220)) { flags.tipVole = true; showBanner('tip_vole'); }
}

const EMOTES = ['sleep', 'purr', 'meow', 'sit'];
function startEmote(kind) {
  emoteMenu = false;
  if (!player.onGround || player.hang || player.drinkT > 0) return;
  player.emote = { kind, t: 0, tick: 0 };
  player.vx = 0;
  if (kind === 'meow') sfxMeow();
  if (kind === 'purr') sfxPurr();
}
function updateEmote(dt) {
  const e = player.emote;
  e.t += dt;
  e.tick -= dt;
  const hx = player.x + player.w * 0.5 + (player.facing || 1) * 30;
  if (e.kind === 'sleep' && e.tick <= 0) {
    e.tick = 1.3;
    floatText('z', hx, player.y - 6, '#f4f0ff');
  }
  if (e.kind === 'purr' && e.tick <= 0) {
    e.tick = 1.1;
    sfxPurr();
    floatText('\u266a', hx, player.y - 4, '#ffe6c4');
  }
  if (e.kind === 'meow' && e.t > 1.1) player.emote = null;
}
function updatePlay(dt) {
  playT += dt;
  const left = !!(keys.ArrowLeft || keys.KeyA || hold.left);
  const right = !!(keys.ArrowRight || keys.KeyD || hold.right);
  const stalk = !!(keys.KeyS || keys.ArrowDown || hold.stalk);
  const shift = !!(keys.ShiftLeft || keys.ShiftRight);
  const pounceHold = !!(keys.KeyJ || hold.pounce);
  const pawEdge = !!(just.KeyK || (hold.paw && !holdPrev.paw));
  const jumpEdge = !!(just.Space || just.ArrowUp || just.KeyW || (hold.jump && !holdPrev.jump));
  const interactEdge = !!(just.KeyE || (hold.interact && !holdPrev.interact));
  if (just.Enter || just.NumpadEnter) emoteMenu = !emoteMenu;
  if (emoteMenu) {
    if (just.Escape) emoteMenu = false;
    for (let n = 0; n < EMOTES.length; n++) {
      if (just['Digit' + (n + 1)] || just['Numpad' + (n + 1)]) { startEmote(EMOTES[n]); break; }
    }
  }
  if (player.emote && (left || right || stalk || pounceHold || pawEdge || jumpEdge || interactEdge || !player.onGround || player.drinkT > 0 || player.hang)) player.emote = null;
  if (player.emote) updateEmote(dt);

  if (player.hang) {
    player.vx = 0; player.vy = 0; player.anim = 'hang';
    if (jumpEdge) {
      const p = player.hang;
      const dir = player.x + player.w / 2 < p.x + p.w / 2 ? 1 : -1;
      player.x += dir * 20;
      player.y = shelfY(p.y, player.z) - player.h - 2;
      player.vy = -180;
      player.hang = null;
      sfxJump();
    } else if (just.ArrowDown || (left && player.x < player.hang.x) || (right && player.x > player.hang.x + player.hang.w)) {
      player.hang = null;
    }
  } else if (player.drinkT > 0) {
    player.drinkT -= dt;
    player.vx = 0;
    player.anim = 'drink';
    if (player.drinkT <= 0) {
      player.drinkT = 0;
      if (flags._meet) {
        flags._meet = false;
        say([
          { who: 'name_earth', k: 'dlg_earth1' },
          { who: 'name_you', k: 'dlg_you1' },
          { who: 'name_earth', k: 'dlg_earth2' },
          { who: 'name_earth', k: 'dlg_earth3' }
        ], () => { phase = 'tutorial'; });
      }
    }
  } else {
    if (player.stamina <= 1) player.sprintLock = true;
    if (player.stamina > 24) player.sprintLock = false;
    const dir = (right ? 1 : 0) - (left ? 1 : 0);
    if (dir) player.facing = dir;
    player.stalking = stalk && player.onGround && !pounceHold;
    const wantSprint = shift && !stalk && !player.sprintLock && !!dir && player.charge < 0.05;
    player.sprinting = wantSprint && player.onGround;
    let speed = player.stalking ? 74 : wantSprint ? 305 : 158;
    if (player.hunger <= 0 || player.thirst <= 0) speed *= 0.45;
    if (player.charge > 0.05) speed = 36;
    const accel = player.onGround ? 10 : 4.5;
    if (!player.pouncing) player.vx = lerp(player.vx, dir * speed, Math.min(1, accel * dt));
    if (player.onGround) player.coyote = 0.12; else player.coyote = Math.max(0, player.coyote - dt);
    if (jumpEdge) player.jumpBuf = 0.12; else player.jumpBuf = Math.max(0, player.jumpBuf - dt);
    if (player.jumpBuf > 0 && (player.onGround || player.coyote > 0)) {
      player.vy = -JUMP_V; player.onGround = false; player.coyote = 0; player.jumpBuf = 0; player.hang = null;
      sfxJump(); burst(player.x + 10, player.y + player.h, 5, '#d8c4a4', 40, 0.25);
    } else if (jumpEdge && player.canDouble && !player.doubleUsed) {
      player.vy = -JUMP_V * 0.96; player.doubleUsed = true; player.jumpBuf = 0;
      sfxJump(); burst(player.x + 12, player.y + 10, 8, '#fff4d0', 70, 0.35);
    }
    if (pawEdge && !player.hang) tryPaw();
    if (player.pawT > 0) player.pawT -= dt;
    if (pounceHold && player.onGround && !player.pouncing) player.charge = Math.min(1, player.charge + dt * 1.15);
    else {
      if (player.charge > 0.2 && !player.pouncing) {
        const launch = pounceLaunch(player.charge);
        player.pouncing = true;
        player.pounceT = 0.7;
        player.quietPounce = player.stalking || player.quietT > 0.18;
        player.vx = launch.vx;
        player.vy = launch.vy;
        player.onGround = false;
        player.stamina = Math.max(0, player.stamina - 14);
        sfxPounce();
      }
      player.charge = 0;
    }
    if (player.pouncing) {
      player.pounceT -= dt;
      if (player.pounceT <= 0 || (player.onGround && player.vy >= 0 && player.pounceT < 0.55)) player.pouncing = false;
    }
    if (player.stalking) player.quietT = Math.min(1, player.quietT + dt);
    else player.quietT = Math.max(0, player.quietT - dt * 2);
    if (interactEdge) tryInteract();
    physics(player, dt);
    if (!player.onGround && !player.hang && player.vy > 0) {
      const feet = player.y + player.h;
      for (const p of PLATS) {
        if (!sameLane(player, p.z == null ? 0.55 : p.z, 0.16)) continue;
        const nearL = Math.abs(player.x + player.w - p.x) < 20 && player.x < p.x;
        const nearR = Math.abs(player.x - (p.x + p.w)) < 20 && player.x > p.x;
        if ((nearL || nearR) && Math.abs(feet - shelfY(p.y, player.z)) < 26) {
          player.hang = p;
          player.y = shelfY(p.y, player.z) - player.h + 6;
          player.vy = 0; player.vx = 0;
          break;
        }
      }
    }
    let anim = 'idle';
    if (player.hang) anim = 'hang';
    else if (!player.onGround) anim = player.vy < -40 ? 'jump' : 'fall';
    else if (player.pouncing || player.charge > 0.08) anim = 'pounce';
    else if (player.stalking && Math.abs(player.vx) > 8) anim = 'stalk';
    else if (player.sprinting && Math.abs(player.vx) > 40) anim = 'run';
    else if (Math.abs(player.vx) > 12) anim = 'walk';
    if (player.emote && anim === 'idle') anim = player.emote.kind === 'purr' ? 'sit' : player.emote.kind;
    player.anim = anim;
    if (player.onGround && Math.abs(player.vx) > 20) {
      const step = player.gait;
      player.gait += Math.abs(player.vx) * dt * 0.02;
      if (Math.floor(step) !== Math.floor(player.gait)) {
        sfxStep();
        if (player.sprinting) burst(player.x + 8, player.y + player.h, 2, '#cbb89a', 30, 0.2);
      }
    }
    const thirstRate = !flags.drank ? 0.72 : 0.1;
    player.thirst = Math.max(0, player.thirst - thirstRate * dt);
    player.hunger = Math.max(0, player.hunger - 0.075 * dt);
    if (player.sprinting) player.stamina = Math.max(0, player.stamina - 20 * dt);
    else player.stamina = Math.min(100, player.stamina + 16 * dt);
    if (player.hunger <= 0 || player.thirst <= 0) {
      player.faint += dt;
      if (player.faint > 2.4) doFaint();
    } else player.faint = 0;
    STONES.forEach(reachStone);
    if (!flags.moleTalk && flags.drank && player.x > 4860 && phase === 'play') {
      flags.moleTalk = true;
      say([{ who: 'name_earth', k: 'dlg_earth4' }]);
    }
    if (flags.questDone && player.x > 21460 && player.onGround && phase === 'play') {
      phase = 'ending';
      endingT = 0;
      player.vx = 0;
      saveGame();
    }
    if (player.invuln > 0) player.invuln -= dt;
    maybeTips();
    if ((player.z == null ? 0.55 : player.z) !== 0.55) {
      player.alt = bodyAlt(player);
      player.z = 0.55;
      plant(player);
    }
  }
  if (player.drinkT <= 0 || earth.mode === 'enter') updateEarth(dt);
  else updatePose(earth, dt);
  updateDune(dt);
  updateFox(dt);
  prey.forEach(p => {
    if (!flags.mole && !p.tutorial) return;
    if (p.kind === 'mole') updateMole(p, dt);
    else if (p.kind === 'mouse') updateMouse(p, dt);
    else if (p.kind === 'vole') updateVole(p, dt);
    else if (p.kind === 'rabbit') updateRabbit(p, dt);
    else if (p.kind === 'sparrow') updateSparrow(p, dt);
  });
  setObjective();
  updatePose(player, dt);
}

const BEATS = [
  { len: 3.3, cap: 'intro1' },
  { len: 3.5, cap: 'intro2' },
  { len: 4.6, cap: 'intro3' },
  { len: 4.3, cap: 'intro4' },
  { len: 3.5, cap: 'intro5' }
];
function updateIntro(dt) {
  intro.t += dt;
  const beat = BEATS[intro.beat];
  if (!beat) return;
  if (intro.hurry) { intro.t = beat.len; intro.hurry = false; }
  const u = intro.t / beat.len;
  syncStage();
  updatePose(stageKit, dt);
  updatePose(stageMom, dt);
  if (intro.beat === 2 && Math.floor(intro.t * 2) !== Math.floor((intro.t - dt) * 2)) sfxRumble();
  shake = intro.beat === 2 || intro.beat === 3 ? 5 + u * 6 : 0;
  if (intro.t >= beat.len) {
    intro.beat++;
    intro.t = 0;
    if (intro.beat === 3) sfxMeow();
    if (intro.beat >= BEATS.length) {
      shake = 0;
      phase = 'play';
      player.x = 170;
      player.y = planeY(170, player.z) - player.h;
      player.thirst = 84;
      player.hunger = 88;
      cp = { x: 180 };
      flags.stones[210] = true;
      saveGame();
      showBanner('obj_water');
    }
  }
}
function updateAmbient(dt) {
  time += dt;
  wind.next -= dt;
  if (wind.next <= 0) {
    wind.dir *= -1;
    wind.next = 13 + Math.random() * 6;
    wind.gust = 1;
    noiseHit(0.4, 0.04, 240);
  }
  wind.gust = Math.max(0, wind.gust - dt);
  streaks.forEach(s => {
    s.x += wind.dir * (120 + wind.gust * 220) * s.sp * dt;
    if (s.x > WORLD_W + 200) s.x = -200;
    if (s.x < -200) s.x = WORLD_W + 200;
  });
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age += dt;
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 20 * dt;
    if (p.age >= p.life) particles.splice(i, 1);
  }
  floats.forEach(f => { f.t += dt; f.y -= 18 * dt; });
  for (let i = floats.length - 1; i >= 0; i--) if (floats[i].t > 1.1) floats.splice(i, 1);
  if (banner) { banner.t += dt; if (banner.t > 6.5) banner = null; }
  if (windGain) windGain.gain.value = phase === 'intro' ? 0.02 : 0.035;
  Object.keys(flash).forEach(k => { flash[k] = Math.max(0, flash[k] - dt * 1.8); });
}

function update(dt) {
  if (langOpen) { updateAmbient(dt); if (player) updatePose(player, dt); return; }
  if (phase === 'title') { updateAmbient(dt); updatePose(player, dt); return; }
  if (phase === 'intro') { updateIntro(dt); updateAmbient(dt); return; }
  if (phase === 'dialogue') {
    if (dlg) {
      const full = t(dlg.lines[dlg.i].k);
      if (dlg.lang !== lang) { dlg.lang = lang; dlg.n = full.length; }
      else dlg.n += 26 * dt;
      if (just.KeyE || just.Enter || just.Space) advanceDlg();
    }
    updateAmbient(dt);
    updatePose(player, dt); updatePose(earth, dt); updatePose(dune, dt);
    return;
  }
  if (phase === 'tutorial') {
    if (just.KeyE || just.Enter) { phase = 'play'; earth.mode = 'lead'; }
    updateAmbient(dt); updatePose(player, dt); updatePose(earth, dt); updatePose(dune, dt);
    return;
  }
  if (phase === 'ending') {
    endingT += dt;
    player.anim = 'sit';
    player.vx = 0;
    updatePose(player, dt);
    updateAmbient(dt);
    return;
  }
  if (phase === 'faint') {
    faintT += dt;
    updateAmbient(dt);
    if (faintT > 2.1) respawn();
    return;
  }
  updateAmbient(dt);
  updatePlay(dt);
}

function worldBg() {
  const ax = camX + VW * 0.5;
  let skyTop = '#fff6e6', skyA = '#f6c896', skyB = '#e89262', skyC = '#d26e4e', skyD = '#c45c42';
  if (ax > 18640) { skyTop = '#e7eef2'; skyA = '#d5d0c4'; skyB = '#c4b6a4'; skyC = '#b09a86'; skyD = '#9a8878'; }
  else if (ax > 15040) { skyTop = '#f4f0d2'; skyA = '#e4d392'; skyB = '#c9b86a'; skyC = '#a89858'; skyD = '#8c8648'; }
  else if (ax > 11840) { skyTop = '#f8e7cc'; skyA = '#e8c59a'; skyB = '#d2a878'; skyC = '#c09068'; skyD = '#a87858'; }
  const sky = ctx.createLinearGradient(0, camY - padY(), 0, camY + VH + padY());
  sky.addColorStop(0, skyTop);
  sky.addColorStop(0.22, skyA);
  sky.addColorStop(0.55, skyB);
  sky.addColorStop(0.82, skyC);
  sky.addColorStop(1, skyD);
  ctx.fillStyle = sky;
  ctx.fillRect(camX - padX() - 40, camY - padY() - 40, VW + padX() * 2 + 80, VH + padY() * 2 + 80);
  const sunX = camX + 980, sunY = camY + 92;
  const glow = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 340);
  glow.addColorStop(0, 'rgba(255,248,220,0.95)');
  glow.addColorStop(0.35, 'rgba(255,196,120,0.28)');
  glow.addColorStop(1, 'rgba(255,160,80,0)');
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(sunX, sunY, 340, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff4d2';
  ctx.beginPath(); ctx.arc(sunX, sunY, 28, 0, 7); ctx.fill();

  drawMountainRange();
  const haze = ctx.createLinearGradient(0, camY + VH * 0.34, 0, camY + VH * 0.62);
  haze.addColorStop(0, 'rgba(244, 196, 150, 0)');
  haze.addColorStop(1, 'rgba(214, 142, 102, 0.42)');
  ctx.fillStyle = haze;
  ctx.fillRect(camX - padX() - 40, camY + VH * 0.34, VW + padX() * 2 + 80, VH * 0.3);

  clouds.forEach((c, i) => {
    const x = camX * c.p + c.x;
    if (x < camX - 180 || x > camX + VW + 180) return;
    ctx.save();
    ctx.translate(x, camY + c.y);
    beginMesh(0, 0, -110);
    addEllipsoid(0, 0, 0, c.s, c.s * 0.42, c.s * 0.7, [255, 244, 230], 6, 3);
    addEllipsoid(c.s * 0.55, 3, 6, c.s * 0.62, c.s * 0.32, c.s * 0.5, [255, 250, 242], 5, 3);
    paintMesh();
    ctx.restore();
  });
}
function roadPoint(wx, lz, ly) {
  const p = project3({ x: 0, y: ly || 0, z: lz });
  return { x: wx + p.x, y: terrainY(wx) + p.y };
}
function fillQuad(a, b, c, d, rgb) {
  ctx.fillStyle = 'rgb(' + (rgb[0] | 0) + ',' + (rgb[1] | 0) + ',' + (rgb[2] | 0) + ')';
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(d.x, d.y);
  ctx.closePath();
  ctx.fill();
}
function groundBiome(x) {
  if (x > 18640) return [158, 148, 136];
  if (x > 16840) return [176, 148, 78];
  if (x > 15040) return [154, 164, 74];
  if (x > 13640) return [118, 156, 64];
  if (x > DESERT_END) return [168, 150, 104];
  if (x > 4700) return [204, 168, 112];
  return [196, 164, 108];
}
function fillRoad(x0, x1, z0, z1, rgb) {
  ctx.beginPath();
  let q = roadPoint(x0, z0);
  ctx.moveTo(q.x, q.y);
  for (let u = x0 + 32; u <= x1; u += 32) {
    q = roadPoint(u, z0);
    ctx.lineTo(q.x, q.y);
  }
  q = roadPoint(x1, z0);
  ctx.lineTo(q.x, q.y);
  for (let u = x1; u >= x0; u -= 32) {
    q = roadPoint(u, z1);
    ctx.lineTo(q.x, q.y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgb(' + (rgb[0] | 0) + ',' + (rgb[1] | 0) + ',' + (rgb[2] | 0) + ')';
  ctx.fill();
}
function groundPoint(wx, wy, z) {
  const p = project3({ x: 0, y: 0, z: z });
  return { x: wx + p.x, y: wy + p.y };
}
function fillTri(a, b, c, rgb) {
  ctx.fillStyle = 'rgb(' + (rgb[0] | 0) + ',' + (rgb[1] | 0) + ',' + (rgb[2] | 0) + ')';
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.closePath();
  ctx.fill();
}
function drawSolidGround(samples, rgbAt) {
  if (samples.length < 2) return;
  const mid = samples[samples.length >> 1];
  const base = rgbAt(mid.x);
  const far = base.map(v => Math.min(255, v * 1.06 + 22));
  const near = [base[0] * 0.9, base[1] * 0.82, base[2] * 0.7];
  const path = [base[0] * 0.86, base[1] * 0.74, base[2] * 0.56];
  const rim = [base[0] * 0.78, base[1] * 0.6, base[2] * 0.42];
  const lip = [base[0] * 0.55, base[1] * 0.4, base[2] * 0.28];
  const deepRock = [base[0] * 0.4, base[1] * 0.28, base[2] * 0.2];
  const rows = [-200, -110, -30, 40, 130, 220];
  const rowCol = [far, base, path, base, near];
  const grid = samples.map((s, i) => rows.map((z, k) => {
    const flat = Math.min(1, Math.abs(z - 5) / 110);
    const edge = k === rows.length - 1;
    const n = rnd(Math.round(s.x / 7) * 0.913 + k * 17.31) - 0.5;
    const bump = edge ? n * 4 : n * 18 * flat;
    return ground3(s.x, s.y - bump, z);
  }));
  for (let k = 0; k < rows.length - 1; k++) {
    for (let i = 0; i < samples.length - 1; i++) {
      const a = grid[i][k], b = grid[i + 1][k], c = grid[i + 1][k + 1], d = grid[i][k + 1];
      const v = 1 + (rnd(i * 3.1 + Math.round(samples[i].x / 9) + k * 7.7) - 0.5) * 0.08;
      const col = shade3(rowCol[k], v);
      groundTri(a, b, c, col);
      groundTri(a, c, d, col);
    }
  }
  const drops = [0, 70, 160, 290 + padY() + 400];
  const cliff = samples.map((s, i) => drops.map((dy, k) => {
    const top = grid[i][rows.length - 1];
    if (k === 0) return top;
    const n = rnd(Math.round(s.x / 7) * 1.37 + k * 5.1) - 0.5;
    const jx = k < drops.length - 1 ? n * 22 : 0;
    const bulge = k < drops.length - 1 ? 12 + n * 26 : 0;
    return ground3(s.x + jx, top.cy + dy, 220 + bulge);
  }));
  const strata = [rim, lip, deepRock];
  for (let k = 0; k < drops.length - 1; k++) {
    for (let i = 0; i < samples.length - 1; i++) {
      const a = cliff[i][k], b = cliff[i + 1][k], c = cliff[i + 1][k + 1], d = cliff[i][k + 1];
      groundTri(a, b, c, strata[k]);
      groundTri(a, c, d, strata[k]);
    }
  }
}
function ground3(x, cy, z) {
  const p = project3({ x: 0, y: 0, z: z });
  return { sx: x + p.x, sy: cy + p.y, x: x, y: -cy, z: z, cy: cy };
}
function shade3(rgb, k) { return [rgb[0] * k, rgb[1] * k, rgb[2] * k]; }
function groundTri(a, b, c, rgb) {
  const ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z;
  const vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const ln = Math.hypot(nx, ny, nz) || 1;
  nx /= ln; ny /= ln; nz /= ln;
  if (ny * CAM_SP + nz * CAM_CP < 0) { nx = -nx; ny = -ny; nz = -nz; }
  const nd = Math.max(0, nx * CAM_LIGHT.x + ny * CAM_LIGHT.y + nz * CAM_LIGHT.z);
  const k = 0.42 + 0.68 * nd;
  const col = 'rgb(' + Math.min(255, rgb[0] * k) + ',' + Math.min(255, rgb[1] * k) + ',' + Math.min(255, rgb[2] * k) + ')';
  ctx.fillStyle = col;
  ctx.strokeStyle = col;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(a.sx, a.sy);
  ctx.lineTo(b.sx, b.sy);
  ctx.lineTo(c.sx, c.sy);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
function addRidge(rx, ry, depth, face, cap, seed) {
  const steps = 6;
  const base = [], mid = [], top = [];
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const edge = i === 0 || i === steps;
    const h = edge ? 0 : ry * Math.pow(Math.sin(u * Math.PI), 0.8) * (0.55 + rnd(seed + i * 5) * 0.6);
    const x = -rx + u * rx * 2;
    const jx = edge ? 0 : (rnd(seed + i * 3) - 0.5) * rx * 0.2;
    base.push([x, 0, depth * 0.5]);
    mid.push([x + jx, h * 0.52, depth * (0.12 + rnd(seed + i * 7) * 0.32)]);
    top.push([x + jx * 0.5, h, -depth * 0.25]);
  }
  for (let i = 0; i < steps; i++) {
    flatTri(base[i], base[i + 1], mid[i + 1], face);
    flatTri(base[i], mid[i + 1], mid[i], face);
    flatTri(mid[i], mid[i + 1], top[i + 1], cap);
    flatTri(mid[i], top[i + 1], top[i], cap);
  }
}
function flatTri(a, b, c, rgb) {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const ln = Math.hypot(nx, ny, nz) || 1;
  nx /= ln; ny /= ln; nz /= ln;
  if (nx * CAM_VIEW.x + ny * CAM_VIEW.y + nz * CAM_VIEW.z >= 0) {
    const t = b; b = c; c = t;
    nx = -nx; ny = -ny; nz = -nz;
  }
  addTri(vtx(a[0], a[1], a[2], nx, ny, nz), vtx(b[0], b[1], b[2], nx, ny, nz), vtx(c[0], c[1], c[2], nx, ny, nz), rgb);
}
function drawMountainRange() {
  const layers = [
    { z: -260, gap: 520, ry: 190, depth: 120, face: [214, 170, 142], cap: [236, 206, 176] },
    { z: -150, gap: 340, ry: 130, depth: 90, face: [176, 122, 90], cap: [206, 160, 120] },
    { z: -70, gap: 260, ry: 86, depth: 64, face: [142, 92, 64], cap: [176, 128, 92] }
  ];
  layers.forEach((layer, li) => {
    const start = Math.floor((camX - padX() - 560) / layer.gap) * layer.gap;
    for (let x = start; x < camX + VW + padX() + 560; x += layer.gap) {
      const n = rnd((Math.floor(x / layer.gap) + li * 13) * 4);
      const ry = layer.ry * (0.62 + n * 0.55);
      const rx = layer.gap * (0.46 + n * 0.08);
      ctx.save();
      ctx.translate(x + layer.gap * 0.42, terrainY(x));
      beginMesh(0, 0, layer.z);
      addRidge(rx, ry, layer.depth, layer.face, layer.cap, Math.floor(x / layer.gap) + li * 40);
      paintMesh();
      ctx.restore();
    }
  });
}
function drawTerrain() {
  const w = 120;
  const x0 = Math.floor((camX - padX() - 300) / w) * w;
  const x1 = camX + VW + padX() + w + 300;
  const samples = [];
  for (let x = x0; x <= x1; x += w) samples.push({ x: x, y: terrainY(x) });
  drawSolidGround(samples, groundBiome);
}
function laneColor(u) {
  const stops = [
    [0, [228, 214, 178]],
    [0.28, [168, 176, 86]],
    [0.55, [122, 148, 62]],
    [0.78, [108, 92, 58]],
    [1, [74, 54, 38]]
  ];
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 1; i < stops.length; i++) {
    if (u <= stops[i][0]) { a = stops[i - 1]; b = stops[i]; break; }
  }
  const t = (u - a[0]) / Math.max(0.001, b[0] - a[0]);
  const c = a[1].map((v, i) => Math.round(v + (b[1][i] - v) * t));
  return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
}
function paintPond() {
  const cx = 4120;
  ctx.save();
  ctx.translate(cx, terrainY(cx));
  beginMesh();
  const seg = 20;
  const ring = (rad, rz, y, wave) => {
    const pts = [];
    for (let i = 0; i <= seg; i++) {
      const a = i / seg * Math.PI * 2;
      const wob = wave * Math.sin(time * 2.6 + i * 1.3);
      pts.push(vtx(Math.cos(a) * rad, y + wob, Math.sin(a) * rz, 0, 1, 0));
    }
    return pts;
  };
  const mud = ring(250, 108, 1, 0);
  const bank = ring(214, 90, 8, 0);
  const shore = ring(176, 72, 3, 0);
  const water = ring(168, 66, 5, 0.8);
  const inner = ring(90, 34, 6.5, 1.2);
  for (let i = 0; i < seg; i++) {
    addTri(mud[i + 1], mud[i], bank[i], [122, 86, 52]);
    addTri(mud[i + 1], bank[i], bank[i + 1], [146, 104, 64]);
    addTri(bank[i + 1], bank[i], shore[i], [92, 138, 118]);
    addTri(bank[i + 1], shore[i], shore[i + 1], [78, 126, 122]);
    addTri(water[i], water[i + 1], shore[i], [58, 126, 142]);
    addTri(shore[i + 1], shore[i], water[i + 1], [72, 150, 164]);
    addTri(inner[i], inner[i + 1], water[i], [126, 198, 210]);
    addTri(water[i + 1], water[i], inner[i + 1], [168, 220, 226]);
  }
  const hub = vtx(0, 7, 0, 0, 1, 0);
  for (let i = 0; i < seg; i++) addTri(inner[i], hub, inner[i + 1], [198, 236, 240]);
  paintMesh();
  ctx.lineWidth = 2.6;
  [[0, 0], [-60, 14], [70, -12]].forEach((c, ci) => {
    for (let k = 0; k < 3; k++) {
      const u = (time * 0.42 + k / 3 + ci * 0.37) % 1;
      const r = 14 + u * (ci === 0 ? 120 : 60);
      ctx.strokeStyle = 'rgba(240,252,255,' + (0.75 * (1 - u)) + ')';
      ctx.beginPath();
      for (let i = 0; i <= 28; i++) {
        const a = i / 28 * Math.PI * 2;
        const px = c[0] + Math.cos(a) * r;
        const pz = c[1] + Math.sin(a) * r * 0.42;
        if ((px * px) / (160 * 160) + (pz * pz) / (62 * 62) > 1) { ctx.stroke(); ctx.beginPath(); continue; }
        const p = project3({ x: px, y: 7.5, z: pz });
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
  });
  ctx.restore();
}
function paintTracks() {
  ctx.strokeStyle = 'rgba(48,30,20,0.55)';
  ctx.lineWidth = 3;
  for (let x = 20840; x < 22440; x += 34) {
    if (x < camX - 40 || x > camX + VW + 40) continue;
    const y = terrainY(x);
    [-16, 16].forEach(z => {
      const a = project3({ x: 0, y: 1, z: z });
      const b = project3({ x: 18, y: 1, z: z - 6 });
      ctx.beginPath();
      ctx.moveTo(x + a.x, y + a.y);
      ctx.lineTo(x + b.x, y + b.y);
      ctx.stroke();
    });
  }
}
function propLane(i) {
  const k = i % 6;
  if (k === 0) return -55 - rnd(i) * 40;
  if (k === 3) return 70 + rnd(i + 2) * 36;
  return (rnd(i + 7) - 0.5) * 70;
}
function addDeadTree(grey) {
  const bark = grey ? [128, 122, 114] : [120, 86, 56];
  const barkD = grey ? [96, 92, 86] : [88, 62, 40];
  const leaf = grey ? [138, 146, 112] : [134, 132, 66];
  const leaf2 = grey ? [166, 170, 138] : [164, 156, 82];
  addEllipsoid(0, 3, 0, 13, 6, 12, barkD, 9, 4);
  addTube(0, 0, 0, -3, 42, 2, 8, 5.4, bark, 10);
  addEllipsoid(-3, 42, 2, 5.8, 5.8, 5.8, bark, 8, 4);
  addTube(-3, 42, 2, 4, 72, -2, 5.4, 3.6, bark, 10);
  addEllipsoid(4, 72, -2, 3.9, 3.9, 3.9, bark, 7, 4);
  addTube(4, 72, -2, 28, 90, 12, 3.2, 1.7, barkD, 8);
  addTube(4, 72, -2, -24, 92, -14, 3.2, 1.7, bark, 8);
  addTube(4, 72, -2, 6, 102, 16, 2.8, 1.5, barkD, 8);
  addTube(-3, 42, 2, -22, 60, 14, 2.8, 1.3, bark, 7);
  addEllipsoid(28, 94, 12, 17, 6.5, 15, leaf, 9, 4);
  addEllipsoid(-24, 96, -14, 19, 7, 16, leaf2, 9, 4);
  addEllipsoid(6, 106, 16, 16, 6.5, 14, leaf, 9, 4);
  addEllipsoid(0, 100, -4, 22, 7.5, 17, leaf2, 9, 4);
  addEllipsoid(-22, 63, 14, 10, 4.5, 9, leaf, 8, 4);
}
function addTreeShape(trunk, leaf, leaf2) {
  addCone(0, 0, 0, 9, 12, 8, trunk, 7);
  addTube(0, 0, 0, 1, 60, 0, 5.6, 3.4, trunk, 8);
  addTube(1, 44, 0, 14, 60, 6, 2, 1, trunk, 5);
  addTube(0, 48, 0, -12, 62, -5, 2, 1, trunk, 5);
  addEllipsoid(0, 66, 0, 24, 14, 20, leaf, 9, 5);
  addEllipsoid(-12, 74, 9, 14, 12, 12, leaf2, 8, 4);
  addEllipsoid(13, 76, -7, 14, 12, 12, leaf, 8, 4);
  addEllipsoid(6, 82, 11, 12, 10, 10, leaf2, 7, 4);
  addEllipsoid(-6, 86, -8, 12, 10, 10, leaf, 7, 4);
  addEllipsoid(0, 96, 0, 10, 9, 9, leaf2, 7, 4);
}
function paintScenery(i) {
  const x = i * 240 + 120;
  const lane = propLane(i);
  const y = terrainY(x);
  const area = x < DESERT_END ? 0 : x < 13640 ? 1 : x < 15040 ? 2 : x < 16840 ? 3 : x < 18640 ? 4 : 5;
  if (Math.abs(terrainY(x) - terrainY(x + 90)) > 18) return;
  let kind = null;
  if (area === 0 || area === 3 || area === 5) kind = i % 3 === 0 ? 'dry' : null;
  else if (area === 1) kind = 'fence';
  else if (area === 2) kind = i % 2 === 0 ? 'tree' : 'bush';
  else if (area === 4) kind = 'tree';
  if (!kind) return;
  const big = kind === 'dry' || kind === 'tree';
  const scale = big ? 2.35 : 1.7;
  ctx.save();
  ctx.translate(x, y);
  const sh = project3({ x: 0, y: 0, z: lane });
  ctx.fillStyle = 'rgba(86, 48, 28, 0.28)';
  ctx.beginPath();
  ctx.ellipse(sh.x + 8, sh.y + 2, big ? 54 : 24, big ? 12 : 7, 0, 0, 7);
  ctx.fill();
  ctx.scale(scale, scale);
  beginMesh(0, 0, lane / scale);
  if (kind === 'fence') {
    addRoundBox(0, 16, 0, 4.5, 16, 4.5, [132, 102, 74], 2.2);
    addBox(0, 31, 0, 18, 2.2, 2.6, [168, 136, 98]);
    addBox(0, 14, 0, 15, 2, 2.4, [168, 136, 98]);
  } else if (kind === 'bush') {
    addEllipsoid(0, 10, 0, 16, 9, 13, [64, 138, 58], 8, 5);
    addEllipsoid(-7, 14, 3, 9, 7, 7, [118, 176, 70], 7, 4);
  } else if (kind === 'tree') {
    addTreeShape([96, 68, 42], [58, 132, 52], [96, 166, 68]);
  } else {
    addDeadTree(area === 5);
  }
  paintMesh();
  ctx.restore();
}
function drawDepthTop(x, w, z, zr, baseY, face, lip, top) {
  const z0 = z - zr;
  const z1 = z + zr;
  ctx.beginPath();
  ctx.moveTo(x, shelfY(baseY, z0));
  ctx.lineTo(x + w, shelfY(baseY, z0));
  ctx.lineTo(x + w, shelfY(baseY, z1) + lip);
  ctx.lineTo(x, shelfY(baseY, z1) + lip);
  ctx.closePath();
  ctx.fillStyle = face;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, shelfY(baseY, z0));
  ctx.lineTo(x + w, shelfY(baseY, z0));
  ctx.lineTo(x + w, shelfY(baseY, z1));
  ctx.lineTo(x, shelfY(baseY, z1));
  ctx.closePath();
  ctx.fillStyle = top || face;
  ctx.fill();
}
function drawPlat(p) {
  const top = shelfY(p.y, p.z || 0.55);
  ctx.save();
  ctx.translate(p.x + p.w * 0.5, top);
  beginMesh();
  addRoundBox(0, -28, 0, p.w * 0.5, 28, 36, [148, 114, 82], 8);
  addRoundBox(0, 3, 0, p.w * 0.44, 4, 26, [236, 214, 178], 3);
  paintMesh();
  ctx.restore();
}
function drawBlock(b) {
  if (b.kind === 'wall') {
    const top = shelfY(b.y, 0.55);
    ctx.save();
    ctx.translate(b.x + b.w * 0.5, top);
    beginMesh();
    addRoundBox(0, -220, 0, b.w * 0.48, 220, 46, [108, 96, 86], 14);
    addRoundBox(0, 12, 0, b.w * 0.52, 16, 56, [190, 174, 152], 8);
    paintMesh();
    ctx.restore();
    return;
  }
  const z = b.z || 0.55;
  const top = shelfY(b.y, z);
  ctx.save();
  ctx.translate(b.x + b.w * 0.5, top + (b.kind === 'log' ? 12 : 14));
  beginMesh();
  if (b.kind === 'log') {
    addTube(-b.w * 0.42, 2, 0, b.w * 0.42, 2, 0, 18, 16, [132, 82, 48], 14);
    addEllipsoid(-b.w * 0.42, 2, 0, 8, 18, 18, [112, 68, 40], 10, 8);
    addEllipsoid(b.w * 0.42, 2, 0, 7, 16, 16, [148, 96, 58], 10, 8);
  } else addRoundBox(0, 0, 0, b.w * 0.5, 16, 20, [124, 132, 138], 5);
  paintMesh();
  ctx.restore();
}
function drawPounceGuide() {
  if (phase !== 'play' || !player || player.charge < 0.06 || !player.onGround || player.pouncing) return;
  const pts = pounceArc(player.charge);
  if (pts.length < 2) return;
  const start = pts[0];
  const end = pts[pts.length - 1];
  ctx.save();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 236, 186, 0.92)';
  ctx.fillStyle = 'rgba(255, 244, 210, 0.95)';
  ctx.setLineDash([7, 6]);
  ctx.beginPath();
  pts.forEach((p, i) => { if (i) ctx.lineTo(p.x, p.y - 2); else ctx.moveTo(p.x, p.y - 2); });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.arc(start.x, start.y - 2, 5, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(end.x, end.y - 2, 11, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.arc(end.x, end.y - 2, 4, 0, 7); ctx.fill();
  ctx.restore();
}
function drawPawSlash() {
  if (!player || !player.pawT) return;
  const dir = player.facing || 1;
  const u = 1 - player.pawT / 0.18;
  const cx = player.x + player.w * 0.5 + dir * (16 + u * 34);
  const cy = player.y + player.h * 0.42;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = 'rgba(255, 248, 230,' + (0.95 - u * 0.8) + ')';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    const a0 = dir > 0 ? -1.15 : Math.PI - 1.15;
    const a1 = dir > 0 ? 1.05 : Math.PI + 1.05;
    ctx.arc(0, i * 7, 14 + u * 12, a0, a1);
    ctx.stroke();
  }
  ctx.restore();
}
function drawFront() {}
function drawActors() {
  const list = [];
  const propStep = 240;
  const prop0 = Math.floor((camX - padX() - 300) / propStep);
  const propN = Math.ceil((VW + padX() * 2 + 700) / propStep);
  for (let i = prop0; i < prop0 + propN; i++) {
    if (i < 0) continue;
    const x = i * propStep + 120;
    if (x > WORLD_W) continue;
    const lane = propLane(i);
    list.push({ sortY: terrainY(x) + lane * 0.35, z: 0.55 + lane / 980, draw: () => paintScenery(i) });
  }
  PLATS.forEach(p => {
    if (p.x > camX - 200 && p.x < camX + VW + 200) list.push({ z: (p.z || 0.55) - 0.002, draw: () => drawPlat(p) });
  });
  BLOCKS.forEach(b => {
    if (b.x + b.w > camX - 40 && b.x < camX + VW + 40) list.push({ z: b.kind === 'wall' ? 0.99 : (b.z || 0.55) - 0.002, draw: () => drawBlock(b) });
  });
  if (camX > 3860 - VW && camX < 5000) list.push({ z: 0.5, draw: paintPond });
  if (camX > 20040) list.push({ z: 0.54, draw: paintTracks });
  prey.forEach(p => {
    if (p.x < camX - 360 || p.x > camX + VW + 360) return;
    if (p.kind === 'mole') list.push({ sortY: terrainY(p.mound) + 2, z: 0.55, draw: () => drawMound(p) });
    if (flags.drank && p.kind === 'rabbit') list.push({ z: (p.z == null ? 0.55 : p.z) - 0.02, draw: () => {
      ctx.save();
      ctx.translate(p.burrow, planeY(p.burrow, p.z));
      beginMesh();
      addEllipsoid(0, 2, 0, 18, 3.2, 12, [62, 44, 34], 8, 4);
      addEllipsoid(0, 3, 0, 7, 2, 5, [24, 16, 12], 6, 3);
      paintMesh();
      ctx.restore();
    } });
  });
  const nearCam = x => x > camX - 420 && x < camX + VW + 420;
  if (!earth.hidden && nearCam(earth.x)) list.push(earth);
  if (!dune.hidden && nearCam(dune.x)) list.push(dune);
  if (!fox.hidden && nearCam(fox.x)) list.push(fox);
  prey.forEach(p => { if (!p.hidden && nearCam(p.x)) list.push(p); });
  list.push(player);
  const layerOf = e => e.sortY != null ? e.sortY : (e.y != null ? e.y + (e.h || 0) : 0);
  list.sort((a, b) => layerOf(a) - layerOf(b) || ((a.z == null ? 0.55 : a.z) - (b.z == null ? 0.55 : b.z)));
  list.forEach(e => {
    if (e.draw) e.draw();
    else if (e.kind) drawPrey(e);
    else drawCat(e);
  });
  particles.forEach(p => {
    ctx.globalAlpha = clamp(1 - p.age / p.life, 0, 1);
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill();
    ctx.globalAlpha = 1;
  });
  streaks.forEach(s => {
    ctx.strokeStyle = 'rgba(255,244,230,0.28)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - wind.dir * s.w, s.y + 2);
    ctx.stroke();
  });
  floats.forEach(f => {
    ctx.globalAlpha = clamp(1 - f.t / 1.1, 0, 1);
    ctx.fillStyle = f.color;
    ctx.font = '16px ' + FONT;
    ctx.textAlign = 'center';
    ctx.fillText(f.text, f.x, f.y);
    ctx.globalAlpha = 1;
  });
  const gx = goalX();
  const ax = clamp(gx, camX + 36, camX + VW - 36);
  const bob = Math.sin(time * 4) * 6;
  ctx.fillStyle = '#fff4d2';
  ctx.beginPath();
  ctx.moveTo(ax, camY + 78 + bob);
  ctx.lineTo(ax - 8, camY + 66 + bob);
  ctx.lineTo(ax + 8, camY + 66 + bob);
  ctx.fill();
  if (Math.abs(gx - ax) > 20) {
    ctx.beginPath();
    ctx.moveTo(ax + Math.sign(gx - ax) * 10, camY + 72);
    ctx.lineTo(ax + Math.sign(gx - ax) * 18, camY + 66);
    ctx.lineTo(ax + Math.sign(gx - ax) * 10, camY + 60);
    ctx.fill();
  }
}

function setUI() { ctx.setTransform(scale, 0, 0, scale, offX, offY); }
function padX() { return Math.max(0, offX / scale) + 2; }
function padY() { return Math.max(0, offY / scale) + 2; }
function fillScreen() { ctx.fillRect(-padX(), -padY(), VW + padX() * 2, VH + padY() * 2); }
function setWorld() {
  const sx = (Math.random() - 0.5) * shake;
  const sy = (Math.random() - 0.5) * shake;
  ctx.setTransform(scale, 0, 0, scale, offX + sx * scale, offY + sy * scale);
  ctx.translate(-camX, -camY);
}
function followCam(x, y) {
  const tx = clamp(x - VW * 0.38, 0, WORLD_W - VW);
  const ty = clamp(y - VH * 0.62, -40, 80);
  camX = lerp(camX, tx, 0.08);
  camY = lerp(camY, ty, 0.08);
}

function textLines(text, maxW) {
  ctx.save();
  ctx.direction = isRtl() ? 'rtl' : 'ltr';
  const cjk = (text.match(/[\u3000-\u9fff\uac00-\ud7af\u0e00-\u0e7f]/g) || []).length > text.length * 0.25;
  const lines = [];
  if (cjk || !text.includes(' ')) {
    let cur = '';
    for (const ch of text) {
      if (cur && ctx.measureText(cur + ch).width > maxW) { lines.push(cur); cur = ch; }
      else cur += ch;
    }
    if (cur) lines.push(cur);
    ctx.restore();
    return lines;
  }
  let cur = '';
  text.split(' ').forEach(w => {
    const trial = cur ? cur + ' ' + w : w;
    if (cur && ctx.measureText(trial).width > maxW) {
      lines.push(cur);
      cur = w;
    } else cur = trial;
  });
  if (cur) lines.push(cur);
  const out = [];
  lines.forEach(line => {
    if (ctx.measureText(line).width <= maxW) { out.push(line); return; }
    let c = '';
    for (const ch of line) {
      if (c && ctx.measureText(c + ch).width > maxW) { out.push(c); c = ch; }
      else c += ch;
    }
    if (c) out.push(c);
  });
  ctx.restore();
  return out;
}
function drawText(text, x, y, opt) {
  opt = opt || {};
  ctx.save();
  const rtl = opt.rtl != null ? opt.rtl : isRtl();
  ctx.direction = rtl ? 'rtl' : 'ltr';
  ctx.textAlign = opt.align || (rtl ? 'right' : 'left');
  ctx.textBaseline = opt.base || 'alphabetic';
  ctx.fillStyle = opt.color || '#fff8ef';
  ctx.font = (opt.size || 16) + 'px ' + FONT;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function globeRect() { return { x: VW - 58, y: VH - 58, w: 44, h: 44 }; }
function panelRect() { return { x: VW - 336, y: 78, w: 300, h: 520 }; }
function mobileButtons() {
  if (!showMobile()) return [];
  const y = VH - 214;
  return [
    { id: 'left', x: 28, y: y + 78, w: 74, h: 74 },
    { id: 'right', x: 116, y: y + 78, w: 74, h: 74 },
    { id: 'jump', x: VW - 268, y: y, w: 68, h: 68 },
    { id: 'stalk', x: VW - 188, y: y, w: 68, h: 68 },
    { id: 'pounce', x: VW - 268, y: y + 80, w: 68, h: 68 },
    { id: 'paw', x: VW - 348, y: y + 80, w: 68, h: 68 },
    { id: 'interact', x: VW - 188, y: y + 80, w: 68, h: 68 },
    { id: 'emote', x: VW - 348, y: y, w: 68, h: 68 }
  ];
}
function beginRect() { return { x: VW / 2 - 110, y: 338, w: 220, h: 52 }; }
function contRect() { return { x: VW / 2 - 110, y: 402, w: 220, h: 46 }; }
function tutButton() { return { x: VW / 2 - 110, y: 560, w: 220, h: 48 }; }

function drawGlobe() {
  const r = globeRect();
  ctx.save();
  ctx.translate(r.x + 22, r.y + 22);
  if (langOpen) {
    ctx.fillStyle = 'rgba(120,190,255,0.35)';
    ctx.beginPath(); ctx.arc(0, 0, 26, 0, 7); ctx.fill();
  }
  ctx.fillStyle = 'rgba(18,16,14,0.72)';
  ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fill();
  ctx.strokeStyle = '#d7ecff';
  ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 5, 11, 0, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-11, 0); ctx.lineTo(11, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -4, 11, 4, 0, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 4, 11, 4, 0, 0, Math.PI); ctx.stroke();
  ctx.restore();
}
function drawLangPanel() {
  if (!langOpen) return;
  const p = panelRect();
  ctx.fillStyle = 'rgba(16,14,12,0.45)';
  fillScreen();
  ctx.fillStyle = 'rgba(28,24,20,0.94)';
  roundRect(p.x, p.y, p.w, p.h, 16); ctx.fill();
  drawText(t('language'), p.x + (isRtl() ? p.w - 18 : 18), p.y + 32, { size: 18, color: '#f6e7cf' });
  const viewY = p.y + 52;
  const viewH = p.h - 68;
  ctx.save();
  ctx.beginPath(); ctx.rect(p.x + 8, viewY, p.w - 16, viewH); ctx.clip();
  LANGS.forEach((L, i) => {
    const y = viewY + i * 36 - langScroll;
    if (y < viewY - 36 || y > viewY + viewH) return;
    const on = L.id === lang;
    ctx.fillStyle = on ? 'rgba(232, 193, 94, 0.28)' : 'rgba(255,255,255,0.04)';
    roundRect(p.x + 16, y, p.w - 32, 32, 8); ctx.fill();
    drawText(L.name, L.rtl ? p.x + p.w - 52 : p.x + 28, y + 22, { size: 16, color: on ? '#ffe7a8' : '#f4efe6', rtl: L.rtl, align: L.rtl ? 'right' : 'left' });
    if (on) drawText('✓', p.x + p.w - 36, y + 22, { size: 16, color: '#ffe7a8', rtl: false, align: 'right' });
  });
  ctx.restore();
}
function icon(id, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#f4efe6';
  ctx.fillStyle = '#f4efe6';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (id === 'left' || id === 'right') {
    const s = id === 'left' ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(-6 * s, -8); ctx.lineTo(6 * s, 0); ctx.lineTo(-6 * s, 8); ctx.closePath(); ctx.fill();
  } else if (id === 'jump') {
    ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(0, -8); ctx.moveTo(-6, -2); ctx.lineTo(0, -8); ctx.lineTo(6, -2); ctx.stroke();
  } else if (id === 'stalk') {
    ctx.beginPath(); ctx.ellipse(0, 2, 10, 5, 0, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -2, 2, 0, 7); ctx.fill();
  } else if (id === 'pounce') {
    ctx.beginPath();
    ctx.moveTo(-8, 6); ctx.lineTo(-2, -8);
    ctx.moveTo(0, 8); ctx.lineTo(0, -10);
    ctx.moveTo(8, 6); ctx.lineTo(2, -8);
    ctx.stroke();
  } else if (id === 'paw') {
    ctx.beginPath();
    ctx.arc(2, 2, 7, -0.4, 2.4);
    ctx.moveTo(-8, -6); ctx.lineTo(-2, 2);
    ctx.moveTo(-4, -9); ctx.lineTo(1, -1);
    ctx.moveTo(0, -10); ctx.lineTo(4, -1);
    ctx.stroke();
  } else if (id === 'interact') {
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 2.2, 0, 7); ctx.fill();
  } else if (id === 'emote') {
    ctx.beginPath(); ctx.arc(0, 0, 9, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(-3, -2, 1.4, 0, 7); ctx.arc(3, -2, 1.4, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(0, 1, 4, 0.3, Math.PI - 0.3); ctx.stroke();
  }
  ctx.restore();
}
function emoteRects() {
  const w = 150, h = 54, gap = 12;
  const x0 = VW / 2 - (w * 4 + gap * 3) / 2;
  return EMOTES.map((k, i) => ({ k, x: x0 + i * (w + gap), y: VH - 300, w, h }));
}
function drawEmoteMenu() {
  if (!emoteMenu || phase !== 'play') return;
  const r = emoteRects();
  ctx.fillStyle = 'rgba(16,12,10,0.72)';
  roundRect(r[0].x - 16, r[0].y - 46, r[3].x + r[3].w - r[0].x + 32, r[0].h + 62, 16); ctx.fill();
  drawText(t('emote_title'), VW / 2, r[0].y - 18, { size: 15, align: 'center', color: '#f0d7b4' });
  r.forEach((b, i) => {
    ctx.fillStyle = 'rgba(255,240,214,0.14)';
    roundRect(b.x, b.y, b.w, b.h, 12); ctx.fill();
    drawText((i + 1) + '  ' + t('emote_' + b.k), b.x + b.w / 2, b.y + 34, { size: 18, align: 'center', color: '#fff6e8' });
  });
}
function drawMobile() {
  mobileButtons().forEach(b => {
    ctx.fillStyle = 'rgba(16,14,12,0.55)';
    roundRect(b.x, b.y, b.w, b.h, 16); ctx.fill();
    if (flash[b.id] > 0) {
      ctx.save();
      ctx.globalAlpha = flash[b.id];
      ctx.fillStyle = 'rgba(90,170,255,0.85)';
      roundRect(b.x - 3, b.y - 3, b.w + 6, b.h + 6, 18); ctx.fill();
      ctx.restore();
    }
    icon(b.id, b.x + b.w / 2, b.y + b.h / 2);
  });
}
function bar(x, y, w, frac, color, label) {
  drawText(label, x, y - 4, { size: 12, color: '#f6ecdf' });
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  roundRect(x, y, w, 10, 5); ctx.fill();
  ctx.fillStyle = color;
  roundRect(x, y, Math.max(4, w * clamp(frac, 0, 1)), 10, 5); ctx.fill();
}
function drawHUD() {
  bar(28, 36, 180, player.hunger / 100, '#e0924a', t('hunger'));
  bar(28, 68, 180, player.thirst / 100, '#6eb6d8', t('thirst'));
  bar(28, 100, 180, player.stamina / 100, '#8dcc6e', t('stamina'));
  if (player.held) drawText(t('prey_' + player.held) + (player.held2 ? ' + ' + t('prey_' + player.held2) : ''), 28, 128, { size: 13, color: '#ffe1b0' });
  const from = wind.dir > 0 ? t('left') : t('right');
  drawText(t('wind') + ' · ' + from, VW - 230, 32, { size: 14, color: '#fff6e8', align: 'left', rtl: false });
  ctx.save();
  ctx.translate(VW - 48, 58);
  ctx.rotate(wind.dir > 0 ? 0 : Math.PI);
  ctx.fillStyle = '#fff6e8';
  ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-8, -7); ctx.lineTo(-8, 7); ctx.fill();
  ctx.restore();
  if (player.obj) {
    drawText(t('objective'), VW / 2, 22, { size: 12, color: '#f0d7b4', align: 'center', rtl: false });
    ctx.font = '16px ' + FONT;
    textLines(t(player.obj) + (player.obj === 'obj_quest' ? '  ' + flags.molesGiven + '/2' : ''), 500).slice(0, 2).forEach((ln, i) => {
      drawText(ln, VW / 2, 42 + i * 18, { size: 16, color: '#fff8ee', align: 'center' });
    });
  }
  if (player.charge > 0.02) {
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    roundRect(VW / 2 - 60, 70, 120, 8, 4); ctx.fill();
    ctx.fillStyle = '#f0d78a';
    roundRect(VW / 2 - 60, 70, 120 * player.charge, 8, 4); ctx.fill();
  }
  if (banner) {
    ctx.fillStyle = 'rgba(20,16,12,0.78)';
    const lines = textLines(t(banner.k), 640);
    const h = 28 + lines.length * 22;
    roundRect(VW / 2 - 360, 86, 720, h, 12); ctx.fill();
    lines.forEach((ln, i) => drawText(ln, VW / 2, 110 + i * 22, { size: 16, align: 'center' }));
  }
  if (phase === 'play' && playT < 18 && !showMobile()) {
    drawText(t('hint_keys'), VW / 2, VH - 28, { size: 14, color: 'rgba(255,248,238,0.8)', align: 'center' });
  }
  const prompt = interactPrompt();
  if (prompt && phase === 'play') drawText('E  ' + prompt, VW / 2, VH - 74, { size: 16, align: 'center', color: '#fff2d4' });
  if (player.faint > 0 && phase === 'play') {
    ctx.fillStyle = 'rgba(80,20,16,' + Math.min(0.45, player.faint / 2) + ')';
    fillScreen();
  }
}
function interactPrompt() {
  if (phase !== 'play' || player.drinkT > 0) return '';
  if (!flags.questDone && Math.abs(player.x - dune.x) < 78) return flags.questTalk && (player.held === 'mole' || player.held2 === 'mole') ? t('give') : t('name_stray');
  if (player.x > 3860 && player.x < 4380) return t('drink');
  if (player.held) return t('eat');
  return '';
}
function drawDialogue() {
  if (!dlg) return;
  const line = dlg.lines[dlg.i];
  const full = t(line.k);
  const shown = full.slice(0, Math.floor(dlg.n));
  ctx.fillStyle = 'rgba(18,14,12,0.88)';
  roundRect(140, 500, 1000, 180, 16); ctx.fill();
  ctx.fillStyle = '#e8c56a';
  roundRect(160, 478, 220, 32, 8); ctx.fill();
  drawText(t(line.who), isRtl() ? 360 : 176, 500, { size: 16, color: '#2a2118', rtl: isRtl() });
  ctx.font = '20px ' + FONT;
  const lines = textLines(shown, 920);
  lines.forEach((ln, i) => drawText(ln, isRtl() ? 1100 : 176, 546 + i * 28, { size: 20 }));
  if (Math.sin(time * 6) > 0) drawText('E', 1080, 656, { size: 14, color: '#f0d7a8', align: 'right', rtl: false });
}
function drawTutorial() {
  ctx.fillStyle = 'rgba(10,8,6,0.55)';
  fillScreen();
  ctx.fillStyle = 'rgba(24,20,16,0.96)';
  roundRect(180, 70, 920, 560, 18); ctx.fill();
  drawText(t('tut_title'), VW / 2, 120, { size: 28, align: 'center', color: '#f6e2c0' });
  ctx.font = '18px ' + FONT;
  const blocks = ['tut_move', 'tut_actions', 'tut_mole', 'tut_wind', 'tut_touch'];
  let y = 160;
  blocks.forEach(k => {
    const lines = textLines(t(k), 840);
    lines.forEach(ln => { drawText(ln, isRtl() ? 1040 : 220, y, { size: 18 }); y += 26; });
    y += 12;
  });
  const b = tutButton();
  ctx.fillStyle = '#e8c56a';
  roundRect(b.x, b.y, b.w, b.h, 12); ctx.fill();
  drawText(t('tut_ok'), VW / 2, b.y + 32, { size: 18, align: 'center', color: '#2a2118', rtl: false });
}
function drawTitle() {
  drawText(t('title'), VW / 2, 250, { size: 64, align: 'center', color: '#fff6ea' });
  drawText(t('chapter'), VW / 2, 300, { size: 22, align: 'center', color: '#f0d2b0' });
  const b = beginRect();
  ctx.fillStyle = '#e8c56a';
  roundRect(b.x, b.y, b.w, b.h, 14); ctx.fill();
  drawText(t('begin'), VW / 2, b.y + 35, { size: 22, align: 'center', color: '#2a2118', rtl: false });
  if (hasSave()) {
    const c = contRect();
    ctx.strokeStyle = '#f0d7b0';
    ctx.lineWidth = 2;
    roundRect(c.x, c.y, c.w, c.h, 12); ctx.stroke();
    drawText(t('continue_game'), VW / 2, c.y + 31, { size: 18, align: 'center', color: '#f6ead8', rtl: false });
  }
  drawText(t('hint_begin'), VW / 2, hasSave() ? 492 : 430, { size: 16, align: 'center', color: 'rgba(255,248,238,0.85)', rtl: false });
}
function drawIntroUI() {
  const beat = BEATS[intro.beat];
  if (!beat) return;
  const a = clamp(intro.t / 0.4, 0, 1) * clamp((beat.len - intro.t) / 0.4, 0, 1);
  ctx.font = '28px ' + FONT;
  const lines = textLines(t(beat.cap), 860);
  ctx.fillStyle = 'rgba(10,8,6,' + (0.45 * a) + ')';
  roundRect(160, 560, 960, 40 + lines.length * 34, 14); ctx.fill();
  ctx.globalAlpha = a;
  lines.forEach((ln, i) => drawText(ln, VW / 2, 600 + i * 34, { size: 28, align: 'center' }));
  ctx.globalAlpha = 1;
  const fade = intro.beat >= 4 ? clamp(intro.t / BEATS[4].len, 0, 1) : 0;
  if (fade) { ctx.fillStyle = 'rgba(90,60,40,' + fade + ')'; fillScreen(); }
  drawText(t('hint_skip'), VW / 2, 42, { size: 16, align: 'center', color: 'rgba(255,248,238,0.8)', rtl: false });
}
function drawEnding() {
  const a1 = clamp(endingT / 1.2, 0, 1);
  const a2 = clamp((endingT - 1.4) / 1.2, 0, 1);
  const a3 = clamp((endingT - 3.2) / 1.2, 0, 1);
  ctx.fillStyle = 'rgba(12,8,6,0.45)';
  fillScreen();
  ctx.globalAlpha = a1;
  ctx.font = '26px ' + FONT;
  textLines(t('end1'), 800).forEach((ln, i) => drawText(ln, VW / 2, 250 + i * 32, { size: 26, align: 'center' }));
  ctx.globalAlpha = a2;
  textLines(t('end2'), 800).forEach((ln, i) => drawText(ln, VW / 2, 360 + i * 32, { size: 22, align: 'center', color: '#f0d7b8' }));
  ctx.globalAlpha = a3;
  drawText(t('end3'), VW / 2, 470, { size: 40, align: 'center', color: '#ffe7b0' });
  ctx.globalAlpha = 1;
}
function drawFaint() {
  ctx.fillStyle = 'rgba(20,8,8,' + clamp(faintT / 0.6, 0, 0.72) + ')';
  fillScreen();
  if (faintT > 0.4) {
    ctx.font = '24px ' + FONT;
    textLines(t('faint'), 760).forEach((ln, i) => drawText(ln, VW / 2, 340 + i * 32, { size: 24, align: 'center' }));
  }
}
function drawVignette() {
  const g = ctx.createRadialGradient(VW / 2, VH / 2, 280, VW / 2, VH / 2, 760);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(30,16,8,0.2)');
  ctx.fillStyle = g;
  fillScreen();
}

let stageKit = null, stageMom = null;
function ensureStage() {
  if (stageKit) return;
  stageKit = makeActor({ x: 300, y: 488, scale: 1.4, palette: 'kitten', anim: 'sit', _anim: 'sit' });
  stageMom = makeActor({ x: 470, y: 468, scale: 1.9, palette: 'mother', anim: 'sit', _anim: 'sit' });
}
function syncStage() {
  ensureStage();
  const beat = intro.beat;
  const u = beat >= BEATS.length ? 1 : intro.t / Math.max(0.01, BEATS[beat].len);
  stageKit.anim = beat >= 2 ? 'stalk' : 'sit';
  stageKit.x = 300;
  stageKit.y = 488;
  stageKit.onGround = true;
  stageKit.z = 0.72;
  stageMom.z = 0.66;
  stageMom.x = beat < 3 ? 480 : 480;
  stageMom.y = 466;
  stageMom.anim = beat >= 3 ? 'fall' : 'sit';
  stageMom.onGround = true;
  stageMom.facing = 1;
}
function renderIntro() {
  const beat = intro.beat;
  const u = beat >= BEATS.length ? 1 : intro.t / BEATS[beat].len;
  const ruin = beat < 2 ? 0 : beat === 2 ? u : 1;
  const sky = ctx.createLinearGradient(0, -padY(), 0, VH + padY());
  sky.addColorStop(0, ruin > 0.4 ? '#d7b39a' : '#8fd0c8');
  sky.addColorStop(1, ruin > 0.4 ? '#c48a62' : '#dfc48a');
  ctx.fillStyle = sky;
  fillScreen();
  const base = 518;
  const soil = ruin > 0.5 ? [126, 84, 58] : [78, 142, 64];
  const samples = [];
  for (let x = -padX() - 300; x <= VW + padX() + 300; x += 150) samples.push({ x: x, y: base });
  drawSolidGround(samples, () => soil);
  const peaks = [
    { z: -190, gap: 280, ry: 96, col: ruin > 0.5 ? [168, 122, 96] : [176, 168, 132] },
    { z: -110, gap: 220, ry: 64, col: ruin > 0.5 ? [146, 100, 74] : [140, 150, 108] }
  ];
  peaks.forEach((layer, li) => {
    const i0 = Math.floor((-padX() - 200) / layer.gap), i1 = Math.ceil((VW + padX() + 200) / layer.gap);
    for (let i = i0; i < i1; i++) {
      const n = rnd(i * 4 + li * 9 + 3);
      const ry = layer.ry * (0.7 + n * 0.5);
      const rx = layer.gap * (0.42 + n * 0.16);
      ctx.save();
      ctx.translate(i * layer.gap + 90, base);
      beginMesh(0, 0, layer.z);
      addRidge(rx * 1.2, ry * 1.25, rx * 0.5, layer.col, layer.col.map(c => Math.min(255, c * 1.18)), i * 7 + li * 31 + 50);
      paintMesh();
      ctx.restore();
    }
  });
  for (let i = 0; i < 7; i++) {
    const x = 70 + i * 180;
    const fall = ruin * (20 + rnd(i) * 30) * (i % 2 ? 1 : -1);
    ctx.save();
    ctx.translate(x + fall * 0.15, base);
    ctx.scale(2.15, 2.15);
    beginMesh(0, 0, (i - 3) * 8);
    const trunk = ruin > 0.35 ? [92, 58, 40] : [58, 86, 48];
    const leaf = ruin > 0.5 ? [120, 114, 62] : [46, 132, 58];
    const leaf2 = ruin > 0.5 ? [150, 140, 78] : [92, 164, 70];
    addTreeShape(trunk, leaf, leaf2);
    paintMesh();
    ctx.restore();
  }
  syncStage();
  if (!stageKit.joints) { updatePose(stageKit, 0.016); updatePose(stageMom, 0.016); }
  drawCat(stageKit);
  if (beat < 3) drawCat(stageMom);
  const arrive = beat < 2 ? 0 : beat === 2 ? Math.min(1, u) : 1;
  const mx = lerp(1760, 1140, arrive);
  let arm = -0.7;
  if (beat === 2) arm = lerp(2.15, 2.55, u);
  else if (beat >= 3) arm = lerp(2.55, 3.55, Math.min(1, beat === 3 ? u : 1));
  drawMachine(mx, 520, time * (beat >= 2 ? 1 : 0.2), 1.05, arm);
  if (beat >= 3 && (beat < 4 || u < 0.72)) {
    stageMom.x = lastBucket.x - 8;
    stageMom.y = lastBucket.y - 16;
    stageMom.anim = 'fall';
    drawCat(stageMom);
  }
  if (beat >= 2) {
    ctx.fillStyle = 'rgba(90,70,50,' + (0.05 + ruin * 0.12) + ')';
    fillScreen();
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = 'rgba(90,70,50,0.35)';
      ctx.beginPath();
      ctx.arc(900 + Math.sin(time * 2 + i) * 80, 200 + i * 36 - (time * 40 % 80), 18 + i * 4, 0, 7);
      ctx.fill();
    }
  }
}

function render() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#100c09';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (errText) {
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText(errText, 24, 40);
    return;
  }
  if (phase === 'intro') {
    setUI();
    renderIntro();
    drawIntroUI();
    drawGlobe();
    drawLangPanel();
    canvas.style.cursor = 'pointer';
    return;
  }
  if (phase === 'title') {
    player.x = 250; player.y = planeY(250, player.z) - player.h; player.anim = 'sit'; player.vx = 0; player.onGround = true;
    followCam(420, player.y);
  } else followCam(player.x, terrainY(player.x) - 36);
  setWorld();
  worldBg();
  drawTerrain();
  drawActors();
  drawPounceGuide();
  drawPawSlash();
  drawFront();
  if (phase !== 'title' && player.x > 19440) {
    drawMachine(22560, terrainY(22560) + 30, time * 0.15, 1.15, -0.8);
  }
  setUI();
  drawVignette();
  if (phase === 'title') drawTitle();
  else {
    drawHUD();
    drawMobile();
    drawEmoteMenu();
    if (phase === 'dialogue') drawDialogue();
    if (phase === 'tutorial') drawTutorial();
    if (phase === 'ending') drawEnding();
    if (phase === 'faint') drawFaint();
  }
  drawGlobe();
  drawLangPanel();
  canvas.style.cursor = (phase === 'title' || phase === 'intro' || phase === 'dialogue' || phase === 'tutorial') ? 'pointer' : 'default';
}

function langRowAt(v) {
  if (!langOpen) return -1;
  const p = panelRect();
  const viewY = p.y + 52;
  const viewH = p.h - 68;
  if (v.x < p.x || v.x > p.x + p.w || v.y < viewY || v.y > viewY + viewH) return -1;
  const i = Math.floor((v.y - viewY + langScroll) / 36);
  if (i < 0 || i >= LANGS.length) return -1;
  return i;
}
function onDown(ev) {
  downSeen = true;
  ensureAudio();
  if (ev.pointerType === 'touch') touchUsed = true;
  const v = toVirtual(ev.clientX, ev.clientY);
  if (hit(globeRect(), v)) { langOpen = !langOpen; ev.preventDefault(); return; }
  if (langOpen) {
    const i = langRowAt(v);
    if (i >= 0) {
      langDrag = { id: ev.pointerId, y: v.y, scroll: langScroll, moved: false };
    } else langOpen = false;
    ev.preventDefault();
    return;
  }
  if (phase === 'title') {
    if (hasSave() && hit(contRect(), v)) loadGame();
    else startNewGame();
    return;
  }
  if (phase === 'intro') { intro.hurry = true; return; }
  if (phase === 'tutorial' && hit(tutButton(), v)) { phase = 'play'; earth.mode = 'lead'; return; }
  if (phase === 'dialogue') { advanceDlg(); return; }
  if (phase === 'play' && emoteMenu) {
    const pick = emoteRects().find(b => hit(b, v));
    if (pick) { startEmote(pick.k); ev.preventDefault(); return; }
  }
  const btns = mobileButtons();
  for (const b of btns) {
    if (hit(b, v)) {
      if (b.id === 'emote') { emoteMenu = !emoteMenu; flash.emote = 1; ev.preventDefault(); return; }
      pointers.set(ev.pointerId, b.id);
      hold[b.id] = true;
      flash[b.id] = 1;
      ev.preventDefault();
      return;
    }
  }
}
function onMove(ev) {
  const v = toVirtual(ev.clientX, ev.clientY);
  if (langDrag && langDrag.id === ev.pointerId) {
    const dy = langDrag.y - v.y;
    if (Math.abs(dy) > 6) langDrag.moved = true;
    const max = Math.max(0, LANGS.length * 36 - (panelRect().h - 68));
    langScroll = clamp(langDrag.scroll + dy, 0, max);
  }
}
function onUp(ev) {
  const id = pointers.get(ev.pointerId);
  if (id) { hold[id] = false; pointers.delete(ev.pointerId); }
  if (langDrag && langDrag.id === ev.pointerId) {
    if (!langDrag.moved) {
      const v = toVirtual(ev.clientX, ev.clientY);
      const i = langRowAt(v);
      if (i >= 0) setLang(LANGS[i].id);
    }
    langDrag = null;
  }
}

function frame(now) {
  try {
    if (!frame.last) frame.last = now;
    let dt = Math.min(0.05, (now - frame.last) / 1000);
    frame.last = now;
    if (document.hidden) dt = 0;
    frame.acc = (frame.acc || 0) + dt;
    let steps = 0;
    while (frame.acc >= 1 / 60 && steps < 5) {
      update(1 / 60);
      Object.keys(just).forEach(k => delete just[k]);
      Object.assign(holdPrev, hold);
      frame.acc -= 1 / 60;
      steps++;
    }
    render();
  } catch (err) {
    console.error(err);
    errText = (err && err.stack) ? err.stack.split('\n').slice(0, 3).join(' | ') : String(err);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#300';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '14px sans-serif';
    ctx.fillText(errText, 16, 32);
  }
  requestAnimationFrame(frame);
}

function init() {
  try { lang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { lang = 'en'; }
  if (!STR[lang]) lang = 'en';
  for (let i = 0; i < 28; i++) streaks.push({ x: Math.random() * WORLD_W, y: 120 + Math.random() * 460, w: 24 + Math.random() * 70, sp: 0.4 + Math.random() });
  for (let i = 0; i < 8; i++) clouds.push({ x: i * 800, y: 70 + rnd(i) * 80, s: 40 + rnd(i + 4) * 30, p: 0.2 + rnd(i + 8) * 0.2 });
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', ev => {
    keys[ev.code] = true;
    just[ev.code] = true;
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(ev.code)) ev.preventDefault();
    if (showMobile()) {
      if (ev.code === 'Space' || ev.code === 'ArrowUp') flash.jump = 1;
      if (ev.code === 'KeyS') flash.stalk = 1;
      if (ev.code === 'KeyJ') flash.pounce = 1;
      if (ev.code === 'KeyK') flash.paw = 1;
      if (ev.code === 'KeyE') flash.interact = 1;
      if (ev.code === 'ArrowLeft' || ev.code === 'KeyA') flash.left = 1;
      if (ev.code === 'ArrowRight' || ev.code === 'KeyD') flash.right = 1;
    }
    ensureAudio();
  });
  window.addEventListener('keyup', ev => { keys[ev.code] = false; });
  canvas.tabIndex = 0;
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('click', onClick);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  canvas.addEventListener('contextmenu', ev => ev.preventDefault());
  canvas.addEventListener('wheel', ev => {
    if (!langOpen) return;
    const max = Math.max(0, LANGS.length * 36 - (panelRect().h - 68));
    langScroll = clamp(langScroll + Math.sign(ev.deltaY) * 36, 0, max);
    ev.preventDefault();
  }, { passive: false });
  window.addEventListener('keydown', ev => {
    if (phase === 'title' && (ev.code === 'Enter' || ev.code === 'Space')) startNewGame();
  });
  if (!SAVES_ON) { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }
  if (!(hasSave() && loadGame())) startNewGame();
  canvas.focus();
  requestAnimationFrame(frame);
}
let downSeen = false;
function onClick(ev) {
  if (downSeen) { downSeen = false; return; }
  onDown(ev);
}

/*__STRINGS_CALL__*/
init();
