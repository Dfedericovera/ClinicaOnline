import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Professional } from 'src/app/clases/professional';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.sass']
})
export class ProfessionalListComponent implements OnInit
{

  @Input() professionals: Professional[];
  @Output() chooseProfessional: EventEmitter<Professional> = new EventEmitter<Professional>();
  spinner: boolean;
  isAdministrator: boolean;
  user$:Subscription;


  constructor(
    private professionalService: ProfessionalService,
    private authService: AuthService,
  )
  {
    this.spinner = false;
  }

  ngOnInit(): void
  {
    this.getUser()
  }

  ngOnDestroy(){
    this.user$.unsubscribe();
  }

  getUser(){
    this.user$ = this.authService.user$.subscribe(user=>{
      if(user.usertype == "administrator"){
        this.isAdministrator = true;
      }
    })
  }
  onChoose(specialty)
  {
    this.chooseProfessional.emit(specialty);
  }

  approveProfessional(professional: Professional)
  {
    this.spinner = true;
    console.log(professional);
    professional.approved = !professional.approved;
    this.professionalService.editProfessional(professional).then(value =>
    {
      this.spinner = false;
      console.log("Modificado correctamente");
    });
  }

}
