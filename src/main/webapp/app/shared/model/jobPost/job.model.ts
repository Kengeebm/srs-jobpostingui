import { Moment } from 'moment';

export interface IJob {
  id?: number;
  jobId?: string;
  clientName?: string;
  noOfPosition?: number;
  positionName?: string;
  location?: string;
  jobDesc?: string;
  fromExp?: number;
  toExp?: number;
  filledPosition?: number;
  comments?: string;
  startDate?: Moment;
  endDate?: Moment;
  closedOn?: Moment;
  openedBy?: string;
  closedBy?: string;
  assignee?: string[];
  closedFlag?: boolean;
}

export class Job implements IJob {
  constructor(
    public id?: number,
    public jobId?: string,
    public clientName?: string,
    public noOfPosition?: number,
    public positionName?: string,
    public location?: string,
    public jobDesc?: string,
    public fromExp?: number,
    public toExp?: number,
    public filledPosition?: number,
    public comments?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public closedOn?: Moment,
    public openedBy?: string,
    public closedBy?: string,
    public assignee?: string[],
    public closedFlag?: boolean
  ) {}
}
