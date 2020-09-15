import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccounCartComponent } from './customer-accoun-cart.component';

describe('CustomerAccounCartComponent', () => {
  let component: CustomerAccounCartComponent;
  let fixture: ComponentFixture<CustomerAccounCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccounCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccounCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
