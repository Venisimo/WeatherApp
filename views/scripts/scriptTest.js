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
                    apiWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure,windspeed_10m&current_weather=true&windspeed_unit=ms&forecast_days=2&timezone=auto`
                
                    if (city = '') {
                        return
                    }
                
                    fetch(apiWeather).then(response => response.json()).then(
                        json => {
                            let dat = new Date();
                            let month = "";
                            let hourNow = dat.getUTCHours();
                            let dayNow = dat.getUTCDate();
                            let minutesNow = dat.getUTCMinutes();
                            container.classList.add('active');
                            console.log(json);
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

                            TempCenter.innerHTML = `${parseInt(json.current_weather.temperature)}°C`;
                            BRWind.innerHTML = `${parseInt(json.current_weather.windspeed)} м/с`;
                            BRPressure.innerHTML = `${parseInt(json.hourly.surface_pressure[hourNow] * 0.75)} мм.`;
                            BRHumidity.innerHTML = `${json.hourly.relativehumidity_2m[hourNow]}%`;
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
                                wIcon.style.background = "url(styles/images/BIGicon/SunBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 1 || json.hourly.weathercode[hourNow] == 2) {
                                wIcon.style.background = "url(styles/images/BIGicon/cloudSunBIG.png) center no-repeat";
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
                                wIcon.style.background = "url(styles/images/BIGicon/rainMinSunBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 63) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainMidSunBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 65) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainMaxSunBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 66) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainSnowMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 67) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainSnowMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 71) {
                                wIcon.style.background = "url(styles/images/BIGicon/snowMinSunBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 73) {
                                wIcon.style.background = "url(styles/images/BIGicon/snowMidSunBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 75) {
                                wIcon.style.background = "url(styles/images/BIGicon/snowMaxSunBIG.png) center no-repeat";
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
                            } 


                            if (json.hourly.weathercode[hoursOne] == 0) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 1 || json.hourly.weathercode[hoursOne] == 2) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
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
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 63) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 65) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 66) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 67) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 71) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 73) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursOne] == 75) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
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
                            } 


                            if (json.hourly.weathercode[hoursTwo] == 0) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 1 || json.hourly.weathercode[hoursTwo] == 2) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
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
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 63) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 65) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 66) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 67) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 71) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 73) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursTwo] == 75) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
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
                            } 


                            if (json.hourly.weathercode[hoursThree] == 0) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 1 || json.hourly.weathercode[hoursThree] == 2) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
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
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 63) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 65) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 66) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 67) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 71) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 73) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursThree] == 75) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
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
                            } 


                            if (json.hourly.weathercode[hoursFour] == 0) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 1 || json.hourly.weathercode[hoursFour] == 2) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
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
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 63) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 65) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 66) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 67) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 71) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 73) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (json.hourly.weathercode[hoursFour] == 75) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
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
                            } 



                            

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
            forecast();
        })
}


input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        geocode();
        // forecast();
    }
});

btnSearch.addEventListener("click", () => {
    geocode();
    // forecast();
});


// $(document).ready(function(){
//     $("#slider").owlCarousel({
//         dots: false,
//         items: 4,
//         margin: 155
//     });
// });

