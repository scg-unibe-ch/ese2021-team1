import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {ReviewModel} from "../models/review.model";

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {

  title: string = "";
  image: string | null = "";
  text: string | null = "";
  stars: number = 0;
  pros: string | null = "";
  cons: string | null = "";

  id: string | null = "";
  product: any;

  reviews: ReviewModel[] = [];


  constructor(
    public httpClient: HttpClient,
    public userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct()
    this.getReviews()
  }

  getProduct() {
    this.httpClient.get(environment.endpointURL + "product/" + this.id)
      .subscribe(res => {
        if(res != null) {
          console.log(res)
          this.product = res
        }
      })
  }

  reviewProduct() {
    this.httpClient.post(environment.endpointURL + "review/" + this.product.id, {
      productId: this.product.id,
      userId: this.userService.getUser()?.userId,
      title: this.title,
      image: this.image,
      text: this.text,
      stars: this.stars,
      pros: this.pros,
      cons: this.cons
    }).subscribe(res =>{
      console.log(res)
      // @ts-ignore
      this.reviews.unshift(res);
    })
  }

  getReviews() {
    this.httpClient.get(environment.endpointURL + "review/" + this.id)
      .subscribe(res=> {
        if(res != null) {
          Object.values(res).forEach(review => {
            this.reviews.push(review)
          })
        }
        this.reviews.reverse()
      })
  }



}
