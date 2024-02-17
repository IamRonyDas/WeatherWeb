const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "Delhi";

const fetchData = async (target) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=0a8ada66c14b448cb74151419241301&q=${target}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const {
    current: {
      temp_c,
      condition: { text, icon },
    },
    location: { name, localtime },
  } = data;

  console.log(temp_c, name, localtime);
  // Calling update Dom Function
  updateDom(temp_c, name, localtime, icon, text);
};

function updateDom(temperate, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  console.log(emoji);
  temperatureField.innerText = temperate;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturdat";

    default:
      return "Don't Know";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
});
