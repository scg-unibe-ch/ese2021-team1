import {PostComponent} from "./post.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Post Componennts', () => {
  let postComponent: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PostComponent]
    });

    postComponent = TestBed.get(PostComponent);
  });

  it('should be created', () => {
    expect(postComponent).toBeTruthy();
  });


});
