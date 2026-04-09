/* ════════════════════════════════════════════════════════
   Master Mobile Tyres — Client-Side JavaScript
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Init AOS ──
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: 'mobile'
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
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
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
      if (tyreSize) msg += `\n🛞 Tyre Size: ${tyreSize}`;
      msg += `\n\n💬 ${message}`;

      const whatsappUrl = `https://wa.me/447455222494?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    });
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
          const url = 'uploads/' + filename;
          const item = document.createElement('div');
          item.className = 'gallery-item';
          item.setAttribute('data-aos', 'fade-up');
          item.setAttribute('data-aos-delay', (i % 3) * 100);
          item.innerHTML = `
            <img src="${url}" alt="Master Mobile Tyres gallery image" loading="lazy">
            <div class="overlay"><span>🔍</span></div>
          `;
          item.addEventListener('click', () => openLightbox(url));
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
