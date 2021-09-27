import "./style.scss";
// import "./tour-style.scss";
// import "./assets/video/video0.mp4";

// render();

//-------------VIDEO

const playerRewind = document.querySelector('.player__rewind');
const playerVolume = document.querySelector('.player__volume');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playerButton = player.querySelector('.player__button');
const volumeButton = player.querySelector('.player__volume-btn');
const fullButton = player.querySelector('.player__fullscreen');


playerRewind.addEventListener('input', rewind);
playerVolume.addEventListener('input', rewind);
function rewind() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 ${value * 100}%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

playerVolume.addEventListener('input', function () {
  let v = this.value;
  video.volume = v;
})

volumeButton.addEventListener('click', function () {
  if (video.volume != 0) {
    video.volume = 0;
    volumeButton.classList.add('mute');
  } else {
    video.volume = 1;
    volumeButton.classList.remove('mute');
  }
})

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  playerButton.classList.toggle('pause')

}

playerButton.addEventListener('click', togglePlay);

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

fullButton.addEventListener('click', function () {
  if (document.fullscreenElement == null) {
    player.requestFullscreen();
    // video.classList.add('video-fullscreen');
    // fullButton.classList.add('exit-fullscreen')
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
      // video.classList.remove('video-fullscreen');
      // fullButton.classList.remove('exit-fullscreen')
    }
  }
})

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