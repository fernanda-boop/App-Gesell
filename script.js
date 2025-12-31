const baseConocimiento = {
    etapas: {
        pre: {
            titulo: "📊 Etapa Pre-Operacional (2-6 años)",
            advertencia: "⚠️ ALTA SUGESTIONABILIDAD: Riesgo de contaminación elevado. El niño puede aceptar sugerencias para complacer.",
            cognitivas: ["Pensamiento egocéntrico", "Confusión realidad/fantasía", "Centración (foco en un aspecto)", "Lenguaje en desarrollo", "Noción temporal difusa"],
            memoria: ["Memoria episódica en desarrollo", "Sugestionabilidad alta", "Dificultad monitoreo de fuente", "Recuerdos fragmentados", "Información central mejor recordada"]
        },
        con: {
            titulo: "📊 Operaciones Concretas (7-11 años)",
            advertencia: "✅ MADUREZ CRECIENTE: Capacidad para organizar relatos cronológicamente y diferenciar fantasía.",
            cognitivas: ["Lógica concreta", "Reversibilidad narrativa", "Descentración", "Clasificación jerárquica", "Menor egocentrismo"],
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
        { id: 1, n: "Estructura Lógica", k: ["porque", "entonces", "cuando", "pero"] },
        { id: 2, n: "Producción Inestructurada", k: ["me olvidé", "antes", "volviendo a"] },
        { id: 3, n: "Cantidad de Detalles", k: ["rojo", "grande", "mesa", "olor", "noche", "piso", "cocina", "baño"] },
        { id: 4, n: "Engarce Contextual", k: ["escuela", "tarea", "merienda", "dibujitos", "jugar"] },
        { id: 5, n: "Interacciones", k: ["hizo", "puso", "agarró", "sacó", "tocó"] },
        { id: 6, n: "Conversaciones", k: ["me dijo", "yo le dije", "estaban hablando", "gritó", "susurró"] },
        { id: 7, n: "Complicaciones Inesperadas", k: ["de golpe", "entró", "sonó", "paró"] },
        { id: 8, n: "Detalles Inusuales", k: ["raro", "extraño", "feo", "sorpresa"] },
        { id: 9, n: "Detalles Superficiales", k: ["tele", "pájaro", "ropa", "vaso"] },
        { id: 10, n: "Incomprensión de Detalles", k: ["no sé qué era", "cosa blanca", "líquido"] },
        { id: 11, n: "Asociaciones Externas", k: ["como en", "igual que", "parecido"] },
        { id: 12, n: "Relatos de Estado Mental", k: ["miedo", "asustado", "triste", "dolía", "lloré", "nervioso"] },
        { id: 13, n: "Atribución de Estado Autor", k: ["enojado", "malo", "reía", "apurado"] },
        { id: 14, n: "Correcciones Espontáneas", k: ["no, mejor", "me equivoqué", "era así"] },
        { id: 15, n: "Admisión Falta de Memoria", k: ["no sé", "no me acuerdo", "no vi"] },
        { id: 16, n: "Planteamiento de Dudas", k: ["creo que", "capaz", "parecía"] },
        { id: 17, n: "Auto-Desaprobación", k: ["mi culpa", "vergüenza", "tonto"] },
        { id: 18, n: "Perdón al Agresor", k: ["pobrecito", "lo quiero", "es bueno"] },
        { id: 19, n: "Detalles del Delito", k: ["secreto", "regalo", "juego", "amenaza"] }
    ]
};

// --- MANEJO DE EDAD Y TEORÍA ---
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
                <div><strong>🧠 Características Cognitivas:</strong> <ul>${info.cognitivas.map(i => `<li>${i}</li>`).join('')}</ul></div>
                <div><strong>💾 Consideraciones de Memoria:</strong> <ul>${info.memoria.map(i => `<li>${i}</li>`).join('')}</ul></div>
            </div>
        </div>`;
});

// --- MOTOR DE DICTADO CON PAUSA ---
const btnMic = document.getElementById('btn-mic');
const statusMic = document.getElementById('mic-status');
const outputTexto = document.getElementById('output-texto');
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Recognition) {
    const recognition = new Recognition();
    recognition.lang = 'es-AR';
    recognition.continuous = true;
    recognition.interimResults = false;

    btnMic.onclick = () => {
        if (!btnMic.classList.contains('grabando')) {
            recognition.start();
        } else {
            recognition.stop();
        }
    };

    recognition.onstart = () => {
        btnMic.classList.add('grabando');
        btnMic.innerHTML = "⏸️ Pausar Dictado";
        btnMic.style.backgroundColor = "#f59e0b"; 
        statusMic.innerText = "Escuchando voz...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        outputTexto.value += (outputTexto.value ? " " : "") + transcript + ".";
    };

    recognition.onend = () => {
        btnMic.classList.remove('grabando');
        btnMic.innerHTML = "🎤 Iniciar Dictado";
        btnMic.style.backgroundColor = "#10b981";
        statusMic.innerText = "Micrófono en pausa";
    };
}

// --- MOTOR DE ANÁLISIS Y PROBABILIDAD ---
document.getElementById('btn-analizar').onclick = () => {
    const texto = outputTexto.value.toLowerCase();
    const contenedor = document.getElementById('contenedor-sugerencias');
    contenedor.innerHTML = "<h3>🔍 Criterios Detectados</h3>";
    
    let detectados = 0;
    baseConocimiento.criterios.forEach(c => {
        const isDetected = c.k.some(palabra => texto.includes(palabra));
        if(isDetected) detectados++;
        const div = document.createElement('div');
        div.className = `criterio-card ${isDetected ? 'detectado' : ''}`;
        div.innerHTML = `<strong>Criterio ${c.id}: ${c.n}</strong> ${isDetected ? '✅' : ''}`;
        contenedor.appendChild(div);
    });

    const porcentaje = Math.round((detectados / 19) * 100);
    const color = porcentaje > 50 ? "#10b981" : "#f59e0b";
    
    contenedor.insertAdjacentHTML('afterbegin', `
        <div class="card" style="border-top: 8px solid ${color}; text-align:center;">
            <h2 style="color:${color}; margin:0;">Probabilidad de Veracidad: ${porcentaje}%</h2>
            <p style="margin:5px 0;">${detectados} criterios de 19 identificados en el relato.</p>
        </div>
    `);
};
document.getElementById('btn-analizar').onclick = () => {
    const texto = document.getElementById('output-texto').value.toLowerCase();
    const contenedor = document.getElementById('contenedor-sugerencias');
    contenedor.innerHTML = "<h3>🔍 Análisis de Credibilidad (CBCA)</h3>";
    
    let detectadosCount = 0;
    let listaHitos = [];

    baseConocimiento.criterios.forEach(c => {
        const encontrado = c.k.some(palabra => texto.includes(palabra));
        if (encontrado) {
            detectadosCount++;
            listaHitos.push(c.n);
        }

        const div = document.createElement('div');
        div.className = `criterio-card ${encontrado ? 'detectado' : ''}`;
        div.innerHTML = `<strong>Criterio ${c.id}: ${c.n}</strong> ${encontrado ? '✅' : ''}`;
        contenedor.appendChild(div);
    });

    // --- CÁLCULO DE PROBABILIDAD PERICIAL ---
    const porcentaje = Math.round((detectadosCount / 19) * 100);
    let interpretacion = "";
    let colorFinal = "";

    if (porcentaje > 70) { interpretacion = "Alta Consistencia de Realidad"; colorFinal = "#10b981"; }
    else if (porcentaje > 40) { interpretacion = "Consistencia Moderada"; colorFinal = "#f59e0b"; }
    else { interpretacion = "Baja Consistencia (Requiere análisis cualitativo profundo)"; colorFinal = "#ef4444"; }

    // Mostrar el cuadro de probabilidad arriba de los criterios
    contenedor.insertAdjacentHTML('afterbegin', `
        <div class="card" style="border-top: 10px solid ${colorFinal}; padding: 20px; text-align: center;">
            <h2 style="margin:0; color:${colorFinal};">Probabilidad de Veracidad: ${porcentaje}%</h2>
            <p><strong>Interpretación:</strong> ${interpretacion}</p>
        </div>
    `);

    // Actualizar Informe Pericial Final Automáticamente
    document.getElementById('conclusion-textarea').value = 
        `INFORME PRELIMINAR DE EVALUACIÓN CBCA\n` +
        `------------------------------------\n` +
        `Criterios Identificados: ${detectadosCount} de 19\n` +
        `Porcentaje de Consistencia: ${porcentaje}%\n\n` +
        `Indicadores detectados: ${listaHitos.join(", ")}.`;
};