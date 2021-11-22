import Categories from "./categories";
import AudioMy from './audio';
class Settings {
  constructor() {
    this.volumeRewind = document.querySelector('.volume');
    this.timeRewind = document.querySelector('.time');
    this.btnSettings = document.querySelector("#btnSettings");
    this.btnSave = document.querySelector('.btn-save');
    this.settings = document.querySelector('.settings');
    this.mainScreen = document.querySelector('.main-screen');
    this.btnSettings.addEventListener('click', this.openSettings.bind(this))
    this.volumeRewind.addEventListener('input', this.rewind);
    this.timeRewind.addEventListener('input', this.isTime.bind(this));
    this.timeCheck = document.querySelector('.time-check');
    this.btnSave.addEventListener('click', this.saveSettings.bind(this))
    this.timer = 0
  }
  rewind() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #15f54d ${value * 100}%, #15f54d ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }
  openSettings() {
    this.settings.classList.remove('hide');
    this.mainScreen.classList.add('hide');
    const click = new AudioMy();
    click.click();
  }
  isTime() {
    const value = this.timeRewind.value / 30;
    this.timer = value * 30;
    if (this.timeCheck.checked) {
      this.timer = value;
    } else {
      this.timer = 0;
      this.timeRewind.value = 0;
    }
    this.timeRewind.style.background = `linear-gradient(to right, #15f54d ${value * 100}%, #15f54d ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;

  }
  saveSettings() {
    this.isTime();
    this.settings.classList.add('hide');
    this.mainScreen.classList.remove('hide');
    localStorage.setItem('time', this.timeRewind.value);
    localStorage.setItem('timeChecked', this.timeCheck.checked);
  }
}


export default Settings;