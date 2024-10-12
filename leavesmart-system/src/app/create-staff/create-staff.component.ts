import { Component, OnInit } from '@angular/core';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';
import { StaffService } from '../services/staff.service';
import { LocalStorageService } from '../services/local-storage.service';
import { JobPositionService } from '../services/job-position.service';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.css'
})
export class CreateStaffComponent implements OnInit {

  staff: IStaff = {
    username: '',
    gender: '',
    contact_number: '',
    email: '',
    password:'',
    job_position_id: 0,
    admin_id: 0,
    company_id: 0,
    photo_staff: null
  };
  jobPosition: IJobPosition[] = [];
  jobPositionOptions: { value: number, display: string }[] = []; // Array to store leave options

  constructor(
    private staffService: StaffService,
    private jobPositionService: JobPositionService,
    private adminService: AdminService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.fetchJobPositionData();
    this.fetchstaffIdAndCompanyId();
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

  

  fetchstaffIdAndCompanyId() {
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
      username: '',
      gender: '',
      contact_number: '',
      email: '',
      password:'',
      job_position_id: 0,
      admin_id: 0,
      company_id: 0,
      photo_staff: null
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.staff.photo_staff = file;
    }
  }
  
  submitStaff() {

    const formData = new FormData();
      if (this.staff.photo_staff) {
        formData.append('photo_staff', this.staff.photo_staff);
      }
      formData.append('username', this.staff.username);
      formData.append('email', this.staff.email);
      if (this.staff.password !== undefined) {
        formData.append('password', String(this.staff.password));
      }
      formData.append('gender', this.staff.gender);
      formData.append('contact_number', this.staff.contact_number);
      if (this.staff.admin_id !== undefined) {
        formData.append('admin_id', String(this.staff.admin_id));
      }
      if (this.staff.job_position_id !== undefined) {
        formData.append('job_position_id', String(this.staff.job_position_id));
      }
      if (this.staff.company_id !== undefined) {
        formData.append('company_id', String(this.staff.company_id));
      }
    this.staffService.postNewStaff(formData).subscribe(
      (response: any) => {
        console.log('Staff submitted successfully:', response);
        this.toastr.success(response.message , 'Success');

        //this.formSubmitted.emit();

      },
      error => {
        console.error('Error submitting staff:', error);
        this.toastr.error( error.error.error, 'Error');

        // Handle error
      }
    );
  }

}
