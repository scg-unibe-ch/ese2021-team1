import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OverlayModule} from "@angular/cdk/overlay";
import {Post} from "../models/post.model";
import {environment} from "../../environments/environment";
import {TodoList} from "../models/todo-list.model";
import {HttpClient} from "@angular/common/http";
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  showNewPostForm: boolean = false;
  createPostButtonText: String = 'CREATE POST'
  newPost = {
    title: "",
    content: "",
    labels: [],
    userName: ""
  }
  posts: Post[] = [];


  createPostFeedback = {
    title: '',
    content: ''
  }

  auth: boolean = false
  user: string | null = null


  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
    userService.loggedIn$.subscribe(res => this.auth = res);
    userService.user$.subscribe(res => this.user = res.username);
  }

  ngOnInit(): void {
    // fetch all posts from server on start
    this.getAllPosts();
  }

  isPostsEmpty(): boolean {
    return this.posts.length == 0;
  }

  getAllPosts(): void {
    this.httpClient.get(environment.endpointURL + "post")
      .subscribe(res => {
        if (typeof res === "object") {
          Object.values(res).forEach(post => {
            this.posts.push(post)
          })
        }
        this.posts.reverse(); //so newest post is at the top
        console.log(this.posts)
      })
  }

  deletePostParent(postId: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        this.posts.splice(i, 1)
      }
    }
  }

  addPostParent(post: any) {
    console.log(post)
    this.posts.push(post)
    this.togglePostForm();
  }

  convertImgToBlob(file: File): Blob|undefined {
    let blob;
    file.arrayBuffer().then((arrayBuffer) => {
      blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type});
    })
    return blob;
  }

  currentDate(): string {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  }

  togglePostForm(): void {
    this.showNewPostForm = !this.showNewPostForm;
    (this.showNewPostForm) ? this.createPostButtonText = '⬆' : this.createPostButtonText = 'CREATE POST'
  }
}
