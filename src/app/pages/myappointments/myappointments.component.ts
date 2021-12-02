import { Component, OnInit } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Observable, Subscription } from 'rxjs';
import { FormMedicalRecordComponent } from 'src/app/components/form-medical-record/form-medical-record.component';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.sass']
})
export class MyappointmentsComponent implements OnInit
{

  appointmentsList: Array<Appointment> = [];
  appointmentsListFiltered: Array<Appointment> = [];
  professionalList: Array<Professional>;
  patientList: Array<Patient>;
  specialtyList: Array<Specialty>;
  user: any;
  showAlert: boolean = false;
  selectedAppointment: Appointment;
  selectedAppointmentList: Array<Appointment> = [];
  filter: string;
  message: string;
  spinner: boolean;
  user$: Subscription;

  constructor(
    private appointmentService: AppointmentService,
    private professionalService: ProfessionalService,
    private spacialtyService: SpecialtyService,
    private patientService: PatientService,
    private authService: AuthService,
    public dialog: MatDialog,
  )
  {
    this.appointmentsList = new Array();
  }

  ngOnInit(): void
  {
    this.getMyAppointments();
    this.professionalService.getProfessionals().subscribe(v =>
    {
      this.professionalList = v.filter(professional => professional.usertype == UserType.PROFESSIONAL);
    });
    this.spacialtyService.getSpecialtys().subscribe(v =>
    {
      this.specialtyList = v;
    });
    this.patientService.getPatients().subscribe(v =>
    {
      this.patientList = v.filter(patient => patient.usertype == UserType.PATIENT);;
    })
  }

  ngOnDestroy()
  {
    this.user$.unsubscribe();
  }

  getMyAppointments()
  {
    this.user$ = this.authService.user$.subscribe(user =>
    {
      this.user = user;
      this.appointmentService.getAppointments().subscribe(appointments =>
      {
        this.appointmentsList = appointments.filter(app =>
        {
          if (this.user.usertype == UserType.PATIENT && app.patient.id == this.user.id)
          {
            return app;
          }
          else if (this.user.usertype == UserType.PROFESSIONAL && app.professional.email == this.user.email)
          {
            return app;
          }
          else if (this.user.usertype == UserType.ADMINISTRATOR)
          {
            return app;
          }
        });
        this.appointmentsListFiltered = this.appointmentsList;
      });
    })
  }

  verResenia()
  {
    this.dialog.open(DialogComponent, {
      data: { titulo: 'Reseña: ', mensaje: this.selectedAppointment.review }
    });
  }
  filterAppointments()
  {
    this.filter = this.filter.toLowerCase();
    this.appointmentsListFiltered = this.appointmentsList.filter(appointment =>
    {
      if(appointment.medicalRecord && JSON.stringify(appointment.medicalRecord).toLowerCase().includes(this.filter)){
        /* console.log(JSON.stringify(appointment.medicalRecord).toLowerCase().includes(this.filter)); */     
        return appointment;   
      }
      
      let date = new Date(appointment.timeStamp);
      if (appointment.professional.name.toLowerCase().includes(this.filter) ||
        appointment.specialty.specialty.toLowerCase().includes(this.filter) ||
        appointment.professional.lastName.toLowerCase().includes(this.filter) ||
        date.getDate().toString().includes(this.filter) ||
        date.getMonth().toString().includes(this.filter) ||
        date.getHours().toString().includes(this.filter) ||
        date.getMinutes().toString().includes(this.filter) ||
        appointment.patient.name.toLowerCase().includes(this.filter) ||
        appointment.patient.lastName.toLowerCase().includes(this.filter)
      )
      {
        return appointment;
      }

    })
  }


  onSelectAppointment(appoitment)
  {
    this.selectedAppointment = appoitment;
    this.selectedAppointmentList[0] = this.selectedAppointment;
  }
  onChooseSpecialty(specialty: Specialty)
  {
    this.appointmentsListFiltered = this.appointmentsList.filter(app =>
    {
      if (app.specialty.id == specialty.id)
      {
        return app;
      }
    })

  }
  onChooseProfessional(professional: Professional)
  {
    this.appointmentsListFiltered = this.appointmentsList.filter(app =>
    {
      if (app.professional.email == professional.email)
      {
        return app;
      }
    })

  }
  onChoosePatient(patient: Patient)
  {
    console.log(patient);
    this.appointmentsListFiltered = this.appointmentsList.filter(app =>
    {
      if (app.patient.id == patient.id)
      {
        return app;
      }
    })
  }
  showAll()
  {
    this.appointmentsListFiltered = this.appointmentsList;
  }
  showReview()
  {

  }
  cancelAppointment()
  {
    this.dialog.open(DialogComponent, {
      data: { titulo: 'Cancelar Turno', mensaje: 'Esta seguro que decea cancelar el turno?', tipo: 'cancelar', turno: this.selectedAppointment }
    })
  }
  qualifyAttention()
  {
    this.spinner = true;
    this.dialog.open(DialogComponent, {
      data: { titulo: 'Calificar Atención', mensaje: 'Nos gustaria saber su opinión', tipo: 'calificar', turno: this.selectedAppointment }
    }).afterClosed().subscribe(v =>
    {
      this.spinner = false;
    })

  }
  showPool()
  {
    this.dialog.open(DialogComponent, {
      data: { titulo: 'Encuesta', mensaje: 'Responda algunas preguntas', tipo: 'encuesta', turno: this.selectedAppointment }
    })
  }
  rejectAppointment()
  {
    this.dialog.open(DialogComponent, {
      data: { titulo: 'Rechazar Turno', mensaje: 'Esta seguro que decea rechazar el turno?', tipo: 'rechazar', turno: this.selectedAppointment }
    })
  }
  acceptAppointment()
  {
    this.selectedAppointment.state = AppointmentState.Aceptado;
    this.spinner = true;
    this.appointmentService.editAppointment(this.selectedAppointment).then(app =>
    {
      this.message = "Turno Aceptado.";
      this.showAlert = true;
      this.spinner = false;
    });
  }
  finishAppointment()
  {
    this.dialog.open(FormMedicalRecordComponent, {
      data: { titulo: 'Historia Clinica', mensaje: 'Para finalizar el turno ingrese datos de historia clinica', tipo: 'finalizar', turno: this.selectedAppointment }
    })
  }

  dismissAlert()
  {
    this.showAlert = false;
  }

}
