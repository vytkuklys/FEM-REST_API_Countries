async function getCountries() {
    console.log("hi");
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await response.json();
    console.log(json[0].capital);
    json.forEach((country, i) => {
        displayElements(country.flag, country.name, country.capital, country.region, country.population);
    });
}

function displayElements(flag, country, capital, region, population) {
    const body = document.body;

    const sectionEl = document.createElement('section');
    setAttributes(sectionEl, {
        "class": "box"
    });
    body.appendChild(sectionEl);

    const imgEl = document.createElement('img');
    setAttributes(imgEl, {
        "src": `${flag}`,
        "alt": `${country} flag`,
        "class": "box__flag"
    });
    sectionEl.appendChild(imgEl);

    const textBoxEl = document.createElement('div');
    textBoxEl.classList.add("box_content");
    sectionEl.appendChild(textBoxEl);

    const h3El = document.createElement('h3');
    h3El.classList.add('box__title');
    h3El.textContent = `${country}`;
    textBoxEl.appendChild(h3El);

    const p1El = document.createElement('p');
    p1El.classList.add('box--bold');
    p1El.textContent = "Population: ";
    textBoxEl.appendChild(p1El);

    const populationTextEl = document.createElement('span');
    populationTextEl.classList.add('box__population');
    populationTextEl.textContent = `${population}`;
    p1El.appendChild(populationTextEl);

    const p2El = document.createElement('p');
    p2El.classList.add('box--bold');
    p2El.textContent = "Region: ";
    textBoxEl.appendChild(p2El);

    const regionTextEl = document.createElement('span');
    regionTextEl.classList.add('box__region');
    regionTextEl.textContent = `${region}`;
    p2El.appendChild(regionTextEl);

    const p3El = document.createElement('p');
    p3El.classList.add('box--bold');
    p3El.textContent = "Capital: ";
    textBoxEl.appendChild(p3El);

    const capitalTextEl = document.createElement('span');
    capitalTextEl.classList.add('box__capital');
    capitalTextEl.textContent = `${capital}`;
    p3El.appendChild(capitalTextEl);

}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

getCountries();