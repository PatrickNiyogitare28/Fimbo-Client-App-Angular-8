import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountVendorProfileComponent } from './customer-account-vendor-profile.component';

describe('CustomerAccountVendorProfileComponent', () => {
  let component: CustomerAccountVendorProfileComponent;
  let fixture: ComponentFixture<CustomerAccountVendorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountVendorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountVendorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
