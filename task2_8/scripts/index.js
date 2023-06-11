const overlayThemeToggler = document.querySelector("#overlay");
const shoppingCartContainer = document.querySelector(".shopping-cart");
const buttonOpenShoppingCartContainer = document.querySelector(
  ".shopping-cart-button"
);
const buttonCloseShoppingCartContainer = document.querySelector(".close-icon");
const rangeInput = document.querySelector("#rangeInput");
const rangePrice = document.querySelector("#rangePrice");

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
rangeInput.addEventListener("input", () => {
  rangePrice.innerText = rangeInput.value;
});

class Renderer {
  constructor(productsContainerId, itemsContainerId) {
    this.productsContainer = document.getElementById(productsContainerId);
    this.itemsContainer = document.getElementById(itemsContainerId);
  }

  renderProducts(products) {
    this.productsContainer.innerHTML = "";
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
      this.productsContainer.append(productElement);
      const buttonAddToCart = document.querySelector(
        `#add-to-cart-button-${productIndex}`
      );
      buttonAddToCart.addEventListener("click", () => {
        shoppingCart.addItem(product);
      });
    });
  }

  renderItems(items) {
    this.itemsContainer.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
      const itemIndex = i;
      const item = items[itemIndex];
      const itemHTML = document.createElement("article");
      itemHTML.classList.add("shopping-cart__item");
      itemHTML.innerHTML = `
        <section class="shopping-cart__item-wrapper">
          <img
            class="shopping-cart__item-image"
            src="${items[itemIndex].image}"
            alt="${items[itemIndex].name}"
            title="${items[itemIndex].name}"
          />
        <section class="shopping-cart__item-info">
          <p class="shopping-cart__item-name">${items[itemIndex].name}</p>
          <p class="shopping-cart__item-price">$${items[itemIndex].price}</p>
          <button id="remove-item-button-${itemIndex}" class="shopping-cart__item-remove-button">remove</button>
        </section>
        </section>
        <section class="shopping-cart__item-count">
          <button id="increaseItemCount-${itemIndex}" class="arrow">&#8896;</button>
          <span id="shopping-item-counter-${itemIndex}">1</span>
          <button id="decreaseItemCount-${itemIndex}" class="arrow">&#8897;</button>
        </section>`;
      this.itemsContainer.append(itemHTML);
      const itemCounter = document.querySelector(
        `#shopping-item-counter-${itemIndex}`
      );
      const buttonIncreaseItemCount = document.querySelector(
        `#increaseItemCount-${itemIndex}`
      );
      buttonIncreaseItemCount.addEventListener("click", () => {
        shoppingCart.increaseItemCount(item, itemIndex, itemCounter);
      });
      const buttonDecreaseItemCount = document.querySelector(
        `#decreaseItemCount-${itemIndex}`
      );
      buttonDecreaseItemCount.addEventListener("click", () => {
        shoppingCart.decreaseItemCount(item, itemCounter, itemHTML, itemIndex);
      });
      const buttonRemoveItem = document.querySelector(
        `#remove-item-button-${itemIndex}`
      );
      buttonRemoveItem.addEventListener("click", () =>
        shoppingCart.removeItem(item, itemIndex, itemHTML)
      );
    }
    shoppingCart.getTotalPrice(items);
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
    this.items = LocalStorageHandler.getItems() || [];
  }

  addItem(item) {
    const existingItemIndex = this.items.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    this.items.push(item);
    const itemIndex = this.items.length - 1;
    LocalStorageHandler.setItem(itemIndex, item);
    if (existingItemIndex !== -1) {
      const shoppingItemCounter = document.querySelector(
        `#shopping-item-counter-${existingItemIndex}`
      );
      let count = parseInt(shoppingItemCounter.textContent);
      count++;
      shoppingItemCounter.textContent = count;
    } else {
      renderer.renderItems(this.items);
    }
    this.getTotalPrice(this.items);
  }

  increaseItemCount(item, itemIndex, itemCounter) {
    let count = parseInt(itemCounter.innerText);
    count++;
    itemCounter.innerText = count;
    this.items.push(item);
    LocalStorageHandler.setItem(item, itemIndex);
    this.getTotalPrice(this.items);
  }

  decreaseItemCount(item, itemCounter, itemHTML, itemIndex) {
    let count = parseInt(itemCounter.innerText);
    if (count >= 2) {
      count--;
      itemCounter.innerText = count;
      this.items.splice(itemIndex, 1);
      LocalStorageHandler.removeItem(itemIndex);
    } else if (count === 1) {
      this.removeItem(item, itemIndex, itemHTML);
    }
    this.getTotalPrice(this.items);
  }

  removeItem(item, itemIndex, itemHTML) {
    const itemIdToRemove = item.id;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].id === itemIdToRemove) {
        this.items.splice(i, 1);
        LocalStorageHandler.removeItem(itemIndex);
      }
    }
    itemHTML.remove();
    this.getTotalPrice(this.items);
  }

  getTotalPrice(items) {
    const shoppingCartTotalPrice = document.querySelector(
      "#shoppingCartTotalPrice"
    );
    if (items.length === 0) {
      shoppingCartTotalPrice.innerText = "0.00";
    } else {
      let totalPrice = 0;
      items.forEach((item) => {
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
      productData.company,
      productData.name,
      productData.price,
      productData.image
    );
  }
}

class FilterProductName {
  constructor(inputElement) {
    this.inputElement = document.querySelector(inputElement);
    this.debouncedGetProductByName = this.debounce(this.getProductByName, 300);
    this.inputElement.addEventListener("input", this.debouncedGetProductByName);
  }

  debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  }

  getProductByName() {
    const userInput = inputElement.value.toLowerCase();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        const productName = product.name.toLowerCase();
        return productName.includes(userInput);
      });
      renderer.renderProducts(filteredProducts);
    });
  }
}

