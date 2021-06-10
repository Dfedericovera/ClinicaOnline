import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Specialty } from 'src/app/clases/specialty';
import { FileI } from 'src/app/interface/file';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-form-professional',
  templateUrl: './form-professional.component.html',
  styleUrls: ['./form-professional.component.sass']
})
export class FormProfessionalComponent implements OnInit
{

  professionalForm: FormGroup;
  photo1: FileI;
  photo2: FileI;
  photos: Array<FileI>;
  registered: boolean;
  specialtys: Specialty[];
  specialtysChoosen: Specialty[];
  showSpecialtyForm:boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private profesionalService: ProfessionalService,
    private router: Router,
    private specialtyService: SpecialtyService
  )
  {
    this.showSpecialtyForm = false;
    this.registered = false;
    this.photos = new Array();
  }

  ngOnInit(): void
  {
    this.createForm();
    this.specialtyService.getSpecialtys().subscribe(specialtys =>
    {
      this.specialtys = specialtys;
      console.log(specialtys);
    })
  }

  createForm()
  {
    this.professionalForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      dni: ["", [Validators.required, Validators.minLength(7)]],
      age: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      specialty: [Array, Validators.required],
      approved: [""],
      usertype:["professional"]
    });
  }

  verError(){
    console.log(this.professionalForm );
    
  }

  onSubmit()
  {
    try
    {
      /* console.log(this.professionalForm.value); */
      this.assignPhotos();
      this.authService.register(this.professionalForm.controls.email.value, this.professionalForm.controls.password.value).then(user =>
      {
        if (user)
        {
          this.professionalForm.controls['id'].setValue(user.uid);
          this.professionalForm.controls['approved'].setValue(false);
          this.profesionalService.createProfessional(this.professionalForm.value, this.photos).then(patient =>
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

  handlePhoto2(file)
  {
    this.photo2 = file.target.files[0];
  }

  assignPhotos()
  {
    if (this.photo1)
    {
      this.photos.push(this.photo1);
    }/* 
    if(this.photo2){
      this.photos.push(this.photo2);
    } */
  }

  navigate()
  {
    this.router.navigate(['/home']);
  }

  onChooseSpecialty(specialty: Specialty)
  {
    if (!this.specialtysChoosen)
    {
      this.specialtysChoosen = [];
      this.specialtysChoosen.push(specialty);
      this.professionalForm.controls['specialty'].setValue(this.specialtysChoosen);
      console.log(specialty);
    }
    else
    {
      let isAlreadyChoosen = false;
      this.specialtysChoosen.forEach(specialtyChoosen =>
      {
        if (specialty.specialty == specialtyChoosen.specialty)
        {
          isAlreadyChoosen = true;
        }
      })
      if (!isAlreadyChoosen)
      {
        this.specialtysChoosen.push(specialty);
        this.professionalForm.controls['specialty'].setValue(this.specialtysChoosen);
        console.log(specialty);
      }
    }


  }

  deleteSpecialty(index)
  {
    this.specialtysChoosen.splice(index,1);
  }
}
