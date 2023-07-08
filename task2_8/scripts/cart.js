import { LocalStorageHandler } from "./localStorage.js";
import { Renderer } from "./ui.js";

class ShoppingCart {
  constructor() {
    this.items = LocalStorageHandler.getItems("cart") || {};
  }

  addItem(item) {
    if (this.items.hasOwnProperty(item.id.toString())) {
      let count = this.items[item.id].count;
      count++;
      this.items[item.id].count = count;
    } else {
      this.items[item.id] = {
        product: item,
        count: 1,
      };
    }

    LocalStorageHandler.setItems("cart", this.items);
    Renderer.renderItems(this.items);

    // const existingItemIndex = this.items.findIndex(
    //   (existingItem) => existingItem.id === item.id
    // );
    // this.items.push(item);
    // const itemIndex = this.items.length - 1;
    // LocalStorageHandler.setItems("cart", this.items);
    // if (existingItemIndex !== -1) {
    //   const shoppingItemCounter = document.querySelector(
    //     `#shopping-item-counter-${existingItemIndex}`
    //   );
    //   let count = parseInt(shoppingItemCounter.innerText);
    //   count++;
    //   shoppingItemCounter.innerText = count;
    // } else {
    //   Renderer.renderItems(this.items);
    // }
    // this.countTotalPrice();
    // Renderer.renderTotalItemCount(this.items);
  }

  increaseItemCount(item, itemIndex, itemCounter) {
    // let count = this.items[itemIndex].count;
    // count++;
    // this.items[itemIndex].count = count;
    this.items[itemIndex].count++;
    LocalStorageHandler.setItems("cart", this.items);
    Renderer.renderItems(this.items);

    // let count = parseInt(itemCounter.innerText);
    // count++;
    // itemCounter.innerText = count;
    // this.items.push(item);
    // LocalStorageHandler.setItems("cart", this.items);
    // this.countTotalPrice();
    // Renderer.renderTotalItemCount(this.items);
  }

  decreaseItemCount(item, itemCounter, itemHTML, itemIndex) {
    if (this.items[itemIndex].count >= 2) {
      this.items[itemIndex].count--;
      LocalStorageHandler.setItems("cart", this.items);
    } else if (this.items[itemIndex].count === 1) {
      this.removeItem(item, itemIndex, itemHTML);
    }
    Renderer.renderItems(this.items);

    // let count = parseInt(itemCounter.innerText);
    // if (count >= 2) {
    //   count--;
    //   itemCounter.innerText = count;
    //   this.items.splice(itemIndex, 1);
    //   LocalStorageHandler.setItems("cart", this.items);
    // } else if (count === 1) {
    //   this.removeItem(item, itemIndex, itemHTML);
    // }
    // this.countTotalPrice();
    // Renderer.renderTotalItemCount(this.items);
  }

  removeItem(item, itemIndex, itemHTML) {
    delete this.items[itemIndex];
    LocalStorageHandler.setItems("cart", this.items);
    Renderer.renderItems(this.items);

    // const itemIdToRemove = item.id;
    // for (let i = this.items.length - 1; i >= 0; i--) {
    //   if (this.items[i].id === itemIdToRemove) {
    //     this.items.splice(i, 1);
    //   }
    // }
    // LocalStorageHandler.setItems("cart", this.items);
    // itemHTML.remove();
    // this.countTotalPrice();
    // Renderer.renderTotalItemCount(this.items);
  }

  countTotalPrice() {
    let totalPrice = "0.00";
    if (Object.keys(this.items).length === 0) {
      Renderer.renderTotalPrice(totalPrice);
    } else {
      // totalPrice = parseInt(totalPrice);
      // Object.values(this.items).forEach((item) => {
      //   totalPrice += item.price;
      // });
      // totalPrice = totalPrice.toFixed(2);
      // Renderer.renderTotalPrice(totalPrice.toString());
      totalPrice = parseInt(totalPrice);
      let itemTotalPrice = 0;
      for (const item of Object.values(this.items)) {
        itemTotalPrice = item.product.price * item.count;
        totalPrice += itemTotalPrice;
      }
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
