import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/clases/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.sass']
})
export class AppointmentListComponent implements OnInit {

  @Input() appointments: Appointment[];
  @Output() chooseAppointment: EventEmitter<Appointment> = new EventEmitter<Appointment>();


  constructor() { }

  ngOnInit(): void {
  }

}
