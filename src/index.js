import './css/styles.css';
import _ from 'lodash';
import {fetchCountries} from "./fetchCountries";
// import "./fetchCountries"
import Notiflix from "notiflix";



const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const countryInfo = document.querySelector('.country-info')


inputEl.addEventListener('input', _.debounce(onSearch, 300))

function onSearch (e) {
    e.preventDefault();
    const inputValue = e.target.value.trim();

    if (inputValue === "") {
        countryInfo.innerHTML = '';
        console.log('the value is empty')
        return
    }

    fetchCountries(inputValue)
    .then(alertIfToMany)
    .then(renderSeveralCountries)
    .then(renderOneCountry)
    .catch(onError)
}

function alertIfToMany (array) {
    if (array.length > 10) {
        countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        console.log("too many")
        return
    }
    return array
}

function renderSeveralCountries (severalCountriesArray) {
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
}

function renderOneCountry (oneCountryArray) {
    // if (oneCountryArray.length === 1) {
        console.log("it's found one country")
        countryInfo.innerHTML = oneCountryArray.reduce((acc, country) => {
            return acc + `<img class="image"src="${country.flags.svg}" />
            <h2>${country.name.official}</h2>
            <p>capital: ${country.capital}</p>
            <p>population: ${country.population}</p>
            <p>languages: ${Object.values(country.languages)}</p>`
        }, "")
        // }
        return 
}

function onError ()  {
    // if (response.status = "404") {
        Notiflix.Notify.failure("Oops, there is no country with that name")
        countryInfo.innerHTML = '';
    // }
}