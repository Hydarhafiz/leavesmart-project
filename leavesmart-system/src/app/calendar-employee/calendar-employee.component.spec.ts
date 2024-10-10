import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEmployeeComponent } from './calendar-employee.component';

describe('CalendarEmployeeComponent', () => {
  let component: CalendarEmployeeComponent;
  let fixture: ComponentFixture<CalendarEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
