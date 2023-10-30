export interface TomTomGeocoderResponse {
  summary: Summary;
  results: Result[];
}

export interface Result {
  type: string;
  id: string;
  score: number;
  dist: number;
  matchConfidence: MatchConfidence;
  address: Address;
  position: GeoBias;
  viewport: Viewport;
  entryPoints?: EntryPoint[];
  addressRanges?: AddressRanges;
}

export interface Address {
  streetNumber: string;
  streetName: string;
  municipalitySubdivision?: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countrySubdivisionCode: string;
  postalCode: string;
  extendedPostalCode?: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  localName: string;
}

export interface AddressRanges {
  rangeRight?: string;
  from: GeoBias;
  to: GeoBias;
  rangeLeft?: string;
}

export interface GeoBias {
  lat: number;
  lon: number;
}

export interface EntryPoint {
  type: string;
  position: GeoBias;
}

export interface MatchConfidence {
  score: number;
}

export interface Viewport {
  topLeftPoint: GeoBias;
  btmRightPoint: GeoBias;
}

export interface Summary {
  query: string;
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
  geoBias: GeoBias;
}
