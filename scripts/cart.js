import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";

class ShoppingCart {
  constructor() {
    this.items = LocalStorageHandler.getLocalStorageItem("cart");
  }

  addItem(item) {
    if (this.items.hasOwnProperty(item.id)) {
      this.items[item.id].count++;
    } else {
      this.items[item.id] = {
        product: item,
        count: 1,
      };
    }
    LocalStorageHandler.setLocalStorageItem("cart", this.items);
    Renderer.renderTotalItemCount(this.items);
    Renderer.renderItems(this.items);
    this.countTotalPrice();
  }

  increaseItemCount(itemIndex) {
    this.items[itemIndex].count++;
    LocalStorageHandler.setLocalStorageItem("cart", this.items);
    Renderer.renderTotalItemCount(this.items);
    Renderer.renderItems(this.items);
    this.countTotalPrice();
  }

  decreaseItemCount(itemIndex) {
    if (this.items[itemIndex].count >= 2) {
      this.items[itemIndex].count--;
      LocalStorageHandler.setLocalStorageItem("cart", this.items);
    } else if (this.items[itemIndex].count === 1) {
      this.removeItem(itemIndex);
    }
    Renderer.renderTotalItemCount(this.items);
    Renderer.renderItems(this.items);
    this.countTotalPrice();
  }

  removeItem(itemIndex) {
    delete this.items[itemIndex];
    LocalStorageHandler.setLocalStorageItem("cart", this.items);
    Renderer.renderTotalItemCount(this.items);
    Renderer.renderItems(this.items);
    this.countTotalPrice();
  }

  countTotalPrice() {
    let totalPrice = 0;
    if (Object.keys(this.items).length > 0) {
      let itemTotalPrice = 0;
      for (const item of Object.values(this.items)) {
        itemTotalPrice = item.product.price * item.count;
        totalPrice += itemTotalPrice;
      }
    }
    Renderer.renderTotalPrice(totalPrice.toFixed(2));
  }

  clearCart() {
    this.items = {};
    LocalStorageHandler.removeLocalStorageItem("cart");
    Renderer.renderItems(this.items);
    Renderer.renderTotalItemCount(this.items);
    this.countTotalPrice();
  }
}

const shoppingCart = new ShoppingCart();

export { shoppingCart };
