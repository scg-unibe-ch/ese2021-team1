import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { UserService } from 'src/app/services/user.service';

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
  delete = new EventEmitter<Post>();

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
  }


}
