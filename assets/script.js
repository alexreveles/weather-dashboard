const cities = [];


let currentDay = moment().format('MM/DD/YYYY');
let tomorrow = moment().add(1, 'days').format('MM/DD/YYYY');
let twoDays = moment().add(2, 'days').format('MM/DD/YYYY');
let threeDays = moment().add(3, 'days').format('MM/DD/YYYY');
let fourDays = moment().add(4, 'days').format('MM/DD/YYYY');
let fiveDays = moment().add(5, 'days').format('MM/DD/YYYY');
console.log(currentDay);





const fiveDayForecast = document.querySelector('#fiveDayForecast');

$(document).ready(function () {
  const API_KEY = "ac39cc409ece99f7dd30f822b9a7aab5";
  
  
  $("#save-city").on("click", function () {
    const searchCity = $("#searchCity").val();
    cityHistory(searchCity);
    getCityWeather(searchCity);
    addLocalStorage(searchCity);
    fiveDayCast(searchCity);
  });



  function cityHistory(searchCity) {
      let cityHistoryEl = document.querySelector('.listCities');
      let cityEl = document.createElement('button');
      cityEl.setAttribute('class', 'city-item');
      cityEl.textContent = searchCity;
      cityHistoryEl.append(cityEl);
  } 




  function addLocalStorage(city){
    let searchHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];
      if(searchHistory.indexOf(city) === -1){
          console.log(searchHistory);
        searchHistory.push(city);
        window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

      }
      
      console.log(city);
  }





  function getCityWeather(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=imperial"
    )
      
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        // live share
        let currentWeatherEl = document.querySelector("#currentWeather");
        currentWeatherEl.innerHTML = "";

        let heading = document.createElement("h3");
        heading.textContent = data.name;
        currentWeatherEl.appendChild(heading);

        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            data.coord.lat +
            "&lon=" +
            data.coord.lon +
            "&appid=" +
            API_KEY +
            "&units=imperial&exclude=minutely,hourly"
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            let weatherIcon = document.createElement("img");
            let temp = document.createElement("p");
            let humid = document.createElement("p");
            let windSpeed = document.createElement("p");
            let UVIndex = document.createElement("p");

            weatherIcon.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" +
                data.current.weather[0].icon +
                "@2x.png"
            );
            temp.textContent = "Temperature: " + data.current.temp + " ºf";
            humid.textContent = "Humidity: " + data.current.humidity;
            windSpeed.textContent = "Wind speed: " + data.current.wind_speed;
            UVIndex.textContent = "UV Index: " + data.current.uvi;

            currentWeatherEl.appendChild(weatherIcon);
            currentWeatherEl.appendChild(temp);
            currentWeatherEl.appendChild(humid);
            currentWeatherEl.appendChild(windSpeed);
            currentWeatherEl.appendChild(UVIndex);

            ////////////////  5 day cast/////////////////////
          });
      });
  }

  function fiveDayCast(city) {
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + 
      city + "&appid=" +
      API_KEY +
      "&units=imperial"
      )

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);


        

        tomorrowdate = document.createElement('p');
        tomorrowdate.textContent = tomorrow
        fiveDayForecast.appendChild(tomorrowdate);

        tomorrowtemp = document.createElement('p');
        tomorrowtemp.textContent = data.list[4].main.temp
        fiveDayForecast.appendChild(tomorrowtemp);

        tomorrowHum = document.createElement('p');
        tomorrowHum.textContent = data.list[4].main.humidity
        fiveDayForecast.appendChild(tomorrowHum);


    })
  }

  


      

});
