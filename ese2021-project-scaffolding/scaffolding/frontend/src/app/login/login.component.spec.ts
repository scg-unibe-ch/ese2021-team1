import {LoginComponent} from "./login.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Login Component', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginComponent]
    });

    loginComponent = TestBed.get(LoginComponent);
  });

  it('should be created', () => {
    expect(loginComponent).toBeTruthy();
  });
});
