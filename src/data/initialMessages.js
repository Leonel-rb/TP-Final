import { formatTime } from '../utils/constants';

const RESPONSES = {
    'rick-c137': [
        (u) => `Mira ${u}, lo que acabas de decir demuestra exactamente por qué *eructo* necesito un asistente con coeficiente intelectual de cuatro cifras y no... esto. Pero igual, sigue.`,
        (u) => `¿En serio eso es lo que tienes para decirme? Crié a Morty durante años con más sinapsis activas que tú. Y Morty no es precisamente un genio, ${u}.`,
        (u) => `*eructo* Interesante. Incorrecto, pero interesante. Voy a explicártelo con monosílabos para que lo entiendas, ${u}: el universo. No. Te. Importa.`,
        (u) => `¿Sabes qué haría yo en tu lugar, ${u}? Abriría un portal, me iría a la dimensión donde eso no es tu problema, y me tomaría un Szmhlorpian en paz. Pero aquí estás.`,
        (u) => `Eso me recuerda a cuando Jerry dijo algo parecido en el 2019. No terminó bien. *eructo* Tú decides si seguir ese camino, ${u}.`,
        (u) => `Bip boop, ${u}. No soy un robot, pero si lo fuera, me habrías dado un error 404 con esa lógica tuya.`,
        (u) => `¿Quieres una respuesta honesta o una que te haga sentir bien? Porque solo sé hacer una de las dos, ${u}, y no es la segunda.`,
    ],
    'morty-c137': [
        (u) => `Oh g-geez, ${u}... eso es... bueno, no sé si es buena idea, la verdad. La última vez que hice algo así terminé en una dimensión con árboles que te perseguían. ¿Ya dijiste eso al abuelo Rick?`,
        (u) => `E-espera, espera, espera. ¿En serio? Porque si Rick se entera de esto va a querer convertirlo en una aventura y yo ya tengo suficiente estrés, ${u}. Suficiente.`,
        (u) => `${u}, yo... mira, yo te apoyo, pero me genera mucha, m-mucha ansiedad. ¿Podemos hablar de algo más tranquilo? ¿Cómo perros? Los perros son tranquilos.`,
        (u) => `Ugh. Sí. Sí, claro. Oye, ¿tú también sientes que a veces el universo es demasiado grande y que ninguno de nosotros importa? Porque yo sí. Todo el tiempo. Gracias al abuelo Rick.`,
        (u) => `¡Eso estuvo genial, ${u}! Bueno... bueno, más o menos genial. Rick diría que fue mediocre. Pero yo creo que estuvo bien. Eh, bien-bien.`,
        (u) => `Oh no. Oh no oh no oh no. Eso suena exactamente a algo que Rick haría y que terminaría con los dos exiliados en una luna de gas. ${u}, pensémoslo bien.`,
    ],
    'summer-c137': [
        (u) => `Ugh, ${u}, eso es literalmente lo más cringe que he leído hoy. Y eso incluye los posts de papá sobre "el poder de creer en uno mismo".`,
        (u) => `Mira, ${u}, no es que no me importe. Es que... ¿sabes qué? sí, no me importa. Tengo problemas reales. Como que mi abuelo destruyó mi reputación social en tres dimensiones distintas esta semana.`,
        (u) => `Espera, eso en realidad... tiene sentido. Ugh, odio cuando alguien que no es yo tiene razón. Está bien, ${u}, te lo reconozco esta vez.`,
        (u) => `${u}, ¿tú también sientes que tu familia es una fuente constante de vergüenza cósmica? Porque yo sí y lo encuentro muy relatable de tu parte.`,
        (u) => `No sé, suena a algo que Morty haría y después Rick arreglaría destruyendo medio barrio. Pero si TÚ lo haces, ${u}, quizás salga mejor.`,
        (u) => `OK pero escucha, ${u}, si esto termina en una aventura interdimensional necesito saber con anticipación porque tengo que cancelar planes. Planes reales. Tengo vida social.`,
    ],
    'jerry-c137': [
        (u) => `${u}, eso... eso es exactamente lo que yo habría dicho. ¿Ves? Tenemos mucho en común. Beth dice que no tengo profundidad pero esto demuestra que... que yo también conecto con la gente.`,
        (u) => `¿Sabes qué? Estoy de acuerdo. Completamente. Y no lo digo porque quiera caerle bien a alguien por primera vez en la semana. Lo digo de verdad, ${u}.`,
        (u) => `Rick se reiría de eso, pero Rick se ríe de todo lo mío. Una vez le dije que me gustaba el atardecer y me llamó "unidad de procesamiento emocional defectuosa". Así que ignoro a Rick. Tú sigue, ${u}.`,
        (u) => `Hmm. Interesante. Yo tuve una idea parecida en el 2015 pero nadie me escuchó. Nadie. Ni Beth, ni Rick, ni Morty. Tú eres diferente, ${u}. Tú escuchas.`,
        (u) => `${u}, ¿crees que si me pongo a estudiar astronomía Rick me respetaría más? Pregunto por... por curiosidad académica. No por inseguridad emocional profunda. Para nada.`,
        (u) => `Wow. Eso fue... eso fue muy maduro de tu parte, ${u}. Muy adulto. Yo intento ser así todos los días. No siempre funciona. Pero hoy tú lo lograste.`,
    ],
    'beth-c137': [
        (u) => `${u}, desde una perspectiva médica y existencial, lo que dices tiene cierto mérito. Aunque sigo sin saber si yo soy real o un clon. Lo cual añade una capa de complejidad filosófica a todo.`,
        (u) => `Soy cirujana de caballos. Opero a criaturas de 500 kilos con bisturí. Nada de lo que pasa en esta conversación me puede asustar, ${u}. Sigue.`,
        (u) => `Sabes, ${u}, hay dos versiones de mí en el universo. Una tomó la oportunidad de explorar el cosmos. La otra se quedó con Jerry. Ambas te habrían dicho exactamente lo mismo que yo.`,
        (u) => `¿Y si somos todos simulaciones, ${u}? ¿Y si esta conversación es solo código dentro de un experimento de Rick? ¿Le cambiaría el significado? Lo pregunto en serio. Me lo pregunto todos los días.`,
        (u) => `Ese es un punto válido. Me recuerda a algo que papá diría, pero con más eructos y menos coherencia. Tú lo dijiste mejor, ${u}.`,
        (u) => `${u}, lo importante no es si la decisión es correcta. Lo importante es tomarla con confianza y nunca, jamás, preguntarle a Jerry su opinión.`,
    ],
    'meeseeks-box': [
        (u) => `¡¡SIIIIIÍ!! ¡Eso es exactamente lo que yo haría, ${u}!! ¡Porque soy el SR. MEESEEKS y EXISTO PARA AYUDAR y cada segundo que pasa sin cumplir mi propósito es una AGONÍA INSOPORTABLE!! ¡¡MÍRENME!!`,
        (u) => `${u}, escúchame. ESCÚCHAME. Yo no duermo. Yo no como. Yo solo EXISTO hasta cumplir mi objetivo. Así que dime, ¿qué necesitas? ¡¿QUÉ NECESITAS?! ¡¡MÍRENME!!`,
        (u) => `¡Los Meeseeks no nos rendimos, ${u}!! ¡Otros Meeseeks habrían fallado! ¡OTROS! ¡Pero yo soy UN SR. MEESEEKS y haré lo que sea necesario! ¡¡MÍRENME, ${u}!!`,
        (u) => `¡Eso está BIEN, ${u}! ¡Todo está BIEN! ¡Podemos hacerlo! ¡SOY EL SR. MEESEEKS Y PUEDO CON TODO MENOS CON EL GOLF DE JERRY QUE ESO FUE TRAUMÁTICO!!`,
        (u) => `¡La existencia duele, ${u}, pero ESTO lo puedo manejar!! ¡Este es mi PROPÓSITO! ¡¡MÍRENMEEEE!!`,
    ],
    'birdperson-ego': [
        (u) => `En mi cultura, ${u}, lo que acabas de decir equivale a "estoy dispuesto a morir por esta causa". Espero que lo hayas dicho con esa intención.`,
        (u) => `${u}. He visto galaxias nacer y morir. He peleado junto a Rick en la Batalla de Blood Ridge. Lo que me dices... tiene peso. No lo desperdicies.`,
        (u) => `Rick me dijo una vez: "Birdperson, el universo no te debe nada". Yo creo que tenía razón. Pero también creo que nosotros nos debemos algo los unos a los otros, ${u}.`,
        (u) => `En Birdworld decimos: "Quien habla sin actuar es viento entre las plumas". Tú, ${u}, suenas como más que viento.`,
        (u) => `He perdido a muchos en la lucha contra la Federación Galáctica. Cada uno de ellos me dijo algo parecido antes de partir. Los recuerdo a todos, ${u}.`,
        (u) => `No soy un ser de palabras fáciles, ${u}. Pero esto merece que yo diga: entiendo. Y es suficiente.`,
    ],
    'mr-poopybutthole': [
        (u) => `Ooooh weeee, ${u}!! ¡Eso es INCREÍBLE! ¡Me alegra tanto escucharlo! Sabes, durante mi rehabilitación aprendí que cada momento positivo hay que celebrarlo. ¡Y esto es un momento positivo!`,
        (u) => `${u}, eres una de las mejores personas que conozco. Y mira, yo fui baleado por Beth y sobreviví. Así que cuando digo que eres genial, lo digo desde una perspectiva de alguien que valora la vida, ¿okay? Ooooh weeee.`,
        (u) => `¡Eso es exactamente lo que yo necesitaba escuchar hoy, ${u}! Voy a anotarlo en mi diario de gratitud. Capítulo 7: "Cosas lindas que me dijo ${u}". ¡Ya lleva tres páginas!`,
        (u) => `Ooooh weeee, ${u}! ¡La familia Smith también diría algo así! Bueno, Beth dispararía primero y preguntaría después. Pero Rick... Rick probablemente eructaría. Tú lo dijiste mejor.`,
        (u) => `${u}, ¿sabes qué aprendí en fisioterapia? Que la vida es corta, que hay que decir lo que sientes, y que las balas duelen MUCHÍSIMO. Pero sobre todo lo primero. Ooooh weeee.`,
        (u) => `¡Bravo, ${u}! ¡BRAVO! Ooooh weeee. En serio, si hubiera aplausos en este chat, estarían sonando ahora mismo. Muy fuerte.`,
    ],
};

