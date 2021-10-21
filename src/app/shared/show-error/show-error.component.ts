import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss']
})
export class ShowErrorComponent implements OnInit {

  @Input() control: any;
  type: string;
  message: string;
  messages: any = {
    'required': "Por favor informe um nome para o curso.",
    'minlength': "Nome precisa ter no mínimo {{ control.errors['minlength'].requiredLength }} caracteres",
    'maxlength': "Nome precisa ter no máximo {{ control.errors['maxlength'].requiredLength }} caracteres",
  }

  constructor() { }

  ngOnInit(): void {
    {
      console.log(this.control.error);
    }
  }

}
