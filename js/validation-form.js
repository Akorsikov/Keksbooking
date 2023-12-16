import {setMarkerTokyoCenter, GEO_PRECISION} from './map.js';
import {getFixLengthDigitsAfterPoint, checkStatus} from './util.js';

const TIMEOUT = 2000;
const NUMBER_ATTEMPTS = 2;
const NUMBER_PHOTO = 3;
const MAX_ROOM = 100;
const MIN_PRICE = new Map([
  ['bungalow',   0],
  ['flat',    1000],
  ['hotel',   3000],
  ['house',   5000],
  ['palace', 10000],
]);

const adForm = document.querySelector('.ad-form');
const imageAuthor = document.querySelector('#avatar');
const avatarAuthor = adForm.querySelector('.ad-form-header__preview img');
const adTitle = adForm.querySelector('#title');
const typeHousing = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room-number');
const adFormAddress = document.querySelector('#address');
const guestCapacity = adForm.querySelector('#capacity');
const guestCapacityList = guestCapacity.querySelectorAll('option');
const priceHousing = adForm.querySelector('#price');
const arrivalTime = adForm.querySelector('#timein');
const departureTime = adForm.querySelector('#timeout');
const imagesHousing = adForm.querySelector('#images');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const buttonReset = adForm.querySelector('.ad-form__reset');
const buttonSubmit = adForm.querySelector('.ad-form__submit');

const templateAdSuccess = document.querySelector('#success').content;
const templateAdError = document.querySelector('#error').content;
const successOutputForm = templateAdSuccess.querySelector('.success').cloneNode(true);
const errorOutputForm = templateAdError.querySelector('.error').cloneNode(true);

let countAttempts = 0;
let errorMessage = '';

const setMinPrice = (typeHousing) => {
  const minPrice = MIN_PRICE.get(typeHousing);
  priceHousing.setAttribute('placeholder', minPrice);
  priceHousing.setAttribute('min', minPrice);
  return minPrice;
}

const setLimitCapacity = (room) => {
  guestCapacityList.forEach((item) => {
    if (room === MAX_ROOM) {
      if (item.value === 'null') {
        item.setAttribute('disabled', true);
      } else if (Number(item.value)) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    } else if (room < Number(item.value) || (Number(item.value) === 0 || item.value === 'null')) {
      item.setAttribute('disabled', true);
    } else {
      item.removeAttribute('disabled');
    }
  });
}

const clearLimitCapacity = () => {
  guestCapacityList.forEach((item) => {
    if (item.value !== 'null') {
      item.removeAttribute('disabled');
    }
  });
}

const validationGuestsAndRoom = () => {
  setLimitCapacity(Number(roomNumber.value));
  switch (true) {
    case (guestCapacity.value === 'null' || (+guestCapacity.value === 0 && +roomNumber.value !== MAX_ROOM)): {
      guestCapacity.setCustomValidity('Выберите количество мест!');
    }
      break;
    case (+guestCapacity.value > +roomNumber.value): {
      guestCapacity.setCustomValidity('Количество мест не может превышать количество комнат!');
    }
      break;
    case (+roomNumber.value === MAX_ROOM && +guestCapacity.value !== 0): {
      guestCapacity.setCustomValidity('Количество комнат не для гостей!');
    }
      break;
    default: {
      guestCapacity.setCustomValidity('');
    }
  }
  guestCapacity.reportValidity();
  roomNumber.setCustomValidity('');
}

const validationTypeHousing = () => {
  const minPrice = setMinPrice(typeHousing.value);
  if (priceHousing.value !== '') {
    if (Number(priceHousing.value) < minPrice) {
      typeHousing.setCustomValidity(`Тип жилья не соответсвует минимальной цене ${minPrice} руб!`);
      typeHousing.reportValidity();
    } else  {
      typeHousing.setCustomValidity('');
    }
  }
}

const validationPriceHousing = () => {
  if (priceHousing.reportValidity()) {
    typeHousing.setCustomValidity('');
  }
}

const validationAvatar = (file) => {
  if (file.files[0].type.substr(0, 5) !== 'image') {
    imageAuthor.setCustomValidity('Выбранный файл не является изображением и не будет передан на сервер!');
    imageAuthor.reportValidity();
    file.value = '';
    avatarAuthor.src = '';
  } else {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarAuthor.src = reader.result;
    });
    reader.readAsDataURL(file.files[0]);
  }
}

