import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  addPostEmit = new EventEmitter<any>();

  url: any;
  newPost = {
    title: "",
    content: "",
    image: Blob,
    labels: [],
    userName: ""
  }
  user: User | null = null;
  auth: boolean = false;
  posts: Post[] = [];

  createPostFeedback = {
    title: '',
    content: ''
  }

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {

  }

  ngOnInit(): void {
  }

  createPost() { // gets fired when the create post form is submitted
    // the following needs to be refactored to use the userService
    const user = localStorage.getItem("userName")
    if (!user) {
      alert("Only signed in users can create posts. This form should not be visible.")
      return
    }
    this.newPost.userName = user
    if (this.checkValidPost()) {
      // with the code below we send the new post object to the server
      console.log(this.newPost)
      this.httpClient.post(environment.endpointURL + "post", this.newPost)
        .subscribe((res: any) => {
          // here we get the response from the server
          // check if object is of type Post - should contain some property like title or text
          if (res.title) {
            // emit event
            this.addPostEmit.emit(res)
          } else {
            // else it may be a error message that we can somehow show to the user
            alert(JSON.stringify(res))
          }
        })
      this.newPost = {
      title: "",
      content: "",
      image: Blob,
      labels: [],
      userName: ""
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

  updateButtonStatus(): boolean {
    return this.newPost.title == '';
  }

  imageHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    let file: File = (target.files as FileList)[0];
    this.newPost.image = file;
    console.log(this.newPost.image);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }
}
