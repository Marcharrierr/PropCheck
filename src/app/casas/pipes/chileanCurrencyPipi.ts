import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chileanCurrency'
})
export class ChileanCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    // Agregar el signo de dólar al comienzo y formatear como moneda chilena (CLP)
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  }
}
