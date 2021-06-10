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
  condicion:boolean;
  testing:boolean;
  patientTesting:Patient;
  patientTesting2:Patient;
  professionalTesting:Professional;
  professionalTesting2:Professional;
  administratorTesting:Administrator;
  spinner:boolean

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
    this.condicion = false;
    this.testing = false;
    this.spinner = false;
  }

  ngOnInit(): void
  {
    this.patientService.getPatientById("cEewD51RQsYrvaYHQ3eRAzkUHDJ3").then(testintgPatient=>{
      this.patientTesting = testintgPatient;
    })
    this.patientService.getPatientById("u7J9vE2bebTUh8rtLxBNEyEdOc73").then(testintgPatient=>{
      this.patientTesting2 = testintgPatient;
    })
    this.professionalService.getProfessionalById("gyFb67SEpFPDD8FzTONy9XJCZM22").then(testingProfessional=>{
      this.professionalTesting = testingProfessional;
    })
    this.professionalService.getProfessionalById("gxEvpY2NmUXicRjeIsBp3AdS72H3").then(testingProfessional=>{
      this.professionalTesting2 = testingProfessional;
    })
    this.administratorService.getAdministratorById("ieLf7BsRyOQH0I7WlRAzk9Fw0Bn1").then(testingAdministrator=>{
      this.administratorTesting = testingAdministrator;
    })

  }

  createForm()
  {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      recaptchaReactive: ["", Validators.required],
    });
  }

  async getUserAccount(user: User)
  {
    await this.patientService.getPatientById(user.uid).then(patient =>
    {
      if (patient)
      {
        console.log("Bienvenido PACIENTE", patient.name);
        localStorage.setItem("user",JSON.stringify(patient))
        AuthService.user = patient;
      }

    })
    await this.professionalService.getProfessionalById(user.uid).then(professional =>
    {
      if (professional)
      {
        console.log("Bienvenido PROFESIONAL", professional.name);
        localStorage.setItem("user",JSON.stringify(professional))
        AuthService.user = professional;
      }

    })
    await this.administratorService.getAdministratorById(user.uid).then(administrator=>{
      if(administrator){
        console.log("Bienvenido ADMINISTRADOR", administrator.name);
        localStorage.setItem("user",JSON.stringify(administrator))
        AuthService.user = administrator;
      }
    }
      
    )
  }

  onLogin()
  {
    this.spinner = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(async user =>
    {
      await this.getUserAccount(user.user);
      if (this.authService.isEmailVerified(user.user))
      {
        this.router.navigate(['/home']);
      }
      else
      {
        console.log('Verifique su email');
        this.spinner = false;
      }

    }).catch(error => {
       console.log('Paciente no registrado', error);
       this.spinner = false;
      })
  }

  enterAsClient()
  {
    this.loginForm.controls.email.setValue('paciente@gonzales.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsClient1(){
    this.loginForm.controls.email.setValue('jorge@gmail.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsProfessional()
  {
    this.loginForm.controls.email.setValue('medico@valderrama.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsProfessional1(){
    this.loginForm.controls.email.setValue('Medico2@Delaolla.com');
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
