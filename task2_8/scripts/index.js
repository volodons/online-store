import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";
import { DataFetcher } from "./data.js";
import { Product } from "./products/Product.js";
import { state } from "./state.js";

import { FilterProductName } from "./products/FilterProductName.js";
import { FilterProductCompany } from "./products/FilterProductCompany.js";
import { FilterProductPrice } from "./products/FilterProductPrice.js";

DataFetcher.fetchData().then((data) => {
  data.products.map((product) => {
    state.setInitialState(product);
    Product.createProduct(product);
  });
  Renderer.renderProducts(data.products);
});
Renderer.renderItems(LocalStorageHandler.getItems("cart") || []);

const filterProductCompany = new FilterProductCompany(
  "#buttonAllCompanies",
  "#buttonCompanyIkea",
  "#buttonCompanyMarcos",
  "#buttonCompanyCaressa",
  "#buttonCompanyLiddy"
);
const filterProductName = new FilterProductName("#inputElement");
const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");
