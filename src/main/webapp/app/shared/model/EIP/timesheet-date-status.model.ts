import { Moment } from 'moment';

export interface ITimesheetDateStatus {
  id?: string;
  status?: string;
  date?: Moment;
  leaveDay?: boolean;
  // remainig variable no need for now.
}

export class TimesheetDateStatus implements ITimesheetDateStatus {
  constructor(public id?: string, public status?: string, public date?: Moment, public leaveDay?: boolean) {}
}
