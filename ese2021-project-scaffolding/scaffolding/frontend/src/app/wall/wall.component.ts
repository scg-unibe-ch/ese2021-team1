import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { Post } from "../models/post.model";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
/**
* @param showNewPostForm
* @param createPostButtonText
*/
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

  searchTitle: string = ""
  auth: boolean = false
  user: string | null = null
  toFilterCategories: String[] = ["Bitcoin", "Cardano", "Polkadot", "Ethereum"]
  toSortMethod: String = "newest"
  showFilter: boolean = false;
  feedback: string = "";

  infinityIndex: number = 5; // used for infinite scrolling 0 - 5

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
    this.httpClient.get(environment.endpointURL + "post/" + this.infinityIndex)
      .subscribe(res => {
        if (typeof res === "object") {
          Object.values(res).forEach(post => {
            this.posts.push(post)
          })
          this.sortPosts()
        }
      })
  }

  sortPosts() {

    // sort by DATE

    switch (this.toSortMethod) {
      case "newest":
        this.posts = this.posts.sort((a, b) => (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()) ? 1 : -1)
        break;
      case "oldest":
        this.posts.sort((a, b) => (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) ? 1 : -1)
        break;

      case "likes":
        this.posts.sort((a, b) => a.like < b.like ? 1 : -1)
        break;

      case "dislikes":
        this.posts.sort((a, b) => a.dislike < b.dislike ? 1 : -1)
        break;

      default:
        break;
    }
    // sort by likes

  }

  deletePostParent(postId: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        this.posts.splice(i, 1)
      }
    }
  }

  addPostParent(post: any) {
    this.posts.unshift(post)
    this.togglePostForm();
  }

  currentDate(): string {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
  }

  togglePostForm(): void {
    this.showNewPostForm = !this.showNewPostForm;
    (this.showNewPostForm) ? this.createPostButtonText = '⬆' : this.createPostButtonText = 'CREATE POST'
  }
  /**
  * @param post
  * @param event
  * @return post
  */
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

  resetFilter() {
    this.toFilterCategories = ["Bitcoin", "Cardano", "Polkadot", "Ethereum"]
    this.toSortMethod = "newest"
  }

  loadMorePosts() {
    this.infinityIndex = this.infinityIndex + 5
    this.getAllPosts()
  }
}