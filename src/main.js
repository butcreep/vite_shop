import test from './test.json?raw';

async function getProducts() {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
    return await response.json();
  }
}
function findElement(startingElement, selector) {
  let currentElment = startingElement;
  while (currentElment) {
    if (currentElment.matches(selector)) {
      return currentElment;
    }
    currentElment = currentElment.parentElement;
  }
  return null;
}
function sumAllCounts(countMap) {
  return Object.values(countMap).reduce((total, current) => {
    total += current;
    return total;
  }, 0);
}

async function main() {
  const products = await getProducts();
  const countMap = {};
  const increaseCount = (productId) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
  };
  const decreaseCount = (productId) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
  };
  document.querySelector('#products').innerHTML = products
    .map(
      (product) =>
        `<div class='product' data-product-id='${product.id}'>
          <img src="${product.images[0]}" alt="Image of ${product.name}" />
          <p>${product.name}</p>
					<div class="flex items-center justify-between">
					<span>Price: ${product.regularPrice}</span>
					<div>
						<button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
						<span class="cart-count text-green-800"></span>
						<button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
					</div>
				</div>
        </div>
        `
    )
    .join('');

  document.querySelector('#products').addEventListener('click', (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, '.product');
    const productId = productElement.getAttribute('data-product-id');

    if (targetElement.matches('.btn-increase') || targetElement.matches('.btn-decrease')) {
      if (targetElement.matches('.btn-increase')) {
        increaseCount(productId);
      } else if (targetElement.matches('.btn-decrease')) {
        decreaseCount(productId);
      }
      const cartCount = productElement.querySelector('.cart-count');
      cartCount.innerHTML = countMap[productId];

      document.querySelector('.total_count').innerHTML = `(${sumAllCounts(countMap)})`;
    }
  });

  document.querySelector('.btn-cart').addEventListener('click', () => {
    document.body.classList.add('displaying_cart');
  });

  document.querySelector('.btn-close-cart').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });

  document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });
}

main();
