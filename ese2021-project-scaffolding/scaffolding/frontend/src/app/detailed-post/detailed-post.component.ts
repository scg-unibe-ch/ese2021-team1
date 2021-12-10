import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post.model";
import {Comment} from "../models/comment.model";
import {repeat} from "rxjs/operators";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.css']
})
export class DetailedPostComponent implements OnInit {

  commentText: string = "";

  id: string | null = "";
  post: any;

  comments: Comment[] = [];


  constructor(
    public httpClient: HttpClient,
    public userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPost()
    this.getComments()
  }

  getPost() {
    this.httpClient.get(environment.endpointURL + "post/" + this.id)
      .subscribe(res => {
        if(res != null) {
          console.log(res)
          this.post = res
        }
      })
  }

  commentPost() {
    this.httpClient.post(environment.endpointURL + "comment/" + this.id, {
      postID: this.id,
      text: this.commentText
    }).subscribe(res =>{
      // @ts-ignore
      this.comments.unshift(res);
    })
  }

  getComments() {
    this.httpClient.get(environment.endpointURL + "comment/" + this.id)
      .subscribe(res=> {
        if(res != null) {
          Object.values(res).forEach(comment => {
            this.comments.push(comment)
          })
          console.log(this.comments)
        }
        this.comments.reverse()
    })
  }



}
