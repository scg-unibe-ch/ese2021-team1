import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {CartService} from "../services/cart.service";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

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
  userId: number = 0
  firstName: string = ""
  lastName: string = ""
  homeAddress: string = ""
  city: string= ""
  zipCode: number = 0
  streetNumber: number = 0

  products : Product[] = []
  productIDs: String = ""

  payment: string = ""



  constructor(
    private userService: UserService,
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userId = this.user.userId
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

  createOrder() {
    let date: String = new Date().toDateString()
    for(let product of this.products) {
      this.productIDs += String(product.id)
    }
    let payload = {
      userID: parseInt(String(this.userId)),
      products: this.productIDs,
      paymentMethod: this.payment,
      homeAddress: this.homeAddress,
      streetNumber: this.streetNumber,
      zipCode: this.zipCode,
      city: this.city,
      processingStatus: "pending",
      purchaseDate: date
    }
    this.showThanks = true;
    this.showFinish = false;
    this.httpClient.post(environment.endpointURL + "orders", payload)
      .subscribe((res: any) => {
        console.log(res)
      })
  }
}
