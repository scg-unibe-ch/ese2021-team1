import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {MatIconModule} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "../models/order.model";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
  /** Functions for Posts
  * @param user
  * @param orders
  * @param showAbout
  * @param showPassword
  * @param showOrders
  * @param showHelp
  */
export class ProfilPageComponent implements OnInit {

  user: any
  orders: Order[] = []
  newPassword: string = "";
  newPassword2: string = "";
  passwordReqs: boolean[] = [false, false, false, false];


  showAbout: boolean = true;
  showPassword: boolean = false;
  showOrders: boolean = false;
  showHelp: boolean = false;
  editable: boolean = false;

  public feedback: string = "";


  constructor(
    private userService : UserService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.getOrders();
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
        break;
      case "password":
        this.showAbout = false;
        this.showPassword = true;
        this.showOrders = false;
        this.showHelp = false;
        break;
    }
  }


  //doesnt work yet!

  private getOrders() {
    this.httpClient.get(environment.endpointURL + "orders/" + this.user.userId, this.user.userId)
      .subscribe((res: any) => {
        console.log(this.user.userId)
        console.log(res);
        this.orders = res;
      })
  }

  changePassword() {
    if (this.newPassword.localeCompare(this.newPassword2) && this.checkPassword()) {
      this.httpClient.put(environment.endpointURL + "user/" + this.user.userId, {
        userId: this.user.userId,
        password: this.newPassword
      }).subscribe((res: any) => {
        console.log(res);
      });
    }
    else {
      console.log("gugus");
    }
  }

  updateUser() {
    this.httpClient.patch(environment.endpointURL + "user/" + this.user.userId, {
      userId: this.user.userId,
      userName: this.user.userName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      homeAddress: this.user.homeAddress,
      streetNumber: this.user.streetNumber,
      zipCode: this.user.zipCode,
      city: this.user.city,
      birthday: this.user.birthday,
      phoneNumber: this.user.phoneNumber
    }).subscribe((res: any) => {
      if(res != null) {
        console.log(res)
        this.userService.setUser(res)
        this.user = res
        this.user.username = res.userName;
        localStorage.setItem('userId', this.user.userId);
        localStorage.setItem('userName', this.user.userName);
        localStorage.setItem('userToken', this.user.token);
        localStorage.setItem('password', this.user.password);
        localStorage.setItem('firstName', this.user.firstName);
        localStorage.setItem('lastName', this.user.lastName);
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('homeAddress', this.user.homeAddress);
        localStorage.setItem('streetNumber', this.user.streetNumber);
        localStorage.setItem('zipCode', this.user.zipCode);
        localStorage.setItem('city', this.user.city);
        localStorage.setItem('birthday', this.user.birthday);
        localStorage.setItem('phoneNumber', this.user.phoneNumber);
        localStorage.setItem('admin', this.user.admin);

        this.feedback = "Changes were successful!"
      } else {
        this.feedback = "Something went wrong. Try again!"
      }
    })
  }

  checkPassword(): boolean {
    console.log("Hallo");
    // passwordReqs[min 8 char, capital & small letters, a number, a special char]
    this.passwordReqs[0] = this.newPassword.length >= 8;
    this.passwordReqs[1] = (/[a-z]/.test(this.newPassword)) && (/[A-Z]/.test(this.newPassword));
    this.passwordReqs[2] = /\d/.test(this.newPassword);
    let specChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    this.passwordReqs[3] = specChars.test(this.newPassword);
    if (this.passwordReqs[0] && this.passwordReqs[1] && this.passwordReqs[2] && this.passwordReqs[3]){
      return true;
    }
    else{
      return false;
    }
  }


}
