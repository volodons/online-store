import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";
import { DataFetcher } from "./data.js";
import { Product } from "./products.js";

DataFetcher.fetchData().then((data) => {
  data.products.map((productData) => {
    Product.createProduct(productData);
  });
  Renderer.renderProducts(data.products);
});
Renderer.renderItems(LocalStorageHandler.getItems() || []);
