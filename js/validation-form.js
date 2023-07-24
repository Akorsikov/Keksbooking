const MIN_COST = new Map([
  ['bungalow', 3000],
  ['flat',     5000],
  ['house',    7000],
  ['palace',   9000],
]);

const typeHousing = document.querySelector('#type');
const priceHousing = document.querySelector('#price');
const arrivalTime = document.querySelector('#timein');
const departureTime = document.querySelector('#timeout');

typeHousing.addEventListener('change', () => {
  priceHousing.setAttribute('placeholder', MIN_COST.get(typeHousing.value));
});

arrivalTime.addEventListener('change', (evt) => {
  departureTime.value = evt.target.value;
});
departureTime.addEventListener('change', (evt) => {
  arrivalTime.value = evt.target.value;
});
