const QUANTITY_OBJECTS = 10;
const LATITUDE = {
  MIN: 35.65000,
  MAX: 35.70000,
}
const LONGITUDE = {
  MIN: 139.70000,
  MAX: 139.80000,
}
const GEO_PRECISION = 5;
const PRICE = {
  MIN: 10000,   //    10 000;
  MAX: 1000000, // 1 000 000;
}
const ROOM = {
  MIN: 1,
  MAX: 7,
}
const MAX_GUESTS = 8;
const MAX_PHOTOS = 6;
const titles = [
  'Сдам в аренду',
  'Сдаётся',
  'Выгодная аренда',
  'Жильё в аренду',
  'Сдам жильё',
  'Нуждаешься в жилье?',
  'Сдаётся в аренду',
  'Сдаётся жильё',
];
const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const checks = [
  '12:00',
  '13:00',
  '14:00',
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const descriptions = [
  'Жильё в центре города',
  'Рядом замечательный парк',
  'С видом на море',
  'Из окна замечательный вид на горы',
  'Недалеко от метро и рынка',
  'В квартале от музея и выставки исскуств',
  'Тихий район',
  'Удобный подъезд к жилью',
  'Ресторан и библиотека за углом',
  'Окраина города, много зелени',
];
const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * (диапазон может быть только положительный, включая ноль).
 * @param {integer} range1 - целое положительное число, начало(или конец) диапазона(входит в диапазон);
 * @param {integer} range2 - целое положительное число, конец(или начало) диапазона(входит в диапазон);
 * @return {integer} - случайное целое положительное число из переданного диапазона(включая min и max);
 * @return {undefined} - undefined в случае не корректного диапазона.
 * */
const getRandomIntegerInRange = (range1, range2) => {
  if (range1 < 0 ||
      range2 < 0 ||
      range1 % 1 > 0 ||
      range2 % 1 > 0 ||
      range1 === range2) {
    return undefined;
  } else if (range1 > range2) {
    [range1, range2] = [range2, range1];
  }
  return Math.floor(Math.random() * (range2 - range1 + 1)) + range1;
}
/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * (диапазон может быть только положительный, включая ноль) с указанным "количеством знаков после запятой".
 * @param {number} range1 - число с плавающей точкой, начало(или конец) диапазона(входит в диапазон);
 * @param {number} range2 - число с плавающей точкой, конец(или начало) диапазона(входит в диапазон);
 * @param {number} depthAfterDot - целое положительное число, с указывающее "количество знаков после запятой";
 * @return {number} - случайное положительное число с плавающей точкой из переданного диапазона(включая range1 и range2);
 * @return {undefined} - undefined в случае не корректных диапазона или количества знаков после запятой.
 * */
const getRandomFloatInRange = (range1, range2, depthAfterDot ) => {
  if (range1 < 0 ||
      range2 < 0 ||
      depthAfterDot < 0 ||
      depthAfterDot % 1 !== 0 ||
      range1 === range2) {
    return undefined;
  } else if (range1 > range2) {
    [range1, range2] = [range2, range1]
  }
  const tenToDegree = Math.pow(10, depthAfterDot);
  const randomNumber = (Math.random() * (range2 - range1) + range1);
  return Math.round(randomNumber * tenToDegree) / tenToDegree;
}
/**
 *Функция возвращает случайным образом сгенерированный массив не повторяющихся опций(фич
  с использованием заданного массива "features") случайной длины (в пределах длины "features").
  @return {array} arrayFeatures - массив опций для объявления о сдаче жилья.
 */
const getRandomArrayFeatures = () => {
  const quantityFeatures = getRandomIntegerInRange(1, features.length);
  if (quantityFeatures === features.length) {
    return features;
  }
  let arrayFeatures = features.slice();
  for (let i = quantityFeatures; i < features.length; i++) {
    let feature = arrayFeatures[getRandomIntegerInRange(1, arrayFeatures.length - 1)];
    let indexItem = arrayFeatures.indexOf(feature);
    arrayFeatures.splice(indexItem, 1);
  }
  return arrayFeatures;
}
/**
 *Функция возвращает случайным образом сгенерированный массив адресов фотографий
 (с использованием заданного массива "photos") случайной длины (в пределах константы
  "MAX_PHOTOS").
  @return {array} arrayPhotos - массив адресов фотографий для объявления о сдаче жилья.
 */
const getRandomArrayPhotos = () => {
  const quantityPhotos = getRandomIntegerInRange(1, MAX_PHOTOS);
  let arrayPhotos = [];
  for (let i = 0; i < quantityPhotos; i++) {
    arrayPhotos.push(photos[getRandomIntegerInRange(1, photos.length - 1)]);
  }
  return arrayPhotos;
}
/**
 *Функция возвращает случайным образом сгенерированный массив объявлений в виде объектов
 со свойствами, также случайным образом сгенерированными(с использованием массивов значений
 или без таковых).
 @param {number} quantity - количество генерируемых объявлений (элементов массива);
 @return {array} arrayAds - массив сгенерированных объявлений.
 Описание структуры объекта(объявления):
  - author, объект — описывает автора. Содержит одно поле: avatar;
    - avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png,
    где {{xx}} — это число от 1 до 10 с ведущим нулём. Например, 01, 02 и т. д.
    Адреса изображений не повторяются.
  - offer, объект — содержит информацию об объявлении. Состоит из полей:
    - title, строка — заголовок предложения. Придумайте самостоятельно.
    - address, строка — адрес предложения. Для простоты пусть пока составляется из
    географических координат по маске {{location.x}}, {{location.y}}.
    - price, число — стоимость. Случайное целое положительное число.
    - type, строка — одно из четырёх фиксированных значений: palace, flat, house или bungalow.
    - rooms, число — количество комнат. Случайное целое положительное число.
    - guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
    - checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    - checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    - features, массив строк — массив случайной длины из значений:
    wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    - description, строка — описание помещения. Придумайте самостоятельно.
    - photos, массив строк — массив случайной длины из значений:
    http://o0.github.io/assets/images/tokyo/hotel1.jpg,
    http://o0.github.io/assets/images/tokyo/hotel2.jpg,
    http://o0.github.io/assets/images/tokyo/hotel3.jpg.
    - location, объект — местоположение в виде географических координат. Состоит из двух полей:
      - x, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000,
      - y, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
 */
const getArrayRandomAds = (quantity) => {
  let arrayAds = [];
  for (let i = 0; i < quantity; i++) {
    const numberPhoto = String(i + 1).padStart(2, '0');
    const latitude = getRandomFloatInRange(LATITUDE.MIN, LATITUDE.MAX, GEO_PRECISION);
    const longitude = getRandomFloatInRange(LONGITUDE.MIN, LONGITUDE.MAX, GEO_PRECISION);
    const advertisement = {
      author : {
        avatar: `img/avatars/user${numberPhoto}.png`,
      },
      offer: {
        title: titles[getRandomIntegerInRange(1, titles.length - 1)],
        address: `${latitude}, ${longitude}`,
        price: Math.trunc(getRandomIntegerInRange(PRICE.MIN, PRICE.MAX) / 1000) * 1000,
        type: types[getRandomIntegerInRange(1, types.length - 1)],
        room: getRandomIntegerInRange(ROOM.MIN, ROOM.MAX),
        guests: getRandomIntegerInRange(1, MAX_GUESTS),
        checkin: checks[getRandomIntegerInRange(1, checks.length - 1)],
        checkout: checks[getRandomIntegerInRange(1, checks.length - 1)],
        features: getRandomArrayFeatures(),
        description: descriptions[getRandomIntegerInRange(1, descriptions.length - 1)],
        photos: getRandomArrayPhotos(),
        location: {
          x: latitude,
          y: longitude,
        },
      },
    }
    arrayAds.push(advertisement);
  }
  return arrayAds;
}


const ads = getArrayRandomAds(QUANTITY_OBJECTS);
console.log(ads);

