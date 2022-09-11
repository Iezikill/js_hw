'use strict';

const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') {
    return;
  } else {
    /*по-любому есть способ проще найти родителя с классом featuredItem,
    но я пока не могу до него додуматься.
    Уверена, посмотрев видео-разбор я исправлю этот "треш", но пока это
    единственное решение, которое пришло мне в голову =D
    */
    const featuredItemEl = event.target.parentNode.parentNode.parentNode;
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
  }
});

function addToCart(id, name, price) {
  /*В объект basket добавить новый продукт или изменить имеющийся.
  В html отрисовать новое количество добавленных товаров у значка корзины.
  Отрисовать новую общую стоимость товаров в корзине.
  Отрисовать правильно строку в окне корзины, в которой записаны все данные
  о товаре.
  */
}