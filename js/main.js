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

// ---------- Module text bubble height pinned to its image bubble ----------
const moduleRows = document.querySelectorAll('.module-row');
if (moduleRows.length && 'ResizeObserver' in window) {
  const mobileQuery = window.matchMedia('(max-width: 860px)');

  moduleRows.forEach((row) => {
    const img = row.querySelector('.module-image');
    const text = row.querySelector('.module-text');
    if (!img || !text) return;

    const sync = () => {
      if (mobileQuery.matches) {
        text.style.height = '';
        text.classList.remove('height-matched');
        return;
      }
      const h = img.getBoundingClientRect().height;
      if (h > 0) {
        text.style.height = `${h}px`;
        text.classList.add('height-matched');
      }
    };

    new ResizeObserver(sync).observe(img);
    mobileQuery.addEventListener('change', sync);
  });
}

// ---------- Lottie hero animation, scrubbed by scroll ----------
if (window.lottie) {
  const heroTrack = document.getElementById('hero');
  const heroAnim = lottie.loadAnimation({
    container: document.getElementById('hero-lottie'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/lottie/portfolio-intro.json',
    rendererSettings: {
      // fill the full hero viewport, cropping overflow instead of letterboxing
      preserveAspectRatio: 'xMidYMid slice',
    },
  });

  let totalFrames = 0;
  let ticking = false;

  heroAnim.addEventListener('DOMLoaded', () => {
    totalFrames = heroAnim.totalFrames;
    heroAnim.goToAndStop(0, true);
    updateFrame();
  });

  function updateFrame() {
    if (!totalFrames || !heroTrack) return;
    const rect = heroTrack.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
    const frame = progress * (totalFrames - 1);
    heroAnim.goToAndStop(frame, true);
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateFrame);
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener('resize', updateFrame);
}
