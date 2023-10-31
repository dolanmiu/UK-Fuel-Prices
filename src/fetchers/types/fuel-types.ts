export interface StoreFetchResponse {
  last_updated: string;
  stations: FuelStation[];
}

export interface FuelStation {
  site_id: string;
  brand: Brand;
  address: string;
  postcode: string;
  location: Location;
  prices: Prices;
}

export enum Brand {
  Asda = "ASDA",
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Prices {
  E10?: number;
  B7?: number;
  E5?: number;
  SDV?: number;
}
