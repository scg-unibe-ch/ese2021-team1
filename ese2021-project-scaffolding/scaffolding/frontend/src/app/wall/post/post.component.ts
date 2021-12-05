import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { UserService } from 'src/app/services/user.service';
import {MatIconModule} from '@angular/material/icon';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {

  @Input() post: any = {}

  @Output()
  update = new EventEmitter<Post>();

  @Output()
  deletePostEmit = new EventEmitter<Post>();

  auth: boolean = false
  user: string = ""
  newTitle: string = ""
  newText: string = ""
  // image: Blob = Blob
  labels: string[] = []
  editable: boolean = false;
  clickedUpvote: boolean = false;
  clickedDownvote: boolean = false;

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.auth = res);
    userService.user$.subscribe(res => this.user = res.username);
  }

  ngOnInit(): void {
    this.post.category = this.post.category.replace(/[, ]+/g, " ").trim(); //very ugly to remove comma from category
  }

  upvotePost() {
    if(this.clickedDownvote) {
      this.downvotePost()
    }
    else {
      this.httpClient.post(environment.endpointURL + "vote/" + this.post.id + "/up", {
        userName: localStorage.getItem("userName"),
        vote: 1
      }).subscribe(res => {
        console.log(res)
        if (res == null) {
          this.clickedUpvote = false;
          console.log(this.clickedUpvote)
          this.post.like -= 1;
        } else {
          this.clickedUpvote = true;
          console.log(this.clickedUpvote)
          this.post.like += 1;
        }
      });
    }
  }

  downvotePost() {
    if(this.clickedUpvote) {
      this.upvotePost()
    }
    else {
      this.httpClient.post(environment.endpointURL + "vote/" + this.post.id + "/down", {
        userName: localStorage.getItem("userName"),
        vote: -1
      }).subscribe(res => {
        if (res == null) {
          this.clickedDownvote = false;
          console.log(this.clickedDownvote)
          this.post.dislike -= 1;
        } else {
          this.clickedDownvote = true;
          console.log(this.clickedDownvote)
          this.post.dislike += 1;
        }
      });
    }
  }

  updatePost() {
    this.httpClient.put(environment.endpointURL + "post/" + this.post.id, {
      title: this.newTitle,
      content: this.newText,
      image: this.post.image,
      labels: this.labels,
      userName: this.post.username
    }).subscribe(res => {
      console.log(res)
      // @ts-ignore
      this.update.emit([this.post, res])
    })
  }

  // passes up the id of the post to the parent for deletion
  deletePost($event: any) {
    // DELETE IT IN THE FRONT BY PASSING IT UPWARDS TO THE PARENT (DELETES IT FROM THE ARRAY WITH POSTS)
    this.deletePostEmit.emit(this.post.id)
    // DELETE IT IN THE BACK
    this.httpClient.delete(environment.endpointURL + "post/" + this.post.id)
    .subscribe(res => {
      console.log('DELETE REQUEST', res)
      // this has to be developed further
      // remove the post from the list of posts that is located in the wall component
    });
  }

  changeEditability() {
    this.editable = !this.editable;
  }

  canChange() {
    if(!this.userService.getLoggedIn())
      return false
    else if(this.userService.getUser()?.username === this.post.userName)
      return true
    else if(localStorage.getItem("admin") == "true")
      return true
    else
      return false
  }

  calculateCommunityScore() {
    return this.post.like - this.post.dislike;
  }

  canNotVote() {
    return localStorage.getItem("admin") == "true" || !this.userService.getLoggedIn();
  }
}
