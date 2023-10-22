import { getMarkersAds } from './map.js';

const URL = 'https://23.javascript.pages.academy/keksobooking/data';
const NUMBER_ADS = 10;

const getAds = (url) => {
  fetch(url)
    .then((response) => (response.json()))
    .then((arrayAds) => getMarkersAds(arrayAds.slice(0, NUMBER_ADS)))
}

getAds(URL);

