// Элементы управления

const SEARCH_BUTTON = document.querySelector("#search-button");
const SEARCH_CITY_INPUT = document.querySelector("#city-input");

// Контейнер для отображения

const LOADING_TEXT = document.querySelector("#load");
const WEATHER_INFO_CONTAINER = document.querySelector("#weather-info-container");
const WEATHER_ICON = document.querySelector("#weather-icon")
const ERROR_CONTAINER = document.querySelector("#error-container");


// Тексты с информацией

const WEATHER_CITY = document.querySelector("#weather-city");
const WEATHER_TEMP = document.querySelector("#weather-temp");
const ERROR_COD = document.querySelector("#error-cod");
const ERROR_CITY = document.querySelector("#error-city");

// наш APP_ID
const APP_ID = "3b16a96f6bb02d14c6afbe8fbbfafbcf";

// создадим асинхронную функцию searchWeatherForCity, которая будет 
// делать наш запрос на openweatherapp и показыват блок с погодой или 
// с ошибкой, в зависимости от результата выполнения запроса

const createWeaterCard = (weatherData) => {
  WEATHER_TEMP.textContent = Math.round(weatherData.main.temp - 273.15) + "°";
  WEATHER_CITY.textContent = weatherData.name;
  WEATHER_ICON.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  LOADING_TEXT.style.display = "none";
  ERROR_CONTAINER.style.display = "none";
  WEATHER_INFO_CONTAINER.style.display = "flex";
};

async function searchWeatherForCity() {
  // получаем данные с инпута SEARCH_CITY_INPUT и убираем пробелы
  const CITY_NAME = SEARCH_CITY_INPUT.value.trim();
  console.log(CITY_NAME);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${APP_ID}`

  if (CITY_NAME.length === 0) {
    return alert("Please enter a city name");
  }

  LOADING_TEXT.style.display = "flex";
  ERROR_CONTAINER.style.display = "none";
  WEATHER_INFO_CONTAINER.style.display = "none";

  try {
    const response = await fetch(URL);
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      LOADING_TEXT.style.display = "none";
      WEATHER_INFO_CONTAINER.style.display = "none";
      ERROR_CONTAINER.style.display = "flex";
    
      ERROR_COD.textContent = result.cod;
      ERROR_CITY.textContent = result.message;

      throw Object.assign(new Error("Reqest failed"), {
        response: result
      })
    }


    createWeaterCard(result);

  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
}

SEARCH_BUTTON.addEventListener("click", searchWeatherForCity);
