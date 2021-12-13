import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {MatIconModule} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "../models/order.model";
import {Post} from "../models/post.model"
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

  // post: any = {}


  user: any
  orders: Order[] = []
  posts: Post[] = []
  count: number[] = []
  newPassword: string = "";
  newPassword2: string = "";
  passwordReqs: boolean[] = [false, false, false, false];

  showAbout: boolean = true;
  showMyPosts: boolean = false;
  showPassword: boolean = false;
  showOrders: boolean = false;
  showHelp: boolean = false;
  editable: boolean = false;


  selectedFile: any

  public feedback: string = "";
  public passwordFeedback: string = "";

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    // this.getOrders();
    // this.counter()
    this.getMyOrders();
    this.getMyPosts();
    console.log(this.user);
  }


  show(show: string) {
    switch (show) {
      case "about":
        this.showAbout = true;
        this.showMyPosts = false;
        this.showPassword = false;
        this.showOrders = false;
        this.showHelp = false;
        break;
      case "MyPosts":
        this.showAbout = false;
        this.showMyPosts = true;
        this.showPassword = false;
        this.showOrders = false;
        this.showHelp = false;
        break;
      case "orders":
        this.showAbout = false;
        this.showMyPosts = false;
        this.showPassword = false;
        this.showOrders = true;
        this.showHelp = false;
        break;
      case "password":
        this.showAbout = false;
        this.showMyPosts = false;
        this.showPassword = true;
        this.showOrders = false;
        this.showHelp = false;
        break;
      case "help":
        this.showAbout = false;
        this.showMyPosts = false;
        this.showPassword = false;
        this.showOrders = false;
        this.showHelp = true;
        break;
    }
  }


  //doesnt work yet!
  /*
    private getOrders() {
      this.httpClient.get(environment.endpointURL + "orders/" + this.user.userId, this.user.userId)
        .subscribe((res: any) => {
          console.log(this.user.userId)
          console.log(res);
          this.orders = res;
        })
    }
  */
  isPostsEmpty(): boolean {
    return this.posts.length == 0;
  }

  private getMyPosts() {
    this.httpClient.get(environment.endpointURL + "post/myPosts/" + this.user.userId)
      .subscribe((res: any) => {
        this.posts = res;
        this.posts.reverse();
        console.log(res);
      })
  }

  private getMyOrders() {
    this.httpClient.get(environment.endpointURL + "orders/" + this.user.userId)
      .subscribe((res: any) => {
        this.orders = res;
        console.log(this.orders)
      })
  }

  changePassword() {
    if (this.newPassword == this.newPassword2 && this.checkPassword()) {
      this.httpClient.put(environment.endpointURL + "user/" + this.user.userId, {
        userId: this.user.userId,
        password: this.newPassword
      }).subscribe((res: any) => {
        console.log(res);
        this.passwordFeedback = "Change was successful."
      });
    } else {
      if (this.newPassword != this.newPassword2) {
        this.passwordFeedback = "The two passwords aren't equal. Try again.";
      } else {
        this.passwordFeedback = "The new password doesn't fulfill the requirements. Try again.";
      }
    }
  }

  updateUser() {
    const payload = new FormData()
    payload.append("profile", JSON.stringify({
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
    }))
    payload.append("file", this.selectedFile)
    this.httpClient.patch(environment.endpointURL + "user/" + this.user.userId, payload).subscribe((res: any) => {
      if (res != null) {
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
        localStorage.setItem("image", this.user.image)
        this.feedback = "Changes were successful!"
        this.selectedFile = null
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
    if (this.passwordReqs[0] && this.passwordReqs[1] && this.passwordReqs[2] && this.passwordReqs[3]) {
      return true;
    } else {
      return false;
    }
  }

  profileImageHandler(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.selectedFile = file
    }
  }

  /*
    deletePost($event: Post) {
      this.httpClient.delete(environment.endpointURL + "post/" + this.post.id)
        .subscribe(res => {
          console.log(res);
        })
    }

    updatePost($event: Post) {
      this.httpClient.put(environment.endpointURL + "post/" + this.post.id, {
        title: this.post.title,
        content: this.post.text,
        image: this.post.image,
        labels: this.post.labels,
        userName: this.post.username
      }).subscribe(res => {
        console.log(res);
      })
    }*/
  public counter() {
    this.httpClient.get(environment.endpointURL + "post/" + this.user.userId + "/counter")
      .subscribe(res => {
        console.log("hallo" + res);

        if (typeof res === "object") {
          Object.values(res).forEach(para => {
            this.count.push(para)
          })
          this.count.reverse();
          console.log(this.count);

        }
      })
  }
}
