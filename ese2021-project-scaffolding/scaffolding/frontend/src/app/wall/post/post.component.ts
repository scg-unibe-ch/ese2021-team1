import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
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
      content: this.newText
    }).subscribe(res => {
      console.log(res)
      // this has to be developed further
      // replace the post in the list of posts that is located in the wall component with the new one
    })
  }

  // passes up the id of the post to the parent for deletion
  deletePost($event: any) {
    // DELETE IT IN THE FRONT BY PASSING IT UPWARDS TO THE PARENT (DELETES IT FROM THE ARRAY WITH POSTS)
    this.deletePostEmit.emit(this.post.id)
    // DELETE IT IN THE BACK
    // this.httpClient.delete(environment.endpointURL + "post/" + this.post.id)
    // .subscribe(res => {s
    //   console.log(res)
    //   // this has to be developed further
    //   // remove the post from the list of posts that is located in the wall component
    // });
  }

}
