import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Specialty } from 'src/app/clases/specialty';
import { FileI } from 'src/app/interface/file';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecialtyService } from 'src/app/services/specialty-service';
import { textSpanIntersectsWithTextSpan } from 'typescript';

@Component({
  selector: 'app-specialty-form',
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.sass']
})
export class SpecialtyFormComponent implements OnInit
{
  @Output() specialty = new EventEmitter<Specialty>();
  specialtyForm: FormGroup;
  mostrarMensaje:boolean;
  spinner:boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private specialtyService: SpecialtyService
  )
  { 
    this.mostrarMensaje = false;
    this.spinner = false;
  }

  ngOnInit(): void
  {
    this.createFormSpecialty();
  }

  createFormSpecialty()
  {
    this.specialtyForm = this.fb.group({
      specialty: ["", Validators.required],
      duration: ["", Validators.required]
    });
  }
  addSpecialty()
  {
    this.spinner = true;
    console.log(this.specialtyForm.value);
    var newSpecialty = new Specialty();
    newSpecialty.specialty = this.specialtyForm.controls['specialty'].value;
    newSpecialty.duration = this.specialtyForm.controls['duration'].value;
    this.specialtyService.addSpecialty(newSpecialty).then(value =>
    {
      this.spinner = false;
      this.mostrarMensaje = !this.mostrarMensaje;
      this.specialty.emit(newSpecialty);
    })
  }

  resetForm(){
    this.mostrarMensaje = !this.mostrarMensaje;
    this.specialtyForm.reset();
  }

}
