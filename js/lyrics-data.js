// js/lyrics-data.js

// Define tus datos de letras aquí
// Cada objeto tiene 'time' (en segundos cuando empieza la línea)
// y 'text' (la línea de la letra)
const lyricsData = [
    { time: 5, text: "En la calma del agua," },
    { time: 10, text: "florece un sentimiento," },
    { time: 15, text: "blanco y puro como tú," },
    { time: 20, text: "mi más bello pensamiento." },
    { time: 25, text: "Este nenúfar virtual," },
    { time: 30, text: "es un reflejo de mi amor," },
    { time: 35, text: "gracias por existir, Lu," },
    { time: 40, text: "mi eterno resplandor." },
    { time: 45, text: "<3" },
    // Añade más líneas según tu audio
    // La última línea se mostrará hasta el final o hasta que otra la reemplace
    { time: 50, text: "" } // Para limpiar al final si quieres
];

// Asegúrate de que la variable esté disponible globalmente
// o impórtala/expórtala si usas módulos
window.lyricsData = lyricsData;
