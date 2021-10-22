import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Result } from './results';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  queryField = new FormControl();
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch(){
    const fields = 'name,description,version,homepag';
    let value = this.queryField.value;
    if(value && (value = value.trim()) !== ''){
      
      const params = {
        search: value,
        fields: fields
      }
      
      this.results$ = this.http
      .get(this.SEARCH_URL + '?fields=' + fields + '&search='+value)
      .pipe(
        tap((res: any) => this.total = res.total),
        map(res => res.results),
      )
    }
  }
}
