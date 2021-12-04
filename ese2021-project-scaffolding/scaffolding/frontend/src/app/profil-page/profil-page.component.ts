import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  user: any

  showAbout: boolean = true;
  showPassword: boolean = false;
  showOrders: boolean = false;
  showHelp: boolean = false;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }


  show(show: string) {
    switch(show) {
      case "about":
        this.showAbout = true;
        this.showPassword = false;
        this.showOrders = false;
        this.showHelp = false;
        break;
      case "orders":
        this.showAbout = false;
        this.showPassword = false;
        this.showOrders = true;
        this.showHelp = false;


    }
  }
}
