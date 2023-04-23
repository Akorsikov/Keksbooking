// start of the project
/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * (диапазон может быть только положительный, включая ноль).
 * @param {integer} min integer - целое положительное число, начало диапазона(входит в диапазон);
 * @param {integer} max integer - целое положительное число, конец диапазона(входит в диапазон);
 * @return {integer} - случайное целое положительное число из переданного диапазона(включая min и max);
 * */
const getRandomIntegerInRange = function (min, max) {
  if (min < 0 ||
      max < 0 ||
      min % 1 > 0 ||
      max % 1 > 0 ||
      min >= max) {
    return undefined;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

