import {NavbarComponent} from "./navbar.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

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
});

