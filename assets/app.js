/* Menú móvil */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      toggle.classList.toggle('activo', abierto);
      toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }
})();

/* Flechita "Volver" — vuelve a la página anterior, o al inicio si no hay historial */
(function () {
  document.querySelectorAll('.volver').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
  });
})();

/* Carrusel de opiniones (inicio) */
(function () {
  var car = document.querySelector('.carrusel');
  if (!car) return;
  var ops = car.querySelectorAll('.op');
  var dotsWrap = document.querySelector('.carrusel-dots');
  var prev = car.querySelector('.prev');
  var next = car.querySelector('.next');
  if (ops.length < 2) return;
  var i = 0, timer, dots = [];

  ops.forEach(function (_, idx) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Opinión ' + (idx + 1));
    if (idx === 0) b.className = 'on';
    b.addEventListener('click', function () { go(idx); reset(); });
    if (dotsWrap) dotsWrap.appendChild(b);
    dots.push(b);
  });

  function go(n) {
    ops[i].classList.remove('is-active');
    dots[i].classList.remove('on');
    i = (n + ops.length) % ops.length;
    ops[i].classList.add('is-active');
    dots[i].classList.add('on');
  }
  function reset() {
    clearInterval(timer);
    timer = setInterval(function () { go(i + 1); }, 5000);
  }
  if (prev) prev.addEventListener('click', function () { go(i - 1); reset(); });
  if (next) next.addEventListener('click', function () { go(i + 1); reset(); });
  reset();
})();

/* Rotador de fotos de materiales (inicio) */
(function () {
  var galeria = document.querySelector('.intro-galeria');
  if (!galeria) return;
  var slides = galeria.querySelectorAll('.slide');
  var tag = galeria.querySelector('.intro-galeria-tag');
  var dots = galeria.querySelectorAll('.intro-galeria-dots i');
  if (slides.length < 2) return;
  var i = 0;
  setInterval(function () {
    slides[i].classList.remove('is-active');
    if (dots[i]) dots[i].classList.remove('on');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
    if (dots[i]) dots[i].classList.add('on');
    if (tag) tag.textContent = slides[i].getAttribute('data-label');
  }, 3500);
})();

/* Buscador de la lista de precios (solo en catálogo) */
(function () {
  var input = document.getElementById('buscador');
  if (!input) return;
  var filas = document.querySelectorAll('.tabla-precios tr[data-buscar]');
  var grupos = document.querySelectorAll('.grupo');
  var aviso = document.getElementById('sin-resultados');

  input.addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    var totalVisibles = 0;

    filas.forEach(function (fila) {
      var coincide = fila.getAttribute('data-buscar').indexOf(q) !== -1;
      fila.style.display = coincide ? '' : 'none';
      if (coincide) totalVisibles++;
    });

    /* ocultar grupos que quedaron sin resultados */
    grupos.forEach(function (g) {
      var visibles = g.querySelectorAll('.tabla-precios tr[data-buscar]:not([style*="display: none"])').length;
      g.style.display = visibles > 0 ? '' : 'none';
    });

    if (aviso) aviso.style.display = totalVisibles === 0 ? 'block' : 'none';
  });
})();
