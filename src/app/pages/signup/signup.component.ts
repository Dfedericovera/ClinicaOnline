import { Component, OnInit } from '@angular/core';
import { Administrator } from 'src/app/clases/administrator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  formChoosen:string;
  isChoosingForm:boolean;
  isAdministrator:boolean;


  constructor(private userService:AuthService) { 
    this.isChoosingForm = true;
  }

  ngOnInit(): void {
    console.log(AuthService.user);
    this.isAdministrator = AuthService.user instanceof Administrator;
    console.log(this.isAdministrator);
  }

  onChooseForm(formTipe){
    this.isChoosingForm = false;
    this.formChoosen = formTipe;
  }

}
