import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
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
  readonly FIELDS: string = 'name,description,version,homepag';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value.length > 1),
        map(value => value.trim()),
        //tap(value => console.log(value)),
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      );
      
  }

  onSearch(){
    let value = this.queryField.value;
    if(value && (value = value.trim()) !== ''){
      
      const params = {
        search: value,
        fields: this.FIELDS
      }
      
      this.results$ = this.http
      .get(this.SEARCH_URL + '?fields='+params.fields+'&search='+params.search)
      .pipe(
        tap((res: any) => this.total = res.total),
        map(res => res.results),
        tap(console.log),
      )
    }
  }
}
