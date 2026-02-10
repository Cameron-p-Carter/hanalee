// ===== Home Page - Interactive Menu =====
const menu = document.getElementById("menu");

if (menu) {
  const menuItems = Array.from(document.getElementsByClassName("menu-item"));
  const menuHeader = document.getElementById("menu-header");

  menuItems.forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    };

    item.addEventListener("click", (e) => {
      e.preventDefault();
      const href = item.getAttribute("href");

      menu.classList.add("transitioning");
      menuHeader.classList.add("slide-out");

      // Stagger each item dropping away from the clicked one outward
      menuItems.forEach((other, i) => {
        const distance = Math.abs(i - index);
        const delay = distance * 60;
        setTimeout(() => other.classList.add("slide-out"), delay);
      });

      // Navigate after the cascade finishes
      const totalDelay = (menuItems.length - 1) * 60 + 350;
      setTimeout(() => { window.location.href = href; }, totalDelay);
    });
  });
}

// ===== Inner Pages - Entrance Animation =====
if (document.body.classList.contains('page-entering')) {
  // Double rAF ensures browser has painted the dark initial state
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-entering');
      document.body.classList.add('page-entered');

      // Clean up curtain after transition
      const curtain = document.querySelector('.page-curtain');
      if (curtain) {
        curtain.addEventListener('transitionend', () => curtain.remove());
      }
    });
  });
}

// ===== Inner Pages - Mobile Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ===== Navbar scroll effect =====
const nav = document.querySelector('.nav');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ===== Fade-in on scroll =====
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
}

// ===== Contact form handler =====
function handleSubmit(event) {
  event.preventDefault();
  const btn = event.target.querySelector('.btn');
  btn.textContent = 'Message Sent!';
  btn.style.borderColor = '#c4a882';
  btn.style.color = '#c4a882';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.borderColor = '';
    btn.style.color = '';
    event.target.reset();
  }, 3000);
  return false;
}
