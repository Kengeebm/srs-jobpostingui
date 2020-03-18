export interface IConfig {
  id?: number;
  name?: any;
}

export class Config implements IConfig {
  constructor(public id?: number, public name?: any) {}
}
