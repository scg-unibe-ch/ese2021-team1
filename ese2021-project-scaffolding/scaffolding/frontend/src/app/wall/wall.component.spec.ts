import {WallComponent} from "./wall.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";

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

  describe('isPostsEmpty', () => {
    it('should return true if posts are empty', () => {
      expect(wallComponent.isPostsEmpty).toBeTruthy();
    });
  });
});
