import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'busca-reativa'},
  {path: 'cursos', loadChildren: () => import ('./cursos/cursos.module').then(m => m.CursosModule)},
  {path: 'poc', loadChildren: () => import ('./unsubscribe/unsubscribe.module').then(m => m.UnsubscribeModule)},
  {path: 'upload', loadChildren: () => import ('./upload-file/upload-file.module').then(m => m.UploadFileModule)},
  {path: 'busca-reativa', loadChildren: () => import ('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
