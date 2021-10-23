import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post = new Post('', '', new Blob(), '', 0, 0, '', '')

  @Output()
  update = new EventEmitter<Post>();

  @Output()
  delete = new EventEmitter<Post>();

  constructor(
    public httpClient: HttpClient
  ) {}

  ngOnInit(): void {
  }

  updatePost(): void {
    this.update.emit(this.post);
  }

  deletePost(): void {
    this.delete.emit(this.post);
  }
}
