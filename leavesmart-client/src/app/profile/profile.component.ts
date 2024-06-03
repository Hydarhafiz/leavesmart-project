import { Component, OnInit } from '@angular/core';
import { IStaff } from '../interface/staff';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  staffList: IStaff[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.staffService.fetchProfile().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.staffList = response.data;
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
  
}
