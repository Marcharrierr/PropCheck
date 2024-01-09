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
}




export interface PropertyService {
  property_id: number;
  service_id: number;
  service_client_id: string;
  created: string;
  modified: string;
}
