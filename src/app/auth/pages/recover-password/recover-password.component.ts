import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { jwtDecode } from "jwt-decode";
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
}

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  sidebarVisible!: boolean;


  get isFormValid(): boolean {
    return this.passwordForm.valid;
  }

  token!: string;
  passwordForm: FormGroup;



  constructor(
    private route: ActivatedRoute,
    private changePasswordService: ChangePasswordService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    }, { validator: passwordMatchValidator })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

      // Verificar el token antes de permitir al usuario cambiar la contraseña
      this.changePasswordService.verifyToken(this.token).subscribe(
        (response) => {
          if (response.success) {
            const decodedToken = jwtDecode(this.token) as { email: string };
            const userEmail = decodedToken.email;
            console.log('Decoded Email:', userEmail);
          } else {
            console.error('El token ha expirado');
            // Mostrar mensaje de error y redirigir al home
            Swal.fire({
              title: 'Error al cambiar contraseña',
              text: 'El enlace ha caducado, solicitelo nuevamente.',
              icon: 'error',
            }).then(() => {
              this.router.navigateByUrl('/')
            });
          }
        },
        (error) => {
          console.error('Error al verificar el token', error);
        }
      );
    });
  }

  onSubmit() {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    // Verificar que contraseñas coincidan antes de enviar la solicitud
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    // LLamada al service para verificar el token
    this.changePasswordService.verifyToken(this.token).subscribe(
      (verificationResponse) => {
        if (verificationResponse.success) {
          // Llamada al servicio para actualizar la contraseña
          this.changePasswordService.updatePassword(this.getEmailFromToken(), password).subscribe(
            (response) => {
              Swal.fire({
                title: "Contraseña cambiada con éxito!",
                text: "Vuelva a iniciar sesión",
                icon: "success"
              }).then(() => {
                this.router.navigateByUrl('/');
              });
              console.log('Contraseña actualizada exitosamente', response);
            },
            (error) => {
              console.error('Error al actualizar la contraseña', error);
              Swal.fire('Error', 'Failed to send email', 'error');
              if (error instanceof HttpErrorResponse) {
                console.error('Status Code:', error.status);
                console.error('Error Message:', error.error?.message || 'Error desconocido')
              }
            }
          );
        } else {
          console.error('El token ha expirado');
        }
      },
      (error) => {
        console.error('Error al verificar el token', error);
      }
    );
  }

  private getEmailFromToken(): string {
    try {
      if (!this.token) {
        console.error('Token no disponible');
        return '';
      }

      const decodedToken = jwtDecode(this.token) as { email: string };
      return decodedToken.email;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return '';
    }
  }



}
