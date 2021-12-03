import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  products: Product[] = [];

  addToCart(product: Product) {
    this.products.push(product)
  }

  getProducts() {
    return this.products;
  }

  clearCart() {
    this.products = [];
  }
}
