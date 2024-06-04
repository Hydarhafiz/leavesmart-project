import { Component, OnInit } from '@angular/core';
import { IAdmin } from '../interface/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit {
  adminProfile: IAdmin[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.adminService.fetchProfile().subscribe(
      (response: any) => {
        if (response) {
          this.adminProfile = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching profile data:', error);
        // Handle error
      }
    );
  }
}
