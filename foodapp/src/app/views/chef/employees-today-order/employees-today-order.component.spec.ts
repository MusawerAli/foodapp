import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTodayOrderComponent } from './employees-today-order.component';

describe('EmployeesTodayOrderComponent', () => {
  let component: EmployeesTodayOrderComponent;
  let fixture: ComponentFixture<EmployeesTodayOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesTodayOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTodayOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
