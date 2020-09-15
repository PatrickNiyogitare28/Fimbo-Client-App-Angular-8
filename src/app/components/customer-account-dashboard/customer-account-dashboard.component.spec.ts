import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountDashboardComponent } from './customer-account-dashboard.component';

describe('CustomerAccountDashboardComponent', () => {
  let component: CustomerAccountDashboardComponent;
  let fixture: ComponentFixture<CustomerAccountDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
