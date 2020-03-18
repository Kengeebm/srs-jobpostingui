import { Moment } from 'moment';

export interface IPublicHolidays {
  id?: string;
  name?: string;
  date?: Moment;
  projectCode?: string;
}

export class PublicHolidays implements IPublicHolidays {
  constructor(public id?: string, public name?: string, public date?: Moment, public projectCode?: string) {}
}
