import { TestBed } from '@angular/core/testing';

import { EmployeeLogoutService } from './employee-logout.service';

describe('EmployeeLogoutService', () => {
  let service: EmployeeLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
