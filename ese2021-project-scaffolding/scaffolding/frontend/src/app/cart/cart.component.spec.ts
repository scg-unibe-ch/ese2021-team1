import {CartComponent} from "./cart.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Cart Components', () => {
  let cartComponent: CartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CartComponent]
    });

    cartComponent = TestBed.get(CartComponent);
  });

  it('should be created', () => {
    expect(cartComponent).toBeTruthy();
  });
});
