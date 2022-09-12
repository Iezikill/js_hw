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

const cartSpanEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

console.log(cartSpanEl);
function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;

  cartSpanEl.textContent = getTotalProductCount();
  basketTotalValueEl.textContent = getTotalProductPrice();
  showProductInCart(id);
}

function getTotalProductCount() {
  const products = Object.values(basket);
  let count = 0;
  for (const prod of products) {
    count += prod.count;
  }
  return count;
}

function getTotalProductPrice() {
  const products = Object.values(basket);
  let count = 0, price = 0;
  for (const prod of products) {
    price += prod.count * prod.price;
  }
  return price;
}

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

function showNewProductInCart(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}