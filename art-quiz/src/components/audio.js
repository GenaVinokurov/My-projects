class AudioMy {
  constructor() {
    this.audio = new Audio();
    this.error = new Audio();
    this.correct = new Audio();
    this.settings = document.querySelector('.settings');
    this.mainScreen = document.querySelector('.main-screen');
    this.volumeRewind = document.querySelector('.volume');
    this.volumeCheck = document.querySelector('.volume-check');
    this.btnSave = document.querySelector('.btn-save');
    this.volumeRewind.addEventListener('input', this.rewind.bind(this));
    this.btnSave.addEventListener('click', this.saveSettings.bind(this))
  }
  rewind() {
    const value = this.volumeRewind.value;
    this.audio.volume = value;
    this.error.volume = value;
    this.correct.volume = value;
    if (this.volumeCheck.checked) {
      this.audio.volume = value;
      this.error.volume = value;
      this.correct.volume = value;
    } else {
      this.audio.volume = 0;
      this.error.volume = 0;
      this.correct.volume = 0;
      this.volumeRewind.value = 0;
    }

  }
  click() {
    this.rewind()
    this.audio.src = './assets/audio/click.mp3';
    this.audio.play();
  }
  isError() {
    this.rewind()
    this.error.src = './assets/audio/wrong.mp3';
    this.error.play();
  }
  isCorrect() {
    this.rewind()
    this.correct.src = './assets/audio/correct.mp3';
    this.correct.play();
  }
  saveSettings() {
    this.rewind();
    this.settings.classList.add('hide');
    this.mainScreen.classList.remove('hide');
    this.click();
    localStorage.setItem('volume', this.volumeRewind.value);
    localStorage.setItem('volumeChecked', this.volumeCheck.checked);
  }
}
new Audio()

export default AudioMy