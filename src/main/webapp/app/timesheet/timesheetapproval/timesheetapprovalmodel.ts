import { Moment } from 'moment';

export interface ITimeSheeetApproval {
  id?: String;
  currentDate?: Moment;
  fromDate?: Moment;
  toDate?: Moment;
  description?: string;
  managerName?: string;
  managerEmail?: string;
  userLogin?: string;
  approvalFlag?: number;
}

export class TimeSheetApproval implements ITimeSheeetApproval {
  constructor(
    public id?: String,
    public currentDate?: any,
    public fromDate?: any,
    public toDate?: any,
    public description?: string,
    public managerName?: string,
    public managerEmail?: string,
    public userLogin?: string,
    public approvalFlag?: number
  ) {}
}
