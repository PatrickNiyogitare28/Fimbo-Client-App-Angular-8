import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPopUpComponent } from './logout-pop-up.component';

describe('LogoutPopUpComponent', () => {
  let component: LogoutPopUpComponent;
  let fixture: ComponentFixture<LogoutPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
