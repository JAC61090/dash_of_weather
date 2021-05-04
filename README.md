# dash_of_weather

# USAGE

Enter any ZipCode from US to see current weather details!
DASH OF WEATHER UTILIZES OPENWEATHERAPI to get the most accurate weather incase your wondering what to wear!

#DESCRIPTION
The current version of Dash of Weather app only supports current weather inside the United states, future updates of this app will include 5Day forcast, 16Day forecast and More features!

#CODE SNIPPET

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
           
 
 #GITHUB account
 JAC61090
 
