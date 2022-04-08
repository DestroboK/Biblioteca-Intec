import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { AuthResponse, Usuario, Libro } from '../interfaces/interfaces';
import { of, tap, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario!: Usuario;
  public libros: Libro[] = [];
  public libro!: Libro;
  constructor(private http: HttpClient) { }



  get usuario(){
    return {...this._usuario} ;
  }


  obtenerLibros(){
    const url = `${ environment.baseUrl}/books/all`;
    return this.http.get<Libro[]>(url)
      .subscribe((response: Libro[])=>{
        this.libros = response ;
        console.log(response)
      }
    );




  }


  obtenerUnLibro(id: string){
    const url = `${ environment.baseUrl}/books/solo`;
    const headers = new HttpHeaders()
    .set('_id', id || '');
    return this.http.get<Libro>(url, {headers: headers})
      .subscribe((response: Libro)=>{
        this.libro = response ;
        console.log(response)
      }
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
