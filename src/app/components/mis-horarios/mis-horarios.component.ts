import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/clases/appointment';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { UserType } from 'src/app/clases/userType';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.sass']
})
export class MisHorariosComponent implements OnInit
{

  specialtyForm: FormGroup;
  showForm: boolean = false;
  isSubmitted: boolean = false;
  specialtys:Array<Specialty>;
  @Input() user: Professional;
  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService,
    private specialtyService:SpecialtyService
  ) { }

  ngOnInit(): void
  {
    this.getSpecialtys();
    this.createForm();
  }

  getSpecialtys(){
    this.specialtyService.getSpecialtys().subscribe(v=>{
      console.log(v);
      
      this.specialtys = v;
    })
  }

  createForm()
  {
    this.specialtyForm = this.fb.group({
      horarioEntrada: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      horarioSalida: ["", [Validators.required, Validators.min(18), Validators.max(99)]]
    });
  }

  onChooseSpecialty(specialty:Specialty){

  }

  onSubmit()
  {
    this.user.horarioEntrada = this.specialtyForm.controls['horarioEntrada'].value;
    this.user.horarioSalida = this.specialtyForm.controls['horarioSalida'].value;
    this.professionalService.editProfessional(this.user).then(v =>
    {
      this.isSubmitted = true;
    })
  }

  navigate()
  {
    this.isSubmitted = false;
  }

}
