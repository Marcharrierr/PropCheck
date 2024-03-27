import { FormControl, FormGroup } from "@angular/forms";

export interface PropertyServices {
  id: number;
  property_id: number;
  service_id: number;
  service_client_id: string | number;
  nemo: string;
}



export enum Region {

  coquimbo = 'Coquimbo',
  metropolitana = 'Metropolitana'

}

export enum Municipality {
  buin = 'Buín',
  conchali = 'Conchalí',
  elBosque = 'El Bosque',
  estacionCentral = 'Estación Central',
  independencia = 'Independencia',
  laCisterna = 'La Cisterna',
  laFlorida = 'La Florida',
  laGranja = 'La Granja',
  laSerena = 'La Serena',
  laReina = 'La Reina',
  lasCondes = 'Las Condes',
  macul = 'Macul',
  maipu = 'Maipú',
  nunoa = 'Ñuñoa',
  providencia = 'Providencia',
  pudahuel = 'Pudahuel',
  quintaNormal = 'Quinta Normal',
  renca = 'Renca',
  sanMiguel = 'San Miguel',
  sanJoaquin = 'San Joaquín',
  santiago = 'Santiago Centro',
  vitacura = 'Vitacura'
}

export interface Service {
  id: number;
  categoria: string;

}

export interface ServiceForm {
  luz: FormControl;
  agua: FormControl;
  gas: FormControl;
  ggcc: FormControl;
  contri: FormControl;
  aseo: FormControl;
  luzId: FormControl;
  aguaId: FormControl;
  gasId: FormControl;
  ggccId: FormControl;
  contriId: FormControl;
  aseoId: FormControl;
  luzControl: FormControl;
  aguaControl: FormControl;
  gasControl: FormControl;
  ggccControl: FormControl;
  luzNoService: FormControl;
  aguaNoService: FormControl;
  gasNoService: FormControl;
  ggccNoService: FormControl;
  aseoNoService: FormControl;
  contriNoService: FormControl;

}


export interface Provider {
  name: string;
  code: string;
}
