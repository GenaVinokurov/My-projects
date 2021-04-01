let block = document.querySelectorAll('.info-block')
document.addEventListener("click", function (e) {
  e.preventDefault()
  if (e.classList.contains('info-array') == true) {
    block.classList.add('open')
    console.log('block')
  }
})
console.log(block)

