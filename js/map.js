import {getFixLengthDigitsAfterPoint} from './util.js';
import {getAdCard} from './ad-card.js';

const GEO_PRECISION = 5;// повторяется в 'validation-form.js'
const TOKYO_CENTER = {
  lat: 35.68950,
  lng: 139.69171,
}
const ZOOM = 12;

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
const adFormAddress = document.querySelector('#address');



adForm.classList.add('ad-form--disabled');
for (let item of adFormFieldsets) {
  item.setAttribute('disabled','');
}

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    //console.log('Карта инициализирована');
    adForm.classList.remove('ad-form--disabled');
    for (let item of adFormFieldsets) {
      item.removeAttribute('disabled');
    }
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

const getMarkersAds = (arrayAds) => {
  arrayAds.forEach((advertisement) => {
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
  })
}

export {getMarkersAds, setMarkerTokyoCenter};