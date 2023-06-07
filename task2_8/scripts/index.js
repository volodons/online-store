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
        <button class="add-to-cart-button"></button>
        <h2 class="product__name">${product.name}</h2>
        <p class="product__price">$${product.price}</p>`;
      this.container.append(productElement);
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

const productsRenderer = new ProductsRenderer("container");
const dataFetcher = new DataFetcher();
dataFetcher.fetchData(productsRenderer);
