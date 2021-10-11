import "./style.scss";
import { tns } from "../node_modules/tiny-slider/src/tiny-slider"

var slider = tns({
  container: '.welcome-slider__wrapper',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  prevButton: '.slider__btn.prev',
  nextButton: '.slider__btn.next',
  controlsContainer: '.welcome-slider__btn-wrapper',
  mouseDrag: true,
  navContainer: '.welcome-slider__dots-wrapper',
  navItems: '.welcome-slider__dot',
  pages: '.welcome-slider__counter',
  loop: true,

});
var info = slider.getInfo(),
  current = document.querySelector('.currentSlide'),
  total = document.querySelector('.totalSlides');

current.textContent = slider.getInfo().displayIndex;
total.textContent = info.slideCount;

slider.events.on('transitionEnd', function (info) {
  current.textContent = slider.getInfo().displayIndex;
});


//-------------VIDEO

const playerRewind = document.querySelector('.player__rewind');
const playerVolume = document.querySelector('.player__volume');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playerButton = player.querySelector('.player__button');
const volumeButton = player.querySelector('.player__volume-btn');
const fullButton = player.querySelector('.player__fullscreen');
const playerBigPlay = player.querySelector('.player__big-play')

playerRewind.addEventListener('input', rewind);
playerVolume.addEventListener('input', rewind);
function rewind() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

playerVolume.addEventListener('input', function () {
  let v = this.value;
  video.volume = v;
  if (video.volume != 0) {
    volumeButton.classList.remove('mute');
  } else {
    volumeButton.classList.add('mute');
  }
})

function volumeFunc() {
  if (video.volume != 0) {
    video.volume = 0;
    volumeButton.classList.add('mute');
    playerVolume.value = 0
    playerVolume.style.background = `linear-gradient(to right, #710707 ${0 * 100}%, #710707 ${0}%, #C4C4C4 ${0}%, #C4C4C4 100%)`;
  } else {
    video.volume = 0.5;
    volumeButton.classList.remove('mute');
    playerVolume.value = 0.5;
    playerVolume.style.background = `linear-gradient(to right, #710707 ${0.5 * 100}%, #710707 ${0.5}%, #C4C4C4 ${0.5}%, #C4C4C4 100%)`;
  }
}

volumeButton.addEventListener('click', volumeFunc)

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  playerButton.classList.toggle('pause');
  playerBigPlay.classList.toggle('close');

}

playerButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
playerBigPlay.addEventListener('click', togglePlay);

video.ontimeupdate = function () {
  let d = video.duration;
  let c = video.currentTime;
  playerRewind.value = c / d;
  const value = playerRewind.value;
  playerRewind.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

playerRewind.addEventListener('click', function () {
  let w = this.offsetWidth;
  let o = event.offsetX;
  video.pause();
  video.currentTime = video.duration * (o / w);
  video.play();
  playerButton.classList.add('pause');
})
function fullScreenFunc() {
  if (document.fullscreenElement == null) {
    player.requestFullscreen();

  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();

    }
  }
}

fullButton.addEventListener('click', fullScreenFunc)

window.addEventListener('keydown', function (e) {
  const key = e.keyCode;
  e.preventDefault()
  if (key == 32) {
    togglePlay()
  }
  if (key == 77) {
    volumeFunc()
  }
  if (key == 70) {
    fullScreenFunc()
  }
})
//-------------------Video slider

// var slider = tns({
//   container: '.player__small-wrapper',
//   items: 3,
//   slideBy: 'page',
//   autoplay: false,
//   prevButton: '.player__arrow.prev',
//   nextButton: '.player__arrow.next',
//   // controlsContainer: '.welcome-slider__btn-wrapper',
//   mouseDrag: true,
//   navContainer: '.player__dots-wrapper',
//   navItems: '.player__dot',
//   loop: true,
//   swipeAngle: false,
//   rewind: true,
// });

var swiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 42,
  pagination: {
    el: ".player__swiper-dots",
    clickable: true,
  },
  navigation: {
    nextEl: '.player__arrow.next',
    prevEl: '.player__arrow.prev'
  }
});

//-------popup

const formBtn = document.querySelector('#formBtn');
const closeBtn = document.querySelector('#closeBtn');
const popup = document.querySelector('.popup');
const popupOverlay = document.querySelector('.popup-overlay');

formBtn.addEventListener('click', function () {
  popup.classList.toggle('active');
});
closeBtn.addEventListener('click', function () {
  popup.classList.toggle('active');
});
popupOverlay.addEventListener('click', function () {
  event.preventDefault();
  popup.classList.toggle('active');
});

//---------------------burger

const burgerBtn = document.querySelector('#burgerBtn');
const burgerMenu = document.querySelector('#burgerMenu');

burgerBtn.addEventListener('click', burgerToggle);

function burgerToggle() {
  burgerMenu.classList.toggle('active');
  burgerBtn.classList.toggle('close')
}

//--------------------------------IMG--Comparing

function initComparisons() {
  var x, i;
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {

    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = (w / 2) + "px";
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
initComparisons();


//---------------Animation scroll

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const sliderImages = document.querySelectorAll('.gallery__img');

function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 3;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });

}

window.addEventListener('scroll', debounce(checkSlide));

// -----------------------MAP

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuYXZpbm9rdXJvdiIsImEiOiJja3Vqc2szMnUxc3M4MnBudmczc3dzdGM2In0.9bKxUn_PmsA37YfbnTpF8g';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3364, 48.86091],
  zoom: 16,
});

map.on('load', () => {
  map.addSource('mapillary', {
    'type': 'vector',
    'tiles': [
      'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}'
    ],
    'minzoom': 6,
    'maxzoom': 14
  });
  map.addLayer(
    {
      'id': 'mapillary', // Layer ID
      'type': 'line',
      'source': 'mapillary', // ID of the tile source created above
      'source-layer': 'sequence',
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-opacity': 0.6,
        'line-color': 'rgb(53, 175, 109)',
        'line-width': 2
      }
    },
    'road-label' // Arrange our new layer beneath this layer
  );
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker({
  'color': '#000000'
}).setLngLat([2.3364, 48.86091]).addTo(map)
const marker2 = new mapboxgl.Marker({
  'color': '#B3B3B3'
}).setLngLat([2.3333, 48.8602]).addTo(map)
const marker3 = new mapboxgl.Marker({
  'color': '#B3B3B3'
})
  .setLngLat([2.3397, 48.8607]).addTo(map)
const marker4 = new mapboxgl.Marker({
  'color': '#B3B3B3'
})
  .setLngLat([2.3330, 48.8619]).addTo(map)
const marker5 = new mapboxgl.Marker({
  'color': '#B3B3B3'
})
  .setLngLat([2.3365, 48.8625]).addTo(map)
