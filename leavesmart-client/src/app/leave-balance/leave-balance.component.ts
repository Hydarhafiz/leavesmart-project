import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent {
  leaveBalances: { type: string, days: number }[] = [
    { type: 'Annual leave', days: 10 },
    { type: 'Sick leave', days: 20 },
    { type: 'Marriage leave', days: 3 }
    // Add more leave types if needed
  ];
}
