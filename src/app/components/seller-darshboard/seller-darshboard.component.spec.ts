import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDarshboardComponent } from './seller-darshboard.component';

describe('SellerDarshboardComponent', () => {
  let component: SellerDarshboardComponent;
  let fixture: ComponentFixture<SellerDarshboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDarshboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDarshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
