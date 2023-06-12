import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";

class ShoppingCart {
  constructor() {
    this.items = LocalStorageHandler.getItems() || [];
  }

  addItem(item) {
    const existingItemIndex = this.items.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    this.items.push(item);
    const itemIndex = this.items.length - 1;
    LocalStorageHandler.setItem(itemIndex, item);
    if (existingItemIndex !== -1) {
      const shoppingItemCounter = document.querySelector(
        `#shopping-item-counter-${existingItemIndex}`
      );
      let count = parseInt(shoppingItemCounter.textContent);
      count++;
      shoppingItemCounter.textContent = count;
    } else {
      Renderer.renderItems(this.items);
    }
    this.countTotalPrice(this.items);
  }

  increaseItemCount(item, itemIndex, itemCounter) {
    let count = parseInt(itemCounter.innerText);
    count++;
    itemCounter.innerText = count;
    this.items.push(item);
    LocalStorageHandler.setItem(item, itemIndex);
    this.countTotalPrice(this.items);
  }

  decreaseItemCount(item, itemCounter, itemHTML, itemIndex) {
    let count = parseInt(itemCounter.innerText);
    if (count >= 2) {
      count--;
      itemCounter.innerText = count;
      this.items.splice(itemIndex, 1);
      LocalStorageHandler.removeItem(itemIndex);
    } else if (count === 1) {
      this.removeItem(item, itemIndex, itemHTML);
    }
    this.countTotalPrice(this.items);
  }

  removeItem(item, itemIndex, itemHTML) {
    const itemIdToRemove = item.id;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].id === itemIdToRemove) {
        this.items.splice(i, 1);
        LocalStorageHandler.removeItem(itemIndex);
      }
    }
    itemHTML.remove();
    this.countTotalPrice(this.items);
  }

  countTotalPrice(items) {
    let totalPrice = "0.00";
    if (items.length === 0) {
      Renderer.renderTotalPrice(totalPrice);
    } else {
      totalPrice = parseInt(totalPrice);
      items.forEach((item) => {
        totalPrice += item.price;
      });
      totalPrice = totalPrice.toFixed(2);
      Renderer.renderTotalPrice(totalPrice);
    }
  }

  clearCart() {
    this.items = [];
    LocalStorageHandler.removeAllItems();
    Renderer.renderItems(this.items);
  }
}

const shoppingCart = new ShoppingCart();

export { shoppingCart };
