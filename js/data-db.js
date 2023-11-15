import { getMarkersAds } from './map.js';
import { checkStatus } from './util.js';
import { activateForm } from './map.js';

const URL = 'https://23.javascript.pages.academy/keksobooking/data';
const NUMBER_ADS = 10;
const filterForm = document.querySelector('.map__filters');
const filterFormSelects = filterForm.querySelectorAll('select');
const filterFormFieldset = filterForm.querySelector('fieldset');


const getAds = (url) => {
  fetch(url)
    .then(checkStatus)
    .then((response) => (response.json()))
    .then((arrayAds) => {
      getMarkersAds(arrayAds.slice(0, NUMBER_ADS));
      activateForm(filterForm, 'map__filters--disabled',[...filterFormSelects, filterFormFieldset]);
    })
    .catch((error) => alert(error));
}

getAds(URL);

