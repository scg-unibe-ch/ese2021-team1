import { Component, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { UserRegister } from '../models/userRegister.mode';
import { PasswordModalComponent } from '../password-modal/password-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
  /** Functions for Posts
  * @param passwordInput
  * @param showPassReqs
  * @param showRegisterModal
  * @param showRegistrSuccess
  * @param isValidPassword
  * @param serverFeedback
  */
export class RegisterComponent {

  // CHECK FEATURE START
  passwordInput: string = ''
  showPassReqs: boolean = false;

  showRegisterModal: boolean = false
  showRegistrSuccess: boolean = false
  //[firstName, lastName, email, address, street number, city, zipcode, phoneNumber]
  isValidPassword: boolean = false;
  serverFeedback: string = '';

  formFeedback: any  = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      homeAddress: '',
      streetNumber: '',
      zipCode: '',
      city: '',
      birthday: '',
      phoneNumber: '',
      admin: true
  }


  // CHECK FEATURE END

  loggedIn: boolean | undefined;

  user: User | undefined;

  // ADDED NEW ARGS FOR THE UPDATED USER MODEL
  userToRegister: UserRegister = new UserRegister('', '', '', '', '', '', '', '', '');

  // COMMUNICATION WITH THE CHILD COMPONENT -- START
  @ViewChild(PasswordModalComponent)
  private passwordModal!: PasswordModalComponent

  checkPassword(data: any) {
    if (this.passwordModal.checkPassword(data)) {
      this.isValidPassword = true
      this.formFeedback.password = ''
    } else {
      this.isValidPassword = false
      this.showPassReqs = true
      this.passwordModal.showPassReqs = true
      this.formFeedback.password = 'Please enter a valid password'
    }
  }
  // COMMUNICATION WITH THE CHILD COMPONENT -- END


  constructor(
    public httpClient: HttpClient,
    public userService: UserService,
  ) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    this.userService.showRegisterModal.subscribe(result => {
      this.showRegisterModal = result; // this set's the username to the default observable value
    });
  }

  registerUser(): void {
    this.serverFeedback = '';
    if (this.checkIsValid()) {
      // specific feedback on each input is shown based on formFeedback object
    } else {

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
        admin: true //default
      }).subscribe((data: any) => {
        if (typeof data === 'string') {
          this.serverFeedback = data.toString()
          // BASED ON WHAT IT RETURNS, YOU SHOULD HIGHLIGHT THE INPUT
        } else if (typeof data === 'object' && data.userId) {
          this.serverFeedback = "Registration completed succesfully"
          this.showRegistrSuccess = true;
          setTimeout(() => {
            this.showRegistrSuccess = false;
            this.resetRegistrationForm();
            }, 2000)
        }
        });
    }
    }


  showPasswordReqs(show: boolean) {
    this.showPassReqs = show;
  }
  checkUsername(): void {
    if (this.userToRegister.username == '') {
      this.formFeedback.username = 'Please enter a valid username.'
    } else {
      this.formFeedback.username = ''
    }
  }
  checkFirstName(): void {
    if (this.userToRegister.firstName == '') {
      this.formFeedback.firstName  = 'Please enter a valid first name.'
    } else {
      this.formFeedback.firstName = ''
    }
  }
  checkLastName(): void {
    if (this.userToRegister.lastName == '') {
      this.formFeedback.lastName  = 'Please enter a valid last name.'
    } else {
      this.formFeedback.lastName = ''
    }
  }
  checkEmail(): void {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.userToRegister.email == '') {
      this.formFeedback.email  = 'Please enter a valid email.'
    } else if (!regex.test(this.userToRegister.email)) {
      this.formFeedback.email  = 'Please enter a valid email.'
    } else {
      this.formFeedback.email = ''
    }
  }
  checkAddress(): void {
    if (this.userToRegister.homeAddress == '') {
      this.formFeedback.homeAddress  = 'Please enter a valid home address.'
    } else {
      this.formFeedback.homeAddress = ''
    }
  }
  checkStreetNumber(): void {
    try {
      if (this.userToRegister.streetNumber === 0 || this.userToRegister.streetNumber.toString() === '') {
        this.formFeedback.streetNumber  = 'Please enter a valid street number.'
      } else {
        this.formFeedback.streetNumber = ''
      }
    } catch {
      this.formFeedback.streetNumber  = 'Please enter a valid street number.'
    }
  }
  checkZipCode(): void {
    if (this.userToRegister.zipCode === 0 || this.userToRegister.zipCode.toString() === '') {
      this.formFeedback.zipCode  = 'Please enter a valid zip code.'
    } else {
      this.formFeedback.zipCode = ''
    }
  }
  checkCity(): void {
    if (this.userToRegister.city == '') {
      this.formFeedback.city  = 'Please enter a valid city.'
    } else {
      this.formFeedback.city = ''
    }
  }
  checkPhoneNumber(): void {
    let regex = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/ //for swiss numbers
    if (this.userToRegister.phoneNumber === 0 || this.userToRegister.phoneNumber.toString() === '' || !regex.test(this.userToRegister.phoneNumber.toString())) {
      this.formFeedback.phoneNumber  = 'Please enter a valid phone number.'
    } else {
      this.formFeedback.phoneNumber = ''
    }
  }
  checkBirthday(): void {
    if (this.userToRegister.birthday == '' ) { //  || Date.now() > Date.parse(this.userToRegister.birthday.toString()) DOES NOT WORK CORRECTLY
      this.formFeedback.birthday  = 'Please enter a valid birthday.'
    } else {
      this.formFeedback.birthday = ''
    }
  }
  checkIsValid(): boolean {
    this.checkUsername()
    this.checkLastName()
    this.checkFirstName()
    this.checkAddress()
    this.checkBirthday()
    this.checkCity()
    this.checkEmail()
    this.checkPhoneNumber()
    this.checkStreetNumber()
    this.checkZipCode()
    this.checkPassword(this.userToRegister.password)
    for (let i in this.formFeedback) {
      if (this.formFeedback[i] != '') {
        return false
      }
    }
    return true
  }

  resetRegistrationForm(): void {
    // RESET THE DAMN FORM
    this.formFeedback  = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      homeAddress: '',
      streetNumber: '',
      zipCode: '',
      city: '',
      birthday: '',
      phoneNumber: '',
    }
    // AND SHOOT IT TO HELL - CLOSE IT AND OPEN THE LOGIN MODAL
    this.userService.setRegisterModalShow(false)
    this.userService.setLoginModalShow(true)
  }

}
