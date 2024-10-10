import { Component, ElementRef, ViewChild } from '@angular/core';
import { LeaveRequestFormEmployeeComponent } from '../leave-request-form-employee/leave-request-form-employee.component';
import { ViewLeaveRequestComponent } from '../view-leave-request/view-leave-request.component';

@Component({
  selector: 'app-main-page-employee',
  templateUrl: './main-page-employee.component.html',
  styleUrl: './main-page-employee.component.css'
})
export class MainPageEmployeeComponent {

  @ViewChild(LeaveRequestFormEmployeeComponent) leaveRequestForm!: LeaveRequestFormEmployeeComponent;
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
