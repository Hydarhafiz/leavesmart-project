import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobPositionByLeaveTypeComponent } from './create-job-position-by-leave-type.component';

describe('CreateJobPositionByLeaveTypeComponent', () => {
  let component: CreateJobPositionByLeaveTypeComponent;
  let fixture: ComponentFixture<CreateJobPositionByLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateJobPositionByLeaveTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateJobPositionByLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
