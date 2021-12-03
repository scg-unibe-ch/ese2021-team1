import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {Product} from "../models/product.model";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  auth: boolean = false
  user: string = ""

  @Input() product: any = {}

  @Output()
  addProductEmit = new EventEmitter<any>();


  constructor(

    public httpClient: HttpClient,
    public userService: UserService,
    public cartService: CartService
  ) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.auth = res);
    userService.user$.subscribe(res => this.user = res.username);
  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    console.log(product)
    this.cartService.addToCart(product);
  }

}
