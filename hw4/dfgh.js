"use strict";

/**
 * Функция разделяет число на сотни, десятки и единицы.
 * @param {number} number - целое положительное число в диапазоне от 0 до 999.
 * @returns {object} объект с разрядами числа или пустой объект.
 */

function getDigitsOfNumber(number) {
  if (!Number.isInteger(number) || number < 0 || number > 999) {
    console.error('Something wrong');
    return {};
  }
  return {
    units: number % 10,
    dozens: Math.trunc(number / 10) % 10,
    hundreds: Math.trunc(number / 100) % 10,
  }
}

console.log(getDigitsOfNumber(812));