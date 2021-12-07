import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product.model";
import {CartService} from "../services/cart.service";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
/**
  * @param products
 */

  products = this.cartService.getProducts();

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  calculateTotal() {
    let subtotal = 0.0;
    for(let product of this.products) {
      subtotal += parseFloat(String(product.price))
    }
    return subtotal;
  }

  clearCart() {
    this.products = this.cartService.clearCart()
  }

  removeProductFromCart(product: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i] === product) {
        this.products.splice(i, 1);
      }
    }
  }

}
