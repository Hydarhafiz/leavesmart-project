import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestFormEmployeeComponent } from './leave-request-form-employee.component';

describe('LeaveRequestFormEmployeeComponent', () => {
  let component: LeaveRequestFormEmployeeComponent;
  let fixture: ComponentFixture<LeaveRequestFormEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveRequestFormEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestFormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
