import { Moment } from 'moment';

export interface IUserDetailsLeave {
  id?: string;
  employeeId?: string;
  empName?: string;
  empMail?: string;
  reportingManagerEmail?: string;
  leaveType?: string;
  fromDate?: Moment;
  toDate?: Moment;
  totalDays?: number;
  reasonForLeave?: string;
  notificationTo?: string;
  status?: string;
  submitDate?: string;
  submitTime?: string;
  approvedBy?: string;
  approvedDate?: string;
  approvedTime?: string;
  reasonForReject?: string;
}

export class UserDetailsLeave implements IUserDetailsLeave {
  constructor(
    public id?: string,
    public empName?: string,
    public employeeId?: string,
    public empMail?: string,
    public reportingManagerEmail?: string,
    public leaveType?: string,
    public fromDate?: Moment,
    public toDate?: Moment,
    public totalDays?: number,
    public reasonForLeave?: string,
    public status?: string,
    public submitDate?: string,
    public submitTime?: string,
    public approvedBy?: string,
    public approvedDate?: string,
    public approvedTime?: string,
    public notificationTo?: string,
    public reasonForReject?: string
  ) {}
}
