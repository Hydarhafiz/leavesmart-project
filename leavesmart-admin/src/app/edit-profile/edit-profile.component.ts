import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { IAdmin } from '../interface/admin';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  adminProfile: any = {};
  updatedAdminProfile: IAdmin = {
    username: '',
    email: '',
    password: '',
    gender: '',
    contact_number: '',
    company_id: 0,
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.adminService.fetchProfile().subscribe(
      (response: any) => {
        const adminData = response.data[0]; // Access the first element of the array
        this.adminProfile = adminData;
        this.updatedAdminProfile = {
          username: adminData.username,
          email: adminData.email,
          gender: adminData.gender,
          contact_number: adminData.contact_number,
          company_id: adminData.company_id,
          password: adminData.password
        };
        console.log(this.updatedAdminProfile)
      },
      error => {
        console.error('Error fetching profile data:', error);
        // Handle error
      }
    );
  }

  onSubmit() {
    // Call the editProfile service method with updated profile data
    this.adminService.editProfile(this.updatedAdminProfile).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Profile updated successfully:', response);
      },
      error => {
        // Handle error
        console.error('Error updating profile:', error);
        // You may want to display an error message to the user
      }
    );
  }
}
