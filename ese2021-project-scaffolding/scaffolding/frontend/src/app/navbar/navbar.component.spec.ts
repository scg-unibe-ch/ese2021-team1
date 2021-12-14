import {NavbarComponent} from "./navbar.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {User} from "../models/user.model";

describe('Navbar Component', () => {
  let navbarComponent: NavbarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [NavbarComponent]
    });

    navbarComponent = TestBed.get(NavbarComponent);
  });
  it('should be created', () => {
    expect(navbarComponent).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should log in with a user', () => {
      let user1 = new User(1,"Test", "Test123***", "f1", "l1", "e@gmail.com", "a1", 1, 1111, "c1", "2002-12-12","+323444444444", false, null);
      navbarComponent.user = user1;
      navbarComponent.ngOnInit();
    });

    it('should log out', () => {
      let user1 = new User(1,"Test", "Test123***", "f1", "l1", "e@gmail.com", "a1", 1, 1111, "c1", "2002-12-12","+323444444444", false, null);
      navbarComponent.user = user1;
      navbarComponent.loggedInState = true;
      navbarComponent.logoutUser();
      expect(navbarComponent.loggedInState).toBe(false);
    });
  });
});

