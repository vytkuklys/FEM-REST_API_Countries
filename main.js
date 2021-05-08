const regionToggle = document.querySelector('.controls__title');
const modeSwitcher = document.querySelector('.header__button');
const regions = document.querySelectorAll('.controls__select-item');

async function getAllCountries() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await response.json();
    json.forEach((country, i) => {
        displayElements(country.flag, country.name, country.capital, country.region, country.population);
    });
}

async function getSearchedCountry(country) {
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const json = await response.json();
    console.log(json[0].capital);
    json.forEach((country, i) => {
        displayElements(country.flag, country.name, country.capital, country.region, country.population);
    });
}

async function getRegion(region) {
    const response = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
    const json = await response.json();
    clearAllCountries();
    json.forEach((country, i) => {
        displayElements(country.flag, country.name, country.capital, country.region, country.population);
    });
}

function displayElements(flag, country, capital, region, population) {
    const output = document.getElementById('output');

    const sectionEl = document.createElement('section');
    setAttributes(sectionEl, {
        "class": "output__box"
    });
    output.appendChild(sectionEl);

    const imgEl = document.createElement('img');
    setAttributes(imgEl, {
        "src": `${flag}`,
        "alt": `${country} flag`,
        "class": "box__flag"
    });
    sectionEl.appendChild(imgEl);

    const textBoxEl = document.createElement('div');
    textBoxEl.classList.add("output__info");
    sectionEl.appendChild(textBoxEl);

    const h3El = document.createElement('h3');
    h3El.classList.add('output__info-title');
    h3El.textContent = `${country}`;
    textBoxEl.appendChild(h3El);

    const p1El = document.createElement('p');
    p1El.classList.add('output--bold');
    p1El.textContent = "Population: ";
    textBoxEl.appendChild(p1El);

    const populationTextEl = document.createElement('span');
    populationTextEl.classList.add('output__info-population');
    populationTextEl.textContent = `${population}`;
    p1El.appendChild(populationTextEl);

    const p2El = document.createElement('p');
    p2El.classList.add('output--bold');
    p2El.textContent = "Region: ";
    textBoxEl.appendChild(p2El);

    const regionTextEl = document.createElement('span');
    regionTextEl.classList.add('output__info-region');
    regionTextEl.textContent = `${region}`;
    p2El.appendChild(regionTextEl);

    const p3El = document.createElement('p');
    p3El.classList.add('output--bold');
    p3El.textContent = "Capital: ";
    textBoxEl.appendChild(p3El);

    const capitalTextEl = document.createElement('span');
    capitalTextEl.classList.add('output__info-capital');
    capitalTextEl.textContent = `${capital}`;
    p3El.appendChild(capitalTextEl);

}

const clearAllCountries = () => {
    const output = document.getElementById('output');
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

const handleClickShowRegions = (e) => {
    e.preventDefault();
    document.querySelector('.controls').classList.toggle('controls--JS');
}

const handleClickSwitchMode = (e) => {
    e.preventDefault();
    const body = document.body;
    const btn = document.querySelector('.header__button');

    if(body.classList.contains('dark-mode')){
        btn.textContent = "Dark Mode";
    }else{
        btn.textContent = "Light Mode";
    }
    document.body.classList.toggle('dark-mode');
}

const handleClickSearchRegion = (region)=>{
    getRegion(region.toLowerCase());
}

regionToggle.addEventListener('click', (e) => handleClickShowRegions(e));

modeSwitcher.addEventListener('click', (e) => handleClickSwitchMode(e));

regions.forEach(region =>{
    region.addEventListener('click', ()=> handleClickSearchRegion(region.textContent));
});
getAllCountries();
