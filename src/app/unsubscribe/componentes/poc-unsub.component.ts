import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { EnviarValorService } from "../enviar-valor.service";

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy{
  
  nome = 'Componente com unsubscribe';
  valor: string;

  sub: Subscription[] = [];
  
  constructor(private service: EnviarValorService){}

  ngOnInit(){
    this.sub.push(this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy(){
    this.sub.forEach(s => s.unsubscribe())
    //this.sub.unsubscribe();
    console.log(`${this.nome} foi destruído`);
  }


}