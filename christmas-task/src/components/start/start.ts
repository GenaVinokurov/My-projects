import './start.scss';
import Toys from '../toys/toys';

new Toys();

class Start {
  startBtn: HTMLElement;
  startPage: HTMLElement;
  toysPage: HTMLElement;

  constructor() {
    this.startBtn = document.getElementById('startBtn') as HTMLElement;
    this.startPage = document.querySelector('.start-page') as HTMLElement;
    this.toysPage = document.querySelector('.toys-page') as HTMLElement;

    this.startBtn.addEventListener('click', this.start.bind(this));
  }

  start() {
    this.startPage.classList.add('hide');
    this.toysPage.classList.remove('hide');
  }

}

export default Start;