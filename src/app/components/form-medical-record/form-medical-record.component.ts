import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

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
  totalDinamicData:number=0;
  mostrarMensaje=false;
  spinner:boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private medicalRecordService:MedicalRecordService
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
      console.log(this.medicalRecordForm.value);
      
      this.spinner = true;
      this.medicalRecordService.addMedicalRecord(this.medicalRecordForm.value).then(v=>{
        this.spinner = false;
        this.registered = true;        
      })

    } catch (error)
    {
      console.error(error);
    }
  }

  addDinamicData(){
    console.log(this.labelDinamic,this.dataDinamic, this.totalDinamicData);
    if(this.totalDinamicData == 0){
      this.medicalRecordForm.controls["label1"].setValue(this.labelDinamic);
      this.medicalRecordForm.controls["valor1"].setValue(this.dataDinamic);
    }else if(this.totalDinamicData == 1){
      this.medicalRecordForm.controls["label2"].setValue(this.labelDinamic);
      this.medicalRecordForm.controls["valor2"].setValue(this.dataDinamic);
    }
    else if(this.totalDinamicData == 2){
      this.medicalRecordForm.controls["label3"].setValue(this.labelDinamic);
      this.medicalRecordForm.controls["valor3"].setValue(this.dataDinamic);
    }
    this.totalDinamicData++;
    this.mostrarMensaje=true;
  }
  navigate()
  {
    this.registered = false;
  }
  resetForm(){
    this.labelDinamic = "";
    this.dataDinamic = "";
    this.mostrarMensaje = false;
  }
}
