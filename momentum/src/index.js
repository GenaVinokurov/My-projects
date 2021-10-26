const body = document.querySelector('body');
// --------------------------------------Language

const langArr = {
  "greetingLang": {
    en: "Good",
    ru: "Добрый",
  },
  "greetingHolder": {
    en: "[Entry your name]",
    ru: "[Введите своё имя]",
  },
  "wind": {
    en: "wind speed: ",
    ru: "скорость ветра: ",
  },
  "humidity": {
    en: "humidity: ",
    ru: "влажность: ",
  },
  "town": {
    en: "[Entry your town]",
    ru: "[Введите свой город]",
  },
  "lang": {
    en: "Language",
    ru: "Язык",
  },
  "imgApi": {
    en: "Change img Api",
    ru: "Изменить источник",
  },
  "tag": {
    en: "Change tag",
    ru: "Изменить тэг",
  },
  "audio": {
    en: "Audio player",
    ru: "Музыкальный плеер",
  },
  "weather": {
    en: "Weather",
    ru: "Погода",
  },
  "quotes": {
    en: "Quotes",
    ru: "Цитаты",
  },
  "time": {
    en: "Time",
    ru: "Время",
  },
  "date": {
    en: "Date",
    ru: "Дата",
  },
}


const select = document.querySelector('.select-language');
const allLang = ['en', 'ru'];
select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + "#" + lang;
  location.reload();
}

let hash;
function changeLanguage() {
  hash = window.location.hash;
  hash = hash.substr(1);
  select.value = hash;
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#en";
    location.reload();
  }
  return hash
}
changeLanguage()

const textLang = document.querySelector('.text-lang');
const textImg = document.querySelector('.text-img');
const textTag = document.querySelector('.text-tag');
const textAudio = document.querySelector('.text-audio');
const textWeather = document.querySelector('.text-weather');
const textQuotes = document.querySelector('.text-quotes');
const textTime = document.querySelector('.text-time');
const textDate = document.querySelector('.text-date');

function changeLanguageSettings() {
  textLang.textContent = `${langArr['lang'][hash]}`;
  textImg.textContent = `${langArr['imgApi'][hash]}`;
  textTag.textContent = `${langArr['tag'][hash]}`;
  textAudio.textContent = `${langArr['audio'][hash]}`;
  textWeather.textContent = `${langArr['weather'][hash]}`;
  textQuotes.textContent = `${langArr['quotes'][hash]}`;
  textTime.textContent = `${langArr['time'][hash]}`;
  textDate.textContent = `${langArr['date'][hash]}`;
}
changeLanguageSettings();
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
  const currentDate = date.toLocaleDateString(`${hash}-Gb`, options);
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
  const greetingHolder = document.querySelector('.name');
  greetingHolder.placeholder = `${langArr['greetingHolder'][hash]}`;
  if (hash == 'en') {
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
  } else {
    if (hours < 6) {
      greeting = 'ночи';
    } else {
      if (hours < 12) {
        greeting = 'утро';
      } else {
        if (hours < 18) {
          greeting = 'день';
        } else {
          greeting = 'вечер';
        }
      }
    }
  }
  greetingHtml.textContent = `${langArr['greetingLang'][hash]} ${greeting}`;
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
  return greeting;
}
getTimeOfDate();

