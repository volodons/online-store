class Product {
  static createProduct(product) {
    return new Product(
      product.id,
      product.company,
      product.name,
      product.price,
      product.image
    );
  }
}

export { Product };
