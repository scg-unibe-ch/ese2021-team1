import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {CartService} from "../services/cart.service";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  showPayment: boolean = false;
  showAddress: boolean = false;
  showProducts: boolean = true;
  showFinish: boolean = false;
  showThanks: boolean = false;

  user: any
  firstName: string = ""
  lastName: string = ""
  homeAddress: string = ""
  city: string= ""
  zipCode: number = 0
  streetNumber: number = 0

  products : Product[] = []

  payment: string = ""



  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.firstName = this.user.firstName
    this.lastName = this.user.lastName
    this.homeAddress = this.user.homeAddress
    this.city = this.user.city
    this.zipCode = this.user.zipCode
    this.streetNumber = this.user.streetNumber
    this.products = this.cartService.getProducts()
  }


  nextStep() {
    console.log(this.firstName)
    console.log(this.payment)
    if(this.showProducts) {
      this.showProducts = false;
      this.showAddress = true;
    } else if(this.showAddress) {
      this.showAddress = false;
      this.showPayment = true;
    } else if(this.showPayment) {
      this.showPayment = false;
      this.showFinish = true;
    }
  }

  previousStep() {
    if(this.showAddress) {
      this.showAddress = false;
      this.showProducts = true;
    } else if(this.showPayment) {
      this.showAddress = true;
      this.showPayment = false;
    } else if(this.showFinish) {
      this.showFinish = false;
      this.showPayment = true;
    }
  }
  calculateTotal() {
    let subtotal = 0.0;
    for(let product of this.products) {
      subtotal += parseFloat(String(product.price))
    }
    return subtotal;
  }

  confirmPurchase() {
    this.showThanks = true;
    this.showFinish = false;
  }
}
