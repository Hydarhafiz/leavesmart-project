import { Component, EventEmitter, Output } from '@angular/core';
import { ILeaveRequest } from '../employee-interface/leave-request';
import { ILeaveBalance } from '../employee-interface/leave-balance';
import { EmployeeLeaveBalanceService } from '../services/employee-leave-balance.service';
import { EmployeeLeaveRequestService } from '../services/employee-leave-request.service';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-request-form-employee',
  templateUrl: './leave-request-form-employee.component.html',
  styleUrl: './leave-request-form-employee.component.css'
})
export class LeaveRequestFormEmployeeComponent {
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
    admin_id: 0,
    company_id: 0,
    attachment: null
  };
  leaveBalances: ILeaveBalance[] = [];
  leaveOptions: { value: number, display: any }[] = [];

  constructor(
    private leaveBalanceService: EmployeeLeaveBalanceService,
    private leaveRequestService: EmployeeLeaveRequestService,
    private staffService: EmployeeService,
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
          this.leaveOptions = this.leaveBalances.map(balance => {
            return { value: balance.leave_type_id, display: balance.leave_type?.leave_name };
          });
          console.log(this.leaveOptions)
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching leave balances:', error);
      }
    );
  }

  fetchStaffData() {
    this.staffService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          const staffData = response.data[0];
          if (staffData) {
            this.leaveRequest.staff_id = staffData.id;
            this.leaveRequest.company_id = staffData.company_id;
            this.leaveRequest.admin_id = staffData.admin_id;
          } else {
            console.error('Invalid staff data:', response.data);
          }
        } else {
          console.error('Invalid response format or no data:', response);
        }
      },
      error => {
        console.error('Error fetching staff data:', error);
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
      admin_id: 0,
      company_id: 0,
      attachment: null
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.leaveRequest.attachment = file;
    }
  }

  submitLeaveRequest() {
    const startDate = this.formatDate(this.leaveRequest.start_date);
    const endDate = this.formatDate(this.leaveRequest.end_date);

    const formData = new FormData();
    if (this.leaveRequest.attachment) {
      formData.append('attachment', this.leaveRequest.attachment);
    }
    formData.append('leave_title', this.leaveRequest.leave_title);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('total_days', this.leaveRequest.total_days.toString());
    formData.append('reason', this.leaveRequest.reason);
    formData.append('manager_comments', this.leaveRequest.manager_comments);
    formData.append('status', this.leaveRequest.status);
    formData.append('staff_id', this.leaveRequest.staff_id.toString());
    formData.append('leave_type_id', this.leaveRequest.leave_type_id.toString());
    formData.append('admin_id', this.leaveRequest.admin_id.toString());
    formData.append('company_id', this.leaveRequest.company_id.toString());

    this.leaveRequestService.postLeaveRequest(formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Success');
        this.formSubmitted.emit();
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

private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
}
