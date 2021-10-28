import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-resenia',
  templateUrl: './dialog-resenia.component.html',
  styleUrls: ['./dialog-resenia.component.sass']
})
export class DialogReseniaComponent implements OnInit
{

  mensaje: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string },
  ) { }

  ngOnInit(): void
  {
    this.mensaje = this.data.mensaje;
  }

}
