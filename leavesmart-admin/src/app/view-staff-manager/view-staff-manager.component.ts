import { Component } from '@angular/core';
import { IStaff } from '../interface/staff';
import { IJobPosition } from '../interface/job-position';

@Component({
  selector: 'app-view-staff-manager',
  templateUrl: './view-staff-manager.component.html',
  styleUrl: './view-staff-manager.component.css'
})
export class ViewStaffManagerComponent {
  staffList: IStaff[] = [
    { FullName: 'John Doe', gender: 'Male', contact_number: '+1234567890', email: 'john@example.com',password:"FEED", job_position_id: 1, admin_id:1,company_id:1 },
    { FullName: 'John Doe', gender: 'Male', contact_number: '+1234567890', email: 'john@example.com',password:"FEED", job_position_id: 1, admin_id:1,company_id:1 },
    { FullName: 'John Doe', gender: 'Male', contact_number: '+1234567890', email: 'john@example.com',password:"FEED", job_position_id: 1, admin_id:1,company_id:1 },

    // Add more staff members as needed
  ];

  jobPositions: IJobPosition[] = [
    { position_name: 'Developer', company_id: 1},
    { position_name: 'Designer', company_id: 1 },
    // Add more job positions as needed
];

selectedJobPosition: string = 'all';

// get filteredStaffList(): IStaff[] {
//     if (this.selectedJobPosition === 'all') {
//         return this.staffList;
//     } else {
//         //return this.staffList.filter(staff => staff.job_position_id === this.selectedJobPosition);
//     }
// }

  constructor() { }

  ngOnInit(): void {
  }
}
