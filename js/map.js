const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form fieldset');

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
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon({
  iconUrl: './leaflet/img/main-pin.svg',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

const marker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

marker.addTo(map);