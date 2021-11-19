import Categories from "./categories";

class Settings {
  constructor() {
    this.volumeRewind = document.querySelector('.volume');
    this.timeRewind = document.querySelector('.time');
    this.btnSave = document.querySelector('.btn-save');
    this.btnSettings = document.querySelector("#btnSettings");
    this.settings = document.querySelector('.settings');
    this.mainScreen = document.querySelector('.main-screen');

    this.btnSettings.addEventListener('click', this.openSettings.bind(this))
    this.btnSave.addEventListener('click', this.saveSettings.bind(this))

    this.volumeRewind.addEventListener('input', this.rewind);
    this.timeRewind.addEventListener('input', this.rewind);
  }
  rewind() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #15f54d ${value * 100}%, #15f54d ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }
  saveSettings() {
    this.settings.classList.add('hide');
    this.mainScreen.classList.remove('hide');
  }
  openSettings() {
    this.settings.classList.remove('hide');
    this.mainScreen.classList.add('hide');
  }
  startQuiz() {
  }
}


export default Settings;