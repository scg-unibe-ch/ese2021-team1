import {StoreComponent} from "./store.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Store Component', () =>{
  let storeComponent: StoreComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [StoreComponent]
    });

    storeComponent = TestBed.get(StoreComponent);
  });

  it('should be created',  () => {
    expect(storeComponent).toBeTruthy();
  });
});
