import {getFixLengthDigitsAfterPoint} from './util.js';
import {getAdCard} from './ad-card.js';

const GEO_PRECISION = 5;// повторяется в 'validation-form.js'
const TOKYO_CENTER = {
  lat: 35.68950,
  lng: 139.69171,
}
const ZOOM = 12;

const filterForm = document.querySelector('.map__filters');
const filterFormSelects = filterForm.querySelectorAll('select');
const filterFormFieldset = filterForm.querySelector('fieldset');

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
const adFormAddress = document.querySelector('#address');


const deactivateForm = (form, classDisabled, fieslds) => {
  form.classList.add(classDisabled);
  for (let item of fieslds) {
    item.setAttribute('disabled','');
  }
}

const activateForm = (form, classDisabled, fields) => {
  form.classList.remove(classDisabled);
  for (let item of fields) {
    item.removeAttribute('disabled');
  }
}

deactivateForm(filterForm, 'map__filters--disabled',[...filterFormSelects, filterFormFieldset]);
deactivateForm(adForm, 'ad-form--disabled', adFormFieldsets);

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    activateForm(adForm, 'ad-form--disabled', adFormFieldsets);
  })
  .setView(TOKYO_CENTER, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon({
  iconUrl: './leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const currentPin = L.icon({
  iconUrl: './leaflet/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const marker = L.marker(
  TOKYO_CENTER,
  {
    draggable: true,
    icon: mainPin,
  },
);

marker.addTo(map);
{
  const latitude = marker.getLatLng().lat;
  const longitude = marker.getLatLng().lng;
  adFormAddress.value =
  `Lat: ${getFixLengthDigitsAfterPoint(latitude, GEO_PRECISION)},
   Lng: ${getFixLengthDigitsAfterPoint(longitude, GEO_PRECISION)}`;
}


marker.on('moveend', evt => {
  const latitude = evt.target.getLatLng().lat;
  const longitude = evt.target.getLatLng().lng;
  adFormAddress.value =
  `Lat: ${getFixLengthDigitsAfterPoint(latitude, GEO_PRECISION)},
   Lng: ${getFixLengthDigitsAfterPoint(longitude, GEO_PRECISION)}`;
});

const setMarkerTokyoCenter = () => {
  marker.setLatLng(TOKYO_CENTER);
  return marker.getLatLng();
}

const getMarkerAdvertisement = (advertisement) => {
  // console.log('advertisement: ', advertisement)
  const lat = advertisement.location.lat;
  const lng = advertisement.location.lng;
  const popupBalloon = getAdCard(advertisement);
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: currentPin,
    },
  );
  marker
    .addTo(map)
    .bindPopup(
      popupBalloon,
      {
        keepInView: true,
      },
    );
  return marker;
}

const getMarkersAds = (arrayAds) => {
  let markers = [];
  arrayAds.forEach((advertisement) => {
    markers.push(getMarkerAdvertisement(advertisement));
  });
  return markers;
}

const closeMarkersAds = (markers) => {

  markers.forEach((marker) => {
    marker.remove();
  });

}

export {getMarkersAds, setMarkerTokyoCenter, activateForm, getMarkerAdvertisement, filterForm, closeMarkersAds};
