import { Moment } from 'moment';

export interface IJobHistory {
  id?: number;
  jobId?: string;
  clientName?: string;
  noOfPosition?: number;
  positionName?: string;
  location?: string;
  jobDesc?: string;
  expReq?: string;
  filledPosition?: number;
  comments?: string;
  startDate?: Moment;
  endDate?: Moment;
  closedOn?: Moment;
  openedBy?: string;
  closedBy?: string;
  updatedBy?: string;
  updatedDate?: Moment;
}

export class JobHistory implements IJobHistory {
  constructor(
    public id?: number,
    public jobId?: string,
    public clientName?: string,
    public noOfPosition?: number,
    public positionName?: string,
    public location?: string,
    public jobDesc?: string,
    public expReq?: string,
    public filledPosition?: number,
    public comments?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public closedOn?: Moment,
    public openedBy?: string,
    public closedBy?: string,
    public updatedBy?: string,
    public updatedDate?: Moment
  ) {}
}
