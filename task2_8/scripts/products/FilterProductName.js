import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { state } from "../state.js";

class FilterProductName {
  constructor(inputElement, submitElement) {
    this.inputElement = document.querySelector(inputElement);
    this.submitElement = document.querySelector(submitElement);
    this.submitElement.addEventListener("submit", (event) =>
      this.onSubmit(event)
    );
    this.selectedName = null;
    this.queryParams = new URLSearchParams(window.location.search);
    const nameFilter = this.queryParams.get("name");
    if (nameFilter) {
      this.selectedName = nameFilter;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.getProductByName(event);
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
    this.selectedName = this.inputElement.value.toLowerCase();
    this.updateUrlParams();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.name.toLowerCase().includes(this.selectedName);
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
