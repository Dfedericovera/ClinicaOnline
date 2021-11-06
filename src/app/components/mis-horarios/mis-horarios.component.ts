import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';
enum DEFAULTHOURS
{
  entradaSabado = '08:00',
  salidaSabado = '14:00',
  entradaSemana = '08:00',
  salidaSemana = '18:00'
}
@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.sass']
})
export class MisHorariosComponent implements OnInit
{


  horarioForm: FormGroup;
  showForm: boolean = false;
  isSubmitted: boolean = false;
  specialtys: Array<Specialty>;
  ngEntradaSemana: string;
  ngSalidaSemana: string;
  ngEntradaSabado: string;
  ngSalidaSabado: string;
  indexSpecialtySelected: number = 0;
  @Input() user: Professional;

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService,
    private specialtyService: SpecialtyService
  )
  { }

  ngOnInit(): void
  {
    this.getSpecialtys();
    this.createForm();
    this.cargarHorarios()
  }

  getSpecialtys()
  {
    this.specialtys = this.user.specialty;
  }

  cargarHorarios()
  {
    console.log(typeof(this.specialtys[this.indexSpecialtySelected].disponibilidadHoraria));
    
    if (typeof(this.specialtys[this.indexSpecialtySelected].disponibilidadHoraria) == 'undefined')
    {
      this.ngEntradaSemana = DEFAULTHOURS.entradaSemana;
      this.ngSalidaSemana = DEFAULTHOURS.salidaSemana;
      this.ngEntradaSabado = DEFAULTHOURS.entradaSabado;
      this.ngSalidaSabado = DEFAULTHOURS.salidaSabado;
    }
    else
    {
      let ESem = new Date(this.user.specialty[this.indexSpecialtySelected].disponibilidadHoraria.EntradaSemana).getHours().toString() + ':' + this.validarMinutos(new Date(this.user.specialty[0].disponibilidadHoraria.EntradaSemana));
      let SSem = new Date(this.user.specialty[this.indexSpecialtySelected].disponibilidadHoraria.SalidaSemana).getHours().toString() + ':' + this.validarMinutos(new Date(this.user.specialty[0].disponibilidadHoraria.SalidaSemana));
      let ESab = new Date(this.user.specialty[this.indexSpecialtySelected].disponibilidadHoraria.EntradaSabado).getHours().toString() + ':' + this.validarMinutos(new Date(this.user.specialty[0].disponibilidadHoraria.EntradaSabado));
      let SSab = new Date(this.user.specialty[this.indexSpecialtySelected].disponibilidadHoraria.SalidaSabado).getHours().toString() + ':' + this.validarMinutos(new Date(this.user.specialty[0].disponibilidadHoraria.SalidaSabado));
      this.ngEntradaSemana = ESem;
      this.ngSalidaSemana = SSem;
      this.ngEntradaSabado = ESab;
      this.ngSalidaSabado = SSab;
    }

  }

  validarMinutos(date: Date)
  {
    if (date.getMinutes() < 10)
    {
      return '0' + date.getMinutes().toString();
    }
    return date.getMinutes().toString();
  }

  createForm()
  {
    if (this.user.specialty[0].disponibilidadHoraria != undefined)
    {
      this.horarioForm = this.fb.group({
        horarioEntradaSab: [new Date(this.user.specialty[0].disponibilidadHoraria.EntradaSemana), [Validators.required]],
        horarioSalidaSab: [new Date(this.user.specialty[0].disponibilidadHoraria.SalidaSemana), [Validators.required]],
        horarioEntrada: [new Date(this.user.specialty[0].disponibilidadHoraria.EntradaSabado), [Validators.required]],
        horarioSalida: [new Date(this.user.specialty[0].disponibilidadHoraria.SalidaSabado), [Validators.required]]
      });
    }
    else
    {
      this.horarioForm = this.fb.group({
        horarioEntradaSab: ["", [Validators.required]],
        horarioSalidaSab: ["", [Validators.required]],
        horarioEntrada: ["", [Validators.required]],
        horarioSalida: ["", [Validators.required]]
      });
    }
  }

  onChooseSpecialty(specialty: Specialty)
  {
    this.specialtys.forEach((v, i) =>
    {
      if (specialty.id == v.id)
      {
        this.indexSpecialtySelected = i;
      }
    })
    this.cargarHorarios();
  }

  onSubmit()
  {
    this.user.specialty[this.indexSpecialtySelected].disponibilidadHoraria = {
      EntradaSemana: this.horarioForm.controls['horarioEntrada'].value.getTime(),
      SalidaSemana: this.horarioForm.controls['horarioSalida'].value.getTime(),
      EntradaSabado: this.horarioForm.controls['horarioEntradaSab'].value.getTime(),
      SalidaSabado: this.horarioForm.controls['horarioSalidaSab'].value.getTime()
    }
    this.professionalService.editProfessional(this.user).then(v =>
    {
      this.isSubmitted = true;
    })
  }

  convertirTimepickerToDate(timepicker: string)
  {
    let horario = timepicker.split(':');//Horas
    horario[1] = horario[1].split(' ')[0];//Minutos
    let date = new Date();
    date.setHours(Number.parseInt(horario[0]), Number.parseInt(horario[1]));
    return date;
  }

  entradaSemana(timepicker: string)
  {
    let date = this.convertirTimepickerToDate(timepicker);
    this.horarioForm.controls['horarioEntrada'].setValue(date);
  }

  salidaSemana(timepicker: string)
  {
    let date = this.convertirTimepickerToDate(timepicker);
    this.horarioForm.controls['horarioSalida'].setValue(date);
  }

  entradaSabado(timepicker: string)
  {
    let date = this.convertirTimepickerToDate(timepicker);
    this.horarioForm.controls['horarioEntradaSab'].setValue(date);
  }

  salidaSabado(timepicker: string)
  {
    let date = this.convertirTimepickerToDate(timepicker);
    this.horarioForm.controls['horarioSalidaSab'].setValue(date);
  }

  navigate()
  {
    this.isSubmitted = false;
  }

}
