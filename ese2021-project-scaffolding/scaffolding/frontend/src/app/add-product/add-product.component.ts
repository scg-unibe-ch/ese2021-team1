import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from "../models/product.model";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  /**
    * @output addProductEmit
    * @param newPoduct
  */
  @Output()
  addProductEmit = new EventEmitter<any>();

  newProduct: any = {
    title: "",
    image: "",
    description: "",
    category: "",
    available: true,
    price: "",
    discount: 1
  }

  selectedFile: any

  constructor(
    public httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  createProduct() {
    const user = localStorage.getItem("userName")
    console.log(this.newProduct)
    if (!user) {
      alert("Only signed in users can create products. This form should not be visible.")
      return
    }
    const payload = new FormData()
    payload.append("product", JSON.stringify(this.newProduct))
    payload.append("file", this.selectedFile)
    this.httpClient.post(environment.endpointURL + "product", payload)
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
    this.selectedFile = null
  }

  productImageHandler(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.selectedFile = file
    }
  }
}
