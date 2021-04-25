const fullButton = document.querySelector(".fullscreen")
fullButton.addEventListener("click", function (e) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
})

const input = document.querySelector('.filters')
const btnBlock = document.querySelector('.btn-container')

let inputValue = {
  valueName: '',
  value: 0,
  saturateValue: 100,
}
function changeValue(event) {

  if (event.target.name == 'blur') {
    inputValue.value = event.target.value;
    let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
    let label = matches.filter(filterElements);

    function filterElements(element) {
      let regex = /Blur:/g
      if (element.textContent.match(regex)) return element
    }
    label[0].querySelector("output").innerHTML = inputValue.value
    document.documentElement.style.setProperty('--blur', inputValue.value + 'px')
  }
  if (event.target.name == 'invert') {
    inputValue.value = event.target.value;
    let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
    let label = matches.filter(filterElements);

    function filterElements(element) {
      let regex = /Invert:/g
      if (element.textContent.match(regex)) return element
    }
    label[0].querySelector("output").innerHTML = inputValue.value
    document.documentElement.style.setProperty('--invert', inputValue.value + '%')
  }
  if (event.target.name == 'sepia') {
    inputValue.value = event.target.value;
    let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
    let label = matches.filter(filterElements);

    function filterElements(element) {
      let regex = /Sepia:/g
      if (element.textContent.match(regex)) return element
    }
    label[0].querySelector("output").innerHTML = inputValue.value
    document.documentElement.style.setProperty('--sepia', inputValue.value + '%')
  }
  if (event.target.name == 'saturate') {
    inputValue.value = event.target.value;
    let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
    let label = matches.filter(filterElements);

    function filterElements(element) {
      let regex = /Saturate:/g
      if (element.textContent.match(regex)) return element
    }
    label[0].querySelector("output").innerHTML = inputValue.value
    document.documentElement.style.setProperty('--saturate', inputValue.value + '%')
  }
  if (event.target.name == 'hue') {
    inputValue.value = event.target.value;
    let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
    let label = matches.filter(filterElements);

    function filterElements(element) {
      let regex = /Hue rotate:/g
      if (element.textContent.match(regex)) return element
    }
    label[0].querySelector("output").innerHTML = inputValue.value
    document.documentElement.style.setProperty('--hue', inputValue.value + 'deg')
  }
}

input.addEventListener('input', changeValue)

//----------Time update img

const time = new Date();
let timeDay = '';
const timeOfDay = (time) => {
  if (time.getHours() >= 6 && time.getHours() < 12) timeDay = 'morning';
  if (time.getHours() >= 12 && time.getHours() < 18) timeDay = 'day';
  if (time.getHours() >= 18 && time.getHours() < 24) timeDay = 'evening';
  if (time.getHours() >= 0 && time.getHours() < 6) timeDay = 'night';
}

timeOfDay(time);

const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/`;
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

const imgDoc = document.querySelector('img');


function viewBgImage(src) {
  imgDoc.src = src;
  imgDoc.setAttribute('crossOrigin', 'anonymous');
  imgDoc.onload = () => {
    imgDoc.width = imgDoc.naturalWidth;
    imgDoc.height = imgDoc.naturalHeight;
  };
}

function nextImage() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  const btn = 0;
  viewBgImage(imageSrc);

  i++;
  btn.disabled = true;
  setTimeout(function () { btn.disabled = false }, 1000);
}
function saveImage(img) {
  const canv = document.createElement('canvas');
  canv.width = img.naturalWidth
  canv.height = img.naturalHeight

  let ctx = canv.getContext("2d");
  ctx.filter = getComputedStyle(img).filter
  ctx.drawImage(img, 0, 0, canv.width, canv.width)

  let link = document.createElement('a')
  link.download = `image.png`
  link.href = canv.toDataURL();

  link.click();
  link.delete;
}

function loadImage() {
  const fileInput = document.querySelector('.btn-load--input')
  fileInput.addEventListener('change', el => {
    const reader = new FileReader();
    const file = fileInput.files[0]

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      imgDoc.src = img.src;
    }
    reader.readAsDataURL(file);
  })

}

function btnBlockFunc(event) {
  if (event.target.className.match('btn-reset')) {
    inputValue.saturateValue = 100
    inputValue.value = 0;
    let matches = Array.prototype.slice.call(document.querySelectorAll("label"));
    matches.forEach((el, i) => {
      if (i == 3) {
        el.querySelector('input').value = inputValue.saturateValue
        el.querySelector("output").innerHTML = inputValue.saturateValue
        document.documentElement.style.setProperty('--saturate', inputValue.saturateValue + '%')
      }
      if (el.textContent.match(/Blur:/g)) {
        el.querySelector("output").innerHTML = inputValue.value
        el.querySelector('input').value = inputValue.value
        document.documentElement.style.setProperty('--blur', inputValue.value + 'px')
      } else if (el.textContent.match(/Invert:/g)) {
        el.querySelector("output").innerHTML = inputValue.value
        el.querySelector('input').value = inputValue.value
        document.documentElement.style.setProperty('--invert', inputValue.value + '%')
      } else if (el.textContent.match(/Sepia:/g)) {
        el.querySelector("output").innerHTML = inputValue.value
        el.querySelector('input').value = inputValue.value
        document.documentElement.style.setProperty('--sepia', inputValue.value + '%')
      } else if (el.textContent.match(/Hue rotate:/g)) {
        el.querySelector("output").innerHTML = inputValue.value
        el.querySelector('input').value = inputValue.value
        document.documentElement.style.setProperty('--hue', inputValue.value + 'deg')
      }
    })

  } else if (event.target.className.match('btn-save')) {
    saveImage(imgDoc)
  }
  else if (event.target.className.match('btn-next')) {
    nextImage()
  } else if (event.target.className.match('btn-load')) {
    loadImage()
  }
}

btnBlock.addEventListener('click', btnBlockFunc)