/* =============================
   RESPUESTAS DEL CHATBOT
============================= */
const respuestasIA = [
  {
    palabras: ["hola", "buenas"],
    respuesta: "¡Hola! 👋 Bienvenido a Mi Ropa. ¿Buscas ropa personalizada o diseños ya hechos?"
  },
  {
    palabras: ["precio", "costo", "vale"],
    respuesta: "Los precios varían según el diseño 👕. Escríbenos por WhatsApp y te cotizamos rápido 📲"
  },
  {
    palabras: ["envio", "envíos", "delivery"],
    respuesta: "Hacemos envíos a todo Perú 🇵🇪 mediante courier."
  },
  {
    palabras: ["personalizado", "diseño"],
    respuesta: "¡Sí! Hacemos diseños personalizados ✨ Puedes enviarnos tu idea por WhatsApp."
  },
  {
    palabras: ["contacto", "whatsapp", "instagram"],
    respuesta: "Puedes contactarnos por WhatsApp o Instagram 📲. ¡Te respondemos rápido!"
  }
];

/* =============================
   LÓGICA DEL BOT
============================= */
function responderIA(texto) {
  texto = texto.toLowerCase();

  for (let i = 0; i < respuestasIA.length; i++) {
    for (let j = 0; j < respuestasIA[i].palabras.length; j++) {
      if (texto.includes(respuestasIA[i].palabras[j])) {
        return respuestasIA[i].respuesta;
      }
    }
  }

  return "No estoy seguro 🤔 ¿Quieres que te derive a WhatsApp?";
}

/* =============================
   MENSAJES
============================= */
function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const texto = input.value.trim();
  if (texto === "") return;

  agregarMensaje(texto, "user");
  input.value = "";

  setTimeout(() => {
    const respuesta = responderIA(texto);
    agregarMensaje(respuesta, "bot");
  }, 600);
}

function agregarMensaje(texto, tipo) {
  const chat = document.getElementById("chat-mensajes");
  const div = document.createElement("div");
  div.className = tipo;
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* =============================
   ABRIR / CERRAR CHAT
============================= */
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");

chatToggle.addEventListener("click", () => {
  chatContainer.classList.remove("cerrado");
  chatToggle.style.display = "none";
});

chatClose.addEventListener("click", () => {
  chatContainer.classList.add("cerrado");
  chatToggle.style.display = "flex";
});