class FilterProductCompany {
  constructor(
    buttonAllCompanies,
    buttonCompanyIkea,
    buttonCompanyMarcos,
    buttonCompanyCaressa,
    buttonCompanyLiddy
  ) {
    this.buttonAllCompanies = buttonAllCompanies;
    this.buttonAllCompanies = document.querySelector("#buttonAllCompanies");
    this.buttonAllCompanies.addEventListener(
      "click",
      this.getAllCompaniesProducts
    );

    this.buttonCompanyIkea = buttonCompanyIkea;
    this.buttonCompanyIkea = document.querySelector("#buttonCompanyIkea");
    this.buttonCompanyIkea.addEventListener(
      "click",
      this.getIkeaCompanyProducts
    );

    this.buttonCompanyMarcos = buttonCompanyMarcos;
    this.buttonCompanyMarcos = document.querySelector("#buttonCompanyMarcos");
    this.buttonCompanyMarcos.addEventListener(
      "click",
      this.getMarcosCompanyProducts
    );

    this.buttonCompanyCaressa = buttonCompanyCaressa;
    this.buttonCompanyCaressa = document.querySelector("#buttonCompanyCaressa");
    this.buttonCompanyCaressa.addEventListener(
      "click",
      this.getCaressaCompanyProducts
    );

    this.buttonCompanyLiddy = buttonCompanyLiddy;
    this.buttonCompanyLiddy = document.querySelector("#buttonCompanyLiddy");
    this.buttonCompanyLiddy.addEventListener(
      "click",
      this.getLiddyCompanyProducts
    );
  }

  getAllCompaniesProducts() {
    DataFetcher.fetchData().then((data) => {
      renderer.renderProducts(data.products);
    });
  }

  getIkeaCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Ikea");
      });
      renderer.renderProducts(filteredProducts);
    });
  }

  getMarcosCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Marcos");
      });
      renderer.renderProducts(filteredProducts);
    });
  }

  getCaressaCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Caressa");
      });
      renderer.renderProducts(filteredProducts);
    });
  }

  getLiddyCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Liddy");
      });
      renderer.renderProducts(filteredProducts);
    });
  }
}

class FilterProductPrice {
  constructor(rangeInput, rangePrice) {
    this.rangeInput = rangeInput;
    this.rangePrice = rangePrice;
    rangeInput = document.querySelector("#rangeInput");
    rangePrice = document.querySelector("#rangePrice");
    rangeInput.addEventListener("input", this.getProductsByPrice);
  }

  getProductsByPrice() {
    const priceInput = rangeInput.value;
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.price < priceInput;
      });
      renderer.renderProducts(filteredProducts);
    });
  }
}

class LocalStorageHandler {
  static getItems() {
    const localStorageItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const itemKey = localStorage.key(i);
      const itemValue = localStorage.getItem(itemKey);
      localStorageItems.push(JSON.parse(itemValue));
    }
    return localStorageItems;
  }

  static setItem(itemIndex, item) {
    localStorage.setItem(itemIndex, JSON.stringify(item));
  }

  static removeItem(itemIndex) {
    localStorage.removeItem(itemIndex);
  }
}

const renderer = new Renderer("productsContainer", "itemsContainer");
DataFetcher.fetchData().then((data) => {
  data.products.map((productData) => {
    Product.createProduct(productData);
  });
  renderer.renderProducts(data.products);
});
const shoppingCart = new ShoppingCart();
renderer.renderItems(LocalStorageHandler.getItems());
const filterProductName = new FilterProductName("#inputElement");
const filterProductCompany = new FilterProductCompany(
  "#buttonAllCompanies",
  "#buttonCompanyIkea",
  "#buttonCompanyMarcos",
  "#buttonCompanyCaressa",
  "#buttonCompanyLiddy"
);
const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");
