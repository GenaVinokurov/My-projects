import './tree.scss';

class Tree {
  audioControl: HTMLElement;
  constructor() {
    this.audioControl = document.querySelector('.audio-control') as HTMLElement;
  }
}

export default Tree;