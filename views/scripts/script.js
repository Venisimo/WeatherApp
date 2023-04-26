let input = document.querySelector('input');

const lupa = 'styles/images/lupaV2.png';

input.addEventListener('focus', function() {
    input.placeholder = "";
    input.style.backgroundImage = "url()";
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
    input.style.backgroundImage = "url(" + lupa + ")";
});

$(document).ready(function(){
    $("#slider").owlCarousel({
        dots: false,
        items: 4,
        margin: 155
    });
});