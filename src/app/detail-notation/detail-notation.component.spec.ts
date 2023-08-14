import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNotationComponent } from './detail-notation.component';

describe('DetailNotationComponent', () => {
  let component: DetailNotationComponent;
  let fixture: ComponentFixture<DetailNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailNotationComponent]
    });
    fixture = TestBed.createComponent(DetailNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
