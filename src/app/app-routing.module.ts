import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { SignupAdministratorComponent } from './pages/signup-administrator/signup-administrator.component';
import { SignupPatientComponent } from './pages/signup-patient/signup-patient.component';
import { SignupProfessionalComponent } from './pages/signup-professional/signup-professional.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MakeAnAppointmentComponent } from './pages/make-an-appointment/make-an-appointment.component';
import { ProfessionalListComponent } from './components/professional-list/professional-list.component';
import { SpecialtyListComponent } from './components/specialty-list/specialty-list.component';
import { SpecialtyFormComponent } from './components/specialty-form/specialty-form.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UsersComponent } from './pages/users/users.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdministratorAuthGuard } from './services/authguard.service';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SignupAppointmentComponent } from './pages/signup-appointment/signup-appointment.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { MyappointmentsComponent } from './pages/myappointments/myappointments.component';
const routes: Routes = [
  {path: '',component: WelcomeComponent},
  {path: 'login',component: LoginComponent, data: {animation: 'login'} },
  {path: 'signup',component: SignupComponent, data: {animation: 'signupPatient'} },
  {path: 'signupProfessional',component: SignupProfessionalComponent,data: {animation: 'signupProfessional'}},
  {path: 'signupAdministrator',component: SignupAdministratorComponent,data: {animation: 'signupAdministrator'}},
  {path: 'signupSpecialty',component: SpecialtyFormComponent,data: {animation: 'signupAdministrator'}},
  {path: 'home',component: MenuPrincipalComponent,data: {animation: 'home'}},
  {path: 'patient-list',component: PatientListComponent,data: {animation: 'home'}},
  {path: 'prossional-list',component: ProfessionalListComponent,data: {animation: 'home'}},
  {path: 'speciality-list',component: SpecialtyListComponent,data: {animation: 'home'}},
  {path: 'make-an-appointment',component: MakeAnAppointmentComponent,data: {animation: 'home'}},
  {path: 'users',component: UsersComponent,data: {animation: 'home'},canActivate: [AdministratorAuthGuard]},
  {path: 'myAppointments',component: MyappointmentsComponent,data: {animation: 'home'}},
  {path: 'appointments',component: AppointmentsComponent,data: {animation: 'home'}},
  {path: 'signupAppointment',component: SignupAppointmentComponent,data: {animation: 'home'}},
  {path: 'myProfile',component: MyProfileComponent,data: {animation: 'home'}},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
