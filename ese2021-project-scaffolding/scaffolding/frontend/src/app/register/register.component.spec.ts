import {RegisterComponent} from "./register.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Register Components', () => {
  let registerComponent: RegisterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RegisterComponent]
    });

    registerComponent = TestBed.get(RegisterComponent);
  });

  it('should be created', () => {
    expect(registerComponent).toBeTruthy();
  });
});
