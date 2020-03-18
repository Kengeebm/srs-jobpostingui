import { Moment } from 'moment';

export interface ITimeSheetHistory {
  id?: String;
  tsid?: String;
  dateTime?: Moment;
  status?: String;
  client?: String;
  project?: String;
  task?: String;
  efforts?: number;
  userLogin?: String;
  updatedBy?: String;
  updatedOn?: Moment;
}

export class TimeSheetHistory implements ITimeSheetHistory {
  constructor(
    public id?: String,
    public tsid?: String,
    public date?: Moment,
    public status?: String,
    public client?: String,
    public project?: String,
    public task?: String,
    public efforts?: number,
    public userLogin?: String,
    public updatedBy?: String,
    public updatedOn?: Moment
  ) {}
}
