export interface ILocation {
  id?: number;
  locationName?: String;
}

export class Location implements ILocation {
  constructor(public id?: number, public locationName?: String) {}
}
