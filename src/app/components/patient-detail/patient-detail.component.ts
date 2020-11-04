import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.sass']
})
export class PatientDetailComponent implements OnInit {

  @Input() pedido: Paciente;

  constructor() 
  {
  }

  ngOnInit() { }

}
