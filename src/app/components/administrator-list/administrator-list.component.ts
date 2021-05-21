import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Administrator } from '../../clases/administrator';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.sass']
})
export class AdministratorListComponent implements OnInit {

  @Input() administrators: Administrator[];
  @Output() chooseAdministrator: EventEmitter<Administrator> = new EventEmitter<Administrator>();

  constructor() { }

  ngOnInit(): void {
  }

}
