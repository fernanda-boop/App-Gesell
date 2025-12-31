const baseConocimiento = {
    etapas: {
        pre: {
            titulo: "📊 Etapa Pre-Operacional (2-6 años)",
            advertencia: "⚠️ ALTA SUGESTIONABILIDAD: Riesgo de contaminación elevado. El niño puede aceptar sugerencias para complacer.",
            cognitivas: ["Egocentrismo", "Confusión realidad/fantasía", "Centración en detalles", "Pensamiento transductivo", "Animismo"],
            memoria: ["Memoria episódica fragmentada", "Dificultad de monitoreo de fuente", "Recuerdo de 'Scripts'", "Vocabulario limitado", "Focalización en lo central"]
        },
        con: {
            titulo: "📊 Operaciones Concretas (7-11 años)",
            advertencia: "✅ MADUREZ CRECIENTE: Capacidad para relatar secuencias lógicas y cronológicas.",
            cognitivas: ["Lógica concreta", "Reversibilidad narrativa", "Descentración", "Clasificación jerárquica", "Diferencia realidad/fantasía"],
            memoria: ["Estrategias de recuperación", "Memoria operativa robusta", "Resistencia a la sugestión", "Precisión contextual", "Relato estructurado"]
        },
        for: {
            titulo: "📊 Operaciones Formales (12+ años)",
            advertencia: "🧠 CAPACIDAD ADULTA: Pensamiento abstracto y metacognición profunda.",
            cognitivas: ["Razonamiento hipotético", "Abstracción", "Lógica proposicional", "Metacognición", "Análisis de consecuencias"],
            memoria: ["Memoria autobiográfica completa", "Resistencia crítica", "Detalles de estado mental", "Perspectiva social", "Metamemoria"]
        }
    },
    criterios: [
        { id: 1, n: "Estructura Lógica", k: ["porque", "entonces", "después", "cuando", "pero"] },
        { id: 2, n: "Producción Inestructurada", k: ["me olvidé", "antes de eso", "volviendo a", "me acordé"] },
        { id: 3, n: "Cantidad de Detalles", k: ["rojo", "grande", "mesa", "olor", "noche", "piso", "cocina", "baño", "cama", "ropa"] },
        { id: 4, n: "Engarce Contextual", k: ["escuela", "tarea", "merienda", "dibujitos", "jugar", "cumpleaños", "bañando"] },
        { id: 5, n: "Interacciones", k: ["hizo", "puso", "agarró", "sacó", "tocó", "me llevó", "se sentó"] },
        { id: 6, n: "Conversaciones", k: ["me dijo", "yo le dije", "estaban hablando", "preguntó", "gritó", "susurró"] },
        { id: 7, n: "Complicaciones Inesperadas", k: ["de golpe", "entró", "sonó", "paró", "se asustó", "justo ahí"] },
        { id: 8, n: "Detalles Inusuales", k: ["raro", "extraño", "feo", "asqueroso", "sorpresa"] },
        { id: 9, n: "Detalles Superficiales", k: ["tele", "pájaro", "ventana", "vaso", "radio", "cuadro"] },
        { id: 10, n: "Incomprensión de Detalles", k: ["no sé qué era", "cosa blanca", "líquido", "me dolió", "le salía"] },
        { id: 11, n: "Asociaciones Externas", k: ["como en la tele", "igual que mi papá", "parecido a", "como en el video"] },
        { id: 12, n: "Estado Mental Propio", k: ["miedo", "asustado", "triste", "lloré", "nervioso", "asco", "me dolía"] },
        { id: 13, n: "Estado Mental Autor", k: ["enojado", "malo", "reía", "apurado", "transpiraba", "nervioso el"] },
        { id: 14, n: "Correcciones Espontáneas", k: ["no, mejor", "me equivoqué", "era así", "en realidad", "no, espera"] },
        { id: 15, n: "Admisión Falta de Memoria", k: ["no sé", "no me acuerdo", "no vi", "estaba oscuro", "hace mucho"] },
        { id: 16, n: "Planteamiento de Dudas", k: ["creo que", "capaz", "parecía", "no estoy seguro", "tal vez"] },
        { id: 17, n: "Auto-Desaprobación", k: ["mi culpa", "vergüenza", "tonto", "me porté mal", "no debía"] },
        { id: 18, n: "Perdón al Agresor", k: ["pobrecito", "lo quiero", "es bueno", "no quería hacerlo", "me quiere"] },
        { id: 19, n: "Detalles del Delito", k: ["secreto", "regalo", "juego", "amenaza", "caramelos", "plata"] }
    ]
};

