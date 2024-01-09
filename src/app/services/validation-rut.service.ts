import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RutValidationService {

  rutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const isValid = this.validateRut(control.value);
        return isValid ? null : { invalidRut: true };
      }
      return null;
    };
  }

  constructor() { }

  validateRut(rut: string): boolean {
    rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    const dv = rut.slice(-1);
    const numbers = rut.slice(0, -1);

    const weights = [2, 3, 4, 5, 6, 7];
    let sum = 0;

    for (let i = numbers.length - 1, j = 0; i >= 0; i--, j++) {
      const digit = parseInt(numbers[i], 10);
      const weight = weights[j % weights.length];
      sum += digit * weight;
    }

    const expectedDV = 11 - (sum % 11);
    if (expectedDV === 11) {
      return dv === '0';
    } else if (expectedDV === 10) {
      return dv === 'K';
    } else {
      return dv === expectedDV.toString();
    }
  }
  
}

