import { getMarkersAds } from './map.js';
import { checkStatus } from './util.js';
import { activateForm, filterForm } from './map.js';
import { handleChangeFilterForm } from './filter.js';

const URL = 'https://23.javascript.pages.academy/keksobooking/data';
const NUMBER_ADS = 10;
const filterFormSelects = filterForm.querySelectorAll('select');
const filterFormFieldset = filterForm.querySelector('fieldset');


const getAds = (url) => {
  let markers;
  fetch(url)
    .then(checkStatus)
    .then((response) => (response.json()))
    .then((arrayAds) => {
      markers = getMarkersAds(arrayAds.slice(0, NUMBER_ADS));
      activateForm(filterForm, 'map__filters--disabled',[...filterFormSelects, filterFormFieldset]);
      handleChangeFilterForm(arrayAds, markers);
    })
    .catch((error) => alert(error));
}

getAds(URL);

export {NUMBER_ADS}
