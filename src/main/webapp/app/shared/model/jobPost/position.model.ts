import { Moment } from 'moment';

export interface IPosition {
  id?: string;
  name?: string;
}

export class Position implements IPosition {
  constructor(public id?: string, public name?: string) {}
}
