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
      infinite: false, 
      arrows: true,
      dots: true,
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
