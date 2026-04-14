/* ════════════════════════════════════════════════════════
   Master Mobile Tyres — Client-Side JavaScript
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Theme toggle ──
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeToggleLabel = document.getElementById('themeToggleLabel');

  const setTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    if (themeToggleIcon) themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (themeToggleLabel) themeToggleLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
  };

  const savedTheme = localStorage.getItem('siteTheme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    setTheme(savedTheme);
  } else {
    setTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('siteTheme', next);
    });
  }

  // ── Init AOS ──
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: false
    });
  }

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    // Reset mobile nav state when resizing to desktop widths.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ── WhatsApp Contact Form ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const location = document.getElementById('contactLocation').value.trim();
      const tyreSize = document.getElementById('contactTyreSize').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !location || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      let msg = `Hi Master Mobile Tyres, my name is ${name}.`;
      msg += `\n📍 Location: ${location}`;
      if (tyreSize) msg += `\nTyre Size: ${tyreSize}`;
      msg += `\n\n💬 ${message}`;

      const whatsappUrl = `https://wa.me/447771213157?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // ── About image slider ──
  const aboutSlider = document.querySelector('.about-image-slider');
  if (aboutSlider) {
    const slides = Array.from(aboutSlider.querySelectorAll('.about-slide'));
    const leftArrow = aboutSlider.querySelector('.about-slider-arrow.left');
    const rightArrow = aboutSlider.querySelector('.about-slider-arrow.right');

    if (slides.length > 1) {
      let currentIndex = 0;
      let isAnimating = false;
      let autoTimer = null;

      slides[0].classList.add('active');

      const transitionTo = (nextIndex, direction) => {
        if (isAnimating || nextIndex === currentIndex) return;
        isAnimating = true;

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[nextIndex];

        nextSlide.style.transition = 'none';
        currentSlide.style.transition = 'none';

        if (direction === 'ltr') {
          nextSlide.style.transform = 'translateX(-100%)';
          currentSlide.style.transform = 'translateX(0)';
        } else {
          nextSlide.style.transform = 'translateX(100%)';
          currentSlide.style.transform = 'translateX(0)';
        }

        nextSlide.style.opacity = '1';
        nextSlide.classList.add('active');

        // Force reflow so browser applies the start state before animating.
        aboutSlider.offsetHeight;

        nextSlide.style.transition = '';
        currentSlide.style.transition = '';

        if (direction === 'ltr') {
          currentSlide.style.transform = 'translateX(100%)';
        } else {
          currentSlide.style.transform = 'translateX(-100%)';
        }
        currentSlide.style.opacity = '0';
        nextSlide.style.transform = 'translateX(0)';

        setTimeout(() => {
          currentSlide.classList.remove('active');
          currentSlide.style.transition = '';
          currentSlide.style.transform = '';
          currentSlide.style.opacity = '';
          nextSlide.style.transition = '';
          nextSlide.style.transform = '';
          nextSlide.style.opacity = '';
          currentIndex = nextIndex;
          isAnimating = false;
        }, 720);
      };

      const nextSlide = (direction = 'rtl') => {
        const nextIndex = (currentIndex + 1) % slides.length;
        transitionTo(nextIndex, direction);
      };

      const prevSlide = (direction = 'ltr') => {
        const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        transitionTo(nextIndex, direction);
      };

      const resetAuto = () => {
        if (autoTimer) clearInterval(autoTimer);
        // Automatic motion runs right-to-left.
        autoTimer = setInterval(() => nextSlide('rtl'), 4200);
      };

      if (leftArrow) {
        leftArrow.addEventListener('click', () => {
          prevSlide('ltr');
          resetAuto();
        });
      }

      if (rightArrow) {
        rightArrow.addEventListener('click', () => {
          nextSlide('rtl');
          resetAuto();
        });
      }

      resetAuto();
    }
  }

  // ── Gallery ──
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryEmpty = document.getElementById('galleryEmpty');

  if (galleryGrid) {
    loadGallery();
  }

  function loadGallery() {
    try {
      if (typeof galleryImages !== 'undefined' && galleryImages.length > 0) {
        galleryGrid.innerHTML = '';
        if (galleryEmpty) galleryEmpty.style.display = 'none';

        galleryImages.forEach((filename, i) => {
          const url = 'data/gallery/' + filename;
          const fallbackUrl = 'data/resource/logo.png';
          const item = document.createElement('div');
          item.className = 'gallery-item';
          item.setAttribute('data-aos', 'fade-up');
          item.setAttribute('data-aos-delay', (i % 3) * 100);
          item.innerHTML = `
            <img src="${url}" alt="Master Mobile Tyres gallery image" loading="lazy">
            <div class="overlay"><span>🔍</span></div>
          `;
          const img = item.querySelector('img');
          if (img) {
            img.addEventListener('error', () => {
              if (img.src.endsWith('/logo.png')) return;
              img.src = fallbackUrl;
              img.alt = 'Gallery image unavailable';
              item.dataset.galleryMissing = 'true';
            });
          }

          item.addEventListener('click', () => {
            if (item.dataset.galleryMissing === 'true') return;
            openLightbox(url);
          });
          galleryGrid.appendChild(item);
        });

        // Reinit AOS for new elements
        if (typeof AOS !== 'undefined') AOS.refresh();
      } else {
        galleryGrid.innerHTML = '';
        if (galleryEmpty) galleryEmpty.style.display = 'block';
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
      if (galleryEmpty) galleryEmpty.style.display = 'block';
    }
  }

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  if (lightbox) lightbox.addEventListener('click', closeLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });



  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── FAB visibility ──
  const fab = document.getElementById('fab');
  if (fab) {
    const toggleFab = () => {
      if (window.scrollY > 300) {
        fab.style.opacity = '1';
        fab.style.pointerEvents = 'auto';
      } else {
        fab.style.opacity = '0';
        fab.style.pointerEvents = 'none';
      }
    };
    fab.style.transition = 'all 0.3s ease';
    fab.style.opacity = '0';
    fab.style.pointerEvents = 'none';
    window.addEventListener('scroll', toggleFab, { passive: true });
    toggleFab();
  }
});
