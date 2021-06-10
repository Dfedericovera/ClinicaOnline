import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/clases/administrator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit
{

  isAdministrator: boolean;

  constructor(private router: Router, private AuthService: AuthService)
  {
    this.isAdministrator = false;
  }

  ngOnInit(): void
  {
    console.log(JSON.parse(localStorage.getItem("user")));
    console.log(AuthService.user);
    if (JSON.parse(localStorage.getItem("user")).usertype == "administrator")
    {
      this.isAdministrator = true;
    }
  }

  ngAfterViewInit()
  {

  }

  logOut()
  {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

}
