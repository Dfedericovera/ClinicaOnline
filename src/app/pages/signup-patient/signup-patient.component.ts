import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-patient',
  templateUrl: './signup-patient.component.html',
  styleUrls: ['./signup-patient.component.sass']
})
export class SignupPatientComponent implements OnInit {

  registroForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
  }

  create(){
  }

}
