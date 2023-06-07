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
      productElement.innerHTML = `
        <img
          src=${product.image}
          alt=${product.name}
          title=${product.name}
        />
        <button id="add-to-cart-button-${products.indexOf(
          product
        )}" class="add-to-cart-button"></button>
        <h2 class="product__name">${product.name}</h2>
        <p class="product__price">$${product.price}</p>`;
      this.container.append(productElement);
      const buttonAddToCart = document.querySelector(
        `#add-to-cart-button-${products.indexOf(product)}`
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
    const shoppingCartContainer = document.querySelector(".shop-cart");
    const newItem = document.createElement("article");
    newItem.classList.add("shop-cart__item");
    newItem.innerHTML = `
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
        <button id="remove-item-${this.items.indexOf(
          item
        )}" class="shop-cart__item-remove-button">remove</button>
      </section>
      </section>
      <section class="shop-cart__item-count">
        <button id="increaseItemCount" class="arrow">&#8896;</button>
        <span>1</span>
        <button id="decreaseItemCount" class="arrow">&#8897;</button>
      </section>`;
    shoppingCartContainer.append(newItem);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
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
