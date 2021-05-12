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

    const sectionEl = document.createElement('section');
    setAttributes(sectionEl, {
        "class": "output__box"
    });
    output.appendChild(sectionEl);

    const imgEl = document.createElement('img');
    setAttributes(imgEl, {
        "data-src": `${flag}`,
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
    populationTextEl.textContent = `${population.toLocaleString('en')}`;
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
    const detailsContainer = document.querySelector('.details');
    if (isDetailsPageOpen()) {
        detailsContainer.classList.remove('details-open');
    }
}

export const deleteAllCountries = () => {
    const output = document.getElementById('output');
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
}

export const renderDetailsPage = async json => {

    const detailsContainer = document.querySelector('.details');
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
            //first if statement checks for native name, region, sub region and capital
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
    detailsContainer.classList.add('details-open');
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
        // addBtnEvents();
    } else {
        const none = document.createElement('span');
        none.textContent = 'None';
        buttonsContainer.appendChild(none);
    }
}

// const addBtnEvents = () => {
//     const btns = document.querySelectorAll('.details__btn');
//     btns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             const country = btn.textContent;
//             console.log(country, 'ok')
//             handleSelectedCountry(country);
//         }, {
//             once: true
//         });
//     })
// }

export const toggleExitBtn = () => {
    elements.btnExit.classList.add('btn-exit__show');
}