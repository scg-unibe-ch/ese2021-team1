import {CheckoutComponent} from "./checkout.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {Product} from "../models/product.model";
import {of} from "rxjs";

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

  describe('calculateTotal', () => {
    it('should calculate the total of all products', () => {
      const image = new Blob();
      const product1 = new Product(1,"p1","t1","d1",5,"c1", image);
      const product2 = new Product(2,"p2","t2","d2",1,"c2", image);
      const product3 = new Product(3,"p3","t3","d3",9,"c3", image);

      checkoutComponent.products.push(product1,product2,product3);
      expect(checkoutComponent.calculateTotal().valueOf()).toEqual(15);

    });
  });
});
