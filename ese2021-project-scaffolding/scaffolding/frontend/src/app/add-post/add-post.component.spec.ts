import {AddPostComponent} from "./add-post.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";

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

  describe('checkValidPost', () => {
    it('should check for missing title', () => {
      addPostComponent.newPost = {
        title: "",
        content: "For the Test",
        image: null,
        labels: "Bitcoin",
        userName: "Tester"
      }
      addPostComponent.checkValidPost();
      expect(addPostComponent.createPostFeedback.title).toEqual("Please enter a title");
      expect(addPostComponent.checkValidPost()).toBeFalsy();
    });

    it('should check for missing text or image', () => {
      addPostComponent.category = "Bitcoin";
      addPostComponent.newPost = {
        title: "Test",
        content: "",
        image: null,
        labels: "Bitcoin",
        userName: "Tester"
      }
      addPostComponent.checkValidPost();
      expect(addPostComponent.createPostFeedback.content).toEqual("Please enter a text or an image.");
      expect(addPostComponent.checkValidPost()).toBeFalsy();
    });

    it('should check for missing category', () => {
      addPostComponent.newPost = {
        title: "Test",
        content: "For the Test",
        image: null,
        labels: "Bitcoin",
        userName: "Tester"
      }
      addPostComponent.checkValidPost();
      expect(addPostComponent.createPostFeedback.content).toEqual("Please enter a category.");
      expect(addPostComponent.checkValidPost()).toBeFalsy();
    });



    it('should check for Valid Post', () => {
      addPostComponent.newPost = {
        title: "Test",
        content: "For the Test",
        image: null,
        labels: "Bitcoin",
        userName: "Tester"
      }
      expect(addPostComponent.checkValidPost).toBeTruthy();
    });


  });
});
