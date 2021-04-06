let countryData;

function display(data){
    const capital = document.getElementById("capital");
    const population = document.getElementById("population");
    countryData = data;
    console.log(countryData[0].capital);
    capital.textContent = countryData[0].capital;
    population.textContent = countryData[0].population;
}

fetch('https://restcountries.eu/rest/v2/all')
.then(res => res.json())
.then(data => display(data))
.catch(err => console.log("Error: ", err));
