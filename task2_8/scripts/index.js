import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";
import { DataFetcher } from "./data.js";
import { Product } from "./products/Product.js";
import { state } from "./state.js";
import { filterProductName } from "./products/FilterProductName.js";
import { filterProductCompany } from "./products/FilterProductCompany.js";
import { filterProductPrice } from "./products/FilterProductPrice.js";

DataFetcher.fetchData().then((data) => {
  data.products.map((product) => {
    state.setInitialState(product);
    Product.createProduct(product);
  });
  Renderer.renderProducts(data.products);
});
Renderer.renderItems(LocalStorageHandler.getItems("cart") || []);
