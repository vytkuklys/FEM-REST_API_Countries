const regionToggle  = document.querySelector('.controls__title');
const modeSwitcher  = document.querySelector('.header__button');
const searchInput   = document.querySelector('.controls__input-text');
const regions       = document.querySelectorAll('.controls__select-item');

async function getAllCountries() {
    const response = await fetch('https://restcountries.eu/rest/v2/all?fields=flag;name;capital;population;region');
    const json = await response.json();
    json.forEach((country, i) => {
        displayElements(country.flag, country.name, country.capital, country.region, country.population);
    });
    addEvents();
}

async function getSearchedCountry(country) {
    try{
        // const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region;nativeName;subregion;currencies;languages;borders;topLevelDomain`);
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region`);
        if(response.status !== 404){
            const json = await response.json();
            clearAllCountries();
            console.log(json[0].name)
            json.forEach((country, i) => {
                displayElements(country.flag, country.name, country.capital, country.region, country.population);
            });
        }
            // if(country === 'belgium' || country === 'latvia'){
            //     const img = document.querySelector('.details__flag');
            //     img.setAttribute('src', `${json[0].flag}`);
            //     const lists = document.querySelectorAll('.details__list-items');
            //     lists.forEach(list =>{
            //         const items = Array.from(list.children);
            //         items.forEach((item) => {
            //             const id = item.id;
            //             if(typeof(json[0][id]) !== 'object'){
            //                 item.children[0].textContent = json[0][id];
            //             }else if(id === 'topLevelDomain'){
            //                item.children[0].textContent = json[0].topLevelDomain.join(', ')
            //             }else if(id === 'currencies' || id === 'languages'){
            //                 item.children[0].textContent = Array.from(Object.values(json[0][id]), cur => cur.name).join(', ');
            //             }else{
            //             }
            //         });
            //     })
            //     console.log(Array.from(Object.values(json[0].borders), border => border.name));
            //     console.log(json[0].borders);
                
            // }
            //     // json.forEach((country, i) => {
            //         //     displayElements(country.flag, country.name, country.capital, country.region, country.population);
            //         // });
            //     }
            //     else{
            //         clearAllCountries();
                    
            //     }
            }catch(e){
                console.log(e);
            }
}

async function getRegion(region) {
    const response = await fetch(`https://restcountries.eu/rest/v2/region/${region}?fields=flag;name;capital;population;region`);
    const json = await response.json();
    clearAllCountries();
    json.forEach((country, i) => {
        displayElements(country.flag, country.name, country.capital, country.region, country.population);
    });
    addEvents();
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

const getCountryData = async country =>{
    try{
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region;nativeName;subregion;currencies;languages;borders;topLevelDomain`);
        const json = await response.json();
        return json;
    }catch(e){
        console.log(e);
    }
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

const showCountryDetails = async country =>{
    const json = await getCountryData(country);
    if(!json) return;
    console.log(json);
    const img   = document.querySelector('.details__flag');
    const title = document.querySelector('.details__title');
    const lists = document.querySelectorAll('.details__list-items');

    img.setAttribute('src', `${json[0].flag}`);
    title.textContent = json[0].name;
    lists.forEach(list =>{
        const items = Array.from(list.children);
        items.forEach((item) => {
            const id = item.id;
            if(typeof(json[0][id]) === 'string'){
                item.children[0].textContent = json[0][id];
            }else if(id === 'population'){
                item.children[0].textContent = json[0][id].toLocaleString('en');
            }
            else if(id === 'currencies' || id === 'languages'){
                item.children[0].textContent = Array.from(Object.values(json[0][id]), cur => cur.name).join(', ');
            }else if(id === 'topLevelDomain'){
                item.children[0].textContent = json[0].topLevelDomain.join(', ')
            }
            else{
            }
        });
    })
    // console.log(json[0].borders);

}

const addEvents = () =>{
    const cards = document.querySelectorAll('.output__box');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const country = card.children[1].children[0].textContent;
            showCountryDetails(country);
        });
    })
}
// if(false){
    regionToggle.addEventListener('click', (e) => handleClickShowRegions(e));
    
    
    regions.forEach(region =>{
        region.addEventListener('click', ()=> handleClickSearchRegion(region.textContent));
    });
    
    searchInput.addEventListener("keyup", event => {
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
        if(searchInput.value){
            getSearchedCountry(searchInput.value);
        }
      });
    getAllCountries();

    
// }

modeSwitcher.addEventListener('click', (e) => handleClickSwitchMode(e));