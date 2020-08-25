$(document).ready(function () {
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

    $("body,html").animate(
      {
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

  // Всплывающее окно "Заказать звонок"
  var popupwindow =
    '<div class="new-popup-background"><div class="new-popup-window"><form class="new-popup-window__form" id="new-popup-window__form" action="https://formspree.io/mnqgyqjp"method="POST"><label>* Номер телефона<input class="new-popup-window__phone" type="text" name="guest_phone" placeholder="+7(123)456-78-90"><p class="speech">Проверьте правильность ввода</p></label><label>* Имя<input class="new-popup-window__name" name="guest_phone" placeholder="Джон" maxlength="30"></input></label><button class="new-popup-window__send-button" type="submit" value="send">Заказать звонок</button></form><button class="new-popup-window__close-button" type="button" name="callback_window__close-button"></button></div></div>';
  var popupwindownore =
    '<div class="showmore-popup-background"><div class="showmore-popup-window"><form class="showmore-popup-window__form" action="https://formspree.io/mnqgyqjp" method="POST"><label>* Номер телефона<input class="showmore-popup-window__phone" type="text" name="guest_phone" placeholder="+7(123)456-78-90"><p class="showmore__speech">Проверьте правильность ввода</p></label><label>* Имя<input class="showmore-popup-window__name" name="guest_name" placeholder="Джон" maxlength="30"></input></label><label>* E-mail адрес<input class="showmore-popup-e-mail" name="guest_e-mail" placeholder="example@example.ru"maxlength="40"></input></label><label> Дополнительная информация<textarea class="showmore-popup-comment" name="comment" placeholder="Что нам стоит дом построить?"maxlength="400"></textarea></label><button class="showmore-popup-window__send-button" type="submit" value="send">Отправить заявку</button></form><button class="showmore-popup-window__close-button" type="button" name="callback_window__close-button"></button></div></div>';

  $(popupwindow).appendTo("body");

  $(popupwindownore).appendTo("body");

  function opencallwindow() {
    disableScroll();
    $(".new-popup-background").css("display", "block");
    $(".new-popup-window").animate(
      {
        opacity: 1,
        height: "320",
      },
      300,
      function () {
        $("body").css("overflow", "hidden");
      }
    );
  }

  function closecallwindow() {
    enableScroll();

    $(".new-popup-window").animate(
      {
        opacity: 0.25,
        height: "0",
      },
      300,
      function () {
        $(".new-popup-background").css("display", "none");
        $("body").css("overflow", "visible");
      }
    );
  }

  $(".call__button").click(opencallwindow);
  $(".footer__call__button").click(opencallwindow);
  $(".new-popup-window__close-button").click(closecallwindow);

  // Всплывающее окно "Обратная связь"
  function openshowmorewindow() {
    disableScroll();
    $(".showmore-popup-background").css("display", "block");
    $(".showmore-popup-window").animate(
      {
        opacity: 1,
        height: "550",
      },
      300,
      function () {
        $("body").css("overflow", "hidden");
      }
    );
  }

  function closeshowmorewindow() {
    enableScroll();

    $(".showmore-popup-window").animate(
      {
        opacity: 0.25,
        height: "0",
      },
      300,
      function () {
        $(".showmore-popup-background").css("display", "none");
        $("body").css("overflow", "visible");
      }
    );
  }

  $(".show__more__button").click(openshowmorewindow);
  $(".first_section__button").click(openshowmorewindow);
  $(".second__section__button").click(openshowmorewindow);
  $(".showmore-popup-window__close-button").click(closeshowmorewindow);

  // МАСКА для ввода
  const form_phone = $(".new-popup-window__phone");
  const form_name = $(".new-popup-window__name");
  const showmore_form_phone = $(".showmore-popup-window__phone");
  const showmore_form_name = $(".showmore-popup-window__name");
  const showmore_form_mail = $("showmore-popup-e-mail");

  showmore_form_phone.mask("+7(000)000-00-00");
  form_phone.mask("+7(000)000-00-00");

  form_name.bind("change keyup input click", function () {
    if (this.value.match(/[^а-яА-Яa-zA-Z\s]/g)) {
      this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");
    }
  });

  showmore_form_name.bind("change keyup input click", function () {
    if (this.value.match(/[^а-яА-Яa-zA-Z\s]/g)) {
      this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");
    }
  });

  // showmore_form_mail.onblur = function () {
  //   if (!$(this).value.includes("@")) {
  //     // не email
  //     $(this).classList.add("error");
  //     error.innerHTML = "Пожалуйста, введите правильный email.";
  //   }
  // };

  ///Отправка формы

  var form = $(".new-popup-window__form")[0];

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    alert("Ваша заявка на звонок принята. Мы перезвоним Вам в ближайшее время");
  }

  function error() {
    alert("К сожалению сервис сейчас не работает. Попробуйте позже");
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    const form_phone = $(".new-popup-window__phone");
    const form_name = $(".new-popup-window__name");
    const container = $(".speech");

    const phonenumber = form_phone.val().length;
    ev.preventDefault();
    if (form_phone.val().trim() && form_name.val().trim()) {
      if (phonenumber == 16) {
        form_phone.removeClass("error");
        form_name.removeClass("error");
        closecallwindow();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
      } else {
        form_phone.addClass("error");
        $(".speech").show();
      }
    } else {
      form_phone.addClass("error");
      form_name.addClass("error");
      form_phone.attr("placeholder", "Поле не может быть пустым");
      form_name.attr("placeholder", "Поле не может быть пустым");
    }
    $(document).mouseup(function (e) {
      if (container.has(e.target).length === 0) {
        container.hide();
        form_phone.removeClass("error");
        form_name.removeClass("error");
        if (form_phone.attr("placeholder") === "Поле не может быть пустым") {
          form_phone.attr("placeholder", "+7(123)456-78-90");
          form_name.attr("placeholder", "Джон");
        }
      }
    });
  });
});
//// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
