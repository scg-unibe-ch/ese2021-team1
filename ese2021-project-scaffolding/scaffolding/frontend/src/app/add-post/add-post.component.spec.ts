import {AddPostComponent} from "./add-post.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Add Post Components', () => {
  let addPostComponent: AddPostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AddPostComponent]
    });

    addPostComponent = TestBed.get(AddPostComponent);
  });
  it('should be created', () => {
    expect(addPostComponent).toBeTruthy();
  });
});
