import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  user: any

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }



}
