import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessProductAddedComponent } from './success-product-added.component';

describe('SuccessProductAddedComponent', () => {
  let component: SuccessProductAddedComponent;
  let fixture: ComponentFixture<SuccessProductAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessProductAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessProductAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
