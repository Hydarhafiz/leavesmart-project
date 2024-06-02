import { Component } from '@angular/core';
import { ILeaveType } from '../interface/leave-type';

@Component({
  selector: 'app-view-leave-types-setting',
  templateUrl: './view-leave-types-setting.component.html',
  styleUrl: './view-leave-types-setting.component.css'
})
export class ViewLeaveTypesSettingComponent {
  leaveTypes: ILeaveType[] = [
    {
      leave_name: 'Annual leave',
      desc: 'Paid time off for employee to take annual leave.',
      company_id:1
    },
    {
      leave_name: 'Annual leave',
      desc: 'Paid time off for employee to take annual leave.',
      company_id:1
    },
    {
      leave_name: 'Annual leave',
      desc: 'Paid time off for employee to take annual leave.',
      company_id:1
    }
  ]
}
