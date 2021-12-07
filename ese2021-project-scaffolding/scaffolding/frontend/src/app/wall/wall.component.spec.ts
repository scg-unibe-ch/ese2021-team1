import {WallComponent} from "./wall.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Wall Components', () => {
  let wallComponent: WallComponent;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WallComponent]
    });

    wallComponent = TestBed.get(WallComponent);
  });

  it('should be created', () => {
    expect(wallComponent).toBeTruthy();
  });
});
