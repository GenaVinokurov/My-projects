// popup
const btnDonate = document.getElementById("btn-donate");
const btnFeedback = document.getElementById("btn-feedback")
const popupsWrapper = document.querySelector(".popups-bg")
let donate = document.getElementById("donate")
let feedback = document.getElementById("feedback")
let close = document.querySelectorAll(".popup-close")

btnDonate.addEventListener("click", function (e) {
  donate.classList.add("active")
  popupsWrapper.classList.add("active")
})
btnFeedback.addEventListener("click", function (e) {
  feedback.classList.add("active")
  popupsWrapper.classList.add("active")
})
close.forEach(e => {
  e.addEventListener("click", function (event) {
    event.preventDefault()
    popupsWrapper.classList.remove("active")
    donate.classList.remove('active')
    feedback.classList.remove('active')
    popupCard.classList.remove('active')
  })
});
popupsWrapper.addEventListener('click', function (e) {
  popupsWrapper.classList.remove("active")
  donate.classList.remove('active')
  feedback.classList.remove('active')
})

const btnDonateNext = document.querySelector(".btn-popup__donate")
const popupCard = document.querySelector(".popup-card")
const btnCard = document.querySelector(".btn-card")
btnDonateNext.addEventListener("click", function (e) {
  popupCard.classList.add('active');
  donate.classList.remove('active');
})
btnCard.addEventListener("click", function (e) {
  popupCard.classList.remove('active')
  popupsWrapper.classList.remove("active")
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

