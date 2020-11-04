import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Professional } from 'src/app/clases/professional';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.sass']
})
export class ProfessionalListComponent implements OnInit {

  @Input() professionals: Professional[];
  @Output() chooseProfessional: EventEmitter<Professional> = new EventEmitter<Professional>();

  constructor() { }

  ngOnInit(): void {
  }

}
