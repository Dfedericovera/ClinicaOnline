import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupProfessionalComponent } from './signup-professional.component';

const routes: Routes = [
  {path: 'signupProfessional', component: SignupProfessionalComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupProfessionalRoutingModule { }
