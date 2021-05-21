import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Specialty } from 'src/app/clases/specialty';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.sass']
})
export class SpecialtyListComponent implements OnInit {

  @Input() specialtys: Specialty[];
  @Output() chooseSpecialty: EventEmitter<Specialty> = new EventEmitter<Specialty>();


  constructor() { }

  ngOnInit(): void {
  }

  onChoose(specialty:Specialty){
    this.chooseSpecialty.emit(specialty);
  }

}
