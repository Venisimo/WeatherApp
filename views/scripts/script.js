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
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
});

input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        cityName.innerHTML = input.value;
        container.classList.toggle('active');
    }
});

btnSearch.addEventListener("click", () => {
    let city;
    city = input.value;
    cityName.innerHTML = city;
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ef4201aabf980d270e131d23a5e5618b`

    if (city = '') {
        return
    }

    fetch(api).then(response => response.json()).then(
        json => {
            if(json.cod === '404') {
                container.classList.toggle('active');
                cityName.innerHTML = 'Не найден';
                return
            }
            switch (json.weather[0].main) {
                case 'Clear': 
                    wIcon.style.background = "url(styles/images/BIGicon/SunBIG.png) center no-repeat";
                    break;
                case 'Rain': 
                    wIcon.style.background = "url(styles/images/BIGicon/rainMidBIG.png) center no-repeat";
                    break;
                case 'Clouds': 
                    wIcon.style.background = "url(styles/images/BIGicon/cloudBIG.png) center no-repeat"
                    break;
                case 'Haze': 
                    wIcon.style.background = "url(styles/images/BIGicon/hazeBIG.png) center no-repeat";
                    break;
                default:
                    wIcon.style.background = '';
            }
            let dt = new Date();
            let month = "";
            TempCenter.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            BRWind.innerHTML = `${parseInt(json.wind.speed)} м/с`;
            BRPressure.innerHTML = `${parseInt(json.main.pressure)} мм.`;
            BRHumidity.innerHTML = `${json.main.humidity}%`;
            container.classList.toggle('active');
            if (dt.getMonth() == 0) {
                month = "Jan"
            }
            else if (dt.getMonth() == 1) {
                month = "Feb"
            }
            else if (dt.getMonth() == 2) {
                month = "Mar"
            }
            else if (dt.getMonth() == 3) {
                month = "Apr"
            }
            else if (dt.getMonth() == 4) {
                month = "May"
            }
            else if (dt.getMonth() == 5) {
                month = "Jun"
            }
            else if (dt.getMonth() == 6) {
                month = "Jul"
            }
            else if (dt.getMonth() == 7) {
                month = "Aug"
            }
            else if (dt.getMonth() == 8) {
                month = "Sep"
            }
            else if (dt.getMonth() == 9) {
                month = "Oct"
            }
            else if (dt.getMonth() == 10) {
                month = "Nov"
            }
            else if (dt.getMonth() == 11) {
                month = "Dec"
            }
            date.innerHTML = month + " " + dt.getDate();
            hour.innerHTML = dt.getHours() + ":" + dt.getMinutes();
        }
    )
});

$(document).ready(function(){
    $("#slider").owlCarousel({
        dots: false,
        items: 4,
        margin: 155
    });
});