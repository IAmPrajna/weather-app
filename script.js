const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "London";
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    console.log(e.target.innerHTML);
    fetchWeatherData();
    app.style.opacity = "0";
  });
});
form.addEventListener("submit", (e) => {
  console.log(search.ariaValueMax);
  e.preventDefault();
  if (search.value === "") {
    alert("please type a city name");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
});

function dayofTheWeek(day, month, year) {
  console.log(day, month, year);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${year}/${month}/${day}`).getDay()];
}

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=e669429a1a0d4df2829163533242802&q=${cityInput}`
  )
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;
      const date = data.location.localtime;
      console.log(date);
      const y = parseInt(date.substring(0, 4));
      const m = parseInt(date.substring(5, 7));
      const d = parseInt(date.substring(8, 10));
      const time = date.substring(11);
      dateOutput.innerHTML = `${dayofTheWeek(d, m, y)} ${d},${m},${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;
      const iconId = data.current.condition.icon.substring(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      icon.src = "./weather/64x64/" + iconId;
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";
      let timeofDay = "day";
      const code = data.current.condition.code;
      if (!data.current.is_day) {
        timeofDay = "night";
      }
      console.log(code);

      if (code == 1000) {
        app.style.backgroundImage = `url(https://img4.goodfon.com/wallpaper/nbig/6/61/nebo-oblaka-iasnaia-pogoda-priroda.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeofDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(https://cdn.pixabay.com/photo/2020/07/04/06/41/clouds-5368444_1280.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeofDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1050 ||
        code == 1053 ||
        code == 1180 ||
        code == 1183 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/rain.jpeg)`;
        btn.style.background = "#647d75";
        if (timeofDay == "night") {
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./images/snow.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeofDay == "night") {
          btn.style.background = "#1b1b1b";
          app.style.opacity = "1";
        }
      }
      app.style.opacity = "1";
    })

    .catch((err) => {
      console.log(err);
      alert("city not found,please try again");
      app.style.opacity = "1";
    });
}
fetchWeatherData();
app.style.opacity = "1";
