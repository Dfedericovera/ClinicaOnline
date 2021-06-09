import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Professional } from 'src/app/clases/professional';
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
  constructor(private professionalService: ProfessionalService)
  {
    this.spinner = false;
  }

  ngOnInit(): void
  {
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
