import { Component, OnInit } from '@angular/core';
import { IJobPosition } from '../interface/job-position';
import { JobPositionService } from '../services/job-position.service';
import { IJobPositionLeaveType } from '../interface/job-position-leave-type';
import { JobPositionLeaveTypeService } from '../services/job-position-leave-type.service';

@Component({
  selector: 'app-view-job-position-setting',
  templateUrl: './view-job-position-setting.component.html',
  styleUrl: './view-job-position-setting.component.css'
})
export class ViewJobPositionSettingComponent implements OnInit {
  selectedJobPositionId: number | undefined;
  jobPositions: any;
  jobPositionByLeaveTypes: any;

  constructor(
    private jobPositionService: JobPositionService,
    private jobPositionLeaveTypeService: JobPositionLeaveTypeService
  ) { }

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
      error => {
        console.error('Error fetching job position data:', error);
        // Handle error
      }
    );
  }

  updateLeaveTypes(jobPositionId: number) {
    this.selectedJobPositionId = jobPositionId;
    if (this.selectedJobPositionId) {
      // Fetch leave types based on the selected job position ID
      this.jobPositionLeaveTypeService.fetchJobPositionByLeaveTypes(this.selectedJobPositionId).subscribe(
        (response: any) => {
          if (response) {
            this.jobPositionByLeaveTypes = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching job position leave types data:', error);
          // Handle error
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
