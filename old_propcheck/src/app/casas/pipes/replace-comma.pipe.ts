import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceComma'
})

export class ReplaceCommaPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(value);
  }
}



