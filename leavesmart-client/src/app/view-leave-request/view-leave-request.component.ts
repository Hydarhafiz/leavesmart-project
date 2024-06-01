import { Component } from '@angular/core';

@Component({
  selector: 'app-view-leave-request',
  templateUrl: './view-leave-request.component.html',
  styleUrl: './view-leave-request.component.css'
})
export class ViewLeaveRequestComponent {
  leaveRequests = [
    {
      leaveReason: "Vacation",
      leaveType: "Paid Time Off",
      dates: "01 July 2023 - 04 July 2023",
      totalLeaveDays: 4,
      managerComments: "Approved",
      status: "Approved"
    },
    {
      leaveReason: "Sick Leave",
      leaveType: "Medical",
      dates: "10 September 2023 - 12 September 2023",
      totalLeaveDays: 3,
      managerComments: "",
      status: "Pending"
    },
    {
      leaveReason: "Family Emergency",
      leaveType: "Emergency",
      dates: "25 November 2023 - 27 November 2023",
      totalLeaveDays: 3,
      managerComments: "Teruk",
      status: "Rejected"

    }
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
