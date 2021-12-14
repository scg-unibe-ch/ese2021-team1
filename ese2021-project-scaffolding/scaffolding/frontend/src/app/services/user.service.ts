import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*******************************************************************************************************************
   * VARIABLES
   ******************************************************************************************************************/

  private loggedIn: boolean | undefined;

  private user: User | undefined;


  /*******************************************************************************************************************
   * OBSERVABLE SOURCES & STREAMS
   ******************************************************************************************************************/

  // Observable Sources
  private loggedInSource = new Subject<boolean>();
  private userSource = new Subject<User>();

  // Observable Streams
  loggedIn$ = this.loggedInSource.asObservable();
  user$ = this.userSource.asObservable();

  private showRegisterModalPrivate = new BehaviorSubject<boolean>(false);
  showRegisterModal = this.showRegisterModalPrivate.asObservable()

  private showLoginModalPrivate = new BehaviorSubject<boolean>(false);
  showLoginModal = this.showLoginModalPrivate.asObservable()


   setLoginModalShow(state: boolean) {
    this.showLoginModalPrivate.next(state);
  }
   setRegisterModalShow(state: boolean) {
    this.showRegisterModalPrivate.next(state);
  }

  // For detailed view
  private updateDetailedPagePrivate = new BehaviorSubject<{nComments: number }>({
    nComments: 0
  });
  updateDetailedPage = this.updateDetailedPagePrivate.asObservable()
  // Setter
  updateDetailed(nComments: number) {
    this.updateDetailedPagePrivate.next({nComments });
  }


  /*******************************************************************************************************************
   * GETTERS
   ******************************************************************************************************************/

  getLoggedIn(): boolean | undefined {
    return this.loggedIn;
  }

  getUser(): User | undefined {
    return this.user;
  }


  /*******************************************************************************************************************
   * SETTERS
   ******************************************************************************************************************/

  setLoggedIn(loggedIn: boolean | undefined): void {
    this.loggedInSource.next(loggedIn);
  }

  setUser(user: User | undefined): void {
    this.userSource.next(user);
  }


  /*******************************************************************************************************************
   * CONSTRUCTOR
   ******************************************************************************************************************/

  constructor() {
    // Observer
    this.loggedIn$.subscribe(res => this.loggedIn = res);
    this.user$.subscribe(res => this.user = res);

    // Default values
    this.setLoggedIn(false);
  }
}
