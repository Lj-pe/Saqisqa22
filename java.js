// ============================================
//   SAQISQA 22 — Scripts principales
//   Archivo: java.js
// ============================================


// ── 1. SCROLL REVEAL ──
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


// ── 3. FORMULARIO — envío real a tu correo ──
const FORMSPREE_URL = 'https://formspree.io/f/mdapqjwd';

async function enviarFormulario() {
  const nombre  = document.getElementById('nombre').value.trim();
  const ciudad  = document.getElementById('ciudad').value.trim();
  const email   = document.getElementById('email').value.trim();
  const tipo    = document.getElementById('tipo').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const origen  = document.getElementById('origen').value;

  // ── Validación: campos obligatorios ──
  if (!nombre || !email || !mensaje) {
    document.querySelectorAll('#form-fields input, #form-fields textarea').forEach(campo => {
      if (!campo.value.trim()) {
        campo.style.borderColor = 'rgba(194,94,58,0.8)';
        setTimeout(() => campo.style.borderColor = '', 2500);
      }
    });
    return;
  }

  // ── Deshabilitar botón mientras envía ──
  const btn = document.querySelector('.form-btn');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    const respuesta = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre:   nombre,
        ciudad:   ciudad  || '—',
        email:    email,
        tipo:     tipo    || '—',
        mensaje:  mensaje,
        origen:   origen  || '—',
        _subject: `✦ Nueva idea de co-creación — ${nombre}`
      })
    });

    if (respuesta.ok) {
      // Éxito: ocultar form y mostrar mensaje
      document.getElementById('form-fields').style.display  = 'none';
      document.getElementById('form-success').style.display = 'block';
    } else {
      btn.disabled = false;
      btn.textContent = '✦ Enviar mi concepto';
      alert('Hubo un problema. Escríbenos a comercial@saqisqa22.com');
    }

  } catch (error) {
    btn.disabled = false;
    btn.textContent = '✦ Enviar mi concepto';
    alert('Sin conexión. Escríbenos a comercial@saqisqa22.com');
  }
}
