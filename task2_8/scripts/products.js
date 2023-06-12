import { Renderer } from "./ui.js";
import { DataFetcher } from "./data.js";

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
      Renderer.renderProducts(filteredProducts);
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
      Renderer.renderProducts(data.products);
    });
  }

  getIkeaCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Ikea");
      });
      Renderer.renderProducts(filteredProducts);
    });
  }

  getMarcosCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Marcos");
      });
      Renderer.renderProducts(filteredProducts);
    });
  }

  getCaressaCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Caressa");
      });
      Renderer.renderProducts(filteredProducts);
    });
  }

  getLiddyCompanyProducts() {
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes("Liddy");
      });
      Renderer.renderProducts(filteredProducts);
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
      Renderer.renderProducts(filteredProducts);
    });
  }
}

const filterProductName = new FilterProductName("#inputElement");
const filterProductCompany = new FilterProductCompany(
  "#buttonAllCompanies",
  "#buttonCompanyIkea",
  "#buttonCompanyMarcos",
  "#buttonCompanyCaressa",
  "#buttonCompanyLiddy"
);
const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");

export { Product };
