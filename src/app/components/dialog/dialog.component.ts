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
      comment: ["", Validators.required],
    });
  }


  cancelarTurno(){
    
    this.turno.comment = this.form.controls['comment'].value;

    this.turno.state = AppointmentState.Cancelado;
    this.appointmentService.editAppointment(this.turno);
  }

}
