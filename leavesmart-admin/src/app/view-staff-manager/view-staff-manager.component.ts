import { Component } from '@angular/core';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-view-staff-manager',
  templateUrl: './view-staff-manager.component.html',
  styleUrl: './view-staff-manager.component.css'
})
export class ViewStaffManagerComponent {
  
  staffList: IStaff[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.staffService.fetchStaffs().subscribe(
      (response: any) => {
        if (response) {
          this.staffList = response.data;
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

  editStaffInNewTab(id: any) {
    const editUrl = `/view-staff-manager/${id}`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }
}


//   jobPositions: IJobPosition[] = [
//     { position_name: 'Developer', company_id: 1},
//     { position_name: 'Designer', company_id: 1 },
//     // Add more job positions as needed
// ];