import { mainScreen } from "./settings.js";
const categoriesArt = document.querySelector('.categories-art');
const btnArt = document.querySelector("#btnArt");
const btnPic = document.querySelector("#btnPic");
const btnCategories = document.querySelector('.btn-categories');

btnArt.addEventListener('click', function () {
  categoriesArt.classList.remove('hide');
  mainScreen.classList.add('hide');
});
btnCategories.addEventListener('click', function () {
  categoriesArt.classList.add('hide');
  mainScreen.classList.remove('hide');
});

//-----background icon
const itemImgs = document.querySelectorAll('.item-img');
let itemImgsCount = 0;
itemImgs.forEach(el => {
  return el.style.backgroundImage = `url(./assets/img/${itemImgsCount}.jpg)`, itemImgsCount += 10
})