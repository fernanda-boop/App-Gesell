const baseConocimiento = {
    etapas: {
        pre: {
            titulo: "📊 Etapa Pre-Operacional (2-6 años)",
            advertencia: "⚠️ ALTA SUGESTIONABILIDAD: Riesgo de contaminación elevado. El niño puede aceptar sugerencias para complacer.",
            cognitivas: ["Egocentrismo", "Confusión realidad/fantasía", "Centración en detalles", "Pensamiento transductivo", "Animismo"],
            memoria: ["Memoria episódica fragmentada", "Dificultad de monitoreo de fuente", "Recuerdo de 'Scripts'", "Vocabulario limitado"]
        },
        con: {
            titulo: "📊 Operaciones Concretas (7-11 años)",
            advertencia: "✅ MADUREZ CRECIENTE: Capacidad para relatar secuencias lógicas y cronológicas.",
            cognitivas: ["Lógica concreta", "Reversibilidad narrativa", "Descentración", "Clasificación jerárquica", "Diferencia clara realidad/fantasía"],
            memoria: ["Estrategias de recuperación", "Memoria operativa robusta", "Resistencia a la sugestión", "Precisión contextual"]
        },
        for: {
            titulo: "📊 Operaciones Formales (12+ años)",
            advertencia: "🧠 CAPACIDAD ADULTA: Pensamiento abstracto y metacognición profunda.",
            cognitivas: ["Razonamiento hipotético", "Abstracción", "Lógica proposicional", "Metacognición", "Análisis de consecuencias"],
            memoria: ["Memoria autobiográfica completa", "Resistencia crítica", "Detalles de estado mental", "Perspectiva social"]
        }
    },
    criterios: [
        { id: 1, n: "Estructura Lógica", k: ["porque", "entonces", "cuando", "pero"] },
        { id: 2, n: "Producción Inestructurada", k: ["me olvidé", "antes", "volviendo a"] },
        { id: 3, n: "Cantidad de Detalles", k: ["rojo", "grande", "mesa", "olor", "noche", "piso"] },
        { id: 4, n: "Engarce Contextual", k: ["escuela", "baño", "cocina", "tarea", "merienda"] },
        { id: 5, n: "Interacciones", k: ["hizo", "puso", "agarró", "sacó", "tocó"] },
        { id: 6, n: "Reproducción de Conversaciones", k: ["me dijo", "yo le dije", "estaban hablando", "gritó", "susurró"] },
        { id: 7, n: "Complicaciones Inesperadas", k: ["de golpe", "entró", "sonó", "paró"] },
        { id: 8, n: "Detalles Inusuales", k: ["raro", "extraño", "feo", "sorpresa"] },
        { id: 9, n: "Detalles Superficiales", k: ["tele", "pájaro", "ropa", "vaso"] },
        { id: 10, n: "Incomprensión de Detalles", k: ["no sé qué era", "cosa blanca", "líquido"] },
        { id: 11, n: "Asociaciones Externas", k: ["como en", "igual que", "parecido"] },
        { id: 12, n: "Relatos de Estado Mental", k: ["miedo", "asustado", "triste", "dolía", "lloré"] },
        { id: 13, n: "Atribución de Estado Autor", k: ["enojado", "malo", "reía", "apurado"] },
        { id: 14, n: "Correcciones Espontáneas", k: ["no, mejor", "me equivoqué", "era así"] },
        { id: 15, n: "Admisión Falta de Memoria", k: ["no sé", "no me acuerdo", "no vi"] },
        { id: 16, n: "Planteamiento de Dudas", k: ["creo que", "capaz", "parecía"] },
        { id: 17, n: "Auto-Desaprobación", k: ["mi culpa", "vergüenza", "tonto"] },
        { id: 18, n: "Perdón al Agresor", k: ["pobrecito", "lo quiero", "es bueno"] },
        { id: 19, n: "Detalles del Delito", k: ["secreto", "regalo", "juego", "amenaza"] }
    ]
};

// LÓGICA DE EDAD
document.getElementById('input-edad').addEventListener('input', (e) => {
    const edad = parseInt(e.target.value);
    const panel = document.getElementById('panel-teoria');
    if (!edad || edad < 2) { panel.classList.add('hidden'); return; }

    let info = edad <= 6 ? baseConocimiento.etapas.pre : (edad <= 11 ? baseConocimiento.etapas.con : baseConocimiento.etapas.for);
    panel.classList.remove('hidden');
    panel.innerHTML = `
        <div class="teoria-box">
            <div class="teoria-header">${info.titulo}</div>
            <div class="precaucion">${info.advertencia}</div>
            <div class="teoria-grid">
                <div><strong>Cognición:</strong> <ul>${info.cognitivas.map(i => `<li>${i}</li>`).join('')}</ul></div>
                <div><strong>Memoria:</strong> <ul>${info.memoria.map(i => `<li>${i}</li>`).join('')}</ul></div>
            </div>
        </div>`;
});

// MOTOR DE ANÁLISIS
document.getElementById('btn-analizar').onclick = () => {
    const texto = document.getElementById('output-texto').value.toLowerCase();
    const contenedor = document.getElementById('contenedor-sugerencias');
    contenedor.innerHTML = "<h3>🔍 Criterios Detectados</h3>";
    
    baseConocimiento.criterios.forEach(c => {
        const detectado = c.k.some(palabra => texto.includes(palabra));
        const div = document.createElement('div');
        div.className = `criterio-card ${detectado ? 'detectado' : ''}`;
        div.innerHTML = `<strong>Criterio ${c.id}: ${c.n}</strong> ${detectado ? '✅' : ''}`;
        contenedor.appendChild(div);
    });
};