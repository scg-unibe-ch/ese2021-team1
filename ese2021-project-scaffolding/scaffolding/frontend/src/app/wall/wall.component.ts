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
  filteredPosts: Post[] = [];

  createPostFeedback = {
    title: '',
    content: ''
  }

  searchTitle: string = ""
  auth: boolean = false
  user: string | null = null
  toFilterCategories: String[] = []
  toSortMethod: String = ""
  showFilter: boolean = false;
  feedback: string = "";

  infinityIndex: number = 2; // used for infinite scrolling 0 - 2

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
        console.log(res)
        if (typeof res === "object") {
          Object.values(res).forEach(post => {
            this.posts.push(post)
            this.filteredPosts.push(post)
          })
        }
      })
  }

  deletePostParent(postId: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        this.posts.splice(i, 1)
        this.filteredPosts.splice(i, 1)
      }
    }
  }

  addPostParent(post: any) {
    this.posts.unshift(post)
    this.filteredPosts.unshift(post)
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
     /**
     * @param post
     * @param event
     * @return post
     */
  updatePosts(event: any): void {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == event[0].id) {
        this.posts[i] = event[1]
        this.filteredPosts[i] = event[1]
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
    if (this.filteredPosts.length == 0) {
      this.feedback = "Your filter didn't find any posts."
    } else {
      this.feedback = "";
    }
    if(this.toSortMethod == "likes") {
      this.filteredPosts.sort(this.compareLikes)
    } else if(this.toSortMethod == "dislikes") {
      this.filteredPosts.sort(this.compareDislikes)
    } else if(this.toSortMethod == "newest") {
      this.filteredPosts.sort(this.compareNewest)
    } else if(this.toSortMethod == "oldest") {
      this.filteredPosts.sort(this.compareOldest)
    }
  }


  private compareNewest(a: Post, b: Post) {
    let aCreated = new Date(a.createdAt).getTime();
    let bCreated = new Date(b.createdAt).getTime();
    if(aCreated < bCreated) {
      return 1;
    } if(aCreated > bCreated) {
      return -1;
    }
    return 0;
  }

  private compareOldest(a: Post, b: Post) {
    let aCreated = new Date(a.createdAt).getTime();
    let bCreated = new Date(b.createdAt).getTime();
    if(aCreated < bCreated) {
      return -1;
    } if(aCreated > bCreated) {
      return 1;
    }
    return 0;
  }

  private compareLikes(a: Post, b: Post) {
    if(a.like < b.like) {
      return 1;
    } if (a.like > b.like) {
      return -1;
    }
    return 0;
  }

  private compareDislikes(a: Post, b: Post) {
    if(a.dislike < b.dislike) {
      return 1;
    } if (a.dislike > b.dislike) {
      return -1;
    }
    return 0;
  }



  showFiltered(post: any): boolean {
    if(this.filteredPosts.indexOf(post) > -1) {
      return true
    } else {
      return false
    }
  }

  resetFilter() {
    window.location.reload();
  }

  loadMorePosts() {
    this.infinityIndex = this.infinityIndex + 2
    this.getAllPosts()
  }
}
