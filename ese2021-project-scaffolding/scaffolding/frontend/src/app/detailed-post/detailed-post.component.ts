import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post.model";
import {Comment} from "../models/comment.model";
import {repeat} from "rxjs/operators";
import { UserService } from "../services/user.service";
import { User } from '../models/user.model';
import {EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.css'],
  template: `<app-detailed-post #dpost></app-detailed-post>`
})
export class DetailedPostComponent implements OnInit {

  // Event Emitter -> wait until request has finished then emit the post object to detailed

  commentText: string = "";

  id: string | null = "";
  post: any;
  user: any;

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
    this.userService.updateDetailed(this.comments.length)
  }

  getPost() {
    this.httpClient.get(environment.endpointURL + "post/detail/" + this.id)
      .subscribe((res) => {
        if (res != null) {
          this.post = res
        }
      })
  }

  commentPost() {
    this.httpClient.post(environment.endpointURL + "comment/" + this.id, {
      postID: this.id,
      text: this.commentText,
      userID: this.userService.getUser()?.userId
    }).subscribe(res =>{
      // @ts-ignore
      this.comments.unshift(res);
      this.commentText = ""
      this.userService.updateDetailed(this.comments.length)

    })
  }

  getComments() {
    this.httpClient.get(environment.endpointURL + "comment/" + this.id)
      .subscribe(res => {
        if(res != null) {
          Object.values(res).forEach(comment => {
            this.comments.push(comment)
          })
        }
        this.comments.reverse()
        
    this.userService.updateDetailed(this.comments.length)

    })
  }

}
