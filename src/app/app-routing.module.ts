import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { SignupAdministratorComponent } from './pages/signup-administrator/signup-administrator.component';
import { SignupPatientComponent } from './pages/signup-patient/signup-patient.component';
import { SignupProfessionalComponent } from './pages/signup-professional/signup-professional.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent, data: {animation: 'login'} },
  {path: 'signupPatient',component: SignupPatientComponent, data: {animation: 'signupPatient'} },
  {path: 'signupProfessional',component: SignupProfessionalComponent,data: {animation: 'signupProfessional'}},
  {path: 'signupAdministrator',component: SignupAdministratorComponent,data: {animation: 'signupAdministrator'}},
  {path: 'home',component: MenuPrincipalComponent,data: {animation: 'home'}},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
