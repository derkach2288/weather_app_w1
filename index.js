// Элементы управления
const SEARCH_BUTTON = document.querySelector("#search-button");
const SEARCH_CITY_INPUT = document.querySelector("#city-input");

// Контейнеры для отображения
const LOADING_TEXT = document.querySelector("#load");
const WEATHER_INFO_CONTAINER = document.querySelector(
  "#weather-info-container"
);

// Тексты с информацией
const WEATHER_CITY = document.querySelector("#weather-city");
const WEATHER_ICON = document.querySelector("#weather-icon");

// Наш APP_ID
const APP_ID = "3b16a96f6bb02d14c6afbe8fbbfafbcf";

// Создадим функцию createWeatherCard, которая будет принимать в себя в кажестве аргумента
// данные о погоде в случае успешного ответа с сервера
const createWeaterCard = (weatherData) => {
  WEATHER_CITY.textContent = weatherData.name;
  // Добавление иконки
  WEATHER_ICON.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  // Делаем индикатор загрузки невидимым, а WEATHER_INFO_CONTAINER блок видимым
  LOADING_TEXT.style.display = "none";
  WEATHER_INFO_CONTAINER.style.display = "flex";
};

// Создадим асинхронную функцию searchWeatherForCity, которая будет делать наш запрос
// на openweatherapp и показазывать блок с погодой или с ошибкой, в зависимости от результата выполнения запроса
async function searchWeatherForCity() {
  // Получаем данные с инпута SEARCH_CITY_INPUT и убираем пробелы
  const CITY_NAME = SEARCH_CITY_INPUT.value.trim();

  // Создаем URL для запроса на openweathermap, прокинув CITY_NAME, APP_ID
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${APP_ID}`;

  // Проверяем ввел ли пользователь хоть 1 символ в инпут City Name,
  // если не ввел, то мы показываем alert и не выполняем функцию дальше,
  // если ввел, то продолжаем выполнение функции
  if (CITY_NAME.length === 0) {
    return alert("Please enter a city name");
  }

  // Показываем индикатор загрузки, и скрываем блок с погодой или с ошибкой
  LOADING_TEXT.style.display = "flex";
  WEATHER_INFO_CONTAINER.style.display = "none";

  // Создаем блок try - catch, чтобы ловить успешный результат выполнения запроса
  // или же ошибку
  try {
    const response = await fetch(URL);
    // декодирует ответ в формате JSON и возвращает промис, однако с помощью
    // await мы сразу получаем result
    const result = await response.json();
    console.log(result);

    // Явно провеяем, что если response.ok === false из-за специфики работы с fetch,
    // то генерируем ошибку, и вызывается блок catch
    if (!response.ok) {
      // Если статус ответа не в пределах 200-299, считаем это ошибкой
      // и гененируем ее таким образом, чтобы отдать result блоку catch
      throw Object.assign(new Error("Request failed"), {
        response: result,
      });
    }

    // Передаем функции createWeatherCard наш result, чтобы создать и показываем карточку с погодой
    createWeaterCard(result);
  } catch (error) {
    console.log(error);
    console.log(error.response);
    // тут нужно будет написатьь код по работае сошибками и их отображениямт на экране
  }
}

// Вызываем метод addEventListener для того, чтобы на click вызвать функцию searchWeatherForCity
SEARCH_BUTTON.addEventListener("click", searchWeatherForCity);