import {CheckoutComponent} from "./checkout.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Checkout Component', () => {
  let checkoutComponent: CheckoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CheckoutComponent]
    });

    checkoutComponent = TestBed.get(CheckoutComponent);
  });

  it('should be created', () => {
    expect(checkoutComponent).toBeTruthy();
  });
});
