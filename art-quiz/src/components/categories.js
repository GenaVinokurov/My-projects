import Quiz from '../pages/quiz'

class Categories {
  constructor() {
    this.mainScreen = document.querySelector('.main-screen');
    this.categoriesArt = document.querySelector('.categories-art');
    this.btnArt = document.querySelector("#btnArt");
    this.btnPic = document.querySelector("#btnPic");
    this.btnCategories = document.querySelector('.btn-categories');
    this.itemImgs = document.querySelectorAll('.item-img');

    this.btnArt.addEventListener('click', this.open.bind(this));
    this.btnCategories.addEventListener('click', this.close.bind(this));
    this.setBackgrounds();
    this.close()
  }
  open() {
    this.categoriesArt.classList.remove('hide');
    this.mainScreen.classList.add('hide');
  }
  close() {
    this.categoriesArt.classList.add('hide');
    this.mainScreen.classList.remove('hide');
  }
  setBackgrounds() {
    let itemImgsCount = 0;
    this.itemImgs.forEach(el => {
      return el.style.backgroundImage = `url(./assets/img/${itemImgsCount}.jpg)`, itemImgsCount += 10
    })
  }
}
new Categories()
export default Categories