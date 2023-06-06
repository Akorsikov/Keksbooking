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


// const arrivalTimes = arrivalTime.querySelectorAll('option');
// const departureTimes = departureTime.querySelectorAll('option');
// const changeAttribSelected = function (valueOption, selectOptions) {
//   for (let option of selectOptions) {
//     if (option.value !== valueOption) {
//       option.removeAttribute('selected');
//     } else {
//       option.setAttribute('selected', true);
//     }
//   }
// }

// const arrivalTimesHandler = function(evt) {
//   changeAttribSelected(arrivalTime.value, arrivalTimes);
//   changeAttribSelected(arrivalTime.value, departureTimes);
//   departureTime.value = evt.target.value;
// }
// const departureTimesHandler = function(evt) {
//   changeAttribSelected(departureTime.value, departureTimes);
//   changeAttribSelected(departureTime.value, arrivalTimes);
//   arrivalTime.value = evt.target.value;
// }