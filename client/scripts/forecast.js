const input = document.querySelector('.searchInput');
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

const windOne = document.querySelector('#windOne');
const airPressureOne = document.querySelector('#airPressureOne');
const humidityOne = document.querySelector('#humidityOne');

const windTwo = document.querySelector('#windTwo');
const airPressureTwo = document.querySelector('#airPressureTwo');
const humidityTwo = document.querySelector('#humidityTwo');

const windThree = document.querySelector('#windThree');
const airPressureThree = document.querySelector('#airPressureThree');
const humidityThree = document.querySelector('#humidityThree');

const windFour = document.querySelector('#windFour');
const airPressureFour = document.querySelector('#airPressureFour');
const humidityFour = document.querySelector('#humidityFour');

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

const IconWeatherOne = document.querySelector('#IconWeatherOne');
const IconWeatherTwo = document.querySelector('#IconWeatherTwo');
const IconWeatherThree = document.querySelector('#IconWeatherThree');
const IconWeatherFour = document.querySelector('#IconWeatherFour');

let apiWeather;
let apiMap;
let city;
let lat;
let lon;
let degress = 'celsius';
let degressSign = '°C';
let degressNotActive = 'fahrenheit';

$(document).ready(function() {
    $(document).on('click', '.checkboxInput', function(event) {
        $('C').toggleClass('notActive');
        $(this).toggleClass('active');
        if (degressSign == '°F'){    
            degress = 'celsius';
            degressSign = '°C';
            $('.C').css('color', '#fff');
            degressNotActive = 'fahrenheit'
        }
        else{
            degress = 'fahrenheit';
            degressSign = '°F';
            $('.C').css('color', '#000');
            degressNotActive = 'celsius'
        }
        let isChecked = $(this).find('input').prop('checked');
        $(this).find('input').prop('checked', !isChecked);
        return false;
    });
});

input.addEventListener('focus', function() {
    input.placeholder = "";
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
});

