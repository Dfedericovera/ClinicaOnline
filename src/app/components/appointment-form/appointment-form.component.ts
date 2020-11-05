import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.sass']
})
export class AppointmentFormComponent implements OnInit {

  minDate = new Date().getFullYear()+'-'+('0' + (new Date().getMonth() + 1)).slice(-2)+'-'+('0' + new Date().getDate()).slice(-2);

  constructor() { }

  ngOnInit(): void {
  }

}
