import './css/styles.css';
import _ from 'lodash';
import {fetchCountries} from "./fetchCountries";
import "./fetchCountries"


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')

inputEl.addEventListener('input', _.debounce(fetchCountries, 300))

// inputEl.addEventListener('input', _.debounce((e) => {
//     console.log(e.target.value)
// }, 300))

