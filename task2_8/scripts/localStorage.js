class LocalStorageHandler {
  static getItems(key) {
    if (key) {
      const valueJSON = localStorage.getItem(key);
      const value = JSON.parse(valueJSON);
      return value;
    }
    throw new Error("Missing key parameter");
  }

  static setItems(key, value) {
    if (key && value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to set item in localStorage: ", error);
      }
    }
  }

  static removeItems(key) {
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Failed to remove item from localStorage: ", error);
      }
    }
  }
}

export { LocalStorageHandler };
