let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
let userAnswers = [];
let startTime;
let questionStartTime;
let responseTimes = [];
let currentStreak = 0;
let longestStreak = 0;
localStorage.removeItem('currentQuestionIndex');



const questions = [
  { question: "¿Que prefieres, ser alérgico al sol o al agua?", option1: "Sol", option2: "Agua", result1: "Sol: 30%", result2: "Agua: 70%" },
  { question: "¿Que prefieres, vivir sin música o sin películas?", option1: "Sin música", option2: "Sin películas", result1: "Sin música: 40%", result2: "Sin películas: 60%" },
  { question: "¿Que prefieres, tener la habilidad de volar o ser invisible?", option1: "Volar", option2: "Invisible", result1: "Volar: 55%", result2: "Invisible: 45%" },
  { question: "¿Que prefieres, explorar el espacio o las profundidades del océano?", option1: "Espacio", option2: "Océano", result1: "Espacio: 65%", result2: "Océano: 35%" },
  { question: "¿Qué prefieres, que te encarcelen por algo que no has hecho o que encarcelen a tu mejor amigo por algo que has hecho tú?", option1: "Encarcelarme a mí", option2: "Encarcelar a mi amigo", result1: "Encarcelarme a mí: 70%", result2: "Encarcelar a mi amigo: 30%" },
  { question: "¿Qué prefieres, olvidar a las personas que conoces u olvidar quién eres?", option1: "Olvidar a las personas", option2: "Olvidar quién soy", result1: "Olvidar a las personas: 45%", result2: "Olvidar quién soy: 55%" },
  { question: "¿Qué prefieres, sentir siempre que estás a punto de estornudar o que tienes ganas de mear?", option1: "Ganas de estornudar", option2: "Ganas de mear", result1: "Ganas de estornudar: 35%", result2: "Ganas de mear: 65%" },
  { question: "¿Qué prefieres, saber cómo vas a morir o cuándo vas a morir?", option1: "Cómo voy a morir", option2: "Cuándo voy a morir", result1: "Cómo voy a morir: 40%", result2: "Cuándo voy a morir: 60%" },
  { question: "¿Qué prefieres, que tu jefe te pille masturbándote o que tu abuela te pille masturbándote?", option1: "Que me pille mi jefe", option2: "Que me pille mi abuela", result1: "Que me pille mi jefe: 15%", result2: "Que me pille mi abuela: 85%" },
  { question: "¿Qué prefieres, ganar la lotería o ser inmortal?", option1: "Ganar la lotería", option2: "Ser inmortal", result1: "Ganar la lotería: 50%", result2: "Ser inmortal: 50%" },
  { question: "¿Qué prefieres, ir siempre desnudo o no volver a pisar la calle nunca más?", option1: "Ir siempre desnudo", option2: "No pisar la calle", result1: "Ir siempre desnudo: 45%", result2: "No pisar la calle: 55%" },
  { question: "¿Qué prefieres, viajar al futuro o viajar al pasado?", option1: "Viajar al futuro", option2: "Viajar al pasado", result1: "Viajar al futuro: 65%", result2: "Viajar al pasado: 35%" },
  { question: "¿Qué prefieres, perder el sentido del gusto o el del olfato?", option1: "Perder el gusto", option2: "Perder el olfato", result1: "Perder el gusto: 40%", result2: "Perder el olfato: 60%" },
  { question: "¿Qué prefieres, susurrar todo el tiempo o gritar todo el tiempo?", option1: "Susurrar siempre", option2: "Gritar siempre", result1: "Susurrar siempre: 80%", result2: "Gritar siempre: 20%" },
  { question: "¿Qué prefieres, que tu nariz nunca pare de crecer o que tus orejas nunca paren de crecer?", option1: "Nariz que crece", option2: "Orejas que crecen", result1: "Nariz que crece: 50%", result2: "Orejas que crecen: 50%" },
  { question: "¿Qué prefieres, leer la mente o ver el futuro?", option1: "Leer la mente", option2: "Ver el futuro", result1: "Leer la mente: 60%", result2: "Ver el futuro: 40%" },
  { question: "¿Qué prefieres, vivir eternamente siendo de clase media o vivir poco tiempo pero siendo rico?", option1: "Vivir eternamente clase media", option2: "Vivir poco pero rico", result1: "Vivir eternamente clase media: 65%", result2: "Vivir poco pero rico: 35%" },
  { question: "¿Qué prefieres, amor o dinero ilimitado?", option1: "Amor", option2: "Dinero ilimitado", result1: "Amor: 40%", result2: "Dinero ilimitado: 60%" },
  { question: "¿Qué prefieres, poder comer solo tu comida favorita o poder comer de todo menos tu comida favorita?", option1: "Solo comida favorita", option2: "Todo menos comida favorita", result1: "Solo comida favorita: 45%", result2: "Todo menos comida favorita: 55%" },
  { question: "¿Qué prefieres, un trabajo que no te gusta que te dé mucho dinero o un trabajo que te gusta pero que te dé poco dinero?", option1: "Trabajo que no me gusta pero mucho dinero", option2: "Trabajo que me gusta pero poco dinero", result1: "Trabajo que no me gusta pero mucho dinero: 60%", result2: "Trabajo que me gusta pero poco dinero: 40%" },
  { question: "¿Qué prefieres, pasar una noche con una persona famosa y no poder contárselo a nadie o que todo el mundo diga que has estado con un famoso y que no sea cierto?", option1: "Noche con famoso sin contar", option2: "Que todos digan que estuve con famoso sin ser cierto", result1: "Noche con famoso sin contar: 70%", result2: "Que todos digan que estuve con famoso sin ser cierto: 30%" },
  { question: "¿Qué prefieres, tener una tercera pierna o un tercer brazo?", option1: "Tercera pierna", option2: "Tercer brazo", result1: "Tercera pierna: 30%", result2: "Tercer brazo: 70%" },
  { question: "¿Qué prefieres, que tus padres reciban una alerta en el móvil cuando tienes sexo o recibir tú una alerta cuando ellos lo tienen?", option1: "Alerta para mis padres", option2: "Recibir yo la alerta", result1: "Alerta para mis padres: 25%", result2: "Recibir yo la alerta: 75%" },
  { question: "¿Qué prefieres, poder hablar con los animales o entender todos los idiomas del mundo?", option1: "Hablar con animales", option2: "Entender todos los idiomas", result1: "Hablar con animales: 40%", result2: "Entender todos los idiomas: 60%" },
  { question: "¿Qué prefieres, vivir en la casa de tus sueños en un mal barrio o en una casa normal en un buen barrio?", option1: "Casa de sueños en mal barrio", option2: "Casa normal en buen barrio", result1: "Casa de sueños en mal barrio: 45%", result2: "Casa normal en buen barrio: 55%" },
  { question: "¿Qué prefieres, vivir en un piso o en una casa?", option1: "En un piso", option2: "En una casa", result1: "En un piso: 50%", result2: "En una casa: 50%" },
  { question: "¿Qué prefieres, ganar la lotería o que tu peor enemigo se arruine?", option1: "Ganar la lotería", option2: "Enemigo se arruine", result1: "Ganar la lotería: 85%", result2: "Enemigo se arruine: 15%" },
  { question: "¿Qué prefieres, fama sin dinero o dinero sin fama?", option1: "Fama sin dinero", option2: "Dinero sin fama", result1: "Fama sin dinero: 20%", result2: "Dinero sin fama: 80%" },
  { question: "¿Qué prefieres, tener dolor de cabeza continuo o diarrea continua?", option1: "Dolor de cabeza", option2: "Diarrea", result1: "Dolor de cabeza: 70%", result2: "Diarrea: 30%" },
  { question: "¿Qué prefieres, que tu pareja vea un vídeo donde le eres infiel o ver tú un vídeo en el que te es infiel?", option1: "Pareja vea vídeo", option2: "Ver yo el vídeo", result1: "Pareja vea vídeo: 40%", result2: "Ver yo el vídeo: 60%" },
  { question: "¿Qué prefieres, ser siempre un niño y no crecer o haber nacido directamente adulto?", option1: "Siempre niño", option2: "Nacer adulto", result1: "Siempre niño: 60%", result2: "Nacer adulto: 40%" },
  { question: "¿Qué prefieres, que nadie entienda lo que dices o que tú no entiendas nada de lo que te dicen?", option1: "Nadie entienda lo que digo", option2: "No entender nada de lo que me dicen", result1: "Nadie entienda lo que digo: 35%", result2: "No entender nada de lo que me dicen: 65%" },
  { question: "¿Qué prefieres, cambiar tu mentalidad o cambiar tu físico?", option1: "Cambiar mentalidad", option2: "Cambiar físico", result1: "Cambiar mentalidad: 55%", result2: "Cambiar físico: 45%" },
  { question: "¿Qué prefieres, no poder calmar nunca la sed o no poder calmar nunca el hambre?", option1: "No calmar la sed", option2: "No calmar el hambre", result1: "No calmar la sed: 40%", result2: "No calmar el hambre: 60%" },
  { question: "¿Qué prefieres, ganar 2 millones ahora mismo o tener un sueldo de 10.000 euros para toda la vida?", option1: "2 millones ahora", option2: "10.000 euros para siempre", result1: "2 millones ahora: 50%", result2: "10.000 euros para siempre: 50%" },
  { question: "¿Qué prefieres, que haya algo después de la muerte o que no?", option1: "Que haya algo", option2: "Que no haya nada", result1: "Que haya algo: 70%", result2: "Que no haya nada: 30%" },
  { question: "¿Qué prefieres, tener sexo con un caballo y que nadie lo supiera o que todo el mundo creyera que has tenido sexo con un caballo aunque fuera mentira?", option1: "Sexo con caballo y nadie lo sepa", option2: "Todo el mundo lo crea sin ser cierto", result1: "Sexo con caballo y nadie lo sepa: 10%", result2: "Todo el mundo lo crea sin ser cierto: 90%" },
  { question: "¿Qué prefieres, detener el cambio climático o conseguir la paz mundial?", option1: "Detener cambio climático", option2: "Paz mundial", result1: "Detener cambio climático: 55%", result2: "Paz mundial: 45%" },
  { question: "¿Qué prefieres, que tu madre pueda leerte la mente o que tu pareja pueda leerte la mente?", option1: "Madre lea la mente", option2: "Pareja lea la mente", result1: "Madre lea la mente: 40%", result2: "Pareja lea la mente: 60%" },
  { question: "¿Qué prefieres, naufragar en una isla o escuchar que los motores de un avión en el que te encuentras se apagan?", option1: "Naufragar en una isla", option2: "Motores de avión se apagan", result1: "Naufragar en una isla: 65%", result2: "Motores de avión se apagan: 35%" },
  { question: "¿Qué prefieres, que un guepardo te persiga una vez o que un caracol inmortal, que si te toca te mata al instante, te persiga el resto de tu vida?", option1: "Guepardo te persiga una vez", option2: "Caracol inmortal te persiga siempre", result1: "Guepardo te persiga una vez: 80%", result2: "Caracol inmortal te persiga siempre: 20%" },
  { question: "¿Qué prefieres, perder todo tu dinero o perder todas las fotos que tengas?", option1: "Perder todo el dinero", option2: "Perder todas las fotos", result1: "Perder todo el dinero: 35%", result2: "Perder todas las fotos: 65%" },
  { question: "¿Qué prefieres, tener siempre aspecto de niño y mentalidad de adulto o aspecto de adulto pero mentalidad de niño?", option1: "Aspecto de niño, mentalidad adulta", option2: "Aspecto adulto, mentalidad de niño", result1: "Aspecto de niño, mentalidad adulta: 40%", result2: "Aspecto adulto, mentalidad de niño: 60%" },
  { question: "¿Qué prefieres, que nadie vaya a tu boda o que nadie vaya a tu funeral?", option1: "Que nadie vaya a la boda", option2: "Que nadie vaya al funeral", result1: "Que nadie vaya a la boda: 50%", result2: "Que nadie vaya al funeral: 50%" },
  { question: "¿Qué prefieres, no poder volver a ver ninguna película o no poder volver a escuchar música?", option1: "No ver películas", option2: "No escuchar música", result1: "No ver películas: 45%", result2: "No escuchar música: 55%" },
  { question: "¿Qué prefieres, ir corriendo siempre o caminar siempre muy lento?", option1: "Ir corriendo siempre", option2: "Caminar siempre muy lento", result1: "Ir corriendo siempre: 55%", result2: "Caminar siempre muy lento: 45%" },
  { question: "¿Qué prefieres, matar a cien cachorros de perro o matar a un bebé?", option1: "Matar a cien cachorros", option2: "Matar a un bebé", result1: "Matar a cien cachorros: 10%", result2: "Matar a un bebé: 90%" },
  { question: "¿Qué prefieres, reencarnarte en una mosca o en alguien que se convertirá en un psicópata?", option1: "Reencarnarte en una mosca", option2: "Reencarnarte en un futuro psicópata", result1: "Reencarnarte en una mosca: 70%", result2: "Reencarnarte en un futuro psicópata: 30%" },
  { question: "¿Qué prefieres, ser el primero de tus amigos en morir o ser el último?", option1: "Ser el primero", option2: "Ser el último", result1: "Ser el primero: 40%", result2: "Ser el último: 60%" },
  { question: "¿Qué prefieres, no poder decir nunca más lo que piensas o tener que decir siempre lo que piensas?", option1: "No poder decir lo que pienso", option2: "Decir siempre lo que pienso", result1: "No poder decir lo que pienso: 50%", result2: "Decir siempre lo que pienso: 50%" },
  { question: "¿Qué prefieres, dejar o que te dejen?", option1: "Dejar", option2: "Que te dejen", result1: "Dejar: 40%", result2: "Que te dejen: 60%" },
  { question: "¿Qué prefieres, una pareja obsesionada contigo o una pareja que es infiel?", option1: "Pareja obsesionada", option2: "Pareja infiel", result1: "Pareja obsesionada: 25%", result2: "Pareja infiel: 75%" },
  { question: "¿Qué prefieres, tener los ojos del tamaño de un guisante o del tamaño de una pelota de béisbol?", option1: "Ojos tamaño guisante", option2: "Ojos tamaño pelota de béisbol", result1: "Ojos tamaño guisante: 55%", result2: "Ojos tamaño pelota de béisbol: 45%" },
  { question: "¿Qué prefieres, morir ahogado o morir quemado?", option1: "Morir ahogado", option2: "Morir quemado", result1: "Morir ahogado: 85%", result2: "Morir quemado: 15%" },
  { question: "¿Qué prefieres, ser devorado por un león o por un tiburón?", option1: "Ser devorado por un león", option2: "Ser devorado por un tiburón", result1: "Ser devorado por un león: 45%", result2: "Ser devorado por un tiburón: 55%" },
  { question: "¿Qué prefieres, estar muy obeso o estar muy delgado?", option1: "Estar muy obeso", option2: "Estar muy delgado", result1: "Estar muy obeso: 35%", result2: "Estar muy delgado: 65%" },
  { question: "¿Qué prefieres, que tu nariz nunca pare de crecer o que tus orejas nunca paren de crecer?", option1: "Nariz en constante crecimiento", option2: "Orejas en constante crecimiento", result1: "Nariz en constante crecimiento: 50%", result2: "Orejas en constante crecimiento: 50%" },
  { question: "¿Qué prefieres, cambiar tu mentalidad o cambiar tu físico?", option1: "Cambiar mentalidad", option2: "Cambiar físico", result1: "Cambiar mentalidad: 55%", result2: "Cambiar físico: 45%" },
  { question: "¿Qué prefieres, una araña gigante o una cobra diminuta?", option1: "Araña gigante", option2: "Cobra diminuta", result1: "Araña gigante: 40%", result2: "Cobra diminuta: 60%" },
  { question: "¿Qué prefieres, no poder sentarte nunca más o no poder tumbarte nunca más?", option1: "No poder sentarte", option2: "No poder tumbarte", result1: "No poder sentarte: 35%", result2: "No poder tumbarte: 65%" },
  { question: "¿Qué prefieres, no tener lengua o no tener genitales?", option1: "No tener lengua", option2: "No tener genitales", result1: "No tener lengua: 30%", result2: "No tener genitales: 70%" },
  { question: "¿Qué prefieres, vivir en la casa de tus sueños en un mal barrio o en una casa normal en un buen barrio?", option1: "Casa de sueños en mal barrio", option2: "Casa normal en buen barrio", result1: "Casa de sueños en mal barrio: 40%", result2: "Casa normal en buen barrio: 60%" },
  { question: "¿Qué prefieres, que nadie vaya a tu boda o que nadie vaya a tu funeral?", option1: "Nadie en la boda", option2: "Nadie en el funeral", result1: "Nadie en la boda: 55%", result2: "Nadie en el funeral: 45%" },
  { question: "¿Qué prefieres, no poder volver a ver ninguna película o no poder volver a escuchar música?", option1: "No ver películas", option2: "No escuchar música", result1: "No ver películas: 35%", result2: "No escuchar música: 65%" },
  { question: "¿Qué prefieres, ir corriendo siempre o caminar siempre muy lento?", option1: "Ir corriendo siempre", option2: "Caminar siempre muy lento", result1: "Ir corriendo siempre: 60%", result2: "Caminar siempre muy lento: 40%" },
  { question: "¿Qué prefieres, matar a cien cachorros de perro o matar a un bebé?", option1: "Matar a cien cachorros", option2: "Matar a un bebé", result1: "Matar a cien cachorros: 15%", result2: "Matar a un bebé: 85%" },
  { question: "¿Qué prefieres, tener que repetir la universidad o la secundaria?", option1: "Repetir la universidad", option2: "Repetir la secundaria", result1: "Repetir la universidad: 50%", result2: "Repetir la secundaria: 50%" },
  { question: "¿Qué prefieres, tener que cazar los animales que comas o no poder volver a comer carne nunca más?", option1: "Tener que cazar los animales", option2: "No poder comer carne nunca más", result1: "Tener que cazar los animales: 30%", result2: "No poder comer carne nunca más: 70%" },
  { question: "¿Qué prefieres, que tu nariz nunca pare de crecer o que tus orejas nunca paren de crecer?", option1: "Que tu nariz nunca pare de crecer", option2: "Que tus orejas nunca paren de crecer", result1: "Que tu nariz nunca pare de crecer: 45%", result2: "Que tus orejas nunca paren de crecer: 55%" },
  { question: "¿Qué prefieres, cambiar tu mentalidad o cambiar tu físico?", option1: "Cambiar tu mentalidad", option2: "Cambiar tu físico", result1: "Cambiar tu mentalidad: 55%", result2: "Cambiar tu físico: 45%" },
  { question: "¿Qué prefieres, una araña gigante o una cobra diminuta?", option1: "Araña gigante", option2: "Cobra diminuta", result1: "Araña gigante: 35%", result2: "Cobra diminuta: 65%" },
  { question: "¿Qué prefieres, no poder cerrar nunca ninguna puerta o no poder abrir ninguna puerta?", option1: "No poder cerrar nunca ninguna puerta", option2: "No poder abrir ninguna puerta", result1: "No poder cerrar nunca ninguna puerta: 60%", result2: "No poder abrir ninguna puerta: 40%" },
  { question: "¿Qué prefieres, no sentir los sabores salados nunca más o no sentir los sabores dulces nunca más?", option1: "No sentir sabores salados", option2: "No sentir sabores dulces", result1: "No sentir sabores salados: 50%", result2: "No sentir sabores dulces: 50%" },
  { question: "¿Qué prefieres, tener muchas citas aburridas o una sola que sea muy intenssa?", option1: "Tener muchas citas aburridas", option2: "Una sola cita muy intensa", result1: "Tener muchas citas aburridas: 40%", result2: "Una sola cita muy intensa: 60%" },
  { question: "¿Qué prefieres, tener mañana un bebé o no tenerlo hasta los 65?", option1: "Tener mañana un bebé", option2: "No tenerlo hasta los 65", result1: "Tener mañana un bebé: 70%", result2: "No tenerlo hasta los 65: 30%" },
  { question: "¿Qué prefieres, vivir 50 años con salud o 100 años estando gravemente enfermo?", option1: "Vivir 50 años con salud", option2: "Vivir 100 años estando gravemente enfermo", result1: "Vivir 50 años con salud: 80%", result2: "Vivir 100 años estando gravemente enfermo: 20%" },
  { question: "¿Qué prefieres, una pareja infiel o una pareja obsesiva?", option1: "Una pareja infiel", option2: "Una pareja obsesiva", result1: "Una pareja infiel: 50%", result2: "Una pareja obsesiva: 50%" },
  { question: "¿Qué prefieres, que tu madre pueda leerte la mente o que tu pareja pueda leerte la mente?", option1: "Que tu madre pueda leerte la mente", option2: "Que tu pareja pueda leerte la mente", result1: "Que tu madre pueda leerte la mente: 45%", result2: "Que tu pareja pueda leerte la mente: 55%" },
  { question: "¿Qué prefieres, no trabajar nunca más y tener poco dinero o trabajar mucho y ser rico?", option1: "No trabajar nunca más y tener poco dinero", option2: "Trabajar mucho y ser rico", result1: "No trabajar nunca más y tener poco dinero: 30%", result2: "Trabajar mucho y ser rico: 70%" },
  { question: "¿Qué prefieres, no poder beber cerveza nunca más o solo beber cerveza durante toda la vida?", option1: "No poder beber cerveza nunca más", option2: "Solo beber cerveza durante toda la vida", result1: "No poder beber cerveza nunca más: 55%", result2: "Solo beber cerveza durante toda la vida: 45%" },
  { question: "¿Qué prefieres, ser siempre un niño y no crecer jamás o haber nacido siendo adulto?", option1: "Ser siempre un niño", option2: "Haber nacido siendo adulto", result1: "Ser siempre un niño: 75%", result2: "Haber nacido siendo adulto: 25%" },
  { question: "¿Qué prefieres, eructar constantemente sin poderlo controlar o tirarte pedos constantemente sin poderlo controlar?", option1: "Eructar constantemente", option2: "Tirarte pedos constantemente", result1: "Eructar constantemente: 35%", result2: "Tirarte pedos constantemente: 65%" },
  { question: "¿Qué prefieres, no poder calmar nunca la sed o no poder calmar nunca el hambre?", option1: "No poder calmar nunca la sed", option2: "No poder calmar nunca el hambre", result1: "No poder calmar nunca la sed: 60%", result2: "No poder calmar nunca el hambre: 40%" },
  { question: "¿Qué prefieres, ser infiel o que te pongan los cuernos?", option1: "Ser infiel", option2: "Que te pongan los cuernos", result1: "Ser infiel: 40%", result2: "Que te pongan los cuernos: 60%" },
  { question: "¿Qué prefieres, comer heces o beber orina?", option1: "Comer heces", option2: "Beber orina", result1: "Comer heces: 10%", result2: "Beber orina: 90%" },
  { question: "¿Qué prefieres, perder un brazo o perder una pierna?", option1: "Perder un brazo", option2: "Perder una pierna", result1: "Perder un brazo: 50%", result2: "Perder una pierna: 50%" },
  { question: "¿Qué prefieres, vivir muchos momentos felices o vivir pocos momentos de mucha felicidad?", option1: "Vivir muchos momentos felices", option2: "Vivir pocos momentos de mucha felicidad", result1: "Vivir muchos momentos felices: 70%", result2: "Vivir pocos momentos de mucha felicidad: 30%" },
  { question: "¿Qué prefieres, no poder cambiarte de ropa nunca más o no ducharte jamás?", option1: "No poder cambiarte de ropa nunca más", option2: "No ducharte jamás", result1: "No poder cambiarte de ropa nunca más: 20%", result2: "No ducharte jamás: 80%" },
  { question: "¿Qué prefieres, tener un piso diminuto o tener una casa enorme pero no poder salir de ella?", option1: "Tener un piso diminuto", option2: "Tener una casa enorme pero no poder salir", result1: "Tener un piso diminuto: 65%", result2: "Tener una casa enorme pero no poder salir: 35%" },
  { question: "¿Qué prefieres, reencarnarte en un insecto o en un asesino?", option1: "Reencarnarte en un insecto", option2: "Reencarnarte en un asesino", result1: "Reencarnarte en un insecto: 80%", result2: "Reencarnarte en un asesino: 20%" },
  { question: "¿Qué prefieres, saber cuándo te está mintiendo alguien o poder mentir sin que nadie se entere?", option1: "Saber cuándo te está mintiendo alguien", option2: "Poder mentir sin que nadie se entere", result1: "Saber cuándo te está mintiendo alguien: 75%", result2: "Poder mentir sin que nadie se entere: 25%" },
  { question: "¿Qué prefieres, poder comer solo picante o no poder comer nada con sal?", option1: "Poder comer solo picante", option2: "No poder comer nada con sal", result1: "Poder comer solo picante: 30%", result2: "No poder comer nada con sal: 70%" },
  { question: "¿Qué prefieres, que te huela siempre mal el aliento o ser incapaz de vestir bien?", option1: "Que te huela siempre mal el aliento", option2: "Ser incapaz de vestir bien", result1: "Que te huela siempre mal el aliento: 20%", result2: "Ser incapaz de vestir bien: 80%" },
  { question: "¿Qué prefieres, tener muchos conocidos o solo un amigo?", option1: "Tener muchos conocidos", option2: "Solo un amigo", result1: "Tener muchos conocidos: 40%", result2: "Solo un amigo: 60%" },
  { question: "¿Qué prefieres, morir en un accidente de avión sin enterarte o sobrevivir con muchas secuelas?", option1: "Morir en un accidente de avión sin enterarte", option2: "Sobrevivir con muchas secuelas", result1: "Morir en un accidente de avión sin enterarte: 55%", result2: "Sobrevivir con muchas secuelas: 45%" },
  { question: "¿Qué prefieres, oler siempre mal y ser atractivo o ser terriblemente feo y oler bien?", option1: "Oler siempre mal y ser atractivo", option2: "Ser terriblemente feo y oler bien", result1: "Oler siempre mal y ser atractivo: 30%", result2: "Ser terriblemente feo y oler bien: 70%" },
  { question: "¿Qué prefieres, una vida eterna y aburrida o una vida mortal pero muy intensa?", option1: "Una vida eterna y aburrida", option2: "Una vida mortal pero muy intensa", result1: "Una vida eterna y aburrida: 35%", result2: "Una vida mortal pero muy intensa: 65%" },
  { question: "¿Qué prefieres, un gato que se comporta como un perro o un perro que se comporta como un gato?", option1: "Un gato que se comporta como un perro", option2: "Un perro que se comporta como un gato", result1: "Un gato que se comporta como un perro: 45%", result2: "Un perro que se comporta como un gato: 55%" },
  { question: "¿Qué prefieres, pasar siempre calor o pasar siempre frío?", option1: "Pasar siempre calor", option2: "Pasar siempre frío", result1: "Pasar siempre calor: 65%", result2: "Pasar siempre frío: 35%" },
  { question: "¿Qué prefieres, vivir en la casa de tus sueños en un muy mal barrio o vivir en una mala casa en el barrio de tus sueños?", option1: "Vivir en la casa de tus sueños en un mal barrio", option2: "Vivir en una mala casa en el barrio de tus sueños", result1: "Vivir en la casa de tus sueños en un mal barrio: 40%", result2: "Vivir en una mala casa en el barrio de tus sueños: 60%" },
  { question: "¿Qué prefieres, pillar a tus padres teniendo relaciones o que te pillen ellos a ti?", option1: "Pillar a tus padres teniendo relaciones", option2: "Que te pillen ellos a ti", result1: "Pillar a tus padres teniendo relaciones: 25%", result2: "Que te pillen ellos a ti: 75%" },
  { question: "¿Qué prefieres, fama sin dinero o dinero sin ser famoso?", option1: "Fama sin dinero", option2: "Dinero sin ser famoso", result1: "Fama sin dinero: 15%", result2: "Dinero sin ser famoso: 85%" },
  { question: "¿Qué prefieres, vivir eternamente siendo pobre o vivir poco tiempo pero siendo rico?", option1: "Vivir eternamente siendo pobre", option2: "Vivir poco tiempo pero siendo rico", result1: "Vivir eternamente siendo pobre: 30%", result2: "Vivir poco tiempo pero siendo rico: 70%" },
  { question: "¿Qué prefieres, acostarte con alguien que te cae mal y es atractivo o con alguien que te cae bien pero es feo?", option1: "Acostarte con alguien que te cae mal y es atractivo", option2: "Con alguien que te cae bien pero es feo", result1: "Acostarte con alguien que te cae mal y es atractivo: 55%", result2: "Con alguien que te cae bien pero es feo: 45%" },
  { question: "¿Qué prefieres, decidir lo que ocurrirá con tu futuro o modificar el pasado?", option1: "Decidir lo que ocurrirá con tu futuro", option2: "Modificar el pasado", result1: "Decidir lo que ocurrirá con tu futuro: 50%", result2: "Modificar el pasado: 50%" },
  { question: "¿Qué prefieres, que nadie vaya a tu boda o que nadie vaya a tu funeral?", option1: "Que nadie vaya a tu boda", option2: "Que nadie vaya a tu funeral", result1: "Que nadie vaya a tu boda: 40%", result2: "Que nadie vaya a tu funeral: 60%" },
  { question: "¿Qué prefieres, estar cubierto de piel o de escamas?", option1: "Estar cubierto de piel", option2: "De escamas", result1: "Estar cubierto de piel: 70%", result2: "De escamas: 30%" },
  { question: "¿Qué prefieres, trabajar solo o con más personas?", option1: "Trabajar solo", option2: "Con más personas", result1: "Trabajar solo: 50%", result2: "Con más personas: 50%" },
  { question: "¿Qué prefieres, no usar nunca más internet o que te amputen un dedo?", option1: "No usar nunca más internet", option2: "Que te amputen un dedo", result1: "No usar nunca más internet: 20%", result2: "Que te amputen un dedo: 80%" },
  { question: "¿Qué prefieres, ganar la lotería o vivir el doble?", option1: "Ganar la lotería", option2: "Vivir el doble", result1: "Ganar la lotería: 65%", result2: "Vivir el doble: 35%" },
  { question: "¿Qué prefieres, no ducharte en un mes o estar con la misma ropa un mes?", option1: "No ducharte en un mes", option2: "Estar con la misma ropa un mes", result1: "No ducharte en un mes: 30%", result2: "Estar con la misma ropa un mes: 70%" },
  { question: "¿Qué prefieres, el mar o la montaña?", option1: "El mar", option2: "La montaña", result1: "El mar: 60%", result2: "La montaña: 40%" },
  { question: "¿Qué prefieres, llevar ropa de verano en invierno o llevar ropa de invierno en verano?", option1: "Llevar ropa de verano en invierno", option2: "Llevar ropa de invierno en verano", result1: "Llevar ropa de verano en invierno: 45%", result2: "Llevar ropa de invierno en verano: 55%" },
  { question: "¿Qué prefieres, vivir saludablemente durante 50 años o vivir 100 años estando gravemente enfermo?", option1: "Vivir saludablemente durante 50 años", option2: "Vivir 100 años estando gravemente enfermo", result1: "Vivir saludablemente durante 50 años: 75%", result2: "Vivir 100 años estando gravemente enfermo: 25%" },
  { question: "¿Qué prefieres, ser incapaz de dar placer o de recibirlo?", option1: "Ser incapaz de dar placer", option2: "Ser incapaz de recibirlo", result1: "Ser incapaz de dar placer: 40%", result2: "Ser incapaz de recibirlo: 60%" },
  { question: "¿Qué prefieres, que tu nariz nunca pare de crecer o que tus orejas nunca paren de crecer?", option1: "Que tu nariz nunca pare de crecer", option2: "Que tus orejas nunca paren de crecer", result1: "Que tu nariz nunca pare de crecer: 55%", result2: "Que tus orejas nunca paren de crecer: 45%" },
  { question: "¿Qué prefieres, cambiar tu mentalidad o cambiar tu físico?", option1: "Cambiar tu mentalidad", option2: "Cambiar tu físico", result1: "Cambiar tu mentalidad: 70%", result2: "Cambiar tu físico: 30%" },
  { question: "¿Qué prefieres, una araña gigante o una cobra diminuta?", option1: "Una araña gigante", option2: "Una cobra diminuta", result1: "Una araña gigante: 35%", result2: "Una cobra diminuta: 65%" },
  { question: "¿Qué prefieres, no poder sentarte nunca más o no poder tumbarte nunca más?", option1: "No poder sentarte nunca más", option2: "No poder tumbarte nunca más", result1: "No poder sentarte nunca más: 45%", result2: "No poder tumbarte nunca más: 55%" },
  { question: "¿Qué prefieres, Tener una vida corta pero con lujos o no tenes lujos pero tener una vida larga?", option1: "Lujos y vida corta", option2: "Sin lujos y vida larga", result1: "Con lujos y vida corta: 20%", result2: "Sin lujos y vida larga: 80%" }

  
  
];

