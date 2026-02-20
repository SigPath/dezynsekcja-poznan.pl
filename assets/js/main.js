// ========================================
// INITIALIZATION & UTILS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initPhoneTracking();
  initAnimatedCounters();
  initStickyCTABar();
  initFAQAccordion();
  initFormValidation();
  initSmoothScroll();
  initCookieBanner();
});

// Update year dynamically
function initYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ========================================
// PHONE CALL TRACKING
// ========================================

function initPhoneTracking() {
  // Track "Zadzwoń" buttons
  const phoneLinks = document.querySelectorAll('[data-track="call"], [data-track="call_mobile"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('call_click', { 'button_location': link.dataset.track });
      console.log('📞 Call button clicked');
    });
  });

  // Track WhatsApp links
  const whatsappLinks = document.querySelectorAll('[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('whatsapp_click');
      console.log('💬 WhatsApp click');
    });
  });

  // Track form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      trackEvent('form_submit', { 'form_name': form.name || 'contact_form' });
      console.log('✅ Form submitted');
    });
  });
}

// GA4 Event Tracking (requires GA4 tag in <head>)
function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
}

// ========================================
// ANIMATED NUMBER COUNTERS
// ========================================

function initAnimatedCounters() {
  const metricElements = document.querySelectorAll('.metric strong');
  const targets = [
    { el: metricElements[0], value: 2100, isNumber: true, suffix: '+' },
    { el: metricElements[1], value: 4.9, isNumber: true, suffix: '★' },
    { el: metricElements[2], value: 120, isNumber: true, suffix: ' min' },
    { el: metricElements[3], value: 300, isNumber: true, suffix: '+' },
  ];

  // Intersection Observer to trigger animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetObj = targets.find(t => t.el === entry.target);
        if (targetObj && !entry.target.dataset.animated) {
          animateCounter(targetObj.el, targetObj.value, targetObj.suffix, targetObj.isNumber);
          entry.target.dataset.animated = 'true';
        }
      }
    });
  }, { threshold: 0.5 });

  metricElements.forEach((el, idx) => {
    observer.observe(el);
  });
}

function animateCounter(element, targetValue, suffix = '', isNumber = true) {
  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  const startValue = 0;

  function update() {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
    
    const display = isNumber ? currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : currentValue;
    element.textContent = display + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

// ========================================
// STICKY CTA BAR (MOBILE ONLY)
// ========================================

let lastScrollY = 0;

function initStickyCTABar() {
  const stickyBar = document.querySelector('.sticky-cta-bar');
  if (!stickyBar) return;

  // Only show on mobile (<768px)
  if (window.innerWidth > 768) {
    stickyBar.style.display = 'none';
    return;
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const isScrollingDown = scrollY > lastScrollY;

    // Hide on scroll down (except when near bottom)
    if (isScrollingDown && scrollY > 200) {
      stickyBar.style.transform = 'translateY(100%)';
    } else {
      stickyBar.style.transform = 'translateY(0)';
    }

    lastScrollY = scrollY;
  }, { passive: true });

  // Add smooth transition
  stickyBar.style.transition = 'transform 300ms ease-out';
}

// ========================================
// FAQ ACCORDION
// ========================================

function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('h4');
    const answer = item.querySelector('p');
    
    if (question && answer) {
      // Add pointer cursor
      question.style.cursor = 'pointer';
      question.style.userSelect = 'none';
      
      // Set initial state
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.overflow = 'hidden';
      answer.style.transition = 'max-height 300ms ease-out';
      
      question.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight !== '0px';
        
        if (isOpen) {
          answer.style.maxHeight = '0px';
          question.style.color = 'var(--text)';
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.style.color = 'var(--primary)';
        }
      });
      
      // Visual indicator
      question.style.paddingLeft = '24px';
      question.style.position = 'relative';
      
      const arrow = document.createElement('span');
      arrow.style.position = 'absolute';
      arrow.style.left = '0';
      arrow.style.transition = 'transform 300ms ease-out';
      arrow.textContent = '▼';
      question.insertBefore(arrow, question.firstChild);
    }
  });
}

// ========================================
// FORM VALIDATION
// ========================================

function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('change', () => validateInput(input));
    });
    
    form.addEventListener('submit', (e) => {
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) isValid = false;
      });
      
      if (!isValid) {
        e.preventDefault();
        return false;
      }
    });
  });
}

function validateInput(input) {
  const value = input.value.trim();
  const type = input.type;
  const name = input.name;
  
  let isValid = true;
  
  // Required field check
  if (input.required && !value) {
    isValid = false;
    setInputError(input, '⚠️ Pole wymagane');
    return isValid;
  }
  
  // Phone number validation
  if (type === 'tel' && value && !/^[0-9\s\-\+\(\)]+$/.test(value)) {
    isValid = false;
    setInputError(input, '⚠️ Numer telefonu jest nieprawidłowy');
    return isValid;
  }
  
  // Email validation
  if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    isValid = false;
    setInputError(input, '⚠️ Email jest nieprawidłowy');
    return isValid;
  }
  
  // Name validation (minimum 4 characters)
  if (name === 'name' && value && value.length < 4) {
    isValid = false;
    setInputError(input, '⚠️ Imię musi mieć co najmniej 4 znaki');
    return isValid;
  }
  
  // If valid, remove error
  if (isValid) {
    clearInputError(input);
  }
  
  return isValid;
}

function setInputError(input, message) {
  input.style.borderColor = 'var(--primary)';
  input.style.backgroundColor = 'rgba(220, 38, 38, 0.05)';
  
  let errorEl = input.parentElement?.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.style.color = 'var(--primary)';
    errorEl.style.fontSize = '12px';
    errorEl.style.marginTop = '4px';
    input.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearInputError(input) {
  input.style.borderColor = 'var(--border)';
  input.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
  
  const errorEl = input.parentElement?.querySelector('.error-message');
  if (errorEl) errorEl.remove();
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========================================
// GDPR COOKIE BANNER
// ========================================

function initCookieBanner() {
  // Check if user has already made a choice
  const cookieConsent = localStorage.getItem('gdpr_cookie_consent');
  
  if (cookieConsent) {
    // User already made a choice, don't show banner
    return;
  }

  // Create banner HTML
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-banner-content">
      <p><strong>🍪 Pliki cookies GDPR</strong><br>
      Używamy Google Analytics (GA4) do analizy ruchu. Naciśnij "Akceptuję", aby zgodzić się na śledzenie. <a href="javascript:void(0)" onclick="alert('Polityka prywatności: Zbieramy dane o wizytach do analizy. Możesz zrezygnować w każdej chwili.')">Polityka prywatności</a></p>
    </div>
    <div class="cookie-banner-buttons">
      <button class="btn-decline" id="cookie-decline">Odrzuć</button>
      <button class="btn-accept" id="cookie-accept">Akceptuję</button>
    </div>
  `;

  document.body.appendChild(banner);

  // Handle Accept button
  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('gdpr_cookie_consent', 'accepted');
    localStorage.setItem('gdpr_consent_date', new Date().toISOString());
    banner.style.animation = 'slideUp 0.3s ease-out reverse forwards';
    setTimeout(() => banner.remove(), 300);
    console.log('✅ Cookies accepted');
  });

  // Handle Decline button
  document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem('gdpr_cookie_consent', 'declined');
    localStorage.setItem('gdpr_consent_date', new Date().toISOString());
    banner.style.animation = 'slideUp 0.3s ease-out reverse forwards';
    setTimeout(() => banner.remove(), 300);
    console.log('❌ Cookies declined');
  });
}
