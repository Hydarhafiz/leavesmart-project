import { TestBed } from '@angular/core/testing';

import { EmployeeLeaveBalanceService } from './employee-leave-balance.service';

describe('EmployeeLeaveBalanceService', () => {
  let service: EmployeeLeaveBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLeaveBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
