import './start.scss';
import Toys from '../toys/toys';
import Tree from '../tree/tree';
new Toys();
const renderTree = new Tree();

class Start {
  startBtn: HTMLElement;
  startPage: HTMLElement;
  toysPage: HTMLElement;
  treePage: HTMLElement;
  buttonBackMain: HTMLElement;
  switchToToys: HTMLElement;
  switchToTree: HTMLElement;
  constructor() {
    this.startBtn = document.getElementById('startBtn') as HTMLElement;
    this.startPage = document.querySelector('.start-page') as HTMLElement;
    this.toysPage = document.querySelector('.toys-page') as HTMLElement;
    this.buttonBackMain = document.querySelector('.logo') as HTMLElement;
    this.switchToToys = document.querySelector('.switch-main') as HTMLElement;
    this.switchToTree = document.querySelector('.switch-tree') as HTMLElement;
    this.treePage = document.querySelector('.tree-page') as HTMLElement;
    this.startBtn.addEventListener('click', this.start.bind(this));
    this.buttonBackMain.addEventListener('click', this.backToMainPage.bind(this));
    this.switchToToys.addEventListener('click', this.start.bind(this));
    this.switchToTree.addEventListener('click', this.toTree.bind(this));
  }

  start() {
    this.startPage.classList.add('hide');
    this.toysPage.classList.remove('hide');
    this.treePage.classList.add('hide');
  }

  backToMainPage() {
    this.startPage.classList.remove('hide');
    this.toysPage.classList.add('hide');
    this.treePage.classList.add('hide');
  }

  toTree() {
    this.startPage.classList.add('hide');
    this.toysPage.classList.add('hide');
    this.treePage.classList.remove('hide');
    renderTree.renderFav();
  }
}

export default Start;