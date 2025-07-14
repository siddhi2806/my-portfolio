// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Add fade-in to all animated elements
  const animatedElements = document.querySelectorAll(
    ".section, .card, .education-item, .skills-grid span"
  );
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Simple button ripple effect
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
      const btn = e.target;
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute; border-radius: 50%; transform: scale(0);
        animation: ripple 0.6s linear; background: rgba(255,255,255,0.7);
        width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
        pointer-events: none;
      `;

      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    }
  });

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Check if form is valid before preventing default
      if (!this.checkValidity()) {
        return;
      }

      e.preventDefault();

      // Get the submit button
      const submitBtn = this.querySelector(".contact-btn");
      const originalText = submitBtn.textContent;

      // Show success message
      submitBtn.textContent = "Message Sent!";
      submitBtn.disabled = true;

      // Reset after 2 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
    });
  }
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(style);
