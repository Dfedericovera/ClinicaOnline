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

  user: any;

  constructor(private router: Router, private AuthService: AuthService)
  { }

  ngOnInit(): void
  {
    this.AuthService.user$.subscribe(value=>{
      this.user = value;         
    })
  }

  ngAfterViewInit()
  {

  }

  logOut()
  {    
    this.AuthService.logout().then(v=>{
      this.router.navigate(['/login']);
      console.log("LogOut Successful");
    })
  }

}
