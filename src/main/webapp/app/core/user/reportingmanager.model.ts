export interface IReportingManager {
  id?: string;
  reportingManagerId?: string;
  reportingManagerName?: string;
  reportingManagerEmail?: string;
}

export class ReportingManager implements IReportingManager {
  constructor(
    public id?: string,
    public reportingManagerId?: string,
    public reportingManagerName?: string,
    public reportingManagerEmail?: string
  ) {}
}
