console.log("Hello World");

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// fetch itself returns a promise
fetch(endpoint)
  // .then(res=>console.log(res.json()))
  .then((res) => res.json())
  .then((data) => cities.push(...data));
// console.log(cities)

function findMatches(wordtoMatch, cities) {
  return cities.filter((place) => {
    //figure out if city or state matches what ws searched
    const regex = new RegExp(wordtoMatch, "gi");
    // g = global i= insensitive
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  console.log(this.value);
  const matchInput = findMatches(this.value, cities);
  // console.log('match input',matchInput)
  const html = matchInput
    .map((place) => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl"> ${this.value}</span>`)
        const stateName = place.state.replace(regex,`<span class="hl">${this.value}</span>`)
      return `
        <li>
        <span class='name'> ${cityName}, ${stateName} </span>
        <span class='population'> ${numberWithCommas(place.population)} </span>
        </li>
        `;
    })
    .join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
