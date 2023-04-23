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
