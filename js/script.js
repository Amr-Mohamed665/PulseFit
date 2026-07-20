

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function on(target, event, handler, opts = {}) {
  if (typeof target === 'string') target = $(target);
  if (!target) return;
  target.addEventListener(event, handler, opts);
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 0) + 'K';
  return n.toString();
}

document.addEventListener('DOMContentLoaded', () => {

  const progressBar = $('#scroll-progress');

  function updateProgress() {
    if (!progressBar) return;
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  const announceBar   = $('#announcement-bar');
  const announceClose = $('#announce-close');

  if (announceClose && announceBar) {
    announceClose.addEventListener('click', () => {
      announceBar.style.height = '0';
      announceBar.style.overflow = 'hidden';
      announceBar.style.transition = 'height 0.4s ease';
      
      setTimeout(() => {
        announceBar.style.display = 'none';
        document.documentElement.style.setProperty('--announce-h', '0px');
      }, 400);
    });
  }

  const themeToggle = $('#theme-toggle');
  const html        = document.documentElement;

  const savedTheme = localStorage.getItem('pf-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      const next    = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('pf-theme', next);
      updateThemeIcon(next);
    });
  }

  const navbar = $('#navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); 

  const hamburger  = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const overlay    = $('#mobile-overlay');
  const mobileClose = $('#mobile-close');
  const mobileLinks = $$('[data-mobile-link]');

  function openMobile() {
    mobileMenu?.classList.add('open');
    overlay?.classList.add('open');
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMobile);
  mobileClose?.addEventListener('click', closeMobile);
  overlay?.addEventListener('click', closeMobile);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobile();
  });

  const sections  = $$('section[id], div[id]').filter(el =>
    ['hero','features','about','health','app','pricing','faq','contact'].includes(el.id)
  );
  const navLinks  = $$('.navbar__link');

  function updateActiveNav() {
    let current = '';
    const offset = 100;

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  const backToTop = $('#back-to-top');

  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  function addRipple(e) {
    const btn    = e.currentTarget;
    const circle = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    circle.className = 'ripple';
    circle.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;

    btn.querySelector('.ripple')?.remove();
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
  }

  $$('.btn, .pricing-card__btn').forEach(btn => {
    btn.addEventListener('click', addRipple);
  });

  // Disabled gradual appearance animations
  // const animatedEls = $$('[data-animate]');

  // const revealObserver = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('animated');
          
  //         revealObserver.unobserve(entry.target);

  //         const fills = $$('.metric-bar__fill', entry.target);
  //         fills.forEach(fill => {
  //           const targetWidth = fill.getAttribute('data-width');
  //           if (targetWidth) {
  //             setTimeout(() => { fill.style.width = targetWidth; }, 200);
  //           }
  //         });

  //         const counters = $$('[data-counter]', entry.target.closest('section') || entry.target);
  //         counters.forEach(startCounter);
  //       }
  //     });
  //   },
  //   { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  // );

  // animatedEls.forEach(el => revealObserver.observe(el));

  // Initialize Bootstrap carousel for testimonials
  const testimonialCarousel = $('#testimonialCarousel');
  if (testimonialCarousel) {
    new bootstrap.Carousel(testimonialCarousel, {
      interval: 9000,
      ride: 'carousel'
    });
  }

  const metricSection = $('#health');
  if (metricSection) {
    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $$('.metric-bar__fill').forEach(fill => {
              const w = fill.getAttribute('data-width');
              if (w) setTimeout(() => { fill.style.width = w; }, 400);
            });
            metricObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    metricObserver.observe(metricSection);
  }

  const startedCounters = new WeakSet();

  function startCounter(el) {
    if (startedCounters.has(el)) return;
    startedCounters.add(el);

    const target   = parseInt(el.getAttribute('data-counter'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 2000; 
    const start    = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);

      el.textContent = (value >= 1000 ? value.toLocaleString() : value) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statsSection = $('#statistics');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $$('[data-counter]', statsSection).forEach(startCounter);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  const healthSection = $('#health');
  if (healthSection) {
    const healthCounterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $$('[data-counter]', healthSection).forEach(startCounter);
            healthCounterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    healthCounterObserver.observe(healthSection);
  }

  const faqItems = $$('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-item__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  const btnMonthly = $('#billing-monthly');
  const btnYearly  = $('#billing-yearly');
  const priceAmounts = $$('.pricing-card__amount');

  function setPricing(mode) {
    priceAmounts.forEach(el => {
      const val = el.getAttribute(`data-${mode}`);
      if (val) {
        
        el.style.transform = 'scale(0.8)';
        el.style.opacity   = '0';
        setTimeout(() => {
          el.textContent     = val;
          el.style.transform = 'scale(1)';
          el.style.opacity   = '1';
          el.style.transition = 'all 0.3s cubic-bezier(0.16,1,0.3,1)';
        }, 150);
      }
    });

    [btnMonthly, btnYearly].forEach(btn => btn?.classList.remove('active'));
    if (mode === 'monthly') {
      btnMonthly?.classList.add('active');
      btnMonthly?.setAttribute('aria-pressed', 'true');
      btnYearly?.setAttribute('aria-pressed', 'false');
    } else {
      btnYearly?.classList.add('active');
      btnYearly?.setAttribute('aria-pressed', 'true');
      btnMonthly?.setAttribute('aria-pressed', 'false');
    }
  }

  btnMonthly?.addEventListener('click', () => setPricing('monthly'));
  btnYearly?.addEventListener('click',  () => setPricing('yearly'));

  const colorDots    = $$('.color-dot');
  const colorName    = $('#color-name');

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      
      colorDots.forEach(d => {
        d.classList.remove('active');
        d.setAttribute('aria-pressed', 'false');
      });
      dot.classList.add('active');
      dot.setAttribute('aria-pressed', 'true');

      const name = dot.getAttribute('data-color') || '';
      if (colorName) colorName.textContent = name;
    });
  });

  const contactForm    = $('#contact-form');
  const formSuccess    = $('#form-success');
  const submitBtn      = $('#contact-submit');

  function showError(inputId, errorId, show) {
    const input = $(`#${inputId}`);
    const error = $(`#${errorId}`);
    if (!input || !error) return;
    input.classList.toggle('error', show);
    error.classList.toggle('show', show);
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function validateName(name) {
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    return nameRegex.test(name);
  }

  function validateMessage(message) {
    const messageRegex = /^[a-zA-Z0-9\s.,!?@#$%^&*()_+-="'`~:;<>[\]{}|\\\/]{10,1000}$/;
    return messageRegex.test(message);
  }

  function validateContact() {
    let valid = true;

    const name    = $('#contact-name')?.value.trim();
    const email   = $('#contact-email')?.value.trim();
    const subject = $('#contact-subject')?.value;
    const message = $('#contact-message')?.value.trim();

if (!name || !validateName(name)) {
      showError('contact-name', 'name-error', true);
      valid = false;
    } else { showError('contact-name', 'name-error', false); }

if (!email || !validateEmail(email)) {
      showError('contact-email', 'email-error', true);
      valid = false;
    } else { showError('contact-email', 'email-error', false); }

if (!subject) {
      showError('contact-subject', 'subject-error', true);
      valid = false;
    } else { showError('contact-subject', 'subject-error', false); }

if (!message || !validateMessage(message)) {
      showError('contact-message', 'message-error', true);
      valid = false;
    } else { showError('contact-message', 'message-error', false); }

    return valid;
  }

['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach(id => {
    $(`#${id}`)?.addEventListener('blur', validateContact);
  });

contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateContact()) return;

