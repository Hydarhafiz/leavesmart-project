import { Component } from '@angular/core';
import { ILeaveType } from '../interface/leave-type';
import { LeaveTypeService } from '../services/leave-type.service';

@Component({
  selector: 'app-view-leave-types-setting',
  templateUrl: './view-leave-types-setting.component.html',
  styleUrl: './view-leave-types-setting.component.css'
})
export class ViewLeaveTypesSettingComponent {
  

  leaveTypes: ILeaveType[] = [];

  constructor(
    private leaveTypeService: LeaveTypeService
  ) { }

  ngOnInit(): void {
    this.fetchLeaveRequestData();
  }

  fetchLeaveRequestData() {
    this.leaveTypeService.fetchLeaveTypes().subscribe(
      (response: any) => {
        if (response) {
          this.leaveTypes = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching leave types data:', error);
        // Handle error
      }
    );
  }

  createLeaveTypeInNewTab() {
    const editUrl = `/create-new-leave-type`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }
}
