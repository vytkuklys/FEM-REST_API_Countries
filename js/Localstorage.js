export default class LocalStorage {
    static getCountries() {
        let countries = localStorage.getItem('countries');
        if (countries) {
            countries = JSON.parse(countries);
        } else {
            countries = false;
        }
        return countries;
    }

    static addCountries(countries) {
        localStorage.setItem('countries', JSON.stringify(countries));
    }

    static existCountries() {
        if (LocalStorage.getCountries()) return true;
    }

    static getRelevantCountries(arrayAlpha3) {
        let relevantCountries = [];
        const countries = LocalStorage.getCountries();
        const matches = countries.filter(country => arrayAlpha3.includes(country.alpha3Code));
        let i = 0;
        for (let i = 0; i < arrayAlpha3.length; i++) {
            for (let j = 0; j < matches.length; j++) {
                if (arrayAlpha3[i] === matches[j].alpha3Code) {
                    relevantCountries.push(matches[j].name);
                    continue;
                }
            }
        }
        return relevantCountries;
    }
}