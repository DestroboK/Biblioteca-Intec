import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { AuthResponse, Usuario, Libro, Prestamo } from '../interfaces/interfaces';
import { of, tap, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario!: Usuario;
  public libros: Libro[] = [];
  public libro!: Libro;
  public prestamos: Prestamo[] =[];
  constructor(private http: HttpClient) { }



  get usuario(){
    return {...this._usuario} ;
  }
crearPrestamo(book_quantity: string, user_name: string, book_id: string, emission_date: Date, final_date: Date){
  const url = `${ environment.baseUrl}/reservations/new`;
    const body = { book_quantity,user_name, book_id, emission_date, final_date};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
            
          }
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
}
actualizarPrestamo(_id: string, status: string){
  const url = `${ environment.baseUrl}/reservations/update`;
    const body = { _id, status};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
            this.obtenerPrestamos();
          }
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
}


  obtenerPrestamos(){
    const url = `${ environment.baseUrl}/reservations/all`;
    return this.http.get<Prestamo[]>(url)
      .subscribe((response)=>{
        this.prestamos = response ;
      }
    );
  }


  obtenerLibros(){
    const url = `${ environment.baseUrl}/books/all`;
    return this.http.get<Libro[]>(url)
      .subscribe((response: Libro[])=>{
        this.libros = response ;
      }
    ),
    catchError(err=> of(err.error.msg));
  }


  filtrarLibros(libros: Libro[]){
    if(libros){
      this.libros = libros
    }
  }

  obtenerUnLibro(id: string){
    const url = `${ environment.baseUrl}/books/solo`;
    const headers = new HttpHeaders()
    .set('_id', id || '');
    return this.http.get<Libro>(url, {headers: headers})
      .subscribe((response: Libro)=>{
        this.libro = response ;
      }
    ),
    catchError(err=> of(err.error.msg));
  }

  nuevoLibro (title: string, author:string, page_nums: number, book_quantity: number, description: string, categories: string[], publish_date: string, img_url?: string, edition?: string){
    const url = `${ environment.baseUrl}/books/new`;
    const body = { title, author, page_nums, book_quantity, description, categories, publish_date, img_url, edition};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
                        this.obtenerLibros()
          }
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
  }

  actualizarLibro (_id: string,title: string, author:string, page_nums: number, book_quantity: number, description: string, categories: string[], publish_date: string, img_url?: string, edition?: string){
    const url = `${ environment.baseUrl}/books/update`;
    const body = {_id, title, author, page_nums, book_quantity, description, categories, publish_date, img_url, edition};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
            this.obtenerLibros()
          }
          
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
  }


  borrarLibro(_id:string){
    const url = `${ environment.baseUrl}/books/delete`;
    const body = { _id};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
            this.obtenerLibros()
          }
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
  }
  login( email:string, password:string ){
    const url = `${ environment.baseUrl}/auth`;
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
            localStorage.setItem('token', resp.token!);
            this._usuario = {

              name: resp.name!,
              uid: resp.uid!,
              role: resp.role!
            }
          }
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean>{
    const url = `${ environment.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, {headers: headers})
    .pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {

          name: resp.name!,
          uid: resp.uid!,
          role: resp.role!
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout(){
    localStorage.removeItem('token');
  }

  registro (name: string, last_name:string, cedula: string, phone_number: string, address: string, email: string, password: string){
    const url = `${ environment.baseUrl}/auth/new`;
    const body = {name, last_name, cedula, phone_number, address, email, password};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp =>
        {
          if( resp.ok){
            localStorage.setItem('token', resp.token!);
            this._usuario = {

              name: resp.name!,
              uid: resp.uid!,
              role: resp.role!
            }
          }
        }),
      map( resp => resp.ok ),
      catchError(err=> of(err.error.msg))
    );
  }

  
}