if (submitBtn) {
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled    = true;
      submitBtn.style.opacity = '0.7';
    }

    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    }, 1500);
  });

const newsletterForm  = $('#newsletter-form');
  const newsletterInput = $('#newsletter-email');
  const newsletterBtn   = $('#newsletter-submit');

  newsletterForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterInput?.value.trim();
    if (!email || !validateEmail(email)) {
      if (newsletterInput) {
        newsletterInput.style.borderColor = '#EF4444';
        newsletterInput.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.2)';
        newsletterInput.focus();
        setTimeout(() => {
          newsletterInput.style.borderColor = '';
          newsletterInput.style.boxShadow   = '';
        }, 2000);
      }
      return;
    }

    if (newsletterBtn) {
      newsletterBtn.textContent = '✓ Subscribed!';
      newsletterBtn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
      newsletterBtn.disabled = true;
    }
    if (newsletterInput) {
      newsletterInput.value = '';
      newsletterInput.placeholder = 'You\'re in! Check your inbox 🎉';
    }
  });

const lazyImages = $$('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity    = '0';
            img.style.transition = 'opacity 0.5s ease';

            img.onload = () => { img.style.opacity = '1'; };
            if (img.complete) img.style.opacity = '1';

            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '200px' }
    );
    lazyImages.forEach(img => imgObserver.observe(img));
  }

if (window.innerWidth > 768) {
    const tiltCards = $$('.feature-card, .pricing-card, .stat-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect    = card.getBoundingClientRect();
        const centerX = rect.left + rect.width  / 2;
        const centerY = rect.top  + rect.height / 2;
        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width)  *  8;

        card.style.transform    = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
        card.style.transition   = 'transform 0.1s linear';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      });
    });
  }

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
      const annH   = announceBar?.offsetHeight || 0;
      const offset = navH + (window.scrollY > 200 ? 0 : annH) + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const heroBlobs = $$('.hero__blob');
  const heroWatch = $('.hero__watch-wrap');

  function handleParallax() {
    const scrollY = window.scrollY;
    const hero    = $('#hero');
    if (!hero) return;

    const heroH = hero.offsetHeight;
    if (scrollY > heroH) return;

    const ratio = scrollY / heroH;

    heroBlobs.forEach((blob, i) => {
      const speed = (i + 1) * 0.3;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });

    if (heroWatch) {
      heroWatch.style.transform = `translateY(${scrollY * 0.12}px) rotate(${-2 + ratio * 4}deg)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  ['plan-essential', 'plan-pro', 'plan-elite'].forEach(id => {
    const btn = $(`#${id}`);
    if (!btn) return;
    btn.addEventListener('click', () => {
      
      const target = $('#newsletter');
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const floatBadges = $$('.float-badge');
  floatBadges.forEach((badge, i) => {
    badge.style.animationDelay = `${i * 2}s`;
  });

  const navCTA = $('.navbar__cta');

  function handleNavCTAVisibility() {
    
    if (!navCTA) return;
    if (window.scrollY > 400) {
      navCTA.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.25)';
    } else {
      navCTA.style.boxShadow = '';
    }
  }

  window.addEventListener('scroll', handleNavCTAVisibility, { passive: true });

  document.addEventListener('keydown', e => {
    
    if (e.key === 'Tab' && document.activeElement === document.body) {
      const first = $('a, button, input, [tabindex]');
      if (first) { e.preventDefault(); first.focus(); }
    }
  });

  function preloadImage(src) {
    const img = new Image();
    img.src   = src;
  }

  preloadImage('assets/images/watch-hero.png');

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preloadImage('assets/images/lifestyle.png');
      preloadImage('assets/images/app-mockup.png');
    });
  }

  console.log('%c🏃 PulseFit Pro X — Loaded & Ready', 'color: #2563EB; font-weight: 700; font-size: 14px;');

}); 
