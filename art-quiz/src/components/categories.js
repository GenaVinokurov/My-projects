import Quiz from '../pages/quiz';
import AudioMy from './audio';
class Categories {
  constructor() {
    this.mainScreen = document.querySelector('.main-screen');
    this.categoriesArt = document.querySelector('.categories-art');
    this.categoriesPic = document.querySelector('.categories-pic');
    this.btnArt = document.querySelector("#btnArt");
    this.btnPic = document.querySelector("#btnPic");
    this.btnCategoriesArt = document.querySelector('.btn-categories__art');
    this.btnCategoriesPic = document.querySelector('.btn-categories__pic');
    this.itemImgs = document.querySelectorAll('.item-img');
    this.btnArt.addEventListener('click', this.open.bind(this));
    this.btnPic.addEventListener('click', this.open.bind(this));
    this.btnCategoriesArt.addEventListener('click', this.close.bind(this));
    this.btnCategoriesPic.addEventListener('click', this.close.bind(this));
    this.local = {};
    this.setBackgrounds();
    this.itemTotal = document.querySelectorAll('.tex');
  }
  open() {
    const click = new AudioMy();
    click.click();
    if (event.currentTarget.id == 'btnArt') {
      this.categoriesArt.classList.remove('hide');
    } else this.categoriesPic.classList.remove('hide');
    this.mainScreen.classList.add('hide');
    this.itemTotal.forEach((el, i) => {
      let result = '';
      if (localStorage.answers != undefined) {
        if (this.local[i] != null) {
          result = this.local[i].filter(answer => answer == 'correct');
        }
      }

      el.innerHTML = `${result.length}`;
    });
    this.setBackgrounds();
  };
  close() {
    if (event.currentTarget.id == 'btnBackArt') {
      this.categoriesArt.classList.add('hide');
    } else this.categoriesPic.classList.add('hide');
    this.mainScreen.classList.remove('hide');
    const click = new AudioMy();
    click.click();
  };
  setBackgrounds() {

    let itemImgsCount = 0;
    this.local = localStorage.getItem('answers');
    this.local = JSON.parse(this.local);

    this.itemImgs.forEach((el, i) => {
      if (localStorage.answers != undefined) {
        if (this.local[i] == null) {
          el.classList.add('item-img__unlock');
        }
      }
      return el.style.backgroundImage = `url(./assets/img/${itemImgsCount}.jpg)`, itemImgsCount += 10;
    });
  };
}

export default Categories