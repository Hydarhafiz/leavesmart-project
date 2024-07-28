import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewStaffManagerComponent } from './view-staff-manager/view-staff-manager.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { ViewLeaveRequestManagerComponent } from './view-leave-request-manager/view-leave-request-manager.component';
import { ViewLeaveTypesSettingComponent } from './view-leave-types-setting/view-leave-types-setting.component';
import { ViewJobPositionSettingComponent } from './view-job-position-setting/view-job-position-setting.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewLeaveRequestByIdComponent } from './view-leave-request-by-id/view-leave-request-by-id.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditStaffsManagerComponent } from './edit-staffs-manager/edit-staffs-manager.component';
import { CreateLeaveTypeComponent } from './create-leave-type/create-leave-type.component';
import { CreateJobPositionComponent } from './create-job-position/create-job-position.component';
import { CreateJobPositionByLeaveTypeComponent } from './create-job-position-by-leave-type/create-job-position-by-leave-type.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    ViewProfileComponent,
    ViewStaffManagerComponent,
    CreateStaffComponent,
    ViewLeaveRequestManagerComponent,
    ViewLeaveTypesSettingComponent,
    ViewJobPositionSettingComponent,
    CalendarComponent,
    ViewLeaveRequestByIdComponent,
    EditProfileComponent,
    EditStaffsManagerComponent,
    CreateLeaveTypeComponent,
    CreateJobPositionComponent,
    CreateJobPositionByLeaveTypeComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, // Add this line
    BrowserAnimationsModule, // Add this line
    FormsModule, // Add this line

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ToastrModule.forRoot(), // Import ToastrModule.forRoot() here

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
