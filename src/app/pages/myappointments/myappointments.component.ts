import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Administrator } from 'src/app/clases/administrator';
import { Appointment } from 'src/app/clases/appointment';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.sass']
})
export class MyappointmentsComponent implements OnInit
{

  appointmentsList: Array<Appointment> = [];
  appointmentsListFiltered: Array<Appointment> = [];
  professionalList: Array<Professional>;
  specialtyList:Array<Specialty>;
  user:any;


  constructor(
    private appointmentService: AppointmentService,
    private professionalService: ProfessionalService,
    private spacialtyService:SpecialtyService
  )
  {
    this.appointmentsList = new Array();
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void
  {
    this.appointmentService.getAppointments().subscribe(appointments =>
    {
      console.log(appointments);
      this.appointmentsList = appointments.filter(app=>{
        if(app.patient.id == this.user.id){
          return app
        }
      });
      this.appointmentsListFiltered = appointments;
    })
    this.professionalService.getProfessionals().subscribe(v =>
    {
      this.professionalList = v;
    })
    this.spacialtyService.getSpecialtys().subscribe(v=>{
      this.specialtyList = v;
    })
  }


  onSelectAppointment(appoitment)
  {
    console.log(appoitment);
  }
  onChooseSpecialty(value:Specialty)
  {
    this.appointmentsListFiltered = this.appointmentsList.filter(app=>{
      if(app.specialty.id == value.id){
        return app;
      }
    })

  }
  onChooseProfessional(value:Professional)
  {
    this.appointmentsListFiltered = this.appointmentsList.filter(app=>{
      if(app.professional.id == value.id ){
        return app;
      }
    })

  }
  showAll(){
    this.appointmentsListFiltered = this.appointmentsList;
  }
}
