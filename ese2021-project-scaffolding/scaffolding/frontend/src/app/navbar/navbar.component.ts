import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
  * @param showLoginModal
  * @param showRegisterModal
  * @param showShoppingCart
  * @param title
  * @param loggedInStated
  */
export class NavbarComponent implements OnInit {

  // toggle register and login modals
  showLoginModal: boolean = true
  showRegisterModal: boolean = true
  showShoppingCart: boolean = false
  title: string = "CryptoHub"
  loggedInState: boolean = false

  user: User | null = null
  showAdded: boolean = false;

  constructor(
    private userService: UserService,
    public cartService: CartService
    ) {
      // listen for changes
      userService.loggedIn$.subscribe(res => this.loggedInState = res)
      userService.user$.subscribe(res => this.user = res)
  }

  ngOnInit(): void {
    this.userService.loggedIn$.subscribe((loginState) => {
      this.loggedInState = true
    })
    this.userService.user$.subscribe((user) => {
      this.showLoginModal = false
      this.user = user
    })
    this.userService.showRegisterModal.subscribe(result => {
      this.showRegisterModal = result;
    });
    this.userService.showLoginModal.subscribe(result => {
      this.showLoginModal = result;
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
    // remove data from localStorage
    localStorage.clear()
    this.loggedInState = false
    this.user = new User(0, '', '','','','','',0,0,'','','',false, null)
  }

  showCart() {
    if (this.showShoppingCart) {
      return true;
    } else {
      return false;
    }
  }

  getUserName() {
    return this.userService.getUser()?.username;
  }


}
