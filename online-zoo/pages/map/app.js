//---------------------burger-menu----------------------------

const burgerOpen = document.querySelector(".burger-menu__button");
const burgerClose = document.querySelector(".burger-menu__button-close");
const burgerMenu = document.querySelector("#burger-menu")

burgerOpen.addEventListener('click', function (e) {
  burgerMenu.classList.add('js-act')
})
burgerClose.addEventListener('click', function (e) {
  burgerMenu.classList.remove('js-act')
})