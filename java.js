// ============================================
//   SAQISQA 22 — Scripts principales
//   Archivo: main.js
// ============================================


// ── 1. SCROLL REVEAL ──
// Detecta cuando los elementos con clase .reveal
// entran en pantalla y les añade la clase .visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.05) + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ── 2. NAVBAR — sombra al hacer scroll ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


// ── 3. FORMULARIO DE CONTACTO ──
function enviarFormulario() {
  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica: nombre, email y mensaje son obligatorios
  if (!nombre || !email || !mensaje) {
    const campos = document.querySelectorAll('#form-fields input, #form-fields textarea');
    campos.forEach(campo => {
      if (!campo.value.trim()) {
        campo.style.borderColor = 'rgba(194,94,58,0.7)';
        // Quitar el borde rojo después de 2 segundos
        setTimeout(() => {
          campo.style.borderColor = '';
        }, 2000);
      }
    });
    return; // Detener si faltan campos
  }

  // Ocultar formulario y mostrar mensaje de éxito
  document.getElementById('form-fields').style.display  = 'none';
  document.getElementById('form-success').style.display = 'block';

  // Aquí puedes conectar con un servicio real como Formspree o EmailJS
  // Ejemplo con Formspree:
  // fetch('https://formspree.io/f/TU_ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ nombre, email, mensaje })
  // });
}