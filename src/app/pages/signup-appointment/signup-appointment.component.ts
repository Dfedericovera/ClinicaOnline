import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Appointment } from 'src/app/clases/appointment';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-signup-appointment',
  templateUrl: './signup-appointment.component.html',
  styleUrls: ['./signup-appointment.component.sass']
})
export class SignupAppointmentComponent implements OnInit
{

  appointmentList: Appointment[] = [];
  user: any;
  newAppointmentList: Appointment[] = [];
  newAppointment: Appointment;
  freeAppointments: Appointment[];

  minDate: string;
  filtro: any;
  appointments: Array<Appointment>;
  specialtys: Specialty[];
  professionals: Professional[];

  appointmentForm: FormGroup;
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private professionalService: ProfessionalService,
    private specialtyService: SpecialtyService,
  )
  {
    this.newAppointment = new Appointment();
  }

  ngOnInit(): void
  {
    this.user = JSON.parse(localStorage.getItem("user"));
    let date = new Date();
    this.minDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.getSpecialtys();
    this.getProfessionals();
    this.getAppointments();
  }


  changeDate(input, filtro)
  {
    let date = new Date(this.appointmentForm.controls.date.value);
    let localTimeDate = new Date(this.appointmentForm.controls.date.value + 'T00:00');
    console.log(localTimeDate);
  }

  lookForOpenAppointments(){
    this.appointments.forEach(appointment=>{
      let time = new Date(appointment.timeStamp);
      let today = new Date();
      console.log(time.getDate(),today.getDate())
      if(time.getDate() == today.getDate()){

      }
    })
  }

  createAvailableList()
  {
       let hora = 9;
       let minutos = '00';
       for(let i  = 0 ; i<22 ; i++){
   
         let newAppointment= new Appointment();
         /* newAppointment.hora = hora +':'+ minutos; */
         this.appointments.push( newAppointment );      
         if(minutos == '00'){
           minutos = '30';      
         }
         else if(minutos = '30'){
           minutos = '00'
           hora = hora +1;
         }
       }
  }

  onChooseSpecialty(specialty: Specialty)
  {
    this.newAppointment.specialty = specialty;
    this.createAvailableList();
  }

  onChooseProfessional(professional)
  {
    this.newAppointment.professional = professional;
    this.appointmentList.splice(0, 1, this.newAppointment);
    this.createAvailableList();
  }

  getSpecialtys()
  {
    this.specialtyService.getSpecialtys().subscribe(specialtys =>
    {
      this.specialtys = specialtys;
    })
  }
  getProfessionals()
  {
    this.professionalService.getProfessionals().subscribe(professionals =>
    {
      this.professionals = professionals;
    })
  }
  getAppointments()
  {
    this.appointmentService.getAppointments().subscribe(appointments =>
    {
      /* console.log("TURNOS", appointments); */
      this.appointments = appointments;
    })
  }

}
