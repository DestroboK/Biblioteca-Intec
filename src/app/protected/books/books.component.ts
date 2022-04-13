import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Libro } from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styles: [

  ]
})
export class BooksComponent implements OnInit {
  librosFiltrados: Libro[] =[];

  ngOnInit(): void {
    this.authService.obtenerLibros();
  }
  public libro!: Libro;
  get libros(){
     return this.authService.libros;
  }
  get usuario(){
    return this.authService.usuario;
  }
  constructor(private router: Router,
    private authService: AuthService) { }

  logout(){
    this.router.navigateByUrl('/auth/login')
    this.authService.logout();
  }
  abrir(libro: Libro){
    this.router.navigate(['dashboard/details/', {_id: libro._id}])
    console.log("hiciste click en un libro" + libro._id)
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
}
