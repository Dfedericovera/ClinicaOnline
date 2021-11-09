import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Administrator } from 'src/app/clases/administrator';
import { Appointment, AppointmentState } from 'src/app/clases/appointment';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { Specialty } from 'src/app/clases/specialty';
import { UserType } from 'src/app/clases/userType';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { SpecialtyService } from 'src/app/services/specialty-service';

@Component({
  selector: 'app-signup-appointment',
  templateUrl: './signup-appointment.component.html',
  styleUrls: ['./signup-appointment.component.sass']
})
export class SignupAppointmentComponent implements OnInit
{
  user: Patient;
  newAppointmentList: Appointment[] = [];
  newAppointment: Appointment;
  freeAppointments: Appointment[];
  freeProfessionals: Professional[];
  freeSpecialtys: Specialty[];
  datesList: Date[];
  date: Date;

  appointments: Array<Appointment>;
  todaysAppointments: Array<Appointment>;
  selectedDay: boolean;
  lastAppointment: Appointment;
  specialtys: Specialty[];
  selectedSpecialty: Specialty;
  professionals: Professional[];
  selectedProfessional: Professional;
  patientList: Patient[] = [];
  showAlert: boolean;
  spinner: boolean;

  appointmentForm: FormGroup;
  user$: Subscription;


  constructor(
    private appointmentService: AppointmentService,
    private professionalService: ProfessionalService,
    private specialtyService: SpecialtyService,
    private patientService: PatientService,
    private authService: AuthService
  )
  {
    this.freeAppointments = [];
    this.showAlert = false;
    this.date = new Date();
  }

  ngOnInit(): void
  {
    this.getUser();
    this.getSpecialtys();
    this.getProfessionals();
    this.getAppointments();
    this.getPatients();
  }
  ngOnDestroy()
  {
    this.user$.unsubscribe();
  }

  getUser()
  {
    this.user$ = this.authService.user$.subscribe(user =>
    {
      if (user.usertype == 'administrator')
      {
        this.user = user;
      }
    })
  }
  onChooseDate(date: Date)
  {
    this.selectedDay = true;
    this.createAvailableList(date);
  }

  createAvailableList(date: Date)
  {
    this.date = date;
    this.getTodaysAppointments(date);
    this.freeAppointments = new Array();

    if (date.getDay() > 0 && date.getDay() != 6)
    {//weekday
      let hora = 8;
      let minutos = 0;
      let horaFin = 19;
      this.filtrarHorarios(date, hora, minutos, horaFin);

    }
    else
    { //saturday
      let hora = 8;
      let minutos = 0;
      let horaFin = 14;
      this.filtrarHorarios(date, hora, minutos, horaFin);
    }
  }

  filtrarHorarios(date: Date, hora, minutos, horaFin)
  {
    let taken: boolean = false;
    /* console.log(this.todaysAppointments); */

    if (this.newAppointment.specialty && this.newAppointment.professional)
    {
      date.setHours(hora, minutos, 0, 0);
      do
      {
        taken = false;
        let newAppointment = new Appointment({ patient: this.user });

        newAppointment.professional = this.newAppointment.professional;
        newAppointment.specialty = this.newAppointment.specialty;

        newAppointment.timeStamp = date.valueOf();
        //FILTRAR ESTE ARRAY POR PROFESIONAL Y ESPECIALIDAD.        
        this.todaysAppointments.forEach(tA =>
        {
          if (tA.timeStamp == newAppointment.timeStamp && tA.specialty.id == newAppointment.specialty.id && tA.professional.id == newAppointment.professional.id)
          {
            /* console.log("Turno tomado"); */
            taken = true;
          }
        })
        if (!taken)
        {
          this.freeAppointments.push(newAppointment);
        }
        date = new Date(this.addMinutes(date, this.newAppointment.specialty.duration));
        hora = date.getHours();
      } while (hora < horaFin)
      hora = 8;
      minutos = 0;

    }
    if (this.freeAppointments.length < 1)
    {
      return false;
    }
    return true;
  }

  createDatesList()
  {
    let today = new Date();
    this.datesList = new Array();
    for (let i = 0; i < 16; i++)
    {
      this.getTodaysAppointments(today);
      this.freeAppointments = [];
      if (today.getDay() == 1 || today.getDay() == 2 || today.getDay() == 3 || today.getDay() == 4 || today.getDay() == 5)
      {
        /* console.log("HOY ES DIA DE SEMANA:", today.getDay()); */
        if (this.filtrarHorarios(today, 8, 0, 19))
        {
          this.datesList.push(new Date(today.valueOf()));
        }
      }
      else if (today.getDay() == 6)
      {
        /* console.log("HOY ES SABADO:", today.getDay()); */
        if (this.filtrarHorarios(today, 8, 0, 14))
        {
          this.datesList.push(new Date(today.valueOf()));
        }
      }
      else
      {
        /* console.log("HOY ES DOMINGO CERRADO", today.getDay()); */
      }
      /* console.log(today.valueOf()) */
      today = new Date(this.addDay(today, 1));
    }
  }
  /**
   * 
   * @param date Objeto DATE
   * @param days Days you want to add
   * @returns Milisecons 
   */
  addDay(date: Date, days: number)
  {
    return date.valueOf() + 86400000 * days;
  }
  addMinutes(date: Date, minutes: number)
  {
    return date.valueOf() + 60000 * minutes;
  }

