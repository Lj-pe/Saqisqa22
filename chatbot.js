const respuestasIA = [
  {
    palabras: ["hola", "buenas"],
    respuesta: "¡Hola! 👋 Bienvenido a Mi Ropa. ¿Buscas ropa personalizada o diseños ya hechos?"
  },
  {
    palabras: ["precio", "costo", "vale"],
    respuesta: "Los precios varían según el diseño. Escríbenos por WhatsApp y te cotizamos rápido 📲"
  },
  {
    palabras: ["envio", "envíos", "delivery"],
    respuesta: "Hacemos envíos a todo Perú 🇵🇪 mediante courier."
  },
  {
    palabras: ["personalizado", "diseño"],
    respuesta: "¡Sí! Hacemos diseños personalizados. Puedes enviarnos tu idea por WhatsApp ✨"
  }
];

function responderIA(mensaje) {
  mensaje = mensaje.toLowerCase();

  for (let i = 0; i < respuestasIA.length; i++) {
    for (let j = 0; j < respuestasIA[i].palabras.length; j++) {
      if (mensaje.includes(respuestasIA[i].palabras[j])) {
        return respuestasIA[i].respuesta;
      }
    }
  }

  return "No estoy seguro 🤔. ¿Deseas hablar directamente por WhatsApp?";
}
function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const chat = document.getElementById("chat-mensajes");

  if (input.value === "") return;

  chat.innerHTML += `<div class="user">${input.value}</div>`;

  const respuesta = responderIA(input.value);

  setTimeout(() => {
    chat.innerHTML += `<div class="bot">${respuesta}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }, 600);

  input.value = "";
}
