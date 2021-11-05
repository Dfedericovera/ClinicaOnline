import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass']
})
export class MyProfileComponent implements OnInit
{

  user: Usuario;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void
  {
    this.getUser();
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  getUser()
  {
    this.userSubscription = this.authService.user$.subscribe(user =>
    {      
      this.user = user;
    })
  }

}
