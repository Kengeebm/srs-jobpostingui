import { ITimesheetDateStatus } from 'app/shared/model/EIP/timesheet-date-status.model';
import { Moment } from 'moment';

export interface ITimesheet {
  id?: string;
  userName?: string;
  saveDate?: Moment;
  submitDate?: Moment;
  submitTime?: string;
  emailId?: string;
  employeeId?: string;
  approveStatus?: string;
  approvedBy?: string;
  approvedDate?: Moment;
  approvedTime?: string;
  noWorkingDays?: string;
  noWorkFromHome?: string;
  noWorkFromClientLocation?: string;
  noCompOff?: string;
  noLeaves?: string;
  timeSheetDateStatusList?: ITimesheetDateStatus[];
}

export class Timesheet implements ITimesheet {
  constructor(
    public id?: string,
    public userName?: string,
    public saveDate?: Moment,
    public submitDate?: Moment,
    public submitTime?: string,
    public emailId?: string,
    public employeeId?: string,
    public approveStatus?: string,
    public approvedBy?: string,
    public approvedDate?: Moment,
    public approvedTime?: string,
    public noWorkingDays?: string,
    public noWorkFromHome?: string,
    public noWorkFromClientLocation?: string,
    public noCompOff?: string,
    public noLeaves?: string,
    public timeSheetDateStatusList?: ITimesheetDateStatus[]
  ) {}
}
