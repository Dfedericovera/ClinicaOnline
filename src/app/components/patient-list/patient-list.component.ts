import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from '../../clases/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.sass']
})
export class PatientListComponent implements OnInit {

  @Input() patients: Patient[];
  @Output() choosePatient: EventEmitter<Patient> = new EventEmitter<Patient>();


  constructor() { }

  ngOnInit(): void {
  }

}
