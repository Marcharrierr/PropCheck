import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RutValidationService } from '../../../services/validation-rut.service'
import { RegisterService } from '../../../services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('contrasena')?.value;
  const confirmPassword = control.get('reContrasena')?.value;

  if (password === confirmPassword) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
}

function lettersWithSpacesValidator(control: FormControl): ValidationErrors | null {
  const value = control.value;

  if (/^[a-zA-Z\s]*$/.test(value)) {
    return null;
  } else {
    return { lettersWithSpaces: true };
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})


export class RegisterPageComponent {

  data: any[] = [];





  isValidRut: boolean = true;
  isValidRutEmpresa: boolean = true;
  rutPersonaErrorMessage: string = '';
  rutEmpresaErrorMessage: string = '';

  get isFormValid(): boolean {
    return this.personaForm.valid && this.isValidRut && this.isValidRutEmpresa;
  }

  personaForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private rutValidationService: RutValidationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.personaForm = this.fb.group({
      rut: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12), this.rutValidationService.rutValidator()]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), lettersWithSpacesValidator]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), lettersWithSpacesValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      rutEmpresa: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12), this.rutValidationService.rutValidator]]
    }, { validator: passwordMatchValidator });
  }

  formatText(control: AbstractControl | null): void {
    if (control) {
      const text = control.value as string;
      if (text) {
        control.setValue(text.replace(/[^a-zA-Z\s]/g, ''), { emitEvent: false });
      }
    }
  }

  formatRut(control: AbstractControl | null): void {
    if (control) {
      const rut = control.value as string;
      if (rut) {
        control.setValue(this.formatRutValue(rut), { emitEvent: false });
      }
    }
  }

  private formatRutValue(rut: string): string {
    if (rut) {
      rut = rut.replace(/k/g, match => match === 'k' ? 'K' : '');
      rut = rut.replace(/K/g, 'K');

      rut = rut.replace(/[^0-9kK]/g, '');
      if (rut.length > 1) {
        const lastChar = rut.charAt(rut.length - 1);
        rut = rut.slice(0, -1) + '-' + lastChar;
      }
      return rut.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    return rut;
  }

  validateRutPersona() { // método validación rut persona
    const rutControl = this.personaForm.get('rut');
    if (rutControl) {
      const rut = rutControl.value;

      // Llamar al servicio de validación de RUT
      const isValid = this.rutValidationService.validateRut(rut);

      if (isValid) {
        this.isValidRut = true;
        this.rutPersonaErrorMessage = ''
      } else {
        this.isValidRut = false;
        this.rutPersonaErrorMessage = 'RUT persona no válido'
      }
    }
  }

  validateRutEmpresa() { // método validación rut empresa
    const rutEmpresaControl = this.personaForm.get('rutEmpresa');
    if (rutEmpresaControl) {
      const rutEmpresa = rutEmpresaControl.value;
      const isValidEmpresa = this.rutValidationService.validateRut(rutEmpresa)

      if (isValidEmpresa) {
        this.isValidRutEmpresa = true;
        this.rutEmpresaErrorMessage = ''
      } else {
        this.isValidRutEmpresa = false;
        this.rutEmpresaErrorMessage = 'RUT Empresa no válido'
      }
    }
  }

  registro() {
    const { rut, name, lastName, email, password, rutEmpresa } = this.personaForm.value;

    this.registerService.registrar(rut, name, lastName, email, password, rutEmpresa)
      .subscribe({
        next: () => {
          Swal.fire('¡Éxito!', 'Usuario registrado con éxito', 'success').then(() => {
            this.router.navigateByUrl('/#/');
          });
        },
        error: (error) => {
          Swal.fire('Error', error, 'error');
        }
      });
  }



}

