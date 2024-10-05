import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';
import { StaffService } from '../services/staff.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-staff-manager',
  templateUrl: './view-staff-manager.component.html',
  styleUrl: './view-staff-manager.component.css'
})
export class ViewStaffManagerComponent implements AfterViewInit {

  staffList: IStaff[] = [];
  staffToDeleteId: number | null = null;

  constructor(private staffService: StaffService, private modalService: NgbModal) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.staffService.fetchStaffs().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.staffList = response.data;
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
    const editUrl = `/view-staff-manager/${id}`;
    window.open(editUrl, '_blank');
  }

  getPhotoUrl(filename: any): string {
    return this.staffService.getAttachmentUrl(filename);
  }

  openDeleteModal(content: any, staffId: any) {
    this.staffToDeleteId = staffId;
    this.modalService.open(content, { ariaLabelledBy: 'deleteModalLabel' });
  }

  confirmDelete() {
    if (this.staffToDeleteId !== null) {
      this.staffService.deleteStaffById(this.staffToDeleteId).subscribe(
        (response: any) => {
          console.log('Staff member deleted successfully:', response);
          this.fetchStaffData();
          this.modalService.dismissAll();
        },
        error => {
          console.error('Error deleting staff member:', error);
        }
      );
    }
  }
}




//   jobPositions: IJobPosition[] = [
//     { position_name: 'Developer', company_id: 1},
//     { position_name: 'Designer', company_id: 1 },
//     // Add more job positions as needed
// ];