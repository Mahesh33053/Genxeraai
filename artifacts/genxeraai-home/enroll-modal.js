/**
 * GenXEraAI - Reusable Enrollment Modal Controller
 * Handles modal display, auto-preselection, validation (Indian phone & email),
 * duplicate submission prevention, API communication, and success messaging.
 */

(() => {
  const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Program normalization mapping
  const PROGRAM_MAP = {
    // Courses
    "c": "C Programming",
    "c programming": "C Programming",
    "python full stack": "Python Full Stack Development",
    "python full stack development": "Python Full Stack Development",
    "java full stack": "Java Full Stack Development",
    "java full stack development": "Java Full Stack Development",

    // Summer Internships
    "ai-ml": "Summer Internship - AI / ML",
    "ai/ml": "Summer Internship - AI / ML",
    "ai / ml": "Summer Internship - AI / ML",
    "summer internship - ai / ml": "Summer Internship - AI / ML",
    "data-science": "Summer Internship - Data Science",
    "data science": "Summer Internship - Data Science",
    "summer internship - data science": "Summer Internship - Data Science",
    "cloud": "Summer Internship - Cloud (Azure / AWS)",
    "cloud (azure / aws)": "Summer Internship - Cloud (Azure / AWS)",
    "summer internship - cloud (azure / aws)": "Summer Internship - Cloud (Azure / AWS)",
    "devops": "Summer Internship - DevOps",
    "summer internship - devops": "Summer Internship - DevOps",
    "salesforce": "Summer Internship - Salesforce",
    "summer internship - salesforce": "Summer Internship - Salesforce",
    "python-full-stack": "Summer Internship - Python Full Stack",
    "summer internship - python full stack": "Summer Internship - Python Full Stack",
    "java-full-stack": "Summer Internship - Java Full Stack",
    "summer internship - java full stack": "Summer Internship - Java Full Stack",
    "full-stack-web": "Summer Internship - Full-Stack Web",
    "full-stack web": "Summer Internship - Full-Stack Web",
    "summer internship - full-stack web": "Summer Internship - Full-Stack Web",
    "mobile-apps": "Summer Internship - Mobile App Development",
    "mobile app development": "Summer Internship - Mobile App Development",
    "summer internship - mobile app development": "Summer Internship - Mobile App Development",
    "cybersecurity": "Summer Internship - Cybersecurity",
    "summer internship - cybersecurity": "Summer Internship - Cybersecurity",
    "blockchain": "Summer Internship - Blockchain",
    "summer internship - blockchain": "Summer Internship - Blockchain",
    "iot": "Summer Internship - Internet of Things (IoT)",
    "internet of things": "Summer Internship - Internet of Things (IoT)",
    "internet of things (iot)": "Summer Internship - Internet of Things (IoT)",
    "summer internship - internet of things (iot)": "Summer Internship - Internet of Things (IoT)",

    // Workshops
    "programming": "Workshop - Core Programming & Algorithms",
    "core programming & algorithms": "Workshop - Core Programming & Algorithms",
    "workshop - core programming & algorithms": "Workshop - Core Programming & Algorithms",
    "web development": "Workshop - Modern Web Development",
    "modern web development": "Workshop - Modern Web Development",
    "workshop - modern web development": "Workshop - Modern Web Development",
    "ai/ml workshop": "Workshop - Introductory AI & Machine Learning",
    "introductory ai & machine learning": "Workshop - Introductory AI & Machine Learning",
    "workshop - introductory ai & machine learning": "Workshop - Introductory AI & Machine Learning"
  };

  function normalizeProgram(val) {
    if (!val) return "";
    const clean = String(val).trim().toLowerCase();
    return PROGRAM_MAP[clean] || val;
  }

  function initModal() {
    const modal = document.getElementById("enroll-modal");
    if (!modal) return;

    const form = document.getElementById("modal-enroll-form");
    const closeBtn = document.getElementById("enroll-modal-close");
    const doneBtn = document.getElementById("modal-done-btn");
    const submitBtn = document.getElementById("modal-submit-btn");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
    const alertBox = document.getElementById("modal-form-alert");
    const successView = document.getElementById("modal-success-view");
    const successMsg = document.getElementById("success-message");
    const successCard = document.getElementById("success-details-card");
    const waBtn = document.getElementById("modal-wa-btn");

    const inputName = document.getElementById("modal-fullName");
    const inputEmail = document.getElementById("modal-email");
    const inputPhone = document.getElementById("modal-phone");
    const selectProgram = document.getElementById("modal-program");

    let isSubmitting = false;

    function resetFormState() {
      if (form) {
        form.reset();
        form.style.display = "block";
      }
      if (successView) successView.style.display = "none";
      if (alertBox) {
        alertBox.style.display = "none";
        alertBox.textContent = "";
        alertBox.className = "modal-alert";
      }
      document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
      document.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = "Submit Enrollment";
        if (btnSpinner) btnSpinner.style.display = "none";
      }
      isSubmitting = false;
    }

    function openModalWithProgram(programName) {
      resetFormState();
      const targetProgram = normalizeProgram(programName);

      if (targetProgram && selectProgram) {
        let matched = false;
        for (let i = 0; i < selectProgram.options.length; i++) {
          const opt = selectProgram.options[i];
          if (opt.value.toLowerCase() === targetProgram.toLowerCase() ||
              opt.textContent.toLowerCase().includes(targetProgram.toLowerCase())) {
            selectProgram.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          selectProgram.value = targetProgram;
        }
      }

      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "true");
      }

      // Auto-focus first empty input
      setTimeout(() => {
        if (inputName && !inputName.value) inputName.focus();
      }, 50);
    }

    function closeModal() {
      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
      }
      resetFormState();
    }

    // Attach open handler to all "Enroll Now" triggers
    function bindTriggers() {
      const triggers = document.querySelectorAll(`
        [data-open-modal="enroll"],
        .course-card-btn,
        .track-hero-enroll,
        .button-header-enroll,
        .nav-cta,
        a[href="#enroll"],
        button[data-enroll]
      `);

      triggers.forEach((trigger) => {
        // Prevent duplicate listener bindings
        if (trigger.dataset.modalBound === "true") return;
        trigger.dataset.modalBound = "true";

        trigger.addEventListener("click", (e) => {
          // If trigger explicitly says Enroll Now or has enrollment intent
          const text = (trigger.textContent || "").trim().toLowerCase();
          const href = trigger.getAttribute("href") || "";
          const isEnrollTrigger =
            trigger.hasAttribute("data-open-modal") ||
            text.includes("enroll now") ||
            href === "#enroll" ||
            trigger.classList.contains("course-card-btn") ||
            trigger.classList.contains("track-hero-enroll") ||
            trigger.classList.contains("button-header-enroll");

          if (!isEnrollTrigger) return;

          e.preventDefault();
          e.stopPropagation();

          // Determine program to preselect
          let program =
            trigger.dataset.program ||
            trigger.dataset.course ||
            trigger.dataset.track ||
            "";

          // If on an internship track page, extract current track title or slug
          if (!program) {
            const urlParams = new URLSearchParams(window.location.search);
            const trackSlug = urlParams.get("track");
            if (trackSlug) {
              program = trackSlug;
            } else {
              const pathname = window.location.pathname;
              const match = pathname.match(/\/internships\/([a-zA-Z0-9_-]+)/);
              if (match) program = match[1];
            }
          }

          // If still empty, check closest card for heading
          if (!program) {
            const parentCard = trigger.closest(".course-card, .track-card, .workshop-card");
            if (parentCard) {
              const h3 = parentCard.querySelector("h3");
              if (h3) program = h3.textContent.trim();
            }
          }

          openModalWithProgram(program);
        });
      });
    }

    bindTriggers();

    // Re-bind when dynamic DOM elements are inserted (e.g. internship.js track render)
    const observer = new MutationObserver(() => bindTriggers());
    observer.observe(document.body, { childList: true, subtree: true });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (doneBtn) doneBtn.addEventListener("click", closeModal);

    // Backdrop click close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape key listener (handles standard modal cancel event)
    modal.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeModal();
    });

    // Validation & Submission
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        // Clear errors
        document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
        document.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
        if (alertBox) {
          alertBox.style.display = "none";
          alertBox.textContent = "";
        }

        const fullName = (inputName?.value || "").trim();
        const email = (inputEmail?.value || "").trim();
        const rawPhone = (inputPhone?.value || "").trim();
        const program = (selectProgram?.value || "").trim();

        let hasError = false;

        // 1. Full Name Validation
        if (!fullName || fullName.length < 2) {
          showError("err-fullName", inputName, "Please enter your full name (minimum 2 characters).");
          hasError = true;
        }

        // 2. Email Validation
        if (!email || !EMAIL_REGEX.test(email)) {
          showError("err-email", inputEmail, "Please enter a valid email address.");
          hasError = true;
        }

        // 3. Indian Phone Number Validation
        const cleanPhone = rawPhone.replace(/[\s-]/g, "");
        if (!cleanPhone || !INDIAN_PHONE_REGEX.test(cleanPhone)) {
          showError("err-phone", inputPhone, "Please enter a valid 10-digit Indian phone number (e.g. 9876543210).");
          hasError = true;
        }

        // 4. Program Selection Validation
        if (!program) {
          showError("err-program", selectProgram, "Please select a program.");
          hasError = true;
        }

        if (hasError) return;

        // Prevent duplicate submission
        isSubmitting = true;
        if (submitBtn) {
          submitBtn.disabled = true;
          if (btnText) btnText.textContent = "Submitting Enrollment...";
          if (btnSpinner) btnSpinner.style.display = "inline-block";
        }

        try {
          const payload = {
            fullName,
            email: email.toLowerCase(),
            phone: cleanPhone,
            program
          };

          const response = await fetch("/api/enroll", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });

          const result = await response.json().catch(() => ({}));

          if (response.ok && result.success) {
            // SUCCESS: Switch to success view
            form.style.display = "none";
            if (successView) {
              successView.style.display = "block";
              if (successMsg) {
                successMsg.innerHTML = `Thank you, <strong>${escapeHtml(fullName)}</strong>! Your enrollment application for <strong>${escapeHtml(program)}</strong> has been successfully registered in our admissions system.`;
              }
              if (successCard) {
                successCard.innerHTML = `
                  <div class="sd-row"><span class="sd-label">Applicant:</span> <span class="sd-val">${escapeHtml(fullName)}</span></div>
                  <div class="sd-row"><span class="sd-label">Selected Track:</span> <span class="sd-val">${escapeHtml(program)}</span></div>
                  <div class="sd-row"><span class="sd-label">Mobile Number:</span> <span class="sd-val">${escapeHtml(cleanPhone)}</span></div>
                  <div class="sd-row"><span class="sd-label">Email ID:</span> <span class="sd-val">${escapeHtml(email)}</span></div>
                  <div class="sd-row"><span class="sd-label">Status:</span> <span class="sd-val text-success">Confirmed &amp; Logged</span></div>
                `;
              }
              if (waBtn) {
                const waText = encodeURIComponent(`Hi GenXEraAI Admissions, I have submitted my enrollment for ${program}. My name is ${fullName} (Phone: ${cleanPhone}). I would like to get onboarding details.`);
                waBtn.href = `https://wa.me/919390560407?text=${waText}`;
              }
            }
          } else {
            // API returned validation or server error
            const errText = result.error || "Unable to save enrollment. Please check your details and try again.";
            if (alertBox) {
              alertBox.style.display = "block";
              alertBox.textContent = errText;
              alertBox.className = "modal-alert error";
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              if (btnText) btnText.textContent = "Submit Enrollment";
              if (btnSpinner) btnSpinner.style.display = "none";
            }
            isSubmitting = false;
          }
        } catch (netErr) {
          console.error("Network error submitting enrollment:", netErr);
          if (alertBox) {
            alertBox.style.display = "block";
            alertBox.textContent = "Network error connecting to admissions server. Please check your internet connection or reach out on WhatsApp.";
            alertBox.className = "modal-alert error";
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = "Submit Enrollment";
            if (btnSpinner) btnSpinner.style.display = "none";
          }
          isSubmitting = false;
        }
      });
    }

    function showError(errId, inputEl, message) {
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = message;
      if (inputEl) {
        inputEl.classList.add("has-error");
        inputEl.focus();
      }
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Expose programmatic trigger globally
    window.GenXEraModal = {
      open: openModalWithProgram,
      close: closeModal
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initModal);
  } else {
    initModal();
  }
})();
