import { Moment } from 'moment';

export interface IAddEmployee {
  id?: number;
  name?: String;
  email?: String;
  phone?: number;
  address?: String;
  firstName?: String;
  lastName?: String;
}

export class AddEmployee implements IAddEmployee {
  constructor(
    public id?: number,
    public name?: String,
    public email?: String,
    public phone?: number,
    public address?: String,
    public firstName?: String,
    public lastName?: String
  ) {}
}
