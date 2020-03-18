import { Moment } from 'moment';

export interface IUserDetailHistoryModel {
  id?: string;
  empId?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  loginTime?: Moment;
  status?: string;
  visitPage?: string;
  modifyContent?: string;
}

export class UserDetailHistoryModel implements IUserDetailHistoryModel {
  constructor(
    id?: string,
    empId?: string,
    login?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    loginTime?: Moment,
    status?: string,
    visitPage?: string,
    modifyContent?: string
  ) {}
}
