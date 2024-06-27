import { Component } from '@angular/core';
import { ILeaveRequest } from '../interface/leave-request';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '../services/leave-request.service';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';
import { ILeaveType } from '../interface/leave-type';

@Component({
  selector: 'app-view-leave-request-by-id',
  templateUrl: './view-leave-request-by-id.component.html',
  styleUrl: './view-leave-request-by-id.component.css'
})
export class ViewLeaveRequestByIdComponent {
  leaveRequestId: number = 0;
  leaveRequest!: ILeaveRequest; // Initialize as null
  staff: IStaff | null = null; // Property to hold staff data
  jobPosition: IJobPosition | null = null; // Property to hold job position data
  leaveType: ILeaveType | null = null; // Property to hold leave type data
  updatedLeaveRequest: ILeaveRequest = {
    id: 0,
    leave_title: '',
    start_date: new Date(),
    end_date: new Date(),
    total_days: 0,
    manager_comments: '',
    reason:'',
    status: '',
    staff_id: 0,
    leave_type_id: 0,
    company_id: 0,
  } 



  constructor(
    private route: ActivatedRoute,
    private leaveRequestService: LeaveRequestService,

  ) { }

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.leaveRequestId = +params['id']; // (+) converts string 'id' to a number
      this.fetchLeaveRequestById(this.leaveRequestId);
    });
  }

  fetchLeaveRequestById(id: number) {
    this.leaveRequestService.fetchLeaveRequestById(id).subscribe(
      (response: any) => {
        this.leaveRequest = response.data;
        // Extract staff, job position, and leave type data
        this.staff = response.data.staff;
        this.jobPosition = this.staff ? <IJobPosition>this.staff.job_position : null;
        this.leaveType = response.data.leave_type;
        if (this.leaveRequest.attachment) {
          this.leaveRequest.attachment = this.leaveRequestService.getAttachmentUrl(this.leaveRequest.attachment);
        }

      },
      error => {
        console.error(`Error fetching leave request with ID ${id}:`, error);
        // Handle error
      }
    );
  }

  approveLeaveRequest() {
    //Update the leave request status to 'Approved'
    this.updatedLeaveRequest = { 
      id: this.leaveRequest.id,
      leave_title: this.leaveRequest.leave_title,
      start_date: this.leaveRequest.start_date,
      end_date: this.leaveRequest.end_date,
      total_days: this.leaveRequest.total_days,
      reason:this.leaveRequest.reason,
      manager_comments: this.leaveRequest.manager_comments,
      status: 'Approved',
      staff_id: this.leaveRequest.staff_id,
      leave_type_id: this.leaveRequest.leave_type_id,
      company_id: this.leaveRequest.company_id, 
    }; 

    // Call the editLeaveRequest method to update the leave request
    this.leaveRequestService.editLeaveRequestById(this.leaveRequestId, this.updatedLeaveRequest).subscribe(
      (response: ILeaveRequest) => {
        console.log("Leave request approved successfully:", response);
        this.fetchLeaveRequestById(this.leaveRequestId);

        // Optionally, you can update this.leaveRequest with the updated data if needed
      },
      error => {
        console.error(`Error approving leave request with ID ${this.leaveRequestId}:`, error);
        // Handle error
      }
    );
  }

  rejectLeaveRequest() {
    // Update the leave request status to 'Rejected'
    this.updatedLeaveRequest = { 
      id: this.leaveRequest.id,
      leave_title: this.leaveRequest.leave_title,
      start_date: this.leaveRequest.start_date,
      end_date: this.leaveRequest.end_date,
      total_days: this.leaveRequest.total_days,
      reason:this.leaveRequest.reason,
      manager_comments: this.leaveRequest.manager_comments,
      status: 'Rejected',
      staff_id: this.leaveRequest.staff_id,
      leave_type_id: this.leaveRequest.leave_type_id,
      company_id: this.leaveRequest.company_id, 
    };

    // Call the editLeaveRequest method to update the leave request
    this.leaveRequestService.editLeaveRequestById(this.leaveRequestId, this.updatedLeaveRequest).subscribe(
      (response: ILeaveRequest) => {
        console.log("Leave request rejected successfully:", response);
        this.fetchLeaveRequestById(this.leaveRequestId);

        // Optionally, you can update this.leaveRequest with the updated data if needed
      },
      error => {
        console.error(`Error rejecting leave request with ID ${this.leaveRequestId}:`, error);
        // Handle error
      }
    );
  }

}
