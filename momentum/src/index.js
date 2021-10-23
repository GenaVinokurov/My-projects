const body = document.querySelector('body');

//------------------------------------------TIME
const timeHtml = document.querySelector('.time');
const dateHtml = document.querySelector('.date');
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString('en-US', { hour12: false });
  timeHtml.textContent = currentTime;
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Europe/Minsk' };
  const currentDate = date.toLocaleDateString('en-Gb', options);
  dateHtml.textContent = currentDate;
  setTimeout(showDate, 1000);
}
showDate();
// ----------------------------------------Greetings
let greeting = '';
const getTimeOfDate = function () {
  const date = new Date();
  const hours = date.getHours();
  const greetingHtml = document.querySelector('.greeting');
  if (hours < 6) {
    greeting = 'night';
  } else {
    if (hours < 12) {
      greeting = 'morning';
    } else {
      if (hours < 18) {
        greeting = 'afternoon';
      } else {
        greeting = 'evening';
      }
    }
  }
  greetingHtml.textContent = `Good ${greeting}`;
  return greeting;
}
getTimeOfDate();



//-------------------------------------------Change BG image



let randomNum;
let min;
let max;
const getRandomNum = function () {
  min = Math.ceil(1);
  max = Math.floor(20);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
getRandomNum()

function setBg() {
  const img = new Image();
  const randomNumBg = String(randomNum).padStart(2, '0');
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${randomNumBg}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${randomNumBg}.jpg')`;
  };
}
setBg();

const nextBtn = document.querySelector('.slide-next');
const prevBtn = document.querySelector('.slide-prev');
// let randomNum = randomNum;

const getSlideNext = function () {
  randomNum = (randomNum + 1 > 20) ? 1 : randomNum + 1;
  setBg();
}
const getSlidePrev = function () {
  randomNum = (randomNum - 1 < 1) ? 20 : randomNum - 1;
  setBg();
}

nextBtn.addEventListener('click', getSlideNext);
prevBtn.addEventListener('click', getSlidePrev);

//---------------------------------------------------Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=94e79d036c9efc29c9a2c590a84d4fdc&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/c`
    humidity.textContent = `Humidity: ${Math.ceil(data.main.humidity)} %`
  }
  catch (err) {
    if (city.value == '') {
      temperature.textContent = `Error! Nothing to geocode`;
      weatherDescription.textContent = '';
      wind.textContent = ' ';
      humidity.textContent = '';
    } else {
      weatherIcon.className = '';
      temperature.textContent = `Error: city not found for: ${city.value}`;
      weatherDescription.textContent = '';
      wind.textContent = ' ';
      humidity.textContent = '';
    }
  }
}
getWeather();

city.addEventListener('change', getWeather);

const nameHtml = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', nameHtml.value);
  localStorage.setItem('city', city.value);
}
function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameHtml.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

// --------------------------------------------------Quote

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
async function getQuotes() {
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const properties = Object.getOwnPropertyNames(data);
  properties.splice([properties.length - 1], 1)
  const index = Math.floor(Math.random() * properties.length);
  const output = {};
  output[properties[index]] = data[properties[index]];
  const quotesObject = Object.values(output);
  const quotesArray = Object.values(quotesObject[0]);
  quote.textContent = quotesArray[0];
  author.textContent = quotesArray[1];
}
getQuotes();

quoteButton.addEventListener('click', getQuotes);

//----------------------------------Audio player
import playList from '../src/playList.js';

const play = document.querySelector('.play');
let isPlay = false;
const audio = new Audio();
let playNum = 0;
function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (isPlay === false) {
    audio.pause();
    audio.play();
    isPlay = true;
    play.classList.add('pause');
  } else {
    audio.pause()
    isPlay = false;
    play.classList.remove('pause');
  }
}
play.addEventListener('click', playAudio);

const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');

function playNext() {
  if (playNum > 3) {
    playNum = -1;
  }
  playNum = playNum + 1;
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play()
  isPlay = true;
  play.classList.add('pause');
}
function playPrev() {
  if (playNum < 1) {
    playNum = 5;
  }
  playNum = playNum - 1;
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play()
  isPlay = true;
  play.classList.add('pause');
}
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list');
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.textContent = playList[i].title;
  li.classList.add('play-item');
  playListContainer.append(li);
}

const liCollection = document.querySelectorAll('.play-item');
liCollection[playNum].classList.add('item-active')

document.addEventListener('click', function (e) {
  liCollection.forEach(i => i.classList.remove('item-active'));
  liCollection[playNum].classList.add('item-active');
})