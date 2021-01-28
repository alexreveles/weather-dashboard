const cities = [];

$(document).ready(function () {
  const API_KEY = "ac39cc409ece99f7dd30f822b9a7aab5";
  
  
  $("#save-city").on("click", function () {
    const searchCity = $("#searchCity").val();
    cityHistory(searchCity);
    getCityWeather(searchCity);
    addLocalStorage(searchCity);
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

//   // retrieve from local storage
//   let cityAdder = document.querySelector('.cityAdder');
//   let listCities = document.querySelector('.listCities');

//   cityAdder.addEventListener('submit', addCity);
//   listCities.addEventListener('done', cityList );

//   function addCity(e) {
//       e.preventDefault();
//       const textCity = this.querySelector('[name=cityItem]').value;
//       addCity.push(textCity);
//   }
  
//   function cityList() {
//       console.log('done');
//   }


  ////////////////////////////////////////////////

  function getCityWeather(pizza) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        pizza +
        "&appid=" +
        API_KEY +
        "&units=imperial"
    )
      // also be typing heresdfgsdfgsdfgsdfg
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

            ////////////////for loop for  5 day cast/////////////////////
          });
      });
  }

  
});

// event listeners

