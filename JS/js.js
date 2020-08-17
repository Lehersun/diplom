$(function () {

  //Летающие символы

  let i = 1;
  while (i <= 5) {
    $(".flying__symbol:nth-child(" + i + ")").addClass("symbol" + i);
    i++;
  }


  //Меню
  $(".menu__button").click(function () {
    $(".menu__button").toggleClass("menu__button__opened");
    $(".header__top nav").slideToggle(".header__top nav");
  });

  $("nav a").on("click", function (event) {
    event.preventDefault();

    let href = $(this).attr("href");

    let offset = $(href).offset().top;

    $("body,html").animate({
        scrollTop: offset,
      },
      700
    );

    let screenwidth = $(window).width();

    if (screenwidth <= 1200) {
      $(".menu__button").toggleClass("menu__button__opened");
      $(".header__top nav").slideToggle(".header__top nav");
    }
  });

  // Заказать звонок

  $('.call__button').click(function () {
    disableScroll();
    $('.new-popup-background').css("display", "block");
    $('.new-popup-window').css("display", "block")
    $(".new-popup-window").animate({
      opacity: 1,
      height: "300",
    }, 300, function () {
      $('body').css("overflow", "hidden")
    });
  });

  $('.new-popup-window__close-button').click(function () {
    enableScroll();

    $(".new-popup-window").animate({
      opacity: 0.25,
      height: "0"
    }, 300, function () {
      $('.new-popup-background').css("display", "none");
      $('body').css("overflow", "visible")
    });
  });

  // МАСКА для ввода 
  const form_phone = $('.new-popup-window__phone');
  const form_name = $('.new-popup-window__name');

  form_phone.mask('+7(000)000-00-00');
  form_name.bind("change keyup input click", function () {
    if (this.value.match(/[^а-яА-Яa-zA-Z\s]/g)) {
      this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, '');
    }
  });



  // Валидация формы

  // $(".new-popup-window__form").submit(function () {

  //   let phonenumber = form_phone.val().length;
  //   event.preventDefault();
  //   if (form_phone.val() && form_name.val()) {
  //     if (phonenumber == 16) {
  //       alert(
  //         "Ваша заявка на звонок принята. Мы перезвоним Вам в ближайшее время."
  //       );
  //       form_phone.removeClass("error");
  //       form_name.removeClass("error");

  //       form_phone.val(' ');
  //       form_name.val(' ');
  //       $(this).submit();

  //     } else {

  //       console.log('error');
  //     }
  //   } else {

  //     alert("Следующие поля не могут быть пустыми");
  //     form_phone.addClass("error");
  //     form_name.addClass("error");
  //   }
  // });


  // owl-carousel

  $(".owl-carousel").owlCarousel({
    loop: true, //Зацикливаем слайдер
    margin: 20, //Отступ от элемента справа в 50px
    nav: true, //Включение навигации
    navText: [""], //Отключение стандартных стрелочек в навигации
    autoplay: false, //Автозапуск слайдера
    smartSpeed: 1000, //Время движения слайда
    autoplayTimeout: 2000, //Время смены слайда
    responsive: {
      //Адаптивность. Кол-во выводимых элементов при определенной ширине.
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
});
//