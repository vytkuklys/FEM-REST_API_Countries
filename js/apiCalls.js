import LocalStorage from './Localstorage.js';

export const getAllCountries = async () => {
    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all?fields=flag;name;capital;population;region');
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return;
    }
}

export const getSelectedRegion = async region => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/region/${region}?fields=flag;name;capital;population;region`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return;
    }
}

export const getSearchedCountry = async country => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region`);
        if (response.status !== 404) {
            const json = await response.json();
            return json;
        }
    } catch (e) {
        console.log(e);
        return;
    }
}

export const getCountryData = async country => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag;name;capital;population;region;nativeName;subregion;currencies;languages;borders;topLevelDomain`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return;
    }
}

export const getBorderNames = async borders => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/all?fields=name;alpha3Code`);
        const json = await response.json();
        LocalStorage.addCountries(json);
        return LocalStorage.getRelevantCountries(borders);
    } catch (e) {
        console.log(e);
        return;
    }
}