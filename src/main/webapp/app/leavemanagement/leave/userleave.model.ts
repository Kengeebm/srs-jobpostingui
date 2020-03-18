export interface IUserLeave {
  id?: string;
  employeeId?: string;
  totalLeaves?: number;
  leaveBalance?: number;
  sickLeaves?: number;
  casualLeaves?: number;
}

export class UserLeave implements IUserLeave {
  constructor(
    public id?: string,
    public employeeId?: string,
    public totalLeaves?: number,
    public leaveBalance?: number,
    public sickLeaves?: number,
    public casualLeaves?: number
  ) {}
}
