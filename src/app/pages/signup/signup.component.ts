import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  formChoosen:string;
  isChoosingForm:boolean;
  constructor(userService:AuthService) { 
    this.isChoosingForm = true;
  }

  ngOnInit(): void {
  }

  onChooseForm(formTipe){
    this.isChoosingForm = false;
    this.formChoosen = formTipe;
  }

}
