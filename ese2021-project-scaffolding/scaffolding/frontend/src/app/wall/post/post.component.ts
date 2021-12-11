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
  /** Functions for Posts
  * @param auth
  * @param user
  * @param newText
  * @param newTitle
  * @param labels
  * @param editable
  * @param clickedDownvote
  * @param  clickedUpvote
  */
export class PostComponent implements OnInit {

  @Input() post: any = {}

  @Output()
  update = new EventEmitter<Post>();

  @Output()
  deletePostEmit = new EventEmitter<Post>();

  auth: boolean = false
  user: any = {}
  newTitle: string = ""
  newText: string = ""
  // image: Blob = Blob
  labels: string[] = []
  editable: boolean = false;
  clickedUpvote: boolean = false;
  clickedDownvote: boolean = false;
  clickedReport: boolean = false;
  clickedComment: boolean = false;
  numberComments: number = 0;
  reportFeedback: string = "";

  postId: number = this.post.id;
  commentText: string = "";

  comments: Comment[] = [];


  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.auth = res);
  }

  ngOnInit(): void {
    this.countComments()
    this.findUser()
    console.log(this.post)
    //this.post.category = this.post.category.replace(/[, ]+/g, " ").trim(); //very ugly to remove comma from category
  }
  reportPost() {
    this.httpClient.put(environment.endpointURL + "post/" + this.post.id + "/report", {})
      .subscribe(res => {
        this.toggleReportFeedback()
        setTimeout(this.toggleReportFeedback, 2000)
    })
  }

  private toggleReportFeedback() {
    var popup = document.getElementById("myPopup");
    // @ts-ignore
    popup.classList.toggle("show")
  }
  /**
  * Updates the Vote counter
  */
  upvotePost() {
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

  downvotePost() {
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

  isCommentsEmpty(): boolean {
    return this.comments.length == 0;
  }

    /**
    * @param Post.id
    * changes data from the post
    */
  updatePost() {
    this.httpClient.put(environment.endpointURL + "post/" + this.post.id, {
      title: this.post.title,
      content: this.post.text,
      image: this.post.image,
      labels: this.post.labels,
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

  canNot() {
    return localStorage.getItem("admin") == "true" || !this.userService.getLoggedIn();
  }
  /**
  * @param Post.createdAt
  * @return Time past since post (in days, hours or months)
  */
  calculateTimePosted() {
    let difference = this.calculateDifference()
    if (difference / 86400000 > 1) {
      return String(Math.floor(difference / 86400000)) + "d ago"
    } else if(difference / 3600000 > 1) {
      return String(Math.floor(difference / 3600000)) + "h ago"
    } else if(difference / 60000 > 1) {
      return String(Math.floor(difference / 60000)) + "m ago"
    } else {
      return "< 1m ago"
    }
  }

  public calculateDifference() {
    let postedDate = new Date(this.post.createdAt)
    let currentDate = new Date()
    return currentDate.getTime() - postedDate.getTime()
  }

  countComments() {
    this.httpClient.get(environment.endpointURL + "comment/" + this.post.id)
      .subscribe(res=> {
        if(res != null) {
          Object.values(res).forEach(comment => {
            this.numberComments += 1
          })
        }
      });
  }

  findUser() {
    this.httpClient.get(environment.endpointURL + "user/" + this.post.userID)
      .subscribe(res => {
        console.log(res)
        this.user = res;
      })
  }

  isAdmin() {
    if(localStorage.getItem("admin") == "true") {
      return true
    } return false

  }
}