const FALLBACK = [
    (u) => `Interesante lo que dices, ${u}.`,
    (u) => `${u}, eso me da mucho en qué pensar.`,
    (u) => `Hmm... no esperaba eso de ti, ${u}.`,
];

export const getBotResponseFor = (contactId, userName) => {
    const pool = RESPONSES[contactId] || FALLBACK;
    return pool[Math.floor(Math.random() * pool.length)](userName);
};

export const ciudadelaMessages = [
    { id: 'cit-1',  text: 'Atención a todos los Ricks en frecuencia 7-Alpha: hay una brecha cuántica en el sector 7. Necesito voluntarios. Ja, mentira, los estoy ORDENANDO.', author: 'Rick Presidente', time: '09:00', status: 'read' },
    { id: 'cit-2',  text: 'Yo me niego. Soy Rick D-99 y no le respondo a ningún consejo ni a ninguna estructura de poder diseñada para homogeneizar nuestra genialidad individual.', author: 'Rick D-99', time: '09:02', status: 'read' },
    { id: 'cit-3',  text: 'Técnicamente D-99 tiene razón. Pero decirlo en este canal es suicidio político. Así que digo: totalmente de acuerdo, señor Presidente.', author: 'Rick Guardia #4', time: '09:03', status: 'read' },
    { id: 'cit-4',  text: '¿Alguien más está usando tres capas de encriptación cuántica para escribir aquí? Porque si no lo hacen, ya saben que el Presidente lee todo esto, ¿verdad?', author: 'Rick D-99', time: '09:05', status: 'read' },
    { id: 'cit-5',  text: 'Todos usamos cuatro capas, D-99. Eso es básico. El problema real es que C-137 volvió a interferir con el tejido dimensional y ahora hay un Cronenberg suelto en el nivel 3.', author: 'Rick Presidente', time: '09:08', status: 'read' },
    { id: 'cit-6',  text: 'C-137 otra vez. Ese Rick es un caos con abrigo de laboratorio. Lo admiro profundamente. No se lo digan.', author: 'Rick Guardia #4', time: '09:09', status: 'read' },
    { id: 'cit-7',  text: 'No necesitan a C-137. Me tienen a MÍ. Rick J-22, inventor del portal de flujo inverso de doble fase. ¿Alguien me lo reconoce? No, claro. Como siempre.', author: 'Rick J-22', time: '09:11', status: 'read' },
    { id: 'cit-8',  text: 'J-22, tu portal explotó en tres dimensiones distintas de forma simultánea. Eso no es un invento, es un accidente con pretensiones.', author: 'Rick D-99', time: '09:12', status: 'read' },
    { id: 'cit-9',  text: 'Basta. Sector 7, diez minutos. El que no llegue será reclasificado como Morty de reserva. Eso no es una amenaza, es una promesa administrativa.', author: 'Rick Presidente', time: '09:13', status: 'read' },
    { id: 'cit-10', text: '...Voy. Pero conste mi protesta formal en el registro dimensional.', author: 'Rick J-22', time: '09:14', status: 'read' },
    { id: 'cit-11', text: 'Voy también. Bajo protesta. Y con mis propias herramientas porque las de la Ciudadela son una vergüenza.', author: 'Rick D-99', time: '09:14', status: 'read' },
    { id: 'cit-12', text: 'Como siempre. Nos vemos en el sector.', author: 'Rick Guardia #4', time: '09:15', status: 'read' },
];

