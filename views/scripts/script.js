const input = document.querySelector('input');
const container = document.querySelector('.container');
const rectangles = document.querySelector('.rectangles');
const search = document.querySelector('.search');
const BigRectangle = document.querySelector('.BigRectangle');
const btnSearch = document.querySelector('.lupa');
const TempCenter = document.querySelector('.TempCenter');
const wIcon = document.querySelector('#IconTempCenter');
const cityName = document.querySelector('.city');
const BRWind = document.querySelector('#BRWind');
const BRPressure = document.querySelector('#BRPressure');
const BRHumidity = document.querySelector('#BRHumidity');
const date = document.querySelector('#date');
const hour = document.querySelector('#Hour');
let api;

input.addEventListener('focus', function() {
    input.placeholder = "";
    // input.style.backgroundImage = "url()";
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
    // input.style.backgroundImage = "url(" + lupa + ")";
});

input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        // requestApi(inputField.value)
        cityName.innerHTML = input.value;
        container.classList.toggle('active');
    }
});

btnSearch.addEventListener("click", () => {
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // } else {
    //     alert("Your browser not support geolaction api");
    // }
    cityName.innerHTML = input.value;
    container.classList.toggle('active');
});

// function requestApi(city) {
//     // api = `curl -H 'X-Gismeteo-Token: 56b30cb255.3443075' 'https://api.gismeteo.net/v2/search/cities/?lang=en&query=${city}'`;
//     api = `https://openweathermap.org/api/data/2.5/weather?q=${city}&units=metric&appid=ef4201aabf980d270e131d23a5e5618b`
//     fetchData();
// }

// function onSuccess(position) {
//     const{latitude, longitude} = position.coords;
//     // api = `curl -H 'X-Gismeteo-Token: 56b30cb255.3443075' 'https://api.gismeteo.net/v2/search/cities/?latitude=${latitude}&longitude=${longitude}'`
//     api = `https://openweathermap.org/api/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ef4201aabf980d270e131d23a5e5618b`
//     fetchData();
// }

// function onError(error) {
//     infoTxt.innerText = error.message;
//     infoTxt.classList.add("error");
// }

// function fetchData() {
//     infoTxt.innerText = "Geting weather detalics...";
//     infoTxt.classList.add("pending");
//     fetch(api).then(res => res.json()).then(result => weatherDatalis(result));
//         infoTxt.innerText = "somting went wrong";
//         infoTxt.classList.replace("pending", "error");
// }

// function weatherDatalis(info) {
//     if(info.cod == "404") {
//         infoTxt.classList.replace("pending", "error");
//         infoTxt.innerText = `${inputField.value} isn't a valid city name`;
//     } else {
//         const city = info.name;
//         const country = info.country = info.sys.country;
//         const {description, id} = info.weather[0];
//         const {temp, feels_like, humidity} = info.main;
        
//         if (id == 800) {
//             wIcon.style.background = "url(styles/images/BIGicon/SunBIG.png)";
//         } else if (id >= 200 && id <= 232) {
//             wIcon.style.background = "url(styles/images/BIGicon/rainMaxBIG.png)"
//         } else if (id >= 600 && ud <= 781) {
//             wIcon.style.background = "url(styles/images/BIGicon/snowMidBIG.png)"
//         } else if (id >= 701 && id <= 781){
//             wIcon.style.background = "url(styles/images/BIGicon/snowMaxBIG.png)" //туман
//         } else if (id >= 801 && id <= 804){
//             wIcon.style.background = "url(styles/images/BIGicon/cloudBIG.png)"
//         } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
//             wIcon.style.background = "url(styles/images/BIGicon/rainBIG.png)";
//         }
//     }
// }

$(document).ready(function(){
    $("#slider").owlCarousel({
        dots: false,
        items: 4,
        margin: 155
    });
});