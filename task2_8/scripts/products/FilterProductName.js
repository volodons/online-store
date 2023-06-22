import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { debounce } from "../utils/debounce.js";
import { urlParamsHandler } from "../utils/UrlParamsHandler.js";

class FilterProductName {
  constructor(inputElement, submitElement) {
    this.inputElement = document.querySelector(inputElement);
    this.submitElement = document.querySelector(submitElement);
    this.debouncedGetProductByName = debounce(
      this.getProductByName.bind(this),
      300
    );
    this.inputElement.addEventListener("input", this.debouncedGetProductByName);
    this.submitElement.addEventListener("submit", (event) =>
      this.onSubmit(event)
    );
  }

  onSubmit(event) {
    event.preventDefault();
  }

  getProductByName() {
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
