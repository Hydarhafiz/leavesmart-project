import { Component } from '@angular/core';
import { ILeaveBalance } from '../interface/leave-balance';
import { LeaveBalanceService } from '../services/leave-balance.service';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent {
  

  leaveBalances: ILeaveBalance[] = [];

  constructor(private leaveBalanceService: LeaveBalanceService) { }

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
