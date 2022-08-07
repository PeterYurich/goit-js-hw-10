
import Notiflix from "notiflix";

const countryInfo = document.querySelector('.country-info')

const fetchCountries = (e) => {
    e.preventDefault();
    let inputValue = e.target.value.trim();
    if (inputValue === "") {
        countryInfo.innerHTML = '';
        return
    }

    fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`)
        .then((response) =>
        response.json()
        )
        .then((array) => {
            if (array.length >= 10) {
                Notiflix.Notify.failure('too much countries')
                console.log(array)
            }
            return array
        })
        .then((severalCountriesArray) => {
            if (severalCountriesArray.length > 1 && severalCountriesArray.length < 11) {
                console.log("there are 2...10 countries. I need to make a markup")
                countryInfo.innerHTML = severalCountriesArray.reduce((acc, country) => {
                    return acc + `
                    <img class="image"src="${country.flags.svg}" >
                    <h2>${country.name.official}</h2>`
                }, "")
                return
            }
            return severalCountriesArray
        })
        .then((oneCountryArray) => {
            // if (oneCountryArray.length === 1) {
                console.log("it's found one country")
                countryInfo.innerHTML = oneCountryArray.reduce((acc, country) => {
                    return acc + `
                    <img class="image"src="${country.flags.svg}" />
                    <h2>${country.name.official}</h2>
                    <p>capital: ${country.capital}</p>
                    <p>population: ${country.population}</p>
                    <p>languages: ${Object.values(country.languages)}</p>`
                }, "")
                // }
                return oneCountryArray
        })
        .catch(() => {
            Notiflix.Notify.failure('"Oops, there is no country with that name"')
            countryInfo.innerHTML = '';
        })
};


export { fetchCountries };

