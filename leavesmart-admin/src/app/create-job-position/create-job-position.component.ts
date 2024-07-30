import { Component, OnInit } from '@angular/core';
import { IJobPosition } from '../interface/job-position';
import { JobPositionService } from '../services/job-position.service';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-job-position',
  templateUrl: './create-job-position.component.html',
  styleUrl: './create-job-position.component.css'
})
export class CreateJobPositionComponent {
  jobPosition!: any;
  jobPositionForm: IJobPosition = {
    position_name: '',
    company_id: 0
  };

  constructor(
    private jobPositionService: JobPositionService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchAdminIdAndCompanyId();
  }

  fetchAdminIdAndCompanyId() {
    this.adminService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          const staffData = response.data[0]; // Assuming you only expect one staff member's data
          if (staffData) {
            this.jobPositionForm.company_id = staffData.company_id; // Set company_id
          } else {
            console.error('Invalid staff data:', response.data);
          }
        } else {
          console.error('Invalid response format or no data:', response);
        }
      },
      error => {
        console.error('Error fetching staff data:', error);
        this.toastr.error('Failed to fetch admin and company details.', 'Error');
      }
    );
  }

  resetForm() {
    this.jobPosition = {
      leave_name: '',
      desc: '',
      company_id: 0
    };
  }
  

  submitJobPositionForm() {
    this.jobPositionService.postNewJobPosition(this.jobPositionForm).subscribe(
      (response: any) => {
        console.log('Job position submitted successfully:', response);
        this.toastr.success('Job position created successfully.', 'Success');
      },
      (error: any) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('An unexpected error occurred', 'Error');
        }
      }
    );
  }
  
}