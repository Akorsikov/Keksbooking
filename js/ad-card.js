const templateAdCard = document.querySelector('#card').content;
const adCard = templateAdCard.querySelector('.popup').cloneNode(true);
const adCardAvatar = adCard.querySelector('.popup__avatar');
const adCardTitle = adCard.querySelector('.popup__title');
const adCardAddress = adCard.querySelector('.popup__text--address');
const adCardPrice = adCard.querySelector('.popup__text--price');
const adCardType = adCard.querySelector('.popup__type');
const adCardCapacity = adCard.querySelector('.popup__text--capacity');
const adCardTime = adCard.querySelector('.popup__text--time');
const adCardFeatures = adCard.querySelector('.popup__features');
const adCardDescription = adCard.querySelector('.popup__description');
const adCardPhotos = adCard.querySelector('.popup__photos');

const getAdCard = (adData) => {

  adCardAvatar.setAttribute('src', adData.author.avatar);
  adCardTitle.textContent = adData.offer.title;
  adCardAddress.textContent = adData.offer.address;
  adCardType.textContent = adData.offer.type;
  adCardTime.textContent = `Заезд после ${adData.offer.checkin}, выезд до ${adData.offer.checkout}`;
  adCardDescription.textContent = adData.offer.description;

  //price
  const span = document.createElement('span');
  span.textContent = '₽/ночь';
  adCardPrice.textContent = `${adData.offer.price} `;
  adCardPrice.append(span);

  //capacity
  const getTextRooms = (quantityRooms) => {
    switch (quantityRooms) {
      case 1 : return 'комната';
      case 2 :
      case 3 :
      case 4 : return 'комнаты';
      default: return 'комнат';
    }
  }
  const textGuests = (adData.offer.guests > 1) ? 'гостей' : 'гостя';
  adCardCapacity.textContent = `${adData.offer.room} ${getTextRooms(adData.offer.room)} для ${adData.offer.guests} ${textGuests}`;

  //features
  const features = adData.offer.features;
  for (let i = 0; i < features.length; i++) {
    adCardFeatures.append(getCardFeature(features[i]));
  }

  //photos
  const srcPhotos = adData.offer.photos;
  for (let i = 0; i < srcPhotos.length; i++) {
    adCardPhotos.append(getCardPhoto(srcPhotos[i]));
  }

  return adCard;
}

const getCardFeature = (feature) => {
  const cardFeature = document.createElement('li');
  cardFeature.classList.add('popup__feature', `popup__feature--${feature}`);
  return cardFeature;
}

const getCardPhoto = (src) => {
  const cardPhoto = document.createElement('img');
  cardPhoto.classList.add('popup__photo');
  cardPhoto.setAttribute('width', 45);
  cardPhoto.setAttribute('height', 40);
  cardPhoto.setAttribute('alt', 'Фотография жилья');
  cardPhoto.setAttribute('src', src);
  return cardPhoto;
}

export {getAdCard};