function selectOption(option) {
  userAnswers.push(option);
  showResults(option);
  
}

function showResults(option) {
  let questionEndTime = new Date().getTime();
  let questionResponseTime = questionEndTime - questionStartTime;
  responseTimes.push(questionResponseTime);

  const option1Elem = document.getElementById("option1");
  const option2Elem = document.getElementById("option2");

  option1Elem.innerText = questions[currentQuestionIndex].result1;
  option2Elem.innerText = questions[currentQuestionIndex].result2;

  
  option1Elem.classList.add('fade-in');
  option2Elem.classList.add('fade-in');

  setTimeout(() => {
        
        option1Elem.classList.remove('fade-in');
        option2Elem.classList.remove('fade-in');

     
        if (currentQuestionIndex + 1 < questions.length) {
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex); // Guardar en localStorage
            renderQuestion();
        } else {
            analyzeUserAnswers();
        }
    }, 2000);
}

function renderQuestion() {
  if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
      analyzeUserAnswers();
      return; 
  }

  if (currentQuestionIndex === 0) {
      startTime = new Date().getTime();
  }
  questionStartTime = new Date().getTime(); 

  const questionElem = document.getElementById("question");
  const option1Elem = document.getElementById("option1");
  const option2Elem = document.getElementById("option2");
  const questionCounterElem = document.getElementById("questionCounter");

  questionElem.innerText = questions[currentQuestionIndex].question;
  option1Elem.innerText = questions[currentQuestionIndex].option1;
  option1Elem.onclick = () => selectOption(1); 

  option2Elem.innerText = questions[currentQuestionIndex].option2;
  option2Elem.onclick = () => selectOption(2); 

  questionCounterElem.innerText = `Pregunta ${currentQuestionIndex + 1} de 120`;
}

