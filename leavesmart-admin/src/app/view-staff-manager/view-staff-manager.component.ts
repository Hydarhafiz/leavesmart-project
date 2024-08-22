import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-view-staff-manager',
  templateUrl: './view-staff-manager.component.html',
  styleUrl: './view-staff-manager.component.css'
})
export class ViewStaffManagerComponent implements AfterViewInit {

  staffList: IStaff[] = [];
  staffPhotos: string[] = []; // Array to hold photo URLs

  constructor(private staffService: StaffService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.staffService.fetchStaffs().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.staffList = response.data;
          this.staffList.forEach(staff => {
            if (staff.photo_staff) {
              const photoUrl = this.staffService.getAttachmentUrl(staff.photo_staff);
              this.staffPhotos.push(photoUrl);
            }
            console.log(this.staffPhotos);
          });
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching staff data:', error);
      }
    );
  }

  editStaffInNewTab(id: any) {
    const editUrl = `/view-staff-manager/${id}`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }

  getPhotoUrl(filename: any): string {
    return this.staffService.getAttachmentUrl(filename); // Implement this method in your StaffService
  }

  deleteStaff(id: any) {
    this.staffService.deleteStaffById(id).subscribe(
      (response: any) => {
        console.log('Staff member deleted successfully:', response);
        this.fetchStaffData();
      },
      error => {
        console.error('Error deleting staff member:', error);
      }
    );
  }
}




//   jobPositions: IJobPosition[] = [
//     { position_name: 'Developer', company_id: 1},
//     { position_name: 'Designer', company_id: 1 },
//     // Add more job positions as needed
// ];