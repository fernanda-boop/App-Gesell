// --- CONFIGURACIÓN DE TEORÍA (PIAGET COMPLETO) ---
const baseConocimiento = {
    etapas: {
        pre: {
            titulo: "📊 Etapa del Desarrollo: Pre-Operacional (2-6 años)",
            advertencia: "⚠️ PRECAUCIÓN: Alta sugestionabilidad. Evaluar cuidadosamente técnicas de entrevista.",
            cognitivas: [
                "Pensamiento egocéntrico (dificultad para tomar perspectiva del otro).",
                "Confusión entre realidad y fantasía (pensamiento mágico).",
                "Centración (foco en un solo aspecto llamativo, ignora el resto).",
                "Lenguaje en desarrollo con vocabulario limitado.",
                "Noción temporal difusa (uso de 'antes' o 'después')."
            ],
            memoria: [
                "Memoria episódica en desarrollo (recuerdos de eventos únicos).",
                "Sugestionabilidad alta ante preguntas cerradas.",
                "Dificultad para distinguir la fuente de información.",
                "Recuerdos fragmentados y sin orden cronológico.",
                "Información central mejor recordada que los detalles periféricos."
            ]
        },
        con: {
            titulo: "📊 Etapa de Operaciones Concretas (7-11 años)",
            advertencia: "✅ MADUREZ EN AUMENTO: Capacidad para organizar relatos cronológicamente.",
            cognitivas: ["Lógica concreta", "Reversibilidad narrativa", "Descentración", "Clasificación jerárquica", "Diferencia realidad/fantasía"],
            memoria: ["Estrategias de recuperación", "Memoria operativa robusta", "Menor sugestionabilidad", "Precisión descriptiva", "Relatos estructurados"]
        },
        for: {
            titulo: "📊 Etapa de Operaciones Formales (12+ años)",
            advertencia: "🧠 CAPACIDAD ADULTA: Pensamiento abstracto y metacognición.",
            cognitivas: ["Razonamiento hipotético", "Abstracción", "Lógica proposicional", "Metacognición", "Análisis de consecuencias"],
            memoria: ["Resistencia crítica", "Memoria autobiográfica completa", "Detalles de estado mental", "Perspectiva social", "Metamemoria"]
        }
    },
    criterios: [
        { id: 1, n: "Estructura Lógica", k: ["porque", "entonces", "cuando", "pero"] },
        { id: 6, n: "Conversaciones", k: ["me dijo", "yo le dije", "estaban hablando"] },
        { id: 12, n: "Estado Mental", k: ["miedo", "asustado", "triste", "dolía", "lloré"] },
        { id: 15, n: "Falta de Memoria", k: ["no sé", "no me acuerdo", "no vi"] }
        // ... (el resto de los 19 criterios se mantienen igual)
    ]
};

// --- FUNCIÓN PARA MOSTRAR TEORÍA (SIN ROMPER EL MIC) ---
document.getElementById('input-edad').addEventListener('input', (e) => {
    const edad = parseInt(e.target.value);
    const panel = document.getElementById('panel-teoria');
    
    if (!edad || edad < 2) {
        panel.classList.add('hidden');
        return;
    }

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

// --- MOTOR DE TRANSCRIPCIÓN (AISLADO Y ROBUSTO) ---
const btnMic = document.getElementById('btn-mic');
const outputTexto = document.getElementById('output-texto');
const statusMic = document.getElementById('mic-status');

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Recognition) {
    const recognition = new Recognition();
    recognition.lang = 'es-AR';
    recognition.continuous = true;
    recognition.interimResults = true;

    btnMic.onclick = function() {
        if (!this.classList.contains('grabando')) {
            recognition.start();
        } else {
            recognition.stop();
        }
    };

    recognition.onstart = () => {
        btnMic.classList.add('grabando');
        btnMic.innerHTML = "⏸️ Pausar Escucha";
        statusMic.innerText = "Transcribiendo entrevista...";
    };

    recognition.onresult = (event) => {
        let finalText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalText += event.results[i][0].transcript + '. ';
            }
        }
        if (finalText) {
            outputTexto.value += finalText;
            outputTexto.scrollTop = outputTexto.scrollHeight;
        }
    };

    recognition.onend = () => {
        btnMic.classList.remove('grabando');
        btnMic.innerHTML = "🎤 Iniciar Dictado";
        statusMic.innerText = "Micrófono en espera";
    };

    recognition.onerror = (e) => {
        console.error("Error:", e.error);
        statusMic.innerText = "Error: " + e.error;
    };
}
