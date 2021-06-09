import { Component, OnInit } from '@angular/core';

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

  constructor()
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
  }

  ngOnInit(): void
  {
  }

  showUserInfo()
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
  }

  showApproveProfessional()
  {
    this.userInfo = false;
    this.approveProfessional = true;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
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
