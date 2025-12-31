const baseConocimiento = {
    etapas: {
        pre: {
            titulo: "📊 Etapa del Desarrollo: Pre-Operacional (2-6 años)",
            advertencia: "⚠️ PRECAUCIÓN: Alta sugestionabilidad. Evaluar cuidadosamente técnicas de entrevista. Muchos criterios CBCA tienen aplicabilidad limitada.",
            cognitivas: [
                "Pensamiento egocéntrico (dificultad para tomar perspectiva del otro).",
                "Confusión entre realidad y fantasía (pensamiento mágico).",
                "Centración (foco en un solo aspecto llamativo, ignora el resto).",
                "Lenguaje en desarrollo con vocabulario limitado para describir actos.",
                "Noción temporal difusa (uso de 'antes' o 'después' sin precisión)."
            ],
            memoria: [
                "Memoria episódica en desarrollo (recuerdos de eventos únicos).",
                "Sugestionabilidad alta ante preguntas cerradas o presiones.",
                "Dificultad para distinguir la fuente de información (monitoreo de fuente).",
                "Los recuerdos pueden ser fragmentados y carecer de orden cronológico.",
                "La información central se recuerda mejor que los detalles periféricos."
            ]
        },
        con: {
            titulo: "📊 Etapa de Operaciones Concretas (7-11 años)",
            advertencia: "✅ MADUREZ EN AUMENTO: Capacidad para organizar relatos cronológicamente.",
            cognitivas: [
                "Pensamiento lógico aplicado a situaciones físicas reales.",
                "Reversibilidad (puede relatar los hechos desde el final al principio).",
                "Descentración (capacidad de considerar múltiples aspectos).",
                "Clasificación jerárquica y comprensión de intenciones ajenas.",
                "Diferencia clara entre realidad y fantasía."
            ],
            memoria: [
                "Uso de estrategias de recuperación activa de recuerdos.",
                "Memoria operativa robusta que permite mantener el hilo narrativo.",
                "Menor sugestionabilidad frente a la autoridad.",
                "Precisión descriptiva aumentada en lugares y personas.",
                "Capacidad para proporcionar relatos extensos y estructurados."
            ]
        },
        for: {
            titulo: "📊 Etapa de Operaciones Formales (12+ años)",
            advertencia: "🧠 CAPACIDAD ADULTA: Pensamiento abstracto y metacognición.",
            cognitivas: [
                "Razonamiento hipotético-deductivo (analiza consecuencias).",
                "Abstracción (entiende conceptos como justicia o traición).",
                "Lógica proposicional y evaluación crítica de su discurso.",
                "Metacognición (sabe qué recuerda con certeza).",
                "Análisis de consecuencias sociales de su testimonio."
            ],
            memoria: [
                "Resistencia crítica a la sugestión del entrevistador.",
                "Memoria autobiográfica completa con matices emocionales.",
                "Inclusión de detalles de estado mental propio y ajeno.",
                "Perspectiva social y del entorno en la descripción.",
                "Metamemoria (reflexión sobre cómo recuerda)."
            ]
        }
    },
    criterios: [
        { id: 1, n: "Estructura Lógica", k: ["porque", "entonces", "cuando", "pero"] },
        { id: 2, n: "Producción Inestructurada", k: ["me olvidé", "antes", "volviendo a"] },
        { id: 3, n: "Cantidad de Detalles", k: ["rojo", "grande", "mesa", "olor", "noche", "piso", "cocina"] },
        { id: 4, n: "Engarce Contextual", k: ["escuela", "tarea", "merienda", "dibujitos"] },
        { id: 5, n: "Interacciones", k: ["hizo", "puso", "agarró", "sacó", "tocó"] },
        { id: 6, n: "Reproducción de Conversaciones", k: ["me dijo", "yo le dije", "estaban hablando", "preguntó"] },
        { id: 7, n: "Complicaciones Inesperadas", k: ["de golpe", "entró", "sonó", "paró"] },
        { id: 8, n: "Detalles Inusuales", k: ["raro", "extraño", "feo", "asqueroso"] },
        { id: 9, n: "Detalles Superficiales", k: ["tele", "pájaro", "ropa", "vaso"] },
        { id: 10, n: "Incomprensión de Detalles", k: ["no sé qué era", "cosa blanca", "líquido"] },
        { id: 11, n: "Asociaciones Externas", k: ["como en la tele", "igual que mi papá"] },
        { id: 12, n: "Relatos de Estado Mental", k: ["miedo", "asustado", "triste", "dolía", "lloré", "asco"] },
        { id: 13, n: "Atribución de Estado Autor", k: ["enojado", "malo", "reía", "apurado"] },
        { id: 14, n: "Correcciones Espontáneas", k: ["no, mejor", "me equivoqué", "era así"] },
        { id: 15, n: "Admisión Falta de Memoria", k: ["no sé", "no me acuerdo", "no vi"] },
        { id: 16, n: "Planteamiento de Dudas", k: ["creo que", "capaz", "parecía"] },
        { id: 17, n: "Auto-Desaprobación", k: ["mi culpa", "vergüenza", "tonto"] },
        { id: 18, n: "Perdón al Agresor", k: ["pobrecito", "lo quiero", "es bueno"] },
        { id: 19, n: "Detalles del Delito", k: ["secreto", "regalo", "juego", "amenaza"] }
    ]
};

