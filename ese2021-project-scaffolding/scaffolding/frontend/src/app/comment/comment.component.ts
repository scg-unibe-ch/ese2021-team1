import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: any = {}

  author: any;

  constructor(
    public httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.httpClient.get(environment.endpointURL + "user/" + this.comment.userID)
      .subscribe(res=> {
        if(res != null) {
          this.author = res
        }
      })
  }
}
