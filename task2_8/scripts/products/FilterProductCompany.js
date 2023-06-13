import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";

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

const filterProductCompany = new FilterProductCompany(
  "#buttonAllCompanies",
  "#buttonCompanyIkea",
  "#buttonCompanyMarcos",
  "#buttonCompanyCaressa",
  "#buttonCompanyLiddy"
);
