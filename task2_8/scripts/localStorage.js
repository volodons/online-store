class LocalStorageHandler {
  static getItems(key) {
    const localStorageKey = localStorage.key(key);
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
    const localStorageKeyValue = localStorage.key(localStorageKey);
    localStorage.removeItem(localStorageKeyValue);
  }
}

export { LocalStorageHandler };
