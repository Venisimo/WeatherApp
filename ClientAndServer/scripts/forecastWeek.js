const input = document.querySelector('.searchInput');
const container = document.querySelector('.container');
const rectangles = document.querySelector('.rectangles');
const search = document.querySelector('.search');
const BigRectangle = document.querySelector('.BigRectangle');
const BigRectangleNotFound = document.querySelector('.BigRectangleNotFound');
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

const windFive = document.querySelector('#windFive');
const airPressureFive = document.querySelector('#airPressureFive');
const humidityFive = document.querySelector('#humidityFive');

const windSix = document.querySelector('#windSix');
const airPressureSix = document.querySelector('#airPressureSix');
const humiditySix = document.querySelector('#humiditySix');

const windSeven = document.querySelector('#windSeven');
const airPressureSeven = document.querySelector('#airPressureSeven');
const humiditySeven = document.querySelector('#humiditySeven');

const date = document.querySelector('#date');
const hour = document.querySelector('#Hour');

const timeDownOne = document.querySelector('#timeDownOne');
const timeDownTwo = document.querySelector('#timeDownTwo');
const timeDownThree = document.querySelector('#timeDownThree');
const timeDownFour = document.querySelector('#timeDownFour');
const timeDownFive = document.querySelector('#timeDownFive');
const timeDownSix = document.querySelector('#timeDownSix');
const timeDownSeven = document.querySelector('#timeDownSeven');

const TempOne = document.querySelector('#TempOne');
const TempOneNight = document.querySelector('#TempOneNight');
const TempTwo = document.querySelector('#TempTwo');
const TempTwoNight = document.querySelector('#TempTwoNight');
const TempThree = document.querySelector('#TempThree');
const TempThreeNight = document.querySelector('#TempThreeNight');
const TempFour = document.querySelector('#TempFour');
const TempFourNight = document.querySelector('#TempFourNight');
const TempFive = document.querySelector('#TempFive');
const TempFiveNight = document.querySelector('#TempFiveNight');
const TempSix = document.querySelector('#TempSix');
const TempSixNight = document.querySelector('#TempSixNight');
const TempSeven = document.querySelector('#TempSeven');
const TempSevenNight = document.querySelector('#TempSevenNight');

const IconWeatherOne = document.querySelector('#IconWeatherOne');
const IconWeatherTwo = document.querySelector('#IconWeatherTwo');
const IconWeatherThree = document.querySelector('#IconWeatherThree');
const IconWeatherFour = document.querySelector('#IconWeatherFour');
const IconWeatherFive = document.querySelector('#IconWeatherFive');
const IconWeatherSix = document.querySelector('#IconWeatherSix');
const IconWeatherSeven = document.querySelector('#IconWeatherSeven');

let apiWeather;
let apiMap;
let city;
let lat;
let lon;
let degress = 'celsius';
let degressSign = '°C';

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialCity = urlParams.get('city');
    const initialDegress = urlParams.get('degress');
    if (initialDegress !== null){
        if (initialDegress == 'fahrenheit') {
            $('.checkboxInput').toggleClass('active');
            degress = 'celsius';
            degressSign = '°C';
            $('.C').css('color', '#fff');
            degress = 'fahrenheit';
            degressSign = '°F';
            $('.C').css('color', '#000');
        } else if (initialDegress == 'celsius') {
            $('.checkboxInput').remove('active');
            degress = 'celsius';
            degressSign = '°C';
            $('.C').css('color', '#fff');
        }   
    }
    if (initialCity !== null) {
        input.value = decodeURIComponent(initialCity);
        geocode();
    }
});

$(document).ready(function() {
    $(document).on('click', '.checkboxInput', function(event) {
        $(this).toggleClass('active');
        if (degressSign == '°F'){    
            degress = 'celsius';
            degressSign = '°C';
            $('.C').css('color', '#fff');
        }
        else{
            degress = 'fahrenheit';
            degressSign = '°F';
            $('.C').css('color', '#000');
        }
        let isChecked = $(this).find('input').prop('checked');
        $(this).find('input').prop('checked', !isChecked);
        if (input.value != "") {
            geocode();
        }
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('degress', degress);
        history.pushState({}, '', newUrl)
        return false;
    });
});

input.addEventListener('focus', function() {
    input.placeholder = "";
});

input.addEventListener('blur', function() {
    input.placeholder = "Введите названия локации";
});

input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        geocode();
    }
});

btnSearch.addEventListener("click", () => {
    if (input.value != "") {
        geocode();
    }
});

