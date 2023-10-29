import { fetchStoreFuelStations } from "./fetch-store-fuel-stations";
import { StoreFetchResponse } from "./types";

export const fetchFromAppleGreen: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations("https://applegreenstores.com/fuel-prices/data.json");

export const fetchFromAscon: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations("https://fuelprices.asconagroup.co.uk/newfuel.json");

export const fetchFromAsda: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations("https://storelocator.asda.com/fuel_prices_data.json");

export const fetchFromBp: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://www.bp.com/en_gb/united-kingdom/home/fuelprices/fuel_prices_data.json"
  );

export const fetchFromEsso: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://www.esso.co.uk/-/media/Project/WEP/Esso/Esso-Retail-UK/roadfuelpricingscheme.json"
  );

export const fetchFromMorrisons: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://images.morrisons.com/petrol-prices/petrol.json"
  );

export const fetchFromMotorFuelGroup: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://fuel.motorfuelgroup.com/fuel_prices_data.json"
  );

export const fetchFromRontec: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://www.rontec-servicestations.co.uk/fuel-prices/data/fuel_prices_data.json"
  );

export const fetchFromSainsburys: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://api.sainsburys.co.uk/v1/exports/latest/fuel_prices_data.json"
  );

export const fetchFromSGN: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://www.sgnretail.uk/files/data/SGN_daily_fuel_prices.json"
  );

export const fetchFromShell: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations("https://www.shell.co.uk/fuel-prices-data.html");

export const fetchFromTesco: () => Promise<StoreFetchResponse> = () =>
  fetchStoreFuelStations(
    "https://www.tesco.com/fuel_prices/fuel_prices_data.json"
  );
