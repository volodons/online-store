import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { urlParamsHandler } from "../utils/UrlParamsHandler.js";

class FilterProductName {
  constructor(inputElement, submitElement) {
    this.inputElement = document.querySelector(inputElement);
    this.submitElement = document.querySelector(submitElement);
    this.submitElement.addEventListener("submit", (event) =>
      this.onSubmit(event)
    );
  }

  onSubmit(event) {
    event.preventDefault();
  }

  getProductByName(event) {
    event.preventDefault();
    urlParamsHandler.selectedName = this.inputElement.value.toLowerCase();
    urlParamsHandler.updateUrlParams();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(urlParamsHandler.selectedName);
      });
      Renderer.renderProducts(filteredProducts);
    });
  }
}

const filterProductName = new FilterProductName(
  "#inputElement",
  "#submitElement"
);

export { filterProductName };
