import './css/styles.css';
import _ from 'lodash';
import {fetchCountries} from "./fetchCountries";
// import "./fetchCountries"
import Notiflix from "notiflix";



const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const countryInfo = document.querySelector('.country-info')
const countryListEl = document.querySelector('.country-list')

inputEl.addEventListener('input', _.debounce(onSearch, 300))

function onSearch (e) {
    e.preventDefault();
    const inputValue = e.target.value.trim();

    if (inputValue === "") {
        countryInfo.innerHTML = '';
        countryListEl.innerHTML = '';
        return
    }

    fetchCountries(inputValue)
    .then((result) => {
        if (result.status === 404) {
            Notiflix.Notify.failure("Oops, there is no country with that name")
            countryInfo.innerHTML = '';
            countryListEl = '';
        }
        return result
    })
    .then(alertIfToMany)
    .then(renderSeveralCountries)
    .then(renderOneCountry)
    .catch(onError)
    .finally(() => {console.log('*********break**********')})
}

function alertIfToMany (array) {
    console.log(array.length)
    if (array.length > 10) {
        countryInfo.innerHTML = '';
        countryListEl.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
    }
    return array
}

function renderSeveralCountries (severalCountriesArray) {
    if (severalCountriesArray.length > 1 && severalCountriesArray.length < 11) {
        countryInfo.innerHTML = ""
        countryListEl.innerHTML = severalCountriesArray.reduce((acc, country) => {
            return acc + `<li class="country-head">
            <img class="image" src="${country.flags.svg}" >
            <h2 class="counties-name">${country.name.official}</h2>
            </li>`
        }, "")
        return
    }
    return severalCountriesArray
}

function renderOneCountry (oneCountryArray) {
    if (oneCountryArray.length === 1) {
        countryListEl.innerHTML = ""
        countryInfo.innerHTML = oneCountryArray.reduce((acc, country) => {
            return acc + `<li class="country-head">
            <img class="single-image" src="${country.flags.svg}" >
            <h2 class="county-name">${country.name.official}</h2>
            </li>
            <p class="country-info-item"><span class="country-property">Capital:</span> ${country.capital}</p>
            <p class="country-info-item"><span class="country-property">Population:</span> ${country.population}</p>
            <p class="country-info-item"><span class="country-property">Languages:</span> ${Object.values(country.languages)}</p>`
        }, "")
        }
        return oneCountryArray
}

function onError ()  {
    console.log('inside error-function')
        // Notiflix.Notify.failure("Oops, there is no country with that name")
        // countryInfo.innerHTML = '';
}