import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.sass']
})
export class AppointmentFormComponent implements OnInit {

  minDate = new Date().getFullYear()+'-'+('0' + (new Date().getMonth() + 1)).slice(-2)+'-'+('0' + new Date().getDate()).slice(-2);
  filtro:any;
  
  appointmentForm: FormGroup;
  constructor(
    private datePipe : DatePipe,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm()
  {
    this.appointmentForm = this.fb.group({
      date: ["", Validators.required],
      filter: new FormControl('professional'),

    });
  }

  changeDate(input, filtro){
    /* let date = new Date(input.value); */
    console.log(this.appointmentForm.controls.date.value);
    console.log(this.appointmentForm.controls.filter.value);

  }
}
