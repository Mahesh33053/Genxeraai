(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".theme-toggle");
  const symbol = document.querySelector(".theme-symbol");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const contactLink = document.querySelector(".nav-contact");
  const form = document.querySelector("#enroll-form");
  const status = document.querySelector("#form-status");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("genxeraai-theme") || "light";
  } catch (_) { /* Storage may be unavailable in private browsing. */ }
  const setTheme = (theme) => {
    body.dataset.theme = theme;
    const dark = theme === "dark";
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    symbol.textContent = dark ? "☾" : "☼";
    document.querySelector('meta[name="theme-color"]').content = dark ? "#08141e" : "#f8fbff";
    try { localStorage.setItem("genxeraai-theme", theme); } catch (_) { /* Theme still works for this visit. */ }
  };
  setTheme(savedTheme === "dark" ? "dark" : "light");
  toggle.addEventListener("click", () => setTheme(body.dataset.theme === "dark" ? "light" : "dark"));

  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      const contactActive = visible.target.id === "contact";
      contactLink.classList.toggle("is-active", contactActive);
      if (contactActive) contactLink.setAttribute("aria-current", "location");
      else contactLink.removeAttribute("aria-current");
    }, { rootMargin: "-22% 0px -60% 0px", threshold: [0, .1, .25, .5] });
    sections.forEach((section) => activeObserver.observe(section));

    if (reducedMotion || window.location.hash) {
      document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: .08, rootMargin: "0px 0px -25px 0px" });
      document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
    }
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelector("#year").textContent = String(new Date().getFullYear());
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    status.textContent = `Thanks${name ? `, ${name}` : ""} — your details are ready. No data has been sent yet; this form is a local demo and is not connected to a submission service.`;
    status.focus();
    form.reset();
  });
})();
