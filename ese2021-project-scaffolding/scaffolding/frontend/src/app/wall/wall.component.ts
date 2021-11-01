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

  posts: Post[] = [];

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    // fetch all posts from server on start
    this.httpClient.get(environment.endpointURL + "post")
      .subscribe(res => {
        if (typeof res === "object") {
          Object.values(res).forEach(post => {
            this.posts.push(post)
          })
        }
        console.log(this.posts)
      })
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
