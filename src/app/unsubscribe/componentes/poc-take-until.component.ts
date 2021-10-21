import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { EnviarValorService } from "../enviar-valor.service";

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit{
  
  unsub$ = new Subject();

  nome = 'Componente com takeUtil';
  valor: string;
  
  constructor(private service: EnviarValorService){}

  ngOnInit(){
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        takeUntil(this.unsub$)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy(){
    this.unsub$.next();
    this.unsub$.complete();
    console.log(`${this.nome} foi destruído`);
  }
}