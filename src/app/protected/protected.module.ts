import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProtectedRoutingModule } from './protected-routing.module';
import { PagesComponent } from './pages/pages.component';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DetailsComponent } from './details/details.component';
import { BooksComponent } from './books/books.component';
import {MatDividerModule} from '@angular/material/divider';
import { ReservationsComponent } from './reservations/reservations.component';
import { BooksCrudComponent } from './books-crud/books-crud.component';
import { ReservationsCrudComponent } from './reservations-crud/reservations-crud.component';
import { UserPrivilegesComponent } from './user-privileges/user-privileges.component';
import { SanctionsCrudComponent } from './sanctions-crud/sanctions-crud.component';
@NgModule({
  declarations: [
    PagesComponent,
    DetailsComponent,
    BooksComponent,
    ReservationsComponent,
    BooksCrudComponent,
    ReservationsCrudComponent,
    UserPrivilegesComponent,
    SanctionsCrudComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule
  ]
})
export class ProtectedModule { }
