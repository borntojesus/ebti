function toggleMenu() {
  const burgerMenu = document.getElementById("burgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  
  burgerMenu.classList.toggle("active");
  mobileMenu.classList.toggle("active");
}


$(document).ready(function () {
    const $slider = $('.services__slider');
    
    $slider.slick({
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
                    dots: true
                }
            }
        ]
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".pricing-block__custom-dropdown");
  
    dropdowns.forEach((dropdown) => {
      const selected = dropdown.querySelector(".pricing-block__dropdown-selected");
      const options = dropdown.querySelector(".pricing-block__dropdown-options");
      const optionItems = options.querySelectorAll(".pricing-block__dropdown-option");
  
      selected.addEventListener("click", () => {
        options.classList.toggle("active");
      });
  
      optionItems.forEach((option) => {
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
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.querySelector('input[type="tel"]');

    phoneInput.addEventListener('input', function (e) {
      let value = phoneInput.value.replace(/\D/g, ''); 

      if (!value.startsWith('380')) {
        value = '380' + value;
      }

      value = value.slice(0, 12);

      let formatted = '+';
      if (value.length > 0) formatted += value.slice(0, 3); 
      if (value.length > 3) formatted += ' (' + value.slice(3, 5); 
      if (value.length > 5) formatted += ') ' + value.slice(5, 8); 
      if (value.length > 8) formatted += '-' + value.slice(8, 10); 
      if (value.length > 10) formatted += '-' + value.slice(10, 12); 

      phoneInput.value = formatted; 
    });

    phoneInput.addEventListener('blur', function () {
      if (phoneInput.value.length < 17) {
        phoneInput.setCustomValidity('Будь ласка, введіть номер у форматі +380 (XX) XXX-XX-XX');
      } else {
        phoneInput.setCustomValidity('');
      }
    });

    phoneInput.addEventListener('focus', function () {
      phoneInput.setCustomValidity('');
    });
});

function toggleRegions() {
    const regionsContainer = document.querySelector('.regions');
    const toggleButton = document.querySelector('.regions__toggle');
    regionsContainer.classList.toggle('regions--expanded');
    if (regionsContainer.classList.contains('regions--expanded')) {
      toggleButton.innerText = 'Приховати відділення';
    } else {
      toggleButton.innerText = 'Переглянути усі відділення';
    }
}
document.querySelectorAll('.faq__question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq__icon');
      
      answer.classList.toggle('active');
      icon.classList.toggle('active');
    });
});

document.querySelectorAll('.faq__question').forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const allQuestions = document.querySelectorAll('.faq__question');
    const allAnswers = document.querySelectorAll('.faq__answer');
    const icon = question.querySelector('.faq__icon');

    
    allQuestions.forEach((q) => q.classList.remove('faq__question--active'));
    allAnswers.forEach((a) => a.classList.remove('active'));

   
    const isActive = answer.classList.contains('active');
    if (!isActive) {
      answer.classList.add('active');
      question.classList.add('faq__question--active');
    }
  });
});

  document.getElementById('telegramForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const botToken = '7832589193:AAHN8RseNQWUoctiWEZZPXIia5fmiStL0DY';
    const chatId = '-1002329526352';

    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const documentType = formData.get('documentType');

    const message = `
🔔 *Нова заявка на послуги*:
    *Ім'я*: ${name}
    *Телефон*: ${phone}
    *Послуга*: ${service}
    *Тип документа*: ${documentType}
    `;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
});
