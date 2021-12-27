import './tree.scss';
import RenderFavorites from '../../components/renderFavorites/renderFavorites';
import MainTree from '../../components/mainTree/mainTree';
new MainTree();

class Tree extends RenderFavorites {
  audioControl: HTMLElement;
  playAudio: boolean;
  music: HTMLAudioElement;
  garlandBtn: HTMLElement;
  garlandContainer: HTMLElement;
  multiBtn: HTMLElement;
  greenBtn: HTMLElement;
  blueBtn: HTMLElement;
  redBtn: HTMLElement;
  yellowBtn: HTMLElement;
  snowControl: HTMLElement;
  snowflake: HTMLElement;
  constructor() {
    super();
    this.audioControl = document.querySelector('.audio-control') as HTMLElement;
    this.music = new Audio();
    this.music.src = './assets/audio/audio.mp3';
    this.playAudio = false as boolean;
    this.audioControl.addEventListener('click', this.audio.bind(this));
    this.garlandBtn = document.querySelector('.btn-garland') as HTMLElement;
    this.garlandContainer = document.querySelector('.garland-tree-container') as HTMLElement;
    this.multiBtn = document.querySelector('.multicolor-btn') as HTMLElement;
    this.greenBtn = document.querySelector('.green-btn') as HTMLElement;
    this.blueBtn = document.querySelector('.blue-btn') as HTMLElement;
    this.redBtn = document.querySelector('.red-btn') as HTMLElement;
    this.yellowBtn = document.querySelector('.yellow-btn') as HTMLElement;
    this.snowControl = document.querySelector('.snow-control') as HTMLElement;
    this.snowflake = document.querySelector('.snowflake-container') as HTMLElement;
    this.multiBtn.addEventListener('click', this.changeColors.bind(this));
    this.greenBtn.addEventListener('click', this.changeColors.bind(this));
    this.blueBtn.addEventListener('click', this.changeColors.bind(this));
    this.redBtn.addEventListener('click', this.changeColors.bind(this));
    this.yellowBtn.addEventListener('click', this.changeColors.bind(this));
    this.garlandBtn.addEventListener('click', this.garlandSwitch.bind(this));
    this.snowControl.addEventListener('click', this.switchSnowflake.bind(this));
  }

  audio() {
    if (this.playAudio === false) {
      this.music.play();
      this.playAudio = true;
      this.audioControl.classList.add('active');
    } else if (this.playAudio === true) {
      this.music.pause();
      this.playAudio = false;
      this.audioControl.classList.remove('active');
    }
  }

  garlandSwitch() {
    this.garlandContainer.classList.toggle('hide');
    this.garlandBtn.classList.toggle('active');
    if (this.garlandBtn.classList.contains('active')) {
      this.garlandBtn.innerHTML = 'Выкл';
    } else {
      this.garlandBtn.innerHTML = 'Вкл';
    }
  }

  changeColors(event: Event) {
    const current = event.target as HTMLElement;
    const color = current.dataset.color;
    const lightropeCollection = document.querySelectorAll('.lightrope') as NodeList;
    lightropeCollection.forEach(item => {
      const list = item as HTMLElement;
      const listCollection = list.querySelectorAll('li');
      listCollection.forEach(elem => {
        elem.classList.remove('multicolor');
        elem.classList.remove('red');
        elem.classList.remove('green');
        elem.classList.remove('blue');
        elem.classList.remove('yellow');
        elem.classList.add(`${color}`);
      });
    });
  }

  switchSnowflake() {
    this.snowflake.classList.toggle('hide');
  }

}

export default Tree;