if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
  currentQuestionIndex = 0;
  localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
}





function resetGame() {
  localStorage.removeItem('currentQuestionIndex');
  currentQuestionIndex = 0;
  renderQuestion();
}

function analyzeUserAnswers() {
  let majorityCount = 0;
  let minorityCount = 0;
  let difficultDecisionsCount = 0;

  let endTime = new Date().getTime();
  let totalTime = (endTime - startTime) / 1000; 
  document.getElementById("totalTimeStat").innerText = `Tiempo total de respuesta: ${totalTime} segundos.`;

  let minResponseTime = Math.min(...responseTimes);
  let fastestQuestionIndex = responseTimes.indexOf(minResponseTime);
  document.getElementById("fastestQuestionStat").innerText = `Respondiste más rápido a: "${questions[fastestQuestionIndex].question}" en ${minResponseTime / 1000} segundos.`;

  for (let i = 0; i < Math.min(userAnswers.length, questions.length); i++) {
    let result1Percentage = parseInt(questions[i].result1.split(":")[1]);
    let result2Percentage = parseInt(questions[i].result2.split(":")[1]);

    
    if ((result1Percentage > 45 && result1Percentage < 55) || (result2Percentage > 45 && result2Percentage < 55)) {
        difficultDecisionsCount++;
    }

    
    if (userAnswers[i] === 1) { 
        if (result1Percentage > 50) {
            majorityCount++;
            currentStreak++;
        } else {
            minorityCount++;
            currentStreak = 0;
        }
    } else {
        if (result2Percentage > 50) {
            majorityCount++;
            currentStreak++;
        } else {
            minorityCount++;
            currentStreak = 0;
        }
    }

    if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
    }
}

  const ctx = document.getElementById('resultsChart').getContext('2d');
  const chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Mayoría', 'Minoría', 'Decisiones difíciles'],
          datasets: [{
              label: 'Resultados',
              data: [majorityCount, minorityCount, difficultDecisionsCount],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 120
              }
          }
      }
  });


const randomQuestionIndex = Math.floor(Math.random() * questions.length);
const randomQuestion = questions[randomQuestionIndex];

  document.getElementById("globalStats").innerText = `Para la pregunta "${randomQuestion.question}", el ${randomQuestion.result1.split(":")[1]} eligió "${randomQuestion.option1}" y el ${randomQuestion.result2.split(":")[1]} eligió "${randomQuestion.option2}".`;

  document.getElementById("streakStat").innerText = `Tu racha más larga eligiendo con la mayoría/minoría fue de ${longestStreak} preguntas.`;

  document.getElementById("majorityStat").innerText = `Opinaste igual que la mayoría en ${majorityCount} preguntas.`;
  document.getElementById("minorityStat").innerText = `Opinaste igual que la minoría en ${minorityCount} preguntas.`;
  document.getElementById("difficultStat").innerText = `Tomaste ${difficultDecisionsCount} decisiones muy difíciles.`;


  document.getElementById("statsContainer").style.display = "block";
  document.getElementById("questionContainer").style.display = "none";
}

renderQuestion();


