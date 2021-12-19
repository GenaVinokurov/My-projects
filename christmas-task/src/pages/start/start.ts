import './start.scss';
import Toys from '../toys/toys';

new Toys();

class Start {
  startBtn: HTMLElement;
  startPage: HTMLElement;
  toysPage: HTMLElement;
  buttonBackMain: HTMLElement;
  switchToToys: HTMLElement;
  constructor() {
    this.startBtn = document.getElementById('startBtn') as HTMLElement;
    this.startPage = document.querySelector('.start-page') as HTMLElement;
    this.toysPage = document.querySelector('.toys-page') as HTMLElement;
    this.buttonBackMain = document.querySelector('.logo') as HTMLElement;
    this.switchToToys = document.querySelector('.switch-main') as HTMLElement;
    this.startBtn.addEventListener('click', this.start.bind(this));
    this.buttonBackMain.addEventListener('click', this.backToMainPage.bind(this));
    this.switchToToys.addEventListener('click', this.start.bind(this));
  }

  start() {
    this.startPage.classList.add('hide');
    this.toysPage.classList.remove('hide');
  }

  backToMainPage() {
    this.startPage.classList.remove('hide');
    this.toysPage.classList.add('hide');
  }
}

export default Start;