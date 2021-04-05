// popup
const btnDonate = document.getElementById("btn-donate");
const btnFeedback = document.getElementById("btn-feedback")
let donate = document.getElementById("donate")
let feedback = document.getElementById("feedback")
let close = document.querySelectorAll(".popup-close")

btnDonate.addEventListener("click", function (e) {
  donate.classList.add("active")
})
btnFeedback.addEventListener("click", function (e) {
  feedback.classList.add("active")
})
close.forEach(e => {
  e.addEventListener("click", function (event) {
    event.preventDefault()
    donate.classList.remove('active') || feedback.classList.remove('active')
  })
});