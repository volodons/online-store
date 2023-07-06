import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";

class ShoppingCart {
  constructor() {
    this.items = LocalStorageHandler.getItems("cart") || [];
  }

  addItem(item) {
    const existingItemIndex = this.items.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    this.items.push(item);
    const itemIndex = this.items.length - 1;
    LocalStorageHandler.setItems("cart", this.items);
    if (existingItemIndex !== -1) {
      const shoppingItemCounter = document.querySelector(
        `#shopping-item-counter-${existingItemIndex}`
      );
      let count = parseInt(shoppingItemCounter.innerText);
      count++;
      shoppingItemCounter.innerText = count;
    } else {
      Renderer.renderItems(this.items);
    }
    this.countTotalPrice();
    Renderer.renderTotalItemCount(this.items);
  }

  increaseItemCount(item, itemIndex, itemCounter) {
    let count = parseInt(itemCounter.innerText);
    count++;
    itemCounter.innerText = count;
    this.items.push(item);
    LocalStorageHandler.setItems("cart", this.items);
    this.countTotalPrice();
    Renderer.renderTotalItemCount(this.items);
  }

  decreaseItemCount(item, itemCounter, itemHTML, itemIndex) {
    let count = parseInt(itemCounter.innerText);
    if (count >= 2) {
      count--;
      itemCounter.innerText = count;
      this.items.splice(itemIndex, 1);
      LocalStorageHandler.setItems("cart", this.items);
    } else if (count === 1) {
      this.removeItem(item, itemIndex, itemHTML);
    }
    this.countTotalPrice();
    Renderer.renderTotalItemCount(this.items);
  }

  removeItem(item, itemIndex, itemHTML) {
    const itemIdToRemove = item.id;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].id === itemIdToRemove) {
        this.items.splice(i, 1);
      }
    }
    LocalStorageHandler.setItems("cart", this.items);
    itemHTML.remove();
    this.countTotalPrice();
    Renderer.renderTotalItemCount(this.items);
  }

  countTotalPrice() {
    let totalPrice = "0.00";
    if (this.items.length === 0) {
      Renderer.renderTotalPrice(totalPrice);
    } else {
      totalPrice = parseInt(totalPrice);
      this.items.forEach((item) => {
        totalPrice += item.price;
      });
      totalPrice = totalPrice.toFixed(2);
      Renderer.renderTotalPrice(totalPrice.toString());
    }
  }

  clearCart() {
    this.items = [];
    LocalStorageHandler.removeItems("cart");
    Renderer.renderItems(this.items);
    Renderer.renderTotalItemCount(this.items);
  }
}

export { ShoppingCart };
