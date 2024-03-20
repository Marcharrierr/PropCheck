export interface PropertyServices {
  property_id: number;
  service_id: number;
  service_client_id: string | number;

}


export enum Type {

  departamento = 'Departamento',
  casa = 'Casa',
  galpon = 'Galpón',
  local = 'Local',
  estacionamiento = 'Estacionamiento'

}

export enum Region {

  coquimbo = 'Coquimbo',
  santiago = 'Santiago'

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
  santiago = 'Santiago',
  vitacura = 'Vitacura'
}



export interface Provider {
  name: string;
  code: string;
}
