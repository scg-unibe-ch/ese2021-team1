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
  showEmptyFieldError: boolean = false;
  // passwordReqs[min 8 char, capital & small letters, a number, a special char]
  passwordReqs: boolean[] = [false, false, false, false];
  //[firstName, lastName, email, address, street number, city, zipcode, phoneNumber]
  isEmptyField: boolean[] = [true, true, true, true, true, true, true, true]
  showEmailError: boolean = false;
  isValidEmail: boolean = false;
  isValidBirthday: boolean = false;
  showBirthdayError: boolean = false;
  isValidPhoneNumber: boolean = false;
  showPhoneNumberError: boolean= false;

  // CHECK FEATURE END

  loggedIn: boolean | undefined;

  user: User | undefined;

  // ADDED NEW ARGS FOR THE UPDATED USER MODEL
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
    // console.log('Submitting Register Data:', this.userToRegister)
    this.showEmailError = !this.isValidEmail;
    this.showBirthdayError = !this.isValidBirthday;
    this.showPhoneNumberError = !this.isValidPhoneNumber;
    if (this.passwordReqs.includes(false)) {
      this.showPassReqs = true;
    }
    if (this.isEmptyField.includes(true)) {
      this.showEmptyFieldError = true;
    }
    else { // ADD OTHER CONDITIONS TOO!!!
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
      }).subscribe((data) => {
        console.log(data)
        this.userToRegister.username = this.userToRegister.password = '';
      });

      // reset the password validation array
      this.passwordReqs = [false, false, false, false];
      // reset the Error Messages
      this.showEmptyFieldError = false;
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
    this.passwordReqs[0] = this.passwordInput.length >= 8;
    this.passwordReqs[1] = (/[a-z]/.test(this.passwordInput)) && (/[A-Z]/.test(this.passwordInput));
    this.passwordReqs[2] = /\d/.test(this.passwordInput);
    let specChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    this.passwordReqs[3] = specChars.test(this.passwordInput);
  }

  showPasswordReqs(show: boolean) {
    this.showPassReqs = show;
  }

  checkFirstName(): void {
    this.isEmptyField[0] = this.userToRegister.firstName === '';
  }
  checkLastName(): void {
    this.isEmptyField[1] = this.userToRegister.lastName === '';
  }
  checkEmail(): void {
    this.isEmptyField[2] = this.userToRegister.email === '';
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.isValidEmail = regex.test(this.userToRegister.email);
  }
  checkAddress(): void {
    this.isEmptyField[3] = this.userToRegister.homeAddress === '';
  }
  checkStreetNumber(): void {
    this.isEmptyField[4] = this.userToRegister.streetNumber === 0 || this.userToRegister.streetNumber.toString() === '';
  }
  checkZipCode(): void {
    this.isEmptyField[5] = this.userToRegister.zipCode === 0 || this.userToRegister.zipCode.toString() === '';
  }
  checkCity(): void {
    this.isEmptyField[6] = this.userToRegister.city === '';
  }
  checkPhoneNumber(): void {
    this.isEmptyField[7] = this.userToRegister.phoneNumber === 0 || this.userToRegister.phoneNumber.toString() === '';
    let regex = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/ //for swiss numbers
    this.isValidPhoneNumber = regex.test(this.userToRegister.phoneNumber.toString());
  }
  checkBirthday(): void {
    this.isValidBirthday = Date.now() > Date.parse(this.userToRegister.birthday.toString());
  }



}
