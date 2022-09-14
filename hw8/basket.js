'use strict';

const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }
  const featuredItemEl = event.target.closest('.featuredItem');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price;
  addToCart(id, name, price);
});

const cartSpanEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');


/**
 * Функция добавляет продукт в корзину.
 * @param {number} id - id продукта.
 * @param {string} name - название продукта.
 * @param {number} price - цена продукта.
 */
function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;

  cartSpanEl.textContent = getTotalProductCount();
  basketTotalValueEl.textContent = getTotalProductPrice().toFixed(2);
  showProductInCart(id);
}

/**
 * Функция считает и возвращает общее количество продуктов в корзине.
 * @return {number} - количество продуктов в корзине.
 */
function getTotalProductCount() {
  const products = Object.values(basket);
  let count = 0;
  for (const prod of products) {
    count += prod.count;
  }
  return count;
}

/**
 * Функция считает и возвращает общую стоимость добавленных продуктов в корзине.
 * @return {number} - общая стоимость всех продуктов в корзине.
 */
function getTotalProductPrice() {
  const products = Object.values(basket);
  let count = 0, price = 0;
  for (const prod of products) {
    price += prod.count * prod.price;
  }
  return price;
}

/**
 * Функция отображает в корзине информацию о добавленном продукте.
 * @param {number} productId - id продукта.
 */
function showProductInCart(productId) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {
    showNewProductInCart(productId);
    return;
  }
  const product = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

const basketTotalEl = document.querySelector('.basketTotal');

/**
 * Функция отображает первый раз добавленный товар в корзине.
 * @param {number} productId - id товара.
 */
function showNewProductInCart(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId]
      .price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}