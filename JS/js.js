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

  const popupmin = $(` 
    <div class="popup-background">
      <div class="popup-window">
        <form class="feedback">
          <label>* Номер телефона
            <input class="popup-window__phone" type="text" name="name" placeholder="+7(123)456-78-90">
          </label>

          <label>* Имя
            <input class="popup-window__name" name="phone" placeholder="Джон" maxlength="30"></input>
          </label>

          <button class="popup-window__send-button" type="submit" value="send">Заказать звонок</button>
        </form>
        
        <button class="popup-window__close-button" type="button" name="popup-window__close-button"></button>
      </div>
    </div>`);

  // Всплывающее окно "Обратной связи"
  const popupmax = $(` 
    <div class="popup-background">
      <div class="popup-window popupmax">
        <form class="feedback">
          <label>* Номер телефона
            <input class="popup-window__phone" type="text" name="phone" placeholder="+7(123)456-78-90">
          </label>

          <label>* Имя
            <input class="popup-window__name" name="name" placeholder="Джон" maxlength="30"></input>
          </label>

          <label>* E-mail адрес
            <input class="popup-window-e-mail" name="email" placeholder="example@example.ru" maxlength="40"></input>
          </label>

          <label> Дополнительная информация 
            <textarea class="popup-window-comment" name="comment" placeholder="Что нам стоит дом построить?"
          maxlength="400"></textarea>
          </label>
            <button class="popup-window__send-button" type="submit" value="send">Заказать звонок</button>
        </form>
        
        <button class="popup-window__close-button" type="button" name="popup-window__close-button"></button>
      </div>
    </div>`);

  $('body').append(popupmin);
  $('body').append(popupmax);

  // Функция rotate

  $.fn.animateRotate = function (angle, duration, easing, complete) {
    let args = $.speed(duration, easing, complete);
    let step = args.step;
    return this.each(function (i, e) {
      args.complete = $.proxy(args.complete, e);
      args.step = function (now) {
        $.style(e, 'transform', 'rotate(' + now + 'deg)');
        if (step) return step.apply(e, arguments);
      };

      $({
        deg: 0
      }).animate({
        deg: angle
      }, args);
    });
  };

  // Анимация открытия окна

  function openpopup() {
    let popupwindow = $(this).find('.popup-window');
    let popupform = $(this).find('form');
    let popupclosebutton = $(this).find('popup-window__close-button');
    let screenwidth = $(window).width();
    let labellength = $(this).find('label').length;
    disableScroll();

    $(this).css("display", "block");
    popupwindow.show();
    popupform.show();
    popupclosebutton.css("display", "block");

    popupwindow.animateRotate(720, 500);

    if (labellength <= 2) {
      if (screenwidth > 750) {
        popupwindow.animate({

          padding: "45",
          opacity: 1,
          height: "320",
          width: "500",
        }, 500, );
      } else {
        popupwindow.animate({

          padding: "35",
          opacity: 1,
          height: "300",
          width: "320",
        }, 500, );
      }
    } else if (screenwidth > 750) {
      popupwindow.animate({

        padding: "45",
        opacity: 1,
        height: "550",
        width: "500",
      }, 500, );
    } else {
      popupwindow.animate({

        padding: "35",
        opacity: 1,
        height: "550",
        width: "320",
      }, 500, );

    }
  }

  // Анимация закрытия окна


  function closepopup() {
    let popupwindow = $(this).parent();
    let popupform = $(this).parent().find('form');

    popupform.hide();
    popupwindow.animateRotate(720, 500);
    popupwindow.animate({

      padding: "0",
      opacity: 0.25,
      height: "0",
      width: "0",
    }, 500, function () {
      popupwindow.parent().hide();
      enableScroll();
    });
  }

  // Вызов функций на нажатие кнопки

  $('.popupminbutton').click(function () {
    let openpopupmin = openpopup.bind(popupmin); //Передаем функции openpopup параметры переменной popupmin в качестве this
    openpopupmin();
  });

  $('.popupmaxbutton').click(function () {
    let openpopupmax = openpopup.bind(popupmax); //Передаем функции openpopup параметры переменной popupmax в качестве this
    openpopupmax();
  });

  $('.popup-window__close-button').click(function () {
    closepopup.call(this);
  });

  // МАСКА для ввода
  const form_phone = $(".popup-window__phone");
  const form_name = $(".popup-window__name");

  form_phone.mask("+7(000)000-00-00");

  form_name.bind("change keyup input click", function () {
    if (this.value.match(/[^а-яА-Яa-zA-Z\s]/g)) {
      this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");
    }
  });

  $('button[type="submit"]').click(function () {

    /*Валидация полей формы*/
    $(this).parent().validate({
      //Правила валидации
      rules: {
        name: {
          required: true,
        },
        // email: {
        //   required: true,
        //   email: true
        // },
        phone: {
          required: true,
        },

      },
      //Сообщения об ошибках
      messages: {
        name: {
          required: "Обязательно укажите имя",
        },
        email: {
          required: "Обязательно укажите Email",
        },
        phone: {
          required: "Укажите номер телефона",
        },
      },

      /*Отправка формы в случае успеха валидации*/
      submitHandler: function () {
        sendAjaxForm('feedback', 'ajax-form.php'); //Вызываем функцию отправки формы
        return false;
      }
    });
  });
});

function sendAjaxForm(feedback, url) {

  $.ajax({
    url: url, //url страницы (ajax-form.php)
    type: "POST", //метод отправки
    dataType: "html", //формат данных
    data: $(("." + feedback)).serialize(), // Сеарилизуем объекты формы
    success: function (response) { //Данные отправлены успешно

      //Ваш код если успешно отправлено
      alert('Успешно отправлено!');
    },
    error: function (response) { // Данные не отправлены

      //Ваш код если ошибка
      alert('Ошибка отправления');
    }
  });
};