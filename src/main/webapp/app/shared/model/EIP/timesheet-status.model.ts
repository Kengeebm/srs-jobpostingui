export interface ITimesheetStatus {
  approveStatus?: string;
  count?: number;
}

export class TimesheetStatus implements ITimesheetStatus {
  constructor(public approveStatus?: string, public count?: number) {}
}
