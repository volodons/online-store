const sideMenu = document.querySelector(".shop-cart");
const buttonOpenSideMenu = document.querySelector(".shop-cart-button");
const buttonCloseSideMenu = document.querySelector(".close-icon");

let toggleSideMenu = () => {
  sideMenu.classList.toggle("shop-cart--open");
};

buttonOpenSideMenu.addEventListener("click", toggleSideMenu);
buttonCloseSideMenu.addEventListener("click", toggleSideMenu);

class ProductsRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  renderProducts(products) {
    this.container.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("article");
      productElement.classList.add("product");
      const productIndex = products.length - 1;
      productElement.innerHTML = `
        <img
          src=${product.image}
          alt=${product.name}
          title=${product.name}
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
  fetchData(productsRenderer) {
    fetch("../data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const products = data.products.map(
          (productData) =>
            new Product(
              productData.id,
              productData.category,
              productData.name,
              productData.price,
              productData.image
            )
        );
        productsRenderer.renderProducts(products);
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
    this.items.push(item);
    const itemIndex = this.items.length - 1;
    const shoppingCartContainer = document.querySelector(".shop-cart");
    const itemHTML = document.createElement("article");
    itemHTML.classList.add("shop-cart__item");
    itemHTML.innerHTML = `
      <section class="shop-cart__item-wrapper">
        <img
          class="shop-cart__item-image"
          src=${item.image}
          alt=${item.name}
          title=${item.name}
        />
      <section class="shop-cart__item-info">
        <p class="shop-cart__item-name">${item.name}</p>
        <p class="shop-cart__item-price">$${item.price}</p>
        <button id="remove-item-button-${itemIndex}" class="shop-cart__item-remove-button">remove</button>
      </section>
      </section>
      <section class="shop-cart__item-count">
        <button id="increaseItemCount" class="arrow">&#8896;</button>
        <span>1</span>
        <button id="decreaseItemCount" class="arrow">&#8897;</button>
      </section>`;
    shoppingCartContainer.append(itemHTML);
    const buttonRemoveItem = document.querySelector(
      `#remove-item-button-${itemIndex}`
    );
    buttonRemoveItem.addEventListener("click", () =>
      this.removeItem(itemHTML, itemIndex)
    );
  }

  removeItem(itemHTML, itemIndex) {
    delete this.items[itemIndex];
    const filteredItems = this.items.filter(Boolean);
    this.items = filteredItems;
    itemHTML.remove();
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.items.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  }

  clearCart() {
    this.items = [];
  }
}

class Product {
  constructor(id, category, name, price, image) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

const shoppingCart = new ShoppingCart();
const productsRenderer = new ProductsRenderer("container");
const dataFetcher = new DataFetcher();
dataFetcher.fetchData(productsRenderer);
