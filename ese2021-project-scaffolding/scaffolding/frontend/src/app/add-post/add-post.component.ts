import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {Post} from "../models/post.model";
import {WallComponent} from "../wall/wall.component";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  newPost = {
    title: "",
    content: "",
    labels: [],
    userName: ""
  }
  showNewPostForm: boolean = false;
  user: User | null = null;
  auth: boolean = false;
  posts: Post[] = [];

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
    userService.loggedIn$.subscribe(res => this.auth = res);
    userService.user$.subscribe(res => this.user = res);
  }

  ngOnInit(): void {
  }

  createPost() { // gets fired when the create post form is submitted
    if (this.user) this.newPost.userName = this.user?.username // automatically set the user that creates the post
    if (!this.auth || !this.user) {
      alert("Only signed in users can create posts. This form should not be visible.")
      return
    }
    // with the code below we send the new post object to the server
    this.httpClient.post(environment.endpointURL + "post", this.newPost)
      .subscribe((res: any) => {
        console.log(res)
        // here we get the response from the server
        // check if object is of type Post - should contain some property like title or text
        if (res.title) {
          this.posts.push(res)
        } else {
          // else it may be a error message that we can somehow show to the user
          alert(JSON.stringify(res))
        }
      })
    this.showNewPostForm = !this.showNewPostForm;
  }

}
