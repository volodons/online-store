class LocalStorageHandler {
  static getItems(key) {
    if (key) {
      const localStorageKey = localStorage.key(key.toString());
      const localStorageValueJSON = localStorage.getItem(localStorageKey);
      const localStorageValue = JSON.parse(localStorageValueJSON);
      return localStorageValue;
    }
    throw new Error("Missing key parameter");
  }

  static setItems(localStorageKey, localStorageValue) {
    if (localStorageKey && localStorageValue) {
      try {
        localStorage.setItem(
          localStorageKey.toString(),
          JSON.stringify(localStorageValue)
        );
      } catch (error) {
        console.error("Failed to set item in localStorage: ", error);
      }
    }
  }

  static removeItems(localStorageKey) {
    if (localStorageKey) {
      const localStorageKeyValue = localStorage.key(localStorageKey.toString());
      if (localStorageKeyValue) {
        try {
          localStorage.removeItem(localStorageKeyValue);
        } catch (error) {
          console.error("Failed to remove item from localStorage: ", error);
        }
      }
    }
  }
}

export { LocalStorageHandler };
