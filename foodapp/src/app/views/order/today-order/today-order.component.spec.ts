import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayOrderComponent } from './today-order.component';

describe('TodayOrderComponent', () => {
  let component: TodayOrderComponent;
  let fixture: ComponentFixture<TodayOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
