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
const timeDownOne = document.querySelector('#timeDownOne')
const timeDownTwo = document.querySelector('#timeDownTwo')
const timeDownThree = document.querySelector('#timeDownThree')
const timeDownFour = document.querySelector('#timeDownFour')
let api;

input.addEventListener('focus', function() {
    input.placeholder = "";
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
});

function forecast() {
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
                container.classList.add('active');
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
                case 'Snow': 
                    wIcon.style.background = "url(styles/images/BIGicon/snowMidBIG.png) center no-repeat";
                    break;
                default:
                    wIcon.style.background = '';
            }
            let dat = new Date();
            let month = "";
            let hourNow = dat.getUTCHours();
            let dayNow = dat.getUTCDate();
            let minutesNow = dat.getUTCMinutes();
            TempCenter.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            BRWind.innerHTML = `${parseInt(json.wind.speed)} м/с`;
            BRPressure.innerHTML = `${parseInt(json.main.pressure)} мм.`;
            BRHumidity.innerHTML = `${json.main.humidity}%`;
            container.classList.add('active');
            if (dat.getMonth() == 0) {
                month = "Jan"
            }
            else if (dat.getMonth() == 1) {
                month = "Feb"
            }
            else if (dat.getMonth() == 2) {
                month = "Mar"
            }
            else if (dat.getMonth() == 3) {
                month = "Apr"
            }
            else if (dat.getMonth() == 4) {
                month = "May"
            }
            else if (dat.getMonth() == 5) {
                month = "Jun"
            }
            else if (dat.getMonth() == 6) {
                month = "Jul"
            }
            else if (dat.getMonth() == 7) {
                month = "Aug"
            }
            else if (dat.getMonth() == 8) {
                month = "Sep"
            }
            else if (dat.getMonth() == 9) {
                month = "Oct"
            }
            else if (dat.getMonth() == 10) {
                month = "Nov"
            }
            else if (dat.getMonth() == 11) {
                month = "Dec"
            }
            if (json.timezone % 3600 != 0 || json.timezone % -3600 != 0) {
               if (json.timezone % 3600 == 1800 || json.timezone % 3600 == -1800) {
                    if (json.timezone > 0) {
                        minutesNow -= 30;
                        if (minutesNow < 0) {
                            minutesNow += 60;
                            hourNow -= 1;
                        }
                    } else if (json.timezone < 0) {
                        minutesNow -= 30;
                        if (minutesNow < 0) {
                            minutesNow += 60;
                        }
                    } 
               } else {
                    minutesNow -= 15;
                    if (minutesNow < 0) {
                        minutesNow += 60;
                        hourNow -= 1;
                    } 
               } 
            }
            for (let i = 0; i < json.timezone; i += 3600) {
                hourNow += 1;
                if (hourNow >= 24) {
                    hourNow -= 24;
                    dayNow += 1;
                }
            }
            for (let i = 0; i > json.timezone; i -= 3600) {
                hourNow -= 1;
                if (hourNow < 0) {
                    hourNow += 24;
                    dayNow -= 1;
                }
                
            }
            console.log(hourNow)
            date.innerHTML = month + " " + dayNow;
            let hoursOne = hourNow + 6;
            let hoursTwo = hourNow + 12;
            let hoursThree = hourNow + 18;
            let hoursFour = hourNow + 24;
            if (hoursOne >= 24) {
                hoursOne -= 24;
            }
            if (hoursTwo >= 24) {
                hoursTwo -= 24;
            }
            if (hoursThree >= 24) {
                hoursThree -= 24;
            }
            if (hoursFour >= 24) {
                hoursFour -= 24;
            }
            if (minutesNow < 10) {
                minutesNow = '0' +  minutesNow;
            }
            if (hourNow < 10) {
                hourNow = '0' +  hourNow;
            }
            if (hoursOne < 10) {
                hoursOne = '0' +  hoursOne;
            }
            if (hoursTwo < 10) {
                hoursTwo = '0' +  hoursTwo;
            }
            if (hoursThree < 10) {
                hoursThree = '0' +  hoursThree;
            }
            if (hoursFour < 10) {
                hoursFour = '0' +  hoursFour;
            }
            hour.innerHTML = hourNow + ":" + minutesNow;
            timeDownOne.innerHTML = hoursOne + ":" + minutesNow;
            timeDownTwo.innerHTML = hoursTwo + ":" + minutesNow;
            timeDownThree.innerHTML = hoursThree + ":" + minutesNow;
            timeDownFour.innerHTML = hoursFour + ":" + minutesNow;
            console.log(json.timezone)
        }
    )
}

input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        forecast();
    }
});

btnSearch.addEventListener("click", () => {
    forecast();
});

$(document).ready(function(){
    $("#slider").owlCarousel({
        dots: false,
        items: 4,
        margin: 155
    });
});