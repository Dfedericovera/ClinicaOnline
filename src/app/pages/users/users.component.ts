import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { PatientService } from 'src/app/services/patient.service';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit
{
  userInfo: boolean;
  approveProfessional: boolean;
  formAdministrator: boolean;
  formPatient: boolean;
  formProfessional: boolean;
  patientsList:Patient[];
  professionalList:Array<Professional>=[];
  forms:boolean;

  constructor(
    private patientService:PatientService,
    private professionalService:ProfessionalService
  )
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }

  ngOnInit(): void
  {
    this.patientService.getPatients().subscribe(value=>{
      this.patientsList = value.filter(user => user.usertype == "patient");
    });
    this.professionalService.getProfessionals().subscribe(value=>{
      this.professionalList = value.filter(user => user.usertype == "professional");
    })

  }

  showUserInfo()
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }

  showApproveProfessional()
  {
    this.userInfo = false;
    this.approveProfessional = true;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }
  showform(){
    this.userInfo = false;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = true;
  }

  showForms(who)
  {
    this.userInfo = false;
    this.approveProfessional = false;

    if (who == "administrator")
    {
      this.formAdministrator = true;
      this.formProfessional = false;
      this.formPatient = false;
    }
    else if (who == "professional")
    {
      this.formAdministrator = false;
      this.formProfessional = true;
      this.formPatient = false;
    }
    else
    {
      this.formAdministrator = false;
      this.formProfessional = false;
      this.formPatient = true;
    }

  }

}
