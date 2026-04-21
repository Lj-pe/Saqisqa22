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
 
 
// ── 3. MENÚ HAMBURGUESA ──
(function initHamburger() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
 
  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Abrir menú');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
 
  function openMenu() {
    btn.classList.add('open');
    navLinks.classList.add('open');
  }
 
  function closeMenu() {
    btn.classList.remove('open');
    navLinks.classList.remove('open');
  }
 
  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });
 
  // Cerrar al hacer click en un link y navegar suavemente
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      } else {
        closeMenu();
      }
    });
  });
 
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
 
 
// ── 4. FORMULARIO ──
const FORMSPREE_URL = 'https://formspree.io/f/myklzoqb';
 
async function enviarFormulario() {
  const nombre  = document.getElementById('nombre').value.trim();
  const ciudad  = document.getElementById('ciudad').value.trim();
  const email   = document.getElementById('email').value.trim();
  const tipo    = document.getElementById('tipo').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const origen  = document.getElementById('origen').value;
 
  if (!nombre || !email || !mensaje) {
    document.querySelectorAll('#form-fields input, #form-fields textarea').forEach(campo => {
      if (!campo.value.trim()) {
        campo.style.borderColor = 'rgba(194,94,58,0.8)';
        setTimeout(() => campo.style.borderColor = '', 2500);
      }
    });
    return;
  }
 
  const btn = document.querySelector('.form-btn');
  btn.disabled = true;
  btn.textContent = 'Enviando...';
 
  try {
    const respuesta = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        nombre, ciudad: ciudad || '—', email,
        tipo: tipo || '—', mensaje, origen: origen || '—',
        _subject: `✦ Nueva idea de co-creación — ${nombre}`
      })
    });
 
    if (respuesta.ok) {
      document.getElementById('form-fields').style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
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
// ── 5. GALERÍA — tap en mobile ──
if (window.matchMedia('(max-width: 900px)').matches) {
  document.querySelectorAll('.muestra-card').forEach(card => {
    card.addEventListener('click', () => {
      const overlay = card.querySelector('.muestra-overlay');
      if (!overlay) return;

      if (card.classList.contains('tapped')) {
        card.classList.remove('tapped');
        overlay.style.opacity = '0';
      } else {
        document.querySelectorAll('.muestra-card.tapped').forEach(other => {
          other.classList.remove('tapped');
          other.querySelector('.muestra-overlay').style.opacity = '0';
        });
        card.classList.add('tapped');
        overlay.style.opacity = '1';
      }
    });
  });
}