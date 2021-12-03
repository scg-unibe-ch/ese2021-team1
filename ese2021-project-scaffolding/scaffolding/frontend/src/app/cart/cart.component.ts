import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product.model";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = this.cartService.getProducts();

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  calculateTotal() {
    let subtotal = 0.0;
    for(let product of this.products) {
      subtotal += product.price
    }
    return subtotal;
  }

}
