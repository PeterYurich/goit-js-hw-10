const BASE_URL = 'https://restcountries.com/v3.1/name/';

const fetchCountries = (inputValue) => {
    const url = `${BASE_URL}${inputValue}?fields=name,capital,population,flags,languages`
    return fetch(url).then(response => response.json())
}

export { fetchCountries };

