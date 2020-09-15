import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarySlideComponent } from './primary-slide.component';

describe('PrimarySlideComponent', () => {
  let component: PrimarySlideComponent;
  let fixture: ComponentFixture<PrimarySlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimarySlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimarySlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
