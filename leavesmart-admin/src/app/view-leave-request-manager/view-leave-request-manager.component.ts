import { Component } from '@angular/core';
import { ILeaveRequest } from '../interface/leave-request';

@Component({
  selector: 'app-view-leave-request-manager',
  templateUrl: './view-leave-request-manager.component.html',
  styleUrl: './view-leave-request-manager.component.css'
})
export class ViewLeaveRequestManagerComponent {


  leaveRequests: ILeaveRequest[] = [
    {
      leave_title: 'Vacation',
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-06-05'),
      total_days: 4,
      manager_comments: "string",
      status: 'Pending',
      staff_id: 1,
      leave_type_id: 1,
      company_id: 1,
    },
    {
      leave_title: 'Vacation',
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-06-05'),
      total_days: 4,
      manager_comments: "string",
      status: 'Approved',
      staff_id: 1,
      leave_type_id: 1,
      company_id: 1
    },
    // Add more leave requests as needed
  ];

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
