// console.log('Hello world');

// STEPS

//  get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player. querySelectorAll('.player__slider');

const fullScreen = player.querySelector('.player__fullscreen');
// const videoFS = player.querySelector('video');

// console.log("video", video);
// console.log("fullScreen", fullScreen)

// // build out functions
function togglePlay(){
    const method = video.paused? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    // console.log('update button');
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
 
}
function skip(){
    // console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    // console.log(this.name)
    // console.log(this.value)
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)* 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)* video.duration;
    video.currentTime = scrubTime
    // console.log(e);
}

// hook up event listners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton =>  skipButton.addEventListener('click', skip))
ranges.forEach(range=> range.addEventListener('change', handleRangeUpdate));

// look at canvas and write code so taht it only listen to mouse down
// ranges.forEach(range=> range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range =>{
    range.addEventListener('mousedown', ()=> {
        isRangeClicked =true;
    });
    range.addEventListener('mouseup', ()=> {
        isRangeClicked = false;
    });
    range.addEventListener('mousemove', handleRangeUpdate())
})

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);

//attempt at fullscreen
fullScreen.addEventListener('click', ()=> {video.requestFullscreen() });
