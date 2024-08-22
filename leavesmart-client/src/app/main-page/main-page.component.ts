import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('profile') profile!: ElementRef;
  @ViewChild('leaveBalance') leaveBalance!: ElementRef;
  @ViewChild('viewLeaveRequest') viewLeaveRequest!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('leaveRequestFormPage') leaveRequestFormPage!: ElementRef;

  // Define an index signature for the class
  [key: string]: ElementRef | any;

  scrollTo(section: string) {
    const element = this[section];
    if (element) {
      element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onFormSubmitted() {
    console.log('Form submitted successfully, refreshing...');
    this.leaveRequestForm.resetForm();
    this.ViewLeaveRequestComponent.ngOnInit()
  }
}

// export class MainPageComponent {

// }
