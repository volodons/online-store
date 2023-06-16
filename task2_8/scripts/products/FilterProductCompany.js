import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { urlParamsHandler } from "../utils/UrlParamsHandler.js";

class FilterProductCompany {
  constructor(
    buttonCompanyAll,
    buttonCompanyIkea,
    buttonCompanyMarcos,
    buttonCompanyCaressa,
    buttonCompanyLiddy
  ) {
    this.buttonCompanyAll = buttonCompanyAll;
    this.buttonCompanyAll = document.querySelector("#buttonCompanyAll");
    this.buttonCompanyAll.addEventListener("click", () =>
      this.getCompanyProducts("All")
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
  }

  getCompanyProducts(company) {
    if (company === "All") {
      urlParamsHandler.selectedCompany = null;
      urlParamsHandler.updateUrlParams();
      Renderer.highlightSelectedFilter(company);
      DataFetcher.fetchData().then((data) => {
        Renderer.renderProducts(data.products);
      });
    } else {
      urlParamsHandler.selectedCompany = company;
      urlParamsHandler.updateUrlParams();
      Renderer.highlightSelectedFilter(company);
      DataFetcher.fetchData().then((data) => {
        const filteredProducts = data.products.filter((product) => {
          return product.company.includes(urlParamsHandler.selectedCompany);
        });
        Renderer.renderProducts(filteredProducts);
      });
    }
  }
}

const filterProductCompany = new FilterProductCompany(
  "#buttonCompanyAll",
  "#buttonCompanyIkea",
  "#buttonCompanyMarcos",
  "#buttonCompanyCaressa",
  "#buttonCompanyLiddy"
);

export { filterProductCompany };
