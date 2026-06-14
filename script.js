/* =================================================================
   Sifa Shereen M — Portfolio Scripts (Vanilla JavaScript)
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 600);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => preloader.classList.add("hidden"), 2500);

  /* ---------- Current year in footer ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state + scroll progress ---------- */
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTopBtn = document.getElementById("scrollTop");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    navbar.classList.toggle("scrolled", scrollTop > 40);
    scrollProgress.style.width = (scrollTop / docHeight) * 100 + "%";
    scrollTopBtn.classList.toggle("show", scrollTop > 400);

    highlightActiveLink();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
  });
  // Close menu when a link is clicked
  navMenu.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );

  /* ---------- Active link highlighting ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightActiveLink() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById("typedText");
  const phrases = [
    "Full Stack Developer",
    "Computer Science Student",
    "Problem Solver",
    "Web Technology Enthusiast",
  ];
  let pIndex = 0;
  let cIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[pIndex];
    if (deleting) {
      typedEl.textContent = current.substring(0, cIndex--);
    } else {
      typedEl.textContent = current.substring(0, cIndex++);
    }

    let delay = deleting ? 50 : 100;

    if (!deleting && cIndex === current.length + 1) {
      deleting = true;
      delay = 1600; // pause at end
    } else if (deleting && cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(typeLoop, delay);
  }
  typeLoop();

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for groups of siblings
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 45));

        const update = () => {
          count += step;
          if (count >= target) {
            el.textContent = target;
          } else {
            el.textContent = count;
            requestAnimationFrame(update);
          }
        };
        update();
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Scroll to top ---------- */
  scrollTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---------- Contact form (client-side validation) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      status.className = "form-status error";
      return;
    }
    if (!emailValid) {
      status.textContent = "Please enter a valid email address.";
      status.className = "form-status error";
      return;
    }

    // No backend on GitHub Pages — open the user's mail client as a graceful fallback.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:sifashereen12@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = "Thank you! Opening your email client...";
    status.className = "form-status success";
    form.reset();
  });

  // Initial paint
  onScroll();
});
