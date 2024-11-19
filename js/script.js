document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerMenu && mobileMenu) {
    burgerMenu.addEventListener("click", function () {
      burgerMenu.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  if (typeof $ !== "undefined" && $(".services__slider").length > 0) {
    $(".services__slider").slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: true,
      arrows: true,
      dots: true,
      swipe: true,
      nextArrow: '<button type="button" class="slick-next">→</button>',
      prevArrow: false,
      customPaging: function (slider, i) {
        return '<button class="custom-dot"></button>';
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    });
  }

  const dropdowns = document.querySelectorAll(".pricing-block__custom-dropdown");
  if (dropdowns.length > 0) {
    dropdowns.forEach((dropdown) => {
      const selected = dropdown.querySelector(".pricing-block__dropdown-selected");
      const options = dropdown.querySelector(".pricing-block__dropdown-options");

      if (selected && options) {
        selected.addEventListener("click", () => {
          options.classList.toggle("active");
        });

        options.querySelectorAll(".pricing-block__dropdown-option").forEach((option) => {
          option.addEventListener("click", (e) => {
            selected.textContent = e.target.textContent;
            selected.dataset.value = e.target.dataset.value;
            options.classList.remove("active");
          });
        });

        document.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target)) {
            options.classList.remove("active");
          }
        });
      }
    });
  }

  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      let value = phoneInput.value.replace(/\D/g, "");

      if (!value.startsWith("380")) {
        value = "380" + value;
      }

      value = value.slice(0, 12);

      let formatted = "+";
      if (value.length > 0) formatted += value.slice(0, 3);
      if (value.length > 3) formatted += " (" + value.slice(3, 5);
      if (value.length > 5) formatted += ") " + value.slice(5, 8);
      if (value.length > 8) formatted += "-" + value.slice(8, 10);
      if (value.length > 10) formatted += "-" + value.slice(10, 12);

      phoneInput.value = formatted;
    });

    phoneInput.addEventListener("blur", function () {
      if (phoneInput.value.length < 17) {
        phoneInput.setCustomValidity("Будь ласка, введіть номер у форматі +380 (XX) XXX-XX-XX");
      } else {
        phoneInput.setCustomValidity("");
      }
    });

    phoneInput.addEventListener("focus", function () {
      phoneInput.setCustomValidity("");
    });
  }

  const regionsContainer = document.querySelector(".regions");
  const toggleButton = document.querySelector(".regions__toggle");

  if (regionsContainer && toggleButton) {
    toggleButton.addEventListener("click", function () {
      regionsContainer.classList.toggle("regions--expanded");
      toggleButton.innerText = regionsContainer.classList.contains("regions--expanded")
        ? "Приховати відділення"
        : "Переглянути усі відділення";
    });
  }

  const faqQuestions = document.querySelectorAll(".faq__question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const allQuestions = document.querySelectorAll(".faq__question");
        const allAnswers = document.querySelectorAll(".faq__answer");
        const allIcons = document.querySelectorAll(".faq__icon");

        allQuestions.forEach((q) => q.classList.remove("faq__question--active"));
        allAnswers.forEach((a) => a.classList.remove("active"));
        allIcons.forEach((icon) => icon.classList.remove("active"));

        const isActive = answer.classList.contains("active");
        if (!isActive) {
          answer.classList.add("active");
          question.classList.add("faq__question--active");
          const icon = question.querySelector(".faq__icon");
          if (icon) {
            icon.classList.add("active");
          }
        }
      });
    });
  }

  const telegramForm = document.getElementById("telegramForm");
  if (telegramForm) {
    telegramForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const botToken = "7832589193:AAHN8RseNQWUoctiWEZZPXIia5fmiStL0DY";
      const chatId = "-1002329526352";

      const formData = new FormData(this);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const service = formData.get("service");
      const documentType = formData.get("documentType");

      const message = `
🔔 *Нова заявка на послуги*:
  *Ім'я*: ${name}
  *Телефон*: ${phone}
  *Послуга*: ${service}
  *Тип документа*: ${documentType}
          `;

      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
    });
  }

  const menuLinks = document.querySelectorAll(".menu__link");
  const contents = document.querySelectorAll(".privacy-policy__content");

  if (menuLinks.length > 0) {
    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        menuLinks.forEach((menuLink) => menuLink.classList.remove("menu__link--active"));

        e.target.classList.add("menu__link--active");

        contents.forEach((content) => {
          content.style.display = "none";
        });

        const targetId = e.target.getAttribute("href").substring(1);
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          targetContent.style.display = "block";
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.getElementById("closeModal");
  const modalForm = modal.querySelector(".modal__form");
  const modalTitle = modal.querySelector(".modal__title");
  const modalSubtitle = modal.querySelector(".modal__subtitle");
  const modalFooter = modal.querySelector(".modal__info-footer");

  // Open modal
  openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal by clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Phone input masking
  const phoneInput = modal.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      let value = phoneInput.value.replace(/\D/g, "");

      if (!value.startsWith("380")) {
        value = "380" + value;
      }

      value = value.slice(0, 12);

      let formatted = "+";
      if (value.length > 0) formatted += value.slice(0, 3);
      if (value.length > 3) formatted += " (" + value.slice(3, 5);
      if (value.length > 5) formatted += ") " + value.slice(5, 8);
      if (value.length > 8) formatted += "-" + value.slice(8, 10);
      if (value.length > 10) formatted += "-" + value.slice(10, 12);

      phoneInput.value = formatted;
    });

    phoneInput.addEventListener("blur", function () {
      if (phoneInput.value.length < 17) {
        phoneInput.setCustomValidity("Будь ласка, введіть номер у форматі +380 (XX) XXX-XX-XX");
      } else {
        phoneInput.setCustomValidity("");
      }
    });

    phoneInput.addEventListener("focus", function () {
      phoneInput.setCustomValidity("");
    });
  }

  if (modalForm) {
    modalForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const botToken = "7832589193:AAHN8RseNQWUoctiWEZZPXIia5fmiStL0DY";
      const chatId = "-1002329526352";

      const formData = new FormData(this);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const service = formData.get("service");
      const documentType = formData.get("documentType");

      const message = `
🔔 *Нова заявка на послуги*:
  *Ім'я*: ${name}
  *Телефон*: ${phone}
  *Послуга*: ${service}
  *Тип документа*: ${documentType}
      `;

      try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        });

        modalTitle.textContent = "Дякуємо за заявку!";
        modalSubtitle.textContent = "Наш менеджер зв’яжеться з Вами в найближчий час для особистої консультації!";
        
        const modalRows = modal.querySelectorAll(".modal__row");
        modalRows.forEach(row => row.style.display = "none");
        
        const submitButton = modal.querySelector(".modal__button");
        if (submitButton) submitButton.style.display = "none";
        
        modalFooter.style.display = "block";

        modalForm.reset();
      } catch (error) {
        console.error("Error sending Telegram message:", error);
      }
    });
  }

  const dropdowns = modal.querySelectorAll(".modal__custom-dropdown");
  if (dropdowns.length > 0) {
    dropdowns.forEach((dropdown) => {
      const selected = dropdown.querySelector(".modal__dropdown-selected");
      const options = dropdown.querySelector(".modal__dropdown-options");

      if (selected && options) {
        selected.addEventListener("click", () => {
          options.classList.toggle("active");
        });

        options.querySelectorAll(".modal__dropdown-option").forEach((option) => {
          option.addEventListener("click", (e) => {
            selected.textContent = e.target.textContent;
            selected.dataset.value = e.target.dataset.value;
            options.classList.remove("active");
          });
        });

        document.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target)) {
            options.classList.remove("active");
          }
        });
      }
    });
  }
});
