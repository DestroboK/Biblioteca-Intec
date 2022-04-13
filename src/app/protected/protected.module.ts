import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProtectedRoutingModule } from './protected-routing.module';
import { PagesComponent, BottomSheetOverviewExampleSheet } from './pages/pages.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    PagesComponent,
    DetailsComponent,
    BooksComponent,
    ReservationsComponent,
    BooksCrudComponent,
    ReservationsCrudComponent,
    UserPrivilegesComponent,
    SanctionsCrudComponent,
    BottomSheetOverviewExampleSheet
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatListModule
  ]
})
export class ProtectedModule { }
