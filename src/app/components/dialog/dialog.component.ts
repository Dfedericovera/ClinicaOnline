import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment, AppointmentState } from 'src/app/clases/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit
{

  mensaje: string;
  titulo:string;
  tipo:string;
  turno:Appointment;
  form:FormGroup;
  encuestaForm:FormGroup;
  constructor(
    private appointmentService:AppointmentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { titulo:string, mensaje: string, tipo:string, turno:Appointment },
  ) { }

  ngOnInit(): void
  {
    this.tipo = this.data.tipo;
    this.titulo = this.data.titulo;
    this.mensaje = this.data.mensaje;
    this.turno = this.data.turno;
    this.createForm();
  }

  createForm()
  {    
    this.form = this.fb.group({
      review: ["", Validators.required],
    });
    this.encuestaForm = this.fb.group({
      recomienda: ["", Validators.required],
      consentimiento: ["", Validators.required],
    })
  }


  cancelarTurno(){
    
    this.turno.review = this.form.controls['review'].value;

    this.turno.state = AppointmentState.Cancelado;
    this.appointmentService.editAppointment(this.turno);
  }

  rechazarTurno(){
    this.turno.review = this.form.controls['review'].value;
    this.turno.state = AppointmentState.Rechazado;
    this.appointmentService.editAppointment(this.turno);
  }

  finalizarTurno(){
    this.turno.review = this.form.controls['review'].value;
    this.turno.state = AppointmentState.Realizado;
    this.appointmentService.editAppointment(this.turno);
  }

  calificarTurno(){
    this.turno.comment = this.form.controls['review'].value;
    this.appointmentService.editAppointment(this.turno);
  }

  encuesta(){
    this.turno.quiz = {
      recomienda : this.encuestaForm.controls['recomienda'].value,
      consentimiento: this.encuestaForm.controls['consentimiento'].value
    }    
    this.appointmentService.editAppointment(this.turno);
  }

}
