import { Component, OnInit, Output } from '@angular/core';
import { Libro } from '../../auth/interfaces/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, Validators, FormGroup, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-books-crud',
  templateUrl: './books-crud.component.html',
  styles: [
  ]
})
export class BooksCrudComponent implements OnInit {

  get libro(){
    return this.authService.libro;
 }
 librosFiltrados: Libro[] =[];
 editando: Boolean = false;
 img_url: string ='';
 id_libroseleccionado: string ='';

  miFormulario: FormGroup = this.fb.group({
    title: ['Libro de prueba' , [Validators.required]],
    author: ['Autor de prueba' , [Validators.required, Validators.minLength(5)]],
    page_nums: [ 1 , [Validators.required, Validators.minLength(1)]],
    book_quantity: [1 , [Validators.required, Validators.minLength(1)]],
    description: ['Un libro de ejemplo.' , [Validators.required, Validators.minLength(4)]],
    categories: [ ['Filosofia', 'Ensayo'] , [Validators.required]],
    publish_date: ['1999' , [Validators.required]],
    edition: ['1ra', [Validators.required]],
    img_url: ['https://g.christianbook.com/g/slideshow/8/8768903/main/8768903_1_ftc.jpg'] 
  })

  registrarLibro(){

    const {title, author, page_nums, book_quantity, description, categories, publish_date, img_url, edition} = this.miFormulario.value;
    this.authService.nuevoLibro(title,author,page_nums,book_quantity,description,categories,publish_date,img_url, edition)
    .subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        Swal.fire('Libro registrado correctamente', ok, 'success');

      } else {
        Swal.fire('Error', ok, 'error')
      }
    })
  }
  borrar(_id: string){
    this.authService.borrarLibro(_id)
    .subscribe(ok=>{
      if(ok === true){
        Swal.fire('Libro borrado correctamente', ok, 'success');
        this.libros;

      } else {
        Swal.fire('Error', ok, 'error')
      }
    })
    
  }
  actualizar(){
    this.editando = false;
    const {title, author, page_nums, book_quantity, description, categories, publish_date, img_url, edition} = this.miFormulario.value;
    this.authService.actualizarLibro(this.id_libroseleccionado,title,author,page_nums,book_quantity,description,categories,publish_date,img_url, edition)
    .subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        Swal.fire('Libro actualizado correctamente', ok, 'success');

      } else {
        Swal.fire('Error', ok, 'error')
      }
    })
    this.limpiar();
    this.libros;
  }
  editar(libro: Libro){
    if(libro != undefined){
      this.miFormulario.setValue({
        title: libro.title,
        author:libro.author,
        page_nums: libro.page_nums,
        book_quantity: libro.book_quantity,
        description: libro.description,
        categories: libro.categories,
        publish_date: libro.publish_date,
        img_url: libro.img_url,
        edition: libro.edition
      })
      this.img_url = libro.img_url!;
      this.id_libroseleccionado = libro._id;
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });  
      this.editando =true;
    }
    else{
        Swal.fire('Error', 'error')
       }
  }
  ngOnInit(): void {
    this.authService.obtenerLibros();
  }
  get libros(){
     return this.authService.libros;
  }
  get usuario(){
    return this.authService.usuario;
  }
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }

  abrir(libro: Libro){
    this.router.navigate(['dashboard/details/', {_id: libro._id}])
    console.log("hiciste click en un libro" + libro._id)
  }
  cancelar(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    }); 
    this.editando = false;
    this.limpiar();
  }
  limpiar(){
    this.miFormulario.setValue({
      title: '',
      author:'',
      page_nums: 0,
      book_quantity: 0,
      description: '',
      categories: '',
      publish_date: '',
      img_url: ''
    })
  }
  buscar(){
    var inputValue = (<HTMLInputElement>document.getElementById('searchBar')).value;
    console.log(inputValue);

    this.librosFiltrados = this.libros.filter(libro=> libro.title.toLowerCase().includes(inputValue.toLowerCase()) ||  libro.author!.toLowerCase().includes(inputValue.toLowerCase()) );
  
    if(inputValue == ''){
      this.authService.obtenerLibros();
    }
    else{
      
    this.authService.filtrarLibros(this.librosFiltrados);
    }
  }
  imagencambiada(){
    this.img_url = this.miFormulario.value.img_url;
  }
  imprimir(){
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.libros);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }
  
}
