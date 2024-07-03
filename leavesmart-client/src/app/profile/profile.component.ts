import { Component, OnInit } from '@angular/core';
import { IStaff } from '../interface/staff';
import { StaffService } from '../services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  staffList: IStaff[] = [];
  staffPhoto: any;

  constructor(
    private staffService: StaffService,
    private router: Router
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
