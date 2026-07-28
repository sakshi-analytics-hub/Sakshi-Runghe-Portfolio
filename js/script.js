/**
 * Sakshi Runghe Portfolio - Interactive JavaScript Engine
 * Data Analyst & Software Engineer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvasBackground();
  initCursorGlow();
  initScrollProgress();
  initNavbar();
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initTextToSpeech();
});

/* --------------------------------------------------------------------------
   1. Interactive 3D Canvas Background (Particle Network)
   -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let particles = [];
  const particleCount = Math.floor((width * height) / 18000);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.8 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* --------------------------------------------------------------------------
   2. Custom Cursor Trailer Glow
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor) return;

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  } else {
    cursor.style.display = 'none';
  }
}

/* --------------------------------------------------------------------------
   3. Top Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* --------------------------------------------------------------------------
   4. Navbar Sticky & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Data Analyst Intern @ Debugshala',
    'Power BI Dashboard Developer',
    'Python & SQL Analytics Craftsman',
    'EDA & Customer Churn Modeling Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. Skill Bars Animation
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* --------------------------------------------------------------------------
   8. Project Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. Project Modal Data & Popup
   -------------------------------------------------------------------------- */
const projectData = {
  loan: {
    title: 'Bank Loan Risk Analysis',
    subtitle: 'SQL · MySQL Workbench | Mar 2026',
    desc: 'Designed a 3-table relational database (Customers, Loans, Payments) with 50 customers, 50 loans, and 50 payment records across Home, Personal, and Car loan categories (~70% approval rate). Wrote 12+ analytical SQL queries including JOINs, GROUP BY, and aggregations to analyze default risk and repayment behavior.',
    highlights: [
      'Identified customers with credit scores under 650 exhibit significantly higher default rates.',
      'Correlated income brackets with loan category risk to guide credit line allocation.',
      'Structured 12+ production-ready SQL queries for loan risk segmentation.'
    ]
  },
  churn: {
    title: 'Customer Churn Analysis',
    subtitle: 'Python · Pandas · NumPy · Matplotlib · Seaborn | Feb–Mar 2026',
    desc: 'Executed end-to-end Exploratory Data Analysis (EDA) on a Kaggle subscription-service dataset (7,043 rows × 21 columns). Discovered overall churn rate of ~26.5% across contract types, billing methods, and tenure segments.',
    highlights: [
      'Identified customer tenure under 12 months as the single strongest predictor of attrition.',
      'Found month-to-month plan users exhibit over 40% higher churn than long-term contract users.',
      'Built documented Jupyter notebook with retention strategy recommendations.'
    ]
  },
  marketplace: {
    title: 'Freelancer Marketplace Behavior Analysis',
    subtitle: 'SQL · MySQL Workbench · Excel | Mar 2026',
    desc: 'Constructed a 6-table relational schema (Users, Profiles, Projects, Bids, Contracts, Reviews) with 200+ records. Executed 14 analytical SQL queries to evaluate bidding dynamics and contract win rates.',
    highlights: [
      'Surfaced that higher-rated freelancers secure 65%+ of high-budget contracts.',
      'Proved projects with explicit budgets and deadlines attract 2.5x more active bids.',
      'Ranked top-performing freelancers by category and review sentiment.'
    ]
  },
  gaming: {
    title: 'Gaming & Mental Health Analysis',
    subtitle: 'Power BI | Feb 2026',
    desc: 'Analyzed survey dataset examining gaming habits and psychological well-being metrics. Built interactive Power BI dashboard correlating daily playtime, engagement intensity, and stress levels.',
    highlights: [
      'Segmented users by gaming intensity to isolate at-risk psychological profiles.',
      'Implemented drill-through visualizations enabling multi-dimensional trend exploration.',
      'Delivered clean executive dashboard for mental health survey insights.'
    ]
  },
  footwear: {
    title: 'Global Footwear Sales Dashboard',
    subtitle: 'Power BI | Feb 2026',
    desc: 'Developed a multi-page Power BI dashboard analyzing global sports footwear sales data across revenue trends, product categories, and regional profitability.',
    highlights: [
      'Integrated dynamic DAX measures for profit margin and regional unit sales.',
      'Configured interactive slicers and time-period trend analysis.',
      'Streamlined reporting cycles for global sales metrics.'
    ]
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.modal-close');
  if (!modal) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-id');
      const data = projectData[key];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-desc').textContent = data.desc;

      const highlightsList = document.getElementById('modal-highlights');
      highlightsList.innerHTML = '';
      data.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlightsList.appendChild(li);
      });

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   10. Contact Form Toast
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   11. Text-to-Speech Intro Reader
   -------------------------------------------------------------------------- */
function initTextToSpeech() {
  const btn = document.getElementById('read-intro-btn');
  const icon = document.getElementById('audio-icon');
  const textSpan = document.getElementById('audio-text');
  const avatarWrapper = document.querySelector('.portrait-wrapper');
  if (!btn) return;

  if (!('speechSynthesis' in window)) {
    btn.style.display = 'none';
    return;
  }

  const introText = "Hello! I am Sakshi Runghe, an MCA graduate with a GPA of 8.95 and a Data Analyst Intern. I specialize in transforming raw, unstructured datasets into structured, stakeholder-ready business intelligence using Python, SQL, and Power BI. Welcome to my interactive portfolio!";

  let isSpeaking = false;
  let utterance = null;

  btn.addEventListener('click', () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      stopSpeaking();
    } else {
      window.speechSynthesis.cancel();
      utterance = new SpeechSynthesisUtterance(introText);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google') || v.name.includes('Natural')) && v.lang.startsWith('en'));
      if (femaleVoice) utterance.voice = femaleVoice;

      utterance.onstart = () => {
        isSpeaking = true;
        btn.classList.add('speaking');
        if (avatarWrapper) avatarWrapper.classList.add('speaking');
        icon.textContent = '⏹️';
        textSpan.textContent = 'Stop Listening';
      };

      utterance.onend = stopSpeaking;
      utterance.onerror = stopSpeaking;

      window.speechSynthesis.speak(utterance);
    }
  });

  function stopSpeaking() {
    isSpeaking = false;
    btn.classList.remove('speaking');
    if (avatarWrapper) avatarWrapper.classList.remove('speaking');
    icon.textContent = '🔊';
    textSpan.textContent = 'Listen to Intro';
  }
}
