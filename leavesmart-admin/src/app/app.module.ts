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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, // Add this line
    BrowserAnimationsModule, // Add this line
    FormsModule, // Add this line
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
