import {AddProductComponent} from "./add-product.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Add Product Component', () => {
  let addProductComponent: AddProductComponent;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AddProductComponent]
    });

    addProductComponent = TestBed.get(AddProductComponent);
  });
});
