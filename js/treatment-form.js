const MIN_COST = new Map([
  ['bungalow', 3000],
  ['flat',     5000],
  ['house',    7000],
  ['palace',   9000],
]);

const typeHousing = document.querySelector('#type');
const priceHousing = document.querySelector('#price');

typeHousing.addEventListener('change', () => {
  priceHousing.setAttribute('placeholder', MIN_COST.get(typeHousing.value));
});