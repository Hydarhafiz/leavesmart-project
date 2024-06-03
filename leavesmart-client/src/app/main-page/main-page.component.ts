import { Component, ViewChild } from '@angular/core';
import { LeaveRequestFormComponent } from '../leave-request-form/leave-request-form.component';
import { ProfileComponent } from '../profile/profile.component';
import { LeaveRequestService } from '../services/leave-request.service';
import { ViewLeaveRequestComponent } from '../view-leave-request/view-leave-request.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  @ViewChild(LeaveRequestFormComponent) leaveRequestForm!: LeaveRequestFormComponent;
  @ViewChild(ViewLeaveRequestComponent) ViewLeaveRequestComponent!: ViewLeaveRequestComponent;

  onFormSubmitted() {
    console.log('Form submitted successfully, refreshing...');
    this.leaveRequestForm.resetForm();
    this.ViewLeaveRequestComponent.ngOnInit()
  }
}
