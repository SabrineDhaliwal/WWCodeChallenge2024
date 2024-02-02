

const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

    function makeGreen() {
      const p = document.querySelector('p');
      p.style.color = '#BADA55';
      p.style.fontSize = '50px';
    }

    // Regular
    console.log("Hello, World")

    // Interpolated
    console.log("Hello I am a %s string", "🤯");

    // Styled
    console.log("%cexample", "color:#974624",   )

    // warning!
    console.warn("should give a warning with a yellow flag")


    // Error :|
    console.error("Bullocks")

    // Info
    console.info("should give a small info favicon")

    // Testing
    const p = document.querySelector('p')
    console.assert(p.classList.contains('ouch'), 'That is wrong!')

    // clearing
    console.clear();

    // Viewing DOM Elements
    console.log(p);
    console.dir(p);

    // Grouping together
    dogs.forEach(dog => {
        console.group(`${dog.name}`)
        // console.groupCollapsed(`${dog.age}`)
        console.log(`this is ${dog.name}`)
        console.log(`this is ${dog.name} is ${dog.age} years old`);
        console.log(`${dog.name} is ${dog.age *7} dog years old`)
        console.groupEnd(`${dog.name}`)
    })

    // counting
    

    // timing
    console.time('fetching data')
    fetch('https://api.github.com/users/sabrinedhaliwal')
    .then(data=>data.json())
    .then(data=> {
        console.timeEnd('fetching data');
        console.log(data)
    })