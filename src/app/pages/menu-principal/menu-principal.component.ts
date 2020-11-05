import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.sass']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    /* console.log(this.authService.user); */
  }

}
