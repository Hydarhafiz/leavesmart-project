import { Component, OnInit } from '@angular/core';
import { IAdmin } from '../interface/admin';
import { AdminService } from '../services/admin.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit {
  adminProfile: any;
  adminPhoto: any;

  constructor(private adminService: AdminService, private location: Location) { }

  ngOnInit(): void {
    this.fetchAdminData();
  }

  fetchAdminData() {
    this.adminService.fetchProfile().subscribe(
      (response: any) => {
        if (response) {
          this.adminProfile = response.data;
          console.log(this.adminProfile[0].photo_admin)

          if (this.adminProfile[0].photo_admin) {
            this.adminPhoto = this.adminService.getAttachmentUrl(this.adminProfile[0].photo_admin);
            console.log(this.adminPhoto)
          }
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

  editLeaveRequestInNewTab() {
    const baseUrl = this.location.prepareExternalUrl('');
    const editUrl = `${baseUrl}edit-profile`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }
}
