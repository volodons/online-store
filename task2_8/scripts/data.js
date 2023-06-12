class DataFetcher {
  static fetchData() {
    return fetch("../data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export { DataFetcher };
