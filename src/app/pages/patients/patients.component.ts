import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/clases/appointment';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { UserType } from 'src/app/clases/userType';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit
{

  fecha: Date = new Date();
  patients: Array<Patient> = [];
  patient: Patient;
  user$: any;
  user: Professional;
  appointmentsList: Appointment[];
  patientAppointments: Appointment[];
  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit(): void
  {
    this.getPatients();
    this.getMyAppointments();
  }
  ngOnDestroy()
  {
    this.user$.unsubscribe();
  }
  getPatients()
  {
    this.patientService.getPatients().subscribe(p =>
    {
      this.patients = p.filter(patient => patient.usertype == UserType.PATIENT);
    })
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
        this.filtrarPacientesAtendidos();
      });
    })
  }
  getMedicalRecords(patient: Patient)
  {
    this.appointmentService.getAppointments().subscribe(appointments =>
    {
      this.patientAppointments = appointments.filter(app =>
      {
        if (app.patient.id == patient.id && app.medicalRecord)
        {
          return app;
        }
      });
    });
  }
  filtrarPacientesAtendidos()
  {
    var pacientesAtendidos: Array<Patient> = [];
    this.patients.forEach(p =>
    {
      var esta = false;
      this.appointmentsList.forEach(app =>
      {
        if (p.email == app.patient.email)
        {
          esta = true;
        }
      })
      if (esta)
      {
        pacientesAtendidos.push(p);
      }
    })
    this.patients = pacientesAtendidos;
  }

  onChoosePatient(patient: Patient)
  {
    this.patient = patient;
    this.getMedicalRecords(patient);
  }
  pdf()
  {
    var data = document.getElementById('pdf');
    html2canvas(data).then(canvas =>
    {
      var imgWidht = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidht / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'png', 0, position, imgWidht, imgHeight);
      pdf.save('MisDatos');
    })
  }
}
