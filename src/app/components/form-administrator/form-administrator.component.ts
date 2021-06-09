import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Specialty } from 'src/app/clases/specialty';
import { FileI } from 'src/app/interface/file';
import { AdministratorService } from 'src/app/services/administrator.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-form-administrator',
  templateUrl: './form-administrator.component.html',
  styleUrls: ['./form-administrator.component.sass']
})
export class FormAdministratorComponent implements OnInit {

  administratorForm: FormGroup;
  photo1: FileI;
  photos: Array<FileI>;
  registered: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private administratorService:AdministratorService,
    private router: Router,
  )
  {
    this.registered = false;
    this.photos = new Array();
  }

  ngOnInit(): void
  {
    this.createForm();
  }

  createForm()
  {
    this.administratorForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      dni: ["", [Validators.required, Validators.minLength(7)]],
      age: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit()
  {
    try
    {
      this.assignPhotos();
      this.authService.register(this.administratorForm.controls.email.value, this.administratorForm.controls.password.value).then(user =>
      {
        if (user)
        {
          this.administratorForm.controls['id'].setValue(user.uid);
          this.administratorService.createAdministrator(this.administratorForm.value, this.photos).then(patient =>
          {
            console.log('Professional Created', patient);
            user.updateProfile({
              displayName: patient.name,
            }).then(() =>
            {
              console.log('Now Verify your email to login.');
              this.registered = true;
            })
          });
        }
      }).catch(error => { console.log('Error', error); });

    } catch (error)
    {
      console.error(error);
    }
  }

  handlePhoto1(file)
  {
    this.photo1 = file.target.files[0];
  }

  assignPhotos()
  {
    if (this.photo1)
    {
      this.photos.push(this.photo1);
    }
  }

}
