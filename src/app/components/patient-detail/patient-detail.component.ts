import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/clases/patient';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.sass']
})
export class PatientDetailComponent implements OnInit {

  @Input() pedido: Patient;

  constructor() 
  {
  }

  ngOnInit() { }

}