function geocode() {
    city = input.value;
    cityName.innerHTML = city;
    apiMap = `https://nominatim.openstreetmap.org/search.php?q=${city}&format=jsonv2`

    if (city = '') {
        return
    }

    fetch(apiMap).then(response => response.json()).then(
        json => {
                console.log(json);
                if(json.length == 0) {
                    container.classList.add('active');
                    cityName.innerHTML = 'Не найден';
                    return
                }

                lat = parseFloat(json[0].lat);
                lon = parseFloat(json[0].lon);

                console.log(lat);
                console.log(lon);

                function forecast() {
                    apiWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure,windspeed_10m&daily=sunrise,sunset&current_weather=true&windspeed_unit=ms&forecast_days=2&timezone=auto&temperature_unit=${degress}`
                    
                    apiWeatherNotActive = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure,windspeed_10m&daily=sunrise,sunset&current_weather=true&windspeed_unit=ms&forecast_days=2&timezone=auto&temperature_unit=${degressNotActive}`
                    console.log(apiWeatherNotActive);

                    if (city = '') {
                        return
                    }
                    fetch(apiWeatherNotActive).then(response => response.json()).then(
                        json => {
                            console.log(json);
                        });

                    fetch(apiWeather).then(response => response.json()).then(
                        json => {
                            let dat = new Date();
                            let month = "";
                            let hourNow = dat.getUTCHours();
                            let dayNow = dat.getUTCDate();
                            let monthNow = dat.getUTCMonth();
                            let minutesNow = dat.getUTCMinutes();
                            container.classList.add('active');
                            console.log(json);


                            if (monthNow == 0) {
                                month = "Jan"
                            }
                            else if (monthNow == 1) {
                                month = "Feb"
                            }
                            else if (monthNow == 2) {
                                month = "Mar"
                            }
                            else if (monthNow == 3) {
                                month = "Apr"
                            }
                            else if (monthNow == 4) {
                                month = "May"
                            }
                            else if (monthNow == 5) {
                                month = "Jun"
                            }
                            else if (monthNow == 6) {
                                month = "Jul"
                            }
                            else if (monthNow == 7) {
                                month = "Aug"
                            }
                            else if (monthNow == 8) {
                                month = "Sep"
                            }
                            else if (monthNow == 9) {
                                month = "Oct"
                            }
                            else if (monthNow == 10) {
                                month = "Nov"
                            }
                            else if (monthNow == 11) {
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
                            

                            if (month == 'Jan') {
                                if (dayNow > 31) {
                                    month = 'Feb';
                                    dayNow = 1;
                                    monthNow = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (dayNow > 29) {
                                        month = 'Mar';
                                        dayNow = 1;
                                        monthNow = 2;
                                    } else if (dayNow > 28) {
                                        month = 'Mar';
                                        dayNow = 1;
                                        monthNow = 2;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (dayNow > 31) {
                                    month = 'Jun';
                                    dayNow = 1;
                                    monthNow = 3;
                                }
                            }
                            if (month == 'Apr') {
                                if (dayNow > 30) {
                                    month = 'May';
                                    dayNow = 1;
                                    monthNow = 4;
                                }
                            }
                            if (month == 'May') {
                                if (dayNow > 31) {
                                    month = 'Jun';
                                    dayNow = 1;
                                    monthNow = 5;
                                }
                            }
                            if (month == 'Jun') {
                                if (dayNow > 30) {
                                    month = 'Jul';
                                    dayNow = 1;
                                    monthNow = 6;
                                }
                            }
                            if (month == 'Jul') {
                                if (dayNow > 31) {
                                    month = 'Jun';
                                    dayNow = 1;
                                    monthNow = 7;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayNow > 31) {
                                    month = 'Sen';
                                    dayNow = 1;
                                    monthNow = 7;
                                }
                            }
                            if (month == 'Sen') {
                                if (dayNow > 30) {
                                    month = 'Oct';
                                    dayNow = 1;
                                    monthNow = 9;
                                }
                            }
                            if (month == 'Oct') {
                                if (dayNow > 31) {
                                    month = 'Nov';
                                    dayNow = 1;
                                    monthNow = 10;
                                }
                            }
                            if (month == 'Nov') {
                                if (dayNow > 30) {
                                    month = 'Dec';
                                    dayNow = 1;
                                    monthNow = 11;
                                }
                            }
                            if (month == 'Dec') {
                                if (dayNow > 31) {
                                    month = 'Jan';
                                    dayNow = 1;
                                    monthNow = 0;
                                }
                            }
                            console.log(monthNow);

                            let DateLocale = new Date(dat.getUTCFullYear(), monthNow, dayNow, hourNow, minutesNow);
                            
                            console.log(json.daily.sunrise);
                            let sunrise = new Date(json.daily.sunrise[0]);
                            let sunset = new Date(json.daily.sunset[0]);
                            console.log(DateLocale);
                            console.log(sunrise); 
                            console.log(sunset);

                            
                            if (DateLocale > sunrise && DateLocale < sunset) {
                                console.log('день');
                            } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                console.log('день');
                            } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                console.log('ночь');
                            } else {
                                console.log('ночь');
                            }

                            TempCenter.innerHTML = `${parseInt(json.current_weather.temperature)}${degressSign}`;
                            BRWind.innerHTML = `${parseInt(json.current_weather.windspeed)} м/с`;
                            BRPressure.innerHTML = `${parseInt(json.hourly.surface_pressure[hourNow] * 0.75)} мм.`;
                            BRHumidity.innerHTML = `${json.hourly.relativehumidity_2m[hourNow]}%`;
                            console.log(hourNow)
                            
                            date.innerHTML = month + " " + dayNow;

                            let hoursOne = hourNow + 6;
                            let hoursTwo = hourNow + 12;
                            let hoursThree = hourNow + 18;
                            let hoursFour = hourNow + 24;

                            TempOne.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursOne])}${degressSign}`;
                            TempTwo.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursTwo])}${degressSign}`;
                            TempThree.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursThree])}${degressSign}`;
                            TempFour.innerHTML = `${parseInt(json.hourly.temperature_2m[hoursFour])}${degressSign}`;

                            airPressureOne.innerHTML = `${parseInt(json.hourly.surface_pressure[hoursOne]* 0.75)} мм.`;
                            airPressureTwo.innerHTML = `${parseInt(json.hourly.surface_pressure[hoursTwo]* 0.75)} мм.`;
                            airPressureThree.innerHTML = `${parseInt(json.hourly.surface_pressure[hoursThree]* 0.75)} мм.`;
                            airPressureFour.innerHTML = `${parseInt(json.hourly.surface_pressure[hoursFour]* 0.75)} мм.`;

                            windOne.innerHTML = `${parseInt(json.hourly.windspeed_10m[hoursOne])} м/с`;
                            windTwo.innerHTML = `${parseInt(json.hourly.windspeed_10m[hoursTwo])} м/с`;
                            windThree.innerHTML = `${parseInt(json.hourly.windspeed_10m[hoursThree])} м/с`;
                            windFour.innerHTML = `${parseInt(json.hourly.windspeed_10m[hoursFour])} м/с`;

                            humidityOne.innerHTML = `${json.hourly.relativehumidity_2m[hoursOne]} %`;
                            humidityTwo.innerHTML = `${json.hourly.relativehumidity_2m[hoursTwo]} %`;
                            humidityThree.innerHTML = `${json.hourly.relativehumidity_2m[hoursThree]} %`;
                            humidityFour.innerHTML = `${json.hourly.relativehumidity_2m[hoursFour]} %`;
                            console.log(json.hourly.temperature_2m);
                            console.log(json.hourly.weathercode[hourNow]);
                            
                            if (json.hourly.weathercode[hourNow] == 0) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/SunBIG.png) center no-repeat";
                                    console.log('день');
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/MoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 1 || json.hourly.weathercode[hourNow] == 2) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/cloudSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/cloudMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 3) {
                                wIcon.style.background = "url(styles/images/BIGicon/cloudBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 45) {
                                wIcon.style.background = "url(styles/images/BIGicon/hazeBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 48) {
                                wIcon.style.background = "url(styles/images/BIGicon/FreezehazeBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 51) {
                                wIcon.style.background = "url(styles/images/BIGicon/drizzleMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 53) {
                                wIcon.style.background = "url(styles/images/BIGicon/drizzleMidBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 55) {
                                wIcon.style.background = "url(styles/images/BIGicon/drizzleMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 56) {
                                wIcon.style.background = "url(styles/images/BIGicon/FreezeDrizzleMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 57) {
                                wIcon.style.background = "url(styles/images/BIGicon/FreezeDrizzleMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 61) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 63) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 65) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 66) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainSnowMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 67) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainSnowMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 71) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 73) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 75) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxSunBIG.png) center no-repeat";
                                    console.log('день');
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxMoonBIG.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hourNow] == 77) {
                                wIcon.style.background = "url(styles/images/BIGicon/SnowGrainsBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 80) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 81) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainMidBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 82) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 85) {
                                wIcon.style.background = "url(styles/images/BIGicon/snowMidBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 86) {
                                wIcon.style.background = "url(styles/images/BIGicon/snowMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 95) {
                                wIcon.style.background = "url(styles/images/BIGicon/thunderstormBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 96) {
                                wIcon.style.background = "url(styles/images/BIGicon/thunderstormRainMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 99) {
                                wIcon.style.background = "url(styles/images/BIGicon/thunderstormRainMaxBIG.png) center no-repeat";
                            } 


                            let dayLocaleTomorrowOne = dayNow;
                            let dayLocaleTomorrowTwo = dayNow;
                            let dayLocaleTomorrowThree = dayNow;
                            let dayLocaleTomorrowFour = dayNow;

                            let hoursOneNotStatic = hoursOne;
                            let hoursTwoNotStatic = hoursTwo;
                            let hoursThreeNotStatic = hoursThree;
                            let hoursFourNotStatic = hoursFour;
                            
                            let sunriseOne = new Date(json.daily.sunrise[0]);
                            let sunsetOne = new Date(json.daily.sunset[0]);
                            let sunriseTwo = new Date(json.daily.sunrise[0]);
                            let sunsetTwo = new Date(json.daily.sunset[0]);
                            let sunriseThree = new Date(json.daily.sunrise[0]);
                            let sunsetThree = new Date(json.daily.sunset[0]);
                            let sunriseFour = new Date(json.daily.sunrise[0]);
                            let sunsetFour = new Date(json.daily.sunset[0]);


                            console.log(hoursOne);
                            if (hoursOne >= 24) {
                                hoursOneNotStatic -= 24;
                                dayLocaleTomorrowOne += 1
                                sunriseOne = new Date(json.daily.sunrise[1]);
                                sunsetOne = new Date(json.daily.sunset[1]);
                            }
                            if (hoursTwo >= 24) {
                                hoursTwoNotStatic -= 24;
                                dayLocaleTomorrowTwo += 1
                                sunriseTwo = new Date(json.daily.sunrise[1]);
                                sunsetTwo = new Date(json.daily.sunset[1]);
                            }
                            if (hoursThree >= 24) {
                                hoursThreeNotStatic -= 24;
                                dayLocaleTomorrowThree += 1
                                sunriseThree = new Date(json.daily.sunrise[1]);
                                sunsetThree = new Date(json.daily.sunset[1]);
                            }
                            if (hoursFour >= 24) {
                                hoursFourNotStatic -= 24;
                                dayLocaleTomorrowFour += 1
                                sunriseFour = new Date(json.daily.sunrise[1]);
                                sunsetFour = new Date(json.daily.sunset[1]);
                            }


                            let DateLocaleTomorrowOne = new Date(dat.getUTCFullYear(), monthNow, dayLocaleTomorrowOne, hoursOneNotStatic);
                            let DateLocaleTomorrowTwo = new Date(dat.getUTCFullYear(), monthNow, dayLocaleTomorrowTwo, hoursTwoNotStatic);
                            let DateLocaleTomorrowThree = new Date(dat.getUTCFullYear(), monthNow, dayLocaleTomorrowThree, hoursThreeNotStatic);
                            let DateLocaleTomorrowFour = new Date(dat.getUTCFullYear(), monthNow, dayLocaleTomorrowFour, hoursFourNotStatic);
                            
                            console.log(DateLocaleTomorrowOne);
                            console.log(DateLocaleTomorrowTwo);
                            console.log(DateLocaleTomorrowThree);
                            console.log(DateLocaleTomorrowFour);
                            
                            console.log(sunriseOne); 
                            console.log(sunsetOne);
                            console.log(sunriseTwo); 
                            console.log(sunsetTwo);
                            console.log(sunriseThree); 
                            console.log(sunsetThree);
                            console.log(sunriseFour); 
                            console.log(sunsetFour);
                            


                            if (json.hourly.weathercode[hoursOne] == 0) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                                    console.log('день');
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/Moon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 1 || json.hourly.weathercode[hoursOne] == 2) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/cloudMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 3) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 45) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 48) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 51) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 53) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 55) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 56) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 57) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 61) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 63) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 65) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 66) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 67) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 71) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 73) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 75) {
                                if (DateLocaleTomorrowOne > sunriseOne && DateLocaleTomorrowOne < sunsetOne) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseOne == 'Invalid Date' && sunsetOne == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursOne] == 77) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 80) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 81) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 82) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 85) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 86) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 95) {
                                IconWeatherOne.style.background = "url(styles/images/iconPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 96) {
                                IconWeatherOne.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 99) {
                                IconWeatherOne.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                            
                            
                            if (json.hourly.weathercode[hoursTwo] == 0) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                                    console.log('день');
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/Moon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 1 || json.hourly.weathercode[hoursTwo] == 2) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/cloudMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 3) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 45) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 48) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 51) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 53) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 55) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 56) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 57) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 61) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 63) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 65) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 66) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 67) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 71) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 73) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 75) {
                                if (DateLocaleTomorrowTwo > sunriseTwo && DateLocaleTomorrowTwo < sunsetTwo) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseTwo == 'Invalid Date' && sunsetTwo == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursTwo] == 77) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 80) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 81) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 82) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 85) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 86) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 95) {
                                IconWeatherTwo.style.background = "url(styles/images/iconPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 96) {
                                IconWeatherTwo.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 99) {
                                IconWeatherTwo.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                            
                            
                            if (json.hourly.weathercode[hoursThree] == 0) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                                    console.log('день');
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/Moon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 1 || json.hourly.weathercode[hoursThree] == 2) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/cloudMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 3) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 45) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 48) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 51) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 53) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 55) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 56) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 57) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 61) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 63) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 65) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 66) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 67) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 71) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 73) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 75) {
                                if (DateLocaleTomorrowThree > sunriseThree && DateLocaleTomorrowThree < sunsetThree) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseThree == 'Invalid Date' && sunsetThree == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursThree] == 77) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 80) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 81) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 82) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 85) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 86) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 95) {
                                IconWeatherThree.style.background = "url(styles/images/iconPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 96) {
                                IconWeatherThree.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 99) {
                                IconWeatherThree.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                            
                            
                            if (json.hourly.weathercode[hoursFour] == 0) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                                    console.log('день');
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/Moon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 1 || json.hourly.weathercode[hoursFour] == 2) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/cloudMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 3) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 45) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 48) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 51) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 53) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 55) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 56) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 57) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 61) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 63) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 65) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 66) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 67) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 71) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMinMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 73) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMidMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 75) {
                                if (DateLocaleTomorrowFour > sunriseFour && DateLocaleTomorrowFour < sunsetFour) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                                    console.log('день');
                                } else if (sunriseFour == 'Invalid Date' && sunsetFour == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    console.log('ночь');
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                } else {
                                    IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMaxMoon.png) center no-repeat";
                                    console.log('ночь');
                                }
                            } else if (json.hourly.weathercode[hoursFour] == 77) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 80) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 81) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 82) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 85) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 86) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 95) {
                                IconWeatherFour.style.background = "url(styles/images/iconPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 96) {
                                IconWeatherFour.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 99) {
                                IconWeatherFour.style.background = "url(styles/images/iconPhenomenon/thunderstormRainMax.png) center no-repeat";
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
                            timeDownOne.innerHTML = hoursOneNotStatic + ":" + '00';
                            timeDownTwo.innerHTML = hoursTwoNotStatic + ":" + '00';
                            timeDownThree.innerHTML = hoursThreeNotStatic + ":" + '00';
                            timeDownFour.innerHTML = hoursFourNotStatic + ":" + '00';
                            console.log(json.timezone)
                            console.log(json)
                        }
                    )
            }
            forecast();
        })
}


input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        geocode();
    }
});

btnSearch.addEventListener("click", () => {
    geocode();
});

