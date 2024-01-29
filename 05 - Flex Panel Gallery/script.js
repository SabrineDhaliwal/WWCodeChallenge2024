console.log("hello World")

const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open');
    console.log('clicked')
}

function toggleActive(e){
    console.log(e.propertyName)
    // looking for which elemrntts transition and then target that element with adding the class to transition the new styling
    
    if(e.propertyName.includes('flex')){
     this.classList.toggle('open-active')
    }
}
    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive ))

   

