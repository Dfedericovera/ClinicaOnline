import { DatePipe } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/clases/appointment';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.sass']
})
export class AppointmentFormComponent implements OnInit
{  

  minDate:string;
  filtro: any;
  appointments: Array<any>;
  specialtys: Specialty[];
  professionals: Professional[];

  appointmentForm: FormGroup;
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private professionalService: ProfessionalService,
    private specialtyService: SpecialtyService,
  ) { }

  ngOnInit(): void
  {
    let date = new Date();
    this.minDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.createForm();
    this.getSpecialtys();
    this.getProfessionals();
  }
  createForm()
  {
    this.appointmentForm = this.fb.group({
      date: ["", Validators.required],
      filter: new FormControl('professional'),

    });
  }

  changeDate(input, filtro)
  {
    /* this.datePipe.transform(input.value) */
    let date = new Date(this.appointmentForm.controls.date.value);
    let localTimeDate = new Date(this.appointmentForm.controls.date.value + 'T00:00');

    console.log(localTimeDate);
    /* console.log(this.appointmentForm.controls.date.value);
    console.log(this.appointmentForm.controls.filter.value); */
  }

  createAvailableList()
  {

  }

  onChooseSpecialty(specialty: Specialty)
  {
    console.log(specialty);
 /*    let hora = 9;
    let minutos = '00';
    for(let i  = 0 ; i<22 ; i++){

      let newAppointment= new Appointment();
      newAppointment.hora = hora +':'+ minutos;
      this.appointments.push( newAppointment );      
      if(minutos == '00'){
        minutos = '30';      
      }
      else if(minutos = '30'){
        minutos = '00'
        hora = hora +1;
      }
    } */
        

  }

  onChooseProfessional(professional){
    console.log(professional);
  }

  getSpecialtys()
  {
    this.specialtyService.getSpecialtys().subscribe(specialtys =>
    {
      this.specialtys = specialtys;
      console.log(specialtys);
    })
  }
  getProfessionals()
  {
    this.professionalService.getProfessionals().subscribe(professionals =>
    {
      this.professionals = professionals;
      console.log(professionals);
    })
  }


}
