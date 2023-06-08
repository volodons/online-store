const overlayThemeToggler = document.querySelector("#overlay");
const shoppingCartContainer = document.querySelector(".shopping-cart");
const buttonOpenShoppingCartContainer = document.querySelector(
  ".shopping-cart-button"
);
const buttonCloseShoppingCartContainer = document.querySelector(".close-icon");

const toggleShoppingCartContainer = () => {
  overlayThemeToggler.classList.toggle("overlay-theme");
  shoppingCartContainer.classList.toggle("shopping-cart--open");
};

buttonOpenShoppingCartContainer.addEventListener(
  "click",
  toggleShoppingCartContainer
);
buttonCloseShoppingCartContainer.addEventListener(
  "click",
  toggleShoppingCartContainer
);

class ProductsRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  renderProducts(products) {
    this.container.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("article");
      productElement.classList.add("product");
      const productIndex = products.indexOf(product);
      productElement.innerHTML = `
        <img
          class="product__image"
          src="${product.image}"
          alt="${product.name}"
          title="${product.name}"
        />
        <button id="add-to-cart-button-${productIndex}" class="add-to-cart-button"></button>
        <h2 class="product__name">${product.name}</h2>
        <p class="product__price">$${product.price}</p>`;
      this.container.append(productElement);
      const buttonAddToCart = document.querySelector(
        `#add-to-cart-button-${productIndex}`
      );
      buttonAddToCart.addEventListener("click", () => {
        shoppingCart.addItem(product);
      });
    });
  }
}
class DataFetcher {
  static fetchData() {
    return fetch("../data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const existingItemIndex = this.items.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    this.items.push(item);
    const itemIndex = this.items.length - 1;
    if (existingItemIndex !== -1) {
      const shoppingItemCounter = document.querySelector(
        `#shopping-item-counter-${existingItemIndex}`
      );
      let count = parseInt(shoppingItemCounter.textContent);
      count++;
      shoppingItemCounter.textContent = count;
    } else {
      const itemHTML = document.createElement("article");
      itemHTML.classList.add("shopping-cart__item");
      itemHTML.innerHTML = `
        <section class="shopping-cart__item-wrapper">
          <img
            class="shopping-cart__item-image"
            src="${item.image}"
            alt="${item.name}"
            title="${item.name}"
          />
        <section class="shopping-cart__item-info">
          <p class="shopping-cart__item-name">${item.name}</p>
          <p class="shopping-cart__item-price">$${item.price}</p>
          <button id="remove-item-button-${itemIndex}" class="shopping-cart__item-remove-button">remove</button>
        </section>
        </section>
        <section class="shopping-cart__item-count">
          <button id="increaseItemCount" class="arrow">&#8896;</button>
          <span id="shopping-item-counter-${itemIndex}">1</span>
          <button id="decreaseItemCount" class="arrow">&#8897;</button>
        </section>`;
      const shoppingCartItemsContainer = document.querySelector(
        ".shopping-cart__items-wrapper"
      );
      shoppingCartItemsContainer.append(itemHTML);
      const buttonRemoveItem = document.querySelector(
        `#remove-item-button-${itemIndex}`
      );
      buttonRemoveItem.addEventListener("click", () =>
        this.removeItem(itemHTML, itemIndex)
      );
    }
    this.getTotalPrice();
  }

  removeItem(itemHTML, itemIndex) {
    delete this.items[itemIndex];
    const filteredItems = this.items.filter(Boolean);
    this.items = filteredItems;
    itemHTML.remove();
    this.getTotalPrice();
  }

  getTotalPrice() {
    const shoppingCartTotalPrice = document.querySelector(
      "#shoppingCartTotalPrice"
    );
    if (this.items.length === 0) {
      shoppingCartTotalPrice.innerText = "0.00";
    } else {
      let totalPrice = 0;
      this.items.forEach((item) => {
        totalPrice += item.price;
      });
      shoppingCartTotalPrice.innerText = totalPrice.toFixed(2);
    }
  }

  clearCart() {
    this.items = [];
  }
}

class Product {
  static createProduct(productData) {
    return new Product(
      productData.id,
      productData.category,
      productData.name,
      productData.price,
      productData.image
    );
  }
}

class FilterProductName {
  constructor(inputElement) {
    this.inputElement = inputElement;
    this.addEventListener("input", this.onTextInput);
  }

  addEventListener() {
    inputElement.addEventListener("input", this.getProductName);
  }

  getProductName() {
    const productName = inputElement.value;
    DataFetcher.fetchData().then((data) => console.log(data));
  }
}

const shoppingCart = new ShoppingCart();
const productsRenderer = new ProductsRenderer("container");
DataFetcher.fetchData().then((data) => {
  data.products.map((productData) => {
    Product.createProduct(productData);
  });
  productsRenderer.renderProducts(data.products);
});
const filterProductName = new FilterProductName("#inputElement");
