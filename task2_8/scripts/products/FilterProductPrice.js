import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { debounce } from "../utils/debounce.js";
import { urlParamsHandler } from "../utils/UrlParamsHandler.js";

class FilterProductPrice {
  constructor(rangeInput, rangePrice) {
    this.rangeInput = document.querySelector(rangeInput);
    this.rangePrice = document.querySelector(rangePrice);
    this.debouncedGetProductsByPrice = debounce(
      this.getProductsByPrice.bind(this),
      300
    );
    this.rangeInput.addEventListener("input", this.debouncedGetProductsByPrice);
  }

  getProductsByPrice() {
    urlParamsHandler.selectedPrice = this.rangeInput.value;
    urlParamsHandler.updateUrlParams();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.price <= parseInt(urlParamsHandler.selectedPrice);
      });
      Renderer.renderProducts(filteredProducts);
    });
  }
}

const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");

export { filterProductPrice };
