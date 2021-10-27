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
  newPost = {
    title: "",
    content: "",
    labels: [],
    userName: ""
  }
  posts: Post[] = [];
  auth: boolean = false;
  user: User | null = null;

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) { 
    // Listen for changes
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
    this.httpClient.post(environment.endpointURL + "post", this.newPost)
      .subscribe((res: any) => {
        console.log(res)
      })
    this.showNewPostForm = !this.showNewPostForm;
    //this.httpClient.post(environment.endpointURL + "post", {
      //title: this.newPost.title
    //}).subscribe((list: any) => {
    // this.posts.push(new Post(this.newPost.title, this.newPost.content, this.newPost.image, '', 0, 0, this.currentDate(), ''));
    // this.newPost = new Post('', '', new Blob(), '', 0, 0, '', '');
    //})
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
}
