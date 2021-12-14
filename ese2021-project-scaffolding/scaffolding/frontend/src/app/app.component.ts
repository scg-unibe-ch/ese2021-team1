import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  /**
  * @param title
  * @return todoLists
  * @param newTodoListName
  * @return loggedIn
  * @param user
  */
export class AppComponent implements OnInit {
  title = 'frontend';


  newTodoListName: string = '';

  loggedIn: boolean | undefined;

  user: User | undefined;

  constructor(
    public httpClient: HttpClient,
    public userService: UserService
  ) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
  }

  ngOnInit() {
    //this.readLists();
    this.checkUserStatus();
  }
  /**
  * @param userId, userToken, userName, password, firstName, lastName, email, homeAddress, streetNumber, zipCode, city, birthday, phoneNumber, admin
  * @return boolean (if everything is okay)
  */
  checkUserStatus() {
    // Get user data from local storage
    const userId = localStorage.getItem('userId')
    const userToken = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password')
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const email = localStorage.getItem('email')
    const homeAddress = localStorage.getItem('homeAddress')
    const streetNumber = parseInt(<string>localStorage.getItem('streetNumber'))
    const zipCode = parseInt(<string>localStorage.getItem('zipCode'))
    const city = localStorage.getItem('city')
    const birthday = localStorage.getItem('birthday')
    const phoneNumber = localStorage.getItem('phoneNumber')
    const admin = <boolean><unknown>localStorage.getItem('admin')
    const image = localStorage.getItem("image")


    // Set boolean whether a user is logged in or not
    if (!admin || !userId || !userName || !userToken || !password || !firstName || !lastName || !email || !homeAddress || !streetNumber || !zipCode || !city || !birthday || !phoneNumber) return
    this.userService.setLoggedIn(!!userToken);
    this.userService.setUser({
      userId: parseInt(userId),
      username: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      homeAddress: homeAddress,
      streetNumber: streetNumber,
      zipCode: zipCode,
      city: city,
      birthday: birthday,
      phoneNumber: phoneNumber,
      admin: admin,
      image: image
    })
  }
}
