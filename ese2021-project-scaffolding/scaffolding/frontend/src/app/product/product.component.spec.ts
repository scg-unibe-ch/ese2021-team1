import {ProductComponent} from "./product.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Product Component', () => {
  let productComponent: ProductComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductComponent]
    });

    productComponent = TestBed.get(ProductComponent);
  });

  it('should be created', () => {
    expect(productComponent).toBeTruthy();
  });
});
