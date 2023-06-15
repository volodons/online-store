import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { state } from "../state.js";

class FilterProductName {
  constructor(inputElement, submitElement) {
    this.inputElement = document.querySelector(inputElement);
    this.submitElement = document.querySelector(submitElement);
    this.debouncedGetProductByName = this.debounce(this.getProductByName, 300);
    this.inputElement.addEventListener(
      "input",
      () => this.debouncedGetProductByName
    );
    this.submitElement.addEventListener("submit", (event) =>
      this.onSubmit(event)
    );
    this.selectedName = null;
    const nameFilter = this.queryParams.get("name");
    if (nameFilter) {
      this.selectedName = nameFilter;
      this.inputElement.value = nameFilter;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.debouncedGetProductByName(event);
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

  getProductByName(event) {
    event.preventDefault();
    this.updateUrlParams();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.company.includes(userInput);
      });
      Renderer.renderProducts(filteredProducts);
    });
  }

  updateUrlParams() {
    if (this.selectedName) {
      this.queryParams.set("name", this.selectedName);
    } else {
      this.queryParams.delete("name");
    }
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
  }
}

const filterProductName = new FilterProductName(
  "#inputElement",
  "#submitElement"
);

export { filterProductName };
