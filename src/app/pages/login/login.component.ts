import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  bootColorAlert: string;
  mensaje: string;
  condicion: boolean;
  testing: boolean;
  patientTesting: Patient;
  patientTesting2: Patient;
  patientTesting3: Patient;
  professionalTesting: Professional;
  professionalTesting2: Professional;
  administratorTesting: Administrator;
  spinner: boolean;
  submitted: boolean;

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
    this.submitted = false;
  }

  ngOnInit(): void
  {
    this.loadTesters();
  }

  loadTesters()
  {
    this.patientService.getPatientById("cEewD51RQsYrvaYHQ3eRAzkUHDJ3").then(testintgPatient =>
    {
      this.patientTesting = testintgPatient;
    })
    this.patientService.getPatientById("eJy59XbCO5e4zkUplxg8D2qTmpJ2").then(testintgPatient =>
    {
      this.patientTesting2 = testintgPatient;
    })
    this.patientService.getPatientById("EDbEwSOa7LffKBoGvCb1tjYcdvf1").then(testintgPatient =>
    {
      this.patientTesting3 = testintgPatient;
    })
    this.professionalService.getProfessionalById("Gl3GGMtAYrWBeX4640f7mLvPTKx1").then(testingProfessional =>
    {
      this.professionalTesting = testingProfessional;
    })
    this.professionalService.getProfessionalById("R2imG9PU9RhpfrgMhztOcJP6dSM2").then(testingProfessional =>
    {
      this.professionalTesting2 = testingProfessional;
    })
    this.administratorService.getAdministratorById("R3zdRbRiInOlAqSyD4NDakhcBR13").then(testingAdministrator =>
    {
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
/* 
  async getUserAccount(user: User)
  {
    await this.patientService.getPatientById(user.uid).then(patient =>
    {
      if (patient)
      {
        console.log("Bienvenido PACIENTE", patient.name);
        localStorage.setItem("user", JSON.stringify(patient))
        AuthService.user = patient;
      }

    })
    await this.professionalService.getProfessionalById(user.uid).then(professional =>
    {
      if (professional)
      {
        console.log("Bienvenido PROFESIONAL", professional.name);
        localStorage.setItem("user", JSON.stringify(professional))
        AuthService.user = professional;
      }

    })
    await this.administratorService.getAdministratorById(user.uid).then(administrator =>
    {
      if (administrator)
      {
        console.log("Bienvenido ADMINISTRADOR", administrator.name);
        localStorage.setItem("user", JSON.stringify(administrator))
        AuthService.user = administrator;
      }
    })
  } */

  onLogin()
  {
    this.spinner = true;
    console.log(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(userCredential =>
    {
      if (this.verificarUsuarioTesting(userCredential.user))
      {
        return true;
      }
      if (userCredential.user.emailVerified)
      {
        this.onLoginSuccess();
      }
      else
      {
        this.bootColorAlert = "danger";
        this.mensaje = "Verifique su email";
        this.spinner = false;
        this.submitted = true;
      }
    }).catch(error =>
    {
      this.bootColorAlert = "danger"
      this.cargarMensajeErrorAuth(error);
      this.submitted = true;
      this.spinner = false;
      console.log('Error: ', error)
    })
  }
  onLoginSuccess()
  {
    this.bootColorAlert = "success"
    this.mensaje = "Verificado✓";
    this.submitted = true;
    setTimeout(t =>
    {
      this.router.navigate(['/home']);
    }, 2000)
  }
  verificarUsuarioTesting(user: User)
  {
    switch (user.email)
    {
      case "paciente@gonzales.com":
        this.onLoginSuccess();
        return true;
        break;
      case "jorge@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      case "medico@valderrama.com":
        this.onLoginSuccess();
        return true;
        break;
      case "Medico2@Delaolla.com":
        this.onLoginSuccess();
        return true;
        break;
      case "administrador@dario.com":
        this.onLoginSuccess();
        return true;
        break;
      default: return false;
        break;
    }
  }

  cargarMensajeErrorAuth(error)
  {
    switch (error.code)
    {
      case "auth/user-not-found":
        this.mensaje = "Usuario no registrado";
        break;
      case "auth/wrong-password":
        this.mensaje = "Contraseña incorrecta";
        break;
      case "auth/invalid-email":
        this.mensaje = "email invalido";
        break;
      case "auth/email-already-exists":
        this.mensaje = "El email ya existe";/* (para singin) */
      default: this.mensaje = "email invalido";
        break;
    }
  }

  enterAsClient()
  {
    this.loginForm.controls.email.setValue('paciente@gonzales.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsClient1()
  {
    this.loginForm.controls.email.setValue('paciente@diego.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsClient2()
  {
    this.loginForm.controls.email.setValue('paciente@carlitos.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsProfessional()
  {
    this.loginForm.controls.email.setValue('medico@valderrama.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsProfessional1()
  {
    this.loginForm.controls.email.setValue('Medico2@Delaolla.com');
    this.loginForm.controls.password.setValue('111111');
  }
  enterAsAdministrator()
  {
    this.loginForm.controls.email.setValue('administrador@dario.com');
    this.loginForm.controls.password.setValue('111111');
  }
  resolved(captchaResponse: string)
  {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }


}
