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
 * Функция возвращающая число в виде строки с заданным количеством цифр после запятой;
 * @param {number} numberFloat - десятичное число;
 * @param {number} lengthDigitsAfterPoint - целое число, количество цифр после запятой;
 * @return {string} число в виде строки с заданным количеством цифр после запятой;
 */
const getFixLengthDigitsAfterPoint = (numberFloat,  lengthDigitsAfterPoint) => {
  let stringNumberFloat = String(numberFloat.toFixed(lengthDigitsAfterPoint));
  while (stringNumberFloat.length < lengthDigitsAfterPoint) {
    stringNumberFloat += '0';
  }
  return stringNumberFloat;
}

/**
 * Функция для проверки статуса выполнения запроса "fetch". Если код ответа в диапазоне чисел 200-299
 * @param {*} response
 * @returns Если код ответа в диапазоне чисел 200-299 вернется "response" иначе "error"
 */
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

export {  getRandomIntegerInRange,  getRandomFloatInRange,  getFixLengthDigitsAfterPoint,  checkStatus}
