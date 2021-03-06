import {UserComponent} from "./user.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('User Components', () => {
  let userComponent: UserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserComponent]
    });

    userComponent = TestBed.get(UserComponent);
  });

  it('should be created', () => {
    expect(userComponent).toBeTruthy();
  });
});
