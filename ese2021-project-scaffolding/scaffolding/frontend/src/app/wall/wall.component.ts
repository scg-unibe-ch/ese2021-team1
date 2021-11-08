import { Component, OnInit } from '@angular/core';
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
  auth: boolean = false;
  user: User | null = null;

  createPostFeedback = {
    title: '',
    content: ''
  }


  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) { 
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.auth = res);
    userService.user$.subscribe(res => this.user = res);
  }

  ngOnInit(): void {
    // fetch all posts from server on start
    this.httpClient.get(environment.endpointURL + "post")
      .subscribe(res => {
        if (typeof res === "object") {
          Object.values(res).forEach(post => {
            this.posts.push(post)
          })
        }
        console.log(this.posts)
      })
  }
  
  createPost() { // gets fired when the create post form is submitted
    if (this.user) this.newPost.userName = this.user?.username // automatically set the user that creates the post
    if (!this.auth || !this.user) {
      alert("Only signed in users can create posts. This form should not be visible.")
      return
    }
    if (this.checkValidPost()) {
      // with the code below we send the new post object to the server
      this.httpClient.post(environment.endpointURL + "post", this.newPost)
        .subscribe((res: any) => {
          // here we get the response from the server
          // check if object is of type Post - should contain some property like title or text
          if (res.title) {
            this.posts.push(res)
            console.log(res)
            console.log(this.posts)
          } else {
            // else it may be a error message that we can somehow show to the user
            alert(JSON.stringify(res))
          }
        })
      this.togglePostForm()
      this.newPost = {
      title: "",
      content: "",
      labels: [],
      userName: ""
      }

    }
  }

  deletePostParent(postId: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        this.posts.splice(i, 1)
      }
    }
  }

  checkValidPost(): boolean {
    if (this.newPost.title == "" || this.newPost.content == "") {
      if (this.newPost.title == "") {
        this.createPostFeedback.title = "Please enter a title"
      } else {
        this.createPostFeedback.title = ""
      }
      if (this.newPost.content == "") {
        this.createPostFeedback.content = "Content cannot be empty"
      } else {
        this.createPostFeedback.content = ""
      }
      return false;
    } 
    else {
      return true
    }
  }

  isPostsEmpty(): boolean {
    return this.posts.length == 0;
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
