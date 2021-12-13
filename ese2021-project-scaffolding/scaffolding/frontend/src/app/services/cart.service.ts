import { Injectable } from '@angular/core';
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  products: Product[] = [];
  showCart: boolean = false;

  addToCart(product: Product) {
    this.products.push(product)
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(this.products))
  }

  removeItem(product: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i] === product) {
        this.products.splice(i, 1);
      }
    }
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(this.products))
    return this.products
  }

  retrieveCart(cart: Product[]) {
    console.log(cart)
    this.products = cart
  }

  getProducts() {
    return this.products;
  }

  clearCart() {
    localStorage.removeItem("cart")
    return this.products = [];
  }

  setShowCart() {
    this.showCart = !this.showCart;
  }

  getShowCart() {
    return this.showCart
  }
}
