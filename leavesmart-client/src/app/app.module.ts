import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { ViewLeaveRequestComponent } from './view-leave-request/view-leave-request.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    NavbarComponent,
    ProfileComponent,
    LeaveBalanceComponent,
    ViewLeaveRequestComponent,
    LeaveRequestFormComponent,
    CalendarComponent,
    EditProfileComponent,
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
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
