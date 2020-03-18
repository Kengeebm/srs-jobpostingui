import { Moment } from 'moment';
import moment = require('moment');

export interface IUnfreezedList {
  id?: string;
  employeeId?: string;
  userName?: string;
  submitDate?: Moment;
  submitTime?: string;
}

export class UnfreezedList implements IUnfreezedList {
  constructor(
    public id?: string,
    public employeeId?: string,
    public userName?: string,
    public submitDate?: Moment,
    public submitTime?: string
  ) {}
}
