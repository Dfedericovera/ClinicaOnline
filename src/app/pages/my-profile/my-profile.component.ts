import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass']
})
export class MyProfileComponent implements OnInit
{

  user: Usuario;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void
  {
    this.getUser();
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  getUser()
  {
    this.userSubscription = this.authService.user$.subscribe(user =>
    {      
      this.user = user;
    })
  }

  pdf(){
      var data = document.getElementById('pdf');
      html2canvas(data).then(canvas=>{
        var imgWidht = 309;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidht /canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p','mm','a4');
        var position = 0;
        pdf.addImage(contentDataURL,'png',0,position,imgWidht,imgHeight);
        pdf.save('MisDatos');
      })
  }

}
