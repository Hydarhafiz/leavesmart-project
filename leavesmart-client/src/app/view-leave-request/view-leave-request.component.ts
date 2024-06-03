import { Component } from '@angular/core';
import { ILeaveRequest } from '../interface/leave-request';
import { LeaveRequestService } from '../services/leave-request.service';

@Component({
  selector: 'app-view-leave-request',
  templateUrl: './view-leave-request.component.html',
  styleUrl: './view-leave-request.component.css'
})
export class ViewLeaveRequestComponent {

  leaveRequests: ILeaveRequest[] = [];

  constructor(private leaveRequestService: LeaveRequestService) { }

  ngOnInit(): void {
    this.fetchLeaveBalanceData();
  }

  fetchLeaveBalanceData() {
    this.leaveRequestService.fetchLeaveRequests().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.leaveRequests = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching leave requests data:', error);
        // Handle error
      }
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return '#04EC1B';
      case 'Pending':
        return '#ECD504';
      case 'Rejected':
        return '#EC0404';
      default:
        return '#000'; // default color if status not recognized
    }
  }
}
