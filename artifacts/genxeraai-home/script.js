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
    document.querySelector('meta[name="theme-color"]').content = dark ? "#000000" : "#ffffff";
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
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.name ? form.elements.name.value.trim() : "";
      const program = form.elements.program ? form.elements.program.value : "";

      let waMsg = "Hi GenXEraAI, I am interested in enrolling in your internship programs. Please share the details.";
      if (program) {
        waMsg = `Hi GenXEraAI, I am interested in enrolling in the ${program} Internship.${name ? ` My name is ${name}.` : ""}`;
      } else if (name) {
        waMsg = `Hi GenXEraAI, my name is ${name}. I am interested in enrolling in your internship programs. Please share the details.`;
      }

      status.textContent = `Connecting you to GenXEraAI Admissions on WhatsApp...`;
      status.focus();
      window.open(`https://wa.me/919390560407?text=${encodeURIComponent(waMsg)}`, "_blank", "noopener,noreferrer");
      form.reset();
    });
  }

  // Floating WhatsApp button handler
  const waBtn = document.querySelector("#floating-whatsapp");
  if (waBtn) {
    waBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(waBtn.href, "_blank", "noopener,noreferrer");
    });
  }

  // Top Navigation Contact Us -> WhatsApp handler
  if (contactLink) {
    contactLink.addEventListener("click", (e) => {
      e.preventDefault();
      const whatsappUrl = "https://wa.me/919390560407?text=Hi%20GenXEraAI%2C%20I%20would%20like%20to%20know%20more%20about%20your%20programs%20and%20internships.";
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

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
<p><strong>1. Information Collection:</strong> We collect contact information (such as your full name, email address, phone number, and academic background) strictly for processing internship enrollments, coordinating mentor sessions, and issuing verified certificates.</p>
<p><strong>2. Data Use:</strong> Your data is used exclusively to facilitate academic training, communicate curriculum updates, and track milestone assessments. We do not sell, rent, or lease your personal information to third parties.</p>
<p><strong>3. Communications:</strong> We may send relevant updates regarding your program or admissions inquiries via WhatsApp, email, or telephone. You may opt out at any time.</p>
<p><strong>4. Contact:</strong> If you have privacy inquiries, please contact us at <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    },
    terms: {
      title: "Terms of Service",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>Welcome to GenXEraAI. By accessing our platform or enrolling in any of our 12 internship programs, you agree to these Terms of Service.</p>
<p><strong>1. Program Access:</strong> Enrolled participants receive structured curriculum roadmaps, project source code, guidance materials, and mentor support. All materials are proprietary and intended solely for individual educational use.</p>
<p><strong>2. Certification Criteria:</strong> Verifiable digital credentials are awarded upon successful completion of core learning milestones, assignments, and practical project deliverables.</p>
<p><strong>3. Code of Conduct:</strong> Trainees must adhere to academic integrity, mutual respect during mentorship sessions, and authentic project submissions.</p>
<p><strong>4. Fees & Access:</strong> The program fee (starting at ₹1499) grants full access to the specified track resources, lab guidelines, and verification infrastructure.</p>`
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

  // =========================================================================
  // HUMAN & ROBOT SYNERGY INTERACTION CONTROLLER
  // =========================================================================
  const synergyTabs = document.querySelectorAll(".synergy-tab-btn");
  const synergyPanels = document.querySelectorAll(".synergy-panel");

  if (synergyTabs.length > 0) {
    synergyTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;
        synergyTabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("active", isActive);
          t.setAttribute("aria-selected", String(isActive));
        });

        synergyPanels.forEach((panel) => {
          const matches = panel.id === `panel-${target}`;
          if (matches) {
            panel.removeAttribute("hidden");
            panel.classList.add("active");
          } else {
            panel.setAttribute("hidden", "true");
            panel.classList.remove("active");
          }
        });
      });
    });

    // Hotspot trigger clicks for mobile / accessibility
    document.querySelectorAll(".hotspot-trigger").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        document.querySelectorAll(".hotspot-trigger").forEach((t) => t.setAttribute("aria-expanded", "false"));
        trigger.setAttribute("aria-expanded", String(!expanded));
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".hotspot-trigger").forEach((t) => t.setAttribute("aria-expanded", "false"));
    });

    // 3D Tilt Effect on Media Cards
    if (!reducedMotion) {
      document.querySelectorAll(".synergy-media-card[data-tilt]").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
      });
    }

    // Interactive Neural Particle Canvas
    const canvas = document.querySelector("#synergy-canvas");
    if (canvas && !reducedMotion) {
      const ctx = canvas.getContext("2d");
      let animationFrameId;
      let width = 0;
      let height = 0;
      let mouseX = -1000;
      let mouseY = -1000;
      let isCanvasVisible = false;

      const particles = [];
      const particleCount = 42;

      function resizeCanvas() {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
      }

      window.addEventListener("resize", resizeCanvas, { passive: true });
      resizeCanvas();

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (width || 800),
          y: Math.random() * (height || 500),
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1.2
        });
      }

      const stageWrapper = canvas.closest(".synergy-stage-wrapper");
      if (stageWrapper) {
        stageWrapper.addEventListener("mousemove", (e) => {
          const rect = stageWrapper.getBoundingClientRect();
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;
        }, { passive: true });

        stageWrapper.addEventListener("mouseleave", () => {
          mouseX = -1000;
          mouseY = -1000;
        });
      }

      function draw() {
        if (!isCanvasVisible) return;
        ctx.clearRect(0, 0, width, height);

        const isDark = body.dataset.theme === "dark";
        const dotColor = isDark ? "rgba(56, 189, 248, 0.55)" : "rgba(37, 99, 235, 0.4)";
        const lineColor = isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(37, 99, 235, 0.08)";

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse gentle attraction
          const dxMouse = mouseX - p.x;
          const dyMouse = mouseY - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 140) {
            p.x += (dxMouse / distMouse) * 0.4;
            p.y += (dyMouse / distMouse) * 0.4;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 1 - dist / 110;
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(draw);
      }

      if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries) => {
          isCanvasVisible = entries[0].isIntersecting;
          if (isCanvasVisible) {
            resizeCanvas();
            cancelAnimationFrame(animationFrameId);
            draw();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        }, { threshold: 0.1 });
        obs.observe(canvas);
      } else {
        isCanvasVisible = true;
        draw();
      }
    }
  }
})();