// --- LOGICA DE TRANSCRIPCIÓN EN TIEMPO REAL ---
const btnMic = document.getElementById('btn-mic');
const outputTexto = document.getElementById('output-texto');
const statusMic = document.getElementById('mic-status');

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (Recognition) {
    const recognition = new Recognition();
    recognition.lang = 'es-AR';
    recognition.continuous = true;
    recognition.interimResults = true; // PERMITE VER LA TRANSCRIPCIÓN MIENTRAS ESCUCHA

    btnMic.onclick = () => {
        if (!btnMic.classList.contains('grabando')) {
            recognition.start();
        } else {
            recognition.stop();
        }
    };

    recognition.onstart = () => {
        btnMic.classList.add('grabando');
        btnMic.innerHTML = "⏸️ Pausar Escucha";
        statusMic.innerText = "Escuchando parlante / entrevista...";
    };

    recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + '. ';
            }
        }
        outputTexto.value += finalTranscript;
        // Auto-scroll al final del texto
        outputTexto.scrollTop = outputTexto.scrollHeight;
    };

    recognition.onend = () => {
        btnMic.classList.remove('grabando');
        btnMic.innerHTML = "🎤 Iniciar Transcripción";
        statusMic.innerText = "Escucha detenida.";
    };
}

// --- LOGICA DE EDAD (MANUAL COMPLETO) ---
document.getElementById('input-edad').addEventListener('input', (e) => {
    const edad = parseInt(e.target.value);
    const panel = document.getElementById('panel-teoria');
    if (!edad || edad < 2) return;

    let info = edad <= 6 ? baseConocimiento.etapas.pre : (edad <= 11 ? baseConocimiento.etapas.con : baseConocimiento.etapas.for);
    panel.classList.remove('hidden');
    panel.innerHTML = `
        <div class="teoria-box">
            <div class="teoria-header">${info.titulo}</div>
            <div class="precaucion">${info.advertencia}</div>
            <div class="teoria-grid">
                <div><strong>🧠 Características Cognitivas:</strong> <ul>${info.cognitivas.map(i => `<li>${i}</li>`).join('')}</ul></div>
                <div><strong>💾 Consideraciones de Memoria:</strong> <ul>${info.memoria.map(i => `<li>${i}</li>`).join('')}</ul></div>
            </div>
        </div>`;
});

// --- ANÁLISIS CBCA CON PROBABILIDAD ---
document.getElementById('btn-analizar').onclick = () => {
    const texto = outputTexto.value.toLowerCase();
    const contenedor = document.getElementById('contenedor-sugerencias');
    contenedor.innerHTML = "";
    
    let detectados = 0;
    baseConocimiento.criterios.forEach(c => {
        const found = c.k.some(k => texto.includes(k));
        if (found) detectados++;
        const div = document.createElement('div');
        div.className = `criterio-card ${found ? 'detectado' : ''}`;
        div.innerHTML = `<strong>Criterio ${c.id}: ${c.n}</strong> ${found ? '✅' : ''}`;
        contenedor.appendChild(div);
    });

    const prob = Math.round((detectados / 19) * 100);
    const header = `<div class="card" style="border-top:8px solid #4f46e5; text-align:center;">
        <h2 style="color:#4f46e5">Probabilidad de Veracidad: ${prob}%</h2>
        <p>${detectados} criterios de 19 detectados.</p>
    </div>`;
    contenedor.insertAdjacentHTML('afterbegin', header);
};