  onChooseSpecialty(specialty: Specialty)
  {
    this.selectedSpecialty = specialty;
    this.selectedDay = false;
    this.newAppointment.specialty =  specialty;

    this.newAppointmentList[0] = this.newAppointment;
    let isSameSpecialty: boolean;
    if (this.newAppointment.professional)
    {
      let coincidence: Professional;
      coincidence = this.freeProfessionals.find(pro =>
      {
        if (pro.id == this.newAppointment.professional.id)
        {
          return pro;
        }
      })
      if (!coincidence)
      {
        console.log("NO COINCIDE");
        this.newAppointment.specialty = specialty;
        this.newAppointmentList[0] = this.newAppointment;
      }
    }
    this.createDatesList();
    /* this.date = new Date();
    this.createAvailableList(this.date); */
  }

  onChooseProfessional(professional: Professional)
  {
    this.selectedProfessional = professional;
    this.lastAppointment = undefined;
    this.selectedSpecialty = undefined;
    if (this.user.usertype == UserType.ADMINISTRATOR)
    {
      this.newAppointment = new Appointment({ professional: professional });
    }
    else
    {
      this.newAppointment = new Appointment({ professional: professional, patient: this.user });
    }


    this.newAppointmentList[0] = this.newAppointment;
    this.freeSpecialtys = this.specialtys.filter(specialty =>
    {
      let isSameSpecialty: boolean = false;
      this.newAppointment.professional.specialty.forEach(proSpecialty =>
      {
        if (proSpecialty.specialty == specialty.specialty)
        {
          isSameSpecialty = true;
        }
      })
      if (isSameSpecialty)
      {
        return specialty;
      }
    })
    if (this.newAppointment.specialty)
    {
      let coincidence: Specialty;
      coincidence = this.freeSpecialtys.find(specialty =>
      {
        if (specialty.id == this.newAppointment.specialty.id)
        {
          return specialty;
        }
      })
      if (!coincidence)
      {
        console.log("NO COINCIDE");
        this.newAppointment = new Appointment({ patient: this.user });

        this.newAppointment.professional = professional;
        this.newAppointmentList[0] = this.newAppointment;
      }
    }
  }

  getSpecialtys()
  {
    this.specialtyService.getSpecialtys().subscribe(specialtys =>
    {
      this.specialtys = specialtys;
      this.freeSpecialtys = specialtys;
    })
  }
  getProfessionals()
  {
    this.professionalService.getProfessionals().subscribe(professionals =>
    {
      this.professionals = professionals.filter(pro => pro.approved && pro.usertype == UserType.PROFESSIONAL);
      this.freeProfessionals = professionals.filter(pro => pro.approved && pro.usertype == UserType.PROFESSIONAL);
    })
  }
  getPatients()
  {
    this.patientService.getPatients().subscribe(patients =>
    {
      this.patientList = patients.filter(pat => pat.usertype == UserType.PATIENT);;
    })
  }
  /**
   * 
   * @param date Appointments for this Date 
   */
  getAppointments()
  {
    this.appointmentService.getAppointments().subscribe(appointments =>
    {
      this.appointments = appointments;
      /* if (!this.newAppointment.professional && !this.newAppointment.specialty && !this.newAppointment.timeStamp)
      {
        this.createAvailableList(this.date);
      } */
      this.getTodaysAppointments(new Date());
    })
  }

  getTodaysAppointments(date: Date)
  {
    this.todaysAppointments = this.appointments.filter(appointment =>
    {
      let appDate = new Date(appointment.timeStamp)
      if (date.getDate() == appDate.getDate() && date.getMonth() == appDate.getMonth() && date.getFullYear() == appDate.getFullYear())
      {
        return appointment;
      }
    })
  }

  cleanForm()
  {
    this.newAppointmentList = [];
    this.freeProfessionals = this.professionals;
    this.freeSpecialtys = this.specialtys;
  }

  submit()
  {
    this.newAppointment.state = AppointmentState.Solicitado;
    this.appointmentService.addAppointment(this.newAppointment).then(value =>
    {
      console.log("Turno Creado");
      this.createAvailableList(this.date);
      this.showAlert = true;
      this.spinner = false;
    })

  }

  onSelectAppointment(app: Appointment)
  {
    this.newAppointment = app;
    this.newAppointmentList[0] = this.newAppointment;
    this.spinner = true;
    this.submit();
  }

  dismissAlert()
  {
    this.showAlert = !this.showAlert;
    this.newAppointmentList[0] = this.newAppointment;
    this.lastAppointment = undefined;
  }

  onChoosePatient(patient: Patient)
  {
    this.user = patient;
    this.newAppointment.patient = patient;
    this.newAppointmentList[0] = this.newAppointment;
  }

}
