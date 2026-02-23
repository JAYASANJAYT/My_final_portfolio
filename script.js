// ===== TYPED TEXT ANIMATION =====
const roles = [
  { text: 'Front End Developer', color: '#7c3aed' },
  { text: 'Python Developer',    color: '#06b6d4' },
  { text: 'Java Learner',        color: '#f59e0b' },
  { text: 'MongoDB Learner',     color: '#22c55e' },
  { text: 'React JS Learner',    color: '#f97316' },
];

const typedEl = document.getElementById('typedText');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function type() {
  const current = roles[roleIndex];
  typedEl.style.color = current.color;
  typedEl.style.textShadow = `0 0 20px ${current.color}60`;

  if (!isDeleting) {
    typedEl.textContent = current.text.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.text.length) {
      isDeleting = true;
      typingSpeed = 60;
      setTimeout(type, 1800); // pause at end
      return;
    }
  } else {
    typedEl.textContent = current.text.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 90;
    }
  }

  setTimeout(type, isDeleting ? 45 : typingSpeed);
}

type();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== SKILL BARS ANIMATION =====
function animateSkills() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => fill.classList.add('animated'));
}

const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.2 }
);

if (skillsSection) observer.observe(skillsSection);

// ===== SMOOTH SECTION REVEAL =====
const sections = document.querySelectorAll('.section, .hero');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(section);
});

// ===== ACTIVE NAV HIGHLIGHT =====
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section[id], .hero').forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = '#7c3aed';
    }
  });
});
