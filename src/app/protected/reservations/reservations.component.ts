import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Prestamo } from '../../auth/interfaces/interfaces';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styles: [
  ]
})
export class ReservationsComponent{

  displayedColumns: string[] = [ '_id','user_name', 'book_id', 'emission_date','final_date','book_quantity', 'status'];
  dataSource!: MatTableDataSource<Prestamo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get prestamos(){
    return this.authService.prestamos;
 }
 get usuario(){
   return this.authService.usuario;
 }
  constructor(private authService: AuthService, private router: Router) {

  }

  async cargar(){
    await this.authService.obtenerPrestamos();
    await new Promise(f => setTimeout(f, 2000));
    this.dataSource = new MatTableDataSource<Prestamo>(this.prestamos);
    this.dataSource.filter = this.usuario.name?.trim().toLowerCase() || '';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.cargar();
  }

  abrir(id: String){
    this.router.navigate(['dashboard/details/', {_id: id}])
  }
}
