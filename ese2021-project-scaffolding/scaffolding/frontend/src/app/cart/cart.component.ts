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
    const cart = localStorage.getItem("cart") 
    if (cart) {
      this.cartService.retrieveCart(JSON.parse(cart))
      this.products = this.cartService.getProducts()
    }
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
 // we have to update the card service when a cart item is removed
 // we have to check if localstorage contains cart items on init thrrough the service
 // remove from localstorage on logout
 // remove from localstorage on order
  removeProductFromCart(product: Product) {
    this.products = this.cartService.removeItem(product)
  }

}
