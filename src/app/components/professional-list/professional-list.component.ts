import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.sass']
})
export class ProfessionalListComponent implements OnInit {

  @Input() professionals: Profesional[];
  @Output() elegirPaciente: EventEmitter<Profesional> = new EventEmitter<Profesional>();

  constructor() { }

  ngOnInit(): void {
  }

}
