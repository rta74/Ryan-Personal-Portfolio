// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Header scroll state ----------
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

// ---------- Active nav link on scroll ----------
const navLinks = document.querySelectorAll('[data-nav]');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
sections.forEach((s) => navObserver.observe(s));

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Lottie hero animation ----------
if (window.lottie) {
  lottie.loadAnimation({
    container: document.getElementById('hero-lottie'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'assets/lottie/portfolio-intro.json',
  });
}
