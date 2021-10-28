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
  user:any;


  constructor(private authService:AuthService) { 
    this.isChoosingForm = true;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user=>{
      this.user = user;
    })
  }

  onChooseForm(formTipe){
    this.isChoosingForm = false;
    this.formChoosen = formTipe;
  }

}
