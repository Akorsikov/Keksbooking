// start of the project
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

// start of the project
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

//write functions to create an array of 10 generated objects
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
]

const advertisement = {
  // author, объект — описывает автора. Содержит одно поле:
  author : {
    avatar: '', // avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.
  },
  // offer, объект — содержит информацию об объявлении. Состоит из полей:
  offer : {
    title: '',    // title, строка — заголовок предложения. Придумайте самостоятельно.
    address: '',  // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
    price: null,  // price, число — стоимость. Случайное целое положительное число.
    type: '',     // type, строка — одно из четырёх фиксированных значений: palace, flat, house или bungalow.
    room: null,   // rooms, число — количество комнат. Случайное целое положительное число.
    guests: null, // guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
    checkin: '',  // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    checkout: '', // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    features: [], // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    description: '', // description, строка — описание помещения. Придумайте самостоятельно.
    photos: [],   // photos, массив строк — массив случайной длины из значений: http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg.
    // location, объект — местоположение в виде географических координат. Состоит из двух полей:
    location: {
      x: null,    // x, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
      y: null,    // y, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    },
  },
}
