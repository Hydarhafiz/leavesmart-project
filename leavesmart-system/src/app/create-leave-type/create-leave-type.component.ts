import { Component, OnInit } from '@angular/core';
import { ILeaveType } from '../interface/leave-type';
import { LeaveTypeService } from '../services/leave-type.service';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-leave-type',
  templateUrl: './create-leave-type.component.html',
  styleUrl: './create-leave-type.component.css'
})
export class CreateLeaveTypeComponent implements OnInit {
  leaveType!: any;
  leaveTypeForm: ILeaveType = {
    leave_name: '',
    desc: '',
    company_id: 0
  };

  constructor(
    private leaveTypeService: LeaveTypeService,
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
            this.leaveTypeForm.company_id = staffData.company_id; // Set company_id
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
    this.leaveType = {
      leave_name: '',
      desc: '',
      company_id: 0
    };
  }
  
  submitLeaveTypeForm() {
    //console.log(this.staff)
    this.leaveTypeService.postNewLeaveType(this.leaveTypeForm).subscribe(
      (response: any) => {
        console.log('Staff submitted successfully:', response);
        this.toastr.success('Leave type created successfully.', 'Success');

        //this.formSubmitted.emit();

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
