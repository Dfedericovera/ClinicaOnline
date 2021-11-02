import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit
{

  formChoosen: string;
  isChoosingForm: boolean;
  user: any;
  user$: Subscription;


  constructor(private authService: AuthService)
  {
    this.isChoosingForm = true;
  }

  ngOnInit(): void
  {
    this.getUser();
  }
  ngOnDestroy(){
    this.user$.unsubscribe();
  }
  getUser()
  {
    this.user$ = this.authService.user$.subscribe(user =>
    {
      this.user = user;
    })
  }


  onChooseForm(formTipe)
  {
    this.isChoosingForm = false;
    this.formChoosen = formTipe;
  }

}
