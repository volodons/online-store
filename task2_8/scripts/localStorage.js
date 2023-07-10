class LocalStorageHandler {
  static getLocalStorageItem(key) {
    if (key) {
      try {
        const valueJSON = localStorage.getItem(key);
        if (valueJSON !== null) {
          return JSON.parse(valueJSON);
        }
        return {};
      } catch (error) {
        console.error("Failed to get item from localStorage: ", error);
      }
    } else {
      console.error("Missing key parameter");
    }
  }

  static setLocalStorageItem(key, value) {
    if (key && value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to set item in localStorage: ", error);
      }
    } else {
      console.error("Missing key and/or value parameters");
    }
  }

  static removeLocalStorageItem(key) {
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Failed to remove item from localStorage: ", error);
      }
    } else {
      console.error("Missing key parameter");
    }
  }
}

export { LocalStorageHandler };
