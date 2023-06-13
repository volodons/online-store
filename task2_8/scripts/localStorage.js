class LocalStorageHandler {
  static getItems() {
    const localStorageKey = localStorage.key("cart");
    const localStorageValueJSON = localStorage.getItem(localStorageKey);
    const localStorageValue = JSON.parse(localStorageValueJSON);
    return localStorageValue;
  }

  static setItems(localStorageKey, localStorageValue) {
    localStorage.setItem(
      JSON.stringify(localStorageKey),
      JSON.stringify(localStorageValue)
    );
  }

  static removeItems(localStorageKey) {
    localStorage.removeItem(localStorageKey);
  }
}

export { LocalStorageHandler };
