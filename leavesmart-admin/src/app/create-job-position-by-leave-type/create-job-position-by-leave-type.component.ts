import { Component } from '@angular/core';
import { IJobPositionLeaveType } from '../interface/job-position-leave-type';
import { AdminService } from '../services/admin.service';
import { JobPositionService } from '../services/job-position.service';
import { JobPositionLeaveTypeService } from '../services/job-position-leave-type.service';
import { LeaveTypeService } from '../services/leave-type.service';
import { ILeaveType } from '../interface/leave-type';
import { IJobPosition } from '../interface/job-position';

@Component({
  selector: 'app-create-job-position-by-leave-type',
  templateUrl: './create-job-position-by-leave-type.component.html',
  styleUrl: './create-job-position-by-leave-type.component.css'
})
export class CreateJobPositionByLeaveTypeComponent {
  jobPositionByLeaveTypesForm: IJobPositionLeaveType = {
    job_position_id: 0,
    leave_type_id: 0,
    max_allowed_days: 0,
    company_id: 0,
  };

  leaveTypes: ILeaveType[] = [];
  leaveTypesOptions: { value: number, display: string }[] = []; // Array to store leave options
  jobPosition: IJobPosition[] = [];
  jobPositionOptions: { value: number, display: string }[] = []; // Array to store leave options

  constructor(
    private leaveTypeService: LeaveTypeService,
    private jobPositionService: JobPositionService,
    private jobPositionByLeaveTypesService: JobPositionLeaveTypeService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.fetchAdminIdAndCompanyId();
    this.fetchJobPositionData();
    this.fetchLeaveTypesData();
  }

  fetchJobPositionData() {
    this.jobPositionService.fetchJobPosition().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.jobPosition = response.data;

          // Create leave options array with value (leave_type_id) and display (leave_name)
          this.jobPositionOptions = this.jobPosition.map(jobPosition => {
            if (jobPosition.id !== undefined) {
              return { value: jobPosition.id, display: jobPosition.position_name };
            } else {
              // handle the case where id is undefined, maybe log an error or handle it differently
              return { value: 0, display: 'Undefined Position' }; // Default value for example
            }
          });
          
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching leave balances:', error);
        // Handle error
      }
    );
  }
  
  fetchLeaveTypesData() {
    this.leaveTypeService.fetchLeaveTypes().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.leaveTypes = response.data;

          // Create leave options array with value (leave_type_id) and display (leave_name)
          this.leaveTypesOptions = this.leaveTypes.map(leaveTypes => {
            if (leaveTypes.id !== undefined) {
              return { value: leaveTypes.id, display: leaveTypes.leave_name };
            } else {
              // handle the case where id is undefined, maybe log an error or handle it differently
              return { value: 0, display: 'Undefined name' }; // Default value for example
            }
          });
          
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching leave types:', error);
        // Handle error
      }
    );
  }

  fetchAdminIdAndCompanyId() {
    this.adminService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          const staffData = response.data[0]; // Assuming you only expect one staff member's data
          if (staffData) {
            this.jobPositionByLeaveTypesForm.company_id = staffData.company_id; // Set company_id
          } else {
            console.error('Invalid staff data:', response.data);
          }
        } else {
          console.error('Invalid response format or no data:', response);
        }
      },
      error => {
        console.error('Error fetching staff data:', error);
        // Handle error
      }
    );
  }

  resetForm() {
    this.jobPositionByLeaveTypesForm = {
      job_position_id: 0,
      leave_type_id: 0,
      max_allowed_days: 0,
      company_id: 0,
    };
  }
  
  submitjobPositionByLeaveTypesForm() {
    //console.log(this.staff)
    this.jobPositionByLeaveTypesService.postNewjobPositionByLeaveType(this.jobPositionByLeaveTypesForm).subscribe(
      (response: any) => {
        console.log('Job position for this leave type submitted successfully:', response);
        //this.formSubmitted.emit();

      },
      error => {
        console.error('Error submitting these data:', error);
        // Handle error
      }
    );
  }
}
