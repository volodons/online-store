import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { state } from "../state.js";

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

    this.selectedCompany = null;
    this.queryParams = new URLSearchParams(window.location.search);
    const companyFilter = this.queryParams.get("company");
    if (companyFilter) {
      this.selectedCompany = companyFilter;
    }
  }

  getCompanyProducts(company) {
    if (company === "All") {
      this.selectedCompany = null;
      this.updateUrlParams();
      Renderer.highlightSelectedFilter(company);
      DataFetcher.fetchData().then((data) => {
        Renderer.renderProducts(data.products);
      });
    } else {
      this.selectedCompany = company;
      this.updateUrlParams();
      Renderer.highlightSelectedFilter(company);
      DataFetcher.fetchData().then((data) => {
        const filteredProducts = data.products.filter((product) => {
          return product.company.includes(this.selectedCompany);
        });
        Renderer.renderProducts(filteredProducts);
      });
    }
  }

  updateUrlParams() {
    if (this.selectedCompany) {
      this.queryParams.set("company", this.selectedCompany);
    } else {
      this.queryParams.delete("company");
    }
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
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
