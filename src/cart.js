import { getProductElement } from './products';
import { findElement } from './utills';

export function setupCart({ container, onIncreaseClick, onDecreaseClick }) {
  container.addEventListener('click', (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, '.product');
    const productId = productElement.getAttribute('data-product-id');

    if (targetElement.matches('.btn-increase') || targetElement.matches('.btn-decrease')) {
      if (targetElement.matches('.btn-increase')) {
        onIncreaseClick({ productId });
      } else if (targetElement.matches('.btn-decrease')) {
        onDecreaseClick({ productId });
      }
    }
  });
  const addProduct = ({ product }) => {
    const productElement = getProductElement(product);
    container.appendChild(productElement);
  };
  const removeProduct = ({ product }) => {
    const productElement = document.querySelector(`.product[date-product-id=${product.id}]`);
    productElement.remove();
  };

  const updateCount = ({ productId, count }) => {
    const productElement = container.querySelector(`.product[data-product-id="${productId}"]`);
    const cartCountElement = productElement.querySelector('.cart-count');
    console.log('👉', cartCountElement, count);
    cartCountElement.innerHTML = count;
    if (count === 0) {
      cartCountElement.innerHTML = '';
    }
  };
  return {
    addProduct,
    removeProduct,
    updateCount,
  };
}
