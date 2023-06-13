class Product {
  static createProduct(productData) {
    return new Product(
      productData.id,
      productData.company,
      productData.name,
      productData.price,
      productData.image
    );
  }
}

export { Product };
