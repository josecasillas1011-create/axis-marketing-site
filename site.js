/* PAIRDEN — shared page behaviors (nav, reveal, scroll-top, smooth scroll, FAQ) */

// Hamburger menu
(function () {
  const btn  = document.getElementById("navHamburger");
  const menu = document.getElementById("navMobileMenu");
  if (!btn || !menu) return;
  function setMenu(open) {
    menu.classList.toggle("open", open);
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  }
  setMenu(false);
  btn.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
  });
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      setMenu(false);
      btn.focus();
    }
  });
})();

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
  });
});

// Reveal-on-scroll
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));
})();

// Scroll-to-top
(function () {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// FAQ accordion
document.querySelectorAll(".faq-q").forEach((btn, index) => {
  const item = btn.closest(".faq-item");
  const answer = item && item.querySelector(".faq-a");
  if (!item || !answer) return;
  const answerId = answer.id || `faq-answer-${index + 1}`;
  answer.id = answerId;
  btn.setAttribute("aria-controls", answerId);
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(openItem => {
      openItem.classList.remove("open");
      const openButton = openItem.querySelector(".faq-q");
      if (openButton) openButton.setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});
