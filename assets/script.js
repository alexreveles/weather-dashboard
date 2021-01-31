$(document).ready(function () {
  const API_KEY = "ac39cc409ece99f7dd30f822b9a7aab5";
  let searchHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];

  let currentDay = moment().format("MM/DD/YYYY");
  console.log(currentDay);

  let fiveDayForecast = document.querySelector(".fiveDayForecast");
  cityHistory();

  $("#save-city").on("click", function () {
    const searchCity = $("#searchCity").val();
    getCityWeather(searchCity);
    addLocalStorage(searchCity);
    cityHistory(searchCity);
    fiveDayCast(searchCity);
    $("#searchCity").val("");
  });

  $(".city-item").on("click", function (event) {
    const searchCity = event.target.textContent;
    getCityWeather(searchCity);
    addLocalStorage(searchCity);
    cityHistory(searchCity);
    fiveDayCast(searchCity);
  });

  console.log(searchHistory);

  function cityHistory() {
    let cityHistoryEl = document.querySelector(".listCities");
    cityHistoryEl.innerHTML = "";

    for (let i = 0; i < searchHistory.length; i++) {
      let cityEl = document.createElement("button");
      cityEl.setAttribute("class", "city-item");
      cityEl.textContent = searchHistory[i];
      cityHistoryEl.append(cityEl);
    }
  }

  function addLocalStorage(city) {
    if (searchHistory.indexOf(city) === -1) {
      console.log(searchHistory);
      searchHistory.push(city);
      window.localStorage.setItem(
        "searchHistory",
        JSON.stringify(searchHistory)
      );
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

            let todays = document.createElement("p");
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

            // conditional statement for uv index


            
            todays.textContent = "Todays Date: " + currentDay;
            temp.textContent = "Temperature: " + data.current.temp + " ºf";
            humid.textContent = "Humidity: " + data.current.humidity;
            windSpeed.textContent = "Wind speed: " + data.current.wind_speed;
            UVIndex.textContent = "UV Index: " + data.current.uvi;

            currentWeatherEl.appendChild(todays);
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
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=imperial"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        fiveDayForecast.innerHTML = "";

        ////////cast for tomorrow weather//////////

        // tomorrowCol = document.createElement('div');
        // tomorrowCol.addClass('col-md-2');
        // fiveDayForecast.appendChild(tomorrowCol);

        for (let i = 0; i < 40; i += 8) {
          let date = data.list[i].dt;
          let betterDate = new Date(date * 1000);

          tomorrowdateContainer = document.createElement("div");
          tomorrowdateContainer.setAttribute('class', 'col');
          tomorrowdate = document.createElement("p");
          tomorrowdate.textContent = betterDate.toDateString();
          tomorrowdateContainer.appendChild(tomorrowdate);

          tomorrowIcon = document.createElement("img");
          tomorrowIcon.setAttribute(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              "@2x.png"
          );
          tomorrowdateContainer.appendChild(tomorrowIcon);

          tomorrowtemp = document.createElement("p");
          tomorrowtemp.textContent = "Temperature: " + data.list[i].main.temp;
          tomorrowdateContainer.appendChild(tomorrowtemp);

          tomorrowHum = document.createElement("p");
          tomorrowHum.textContent = "Humidity: " + data.list[i].main.humidity;
          
          tomorrowdateContainer.appendChild(tomorrowHum);
          fiveDayForecast.appendChild(tomorrowdateContainer);
        }

        /// two days

        // twoDaysdate = document.createElement("p");
        // twoDaysdate.textContent = twoDays;
        // fiveDayForecast.appendChild(twoDaysdate);

        // twoDaysIcon = document.createElement("img");
        // twoDaysIcon.setAttribute(
        //   "src",
        //   "http://openweathermap.org/img/wn/" +
        //     data.list[11].weather[0].icon +
        //     "@2x.png"
        // );
        // fiveDayForecast.appendChild(twoDaysIcon);

        // twoDaysTemp = document.createElement("p");
        // twoDaysTemp.textContent = "Temperature: " + data.list[11].main.temp;
        // fiveDayForecast.appendChild(twoDaysTemp);

        // twoDaysHum = document.createElement("p");
        // twoDaysHum.textContent = "Humidity: " + data.list[11].main.humidity;
        // fiveDayForecast.appendChild(twoDaysHum);

        // // three days

        // threeDaysdate = document.createElement("p");
        // threeDaysdate.textContent = threeDays;
        // fiveDayForecast.appendChild(threeDaysdate);

        // threeDaysIcon = document.createElement("img");
        // threeDaysIcon.setAttribute(
        //   "src",
        //   "http://openweathermap.org/img/wn/" +
        //     data.list[16].weather[0].icon +
        //     "@2x.png"
        // );
        // fiveDayForecast.appendChild(threeDaysIcon);

        // threeDaysTemp = document.createElement("p");
        // threeDaysTemp.textContent = "Temperature: " + data.list[16].main.temp;
        // fiveDayForecast.appendChild(threeDaysTemp);

        // threeDaysHum = document.createElement("p");
        // threeDaysHum.textContent = "Humidity: " + data.list[16].main.humidity;
        // fiveDayForecast.appendChild(threeDaysHum);

        // // four days

        // fourDaysdate = document.createElement("p");
        // fourDaysdate.textContent = fourDays;
        // fiveDayForecast.appendChild(fourDaysdate);

        // fourDaysIcon = document.createElement("img");
        // fourDaysIcon.setAttribute(
        //   "src",
        //   "http://openweathermap.org/img/wn/" +
        //     data.list[27].weather[0].icon +
        //     "@2x.png"
        // );
        // fiveDayForecast.appendChild(fourDaysIcon);

        // fourDaysTemp = document.createElement("p");
        // fourDaysTemp.textContent = "Temperature: " + data.list[27].main.temp;
        // fiveDayForecast.appendChild(fourDaysTemp);

        // fourDaysHum = document.createElement("p");
        // fourDaysHum.textContent = "Humidity: " + data.list[27].main.humidity;
        // fiveDayForecast.appendChild(fourDaysHum);

        // // five day

        // fiveDaysdate = document.createElement("p");
        // fiveDaysdate.textContent = fiveDays;
        // fiveDayForecast.appendChild(fiveDaysdate);

        // fiveDaysIcon = document.createElement("img");
        // fiveDaysIcon.setAttribute(
        //   "src",
        //   "http://openweathermap.org/img/wn/" +
        //     data.list[30].weather[0].icon +
        //     "@2x.png"
        // );
        // fiveDayForecast.appendChild(fourDaysIcon);

        // fiveDaysTemp = document.createElement("p");
        // fiveDaysTemp.textContent = "Temperature: " + data.list[30].main.temp;
        // fiveDayForecast.appendChild(fiveDaysTemp);

        // fiveDaysHum = document.createElement("p");
        // fiveDaysHum.textContent = "humidity: " + data.list[30].main.temp;
        // fiveDayForecast.appendChild(fiveDaysHum);
      });
  }
});
