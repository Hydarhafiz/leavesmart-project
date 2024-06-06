import { Component, OnInit } from '@angular/core';
import { IStaff } from '../interface/staff';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-edit-staffs-manager',
  templateUrl: './edit-staffs-manager.component.html',
  styleUrl: './edit-staffs-manager.component.css'
})
export class EditStaffsManagerComponent implements OnInit{

  staffId: number = 0;
  staff!: IStaff;
  updatedStaff: IStaff = {
    FullName: '',
    gender: '',
    contact_number: '',
    email: '',
    job_position_id: 0,
    admin_id: 0,
    company_id: 0,
  } 

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.staffId = +params['id']; // (+) converts string 'id' to a number
      this.fetchStaffById(this.staffId);
    });
  }

  fetchStaffById(id: number) {
    this.staffService.fetchStaffById(id).subscribe(
      (response: any) => {
        this.staff = response.data;
        console.log(this.staff)

      },
      error => {
        console.error(`Error fetching leave request with ID ${id}:`, error);
        // Handle error
      }
    );
  }

  onSubmit() {
    this.updatedStaff = {
      FullName: this.staff.FullName,
      gender: this.staff.gender,
      contact_number: this.staff.contact_number,
      email: this.staff.email,
      job_position_id: this.staff.job_position_id,
      admin_id: this.staff.admin_id,
      company_id: this.staff.company_id,
    } 
    this.staffService.editStaffProfile(this.staffId, this.updatedStaff).subscribe(
      (response: IStaff) => {
        // Handle success response
        console.log('Staff updated successfully:', response);
      },
      error => {
        // Handle error
        console.error('Error updating staff:', error);
        // You may want to display an error message to the user
      }
    );
  }
}
