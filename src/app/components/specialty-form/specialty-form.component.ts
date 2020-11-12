import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileI } from 'src/app/interface/file';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-specialty-form',
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.sass']
})
export class SpecialtyFormComponent implements OnInit
{
  specialtyForm: FormGroup;
  photo1: FileI;
  photo2: FileI;
  photos: Array<FileI> = new Array();
  registered: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private specialtyService: SpecialtyService
  )
  { }

  ngOnInit(): void
  {
    this.createForm();
  }

  createForm()
  {
    this.specialtyForm = this.fb.group({
      specialty: ["", Validators.required],
      duration: ["", Validators.required],
    });
  }

  onSubmit()
  {
    this.specialtyService.addSpecialty(this.specialtyForm.value).then(()=>{
      console.log('Specialty registered.');
      this.registered = true;
    })
  }

  navigate(){
    this.router.navigate(['/home']);
  }


}
