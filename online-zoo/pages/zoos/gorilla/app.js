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
