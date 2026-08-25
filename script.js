// AquaPulse — simple, readable JS for interactions:
// - Mobile nav toggle
// - Smooth scrolling for internal links
// - Demo modal open/close
// - Testimonial carousel (simple translateX)
// The code includes guards to avoid runtime errors if elements are missing.

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------
     Mobile nav toggle
     ------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('main-nav');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));

      // Toggle visibility - keep logic simple and reversible
      if (expanded) {
        navList.style.display = '';
        navList.style.flexDirection = '';
      } else {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
      }
    });

    // Close mobile nav when clicking a link (improves UX on small screens)
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 980) {
          navList.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* -------------------------
     Smooth scroll for anchors
     ------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      // allow other click handlers (like modal triggers) to run, but prevent default navigation
      e.preventDefault();
      const headerOffset = 72;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });

  /* -------------------------
     Modal (demo checkout)
     ------------------------- */
  const modal = document.getElementById('modal');
  const modalCloses = document.querySelectorAll('.modal-close');
  const confirmPurchase = document.getElementById('confirm-purchase');

  // Collect buy triggers robustly (buttons/links that start the demo checkout)
  const buySelectors = ['#hero-buy', '#cta-buy', '#buy-now'];
  const openButtons = Array.from(new Set(
    buySelectors
      .map(sel => document.querySelector(sel))
      .filter(Boolean)
  ));

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // When buying from hero or nav, scroll to pricing then open modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href');
      if (href === '#pricing') {
        document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // open after a short delay to allow scroll to begin
        setTimeout(openModal, 600);
      } else {
        openModal();
      }
    });
  });

  modalCloses.forEach(b => b.addEventListener('click', closeModal));
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(); // close when clicking backdrop
    });
  }
  confirmPurchase?.addEventListener('click', () => {
    alert('Demo checkout — this page does not process payments. Thanks for trying AquaPulse!');
    closeModal();
  });

  /* -------------------------
     Testimonial carousel
     ------------------------- */
  const track = document.querySelector('.test-track');
  const items = track ? Array.from(track.children) : [];
  const btnPrev = document.querySelector('.test-btn.prev');
  const btnNext = document.querySelector('.test-btn.next');

  let index = 0;
  function updateTestimonials() {
    if (!track || items.length === 0) return;
    // width of the visible area
    const width = track.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  // Guard: if there are no items, skip setup
  if (items.length > 0) {
    window.addEventListener('resize', () => {
      // recalc on resize for correct offsets
      // small timeout ensures layout has settled
      setTimeout(updateTestimonials, 80);
    });

    btnPrev?.addEventListener('click', () => {
      index = (index - 1 + items.length) % items.length;
      updateTestimonials();
    });
    btnNext?.addEventListener('click', () => {
      index = (index + 1) % items.length;
      updateTestimonials();
    });

    let auto = setInterval(() => {
      index = (index + 1) % items.length;
      updateTestimonials();
    }, 6000);

    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => {
      clearInterval(auto);
      auto = setInterval(() => {
        index = (index + 1) % items.length;
        updateTestimonials();
      }, 6000);
    });

    // Initial positioning
    updateTestimonials();
  }

});
