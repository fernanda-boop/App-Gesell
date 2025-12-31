// 1. BASE DE DATOS TEÓRICA
const teoriaBCBA = {
    etapas: {
        pre: { titulo: "Etapa Pre-Operacional (2-6 años)", memoria: "Memoria fragmentada, alta sugestionabilidad." },
        con: { titulo: "Operaciones Concretas (7-11 años)", memoria: "Organización temporal lógica, distingue realidad de fantasía." },
        for: { titulo: "Operaciones Formales (12+ años)", memoria: "Capacidad narrativa completa, pensamiento abstracto." }
    },
    criterios: [
        { id: 1, nombre: "Estructura Lógica", desc: "El relato es coherente." },
        { id: 15, nombre: "Admisión de Falta de Memoria", desc: "Admite no recordar detalles espontáneamente." }
    ]
};

// 2. LÓGICA DEL PANEL DE EDAD (Corrección de llaves)
const inputEdad = document.getElementById('input-edad');
const panelTeoria = document.getElementById('panel-teoria');

inputEdad.addEventListener('input', () => {
    const edad = parseInt(inputEdad.value);

    if (!edad) {
        panelTeoria.classList.add('hidden');
        return;
    }

    panelTeoria.classList.remove('hidden');
    let info = edad <= 6 ? teoriaBCBA.etapas.pre : (edad <= 11 ? teoriaBCBA.etapas.con : teoriaBCBA.etapas.for);

    panelTeoria.innerHTML = `
        <h3>${info.titulo}</h3>
        <p><strong>Consideración de Memoria:</strong> ${info.memoria}</p>
    `;
});

// 3. LÓGICA DEL MICRÓFONO
const btnMic = document.getElementById('btn-mic');
const outputTexto = document.getElementById('output-texto');
const micStatus = document.getElementById('mic-status');
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (Recognition) {
    const rec = new Recognition();
    rec.lang = 'es-AR';
    rec.continuous = true;

    btnMic.onclick = () => {
        if (btnMic.textContent.includes("Iniciar")) {
            rec.start();
            btnMic.textContent = "🛑 Detener Dictado";
            micStatus.textContent = "Escuchando testimonio...";
        } else {
            rec.stop();
            btnMic.textContent = "🎤 Iniciar Dictado";
            micStatus.textContent = "Micrófono apagado";
        }
    };

    rec.onresult = (e) => {
        const result = e.results[e.results.length - 1][0].transcript;
        outputTexto.value += " " + result;
    };
}

// 4. GENERAR INFORME
document.getElementById('btn-generar').onclick = () => {
    const nombre = document.getElementById('nombre-nino').value;
    const perito = document.getElementById('evaluador').value;
    const textoFinal = `INFORME PERICIAL - UFI ANIVI\n\nEvaluado: ${nombre}\nPerito: ${perito}\n\nConclusión: El relato analizado presenta indicadores de credibilidad...`;
    document.getElementById('conclusion-textarea').value = textoFinal;
};