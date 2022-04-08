import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com' , [Validators.required, Validators.email]],
    password: ['12345678' , [Validators.required, Validators.minLength(8)]],
    name: ['testname' , [Validators.required, Validators.minLength(5)]],
    last_name: ['test' , [Validators.required, Validators.minLength(3)]],
    cedula: ['1235567' , [Validators.required, Validators.maxLength(13)]],
    phone_number: ['test' , [Validators.required]],
    address: ['yes test' , [Validators.required]]    
  })
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {}

  registrar(){

    const {email, password, name, last_name, cedula,phone_number,address } = this.miFormulario.value;
    this.authService.registro(name,last_name,cedula,phone_number,address,email,password)
    .subscribe(ok=>{
      console.log(ok);
      if(ok === true){
          this.router.navigateByUrl('/dashboard')
      } else {
        Swal.fire('Error', ok, 'error')
      }
    })
  }
}

