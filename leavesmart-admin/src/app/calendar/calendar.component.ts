import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ILeaveRequest } from '../interface/leave-request';
import { LeaveRequestService } from '../services/leave-request.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.fetchLeaveRequests();
  }


  fetchLeaveRequests(): void {
    this.leaveRequestService.fetchLeaveRequestsCalendar()
      .subscribe(
        leaveRequests => {
          this.events = leaveRequests.map(request => ({
            start: new Date(request.start_date),
            end: new Date(request.end_date),
            title: request.leave_title,
            color: {
              primary: '#1e90ff',
              secondary: '#D1E8FF'
            }
          }));
        },
        error => {
          console.error('Error fetching leave requests:', error);
        }
      );
  }
}
