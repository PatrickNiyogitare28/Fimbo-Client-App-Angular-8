import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountVendorProgressComponent } from './customer-account-vendor-progress.component';

describe('CustomerAccountVendorProgressComponent', () => {
  let component: CustomerAccountVendorProgressComponent;
  let fixture: ComponentFixture<CustomerAccountVendorProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountVendorProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountVendorProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
