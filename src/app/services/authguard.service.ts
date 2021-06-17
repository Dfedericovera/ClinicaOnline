import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Administrator } from '../clases/administrator';
import { Patient } from '../clases/patient';
import { Professional } from '../clases/professional';
import { AdministratorService } from './administrator.service';
import { AuthService } from './auth.service';
import { PatientService } from './patient.service';
import { ProfessionalService } from './professional.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorAuthGuard implements CanActivate /* CanDeactivate<CanDeactivateComponent>  */
{
  constructor(private authService: AuthService, private router: Router,
    private patientService: PatientService,
    private professionalService: ProfessionalService,
    private administratorService: AdministratorService,
  )
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log("Verificando Administrador!", state.toString(), state.url);
    if (JSON.parse(localStorage.getItem('user')).usertype == 'administrator')
    {
      return true
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }

/*   checkUser(user, userTipe: string): boolean
  {
    if (user instanceof Patient && userTipe == "patient")
    {
      console.log("Bienvenido PACIENTE", user.name);
      return true
    }
    if (user instanceof Professional && userTipe == "professional")
    {
      console.log("Bienvenido PROFESIONAL", user.name);
      return true
    }
    if (user instanceof Administrator && userTipe == "administrator")
    {
      console.log("Bienvenido ADMINISTRADOR", user.name);
      return true
    }

  } */

  /*   canDeactivate(target: CanDeactivateComponent) {
      if(target.hasChanges()){
          return window.confirm('Do you really want to exit?');
      }
      return true;
    } */


}