// --- MOTOR DE TRANSCRIPCIÓN (INTERIM) ---
const btnMic = document.getElementById('btn-mic');
const outputTexto = document.getElementById('output-texto');
const statusMic = document.getElementById('mic-status');
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Recognition) {
    const recognition = new Recognition();
    recognition.lang = 'es-AR';
    recognition.continuous = true;
    recognition.interimResults = true;

    btnMic.onclick = () => {
        if (!btnMic.classList.contains('grabando')) {
            recognition.start();
        } else {
            recognition.stop();
        }
    };

    recognition.onstart = () => {
        btnMic.classList.add('grabando');
        btnMic.innerHTML = "🛑 Detener Escucha";
        statusMic.innerText = "Escuchando y transcribiendo...";
    };

    recognition.onresult = (event) => {
        let finalBatch = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalBatch += event.results[i][0].transcript + '. ';
            }
        }
        outputTexto.value += finalBatch;
        outputTexto.scrollTop = outputTexto.scrollHeight;
    };

    recognition.onend = () => {
        btnMic.classList.remove('grabando');
        btnMic.innerHTML = "🎤 Iniciar Transcripción";
        statusMic.innerText = "Micrófono apagado.";
    };
}

// --- LOGICA DE EDAD ---
document.getElementById('input-edad').addEventListener('input', (e) => {
    const edad = parseInt(e.target.value);
    const panel = document.getElementById('panel-teoria');
    if (!edad || edad < 2) { panel.classList.add('hidden'); return; }

    let info = edad <= 6 ? baseConocimiento.etapas.pre : (edad <= 11 ? baseConocimiento.etapas.con : baseConocimiento.etapas.for);
    panel.classList.remove('hidden');
    panel.innerHTML = `
        <div class="teoria-box">
            <div class="teoria-header">${info.titulo}</div>
            <div class="teoria-grid">
                <div><strong>Cognición:</strong> <ul>${info.cognitivas.map(i => `<li>${i}</li>`).join('')}</ul></div>
                <div><strong>Memoria:</strong> <ul>${info.memoria.map(i => `<li>${i}</li>`).join('')}</ul></div>
            </div>
        </div>`;
});

// --- ANÁLISIS COMPLETO ---
document.getElementById('btn-analizar').onclick = () => {
    const texto = outputTexto.value.toLowerCase();
    const contenedor = document.getElementById('contenedor-sugerencias');
    contenedor.classList.remove('hidden');
    contenedor.innerHTML = "<h3>Resultados CBCA (19 Criterios)</h3>";
    
    let detectados = 0;
    let listaEncontrados = [];

    baseConocimiento.criterios.forEach(c => {
        const found = c.k.some(palabra => texto.includes(palabra));
        if (found) {
            detectados++;
            listaEncontrados.push(c.n);
        }
        const div = document.createElement('div');
        div.className = `criterio-card ${found ? 'detectado' : ''}`;
        div.innerHTML = `<strong>${c.id}. ${c.n}</strong> ${found ? '✅' : ''}`;
        contenedor.appendChild(div);
    });

    const porcentaje = Math.round((detectados / 19) * 100);
    document.getElementById('conclusion-textarea').value = 
        `ANÁLISIS DE VERACIDAD\n` +
        `Criterios hallados: ${detectados} de 19\n` +
        `Índice de realidad: ${porcentaje}%\n\n` +
        `Detalle: ${listaEncontrados.join(", ")}.`;
};
