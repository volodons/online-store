class LocalStorageHandler {
  static getItems() {
    const localStorageItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const itemKey = localStorage.key(i);
      const itemValue = localStorage.getItem(itemKey);
      localStorageItems.push(JSON.parse(itemValue));
    }
    return localStorageItems;
  }

  static setItem(itemIndex, item) {
    localStorage.setItem(itemIndex, JSON.stringify(item));
  }

  static removeItem(itemIndex) {
    localStorage.removeItem(itemIndex);
  }

  static removeAllItems() {
    localStorage.clear();
  }
}

export { LocalStorageHandler };
