import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup,NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../service/data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  hide = true;
  value = '';
  user = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9Ññ ]+$/)]);
  pass = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9Ññ ]+$/)]);
 private authTokenKey = 'authToken';
  constructor(private router: Router,private service: DataService,private authService: AuthService) {
    /*const storedToken = localStorage.getItem(this.authTokenKey);
    if (storedToken) {
      this.authService.setAuthToken(storedToken);
      this.authService.setAuthenticated();
      //this.router.navigate(['/asb/home']);
    }*/
  }

  camposRequeridos(): boolean {
    return (this.user.valid && this.pass.valid);
  }

  onSubmit(formulario: NgForm) {
    if (!this.camposRequeridos()) {
      return;
    }
    /*const data = {
      Usuario: this.user.value,
      pass: this.pass.value
    }*/
    const username = this.user.value;
    const password = this.pass.value;
    Swal.fire({
      title: '<span style="color: white;font-size: 30px;">Ingresando....</span>',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: 'transparent',
    });

    this.authService.login(username, password)
      .then((data) => {
        Swal.close();
        this.router.navigate(['/asb/home']);
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Error de autenticación',
          showConfirmButton: false,
          timer: 3000
        });
      });

      /*this.authService.login(username,password).subscribe(
        (data) => {
          console.log("Inicio de sesión")
          Swal.close();
          this.router.navigate(['/asb/home']);
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Error de autenticación',
            showConfirmButton: false,
            timer: 3000
          });
        }
      );*/
  }

  errorUser() {
    if (this.user.hasError('required')) {
      return 'Ingresa un usuario.';
    }
    return this.user.hasError('pattern') ? 'Usuario invalido' : '';
  }

  errorPass() {
    if (this.pass.hasError('required')) {
      return 'Ingresa una contraseña.';
    }
    return this.pass.hasError('pattern') ? 'Contraseña invalida' : '';
  }
validar(){
  console.log("Validar")
  //this.router.navigate(['/asb/home']);
}

}
