import { Moment } from 'moment';

export interface IWorklocation {
  id?: string;
  name?: string;
}

export class Worklocation implements IWorklocation {
  constructor(public id?: string, public name?: string) {}
}
