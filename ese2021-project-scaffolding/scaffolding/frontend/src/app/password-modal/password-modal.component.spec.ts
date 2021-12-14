import {PasswordModalComponent} from "./password-modal.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Password Modal Components', () => {
  let passwordModalComponent: PasswordModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PasswordModalComponent]
    });

    passwordModalComponent = TestBed.get(PasswordModalComponent);
  });

  it('should be created',() => {
    expect(passwordModalComponent).toBeTruthy();
  });
});
