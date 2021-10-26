import { Component, OnInit } from '@angular/core';
import { OverlayModule} from "@angular/cdk/overlay";
import {Post} from "../models/post.model";
import {environment} from "../../environments/environment";
import {TodoList} from "../models/todo-list.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  showNewPostForm: boolean = false;
  newPost: Post = new Post('', '', new Blob(), '', 0, 0, '', '')
  posts: Post[] = [];

  constructor(
    public httpClient: HttpClient,
  ) { }


  ngOnInit(): void {
  }

  createPost() {
    this.showNewPostForm = !this.showNewPostForm;
    //this.httpClient.post(environment.endpointURL + "post", {
      //title: this.newPost.title
    //}).subscribe((list: any) => {
    this.posts.push(new Post(this.newPost.title, this.newPost.text, this.newPost.image, '', 0, 0, this.currentDate(), ''));
    this.newPost = new Post('', '', new Blob(), '', 0, 0, '', '');
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
