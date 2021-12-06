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
  filteredPosts: Post[] = [];

  createPostFeedback = {
    title: '',
    content: ''
  }

  auth: boolean = false
  user: string | null = null
  toFilterCategories: String[] = []


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
            this.filteredPosts.push(post)
          })
        }
        this.posts.reverse();
        this.filteredPosts.reverse()//so newest post is at the top
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
    this.posts.unshift(post)
    this.togglePostForm();
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

  updatePosts(event: any): void {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == event[0].id) {
        this.posts[i] = event[1]
      }
    }
  }

  showCreatePost() {
    return localStorage.getItem("admin") == "false" && this.userService.getLoggedIn()
  }

  filterPosts() {
    let filteredPosts: Post[] = []
    if (this.toFilterCategories.length > 0) {
      for (let post of this.posts) {
        if (this.toFilterCategories.indexOf(post.category) > -1) {
          filteredPosts.push(post)
        }
      }
      this.filteredPosts = filteredPosts
    } else {
      this.filteredPosts = this.posts
    }
  }

  showFiltered(post: any): boolean {
    if(this.filteredPosts.indexOf(post) > -1) {
      return true
    } else {
      return false
    }
  }

}
