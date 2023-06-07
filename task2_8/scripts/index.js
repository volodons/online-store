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

  renderProducts(data) {
    this.container.innerHTML = "";
    data.products.forEach((product) => {
      const productElement = document.createElement("article");
      productElement.classList.add("product");
      productElement.innerHTML = `
        <img
          src=${product.image}
          alt=${product.name}
          title=${product.name}
        />
        <h2 class="product__name">${product.name}</h2>
        <p class="product__price">$${product.price}</p>`;
      this.container.append(productElement);
    });
  }
}
class DataFetcher {
  fetchData(callback) {
    fetch("../data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        callback.renderProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const productsRenderer = new ProductsRenderer("container");
const dataFetcher = new DataFetcher();
dataFetcher.fetchData(productsRenderer);
