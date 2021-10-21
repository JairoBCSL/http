import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'upload'},
  {path: 'cursos', loadChildren: () => import ('./cursos/cursos.module').then(m => m.CursosModule)},
  {path: 'poc', loadChildren: () => import ('./unsubscribe/unsubscribe.module').then(m => m.UnsubscribeModule)},
  {path: 'upload', loadChildren: () => import ('./upload-file/upload-file.module').then(m => m.UploadFileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
