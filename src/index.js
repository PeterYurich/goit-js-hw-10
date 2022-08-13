import './css/styles.css';
import Notiflix from "notiflix";
import axios from 'axios';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    input: document.querySelector("[name=searchQuery]")
}

refs.input.value = "violet sun flowers summer"

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "29220368-6467898673c76bc95c006b920";

let currentPage = 0;
const perPage = 40;

function makeCurrentUrlRequest() {
    page = page + 1;
    console.log('page is', page)
    const searchRequest = refs.input.value
    return `${BASE_URL}?key=${API_KEY}&q=(${searchRequest})&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${perPage}&page=${currentPage}`;

}

const makeMarkup = (acc, item) => {
    return acc + `<div class="photo-card">
        <img src="${item.previewURL}" alt="${item.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes: ${item.likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${item.views}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${item.comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${item.downloads}</b>
            </p>
        </div>
        </div>`
}

const getPictures = async (e) => {
    e.preventDefault()
    refs.gallery.innerHTML = ''

    const url = makeCurrentUrlRequest()
    const res = await (await axios.get(url)).data

    if (res.total === 0) {
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
        refs.gallery.innerHTML = ''
    }

    const markupStr = await res.hits.reduce(makeMarkup, "")
    refs.gallery.innerHTML = markupStr

    refs.loadMoreBtn.classList.remove("visually-hidden")
}

const getMorePictures = async (e) => {
    const url = makeCurrentUrlRequest()
    const res = await (await axios.get(url)).data

    if (Number(res.total / (page * perPage) <= 1)) {
        Notiflix.Notify.info("Here are all the matching results")
        refs.loadMoreBtn.classList.add('visually-hidden')
    }

    const markupStr = await res.hits.reduce(makeMarkup, "")

    refs.gallery.insertAdjacentHTML("beforeend", markupStr)
}

refs.form.addEventListener('submit', getPictures)
refs.loadMoreBtn.addEventListener('click', getMorePictures)