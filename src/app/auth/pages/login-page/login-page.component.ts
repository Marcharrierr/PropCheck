import { AuthService } from '../../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);


  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  login() {

    const { email, password } = this.myForm.value;


    this.authService.login(email, password)
      .subscribe({
        //Si todo sale bien al validar
        next: () => this.router.navigateByUrl('/propiedades/list'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })


  }


}
