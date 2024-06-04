import { TestBed } from '@angular/core/testing';

import { JobPositionLeaveTypeService } from './job-position-leave-type.service';

describe('JobPositionLeaveTypeService', () => {
  let service: JobPositionLeaveTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPositionLeaveTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
