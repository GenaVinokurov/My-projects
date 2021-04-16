// ---------------------------Infoblock

let block = document.querySelectorAll('.info-block');
const INFO = document.querySelector('.info');

function infoClick(e) {
  // e.preventDefault()
  const button = e.target;
  const attribute = button.dataset.info;
  console.log(attribute)
  const text = document.querySelector(`div[data-info='${attribute}']`)
  text.classList.toggle('open')
}
INFO.addEventListener('click', infoClick)

// adaptive tooltip

let btnTooltip = document.querySelector('.tooltip-button')
let tooltip = document.querySelector('.tooltip')
console.log(btnTooltip)
btnTooltip.addEventListener('click', function (e) {
  tooltip.classList.toggle('tool-act')
  console.log(btnTooltip, tooltip)
})

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