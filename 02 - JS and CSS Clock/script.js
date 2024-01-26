// grabbing hand classes to attach functions/ transition 
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');


function setDate(){
    // getting the current date
    const now = new Date();

    // attaching current seconds to second-hand
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds/60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    // attaching current minute to minute hand
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes/60) * 360) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    // attaching current hour to hour hand
    const hours = now.getHours();
    const hoursDegrees =((hours/12)*360)+90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;


}


setInterval(setDate, 1000)