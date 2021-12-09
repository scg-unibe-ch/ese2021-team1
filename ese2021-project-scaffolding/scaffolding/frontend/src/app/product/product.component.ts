import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {Product} from "../models/product.model";
import {CartService} from "../services/cart.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
/**
  * @param auth
  * @param user
  * @param addProductEmit
  */

export class ProductComponent implements OnInit {

  auth: boolean = false
  user: string = ""
  editable: boolean = false;

  @Input() product: any = {}

  @Output()
  addProductEmit = new EventEmitter<any>();

  @Output()
  deleteProductEmit = new EventEmitter<any>();



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


  isAvailable() {
    if(this.product.available != null) {
      return this.product.available;
    }
  }

  canChange() {
    if(!this.userService.getLoggedIn())
      return false
    else if (localStorage.getItem("admin") == "true")
      return true
    else
      return false
  }

  deleteProduct() {
    this.deleteProductEmit.emit(this.product.id)
    this.httpClient.delete(environment.endpointURL + "product/" + this.product.id)
      .subscribe(res => {
        console.log('DELETE REQUEST', res)
      })
  }

  updateProduct() {
    this.httpClient.put(environment.endpointURL + "product/" + this.product.id, {
      title: this.product.title,
      image: this.product.image,
      description: this.product.description,
      category: this.product.category,
      available: this.product.available,
      price: this.product.price,
      discount: this.product.discount
    }).subscribe(res=> {
      console.log(res)
    })
  }
}
