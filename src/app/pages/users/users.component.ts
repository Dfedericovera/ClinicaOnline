import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { PatientService } from 'src/app/services/patient.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/clases/appointment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit
{
  userInfo: boolean;
  approveProfessional: boolean;
  formAdministrator: boolean;
  formPatient: boolean;
  formProfessional: boolean;
  patientsList: Patient[];
  professionalList: Array<Professional> = [];
  forms: boolean;
  patient:Patient;
  patientAppointments:Appointment[];
  fecha: Date = new Date();

  constructor(
    private patientService: PatientService,
    private professionalService: ProfessionalService,
    private appointmentService:AppointmentService
  )
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }

  ngOnInit(): void
  {
    this.patientService.getPatients().subscribe(value =>
    {
      this.patientsList = value.filter(user => user.usertype == "patient");
    });
    this.professionalService.getProfessionals().subscribe(value =>
    {
      this.professionalList = value.filter(user => user.usertype == "professional");
    })

  }

  showUserInfo()
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }

  showApproveProfessional()
  {
    this.userInfo = false;
    this.approveProfessional = true;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }
  showform()
  {
    this.userInfo = false;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = true;
  }

  showForms(who)
  {
    this.userInfo = false;
    this.approveProfessional = false;

    if (who == "administrator")
    {
      this.formAdministrator = true;
      this.formProfessional = false;
      this.formPatient = false;
    }
    else if (who == "professional")
    {
      this.formAdministrator = false;
      this.formProfessional = true;
      this.formPatient = false;
    }
    else
    {
      this.formAdministrator = false;
      this.formProfessional = false;
      this.formPatient = true;
    }

  }

  excel()
  {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.patientsList); */

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "Usuarios.xlsx");
  }

  onChoosePatient(patient:Patient){
    this.patient = patient;
    this.getMedicalRecords(patient);
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
