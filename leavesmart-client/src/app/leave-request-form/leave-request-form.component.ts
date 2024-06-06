import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILeaveBalance } from '../interface/leave-balance';
import { LeaveBalanceService } from '../services/leave-balance.service';
import { ILeaveRequest } from '../interface/leave-request';
import { LeaveRequestService } from '../services/leave-request.service';
import { StaffService } from '../services/staff.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css'
})
export class LeaveRequestFormComponent implements OnInit{
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();


  leaveRequest: ILeaveRequest = {
    leave_title: '',
    start_date: new Date(),
    end_date: new Date(),
    total_days: 0,
    reason: '',
    manager_comments: '',
    status: 'Pending',
    staff_id: 0, 
    leave_type_id: 0,
    company_id: 0,
  };
  leaveBalances: ILeaveBalance[] = [];
  leaveOptions: { value: number, display: string }[] = []; // Array to store leave options

  constructor(
    private leaveBalanceService: LeaveBalanceService,
    private leaveRequestService: LeaveRequestService,
    private staffService: StaffService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchLeaveBalanceData();
    this.fetchStaffData();
  }

  fetchLeaveBalanceData() {
    this.leaveBalanceService.fetchLeaveBalances().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.leaveBalances = response.data;

          // Create leave options array with value (leave_type_id) and display (leave_name)
          this.leaveOptions = this.leaveBalances.map(balance => {
            return { value: balance.leave_type_id, display: balance.title };
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

  

  fetchStaffData() {
    this.staffService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          const staffData = response.data[0]; // Assuming you only expect one staff member's data
          if (staffData) {
            this.leaveRequest.staff_id = staffData.id; // Set staff_id
            this.leaveRequest.company_id = staffData.company_id; // Set company_id
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
    this.leaveRequest = {
      leave_title: '',
      start_date: new Date(),
      end_date: new Date(),
      total_days: 0,
      reason: '',
      manager_comments: '',
      status: 'Pending',
      staff_id: 0,
      leave_type_id: 0,
      company_id: 0,
    };
  }
  
  submitLeaveRequest() {
    console.log(this.leaveRequest);
    this.leaveRequestService.postLeaveRequest(this.leaveRequest).subscribe(
      (response: any) => {
        console.log('Leave request submitted successfully:', response);
        this.toastr.success(response.message, 'Success');
        this.formSubmitted.emit();
      },
      (error: any) => {
        console.error('Error submitting leave request:', error);
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('An unexpected error occurred', 'Error');
        }
      }
    );
  }
  

  
}
