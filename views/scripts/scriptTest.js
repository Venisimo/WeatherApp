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
const timeDownOne = document.querySelector('#timeDownOne');
const timeDownTwo = document.querySelector('#timeDownTwo');
const timeDownThree = document.querySelector('#timeDownThree');
const timeDownFour = document.querySelector('#timeDownFour');
const TempOne = document.querySelector('#TempOne');
const TempTwo = document.querySelector('#TempTwo');
const TempThree = document.querySelector('#TempThree');
const TempFour = document.querySelector('#TempFour');
let apiWeather;
let apiMap;
let city;
let lat;
let lon;

input.addEventListener('focus', function() {
    input.placeholder = "";
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
});

function geocode() {
    city = input.value;
    cityName.innerHTML = city;
    apiMap = `https://nominatim.openstreetmap.org/search?q=${city}=geojson`
    fetch(apiMap).then(response => response.json()).then(
        json => {
            console.log(json);
        })
}

function forecast() {
    city = input.value;
    cityName.innerHTML = city;
    apiWeather = `https://api.open-meteo.com/v1/forecast?latitude=47.48&longitude=${city}&hourly=temperature_2m&current_weather=true&windspeed_unit=ms&timezone=auto`

    if (city = '') {
        return
    }

    fetch(apiWeather).then(response => response.json()).then(
        json => {
            if(json.cod === '404') {
                container.classList.add('active');
                cityName.innerHTML = 'Не найден';
                return
            }
            let dat = new Date();
            let month = "";
            let hourNow = dat.getUTCHours();
            let dayNow = dat.getUTCDate();
            let minutesNow = dat.getUTCMinutes();
            TempCenter.innerHTML = `${parseInt(json.current_weather.temperature)}°C`;
            BRWind.innerHTML = `${parseInt(json.current_weather.windspeed)} м/с`;
            // BRPressure.innerHTML = `${parseInt(json.main.pressure)} мм.`;
            // BRHumidity.innerHTML = `${json.main.humidity}%`;
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
            if (json.utc_offset_seconds % 3600 != 0 || json.utc_offset_seconds % -3600 != 0) {
               if (json.utc_offset_seconds % 3600 == 1800 || json.utc_offset_seconds % 3600 == -1800) {
                    if (json.utc_offset_seconds > 0) {
                        minutesNow -= 30;
                        if (minutesNow < 0) {
                            minutesNow += 60;
                            hourNow -= 1;
                        }
                    } else if (json.utc_offset_seconds < 0) {
                        minutesNow -= 30;
                        if (minutesNow < 0) {
                            minutesNow += 60;
                        } else {
                            hourNow += 1
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
            for (let i = 0; i < json.utc_offset_seconds; i += 3600) {
                hourNow += 1;
                if (hourNow >= 24) {
                    hourNow -= 24;
                    dayNow += 1;
                }
            }
            for (let i = 0; i > json.utc_offset_seconds; i -= 3600) {
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
            TempOne.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursOne])}°C`;
            TempTwo.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursTwo])}°C`;
            TempThree.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursThree])}°C`;
            TempFour.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursFour])}°C`;
            console.log(json.hourly.temperature_2m);
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
            timeDownOne.innerHTML = hoursOne + ":" + '00';
            timeDownTwo.innerHTML = hoursTwo + ":" + '00';
            timeDownThree.innerHTML = hoursThree + ":" + '00';
            timeDownFour.innerHTML = hoursFour + ":" + '00';
            console.log(json.timezone)
            console.log(json)
        }
    )
}

input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        //forecast();
        geocode()
    }
});

btnSearch.addEventListener("click", () => {
    //forecast();
    geocode()
});


// $(document).ready(function(){
//     $("#slider").owlCarousel({
//         dots: false,
//         items: 4,
//         margin: 155
//     });
// });

