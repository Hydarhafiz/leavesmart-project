import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../services/leave-request.service';

@Component({
  selector: 'app-view-leave-request-manager',
  templateUrl: './view-leave-request-manager.component.html',
  styleUrl: './view-leave-request-manager.component.css'
})
export class ViewLeaveRequestManagerComponent implements OnInit{
  leaveRequests: any;

  constructor(
    private leaveRequestService: LeaveRequestService,
  ) { }

  ngOnInit(): void {
    this.fetchLeaveRequestData();
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

  fetchLeaveRequestData() {
    this.leaveRequestService.fetchLeaveRequests().subscribe(
      (response: any) => {
        if (response) {
          this.leaveRequests = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching leave request data:', error);
        // Handle error
      }
    );
  }

  editLeaveRequestInNewTab(id: number) {
    const editUrl = `/view-leave-request/${id}`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }

  
}
