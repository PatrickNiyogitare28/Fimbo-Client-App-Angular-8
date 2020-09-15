import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDaashboardComponent } from './user-daashboard.component';

describe('UserDaashboardComponent', () => {
  let component: UserDaashboardComponent;
  let fixture: ComponentFixture<UserDaashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDaashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDaashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
