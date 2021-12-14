import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {ReviewModel} from "../models/review.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {

  title: string = "";
  image: string | null = "";
  text: string | null = "";
  stars: number = 1;
  pros: string | null = "";
  cons: string | null = "";

  id: string | null = "";
  product: any;

  reviews: [] = [];

  createReview = false;


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
          console.log(res);
          this.product = res;
        }
      })
  }

  reviewProduct() {
    console.log(this.id)
    this.httpClient.post(environment.endpointURL + "review/" + this.id + "/review", {
      productID: this.id,
      userId: localStorage.getItem("userId"),
      title: this.title,
      image: this.image,
      text: this.text,
      stars: this.stars,
      pros: this.pros,
      cons: this.cons
    }).subscribe(res =>{
      console.log(res);
      // @ts-ignore
      this.reviews.unshift(res);
    })
  }

  getReviews() {
    this.httpClient.get(environment.endpointURL + "review/" + this.id)
      .subscribe(res=> {
        console.log(res);
        // @ts-ignore
        this.reviews = res;
      })
  }


  addStars(amount: number) {
    console.log(amount)
    this.stars = amount;
  }
}