const validationImages = () => {
  clearAdFormPhoto();
  const validFiles = new DataTransfer();
  let invalidMessage = '';
  let additionalMessage;
  for (let file of imagesHousing.files) {
    if (file.type.substr(0, 5) !== 'image') {
      invalidMessage += `\n ${file.name}, `;
    } else {
      if (validFiles.files.length < NUMBER_PHOTO) {
        validFiles.items.add(file);
      }
      else {
        additionalMessage = `\nОграничение на количество файлов, только первые ${NUMBER_PHOTO} фото будут переданы на сервер!`;
      }
    }
  }

  invalidMessage = (invalidMessage) ?
    `Выбранный(-ые) файл(-ы): ${invalidMessage.slice(0, -2)} \n -не являются изображениями и не будут переданы на сервер!` :
    invalidMessage;
  invalidMessage = (additionalMessage) ? invalidMessage + additionalMessage : invalidMessage;

  imagesHousing.setCustomValidity(invalidMessage);
  imagesHousing.reportValidity();
  imagesHousing.files = validFiles.files;
  for (let i = 0; i < imagesHousing.files.length; i++) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const photo = document.createElement('img');
      photo.style.width = '70px';
      photo.style.height = '70px';
      adFormPhoto.append(photo);
      adFormPhoto.style.width = `${(i + 1) * 70}px`;
      photo.src = reader.result;
    });
    reader.readAsDataURL(imagesHousing.files[i]);
  }
}

const clearAdFormPhoto = () => {
  let listPhotos = adFormPhoto.querySelectorAll('img');
  for (let photo of listPhotos) {
    photo.remove();
    adFormPhoto.style.width = '70px';
  }
}

adForm.addEventListener('change', (evt) => {
  switch (evt.target.id) {
    case ('avatar') : validationAvatar(imageAuthor);
      break;
    case ('title') : adTitle.reportValidity();
      break;
    case ('price') : validationPriceHousing();
      break;
    case ('type') : validationTypeHousing();
      break;
    case ('timein') : departureTime.value = evt.target.value;
      break;
    case ('timeout') : arrivalTime.value = evt.target.value;
      break;
    case ('room-number') : validationGuestsAndRoom();
      break;
    case ('capacity') : guestCapacity.setCustomValidity('');
      break;
    case ('images') : validationImages();
      break;
  }
});

const removeErrorFormMessage = () => {
  setTimeout(() => {
    errorOutputForm.remove();
    document.removeEventListener('click', removeErrorFormMessage);
    if (countAttempts < NUMBER_ATTEMPTS) {
      countAttempts ++;
      buttonSubmit.click();
    } else {
      countAttempts = 0;
      alert(`${errorMessage}Не получается отправить объявление.`);
    }
  }, TIMEOUT);
}

const getOutputFormMessage = (status, templateOutputFormMessage) => {
  document.body.append(templateOutputFormMessage);
  if (status) {
    setTimeout(() => {
      templateOutputFormMessage.remove()
    }, TIMEOUT);
  } else {
    const buttonErrorMessage = templateOutputFormMessage.querySelector('.error__button');
    buttonErrorMessage.addEventListener('click', removeErrorFormMessage);
  }
}

const clearAdForm = () => {
  adForm.reset();
  avatarAuthor.src = 'img/muffin-grey.svg';
  setMinPrice(typeHousing.value);
  clearLimitCapacity();
  const coordinates = setMarkerTokyoCenter();
  adFormAddress.value =
  `Lat: ${getFixLengthDigitsAfterPoint(coordinates.lat, GEO_PRECISION)},
   Lng: ${getFixLengthDigitsAfterPoint(coordinates.lng, GEO_PRECISION)}`;
  clearAdFormPhoto();
}

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearAdForm();
});

buttonSubmit.addEventListener('click', (evt) => {
  imageAuthor.setCustomValidity('');
  imagesHousing.setCustomValidity('');
  if (adForm.checkValidity()) {
    if (roomNumber.value === 'null') {
      roomNumber.setCustomValidity('Выберите количество комнат!');
      roomNumber.reportValidity();
    }
  }
  if (adForm.checkValidity()) {
    evt.preventDefault();
    fetch('https://23.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body: new FormData(adForm),
    })
      .then((checkStatus))
      .then((response) => (response.json()))
      .then((obj) => (console.log(obj)))// for cheking send form
      .then(() => {
        getOutputFormMessage(true, successOutputForm);
        clearAdForm();
      })
      .catch((error) => {
        errorMessage += (error + '\n');
        getOutputFormMessage(false, errorOutputForm);
      });
  }
});
