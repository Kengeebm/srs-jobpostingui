export interface IManufacturer {
  id?: number;
  manufacturerName?: String;
}

export class Manufacturer implements IManufacturer {
  constructor(public id?: number, public manufacturerName?: String) {}
}
