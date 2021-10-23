import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // toggle register and login modals
  showLoginModal: boolean = true
  showRegisterModal: boolean = true

  loggedInState: boolean = false

  user: User = {
    userId: 0,
    username: "",
    password: "",
  }

  constructor(private userService: UserService) {
  }
  
  ngOnInit(): void {
    this.userService.loggedIn$.subscribe((loginState) => {
      console.log(loginState)
      this.loggedInState = true
    })
    this.userService.user$.subscribe((user) => {
      console.log(user)
      this.showLoginModal = false
      this.user = user
    })
    this.userService.showRegisterModal.subscribe(result => {
      this.showRegisterModal = result; // this set's the username to the default observable value
    });
    this.userService.showLoginModal.subscribe(result => {
      this.showLoginModal = result; // this set's the username to the default observable value
    });
  }

  toggleLoginModal() {
    this.userService.setLoginModalShow(!this.showLoginModal)
    this.userService.setRegisterModalShow(false)
  }
  toggleRegisterModal() {
    this.userService.setLoginModalShow(false)
    this.userService.setRegisterModalShow(!this.showRegisterModal)
  }
  logoutUser() {
    this.userService.setLoggedIn(false)
    this.loggedInState = false
    this.user = {userId: 0, username: "", password: ""}
  }

}
