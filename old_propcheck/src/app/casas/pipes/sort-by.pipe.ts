import { Pipe, PipeTransform } from '@angular/core';
import { Propiedades } from '../interfaces/propiedades.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(propiedades: Propiedades[], sortBy?: keyof Propiedades | null): Propiedades[] {

    switch (sortBy) {
      case 'comunidad':
        return propiedades.sort((a, b) => (a.comunidad > b.comunidad) ? 1 : -1);
      case 'unidad':
        return propiedades.sort((a, b) => (a.unidad > b.unidad) ? 1 : -1);
      case 'comuna':
        return propiedades.sort((a, b) => (a.comuna > b.comuna) ? 1 : -1);
      case 'detProp':
        return propiedades.sort((a, b) => (a.detProp > b.detProp) ? 1 : -1);
      case 'deuda':
        return propiedades.sort((a, b) => (a.deuda > b.deuda) ? 1 : -1);

      default:
        return propiedades;
    }





  }

}
