
// const spacing = document.querySelectorAll('.spacing');
// const blur = document.querySelectorAll('.blur');
// const base = document.querySelectorAll('.base')

//using inputs instead of above lines allows you to select the element instead the class, 
// allowing for less lines of codes.
// adding .control before input makes the query selector more specific, it will
// target the inputs within the .control class.
const inputs = document.querySelectorAll('.controls input');

function handleUpdate(){
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)

}

inputs.forEach(input => input.addEventListener('change', handleUpdate))
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))