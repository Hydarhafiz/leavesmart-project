import { Component } from '@angular/core';
import { EmployeeLeaveBalanceService } from '../services/employee-leave-balance.service';
import { ILeaveBalance } from '../employee-interface/leave-balance';

@Component({
  selector: 'app-leave-balance-employee',
  templateUrl: './leave-balance-employee.component.html',
  styleUrl: './leave-balance-employee.component.css'
})
export class LeaveBalanceEmployeeComponent {
  leaveBalances: ILeaveBalance[] = [];

  constructor(private leaveBalanceService: EmployeeLeaveBalanceService) { }

  ngOnInit(): void {
    this.fetchLeaveBalanceData();
  }

  fetchLeaveBalanceData() {
    this.leaveBalanceService.fetchLeaveBalances().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.leaveBalances = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching staff data:', error);
        // Handle error
      }
    );
  }
}
