import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceEmployeeComponent } from './leave-balance-employee.component';

describe('LeaveBalanceEmployeeComponent', () => {
  let component: LeaveBalanceEmployeeComponent;
  let fixture: ComponentFixture<LeaveBalanceEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveBalanceEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
