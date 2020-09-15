import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorApplicationComponent } from './vendor-application.component';

describe('VendorApplicationComponent', () => {
  let component: VendorApplicationComponent;
  let fixture: ComponentFixture<VendorApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
