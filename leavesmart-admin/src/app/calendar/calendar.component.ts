import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { LeaveRequestService } from '../services/leave-request.service';
import { ILeaveRequest } from '../interface/leave-request';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  leaveRequests: ILeaveRequest[] = [];
  staffColorMap: Map<number, string> = new Map<number, string>();
  staffLegend: { staffId: number, staffName: string, color: string }[] = [];

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.fetchLeaveRequests().subscribe(
      leaveRequests => {
        this.leaveRequests = leaveRequests;
        this.populateEventsAndLegend();
      },
      error => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

  fetchLeaveRequests(): Observable<ILeaveRequest[]> {
    return this.leaveRequestService.fetchLeaveRequestsCalendar().pipe(
      catchError(error => {
        console.error('Error fetching leave requests:', error);
        return throwError(error);
      })
    );
  }

  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  populateEventsAndLegend(): void {
    const colors = [
      '#1e90ff', '#4caf50', '#ffeb3b', '#ff5722', '#9c27b0',
      '#607d8b', '#e91e63', '#2196f3', '#ff9800', '#8bc34a',
      '#673ab7', '#f44336', '#00bcd4', '#ffeb3b', '#9e9e9e'
    ]; // Define 15 colors
    let index = 0; // Index for accessing colors array
    this.events = this.leaveRequests
      .filter(request => request.status === 'Approved')
      .map(request => {
        const staffId = request.staff.id;
        let color: string = ''; // Initialize color
        if (!this.staffColorMap.has(staffId)) {
          color = colors[index % colors.length];
          this.staffColorMap.set(staffId, color);
          index++;
        } else {
          color = this.staffColorMap.get(staffId)!;
        }
        return {
          start: new Date(request.start_date),
          end: new Date(request.end_date),
          title: `Leave Title: ${request.leave_title}<br>Staff Name: ${request.staff.FullName}<br>Leave Type: ${request.leave_type.leave_name}`,
          color: {
            primary: color,
            secondary: '#D1E8FF'
          }
        };
      });

    // Generate staff legend
    this.staffLegend = Array.from(this.staffColorMap.entries()).map(([staffId, color]) => ({
      staffId,
      staffName: this.getStaffName(staffId),
      color
    }));
  }

  getStaffName(staffId: number): string {
    const staff = this.leaveRequests.find(request => request.staff.id === staffId)?.staff;
    return staff ? staff.FullName : '';
  }
}