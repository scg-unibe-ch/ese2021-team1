import { Component, OnInit } from '@angular/core';
import { Product } from "../models/product.model";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post.model";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
/** Functions for Posts
* @param products
* @param showNewProductForm
* @param createProductButtonText
*/
export class StoreComponent implements OnInit {

  products: Product[] = []
  showNewProductForm: boolean = false;
  createProductButtonText: String = 'CREATE PRODUCT'
  toFilterCategories: String[] = [];
  filteredProducts: Product[] = []
  feedback: string = "";
  priceRange: string = "";

  constructor(
    public httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.httpClient.get(environment.endpointURL + "product")
      .subscribe(res => {
        if (typeof res === "object" && res != null) {
          Object.values(res).forEach(product => {
            this.products.push(product)
            this.filteredProducts.push(product)
          })
        }
        this.products.reverse();
        this.filteredProducts.reverse();//so newest post is at the top
      })
  }

  addProductParent(product: any) {
    this.products.unshift(product)
    this.filteredProducts.unshift(product)
  }

  getThisProduct(product: any) {
    this.httpClient.get(environment.endpointURL + "product", product)
  }

  canAddProduct() {
    return localStorage.getItem("admin") == "true"
  }

  togglePostForm() {
    this.showNewProductForm = !this.showNewProductForm
  }

  deleteProductParent(productId: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == productId) {
        this.products.splice(i, 1)
        this.filteredProducts.splice(i, 1)
      }
    }
  }
  filterProducts() {
    let filteredProducts: Product[] = []
    if (this.toFilterCategories.length > 0) {
      for (let product of this.products) {
        if (this.toFilterCategories.indexOf(product.category) > -1) {
          filteredProducts.push(product)
        }
      }
      this.filteredProducts = filteredProducts
    } else {
      this.filteredProducts = this.products
    }

    filteredProducts = []
    for (let product of this.filteredProducts) {
      filteredProducts.push(product)
    }
    for (let product of this.filteredProducts) {
      if (this.priceRange == "0-30") {
        if (product.price > 30) {
          filteredProducts.splice(filteredProducts.indexOf(product), 1);
        }
      } else if (this.priceRange == "31-100") {
        if (product.price < 31 || product.price > 100) {
          filteredProducts.splice(filteredProducts.indexOf(product), 1);
        }
      } else if (this.priceRange == "101-300") {
        if (product.price < 101 || product.price > 300) {
          filteredProducts.splice(filteredProducts.indexOf(product), 1);
        }
      } else if (this.priceRange == "301-1000") {
        if (product.price < 301 || product.price > 1000) {
          filteredProducts.splice(filteredProducts.indexOf(product), 1);
        }
      } else if (this.priceRange == "1000+") {
        if (product.price < 1000) {
          filteredProducts.splice(filteredProducts.indexOf(product), 1);
        }
      }
    } this.filteredProducts = filteredProducts;
    if (this.filteredProducts.length == 0) {
      this.feedback = "Your filter didn't find any products."
    } else {
      this.feedback = "";
    }
  }

  resetFilter() {
    // window.location.reload(); // this is wrong as this reloads the page
    this.priceRange = ""
    this.toFilterCategories = []
    this.filteredProducts = this.products
    this.feedback = ""
  }
}
