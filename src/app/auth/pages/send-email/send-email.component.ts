import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecoverPassService } from 'src/app/services/recover-pass.service';

@Component({
  selector: 'app-recover-page',
  templateUrl: './send-email.component-n.html',
  styleUrls: ['./send-email.component-n.css']
})
export class RecoverPageComponent {

  sidebarVisible!: boolean;

  personaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recoverPassService: RecoverPassService,
    private router: Router
  ) {


    this.personaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail(): void {
    if (this.personaForm.valid) {
      const { email } = this.personaForm.value;

      this.recoverPassService.sendMail(email).subscribe({
        next: (response) => {

          if (response && response.success)
            Swal.fire({
              title: "Email enviado con éxito !",
              text: "Revise su bandeja de entrada",
              icon: "success"
            }).then(() => {
              this.router.navigateByUrl('auth/#');
            });
          else {
            Swal.fire('Error', response.message || 'Failed to send email', 'error');
          }
        },
        error: (error) => {
          Swal.fire('Error', error.message || 'Error al enviar el email', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Por favor ingrese un correo válido', 'warning');
    }
  }
}
