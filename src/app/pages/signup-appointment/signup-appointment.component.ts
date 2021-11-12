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
  specialtyIndex: number;
  professionals: Professional[];
  selectedProfessional: Professional;
  patients: Patient[] = [];
  patient: Patient;
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
      this.user = user;
      if (this.user.usertype == UserType.PATIENT)
      {
        this.patient = user;
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
      console.log("Dia de semana! se trabaja hasta:");
      let hora = new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.EntradaSemana).getHours();
      let minutos = new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.EntradaSemana).getMinutes();
      let horaFin = new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.SalidaSemana);
      console.log(new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.SalidaSemana).toLocaleTimeString());
      this.filtrarHorarios(date, hora, minutos, horaFin);
    }
    else
    { //saturday
      console.log("sabado! se trabaja hasta:");
      
      let hora = new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.EntradaSabado).getHours();
      let minutos = new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.EntradaSabado).getMinutes();
      let horaFin = new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.SalidaSabado);
      console.log(new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.SalidaSabado).toLocaleTimeString());
      
      this.filtrarHorarios(date, hora, minutos, horaFin);
    }
  }

  filtrarHorarios(date: Date, hora, minutos, horaFin:Date)
  {
    /* console.log(date.toLocaleTimeString());
    console.log(hora,minutos,horaFin); */
    
    horaFin.setFullYear(date.getFullYear(),date.getMonth(),date.getDate());
    let taken: boolean = false;
    if (this.newAppointment.specialty && this.newAppointment.professional)
    {            
      date.setHours(hora, minutos, 0, 0);
      do
      {
        taken = false;
        let newAppointment = new Appointment({ patient: this.patient });

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
        hora = date.getTime();        
      } while (hora < horaFin)
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
        if (this.filtrarHorarios(today, 8, 0, new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.SalidaSemana)))
        {
          this.datesList.push(new Date(today.valueOf()));
        }
      }
      else if (today.getDay() == 6)
      {
        /* console.log("HOY ES SABADO:", today.getDay()); */
        if (this.filtrarHorarios(today, 8, 0, new Date(this.selectedProfessional.specialty[this.specialtyIndex].disponibilidadHoraria.SalidaSabado)))
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
    this.newAppointment.specialty = specialty;
    this.findSpecialtyIndex(specialty);
    this.newAppointmentList[0] = this.newAppointment;
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
  }
  findSpecialtyIndex(specialty: Specialty)
  {
    this.selectedProfessional.specialty.forEach((s, i) =>
    {
      if (s.id == this.selectedSpecialty.id)
      {
        this.specialtyIndex = i;
      }
    })

  }

  onChooseProfessional(professional: Professional)
  {
    this.selectedProfessional = professional;
    this.lastAppointment = undefined;
    this.selectedSpecialty = undefined;
    this.selectedDay = false;
    this.newAppointment = new Appointment({ professional: professional, patient: this.patient });


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
        this.newAppointment = new Appointment({ patient: this.patient });

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
      this.patients = patients.filter(pat => pat.usertype == UserType.PATIENT);;
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
    this.patient = patient;
    this.newAppointmentList[0] = this.newAppointment;
  }

}
