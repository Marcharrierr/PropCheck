export interface Property {
  id: number;
  clients_id: number;
  type: string;
  region: string;
  municipality: string;
  address: string;
  tower?: string;
  community_rut: number;
  community_d: string;
  community_name: string;
  department: string;
  status: string;
  created: Date;
  modified: Date;
  [key: string]: any;
}


export interface PropertyService {
  property_id: number;
  service_id: number;
  service_client_id: string;
  created: string;
  modified: string;
}


export interface ServiceData {
  id: number;
  name: string;
  description: string;
  category: string;
  created: string;
  modified: string;
  provider_id: number;
}

export interface TypeProperties {
  type: string;
  value: string;
}
