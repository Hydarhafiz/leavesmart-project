import { Component } from '@angular/core';
import { IJobPosition } from '../interface/job-position';
import { JobPositionService } from '../services/job-position.service';
import { AdminService } from '../services/admin.service';

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
    private adminService: AdminService
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
        // Handle error
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
  
  submitjobPositionForm() {
    //console.log(this.staff)
    this.jobPositionService.postNewjobPosition(this.jobPositionForm).subscribe(
      (response: any) => {
        console.log('Job position submitted successfully:', response);
        //this.formSubmitted.emit();

      },
      error => {
        console.error('Error submitting staff:', error);
        // Handle error
      }
    );
  }
}
