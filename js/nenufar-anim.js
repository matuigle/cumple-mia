// js/nenufar-anim.js

const lyrics = document.getElementById("lyrics");
const audio = document.querySelector("audio");
const titulo = document.querySelector(".titulo");

// Animar las letras (Asegúrate que lyricsData esté definido globalmente o importado)
function updateLyrics() {
    // Verifica si el audio existe y está listo
    if (!audio || audio.readyState < 2) { // readyState 2 o más significa que hay datos suficientes para empezar a reproducir
        lyrics.innerHTML = ""; // Limpia si el audio no está listo
        return;
    }

    // Verifica si lyricsData está cargado
    if (typeof lyricsData === 'undefined' || lyricsData === null) {
        console.warn("lyricsData no está definido o cargado.");
        lyrics.innerHTML = ""; // Limpia si no hay datos
        return;
    }

    try {
        const time = Math.floor(audio.currentTime);
        let currentLine = null;

        // Encuentra la línea actual. La última que cumple la condición time >= line.time.
        for (let i = lyricsData.length - 1; i >= 0; i--) {
            if (time >= lyricsData[i].time) {
                currentLine = lyricsData[i];
                break; // Encontramos la más reciente
            }
        }

        if (currentLine && lyrics.innerHTML !== currentLine.text) {
            // Aplica el efecto de aparición (simple cambio de opacidad)
            lyrics.style.opacity = 0; // Desaparece la anterior
            setTimeout(() => {
                lyrics.innerHTML = currentLine.text; // Cambia el texto
                lyrics.style.opacity = 1; // Aparece la nueva
            }, 150); // Pequeño delay para el efecto fade out/in

        } else if (!currentLine && lyrics.innerHTML !== "") {
            // Si no hay línea (antes de la primera o después de la última con texto vacío)
            lyrics.style.opacity = 0;
             setTimeout(() => {
                 lyrics.innerHTML = "";
             }, 150);
        }
    } catch (error) {
        console.error("Error al actualizar las letras:", error);
        lyrics.style.opacity = 0; // Oculta en caso de error
        lyrics.innerHTML = "";
    }
}

// Llama a updateLyrics periódicamente
// Es mejor usar el evento 'timeupdate' del audio, pero setInterval es más simple aquí
let lyricsInterval = setInterval(updateLyrics, 500); // Revisa cada medio segundo

// Detener intervalo si el audio termina o hay error
if (audio) {
    audio.addEventListener('ended', () => clearInterval(lyricsInterval));
    audio.addEventListener('error', () => clearInterval(lyricsInterval));
    // Intenta iniciar una vez que el audio pueda reproducirse (interacción del usuario podría ser necesaria)
    audio.addEventListener('canplay', updateLyrics);
}


// Función para ocultar el título después de un tiempo
function ocultarTitulo() {
    if (titulo) {
        titulo.style.animation = "fadeOut 1.5s ease-in-out forwards";
        // Opcional: esconderlo del layout después de la animación
        setTimeout(() => {
            titulo.style.display = "none";
        }, 1500); // Coincidir con la duración de fadeOut
    }
}

// Llama a la función después de un tiempo (ej. 1 minuto = 60000 ms)
// Ajusta este tiempo según necesites
// El original era 216000 (3 min 36 seg)
const tiempoEsperaTitulo = 60000; // 1 minuto
setTimeout(ocultarTitulo, tiempoEsperaTitulo);
