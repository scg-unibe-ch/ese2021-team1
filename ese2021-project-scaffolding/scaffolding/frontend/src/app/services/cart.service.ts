import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  products: Product[] = [];
  showCart: boolean = false;

  addToCart(product: Product) {
    this.products.push(product)
  }

  getProducts() {
    return this.products;
  }

  clearCart() {
    return this.products = [];
  }

  setShowCart() {
    this.showCart = !this.showCart;
  }

  getShowCart() {
    return this.showCart
  }
}
