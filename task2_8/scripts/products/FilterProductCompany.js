import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { state } from "../state.js";

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
    this.buttonCompanyIkea.addEventListener("click", () =>
      this.getCompanyProducts("Ikea")
    );

    this.buttonCompanyMarcos = buttonCompanyMarcos;
    this.buttonCompanyMarcos = document.querySelector("#buttonCompanyMarcos");
    this.buttonCompanyMarcos.addEventListener("click", () =>
      this.getCompanyProducts("Marcos")
    );

    this.buttonCompanyCaressa = buttonCompanyCaressa;
    this.buttonCompanyCaressa = document.querySelector("#buttonCompanyCaressa");
    this.buttonCompanyCaressa.addEventListener("click", () =>
      this.getCompanyProducts("Caressa")
    );

    this.buttonCompanyLiddy = buttonCompanyLiddy;
    this.buttonCompanyLiddy = document.querySelector("#buttonCompanyLiddy");
    this.buttonCompanyLiddy.addEventListener("click", () =>
      this.getCompanyProducts("Liddy")
    );

    this.selectedCompany = null;
  }

  getAllCompaniesProducts() {
    this.selectedCompany = null;
    DataFetcher.fetchData().then((data) => {
      Renderer.renderProducts(data.products);
    });
  }

  getCompanyProducts(company) {
    this.selectedCompany = company;
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes(company);
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

export { filterProductCompany };
