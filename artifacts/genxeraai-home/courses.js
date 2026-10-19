(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".theme-toggle");
  const symbol = document.querySelector(".theme-symbol");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const form = document.querySelector("#course-enroll-form");
  const formStatus = document.querySelector("#course-form-status");
  const courseSelect = document.querySelector("#course-program-select");
  const directWaBtn = document.querySelector("#cta-direct-wa-btn");
  const floatingWa = document.querySelector("#floating-whatsapp");

  // 1. Theme Management
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("genxeraai-theme") || "light";
  } catch (_) { /* Theme still works for this session */ }

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

  // 4. Helper for WhatsApp URLs
  function getWhatsAppCourseUrl(courseName) {
    const course = courseName || "Technology";
    const msg = `Hi GenXEraAI, I am interested in enrolling in the ${course} course (Special Offer ₹9,999).`;
    return `https://wa.me/919390560407?text=${encodeURIComponent(msg)}`;
  }

  // Update direct WhatsApp CTA
  function updateDirectWa() {
    if (directWaBtn && courseSelect) {
      directWaBtn.href = getWhatsAppCourseUrl(courseSelect.value);
    }
  }
  if (courseSelect) {
    courseSelect.addEventListener("change", updateDirectWa);
    updateDirectWa();
  }

  // 5. Smooth Scroll & Course Selection from Action Buttons
  const scrollToEnroll = (selectedCourse) => {
    const target = document.getElementById("enroll");
    if (!target) return;

    if (selectedCourse && courseSelect) {
      courseSelect.value = selectedCourse;
      updateDirectWa();
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll(".course-enroll-action").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const courseName = btn.dataset.course;
      scrollToEnroll(courseName);
    });
  });

  const headerEnrollBtn = document.getElementById("header-enroll-btn");
  if (headerEnrollBtn) {
    headerEnrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToEnroll();
    });
  }

  // 6. Floating WhatsApp Button
  if (floatingWa) {
    floatingWa.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(floatingWa.href, "_blank", "noopener,noreferrer");
    });
  }

  // 7. Handle Course Enrollment Form Submission
  if (form && formStatus) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const name = form.elements.name ? form.elements.name.value.trim() : "";
      const selectedCourse = form.elements.course ? form.elements.course.value : "Technology Course";

      formStatus.className = "form-status success";
      formStatus.innerHTML = `<strong>Connecting to WhatsApp...</strong> Redirecting to GenXEraAI admissions counselor for <em>${selectedCourse}</em>.`;
      formStatus.focus();

      let waMsg = `Hi GenXEraAI, I am interested in enrolling in the ${selectedCourse} course (Special Offer ₹9,999).`;
      if (name) {
        waMsg += ` My name is ${name}.`;
      }
      const waUrl = `https://wa.me/919390560407?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      form.reset();
      if (courseSelect) {
        courseSelect.value = selectedCourse;
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
<p>At GenXEraAI, we are dedicated to protecting the privacy of our students, trainees, and visitors.</p>
<p><strong>1. Information Collection:</strong> We collect contact details (such as your full name, email address, phone number, and academic background) strictly for processing course enrollments and coordinating mentor sessions.</p>
<p><strong>2. Data Use:</strong> Your data is used exclusively to facilitate academic training and communicate curriculum updates. We do not sell or lease personal data.</p>
<p><strong>3. Communications:</strong> We may send admissions updates via WhatsApp, email, or telephone. You may opt out at any time.</p>
<p><strong>4. Contact:</strong> Inquiries can be sent to <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    },
    terms: {
      title: "Terms of Service",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>Welcome to GenXEraAI. By accessing our platform or enrolling in our technology courses, you agree to these Terms of Service.</p>
<p><strong>1. Course Access:</strong> Enrolled participants receive structured curriculum roadmaps, exercises, and guidance materials. All materials are proprietary and intended solely for individual educational use.</p>
<p><strong>2. Academic Conduct:</strong> Trainees must adhere to academic integrity and respectful communication during mentor discussions.</p>
<p><strong>3. Fees:</strong> The course fee of ₹9,999 (special discounted tuition) grants full access to course resources and curriculum sessions.</p>`
    },
    security: {
      title: "Platform Security & Verification",
      content: `<p>At GenXEraAI, infrastructure and communication security are paramount.</p>
<p><strong>1. Secure Communications:</strong> All web transactions and data exchanges utilize secure TLS/HTTPS encryption.</p>
<p><strong>2. Data Integrity:</strong> Participant records and course evaluations are maintained in secure environments.</p>
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
