const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked; 

function handleCheck(e){
    //check if shift key is held down
    //AND check that they are checking the box
    let inBetween = false;

    if(e.shiftKey && this.checked){
        //loop over every single checkbox to see if it is  inbetween the first and last checked box
        checkboxes.forEach(checkbox =>{
            console.log(checkbox);
            if(checkbox === this || checkbox === lastChecked){
                inBetween = !inBetween;
                console.log("start to check them inBetween");
            }

            if(inBetween){
                //logic to check the checkbox
                //change setProperty or class or style to input:checked
                checkbox.checked =true;


            }
        })

    }

    lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));