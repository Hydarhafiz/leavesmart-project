import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  @ViewChild('profile') profile!: ElementRef;
  @ViewChild('staffManager') staffManager!: ElementRef;
  @ViewChild('createStaff') createStaff!: ElementRef;
  @ViewChild('leaveRequestManager') leaveRequestManager!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('leaveTypesSetting') leaveTypesSetting!: ElementRef;
  @ViewChild('jobPositionSetting') jobPositionSetting!: ElementRef;

  // Define an index signature for the class
  [key: string]: ElementRef | any;

  scrollTo(section: string) {
    const element = this[section];
    if (element) {
      element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
