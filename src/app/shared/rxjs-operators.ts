import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { pipe } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export function filterResponse<T>(){
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response ),
    map((res: any) => res?.body),
    //tap(x => console.log(x)),
  );
}

export function unloadProgress<T>(cb: (progress: number) => void){
  return tap((event: HttpEvent<T>) => {
    if( event.type === HttpEventType.UploadProgress){
      cb(Math.round(event.loaded * 100 / event.total));
    }
  });
}