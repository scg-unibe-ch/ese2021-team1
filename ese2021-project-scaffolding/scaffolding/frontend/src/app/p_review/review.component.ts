import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: any = {}

  author: any;

  constructor(
    public httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.httpClient.get(environment.endpointURL + "user/" + this.review.userID)
      .subscribe(res=> {
        if(res != null) {
          console.log(res)
          this.author = res
        }
      })
  }
}
