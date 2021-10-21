import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../cursos/curso';
import { CrudService } from './crud-service';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
