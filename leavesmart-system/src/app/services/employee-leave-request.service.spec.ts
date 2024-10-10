import { TestBed } from '@angular/core/testing';

import { EmployeeLeaveRequestService } from './employee-leave-request.service';

describe('EmployeeLeaveRequestService', () => {
  let service: EmployeeLeaveRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLeaveRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
