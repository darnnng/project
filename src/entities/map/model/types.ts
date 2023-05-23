export interface ICountry {
  name: string;
}

export interface ILocation {
  region: string;
  countries: ICountry[];
}
