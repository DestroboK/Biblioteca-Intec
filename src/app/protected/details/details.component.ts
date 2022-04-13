import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
    `
    *{
      margin: 15px;
    }
    `
  ]
})
export class DetailsComponent implements OnInit {
  minDate: Date = new Date(Date.now());
  maxDate: Date;
  selectDate: Date = new Date();
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) { 

    this.minDate = new Date(Date.now());
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.maxDate = new Date(Date.now());
    this.maxDate.setDate(this.minDate.getDate() + 15);
  }

  miFormulario: FormGroup = this.fb.group({
    book_quantity: [1 , [Validators.required]],
    final_date: [this.minDate,[Validators.required]]
  })
  solicitando: Boolean = false;
  ngOnInit(): void {
this.activatedRoute.snapshot.paramMap.get('_id');
    this.authService.obtenerUnLibro(this.activatedRoute.snapshot.paramMap.get('_id')!);
  }
  get libro(){
     return this.authService.libro;
  }
  get usuario(){
    return this.authService.usuario;
  }

  crearPrestamo(){
    
    const {book_quantity, final_date} = this.miFormulario.value; 
    this.authService.crearPrestamo(book_quantity,this.usuario.name!, this.libro._id, new Date(), final_date)
    .subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        this.authService.obtenerUnLibro(this.activatedRoute.snapshot.paramMap.get('_id')!);
        Swal.fire('Prestamo creado correctamente.', ok, 'success');
      
        this.solicitando =false;

      } else {
        Swal.fire('Error', ok, 'error')
        this.solicitando =false;
      }
    })

  
  }
  cancelar(){
    this.solicitando =false
  }
}
