let input = document.querySelector('input');

input.addEventListener('focus', function() {
    input.value = "";
})
input.addEventListener('blur', function() {
    input.value = "введите названия н.п.";
})
