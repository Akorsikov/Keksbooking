import {filterForm} from './map.js';
import {getMarkerAdvertisement, closeMarkersAds} from './map.js'
import {NUMBER_ADS} from './data-db.js';

const FILTERING_DELAY = 500; // msec

const isSuitableAdvertisement = (advertisement) => {
  const housingType = filterForm.querySelector('#housing-type').value;
  const housingPrice = filterForm.querySelector('#housing-price').value;
  const housingRooms = filterForm.querySelector('#housing-rooms').value;
  const housingGuests = filterForm.querySelector('#housing-guests').value;
  const checkboxFeatures = filterForm.querySelectorAll('.map__checkbox');
  const housingFeatures = advertisement.offer.features ?? [];

  const getLevelPriceAdvertisement = (price) => {
    switch (true) {
      case price < 10000 :return 'low';
      case price > 50000 : return 'high';
      default : return 'middle';
    }
  }

  const isInappropriateAdString = (offerAd, filter) => {
    return (offerAd !== filter && filter !== 'any');
  }
  const isInappropriateAdNumber = (offerAd, filter) => {
    return (offerAd !== Number(filter) && String(filter) !== 'any');
  }

  if (isInappropriateAdString(advertisement.offer.type, housingType)) return false;
  if (isInappropriateAdString(getLevelPriceAdvertisement(advertisement.offer.price), housingPrice)) return false;
  if (isInappropriateAdNumber(advertisement.offer.rooms, housingRooms)) return false;
  if (isInappropriateAdNumber(advertisement.offer.guests, housingGuests)) return false;

  let result = true;
  checkboxFeatures.forEach((feature) => {
    if ((feature.checked) && (!housingFeatures.includes(feature.value))) {
      result = false;
    }
  });

  return result;
}

const renderMarkers = (ads, markers) => {
  ads.
    forEach(advertisement => {
      if (
        markers.length < NUMBER_ADS &&
        isSuitableAdvertisement(advertisement)
      ) {
        markers.push(getMarkerAdvertisement(advertisement));
      }
    });
}

/* global _:readonly */
const debouncedRenderMarkers = _.debounce((ads, markers) => {
  closeMarkersAds(markers);
  markers.length = 0;
  renderMarkers(ads, markers);
}, FILTERING_DELAY);

const handleChangeFilterForm = (ads, markers) => {
  filterForm.addEventListener('change', () => {
    debouncedRenderMarkers(ads, markers);
   });
}

export {handleChangeFilterForm}
