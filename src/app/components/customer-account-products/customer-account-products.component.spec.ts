import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountProductsComponent } from './customer-account-products.component';

describe('CustomerAccountProductsComponent', () => {
  let component: CustomerAccountProductsComponent;
  let fixture: ComponentFixture<CustomerAccountProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
