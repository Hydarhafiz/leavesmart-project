import { Component, OnInit } from '@angular/core';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';
import { StaffService } from '../services/staff.service';
import { LocalStorageService } from '../services/local-storage.service';
import { JobPositionService } from '../services/job-position.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.css'
})
export class CreateStaffComponent implements OnInit {

  staff: IStaff = {
    FullName: '',
    gender: '',
    contact_number: '',
    email: '',
    password:'',
    job_position_id: 0,
    admin_id: 0,
    company_id: 0,
  };
  jobPosition: IJobPosition[] = [];
  jobPositionOptions: { value: number, display: string }[] = []; // Array to store leave options

  constructor(
    private staffService: StaffService,
    private jobPositionService: JobPositionService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.fetchJobPositionData();
    this.fetchAdminIdAndCompanyId();
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

  

  fetchAdminIdAndCompanyId() {
    this.adminService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          const staffData = response.data[0]; // Assuming you only expect one staff member's data
          if (staffData) {
            this.staff.admin_id = staffData.id; // Set staff_id
            this.staff.company_id = staffData.company_id; // Set company_id
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
    this.staff = {
      FullName: '',
      gender: '',
      contact_number: '',
      email: '',
      password:'',
      job_position_id: 0,
      admin_id: 0,
      company_id: 0,
    };
  }
  
  submitStaff() {
    console.log(this.staff)
    this.staffService.postNewStaff(this.staff).subscribe(
      (response: any) => {
        console.log('Staff submitted successfully:', response);
        //this.formSubmitted.emit();

      },
      error => {
        console.error('Error submitting staff:', error);
        // Handle error
      }
    );
  }

}
