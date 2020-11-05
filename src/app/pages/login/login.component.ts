import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService:AuthService
    ) { this.createForm()}

  ngOnInit(): void {
  }

  createForm()
  {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      recaptchaReactive:["",Validators.required],
    });
  }

  onLogin(){
    this.authService.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value).then(user=>{
      /* console.log(user); */
      if(this.authService.isEmailVerified(this.authService.user)){
        /* console.log(this.authService.user); */
        this.router.navigate(['/home']);
      }
      else{
        console.log('Verifique su email');
      }
    })   
  }

  enterAsClient(){
    this.loginForm.controls.email.setValue('DfedericoVera@gmail.com');
    this.loginForm.controls.password.setValue('111111');
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
   
  }
  

}
