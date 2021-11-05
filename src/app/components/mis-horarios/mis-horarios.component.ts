import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

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
  @Input() user: Professional;

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService,
    private specialtyService: SpecialtyService
  )
  {

  }

  ngOnInit(): void
  {
    this.getSpecialtys();
    this.createForm();
    this.cargarHorarios();
  }

  getSpecialtys()
  {
    this.specialtyService.getSpecialtys().subscribe(v =>
    {
      this.specialtys = v;
    })
  }

  cargarHorarios()
  {
    let ESem = new Date(this.user.disponibilidadHoraria.EntradaSemana).getHours().toString() + ':' + new Date(this.user.disponibilidadHoraria.EntradaSemana).getMinutes().toString();
    let SSem = new Date(this.user.disponibilidadHoraria.SalidaSemana).getHours().toString() + ':' + new Date(this.user.disponibilidadHoraria.SalidaSemana).getMinutes().toString();
    let ESab = new Date(this.user.disponibilidadHoraria.EntradaSabado).getHours().toString() + ':' + new Date(this.user.disponibilidadHoraria.EntradaSabado).getMinutes().toString();
    let SSab = new Date(this.user.disponibilidadHoraria.SalidaSabado).getHours().toString() + ':' + new Date(this.user.disponibilidadHoraria.SalidaSabado).getMinutes().toString();

    this.ngEntradaSemana = ESem;
    this.ngSalidaSemana = SSem;
    this.ngEntradaSabado = ESab;
    this.ngSalidaSabado = SSab;

  }

  createForm()
  {
    if (this.user.disponibilidadHoraria != undefined)
    {
      this.horarioForm = this.fb.group({
        horarioEntradaSab: [this.user.disponibilidadHoraria.EntradaSemana, [Validators.required]],
        horarioSalidaSab: [this.user.disponibilidadHoraria.SalidaSemana, [Validators.required]],
        horarioEntrada: [this.user.disponibilidadHoraria.EntradaSabado, [Validators.required]],
        horarioSalida: [this.user.disponibilidadHoraria.SalidaSabado, [Validators.required]]
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

  }

  onSubmit()
  {
    this.user.disponibilidadHoraria = {
      EntradaSemana: this.horarioForm.controls['horarioEntrada'].value.getTime(),
      SalidaSemana: this.horarioForm.controls['horarioSalida'].value.getTime(),
      EntradaSabado: this.horarioForm.controls['horarioEntradaSab'].value.getTime(),
      SalidaSabado: this.horarioForm.controls['horarioSalidaSab'].value.getTime()
    }

    /*     this.user.disponibilidadHoraria.EntradaSemana = this.horarioForm.controls['horarioEntrada'].value.getTime();
        this.user.disponibilidadHoraria.SalidaSemana = this.horarioForm.controls['horarioSalida'].value.getTime();
        this.user.disponibilidadHoraria.EntradaSabado = this.horarioForm.controls['horarioEntradaSab'].value.getTime();
        this.user.disponibilidadHoraria.SalidaSabado = this.horarioForm.controls['horarioSalidaSab'].value.getTime();
     */
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
