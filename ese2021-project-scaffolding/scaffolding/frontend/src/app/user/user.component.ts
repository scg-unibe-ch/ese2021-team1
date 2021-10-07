import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { UserRegister } from '../models/userRegister.mode';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  // CHECK FEATURE START
  passwordInput: string = ''
  showPassReqs: boolean = false;
  // passwordReqs[min 8 char, capital & small letters, a number, a special char]
  passwordReqs: boolean[] = [false, false, false, false];
  // CHECK FEATURE END

  loggedIn: boolean | undefined;

  user: User | undefined;

  // ADDED NEW ARGS FOR THE UDPATED USER MODEL
  userToRegister: UserRegister = new UserRegister('', '', '', '', 0, 0, '', '', 0);
  userToLogin: User = new User(0, '', '');

  endpointMsgUser: string = '';
  endpointMsgAdmin: string = '';

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

  registerUser(): void {
    console.log('Submitting Register Data:', this.userToRegister)
    if (this.passwordReqs.includes(false)) {
      this.showPassReqs = true;
    } else { // ADD OTHER CONDITIONS TOO!!!
      this.httpClient.post(environment.endpointURL + "user/register", {
        userName: this.userToRegister.username,
        password: this.userToRegister.password,
        firstName: this.userToRegister.firstName,
        lastName: this.userToRegister.lastName,
        email: this.userToRegister.email,
        homeAddress: this.userToRegister.homeAddress,
        streetNumber: this.userToRegister.streetNumber,
        zipCode: this.userToRegister.zipCode,
        city: this.userToRegister.city,
        birthday: this.userToRegister.birthday,
        phoneNumber: this.userToRegister.phoneNumber,
      }).subscribe(() => {
        this.userToRegister.username = this.userToRegister.password = '';
      });

      // reset the password validation array
      this.passwordReqs = [false, false, false, false];
    }
  }

  loginUser(): void {
    this.httpClient.post(environment.endpointURL + "user/login", {
      userName: this.userToLogin.username,
      password: this.userToLogin.password
    }).subscribe((res: any) => {
      this.userToLogin.username = this.userToLogin.password = '';

      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('userToken', res.token);

      this.userService.setLoggedIn(true);
      this.userService.setUser(new User(
        res.user.userId,
        res.user.userName,
        res.user.password));
    });
  }

  logoutUser(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');

    this.userService.setLoggedIn(false);
    this.userService.setUser(undefined);
  }

  accessUserEndpoint(): void {
    this.httpClient.get(environment.endpointURL + "secured").subscribe(() => {
      this.endpointMsgUser = "Access granted";
    }, () => {
      this.endpointMsgUser = "Unauthorized";
    });
  }

  accessAdminEndpoint(): void {
    this.httpClient.get(environment.endpointURL + "admin").subscribe(() => {
      this.endpointMsgAdmin = "Access granted";
    }, () => {
      this.endpointMsgAdmin = "Unauthorized";
    });
  }

  checkPassword(): void {
    // passwordReqs[min 8 char, capital & small letters, a number, a special char]
    if (this.passwordInput.length >= 8) {
      this.passwordReqs[0] = true
    } else {
      this.passwordReqs[0] = false
    }
    if ((/[a-z]/.test(this.passwordInput)) && (/[A-Z]/.test(this.passwordInput))) {
      this.passwordReqs[1] = true
    } else {
      this.passwordReqs[1] = false
    }
    if (/\d/.test(this.passwordInput)) {
      this.passwordReqs[2] = true
    } else {
      this.passwordReqs[2] = false
    }
    let specChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (specChars.test(this.passwordInput)) {
      this.passwordReqs[3] = true
    } else {
      this.passwordReqs[3] = false
    }
  }
  showPasswordReqs(show: boolean) {
    if (show) {
      this.showPassReqs = true;
    } else {
      this.showPassReqs = false;
    }
  }
 
}
