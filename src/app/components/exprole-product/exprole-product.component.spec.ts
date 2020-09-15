import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproleProductComponent } from './exprole-product.component';

describe('ExproleProductComponent', () => {
  let component: ExproleProductComponent;
  let fixture: ComponentFixture<ExproleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproleProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
