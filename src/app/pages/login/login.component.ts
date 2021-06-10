import { ReturnTypeTransform } from '@angular/compiler-cli/src/ngtsc/transform';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Administrator } from 'src/app/clases/administrator';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { User } from 'src/app/interface/user.interface';
import { AdministratorService } from 'src/app/services/administrator.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit
{

  loginForm: FormGroup;
  color = 'red';
  condicion = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private patientService: PatientService,
    private professionalService: ProfessionalService,
    private administratorService: AdministratorService
  )
  {
    this.createForm();
  }

  ngOnInit(): void
  {

  }

  createForm()
  {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      recaptchaReactive: ["", Validators.required],
    });
  }

  getUserAccount(user: User)
  {
    this.patientService.getPatientById(user.uid).then(patient =>
    {
      if (patient)
      {
        console.log("Bienvenido PACIENTE", patient.name);
        AuthService.user = patient;
      }

    })
    this.professionalService.getProfessionalById(user.uid).then(professional =>
    {
      if (professional)
      {
        console.log("Bienvenido PROFESIONAL", professional.name);
        AuthService.user = professional;
      }

    })
    this.administratorService.getAdministratorById(user.uid).then(administrator=>{
      if(administrator){
        console.log("Bienvenido ADMINISTRADOR", administrator.name);
        AuthService.user = administrator;
      }
    }
      
    )
  }

  onLogin()
  {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(user =>
    {
      this.getUserAccount(user.user);
      if (this.authService.isEmailVerified(user.user))
      {
        this.router.navigate(['/home']);
      }
      else
      {
        console.log('Verifique su email');
      }

    }).catch(error => { console.log('Paciente no registrado', error) })
  }

  enterAsClient()
  {
    this.loginForm.controls.email.setValue('paciente@gonzales.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsProfessional()
  {
    this.loginForm.controls.email.setValue('medico@valderrama.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsAdministrator()
  {
    this.loginForm.controls.email.setValue('administrador@administrador.com');
    this.loginForm.controls.password.setValue('111111');
  }
  resolved(captchaResponse: string)
  {
    console.log(`Resolved response token: ${captchaResponse}`);

  }


}
