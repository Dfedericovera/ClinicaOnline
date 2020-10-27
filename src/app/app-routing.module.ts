import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { SignupAdministratorComponent } from './pages/signup-administrator/signup-administrator.component';
import { SignupPatientComponent } from './pages/signup-patient/signup-patient.component';
import { SignupProfessionalComponent } from './pages/signup-professional/signup-professional.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'signupPatient',component: SignupPatientComponent},
  {path: 'signupProfessional',component: SignupProfessionalComponent},
  {path: 'signupAdministrator',component: SignupAdministratorComponent},
  {path: 'home',component: MenuPrincipalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
