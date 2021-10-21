import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';

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
    console.log(event);

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
        .pipe()
        .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          //console.log(event);

          if(event.type == HttpEventType.Response){
            console.log('Upload Concluído');
          }else if(event.type == HttpEventType.UploadProgress){
            const percent = Math.round(event.loaded / event.total * 100);
            console.log(percent);
            this.progress = percent;
          }
          //console.log(response.type);
        });
    }
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
