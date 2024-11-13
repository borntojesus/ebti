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
  