import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserType } from 'src/app/clases/userType';
import { Appointment } from 'src/app/clases/appointment';
import { MedicalRecord } from 'src/app/clases/medicalRecord';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.sass']
})
export class HistoriaClinicaComponent implements OnInit
{
  user: any;
  appointmentsList: Array<Appointment>;
  fecha: Date = new Date();
  historias:Array<MedicalRecord>;
  constructor(
    private AuthService: AuthService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void
  {
    this.AuthService.user$.subscribe(value =>
    {
      this.user = value;
      this.getMyAppointments();
    })
  }

  getMyAppointments()
  {
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
      this.appointmentsList = this.appointmentsList.filter(app=>{
        if(app.medicalRecord){
          return app;
        }
        /* console.log(app); */
        
      })
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
