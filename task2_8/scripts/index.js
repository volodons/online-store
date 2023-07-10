import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";
import { DataFetcher } from "./data.js";
import { shoppingCart } from "./cart.js";
import { Product } from "./products/Product.js";
import { urlParamsHandler } from "./utils/UrlParamsHandler.js";

function initializeApp() {
  try {
    DataFetcher.fetchData().then((data) => {
      data.products.map((product) => {
        Product.createProduct(product);
      });
      Renderer.renderProducts(data.products);
    });
    Renderer.renderItems(LocalStorageHandler.getLocalStorageItem("cart"));
    shoppingCart.countTotalPrice(
      LocalStorageHandler.getLocalStorageItem("cart")
    );
    Renderer.renderTotalItemCount(
      LocalStorageHandler.getLocalStorageItem("cart")
    );
    Renderer.setInitialFilterState(urlParamsHandler);
  } catch (error) {
    console.error("Error when initializing app: ", error);
  }
}

initializeApp();
