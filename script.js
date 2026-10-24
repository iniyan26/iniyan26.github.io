const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.textContent = '☰';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();

(function () {
  var d = document, r = d.documentElement;
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  r.classList.add('js');
  d.querySelectorAll('.hero-copy>*').forEach(function (e, i) { e.style.setProperty('--i', i); });

  var c = d.querySelector('.circuit');
  if (c) {
    c.querySelectorAll('path').forEach(function (p, i) {
      p.setAttribute('pathLength', '1'); p.classList.add('draw'); p.style.setProperty('--i', i);
    });
    c.querySelectorAll('g[stroke="#d7ff72"] path').forEach(function (p, i) {
      var q = p.cloneNode(); q.classList.remove('draw'); q.classList.add('pulse');
      q.style.animationDelay = (2.4 + i * 0.55) + 's'; p.parentNode.appendChild(q);
    });
    c.querySelectorAll('g[fill="#d7ff72"] circle').forEach(function (e, i) { e.style.animationDelay = (i * 0.45) + 's'; });
  }

  var els = d.querySelectorAll('.section-heading,.about-content>*,.project-card,.skill-group,.timeline article,.contact>*,.project-disclaimer');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (x.isIntersecting) {
        var e = x.target; e.classList.add('in'); io.unobserve(e);
        setTimeout(function () { e.style.transitionDelay = '0ms'; }, 1400);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) {
    e.classList.add('reveal');
    e.style.transitionDelay = Math.min([].indexOf.call(e.parentNode.children, e), 6) * 90 + 'ms';
    io.observe(e);
  });

  var bar = d.createElement('div'); bar.className = 'progress'; d.body.appendChild(bar);
  function sc() { var h = r.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; }
  addEventListener('scroll', sc, { passive: true }); sc();

  var links = d.querySelectorAll('.nav-links a[href^="#"]');
  var so = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + x.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  d.querySelectorAll('main section[id]').forEach(function (s) { so.observe(s); });

  d.querySelectorAll('.project-card,.skill-group').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var b = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - b.left + 'px'); c.style.setProperty('--my', e.clientY - b.top + 'px');
    });
  });
})();
