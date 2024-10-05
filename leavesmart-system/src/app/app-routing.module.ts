import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './services/auth.guard';
import { ViewLeaveRequestByIdComponent } from './view-leave-request-by-id/view-leave-request-by-id.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditStaffsManagerComponent } from './edit-staffs-manager/edit-staffs-manager.component';
import { CreateLeaveTypeComponent } from './create-leave-type/create-leave-type.component';
import { CreateJobPositionComponent } from './create-job-position/create-job-position.component';
import { CreateJobPositionByLeaveTypeComponent } from './create-job-position-by-leave-type/create-job-position-by-leave-type.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainPageEmployeeComponent } from './main-page-employee/main-page-employee.component';

const routes: Routes = [
  //admin
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'main-page', component: MainPageComponent, canActivate: [AuthGuard]},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'view-staff-manager/:id', component: EditStaffsManagerComponent, canActivate: [AuthGuard] },
  { path: 'view-leave-request/:id', component: ViewLeaveRequestByIdComponent, canActivate: [AuthGuard] },
  { path: 'create-new-leave-type', component: CreateLeaveTypeComponent, canActivate: [AuthGuard] },
  { path: 'create-new-job-position', component: CreateJobPositionComponent, canActivate: [AuthGuard] },
  { path: 'create-new-job-position-by-leave-type', component: CreateJobPositionByLeaveTypeComponent, canActivate: [AuthGuard] },
  { path: 'register-admin', component: RegisterPageComponent },

  //staff
  {path: 'main-page-employee', component: MainPageEmployeeComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
