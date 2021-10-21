import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ShowErrorComponent } from './show-error/show-error.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    ShowErrorComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertModalComponent,
    ShowErrorComponent
  ],
})
export class SharedModule { }
