<?php
//Для начала проверим есть ли данные в полях name и email, что бы не слать совсем пустые формы :)
//Если всё в порядке, то работаем дальше
//Принимаем данные POST-запроса и записываем значения в переменные

$name = $_POST['name'];
$phone = $_POST['phone']; $email = $_POST['email'];
$comment = $_POST['comment'];

//Теперь давайте настроим куда отправляем и откуда

$my_email = '<kpekep@list.ru>'; // Куда отправляем
$sender_email = '<robot@lehersun.ru>'; // От кого отправляем
$title = "Сообщение с сайта"; 
//Сообщение, которое приходит на почту со всеми нужными нам данными:

$mes = " Имя: $name\n Телефон: $phone\n E-mail: $email\n Тема обращения: $comment\n ";

//Всё, теперь можно отправлять письмо на почту

$send = mail ($my_email,$title,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");



?>