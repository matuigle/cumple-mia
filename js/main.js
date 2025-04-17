// js/main.js (Priorizando Animación)

let interactionOccurred = false; // Flag para saber si ya hubo interacción

// Función separada para activar las animaciones
function activateAnimations() {
    const body = document.body;
    if (!body.classList.contains('animations-active')) {
        body.classList.add('animations-active');
        console.log(">>> CLASE animations-active AÑADIDA (Animaciones activadas).");
    } else {
        console.log(">>> Animaciones ya estaban activas.");
    }
}

// Función separada para intentar reproducir audio (mejor esfuerzo)
function attemptAudioPlay() {
    const audio = document.querySelector("audio");
    if (audio) {
         console.log("Intentando play del audio (puede fallar)...");
         // Ocultamos el error en consola si falla, ya no es la prioridad
         audio.play().then(() => {
             console.log(">>> Audio reproduciéndose (¡funcionó!).");
         }).catch(error => {
             // Ya no mostramos el botón aquí, la interacción ya ocurrió
             console.warn(">>> Falló la reproducción de audio. Razón:", error.name);
         });
    } else {
        console.log("No se encontró elemento de audio.");
    }
}

// Función que se ejecuta en la primera interacción del usuario
function handleFirstInteraction() {
    // Evita ejecuciones múltiples si algo sale mal con los listeners
    if (interactionOccurred) return;
    interactionOccurred = true;

    console.log(">>> Primera interacción del usuario detectada.");

    // *** ¡PRIORIDAD! Activa las animaciones INMEDIATAMENTE ***
    activateAnimations();

    // Intenta reproducir el audio (secundario)
    attemptAudioPlay();

    // Oculta el botón de inicio si existe
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.style.display = 'none';
        console.log("Botón 'Toca para comenzar' ocultado.");
    }

    // Limpieza: Remueve listeners globales para evitar ejecuciones accidentales futuras
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
}

// Función para mostrar el botón (si la carga inicial falla el autoplay)
function mostrarBotonInicio() {
     const body = document.body;
     // Solo crea el botón si no existe ya
     if (!document.getElementById('startButton')) {
         const startButton = document.createElement('button');
         startButton.id = 'startButton';
         startButton.textContent = 'Toca para comenzar';
         // Estilos básicos (puedes moverlos a CSS)
         startButton.style.position = 'absolute';
         startButton.style.top = '50%';
         startButton.style.left = '50%';
         startButton.style.transform = 'translate(-50%, -50%)';
         startButton.style.padding = '15px 30px';
         startButton.style.fontSize = '1.2rem';
         startButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
         startButton.style.color = 'white';
         startButton.style.border = '1px solid white';
         startButton.style.borderRadius = '8px';
         startButton.style.cursor = 'pointer';
         startButton.style.zIndex = '1000';

         // Cuando se hace clic en el botón, llama a la misma función de interacción
         startButton.onclick = handleFirstInteraction;

         body.appendChild(startButton);
         console.log(">>> Botón 'Toca para comenzar' añadido al body.");
     }
}

// --- Configuración Inicial ---

// 1. Al cargar la ventana, intenta reproducir audio.
window.addEventListener('load', () => {
    console.log(">>> Ventana cargada.");
    const audio = document.querySelector("audio");
    if (audio) {
        // Intenta reproducir silenciosamente
        audio.play().then(() => {
            // Si funciona (raro sin interacción), activa todo
            console.log("Autoplay inicial funcionó (inesperado).");
            interactionOccurred = true; // Marca como interactuado
            activateAnimations();
        }).catch(error => {
            // Si falla con NotAllowedError (esperado), muestra el botón.
            if (error.name === 'NotAllowedError') {
                console.log("Autoplay bloqueado por navegador (esperado), mostrando botón.");
                mostrarBotonInicio();
            } else {
                // Otro error al cargar (ej. archivo no encontrado)
                 console.warn("Error inicial al intentar reproducir audio:", error.name);
                 // Igual muestra el botón para que el usuario inicie manualmente
                 mostrarBotonInicio();
            }
        });
    } else {
        // Si no hay tag de audio, activa animaciones directamente al cargar? O espera click?
        // Por seguridad, esperemos la interacción. Muestra botón si no hay audio? No tiene sentido.
        console.log("No hay elemento <audio>. Esperando interacción para animar.");
        // Podrías mostrar un botón genérico "Comenzar Animación" si quieres
        // o simplemente esperar el clic/touch en el documento.
    }
});

// 2. Escucha el PRIMER clic o toque en CUALQUIER LUGAR del documento
// Esto activará las animaciones si el botón no se mostró o si el usuario hace clic fuera.
document.addEventListener('click', handleFirstInteraction, { once: true });
document.addEventListener('touchstart', handleFirstInteraction, { once: true });