import {getArrayRandomAds} from './data.js';
import {getAdCard} from './ad-card.js';

const TOKYO_CENTER = {
  lat: 35.68950,
  lng: 139.69171,
}
const ZOOM = 12;

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
const adFormAddress = document.querySelector('#address');
const currentAds = getArrayRandomAds();
//console.log(currentAds);

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
adFormAddress.value = `Lat: ${marker.getLatLng().lat}, Lng: ${marker.getLatLng().lng}`;

marker.on('moveend', evt => {
  // adFormAddress.value = evt.target.getLatLng();
  const latitude = evt.target.getLatLng().lat.toFixed(5);
  const longitude = evt.target.getLatLng().lng.toFixed(5);
  adFormAddress.value = `Lat: ${latitude}, Lng: ${longitude}`;
});

currentAds.forEach((advertisement) => {
  const lat = advertisement.offer.location.x;
  const lng = advertisement.offer.location.y;
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
});