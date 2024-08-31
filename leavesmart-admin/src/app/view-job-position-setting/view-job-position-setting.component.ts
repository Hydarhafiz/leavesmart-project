import { Component, OnInit } from '@angular/core';
import { IJobPosition } from '../interface/job-position';
import { JobPositionService } from '../services/job-position.service';
import { IJobPositionLeaveType } from '../interface/job-position-leave-type';
import { JobPositionLeaveTypeService } from '../services/job-position-leave-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-job-position-setting',
  templateUrl: './view-job-position-setting.component.html',
  styleUrl: './view-job-position-setting.component.css'
})
export class ViewJobPositionSettingComponent implements OnInit {
  selectedJobPositionId!: number;
  jobPositions: any[] = [];
  jobPositionByLeaveTypes: any[] = [];
  leaveTypeToDeleteId: any;

  constructor(
    private jobPositionService: JobPositionService,
    private jobPositionLeaveTypeService: JobPositionLeaveTypeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchJobPositionData();
  }

  fetchJobPositionData() {
    this.jobPositionService.fetchJobPosition().subscribe(
      (response: any) => {
        if (response) {
          this.jobPositions = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching job position data:', error);
      }
    );
  }

  getLeaveTypes(jobPositionId: number) {
    this.selectedJobPositionId = jobPositionId;
    if (this.selectedJobPositionId) {
      this.jobPositionLeaveTypeService.fetchJobPositionByLeaveTypes(this.selectedJobPositionId).subscribe(
        (response: any) => {
          if (response) {
            this.jobPositionByLeaveTypes = response.data;
            console.log(this.jobPositions[0].position_name)
            console.log(this.selectedJobPositionId)
          } else {
            console.error('Invalid response format:', response);
          }
        },
        (error) => {
          console.error('Error fetching job position leave types data:', error);
        }
      );
    }
  }

  editJobPosition(jobPosition: any) {
    jobPosition.editing = true;
  }

  confirmEdit(jobPosition: any) {
    jobPosition.editing = false;
    this.jobPositionLeaveTypeService.editJobPositionLeaveType(jobPosition.id, jobPosition).subscribe(
      (response: any) => {
        console.log('Leave type updated successfully:', response);
        jobPosition.editing = false;
        this.getLeaveTypes(jobPosition.job_position_id); // Optionally refresh the list
      },
      (error) => {
        console.error('Error updating leave type for this job position:', error);
      }
    );
  }

  cancelEdit(jobPosition: any) {
    jobPosition.editing = false;
    this.getLeaveTypes(jobPosition.job_position_id);
  }

  increaseDays(jobPosition: any) {
    jobPosition.max_allowed_days++;
  }

  decreaseDays(jobPosition: any) {
    if (jobPosition.max_allowed_days > 0) {
      jobPosition.max_allowed_days--;
    }
  }

  openDeleteLeaveTypeModal(content: any, leaveTypeId: any) {
    this.leaveTypeToDeleteId = leaveTypeId;
    this.modalService.open(content, { ariaLabelledBy: 'deleteLeaveTypeModalLabel' });
  }

  openDeleteJobPositionModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'deleteJobPositionModalLabel' });
  }

  confirmDeleteLeaveType() {
    if (this.leaveTypeToDeleteId !== null) {
      this.jobPositionLeaveTypeService.deleteJobPositionLeaveType(this.leaveTypeToDeleteId).subscribe(
        (response: any) => {
          console.log('Leave type deleted successfully:', response);
          this.getLeaveTypes(this.selectedJobPositionId);
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error deleting leave type:', error);
        }
      );
    }
  }

  confirmDeleteJobPosition() {
    if (this.selectedJobPositionId !== null) {
      this.jobPositionService.deleteJobPosition(this.selectedJobPositionId).subscribe(
        (response: any) => {
          console.log('Job position deleted successfully:', response);
          this.fetchJobPositionData();
          this.selectedJobPositionId = 0;
          this.jobPositionByLeaveTypes = [];
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error deleting job position:', error);
        }
      );
    }
  }

  CreateJobPositionNewTab() {
    const editUrl = `/create-new-job-position`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }

  CreateJobPositionByLeaveTypeNewTab() {
    const editUrl = `/create-new-job-position-by-leave-type`; // Adjust the URL as per your routing configuration
    window.open(editUrl, '_blank'); // Open URL in a new tab
  }
}


