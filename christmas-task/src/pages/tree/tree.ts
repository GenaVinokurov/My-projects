import './tree.scss';
import RenderFavorites from '../../components/renderFavorites/renderFavorites';
import MainTree from '../../components/mainTree/mainTree';
new MainTree();
class Tree extends RenderFavorites {
  audioControl: HTMLElement;
  playAudio: boolean;
  music: HTMLAudioElement;
  constructor() {
    super();
    this.audioControl = document.querySelector('.audio-control') as HTMLElement;
    this.music = new Audio();
    this.music.src = './assets/audio/audio.mp3';
    this.playAudio = false as boolean;
    this.audioControl.addEventListener('click', this.audio.bind(this));

  }

  audio() {
    if (this.playAudio === false) {
      console.log(this.playAudio);
      this.music.play();
      this.playAudio = true;
    } else if (this.playAudio === true) {
      this.music.pause();
      console.log(this.playAudio);
      this.playAudio = false;
    }
  }

}

export default Tree;