function geocode() {
    city = input.value;
    cityName.innerHTML = city;
    apiMap = `https://nominatim.openstreetmap.org/search.php?q=${city}&format=jsonv2`

    if (city == '') {
        return
    }

    fetch(apiMap).then(response => response.json()).then(
        json => {
                if(json.length == 0) {
                    container.classList.add('notFound');
                    BigRectangle.style.display = 'none';
                    BigRectangleNotFound.style.display = 'flex';
                    return
                }

                lat = parseFloat(json[0].lat);
                lon = parseFloat(json[0].lon);


                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('city', city);
                history.pushState({}, '', newUrl)

                function forecast() {
                    apiWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure,windspeed_10m&daily=sunrise,sunset&current_weather=true&windspeed_unit=ms&forecast_days=8&timezone=auto&temperature_unit=${degress}`;
                    
                    fetch(apiWeather).then(response => response.json()).then(
                        json => {
                            let dat = new Date();
                            let month = "";
                            let hourNow = dat.getUTCHours();
                            let dayNow = dat.getUTCDate();
                            let monthNow = dat.getUTCMonth();
                            let minutesNow = dat.getUTCMinutes();
                            BigRectangleNotFound.style.display = 'none';
                            BigRectangle.style.display = '';
                            container.classList.add('active');
                            container.classList.remove('notFound');          


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
                                    month = 'Apr';
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
                                    month = 'Aug';
                                    dayNow = 1;
                                    monthNow = 7;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayNow > 31) {
                                    month = 'Sep';
                                    dayNow = 1;
                                    monthNow = 7;
                                }
                            }
                            if (month == 'Sep') {
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


                            let DateLocale = new Date(dat.getUTCFullYear(), monthNow, dayNow, hourNow, minutesNow);
                            
                            let sunrise = new Date(json.daily.sunrise[0]);
                            let sunset = new Date(json.daily.sunset[0]);
    

                            TempCenter.innerHTML = `${parseInt(json.current_weather.temperature)}${degressSign}`;
                            BRWind.innerHTML = `${parseInt(json.current_weather.windspeed)} м/с`;
                            BRPressure.innerHTML = `${parseInt(json.hourly.surface_pressure[hourNow] * 0.75)} мм.`;
                            BRHumidity.innerHTML = `${json.hourly.relativehumidity_2m[hourNow]}%`;
                            
                            date.innerHTML = month + " " + dayNow;
                            let dayTempOne = 12;
                            for (let i = 12; i < 19; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempOne]) {
                                dayTempOne = i;
                              }
                            }
                            let nightOne = 22;
                            for (let i = 22; i < 29; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightOne]) {
                                    nightOne = i;
                                }
                              }

                            let dayTempTwo = 36;
                            for (let i = 36; i < 43; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempOne]) {
                                dayTempTwo = i;
                              }
                            }

                            let nightTwo = 46;
                            for (let i = 46; i < 53; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightTwo]) {
                                    nightTwo = i;
                                }
                              }
                           
                            let dayTempThree = 60;
                            for (let i = 60; i < 67; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempThree]) {
                                dayTempThree = i;
                              }
                            }

                            let nightThree = 70;
                            for (let i = 70; i < 73; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightThree]) {
                                    nightThree = i;
                                }
                              }

                            let dayTempFour = 84;
                            for (let i = 84; i < 91; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempFour]) {
                                dayTempFour = i;
                              }
                            }

                            let nightFour = 94;
                            for (let i = 94; i < 101; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightFour]) {
                                    nightFour = i;
                                }
                              }

                            let dayTempFive = 108;
                            for (let i = 108; i < 115; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempFive]) {
                                dayTempFive = i;
                              }
                            }

                            let nightFive = 118;
                            for (let i = 118; i < 125; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightFive]) {
                                    nightFive = i;
                                }
                              }

                            let dayTempSix = 132;
                            for (let i = 132; i < 139; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempSix]) {
                                dayTempSix = i;
                              }
                            }

                            let nightSix = 142;
                            for (let i = 142; i < 149; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightSix]) {
                                    nightSix = i;
                                }
                              }

                            let dayTempSeven = 156;
                            for (let i = 156; i < 163; i++) {
                              if(json.hourly.temperature_2m[i] > json.hourly.temperature_2m[dayTempSeven]) {
                                dayTempSeven = i;
                              }
                            }

                            let nightSeven = 166;
                            for (let i = 166; i < 173; i++) {
                                if(json.hourly.temperature_2m[i] < json.hourly.temperature_2m[nightSeven]) {
                                    nightSeven = i;
                                }
                              }

                            
                            let avgWindSpeedOne = 0;
                            let avgWindSpeedsum = 0;
                            for (let i = 0; i < 24; i++) {
                                avgWindSpeedsum += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedOne = avgWindSpeedsum / 24;

                            let avgWindSpeedTwo = 0;
                            let avgWindSpeedsumTwo = 0;
                            for (let i = 24; i < 48; i++) {
                                avgWindSpeedsumTwo += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedTwo = avgWindSpeedsumTwo / 24;

                            let avgWindSpeedThree = 0;
                            let avgWindSpeedsumThree = 0;
                            for (let i = 48; i < 72; i++) {
                                avgWindSpeedsumThree += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedThree = avgWindSpeedsumThree / 24;

                            let avgWindSpeedFour = 0;
                            let avgWindSpeedsumFour = 0;
                            for (let i = 72; i < 96; i++) {
                                avgWindSpeedsumFour += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedFour = avgWindSpeedsumFour / 24;

                            let avgWindSpeedFive = 0;
                            let avgWindSpeedsumFive = 0;
                            for (let i = 96; i < 120; i++) {
                                avgWindSpeedsumFive += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedFive = avgWindSpeedsumFive / 24;

                            let avgWindSpeedSix = 0;
                            let avgWindSpeedsumSix = 0;
                            for (let i = 120; i < 144; i++) {
                                avgWindSpeedsumSix += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedSix = avgWindSpeedsumSix / 24;

                            let avgWindSpeedSeven = 0;
                            let avgWindSpeedsumSeven = 0;
                            for (let i = 144; i < 168; i++) {
                                avgWindSpeedsumSeven += json.hourly.windspeed_10m[i];
                            }
                            avgWindSpeedSeven = avgWindSpeedsumSeven / 24;

                            
                            let avgAirPressureOne = 0;
                            let sumAirPressureOne = 0;
                            for (let i = 0; i < 24; i++) {
                                sumAirPressureOne += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureOne = sumAirPressureOne / 24;

                            let avgAirPressureTwo = 0;
                            let sumAirPressureTwo = 0;
                            for (let i = 24; i < 48; i++) {
                                sumAirPressureTwo += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureTwo = sumAirPressureTwo / 24;

                            let avgAirPressureThree = 0;
                            let sumAirPressureThree = 0;
                            for (let i = 48; i < 72; i++) {
                                sumAirPressureThree += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureThree = sumAirPressureThree / 24;

                            let avgAirPressureFour = 0;
                            let sumAirPressureFour = 0;
                            for (let i = 72; i < 96; i++) {
                                sumAirPressureFour += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureFour = sumAirPressureFour / 24;

                            let avgAirPressureFive = 0;
                            let sumAirPressureFive = 0;
                            for (let i = 96; i < 120; i++) {
                                sumAirPressureFive += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureFive = sumAirPressureFive / 24;

                            let avgAirPressureSix = 0;
                            let sumAirPressureSix = 0;
                            for (let i = 120; i < 144; i++) {
                                sumAirPressureSix += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureSix = sumAirPressureSix / 24;

                            let avgAirPressureSeven = 0;
                            let sumAirPressureSeven = 0;
                            for (let i = 144; i < 168; i++) {
                                sumAirPressureSeven += json.hourly.surface_pressure[i];
                            }
                            avgAirPressureSeven = sumAirPressureSeven / 24;

                            let avgHumidityOne = 0
                            let sumHumidityOne = 0
                            for (let i = 0; i < 24; i++) {
                                sumHumidityOne += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumidityOne = sumHumidityOne / 24;

                            let avgHumidityTwo = 0;
                            let sumHumidityTwo = 0;
                            for (let i = 24; i < 48; i++) {
                                sumHumidityTwo += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumidityTwo = sumHumidityTwo / 24;

                            let avgHumidityThree = 0;
                            let sumHumidityThree = 0;
                            for (let i = 48; i < 72; i++) {
                                sumHumidityThree += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumidityThree = sumHumidityThree / 24;

                            let avgHumidityFour = 0;
                            let sumHumidityFour = 0;
                            for (let i = 72; i < 96; i++) {
                                sumHumidityFour += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumidityFour = sumHumidityFour / 24;

                            let avgHumidityFive = 0;
                            let sumHumidityFive = 0;
                            for (let i = 96; i < 120; i++) {
                                sumHumidityFive += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumidityFive = sumHumidityFive / 24;

                            let avgHumiditySix = 0;
                            let sumHumiditySix = 0;
                            for (let i = 120; i < 144; i++) {
                                sumHumiditySix += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumiditySix = sumHumiditySix / 24;

                            let avgHumiditySeven = 0;
                            let sumHumiditySeven = 0;
                            for (let i = 144; i < 168; i++) {
                                sumHumiditySeven += json.hourly.relativehumidity_2m[i];
                            }
                            avgHumiditySeven = sumHumiditySeven / 24;

                            
                            arrWeatherCodeOne = [];
                            for (let i = 0; i < 24; i++) {
                            }
                            let countWeatherCodeOne = Object.create(null), maxWeatherCodeOne = 0, curWeatherCodeOne, resWeatherCodeOne;
                            for (let x of arrWeatherCodeOne) {
                              if ((curWeatherCodeOne = countWeatherCodeOne[x] = ~~countWeatherCodeOne[x] + 1) > maxWeatherCodeOne) {
                                maxWeatherCodeOne = curWeatherCodeOne;
                                resWeatherCodeOne = x;
                              }
                            }

                            arrWeatherCodeTwo = [];
                            for (let i = 24; i < 48; i++) {
                                arrWeatherCodeTwo.push(json.hourly.weathercode[i]);
                            }
                            let countWeatherCodeTwo = Object.create(null), maxWeatherCodeTwo = 0, curWeatherCodeTwo, resWeatherCodeTwo;
                            for (let x of arrWeatherCodeTwo) {
                              if ((curWeatherCodeTwo = countWeatherCodeTwo[x] = ~~countWeatherCodeTwo[x] + 1) > maxWeatherCodeTwo) {
                                maxWeatherCodeTwo = curWeatherCodeTwo;
                                resWeatherCodeTwo = x;
                              }
                            }


                            let arrWeatherCodeThree = [];
                            for (let i = 48; i < 72; i++) {
                                arrWeatherCodeThree.push(json.hourly.weathercode[i]);
                            }

                            let countWeatherCodeThree = Object.create(null);
                            let maxWeatherCodeThree = 0;
                            let curWeatherCodeThree;
                            let resWeatherCodeThree;

                            for (let x of arrWeatherCodeThree) {
                                if ((curWeatherCodeThree = countWeatherCodeThree[x] = ~~countWeatherCodeThree[x] + 1) > maxWeatherCodeThree) {
                                    maxWeatherCodeThree = curWeatherCodeThree;
                                    resWeatherCodeThree = x;
                                }
                            }


                            let arrWeatherCodeFour = [];
                            for (let i = 72; i < 96; i++) {
                                arrWeatherCodeFour.push(json.hourly.weathercode[i]);
                            }

                            let countWeatherCodeFour = Object.create(null);
                            let maxWeatherCodeFour = 0;
                            let curWeatherCodeFour;
                            let resWeatherCodeFour;

                            for (let x of arrWeatherCodeFour) {
                                if ((curWeatherCodeFour = countWeatherCodeFour[x] = ~~countWeatherCodeFour[x] + 1) > maxWeatherCodeFour) {
                                    maxWeatherCodeFour = curWeatherCodeFour;
                                    resWeatherCodeFour = x;
                                }
                            }


                            let arrWeatherCodeFive = [];
                            for (let i = 96; i < 120; i++) {
                                arrWeatherCodeFive.push(json.hourly.weathercode[i]);
                            }

                            let countWeatherCodeFive = Object.create(null);
                            let maxWeatherCodeFive = 0;
                            let curWeatherCodeFive;
                            let resWeatherCodeFive;

                            for (let x of arrWeatherCodeFive) {
                                if ((curWeatherCodeFive = countWeatherCodeFive[x] = ~~countWeatherCodeFive[x] + 1) > maxWeatherCodeFive) {
                                    maxWeatherCodeFive = curWeatherCodeFive;
                                    resWeatherCodeFive = x;
                                }
                            }


                            let arrWeatherCodeSix = [];
                            for (let i = 120; i < 144; i++) {
                                arrWeatherCodeSix.push(json.hourly.weathercode[i]);
                            }

                            let countWeatherCodeSix = Object.create(null);
                            let maxWeatherCodeSix = 0;
                            let curWeatherCodeSix;
                            let resWeatherCodeSix;

                            for (let x of arrWeatherCodeSix) {
                                if ((curWeatherCodeSix = countWeatherCodeSix[x] = ~~countWeatherCodeSix[x] + 1) > maxWeatherCodeSix) {
                                    maxWeatherCodeSix = curWeatherCodeSix;
                                    resWeatherCodeSix = x;
                                }
                            }

                            let arrWeatherCodeSeven = [];
                            for (let i = 144; i < 168; i++) {
                                arrWeatherCodeSeven.push(json.hourly.weathercode[i]);
                            }

                            let countWeatherCodeSeven = Object.create(null);
                            let maxWeatherCodeSeven = 0;
                            let curWeatherCodeSeven;
                            let resWeatherCodeSeven;

                            for (let x of arrWeatherCodeSeven) {
                                if ((curWeatherCodeSeven = countWeatherCodeSeven[x] = ~~countWeatherCodeSeven[x] + 1) > maxWeatherCodeSeven) {
                                    maxWeatherCodeSeven = curWeatherCodeSeven;
                                    resWeatherCodeSeven = x;
                                }
                            }


                            TempOne.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempOne])}${degressSign}`;
                            TempOneNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightOne])}${degressSign}`;
                            TempTwo.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempTwo])}${degressSign}`;
                            TempTwoNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightTwo])}${degressSign}`;
                            TempThree.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempThree])}${degressSign}`;
                            TempThreeNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightThree])}${degressSign}`;
                            TempFour.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempFour])}${degressSign}`;
                            TempFourNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightFour])}${degressSign}`;
                            TempFive.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempFive])}${degressSign}`;
                            TempFiveNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightFive])}${degressSign}`;
                            TempSix.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempSix])}${degressSign}`;
                            TempSixNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightSix])}${degressSign}`;
                            TempSeven.innerHTML = `Днем ${parseInt(json.hourly.temperature_2m[dayTempSeven])}${degressSign}`;
                            TempSevenNight.innerHTML = `Ночью ${parseInt(json.hourly.temperature_2m[nightSeven])}${degressSign}`;
                            

                            airPressureOne.innerHTML = `${parseInt(avgAirPressureOne * 0.75)} мм.`;
                            airPressureTwo.innerHTML = `${parseInt(avgAirPressureTwo * 0.75)} мм.`;
                            airPressureThree.innerHTML = `${parseInt(avgAirPressureThree * 0.75)} мм.`;
                            airPressureFour.innerHTML = `${parseInt(avgAirPressureFour * 0.75)} мм.`;
                            airPressureFive.innerHTML = `${parseInt(avgAirPressureFive * 0.75)} мм.`;
                            airPressureSix.innerHTML = `${parseInt(avgAirPressureSix * 0.75)} мм.`;
                            airPressureSeven.innerHTML = `${parseInt(avgAirPressureSeven * 0.75)} мм.`;

                            windOne.innerHTML = `${parseInt(avgWindSpeedOne)} м/с`;
                            windTwo.innerHTML = `${parseInt(avgWindSpeedTwo)} м/с`;
                            windThree.innerHTML = `${parseInt(avgWindSpeedThree)} м/с`;
                            windFour.innerHTML = `${parseInt(avgWindSpeedFour)} м/с`;
                            windFive.innerHTML = `${parseInt(avgWindSpeedFive)} м/с`;
                            windSix.innerHTML = `${parseInt(avgWindSpeedSix)} м/с`;
                            windSeven.innerHTML = `${parseInt(avgWindSpeedSeven)} м/с`;

                            humidityOne.innerHTML = `${parseInt(avgHumidityOne)} %`;
                            humidityTwo.innerHTML = `${parseInt(avgHumidityTwo)} %`;
                            humidityThree.innerHTML = `${parseInt(avgHumidityThree)} %`;
                            humidityFour.innerHTML = `${parseInt(avgHumidityFour)} %`;
                            humidityFive.innerHTML = `${parseInt(avgHumidityFive)} %`;
                            humiditySix.innerHTML = `${parseInt(avgHumiditySix)} %`;
                            humiditySeven.innerHTML = `${parseInt(avgHumiditySeven)} %`;

                            
                            if (json.hourly.weathercode[hourNow] == 0) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/SunBIG.png) center no-repeat";
                                    
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/MoonBIG.png) center no-repeat";
                                    
                                }
                            } else if (json.hourly.weathercode[hourNow] == 1 || json.hourly.weathercode[hourNow] == 2) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/cloudSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/cloudMoonBIG.png) center no-repeat";
                                    
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
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMinMoonBIG.png) center no-repeat";
                                    
                                }
                            } else if (json.hourly.weathercode[hourNow] == 63) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMidMoonBIG.png) center no-repeat";
                                    
                                }
                            } else if (json.hourly.weathercode[hourNow] == 65) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/rainMaxMoonBIG.png) center no-repeat";
                                    
                                }
                            } else if (json.hourly.weathercode[hourNow] == 66) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainSnowMinBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 67) {
                                wIcon.style.background = "url(styles/images/BIGicon/rainSnowMaxBIG.png) center no-repeat";
                            } else if (json.hourly.weathercode[hourNow] == 71) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMinMoonBIG.png) center no-repeat";
                                    
                                }
                            } else if (json.hourly.weathercode[hourNow] == 73) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMidMoonBIG.png) center no-repeat";
                                    
                                }
                            } else if (json.hourly.weathercode[hourNow] == 75) {
                                if (DateLocale > sunrise && DateLocale < sunset) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow > 2 && monthNow < 8) {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxSunBIG.png) center no-repeat";
                                    
                                } else if (sunrise == 'Invalid Date' && sunset == 'Invalid Date' && monthNow < 2 || monthNow > 8) {
                                    
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxMoonBIG.png) center no-repeat";
                                } else {
                                    wIcon.style.background = "url(styles/images/BIGicon/snowMaxMoonBIG.png) center no-repeat";
                                    
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
                            

                            if (resWeatherCodeOne == 0) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 1 || resWeatherCodeOne == 2) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 3) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeOne == 45) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeOne == 48) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeOne == 51) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeOne == 53) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeOne == 55) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeOne == 56) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeOne == 57) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeOne == 61) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 63) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 65) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 66) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeOne == 67) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeOne == 71) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 73) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 75) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeOne == 77) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeOne == 80) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeOne == 81) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeOne == 82) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeOne == 85) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeOne == 86) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeOne == 95) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeOne == 96) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeOne == 99) {
                                IconWeatherOne.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                            
                            
                            if (resWeatherCodeTwo == 0) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 1 || resWeatherCodeTwo == 2) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 3) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 45) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 48) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 51) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 53) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 55) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 56) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 57) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 61) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 63) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 65) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 66) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 67) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 71) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 73) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 75) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 77) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 80) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 81) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 82) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 85) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 86) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 95) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 96) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeTwo == 99) {
                                IconWeatherTwo.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                             

                            if (resWeatherCodeThree == 0) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 1 || resWeatherCodeThree == 2) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 3) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeThree == 45) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeThree == 48) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeThree == 51) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeThree == 53) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeThree == 55) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeThree == 56) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeThree == 57) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeThree == 61) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 63) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 65) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 66) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeThree == 67) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeThree == 71) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 73) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 75) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeThree == 77) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeThree == 80) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeThree == 81) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeThree == 82) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeThree == 85) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeThree == 86) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeThree == 95) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeThree == 96) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeThree == 99) {
                                IconWeatherThree.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }


                            if (resWeatherCodeFour == 0) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 1 || resWeatherCodeFour == 2) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 3) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeFour == 45) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeFour == 48) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeFour == 51) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeFour == 53) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeFour == 55) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeFour == 56) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeFour == 57) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeFour == 61) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 63) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 65) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 66) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeFour == 67) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeFour == 71) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 73) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 75) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeFour == 77) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeFour == 80) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeFour == 81) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeFour == 82) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeFour == 85) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeFour == 86) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeFour == 95) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeFour == 96) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeFour == 99) {
                                IconWeatherFour.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                

                            if (resWeatherCodeFive == 0) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 1 || resWeatherCodeFive == 2) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 3) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeFive == 45) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeFive == 48) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeFive == 51) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeFive == 53) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeFive == 55) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeFive == 56) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeFive == 57) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeFive == 61) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 63) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 65) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 66) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeFive == 67) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeFive == 71) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 73) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 75) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeFive == 77) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeFive == 80) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeFive == 81) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeFive == 82) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeFive == 85) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeFive == 86) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeFive == 95) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeFive == 96) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeFive == 99) {
                                IconWeatherFive.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                            
                            
                            if (resWeatherCodeSix == 0) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 1 || resWeatherCodeSix == 2) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 3) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeSix == 45) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeSix == 48) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeSix == 51) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeSix == 53) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeSix == 55) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeSix == 56) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeSix == 57) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeSix == 61) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 63) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 65) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 66) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeSix == 67) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeSix == 71) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 73) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 75) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeSix == 77) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeSix == 80) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeSix == 81) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeSix == 82) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeSix == 85) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeSix == 86) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeSix == 95) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeSix == 96) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeSix == 99) {
                                IconWeatherSix.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }
                            

                            if (resWeatherCodeSeven == 0) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/Sun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 1 || resWeatherCodeSeven == 2) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/cloudSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 3) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/cloud.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 45) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/haze.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 48) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/Freezehaze.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 51) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/drizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 53) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/drizzleMid.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 55) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/drizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 56) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMin.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 57) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/FreezeDrizzleMax.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 61) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainMinSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 63) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainMidSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 65) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 66) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainSnowMin.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 67) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainSnowMax.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 71) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/snowMinSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 73) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/snowMidSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 75) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/snowMaxSun.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 77) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/SnowGrains.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 80) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainMin.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 81) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainMid.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 82) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/rainMax.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 85) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/snowMid.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 86) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/snowMax.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 95) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/thunderstorm.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 96) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMin.png) center no-repeat";
                            } else if (resWeatherCodeSeven == 99) {
                                IconWeatherSeven.style.background = "url(styles/images/iconsPhenomenon/thunderstormRainMax.png) center no-repeat";
                            }

                            
                            let dayOne = dayNow;
                            if (month == 'Jan') {
                                if (dayOne > 31) {
                                    month = 'Feb';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (dayOne > 29) {
                                        month = 'Mar';
                                        dayOne = 1;
                                    } else if (dayOne > 28) {
                                        month = 'Mar';
                                        dayOne = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (dayOne > 31) {
                                    month = 'Apr';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (dayOne > 30) {
                                    month = 'May';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'May') {
                                if (dayOne > 31) {
                                    month = 'Jun';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (dayOne > 30) {
                                    month = 'Jul';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (dayOne > 31) {
                                    month = 'Aug';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayOne > 31) {
                                    month = 'Sep';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (dayOne > 30) {
                                    month = 'Oct';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (dayOne > 31) {
                                    month = 'Nov';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (dayOne > 30) {
                                    month = 'Dec';
                                    dayOne = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (dayOne > 31) {
                                    month = 'Jan';
                                    dayOne = 1;
                                }
                            }
                            timeDownOne.innerHTML = month + " " + dayOne;
                            let dayTwo = dayOne + 1;
                            if (month == 'Jan') {
                                if (dayTwo > 31) {
                                    month = 'Feb';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (dayTwo > 29) {
                                        month = 'Mar';
                                        dayTwo = 1;
                                    } else if (dayTwo > 28) {
                                        month = 'Mar';
                                        dayTwo = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (dayTwo > 31) {
                                    month = 'Apr';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (dayTwo > 30) {
                                    month = 'May';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'May') {
                                if (dayTwo > 31) {
                                    month = 'Jun';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (dayTwo > 30) {
                                    month = 'Jul';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (dayTwo > 31) {
                                    month = 'Aug';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayTwo > 31) {
                                    month = 'Sep';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (dayTwo > 30) {
                                    month = 'Oct';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (dayTwo > 31) {
                                    month = 'Nov';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (dayTwo > 30) {
                                    month = 'Dec';
                                    dayTwo = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (dayTwo > 31) {
                                    month = 'Jan';
                                    dayTwo = 1;
                                }
                            }
                            timeDownTwo.innerHTML = month + " " + dayTwo;
                            let dayThree = dayTwo + 1;
                            if (month == 'Jan') {
                                if (dayThree > 31) {
                                    month = 'Feb';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (dayThree > 29) {
                                        month = 'Mar';
                                        dayThree = 1;
                                    } else if (dayThree > 28) {
                                        month = 'Mar';
                                        dayThree = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (dayThree > 31) {
                                    month = 'Apr';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (dayThree > 30) {
                                    month = 'May';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'May') {
                                if (dayThree > 31) {
                                    month = 'Jun';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (dayThree > 30) {
                                    month = 'Jul';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (dayThree > 31) {
                                    month = 'Aug';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayThree > 31) {
                                    month = 'Sep';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (dayThree > 30) {
                                    month = 'Oct';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (dayThree > 31) {
                                    month = 'Nov';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (dayThree > 30) {
                                    month = 'Dec';
                                    dayThree = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (dayThree > 31) {
                                    month = 'Jan';
                                    dayThree = 1;
                                }
                            }
                            timeDownThree.innerHTML = month + " " + dayThree;
                            let dayFour = dayThree + 1;
                            if (month == 'Jan') {
                                if (dayFour > 31) {
                                    month = 'Feb';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (dayFour > 29) {
                                        month = 'Mar';
                                        dayFour = 1;
                                    } else if (dayFour > 28) {
                                        month = 'Mar';
                                        dayFour = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (dayFour > 31) {
                                    month = 'Apr';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (dayFour > 30) {
                                    month = 'May';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'May') {
                                if (dayFour > 31) {
                                    month = 'Jun';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (dayFour > 30) {
                                    month = 'July';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (dayFour > 31) {
                                    month = 'Aug';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayFour > 31) {
                                    month = 'Sep';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (dayFour > 30) {
                                    month = 'Oct';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (dayFour > 31) {
                                    month = 'Nov';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (dayFour > 30) {
                                    month = 'Dec';
                                    dayFour = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (dayFour > 31) {
                                    month = 'Jan';
                                    dayFour = 1;
                                }
                            }
                            timeDownFour.innerHTML = month + " " + dayFour;
                            let dayFive = dayFour + 1;
                            if (month == 'Jan') {
                                if (dayFive > 31) {
                                    month = 'Feb';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (dayFive > 29) {
                                        month = 'Mar';
                                        dayFive = 1;
                                    } else if (dayFive > 28) {
                                        month = 'Mar';
                                        dayFive = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (dayFive > 31) {
                                    month = 'Apr';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (dayFive > 30) {
                                    month = 'May';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'May') {
                                if (dayFive > 31) {
                                    month = 'Jun';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (dayFive > 30) {
                                    month = 'July';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (dayFive > 31) {
                                    month = 'Aug';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (dayFive > 31) {
                                    month = 'Sep';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (dayFive > 30) {
                                    month = 'Oct';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (dayFive > 31) {
                                    month = 'Nov';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (dayFive > 30) {
                                    month = 'Dec';
                                    dayFive = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (dayFive > 31) {
                                    month = 'Jan';
                                    dayFive = 1;
                                }
                            }
                            timeDownFive.innerHTML = month + " " + dayFive;
                            let daySix = dayFive + 1;
                            if (month == 'Jan') {
                                if (daySix > 31) {
                                    month = 'Feb';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (daySix > 29) {
                                        month = 'Mar';
                                        daySix = 1;
                                    } else if (daySix > 28) {
                                        month = 'Mar';
                                        daySix = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (daySix > 31) {
                                    month = 'Apr';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (daySix > 30) {
                                    month = 'May';
                                    daySix = 1;
                                }
                            }
                            if (month == 'May') {
                                if (daySix > 31) {
                                    month = 'Jun';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (daySix > 30) {
                                    month = 'Jul';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (daySix > 31) {
                                    month = 'Aug';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (daySix > 31) {
                                    month = 'Sep';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (daySix > 30) {
                                    month = 'Oct';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (daySix > 31) {
                                    month = 'Nov';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (daySix > 30) {
                                    month = 'Dec';
                                    daySix = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (daySix > 31) {
                                    month = 'Jan';
                                    daySix = 1;
                                }
                            }
                            timeDownSix.innerHTML = month + " " + daySix;
                            let daySeven = daySix + 1;
                            if (month == 'Jan') {
                                if (daySeven > 31) {
                                    month = 'Feb';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Feb') {
                                if (dat.getFullYear() % 4 == 0) {
                                    if (daySeven > 29) {
                                        month = 'Mar';
                                        daySeven = 1;
                                    } else if (daySeven > 28) {
                                        month = 'Mar';
                                        daySeven = 1;
                                    }
                                }
                            }
                            if (month == 'Mar') {
                                if (daySeven > 31) {
                                    month = 'Apr';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Apr') {
                                if (daySeven > 30) {
                                    month = 'May';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'May') {
                                if (daySeven > 31) {
                                    month = 'Jun';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Jun') {
                                if (daySeven > 30) {
                                    month = 'Jul';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Jul') {
                                if (daySeven > 31) {
                                    month = 'Aug';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Aug') {
                                if (daySeven > 31) {
                                    month = 'Sep';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Sep') {
                                if (daySeven > 30) {
                                    month = 'Oct';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Oct') {
                                if (daySeven > 31) {
                                    month = 'Nov';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Nov') {
                                if (daySeven > 30) {
                                    month = 'Dec';
                                    daySeven = 1;
                                }
                            }
                            if (month == 'Dec') {
                                if (daySeven > 31) {
                                    month = 'Jan';
                                    daySeven = 1;
                                }
                            }
                            timeDownSeven.innerHTML = month + " " + daySeven;
                            if (minutesNow < 10) {
                                minutesNow = '0' +  minutesNow;
                            }
                            if (hourNow < 10) {
                                hourNow = '0' +  hourNow;
                            }

                            hour.innerHTML = hourNow + ":" + minutesNow;
                        }
                    )
            }
            forecast();
        })
}


function initSlider() {
    if (window.innerWidth > 1000) {
        $("#slider").owlCarousel({
            dots: false,
            items: 4,
            margin: 155
        });
    } else {
        $("#slider").owlCarousel({
            dots: false,
            items: 2,
            margin: 50
        });
    }
}

$(document).ready(function() {
    initSlider(); 
    $(window).on('resize', function() {
        $("#slider").trigger('destroy.owl.carousel');
        initSlider();
    });
});
