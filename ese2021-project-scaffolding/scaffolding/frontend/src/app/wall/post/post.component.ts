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
  image: Blob = new Blob()
  labels: string[] = []
  editable: boolean = false;


  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.auth = res);
    userService.user$.subscribe(res => this.user = res.username);
  }

  ngOnInit(): void {

  }

  updatePost() {
    this.httpClient.put(environment.endpointURL + "post/" + this.post.id, {
      title: this.newTitle,
      content: this.newText,
      image: this.image,
      labels: this.labels
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
    else
      return false
  }

}
