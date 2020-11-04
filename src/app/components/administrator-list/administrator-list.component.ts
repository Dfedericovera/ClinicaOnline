import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.sass']
})
export class AdministratorListComponent implements OnInit {

  @Input() administrators: Administrador[];
  @Output() elegirAdministrador: EventEmitter<Administrador> = new EventEmitter<Administrador>();

  constructor() { }

  ngOnInit(): void {
  }

}