//-------------------API images
let tag = document.querySelector('.settings-tag');
async function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag.value}&client_id=iJnU4ANf7OMilWcHceHML6-byMSmZ8I6Nxqx092JVak`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = `${data.urls.regular}`;
  img.onload = () => {
    body.style.backgroundImage = `url('${data.urls.regular}')`;
  };
}

async function getLinkToImage2() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c3c902f067093ae4a02551d80c9a2ebb&tags=${tag.value}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  let randomNumImg;
  let min = Math.ceil(1);
  let max = Math.floor(40);
  randomNumImg = Math.floor(Math.random() * (max - min + 1)) + min;
  img.src = `${data.photos.photo[randomNumImg].url_l}`;
  img.onload = () => {
    body.style.backgroundImage = `url('${data.photos.photo[randomNumImg].url_l}')`;
  };
}
const selectImg = document.querySelector('.select-img');

selectImg.addEventListener('change', function () {
  if (selectImg.value === 'github') {
    setBg();
  }
  if (selectImg.value === 'unsplash') {
    getLinkToImage();
  }
  if (selectImg.value === 'flickr') {
    getLinkToImage2();
  }
});
tag.addEventListener('change', function () {
  if (selectImg.value === 'unsplash') {
    getLinkToImage();
  }
  if (selectImg.value === 'flickr') {
    getLinkToImage2();
  }
});
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
// setBg();

const nextBtn = document.querySelector('.slide-next');
const prevBtn = document.querySelector('.slide-prev');

const getSlideNext = function () {
  if (selectImg.value === 'github') {
    randomNum = (randomNum + 1 > 20) ? 1 : randomNum + 1;
    setBg();
  } else {
    if (selectImg.value === 'unsplash') {
      getLinkToImage()
    } else {
      if (selectImg.value === 'flickr') {
        getLinkToImage2()
      }
    }
  }

}
const getSlidePrev = function () {
  if (selectImg.value === 'github') {
    randomNum = (randomNum - 1 < 1) ? 20 : randomNum - 1;
    setBg();
  } else {
    if (selectImg.value === 'unsplash') {
      getLinkToImage()
    } else {
      if (selectImg.value === 'flickr') {
        getLinkToImage2()
      }
    }
  }
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
city.placeholder = langArr['town'][hash]
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${hash}&appid=94e79d036c9efc29c9a2c590a84d4fdc&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${langArr['wind'][hash]} ${Math.ceil(data.wind.speed)} m/c`
    humidity.textContent = `${langArr['humidity'][hash]} ${Math.ceil(data.main.humidity)} %`
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



