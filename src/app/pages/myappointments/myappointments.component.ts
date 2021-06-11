import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/clases/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.sass']
})
export class MyappointmentsComponent implements OnInit {

  appointmentsList:Array<Appointment>=[];

  constructor(private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(appointments=>{
      this.appointmentsList = appointments;
    })
  }

}
