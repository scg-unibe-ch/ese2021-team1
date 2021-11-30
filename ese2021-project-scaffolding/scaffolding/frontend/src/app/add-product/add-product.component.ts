import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Output()
  addProductEmit = new EventEmitter<any>();

  newProduct: any = {
    title: "",
    image: "",
    description: "",
    category: "",
    available: true,
    price: 0,
    discount: 1
  }

  constructor(
    public httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  createProduct() {
    const user = localStorage.getItem("userName")
    console.log(this.newProduct)
    if(!user) {
      alert("Only signed in users can create products. This form should not be visible.")
      return
    }
      this.httpClient.post(environment.endpointURL + "product", this.newProduct)
        .subscribe((res: any) => {
          console.log(res)
          this.addProductEmit.emit(res)
      })
    this.newProduct = {
      title: "",
      image: "",
      description: "",
      category: "",
      available: true,
      price: 0,
      discount: 1
    }
  }
}
