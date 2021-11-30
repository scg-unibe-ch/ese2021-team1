import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: Product[] = []

  constructor(
    public httpClient: HttpClient
  ) { }

  ngOnInit():void {
    this.getAllProducts();
  }

  getAllProducts(): void {
      this.httpClient.get(environment.endpointURL + "product")
        .subscribe(res => {
          if (typeof res === "object") {
            Object.values(res).forEach(post => {
              this.products.push(post)
            })
          }
          this.products.reverse(); //so newest post is at the top
          console.log(this.products)
        })
    }

    addProductParent(product: any) {
      this.products.unshift(product)
    }
}