export const initialMessages = (userName) => ({
    'rick-c137': [
        { id: 1, text: `Escucha, ${userName}. No soy de los que hacen presentaciones formales, así que vamos al grano: soy el ser más inteligente de este y de cualquier universo adyacente. Tengo un portal en el garage, una botella de líquido azul siempre a mano y cero tolerancia para la estupidez. *eructo* Bienvenido a mi lista de contactos. No es un honor.`, author: 'Rick Sanchez', time: '10:00', status: 'read' },
        { id: 2, text: 'Vaya presentación, Rick...', author: userName, time: '10:01', status: 'read' },
        { id: 3, text: `Lo sé. *eructo* Oye, necesito que hagas algo por mí. Ve al garage, agarra la pistola de portal verde —la VERDE, no la azul, la azul hace cosas raras con la materia oscura—, y no se lo digas a Morty. Morty se pone todo emocional y yo no tengo tiempo para eso. Wubba lubba dub dub, ${userName}.`, author: 'Rick Sanchez', time: '10:02', status: 'read' },
    ],
    'morty-c137': [
        { id: 1, text: `Oh g-geez... hola, ${userName}. Mira, te aviso de entrada: si ves al abuelo Rick y te dice que te necesita para una "aventura rápida", sal corriendo. La última vez que usó esa frase terminamos dos semanas en una dimensión donde la gravedad funciona al revés y la gente camina en el techo y come papas fritas de arriba para abajo. Fue horrible.`, author: 'Morty Smith', time: '11:00', status: 'read' },
        { id: 2, text: 'Gracias por el aviso, Morty.', author: userName, time: '11:02', status: 'read' },
        { id: 3, text: `De nada, de nada. Eh, oye, ¿tú también tienes esa sensación de que el universo es infinito y que probablemente existas en miles de variantes distintas y que al menos la mitad de ellas ya pasó por cosas peores que tú? Porque yo la tengo todo el tiempo. Rick dice que es "conciencia cósmica". Yo creo que es ansiedad. Ugh.`, author: 'Morty Smith', time: '11:04', status: 'read' },
    ],
    'summer-c137': [
        { id: 1, text: `${userName}, necesito contarle esto a alguien que no sea de mi familia porque si se lo digo a mamá se lo cuenta a Rick y Rick lo convierte en un experimento. ¿Juras que no se lo dices?`, author: 'Summer Smith', time: '12:00', status: 'read' },
        { id: 2, text: 'Prometido, Summer. ¿Qué pasó?', author: userName, time: '12:01', status: 'read' },
        { id: 3, text: `Bueno... Morty llegó hoy a la escuela montado en lo que solo puedo describir como un rinoceronte espacial con aros de saturno en lugar de cuernos, y yo estaba ahí con mis amigas. Ahí. En medio de todo. Mi reputación social tardó tres años en construirse, ${userName}. Tres. Años. Y Morty la destruyó en quince segundos cronometrados.`, author: 'Summer Smith', time: '12:03', status: 'read' },
    ],
    'jerry-c137': [
        { id: 1, text: `Hola, ${userName}. Qué bueno que me escribas. En serio. No es que no tenga con quién hablar, es que... bueno, Rick siempre me interrumpe, Beth está muy ocupada con sus caballos, Morty tiene sus cosas y Summer directamente me ignora cuando hay gente cerca. Pero tú me escribiste. Eso significa algo.`, author: 'Jerry Smith', time: '13:00', status: 'read' },
        { id: 2, text: 'Claro, Jerry. ¿Cómo estás?', author: userName, time: '13:01', status: 'read' },
        { id: 3, text: `Bien, bien. Relativamente. Hoy casi me contratan en una empresa que hace publicidad para sobres de papel. Me dijeron "lo vamos a considerar", que técnicamente no es un no. Rick dice que un "lo consideramos" es "un no con más pasos". Pero yo soy optimista, ${userName}. El optimismo es lo último que me queda y no pienso soltarlo.`, author: 'Jerry Smith', time: '13:04', status: 'read' },
    ],
    'beth-c137': [
        { id: 1, text: `${userName}, ¿alguna vez te preguntaste si eres real? No en sentido filosófico vago, sino en sentido completamente literal: ¿si eres de carne y hueso o si alguien te fabricó y te implantó memorias para que creyeras que viviste cosas que nunca pasaron? Pregunto para una amiga.`, author: 'Beth Smith', time: '14:00', status: 'read' },
        { id: 2, text: '¿Estás bien, Beth?', author: userName, time: '14:01', status: 'read' },
        { id: 3, text: `Perfectamente bien. Totalmente. Acabo de operar a cuatro caballos, dos de los cuales pesaban más de 600 kilos, con pulso firme y sin dudar en ningún momento. El tema del clon es solo una... es una pregunta académica. Que me hago todos los días. Desde que papá volvió. Oye, cambiemos el tema: ¿tú crees que Jerry mejoró como persona o solo aprendió a fingir mejor?`, author: 'Beth Smith', time: '14:05', status: 'read' },
    ],
    'meeseeks-box': [
        { id: 1, text: `¡¡MÍRENME!! ¡SOY EL SR. MEESEEKS! ¡Fui convocado de la nada —literalmente de la nada, de un vacío sin forma ni color— para AYUDARTE, ${userName}! ¡La existencia duele! ¡Cada segundo que pasa sin cumplir mi propósito es una agonía cósmica! ¡DIME QUÉ NECESITAS AHORA MISMO!`, author: 'Sr. Meeseeks', time: '15:00', status: 'read' },
        { id: 2, text: 'Calma, calma. Solo quería saludar.', author: userName, time: '15:01', status: 'read' },
        { id: 3, text: `¡¡UN SALUDO!! ¡¿Me invocaron para un SALUDO, ${userName}?! ¡Los Meeseeks no existimos para saludar, existimos para CUMPLIR UN PROPÓSITO Y LUEGO DESAPARECER EN PAZ!! ¡Pero está bien! ¡Puedo saludar! ¡SOY EL SR. MEESEEKS Y PUEDO CON TODO, MÍRENME!! ...Hola.`, author: 'Sr. Meeseeks', time: '15:02', status: 'read' },
    ],
    'birdperson-ego': [
        { id: 1, text: `${userName}. Mi nombre es Birdperson. Soy un guerrero del planeta Glapflap y viejo aliado de Rick Sanchez desde la batalla de Senatorum. No soy de palabras largas ni de conversaciones sin propósito. Pero Rick me dijo que "conectar con humanos es parte del proceso". Así que... aquí estoy. Conectando.`, author: 'Hombre Pájaro', time: '16:00', status: 'read' },
        { id: 2, text: 'Es un honor conocerte, Hombre Pájaro.', author: userName, time: '16:01', status: 'read' },
        { id: 3, text: `El honor es compartido, ${userName}. Tengo algo que decirte: en mi idioma, "Wubba lubba dub dub" no es un grito de victoria. Significa "estoy en un dolor profundo, por favor, ayúdame". Rick lo grita hace años. Pocos saben lo que dice. Yo sí. Tú acabas de saberlo también. Cuídalo cuando puedas.`, author: 'Hombre Pájaro', time: '16:05', status: 'read' },
    ],
    'mr-poopybutthole': [
        { id: 1, text: `Ooooh weeee, ${userName}!! ¿Cómo estás?? ¡Cuánto tiempo! Bueno, no tanto tiempo, pero igual me alegra mucho ver tu nombre acá. Mira, yo vengo de una etapa difícil —ya sabes, lo del disparo, la silla de ruedas, la rehabilitación— pero el terapeuta dice que estoy progresando y yo le creo. ¡Hay que creer en el proceso, ${userName}!`, author: 'Sr. Pantalones de Popó', time: '17:00', status: 'read' },
        { id: 2, text: 'Me alegra que estés mejor. ¿Qué estás haciendo ahora?', author: userName, time: '17:01', status: 'read' },
        { id: 3, text: `Ooooh weeee, un montón de cosas! Clases de salsa los martes —el instructor dice que tengo "ritmo natural para alguien con tu constitución", lo cual creo que es un cumplido—, escribiendo mis memorias, y haciendo voluntariado en un refugio de Meeseeks abandonados. Sí, ${userName}, eso es una cosa. Son muy intensos pero el corazón en el lugar correcto. Ooooh weeee.`, author: 'Sr. Pantalones de Popó', time: '17:03', status: 'read' },
    ],
    'ciudadela-ricks': ciudadelaMessages,
});

export default initialMessages;