// --------------------------------------------------Quote

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
async function getQuotes() {
  const quotes = `data-${hash}.json`;
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

const player = document.querySelector('.player');
const musicTitle = document.querySelector('.music-title');
const playerRewind = document.querySelector('.player__rewind');
const playerVolume = document.querySelector('.player__volume');
const volumeButton = document.querySelector('.player__volume-btn');

const play = document.querySelector('.play');
let isPlay = false;
const audio = new Audio();
let playNum = 0;
function playAudio() {
  audio.src = playList[playNum].src;
  const value = 0
  audio.currentTime = 0;
  if (isPlay === false) {
    audio.pause();
    audio.play();
    isPlay = true;
    play.classList.add('pause');
    playerRewind.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;

  } else {
    audio.pause()
    isPlay = false;
    play.classList.remove('pause');
    playerRewind.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;

  }
}
play.addEventListener('click', playAudio);

audio.addEventListener(
  "loadeddata",
  () => {
    console.log(audio.duration)
    player.querySelector(".player-time .length").textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .5;
  },
  false
);

setInterval(() => {
  player.querySelector(".player-time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

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

musicTitle.textContent = playList[playNum].title;
player.addEventListener('click', function () {
  musicTitle.textContent = playList[playNum].title;
  liCollection.forEach(i => i.classList.remove('item-active'));
  liCollection[playNum].classList.add('item-active');
})


function rewind() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

playerVolume.addEventListener('input', function () {
  let v = this.value;
  audio.volume = v;
  if (audio.volume != 0) {
    volumeButton.classList.remove('mute');
  } else {
    volumeButton.classList.add('mute');
  }
})

playerRewind.addEventListener('input', rewind);
playerVolume.addEventListener('input', rewind);

function volumeFunc() {
  if (audio.volume != 0) {
    audio.volume = 0;
    volumeButton.classList.add('mute');
    playerVolume.value = 0
    playerVolume.style.background = `linear-gradient(to right, #710707 ${0 * 100}%, #710707 ${0}%, #C4C4C4 ${0}%, #C4C4C4 100%)`;
  } else {
    audio.volume = 0.5;
    volumeButton.classList.remove('mute');
    playerVolume.value = 0.5;
    playerVolume.style.background = `linear-gradient(to right, #710707 ${0.5 * 100}%, #710707 ${0.5}%, #C4C4C4 ${0.5}%, #C4C4C4 100%)`;
  }
}
volumeButton.addEventListener('click', volumeFunc);

audio.ontimeupdate = function () {
  let d = audio.duration;
  let c = audio.currentTime;
  playerRewind.value = c / d;
  const value = playerRewind.value;
  playerRewind.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}
playerRewind.addEventListener('click', function () {
  let w = this.offsetWidth;
  let o = event.offsetX;
  audio.pause();
  audio.currentTime = audio.duration * (o / w);
  audio.play();
  play.classList.add('pause');
});

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

//-------------------settings

const settingsBtn = document.querySelector('.settings-btn');
const settingsWrapper = document.querySelector('.settings-wrapper');

settingsBtn.addEventListener('click', function () {
  settingsWrapper.classList.toggle('js-act');
});

//-----------------------Disabled

const check1 = document.getElementById('1');
const check2 = document.getElementById('2');
const check3 = document.getElementById('3');
const check4 = document.getElementById('4');
const check5 = document.getElementById('5');
const weather = document.querySelector('.weather');
const quoteWrapper = document.querySelector('.quote-wrapper');

check1.addEventListener('input', isCheck1);
check2.addEventListener('input', isCheck2);
check3.addEventListener('input', isCheck3);
check4.addEventListener('input', isCheck4);
check5.addEventListener('input', isCheck5);
function isCheck1() {
  let checkInput = check1;
  if (checkInput.checked) {
    player.classList.add('disabled');
  } else {
    player.classList.remove('disabled');
  }
}
function isCheck2() {
  let checkInput = check2;
  if (checkInput.checked) {
    weather.classList.add('disabled');
  } else {
    weather.classList.remove('disabled');
  }
}
function isCheck3() {
  let checkInput = check3;
  if (checkInput.checked) {
    quoteWrapper.classList.add('disabled');
  } else {
    quoteWrapper.classList.remove('disabled');
  }
}
function isCheck4() {
  let checkInput = check4;
  if (checkInput.checked) {
    timeHtml.classList.add('disabled');
  } else {
    timeHtml.classList.remove('disabled');
  }
}
function isCheck5() {
  let checkInput = check5;
  if (checkInput.checked) {
    dateHtml.classList.add('disabled');
  } else {
    dateHtml.classList.remove('disabled');
  }
}
// ------------------LocalStorage

function setLocalStorage() {
  localStorage.setItem('name', nameHtml.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('imgAPI', selectImg.value);
  // localStorage.setItem('check1', check1.checked);
  // localStorage.setItem('check2', check2.checked);
  // localStorage.setItem('check3', check3.checked);
  // localStorage.setItem('check4', check4.checked);
  // localStorage.setItem('check5', check5.checked);
}
function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameHtml.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('imgAPI')) {
    selectImg.value = localStorage.getItem('imgAPI');
  }
  // if (localStorage.getItem('check1')) {
  //   check1.checked = localStorage.getItem('check1');
  // }
  // if (localStorage.getItem('check2')) {
  //   check2.checked = localStorage.getItem('check2');
  // }
  // if (localStorage.getItem('check3')) {
  //   check3.checked = localStorage.getItem('check3');
  // }
  // if (localStorage.getItem('check4')) {
  //   check4.checked = localStorage.getItem('check4');
  // }
  // if (localStorage.getItem('check5')) {
  //   check5.checked = localStorage.getItem('check5');
  // }

}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

window.addEventListener('load', function () {
  if (selectImg.value === 'github') {
    setBg();
  }
  if (selectImg.value === 'unsplash') {
    getLinkToImage();
  }
  if (selectImg.value === 'flickr') {
    getLinkToImage2()
  }
  isCheck1();
  isCheck2();
  isCheck3();
  isCheck4();
  isCheck5();
});

