import { Moment } from 'moment';

export interface IEForm {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  position?: string;
  contactNo?: string;
  experience?: string;
  workLocation?: string;
  empId?: string;
  dateOfJoin?: Moment;
  expWithSrs?: string;
  projectCode?: string;
  reportingManagerEmail?: string;
  notificationTo?: string;
}

export class EipForm implements IEForm {
  constructor(
    public id?: number,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public position?: string,
    public contactNo?: string,
    public experience?: string,
    public workLocation?: string,
    public empId?: string,
    public dateOfJoin?: Moment,
    public expWithSrs?: string,
    public projectCode?: string,
    public reportingManagerEmail?: string,
    public notificationTo?: string
  ) {}
}
