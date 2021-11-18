import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/app/clases/userType';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-form-medical-record',
  templateUrl: './form-medical-record.component.html',
  styleUrls: ['./form-medical-record.component.sass']
})
export class FormMedicalRecordComponent implements OnInit {

  medicalRecordForm: FormGroup;
  registered: boolean;
  showSpecialtyForm:boolean;
  labelDinamic:string;
  dataDinamic:string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    
  )
  {
    this.showSpecialtyForm = false;
    this.registered = false;
  }

  ngOnInit(): void
  {
    this.createForm();
  }

  createForm()
  {
    this.medicalRecordForm = this.fb.group({
      id: [""],
      altura: ["", Validators.required],
      peso: ["", [Validators.required, Validators.min(0), Validators.max(99)]],
      temperatura: ["", [Validators.required, Validators.min(0), Validators.max(99)]],
      presion: ["", [Validators.required, Validators.min(0), Validators.max(500)]],
      label1: [""],
      valor1: [""],
      label2: [""],
      valor2: [""],
      label3: [""],
      valor3: [""],
    });
  }

  verError(){
    console.log(this.medicalRecordForm );    
  }

  onSubmit()
  {
    try
    {
      this.authService.register(this.medicalRecordForm.controls.email.value, this.medicalRecordForm.controls.password.value).then(user =>
      {
        
      }).catch(error => { console.log('Error', error); });

    } catch (error)
    {
      console.error(error);
    }
  }

  addDinamicData(){

  }
  navigate()
  {
  }
}
