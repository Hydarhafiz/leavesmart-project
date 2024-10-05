import { Component } from '@angular/core';
import { ILeaveType } from '../interface/leave-type';
import { LeaveTypeService } from '../services/leave-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-leave-types-setting',
  templateUrl: './view-leave-types-setting.component.html',
  styleUrl: './view-leave-types-setting.component.css'
})
export class ViewLeaveTypesSettingComponent {
  

  leaveTypes: ILeaveType[] = [];
  leaveTypeToDeleteId: any;

  constructor(
    private leaveTypeService: LeaveTypeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchLeaveTypesData();
  }

  fetchLeaveTypesData() {
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

  editLeaveType(leaveType: ILeaveType) {
    leaveType.editing = true;
  }

  cancelEdit(leaveType: ILeaveType) {
    leaveType.editing = false;
    // Optionally reset the changes
    this.fetchLeaveTypesData(); 
  }

  confirmEdit(leaveType: ILeaveType) {
    this.leaveTypeService.editLeaveType(leaveType.id, leaveType).subscribe(
      (response: ILeaveType) => {
        console.log('Leave type updated successfully:', response);
        leaveType.editing = false;
        this.fetchLeaveTypesData(); // Optionally refresh the list
      },
      error => {
        console.error('Error updating leave type:', error);
      }
    );
  }

  openDeleteModal(content: any, leaveTypeId: any) {
    this.leaveTypeToDeleteId = leaveTypeId;
    this.modalService.open(content, { ariaLabelledBy: 'deleteModalLabel' });
  }

  confirmDelete() {
    if (this.leaveTypeToDeleteId !== null) {
      this.leaveTypeService.deleteLeaveTypeById(this.leaveTypeToDeleteId).subscribe(
        (response: any) => {
          console.log('Staff member deleted successfully:', response);
          this.fetchLeaveTypesData();
          this.modalService.dismissAll();
        },
        error => {
          console.error('Error deleting staff member:', error);
        }
      );
    }
  }

  createLeaveTypeInNewTab() {
    const editUrl = `/create-new-leave-type`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }
}
