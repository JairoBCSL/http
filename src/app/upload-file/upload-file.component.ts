import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';
import { filterResponse, unloadProgress } from '../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  subs: Subscription;
  progress: number = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any){
    //console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for(let i = 0; i < selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ')

    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.subs = this.service.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          unloadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído!'))
        /*.subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          //console.log(event);

           if(event.type == HttpEventType.Response){
            console.log('Upload Concluído');
          }else if(event.type == HttpEventType.UploadProgress){
            let percent = Math.round(event.loaded / event.total * 100);
            //console.log(percent);
            this.progress = percent;
          }
          //console.log(response.type);
        });*/
    }
  }

  ngOnDestroy(){
    //this.subs.unsubscribe();
  }

  onDownloadJpg(){
    this.service.download(environment.BASE_URL+'/downloadJpg')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'bmw.jpg')
      })
  }

  onDownloadZip(){
    this.service.download(environment.BASE_URL+'/downloadZip')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'curso.zip')
    })
  }

}
