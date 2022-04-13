import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DetailsComponent } from './details/details.component';
import { BooksComponent } from './books/books.component';
import { BooksCrudComponent } from './books-crud/books-crud.component';
import { UserPrivilegesComponent } from './user-privileges/user-privileges.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsCrudComponent } from './reservations-crud/reservations-crud.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children:[
      {path: '', component: BooksComponent},
      {path: 'details', component: DetailsComponent},
      {path: 'reservations', component: ReservationsComponent},
      {path: 'admin/books', component: BooksCrudComponent},
      {path: 'admin/reservations', component: ReservationsCrudComponent},
      {path: 'admin/users', component: UserPrivilegesComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
