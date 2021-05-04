// country code for search
var countryCode = 'US'
// weather API key
var weatherApiKey = '87f6e78ea0698f1cde72c0bae0cf9a72'; 
// search field and submit button
var zipSearchTxt = $('#zipSearchInputField')
var searchBtn = $('#zipSearchBtn');
// weather data object
var weather = {
    city: "",
    img: "",
    imgDesc: "",
    temp: "",
    tempHigh: "",
    tempLow:"",
    windSpeed:"",
    windDirection:"",
    humidity: "",
    currentConditions: ""
};

// function which generates the weather data from the API
function getWeatherData() {
    // zipcode from the search form
    var zipCode = zipSearchTxt.val();
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${weatherApiKey}`;
    // 5 day forcast apikiey
    // var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&appid=${weatherApiKey}&cnt=5`;
    // checks to see if the zip code is not a number
    if (isNaN(parseInt(zipCode))) {
        // invalid zip
        zipSearchTxt.val('');
        return;
    }
    // fetch request to gather weather data
    fetch(weatherApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('data from api',data);
            // filling weather object with information from weather api
            weather.city = data.name;
            weather.temp = convertKelvin(data.main.temp);
            weather.humidity = data.main.humidity;
            weather.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weather.imgDesc = data.weather[0].description;
            weather.currentConditions = data.weather[0].main;
            weather.tempHigh = convertKelvin(data.main.temp_max);
            weather.tempLow = convertKelvin(data.main.temp_min);
            weather.windSpeed = data.wind.speed;
            weather.windDirection = data.wind.deg
            zipSearchTxt.val('');
            console.log('about to call update wether function!!')
            // calls to get the weather card to be updated
            updateCityWeatherCard();
        
            // handling a zipcode that is not working
        }).catch(function(err) {
            console.log("city does not exist",err);
            zipSearchTxt.val('');
            return;
        });
        

}
// event listener for the search form
searchBtn.on('click', getWeatherData);
// converts response temps to fahrenheit
function convertKelvin(temp) {
    return Math.floor((temp - 273.15) * (9/5) + 32);
}
function updateCityWeatherCard() {
    // clears any previous weather cards
    $('#weather-card').empty();
    // card appends with data
    console.log('about to append', weather)
    $('#weather-card').append(`<div class="card-content"><div class="media"><div class="media-left">` +
                              `<figure class="image is-48x48"><img src="${weather.img}" alt="${weather.imgDesc}"></figure></div>` +
                              `<div class="media-content"><p class="title is-4">${weather.city}</p>` +
                              `<p class="subtitle is-6">${weather.currentConditions}</p></div></div>` +
                              `<div class="content"><p>Temp: ${weather.temp} &#730F</p>` +
                              `<p>High: ${weather.tempHigh} &#730F</p>` +
                              `<p>Low: ${weather.tempLow} &#730F</p>` +
                              `<p>Humidity: ${weather.humidity}%</p>` +
                              `<p>Winds: ${weather.windSpeed}mph ${weather.windDirection}</p></div></div>`);
    
}