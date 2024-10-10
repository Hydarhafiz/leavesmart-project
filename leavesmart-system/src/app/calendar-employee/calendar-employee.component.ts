import { Component } from '@angular/core';
import { EmployeeLeaveRequestService } from '../services/employee-leave-request.service';

@Component({
  selector: 'app-calendar-employee',
  templateUrl: './calendar-employee.component.html',
  styleUrl: './calendar-employee.component.css'
})
export class CalendarEmployeeComponent {

  viewDate: Date = new Date();
  events: any[] = []; // Initialize events array

  constructor(private leaveRequestService: EmployeeLeaveRequestService) {}

  ngOnInit(): void {
    this.fetchLeaveRequests(); // Fetch leave requests data on component initialization
  }

  fetchLeaveRequests() {
    this.leaveRequestService.fetchLeaveRequests().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.events = this.mapLeaveRequestsToEvents(response.data); // Map leave requests to events
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

  mapLeaveRequestsToEvents(leaveRequests: any[]): any[] {
    return leaveRequests
      .filter(request => request.status === 'Approved') // Filter leave requests by status
      .map(request => ({
        start: new Date(request.start_date), // Convert start_date to Date object
        end: new Date(request.end_date), // Convert end_date to Date object

        title: `Leave Title: ${request.leave_title}<br>Leave Name: ${request.leave_type.leave_name}<br>Total Days: ${request.total_days}`, // Event title
        color: {
          primary: '#1e90ff', // Primary color
          secondary: '#D1E8FF' // Secondary color
        }
      }));
  }

  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.fetchLeaveRequests(); // Fetch leave requests data for the new month
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.fetchLeaveRequests(); // Fetch leave requests data for the new month
  }
  
}
