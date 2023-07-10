import { shoppingCart } from "./cart.js";
import { filterProductName } from "./products/FilterProductName.js";
import { filterProductCompany } from "./products/FilterProductCompany.js";
import { filterProductPrice } from "./products/FilterProductPrice.js";

class Renderer {
  static renderProducts(products) {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";
    products = this.applyFilters(products);
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
        <section class="product-info">
          <section class="product-description">
            <h2 class="product__name">${product.name}</h2>
            <p class="product__price">$${product.price}</p>
          </section>
          <button id="add-to-cart-button-${productIndex}" 
          class="add-to-cart-button"></button>
        </section>`;
      productsContainer.append(productElement);
      const buttonAddToCart = document.querySelector(
        `#add-to-cart-button-${productIndex}`
      );
      buttonAddToCart.addEventListener("click", () => {
        shoppingCart.addItem(product);
      });
    });
  }

  static applyFilters(products) {
    const queryParams = new URLSearchParams(window.location.search);
    let filteredProducts = products;
    if (filterProductName.selectedName !== null) {
      filteredProducts = filteredProducts.filter((product) => {
        const nameFilter = queryParams.get("name");
        return nameFilter
          ? product.name.toLowerCase().includes(nameFilter)
          : true;
      });
    }
    if (filterProductCompany.selectedCompany !== "All") {
      filteredProducts = filteredProducts.filter((product) => {
        const companyFilter = queryParams.get("company");
        return companyFilter ? product.company.includes(companyFilter) : true;
      });
    }
    if (filterProductPrice.selectedPrice !== null) {
      filteredProducts = filteredProducts.filter((product) => {
        const priceFilter = queryParams.get("price");
        return priceFilter ? product.price <= parseInt(priceFilter) : true;
      });
    }
    return filteredProducts;
  }

  static renderItems(items) {
    const itemsContainer = document.getElementById("itemsContainer");
    itemsContainer.innerHTML = "";
    if (Object.keys(items).length > 0) {
      for (const item of Object.values(items)) {
        const itemHTML = document.createElement("article");
        itemHTML.classList.add("shopping-cart__item");
        itemHTML.innerHTML = `
          <section class="shopping-cart__item-wrapper">
            <img
              class="shopping-cart__item-image"
              src="${item.product.image}"
              alt="${item.product.name}"
              title="${item.product.name}"
            />
          <section class="shopping-cart__item-info">
            <p class="shopping-cart__item-name">${item.product.name}</p>
            <p class="shopping-cart__item-price">$${item.product.price}</p>
            <button id="remove-item-button-${item.product.id}" class="shopping-cart__item-remove-button">remove</button>
          </section>
          </section>
          <section class="shopping-cart__item-count">
            <button id="increaseItemCount-${item.product.id}" class="arrow">&#8896;</button>
            <span id="shopping-item-counter-${item.product.id}">${item.count}</span>
            <button id="decreaseItemCount-${item.product.id}" class="arrow">&#8897;</button>
          </section>`;
        itemsContainer.append(itemHTML);
        const itemCounter = document.querySelector(
          `#shopping-item-counter-${item.product.id}`
        );
        const buttonIncreaseItemCount = document.querySelector(
          `#increaseItemCount-${item.product.id}`
        );
        buttonIncreaseItemCount.addEventListener("click", () => {
          shoppingCart.increaseItemCount(item.product.id);
        });
        const buttonDecreaseItemCount = document.querySelector(
          `#decreaseItemCount-${item.product.id}`
        );
        buttonDecreaseItemCount.addEventListener("click", () => {
          shoppingCart.decreaseItemCount(item.product.id);
        });
        const buttonRemoveItem = document.querySelector(
          `#remove-item-button-${item.product.id}`
        );
        buttonRemoveItem.addEventListener("click", () =>
          shoppingCart.removeItem(item.product.id)
        );
      }
    }
  }

  static renderTotalPrice(totalPrice) {
    const shoppingCartTotalPrice = document.querySelector(
      "#shoppingCartTotalPrice"
    );
    shoppingCartTotalPrice.innerText = totalPrice;
  }

  static renderTotalItemCount(items) {
    let totalItemCount = 0;
    if (Object.keys(items).length > 0) {
      for (const item of Object.values(items)) {
        totalItemCount += item.count;
      }
    }
    shoppingCartItemCounter.innerText = totalItemCount;
  }

  static highlightSelectedFilter(filterValue) {
    const filters = document.getElementsByClassName("companies-filter-button");
    for (let i = 0; i < filters.length; i++) {
      filters[i].classList.remove("companies-filter-button--highlighted");
    }
    const selectedFilter = document.getElementById(
      `buttonCompany${filterValue}`
    );
    selectedFilter.classList.add("companies-filter-button--highlighted");
  }

  static setInitialFilterState(filters) {
    if (filters.selectedName) {
      const inputElement = document.querySelector("#inputElement");
      inputElement.value = filters.selectedName;
    }
    if (filters.selectedCompany) {
      this.highlightSelectedFilter(filters.selectedCompany);
    }
    if (filters.selectedPrice) {
      rangeInput.value = parseInt(filters.selectedPrice);
      rangePrice.innerText = parseInt(filters.selectedPrice);
    }
  }
}

const overlayThemeToggler = document.querySelector("#overlay");
const shoppingCartContainer = document.querySelector(".shopping-cart");
const shoppingCartItemCounter = document.querySelector("#cartItemCounter");
const buttonOpenShoppingCartContainer = document.querySelector(
  ".shopping-cart-button"
);
const buttonCloseShoppingCartContainer = document.querySelector(".close-icon");
const buttonClearShoppingCart = document.querySelector(".clear-cart-icon");
const rangeInput = document.querySelector("#rangeInput");
const rangePrice = document.querySelector("#rangePrice");

buttonOpenShoppingCartContainer.addEventListener("click", () => {
  overlayThemeToggler.classList.toggle("overlay-theme");
  shoppingCartContainer.classList.toggle("shopping-cart--open");
});
buttonCloseShoppingCartContainer.addEventListener("click", () => {
  overlayThemeToggler.classList.toggle("overlay-theme");
  shoppingCartContainer.classList.toggle("shopping-cart--open");
});
buttonClearShoppingCart.addEventListener("click", () =>
  shoppingCart.clearCart(shoppingCart.items)
);
rangeInput.addEventListener("input", () => {
  rangePrice.innerText = rangeInput.value;
});

export { Renderer };
