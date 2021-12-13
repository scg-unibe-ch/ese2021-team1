import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PReviewComponent } from './p-review.component';

describe('PReviewComponent', () => {
  let component: PReviewComponent;
  let fixture: ComponentFixture<PReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
