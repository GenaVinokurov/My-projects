const volumeRewind = document.querySelector('.volume');
const timeRewind = document.querySelector('.time');
const btnSave = document.querySelector('.btn-save');
const btnSettings = document.querySelector("#btnSettings");
const mainScreen = document.querySelector('.main-screen');
const settings = document.querySelector('.settings');
function rewind() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #15f54d ${value * 100}%, #15f54d ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}
volumeRewind.addEventListener('input', rewind);
timeRewind.addEventListener('input', rewind);


btnSettings.addEventListener('click', function () {
  settings.classList.remove('hide');
  mainScreen.classList.add('hide');
})

btnSave.addEventListener('click', function () {
  settings.classList.add('hide');
  mainScreen.classList.remove('hide');
})




export { mainScreen };