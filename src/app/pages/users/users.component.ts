import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/clases/patient';
import { Professional } from 'src/app/clases/professional';
import { PatientService } from 'src/app/services/patient.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import * as XLSX from 'xlsx';


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

  constructor(
    private patientService: PatientService,
    private professionalService: ProfessionalService
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

//npm i --save exceljs file-saver
/*   excel2()
  {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Brand', key: 'brand', width: 10 },
      { header: 'Color', key: 'color', width: 10 },
      { header: 'Price', key: 'price', width: 10, style: { font: { name: 'Arial Black', size: 10 } } },
    ];

    this.data.forEach(e =>
    {
      worksheet.addRow({ id: e.id, name: e.name, brand: e.brand, color: e.color, price: e.price }, "n");
    });

    workbook.xlsx.writeBuffer().then((data) =>
    {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })
  } */

}
