window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above

    var form = $(".new-popup-window__form")[0];

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        alert(
            "Ваша заявка на звонок принята. Мы перезвоним Вам в ближайшее время"
        );
    }

    function error() {
        alert(
            "К сожалению сервис сейчас не работает. Попробуйте снова через несколько минут"
        );
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        const form_phone = $('.new-popup-window__phone');
        const form_name = $('.new-popup-window__name');

        const phonenumber = form_phone.val().length;
        ev.preventDefault();
        if (form_phone.val() && form_name.val()) {
            if (phonenumber == 16) {

                form_phone.removeClass("error");
                form_name.removeClass("error");

                var data = new FormData(form);
                ajax(form.method, form.action, data, success, error);

                form_phone.val(' ');
                form_name.val(' ');


            } else {

                console.log('error');
            }
        } else {

            alert("Следующие поля не могут быть пустыми");
            form_phone.addClass("error");
            form_name.addClass("error");
        }







    });
});

// helper function for sending an AJAX request

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