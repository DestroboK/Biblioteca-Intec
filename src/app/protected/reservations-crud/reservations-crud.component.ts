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
  selector: 'app-reservations-crud',
  templateUrl: './reservations-crud.component.html',
  styles: [
  ]
})
export class ReservationsCrudComponent{
  displayedColumns: string[] = [ '_id','user_name', 'book_id', 'emission_date','final_date','book_quantity', 'status', 'actions'];
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.cargar();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  abrir(id: String){
    this.router.navigate(['dashboard/details/', {_id: id}])
  }
  actualizar(_id: string, status: string){
    
    if(status == 'Nuevo'){
      this.authService.actualizarPrestamo(_id, 'En proceso')
      .subscribe(ok=>{
        if(ok === true){
          Swal.fire('Solicitud aceptada.', ok, 'success');
        } else {
          Swal.fire('Error', ok, 'error')
        }
      })
    }
    if(status == 'En proceso'){
      this.authService.actualizarPrestamo(_id, 'Completado')
      .subscribe(ok=>{
        if(ok === true){
          Swal.fire('Prestamo completado.', ok, 'success');
        } else {
          Swal.fire('Error', ok, 'error')
        }
      })
    }
    if(status == 'Denegado'){
      this.authService.actualizarPrestamo(_id, 'Denegado')
      .subscribe(ok=>{
        if(ok === true){
          Swal.fire('Solicitud denegada.', ok, 'success');
        } else {
          Swal.fire('Error', ok, 'error')
        }
      })
    }
    this.authService.obtenerPrestamos();
    this.cargar();
  }
  imprimir(){
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.dataSource.filteredData);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }
  
}


