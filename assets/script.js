const API_KEY = 'ac39cc409ece99f7dd30f822b9a7aab5';
let searchHistory = localStorage.getItem('searchHistory') || [];

let getCityWeather = function() {
    let searchCity = document.querySelector('#searchCity').value;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + API_KEY + '&units=imperial')
    
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);

        let currentWeatherEl = document.querySelector('#currentWeather');
        currentWeatherEl.innerHTML = '';

        let heading = document.createElement('h2');
        heading.textContent = data.name;
        currentWeatherEl.appendChild(heading);

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + API_KEY + '&units=imperial&exclude=minutely,hourly')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            let weatherIcon = document.createElement('img');
            let temp = document.createElement('p');
            let humid = document.createElement('p');
            let windSpeed = document.createElement('p');
            let UVIndex = document.createElement('p');
            
            weatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon +'@2x.png');
            temp.textContent = 'Temperature: ' + data.current.temp + ' ºf';
            humid.textContent = 'Humidity: ' + data.current.humidity;
            windSpeed.textContent = 'Wind speed: ' + data.current.wind_speed;
            UVIndex.textContent = 'UV Index: ' + data.current.uvi;
            
            currentWeatherEl.appendChild(weatherIcon);
            currentWeatherEl.appendChild(temp);
            currentWeatherEl.appendChild(humid);
            currentWeatherEl.appendChild(windSpeed);
            currentWeatherEl.appendChild(UVIndex);


            // for loop for  5 day cast
        });
    });
    
};
 

