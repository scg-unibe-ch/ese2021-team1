import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

describe('App Components', () => {
  let appComponents: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppComponent]
    });

    appComponents = TestBed.get(AppComponent);
  });

  it('should create the app', () => {
    expect(appComponents).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    expect(appComponents.title).toEqual('frontend');
  });
});
