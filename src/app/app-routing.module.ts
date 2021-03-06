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
const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent, data: {animation: 'login'} },
  {path: 'signupPatient',component: SignupPatientComponent, data: {animation: 'signupPatient'} },
  {path: 'signupProfessional',component: SignupProfessionalComponent,data: {animation: 'signupProfessional'}},
  {path: 'signupAdministrator',component: SignupAdministratorComponent,data: {animation: 'signupAdministrator'}},
  {path: 'signupSpecialty',component: SpecialtyFormComponent,data: {animation: 'signupAdministrator'}},
  {path: 'home',component: MenuPrincipalComponent,data: {animation: 'home'}},
  {path: 'patient-list',component: PatientListComponent,data: {animation: 'home'}},
  {path: 'prossional-list',component: ProfessionalListComponent,data: {animation: 'home'}},
  {path: 'speciality-list',component: SpecialtyListComponent,data: {animation: 'home'}},
  {path: 'make-an-appointment',component: MakeAnAppointmentComponent,data: {animation: 'home'}},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
