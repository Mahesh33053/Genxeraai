/**
 * GenXEraAI - Platform Capabilities Page Script
 * Manages theme toggle, mobile drawer navigation, legal modals, and smooth interactions.
 */

(() => {
  // Theme Toggle Support
  const body = document.body;
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme) {
    body.dataset.theme = storedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.dataset.theme = "dark";
  }

  function updateThemeIcons() {
    const isDark = body.dataset.theme === "dark";
    themeToggles.forEach((btn) => {
      const sym = btn.querySelector(".theme-symbol");
      if (sym) sym.textContent = isDark ? "☾" : "☼";
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  updateThemeIcons();

  themeToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = body.dataset.theme === "dark" ? "light" : "dark";
      body.dataset.theme = current;
      localStorage.setItem("theme", current);
      updateThemeIcons();
    });
  });

  // Mobile Menu Navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      mainNav.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains("open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      }
    });

    // Close on navigation click
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      });
    });
  }

  // Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#enroll") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Legal Dialog Modal Handlers
  const legalDialog = document.querySelector("#legal-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalBody = document.querySelector("#modal-body");
  const modalClose = document.querySelector("#modal-close");

  const LEGAL_CONTENT = {
    privacy: {
      title: "Privacy Policy",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>At GenXEraAI, we are dedicated to protecting the privacy of our students, trainees, and visitors.</p>
<p><strong>1. Information Collection:</strong> We collect contact information (such as your full name, email address, phone number, and academic background) strictly for processing program enrollments, coordinating mentor sessions, and issuing verified certificates.</p>
<p><strong>2. Data Use:</strong> Your data is used exclusively to facilitate academic training, communicate curriculum updates, and track milestone assessments. We do not sell, rent, or lease your personal information to third parties.</p>
<p><strong>3. Communications:</strong> We may send relevant updates regarding your program or admissions inquiries via WhatsApp, email, or telephone. You may opt out at any time.</p>
<p><strong>4. Contact:</strong> If you have privacy inquiries, please contact us at <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    },
    terms: {
      title: "Terms of Service",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>Welcome to GenXEraAI. By accessing our platform or enrolling in any of our technical programs, you agree to these Terms of Service.</p>
<p><strong>1. Program Access:</strong> Enrolled participants receive structured curriculum roadmaps, project source code, guidance materials, and mentor support. All materials are proprietary and intended solely for individual educational use.</p>
<p><strong>2. Certification Criteria:</strong> Verifiable digital credentials are awarded upon successful completion of core learning milestones, assignments, and practical project deliverables.</p>
<p><strong>3. Code of Conduct:</strong> Trainees must adhere to academic integrity, mutual respect during mentorship sessions, and authentic project submissions.</p>
<p><strong>4. Platform Integrity:</strong> Our evaluations, attendance audits, and project verification systems are continuously monitored to maintain program integrity.</p>`
    },
    security: {
      title: "Platform Security & Verification",
      content: `<p>At GenXEraAI, security and credential authenticity are paramount.</p>
<p><strong>1. Tamper-Proof Credentials:</strong> Every digital certificate issued by GenXEraAI is embedded with a unique verification token and permanent URL for employer and academic validation.</p>
<p><strong>2. Data Transmission:</strong> All data transmissions are encrypted using standard TLS/HTTPS protocols.</p>
<p><strong>3. Infrastructure Integrity:</strong> Our evaluations, attendance audits, and project verification systems are continuously monitored to maintain program integrity.</p>
<p>For questions or verification support, contact <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
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

  // Set current year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Intersection Observer for Reveal Animations
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
