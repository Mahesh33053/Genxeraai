(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".theme-toggle");
  const symbol = document.querySelector(".theme-symbol");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const form = document.querySelector("#workshop-register-form");
  const formStatus = document.querySelector("#workshop-form-status");
  const categorySelect = document.querySelector("#workshop-category-select");
  const directWaBtn = document.querySelector("#cta-direct-wa-btn");
  const floatingWa = document.querySelector("#floating-whatsapp");

  // 1. Theme Management
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("genxeraai-theme") || "light";
  } catch (_) { /* Fallback */ }

  const setTheme = (theme) => {
    body.dataset.theme = theme;
    const dark = theme === "dark";
    if (toggle) {
      toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    if (symbol) {
      symbol.textContent = dark ? "☾" : "☼";
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = dark ? "#000000" : "#ffffff";
    }
    try {
      localStorage.setItem("genxeraai-theme", theme);
    } catch (_) {}
  };

  setTheme(savedTheme === "dark" ? "dark" : "light");
  if (toggle) {
    toggle.addEventListener("click", () => {
      setTheme(body.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  // 2. Mobile Menu
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
    });
  }

  // 3. Header Scroll Shadow
  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // 4. WhatsApp CTA Helper
  function getWhatsAppWorkshopUrl(categoryName) {
    const category = categoryName || "Technology";
    const msg = `Hi GenXEraAI, I am interested in registering for the free ${category} workshop.`;
    return `https://wa.me/919390560407?text=${encodeURIComponent(msg)}`;
  }

  function updateDirectWa() {
    if (directWaBtn && categorySelect) {
      directWaBtn.href = getWhatsAppWorkshopUrl(categorySelect.value);
    }
  }
  if (categorySelect) {
    categorySelect.addEventListener("change", updateDirectWa);
    updateDirectWa();
  }

  // 5. Smooth Scroll & Category Selection
  const scrollToRegister = (categoryName) => {
    const target = document.getElementById("register");
    if (!target) return;

    if (categoryName && categorySelect) {
      categorySelect.value = categoryName;
      updateDirectWa();
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll(".workshop-register-action").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const workshopName = btn.dataset.workshop;
      scrollToRegister(workshopName);
    });
  });

  const headerRegisterBtn = document.getElementById("header-register-btn");
  if (headerRegisterBtn) {
    headerRegisterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToRegister();
    });
  }

  // 6. Floating WhatsApp Button
  if (floatingWa) {
    floatingWa.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(floatingWa.href, "_blank", "noopener,noreferrer");
    });
  }

  // 7. Handle Workshop Registration Form Submission
  if (form && formStatus) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const name = form.elements.name ? form.elements.name.value.trim() : "";
      const selectedCategory = form.elements.workshop ? form.elements.workshop.value : "Technology Workshop";

      formStatus.className = "form-status success";
      formStatus.innerHTML = `<strong>Connecting to WhatsApp...</strong> Registering interest for <em>${selectedCategory}</em>.`;
      formStatus.focus();

      let waMsg = `Hi GenXEraAI, I would like to register for the free ${selectedCategory} workshop.`;
      if (name) {
        waMsg += ` My name is ${name}.`;
      }
      const waUrl = `https://wa.me/919390560407?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      form.reset();
      if (categorySelect) {
        categorySelect.value = selectedCategory;
      }
    });
  }

  // 8. Footer Year
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = String(new Date().getFullYear());
  }

  // 9. Legal Dialog Modals
  const legalDialog = document.querySelector("#legal-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalBody = document.querySelector("#modal-body");
  const modalClose = document.querySelector("#modal-close");

  const LEGAL_CONTENT = {
    privacy: {
      title: "Privacy Policy",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>At GenXEraAI, we are dedicated to protecting the privacy of our workshop participants.</p>
<p><strong>1. Information Collection:</strong> We collect contact details (full name, email, phone number) strictly for sharing workshop session access details and technical resources.</p>
<p><strong>2. Data Use:</strong> Your data is used exclusively to facilitate workshop delivery and communicate scheduling announcements. We never sell personal data.</p>
<p><strong>3. Communications:</strong> We may send session joining details via WhatsApp or email.</p>
<p><strong>4. Contact:</strong> Inquiries can be sent to <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    },
    terms: {
      title: "Terms of Service",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>Welcome to GenXEraAI. By registering for our free community workshops, you agree to these Terms of Service.</p>
<p><strong>1. Workshop Access:</strong> Registered participants receive live stream or laboratory access links. All materials are proprietary and intended solely for individual educational use.</p>
<p><strong>2. Community Code of Conduct:</strong> Trainees must adhere to respectful interaction in all public chats and live discussions.</p>
<p><strong>3. Free Admission:</strong> These introductory community workshops are provided at zero tuition cost (₹0 / Free).</p>`
    },
    security: {
      title: "Platform Security & Verification",
      content: `<p>At GenXEraAI, infrastructure security is paramount.</p>
<p><strong>1. Secure Transmissions:</strong> All registrations utilize standard TLS/HTTPS encryption protocols.</p>
<p><strong>2. System Integrity:</strong> Participant directories are protected against unauthorized third-party access.</p>
<p>For inquiries, contact <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    }
  };

  document.querySelectorAll(".legal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.modal;
      if (LEGAL_CONTENT[type] && legalDialog) {
        modalTitle.textContent = LEGAL_CONTENT[type].title;
        modalBody.innerHTML = LEGAL_CONTENT[type].content;
        legalDialog.showModal();
      }
    });
  });

  if (modalClose && legalDialog) {
    modalClose.addEventListener("click", () => legalDialog.close());
    legalDialog.addEventListener("click", (e) => {
      if (e.target === legalDialog) legalDialog.close();
    });
  }
})();
