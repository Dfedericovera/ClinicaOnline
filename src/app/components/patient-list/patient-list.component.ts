import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.sass']
})
export class PatientListComponent implements OnInit {

  @Input() patients: Paciente[];
  @Output() elegirPaciente: EventEmitter<Paciente> = new EventEmitter<Paciente>();


  constructor() { }

  ngOnInit(): void {
  }

}
