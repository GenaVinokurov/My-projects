function removeTransition(e){
    this.classList.remove('active')
}
const keys = document.querySelectorAll('.piano-key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

function sound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`)
    e.preventDefault()
    if(!audio) return 
    audio.currentTime = 0
    audio.play()
    key.classList.add('active')
}

window.addEventListener('keydown',sound)

// ----------------------click

let pianoKeys = document.querySelectorAll('.piano-key')
const PIANO = document.querySelector('.piano')

function start (e){
    e.preventDefault()
    const key = e.target
    const attribute =key.dataset.key
    const audio = document.querySelector(`audio[data-key='${attribute}']`)
    if(!audio) return
    key.classList.add('active')
    audio.currentTime = 0
    audio.play()
    console.log('work')
}

const pianoStart = (e) =>{
    if(e.target.classList.contains('piano-key')){
        start(e)
        pianoKeys.forEach(item => {
            item.addEventListener('mouseover', start )
        })
    }    
    
}
const pianoStop = () =>{
    pianoKeys.forEach(item => {
        item.removeEventListener('mouseover', start)
        
    })
}

PIANO.addEventListener('mousedown', pianoStart)
window.addEventListener('mouseup', pianoStop)



// ---------------------notes - letters

let letters = document.querySelector('.btn-letters')
let notes  = document.querySelector('.btn-notes')

letters.addEventListener('click', function(e){
    letters.classList.add('btn-active')
    notes.classList.remove('btn-active')
    pianoKeys.forEach(item => item.classList.add('piano-key-letter'))
})
notes.addEventListener('click', function(e){
    notes.classList.add('btn-active')
    letters.classList.remove('btn-active')
    pianoKeys.forEach(item => item.classList.remove('piano-key-letter'))
})

// ----------------------fullscreen

let fullButton = document.querySelector('.fullscreen')
fullButton.addEventListener('click', function(e){
    // if(fullButton.classList.contains('closefullscreen') === true){
    //     fullButton.classList.remove('closefullscreen')
    // } else  fullButton.classList.add('closefullscreen')
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
})
