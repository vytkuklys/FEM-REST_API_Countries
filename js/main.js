'use strict';
import elements from './domElements.js';
import LocalStorage from './Localstorage.js';
import {
    renderCountryCard,
    renderDetailsPage,
    renderBordersButtons,
    renderNoResultsFound,
    renderLoader,
    deleteAllCountries,
    deleteBordersButtons,
    hideDetailsPage,
    toggleRegionMenu,
    toggleExitBtn,
    toggleLoader,
    switchTheme
} from './domManipulation.js';
import {
    lazyLoad,
    shouldDisplayBorderNames
} from './helper.js';
import {
    getAllCountries,
    getSelectedRegion,
    getSearchedCountry,
    getBorderNames,
    getCountryData
} from './apiCalls.js';

const handleAllCountries = async () => {
    toggleLoader();
    const json = await getAllCountries();
    if (!json) return;
    json.forEach((country, i) => {
        renderCountryCard(country.flag, country.name, country.capital, country.region, country.population);
    });
    addCardEvents();
    toggleLoader();
}

async function handleSelectedRegion(region) {
    toggleLoader();
    deleteAllCountries();
    toggleRegionMenu();
    if (region === 'all') {
        handleAllCountries();
        toggleLoader();
        return;
    }
    const json = await getSelectedRegion(region);
    if (!json) return;
    json.forEach((country, i) => {
        renderCountryCard(country.flag, country.name, country.capital, country.region, country.population);
    });
    addCardEvents();
    toggleLoader();
}

const handleCountrySearch = async country => {
    const json = await getSearchedCountry(country);
    deleteAllCountries();
    if (json) {
        json.forEach((country, i) => {
            renderCountryCard(country.flag, country.name, country.capital, country.region, country.population);
        });
        addCardEvents();
    } else {
        renderNoResultsFound();
    }
}

const handleSelectedCountry = async country => {
    const json = await getCountryData(country);
    if (!json) return;
    deleteAllCountries();
    elements.searchInput.value = '';
    json.every(row => {
        if (row.name === country) {
            renderDetailsPage(row);
            return;
        }
        return true;
    });
    addBtnEvents();
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

const handleReturnToHomePage = () => {
    hideDetailsPage();
    handleAllCountries();
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
        handleCountrySearch(elements.searchInput.value);
        toggleExitBtn();
    }
});

elements.btnExit.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.btnExit.classList.remove('btn-exit__show');
});

elements.regionToggle.addEventListener('click', (e) => toggleRegionMenu(e));
elements.themeSwitch.addEventListener('click', (e) => switchTheme(e));

renderLoader();
elements.btnReturn.addEventListener('click', handleReturnToHomePage);

handleAllCountries();