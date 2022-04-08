import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DetailsComponent } from './details/details.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children:[
      {path: '', component: BooksComponent},
      {path: 'details', component: DetailsComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
