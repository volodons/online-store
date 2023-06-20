import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";
import { DataFetcher } from "./data.js";
import { Product } from "./products/Product.js";
import { filterProductName } from "./products/FilterProductName.js";
import { filterProductCompany } from "./products/FilterProductCompany.js";
import { filterProductPrice } from "./products/FilterProductPrice.js";
import { urlParamsHandler } from "./utils/UrlParamsHandler.js";

DataFetcher.fetchData().then((data) => {
  data.products.map((product) => {
    Product.createProduct(product);
  });
  Renderer.renderProducts(data.products);
});
Renderer.renderItems(LocalStorageHandler.getItems("cart") || []);
Renderer.setInitialFilterState(urlParamsHandler);
