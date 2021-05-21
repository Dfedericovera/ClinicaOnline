import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'boot-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {

  @Input() color: string;
  @Input() mensaje: string;
  @Output() dismiss: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDismiss(){
    this.dismiss.emit();
  }

}
