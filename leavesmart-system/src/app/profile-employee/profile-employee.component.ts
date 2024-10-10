import { Component } from '@angular/core';
import { IStaff } from '../employee-interface/staff';
import { EmployeeService } from '../services/employee.service';
import { Router } from 'express';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrl: './profile-employee.component.css'
})
export class ProfileEmployeeComponent {
  staffList: IStaff[] = [];
  staffPhoto: any;

  constructor(
    private staffService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.fetchStaffData();
  }


  fetchStaffData() {
    this.staffService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.staffList = response.data;
          if (this.staffList[0].photo_staff) {
            this.staffPhoto = this.staffService.getAttachmentUrl(this.staffList[0].photo_staff);
            console.log(this.staffPhoto)
          }
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching staff data:', error);
        // Handle error
      }
    );
  }

  editLeaveRequestInNewTab() {
    const editUrl = `/edit-profile`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }
}
