'use strict';
import elements from './domElements.js';
import LocalStorage from './Localstorage.js';
import {
    renderCountryCard,
    renderDetailsPage,
    renderBordersButtons,
    deleteAllCountries,
    deleteBordersButtons,
    hideDetailsPage,
    toggleRegionMenu,
    toggleExitBtn,
    switchTheme
} from './domManipulation.js';
import {
    lazyLoad,
    shouldDisplayBorderNames
} from './helper.js';

async function getAllCountries() {
    const response = await fetch('https://restcountries.eu/rest/v2/all?fields=flag;name;capital;population;region');
    const json = await response.json();
    json.forEach((country, i) => {
        renderCountryCard(country.flag, country.name, country.capital, country.region, country.population);
    });
    addCardEvents();
}

async function getSearchedCountry(country) {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region`);
        if (response.status !== 404) {
            const json = await response.json();
            deleteAllCountries();
            hideDetailsPage();
            json.forEach((country, i) => {
                renderCountryCard(country.flag, country.name, country.capital, country.region, country.population);
            });
            addCardEvents();
        }
    } catch (e) {
        console.log(e);
    }
}

async function handleSelectedRegion(region) {
    toggleRegionMenu();
    hideDetailsPage();
    const response = await fetch(`https://restcountries.eu/rest/v2/region/${region}?fields=flag;name;capital;population;region`);
    const json = await response.json();
    deleteAllCountries();
    json.forEach((country, i) => {
        renderCountryCard(country.flag, country.name, country.capital, country.region, country.population);
    });
    addCardEvents();
}

const getCountryData = async country => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region;nativeName;subregion;currencies;languages;borders;topLevelDomain`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
}

const getBorderNames = async borders => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/all?fields=name;alpha3Code`);
        const json = await response.json();
        LocalStorage.addCountries(json);
        return LocalStorage.getRelevantCountries(borders);
    } catch (e) {
        console.log(e);
    }
}

export const handleBordersButtons = async bordersAlpha3 => {
    let names;
    deleteBordersButtons();
    if (shouldDisplayBorderNames(bordersAlpha3)) {
        if (LocalStorage.existCountries()) {
            names = LocalStorage.getRelevantCountries(bordersAlpha3);
        } else {
            names = await getBorderNames(bordersAlpha3);
        }
        if (!names) return;
    }
    renderBordersButtons(names);
}

const handleSelectedCountry = async country => {
    const json1 = await getCountryData(country);
    if (!json1) return;

    deleteAllCountries();
    renderDetailsPage(json1[0]);
    addBtnEvents();
}

const addCardEvents = () => {
    const cards = document.querySelectorAll('.output__box');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const countryName = card.children[1].children[0].textContent;
            handleSelectedCountry(countryName);
        }, {
            once: true
        });
        const img = card.children[0];
        lazyLoad(img);
    })
}

const addBtnEvents = () => {
    const btns = document.querySelectorAll('.details__btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const country = btn.textContent;
            handleSelectedCountry(country);
        }, {
            once: true
        });
    })
}

elements.regionToggle.addEventListener('click', (e) => toggleRegionMenu(e));


elements.regions.forEach(region => {
    region.addEventListener('click', () => {
        handleSelectedRegion(region.textContent.toLowerCase());
    });
});

elements.searchInput.addEventListener("keyup", event => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    if (elements.searchInput.value) {
        getSearchedCountry(elements.searchInput.value);
        toggleExitBtn();
    }
});


elements.btnExit.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.btnExit.classList.remove('btn-exit__show');
});

elements.modeSwitcher.addEventListener('click', (e) => switchTheme(e));
getAllCountries();