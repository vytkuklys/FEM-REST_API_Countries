import elements from './domElements.js';
import LocalStorage from './Localstorage.js';
import {
    handleBordersButtons
} from './main.js';
import {
    setAttributes,
    isDarkTheme,
    isDetailsPageOpen,
    shouldDisplayBorderNames
} from './helper.js';

export const renderCountryCard = (flag, country, capital, region, population) => {
    const output = document.getElementById('output');

    const detailsCard = document.createElement('section');
    setAttributes(detailsCard, {
        "class": "output__box"
    });
    output.appendChild(detailsCard);

    const flagCard = document.createElement('div');
    setAttributes(flagCard, {
        "data-src": `${flag}`,
        "class": "output__flag"
    });
    detailsCard.appendChild(flagCard);

    const infoCard = document.createElement('div');
    infoCard.classList.add("output__info");
    detailsCard.appendChild(infoCard);

    const title = document.createElement('h3');
    title.classList.add('output__info-title');
    title.textContent = `${country}`;
    infoCard.appendChild(title);

    const populationTitle = document.createElement('p');
    populationTitle.classList.add('output--bold');
    populationTitle.textContent = "Population: ";
    infoCard.appendChild(populationTitle);

    const populationInfo = document.createElement('span');
    populationInfo.classList.add('output__info-population');
    populationInfo.textContent = `${population.toLocaleString('en')}`;
    populationTitle.appendChild(populationInfo);

    const regionTitle = document.createElement('p');
    regionTitle.classList.add('output--bold');
    regionTitle.textContent = "Region: ";
    infoCard.appendChild(regionTitle);

    const regionInfo = document.createElement('span');
    regionInfo.classList.add('output__info-region');
    regionInfo.textContent = `${region}`;
    regionTitle.appendChild(regionInfo);

    const capitalTitle = document.createElement('p');
    capitalTitle.classList.add('output--bold');
    capitalTitle.textContent = "Capital: ";
    infoCard.appendChild(capitalTitle);

    const capitalInfo = document.createElement('span');
    capitalInfo.classList.add('output__info-capital');
    capitalInfo.textContent = `${capital}`;
    capitalTitle.appendChild(capitalInfo);

}

export const renderLoader = () => {
    const body = document.body;
    const loader = document.createElement('div');
    loader.classList.add('loader');

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    loader.appendChild(spinner);

    body.appendChild(loader);
}

export const toggleRegionMenu = (e = 0) => {
    if (e) e.preventDefault();
    document.querySelector('.controls').classList.toggle('controls--JS');
}

export const switchTheme = (e) => {
    e.preventDefault();
    const btn = document.querySelector('.header__button');

    if (isDarkTheme()) {
        btn.textContent = "Dark Mode";
    } else {
        btn.textContent = "Light Mode";
    }
    document.body.classList.toggle('dark-mode');
}

export const hideDetailsPage = () => {
    const body = document.body;
    if (isDetailsPageOpen()) {
        body.classList.remove('details-open')
    }
}

export const deleteAllCountries = () => {
    const output = document.getElementById('output');
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
}

export const renderDetailsPage = async json => {

    const body = document.body;
    const img = document.querySelector('.details__flag');
    const title = document.querySelector('.details__title');
    const lists = document.querySelectorAll('.details__list-items');

    await handleBordersButtons(json.borders);
    img.setAttribute('src', `${json.flag}`);
    title.textContent = json.name;
    lists.forEach(list => {
        const items = Array.from(list.children);
        items.forEach((item) => {
            const id = item.id;
            if (typeof (json[id]) === 'string') {
                item.children[0].textContent = json[id];
            } else if (id === 'population') {
                item.children[0].textContent = json[id].toLocaleString('en');
            } else if (id === 'currencies' || id === 'languages') {
                item.children[0].textContent = Array.from(Object.values(json[id]), cur => cur.name).join(', ');
            } else {
                item.children[0].textContent = json.topLevelDomain.join(', ')
            }
        });
    });
    body.classList.add('details-open');
}

export const renderNoResultsFound = () => {
    const output = document.getElementById('output');
    const container = document.createElement('div');
    container.classList.add('no-results');

    const img = document.createElement('img');
    setAttributes(img, {
        "src": 'images/no_results.svg',
        "alt": '',
        "class": 'no-results__img'
    });
    container.appendChild(img);

    const title = document.createElement('h3');
    title.classList.add('no-results__title');
    title.textContent = "No results found";
    container.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.classList.add('no-results__info');
    subtitle.innerHTML = "Your search did not match any of the <br/> countries of this planet";
    container.appendChild(subtitle);

    output.appendChild(container);
}

export const deleteBordersButtons = () => {
    const buttonsContainer = document.querySelector('.details__btns');
    while (buttonsContainer.children[1]) {
        buttonsContainer.removeChild(buttonsContainer.lastChild);
    }
}

export const renderBordersButtons = names => {
    const buttonsContainer = document.querySelector('.details__btns');
    if (shouldDisplayBorderNames(names)) {
        names.forEach(name => {
            const button = document.createElement('button');
            setAttributes(button, {
                'onfocus': 'blur()',
                'aria-label': 'Select a country',
                'class': 'details__btn'
            });
            button.textContent = name;
            buttonsContainer.appendChild(button);
        });
    } else {
        const none = document.createElement('span');
        none.textContent = 'None';
        buttonsContainer.appendChild(none);
    }
}

export const toggleExitBtn = () => {
    elements.btnExit.classList.add('btn-exit__show');
}

export const toggleLoader = () => {
    document.querySelector('.loader').classList.toggle('show__JS');
}