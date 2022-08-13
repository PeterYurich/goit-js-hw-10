import './css/styles.css';
import { fetchCountries } from "./fetchPictures";
// import "./fetchCountries"
import Notiflix from "notiflix";
import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "29220368-6467898673c76bc95c006b920";

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    input: document.querySelector("[name=searchQuery]")
}

console.log(refs.input)

const cardLayout = `<div class="photo-card">
<img src="" alt="" loading="lazy" />
<div class="info">
    <p class="info-item">
    <b>Likes</b>
    </p>
    <p class="info-item">
    <b>Views</b>
    </p>
    <p class="info-item">
    <b>Comments</b>
    </p>
    <p class="info-item">
    <b>Downloads</b>
    </p>
</div>
</div>`

refs.input.value = "yellow+flowers"

const searchRequest = refs.input.value

console.log(searchRequest)

const url = `${BASE_URL}?key=${API_KEY}&q=(${searchRequest})&image_type="photo"&orientation="horizontal"&safesearch="true"?per_page="40"`
console.log(url)

async function getPictures (url) {
    const res = await axios.get(url)
    console.log(res)

}

refs.form.addEventListener('submit', getPictures(url))