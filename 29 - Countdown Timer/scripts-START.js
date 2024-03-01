let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");


function timer(seconds){
    clearInterval(countdown)

    const now = Date.now();
    const then = now + (seconds *1000); //when the timer stops
    displayTimeLeft(seconds);; // runs functions immediately
    displayReturnTime(then)

  countdown = setInterval(()=> {
        const secondsLeft = Math.round((then - Date.now())/1000);
        //intervals don't stop on their own, it will just continue. need to tell it when to stop
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        //runds function after 1 second, the time it takes for setInterval to start displaying
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds){ 
    console.log(seconds)
    const minutes = Math.floor(seconds /60)
    const secondsRemaining = seconds % 60;
    const display = `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`
    timerDisplay.textContent= display;
    document.title = display;
}

function displayReturnTime(timestamp){
    const end = new Date(timestamp)
    const hours = end.getHours();
    const minutes = end.getMinutes();
    //if you want a 12 hour clock
    const adjustedHour = hours >12 ? hours - 12 : hours
    endTime.textContent = `Return at ${hours}:${minutes < 10 ? '0': ""}${minutes}`;

}

function startTimer(){
    const seconds =parseInt(this.dataset.time);
    timer(seconds);

}
buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins= this.minutes.value;
    timer(mins * 60)
    this.reset();
})