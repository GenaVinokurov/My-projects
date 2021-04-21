//----Fullscreen
const fullButton = document.querySelector(".fullscreen")
fullButton.addEventListener("click", function (e) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
})

//----Filter

const inputs = document.querySelectorAll("input")
const img = document.querySelector("img")
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
inputs.forEach(elem => elem.addEventListener('change', handleUpdate));
inputs.forEach(elem => elem.addEventListener('mousemove', handleUpdate));