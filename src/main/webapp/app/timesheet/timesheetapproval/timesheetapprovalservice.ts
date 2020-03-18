import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { ITimeSheeetApproval } from './timesheetapprovalmodel';

type EntityResponseType = HttpResponse<ITimeSheeetApproval>;
type EntityArrayResponseType = HttpResponse<ITimeSheeetApproval[]>;

@Injectable({ providedIn: 'root' })
export class TimeSheetApprovalService {
  public resourceUrl = SERVER_API_URL + 'services/eip/api/create';
  public resourceFindByUserLogin = SERVER_API_URL + 'services/eip/api/findbyuser/';
  public resourceUpdateTimesheetApproval = SERVER_API_URL + 'services/eip/api/update';
  public findByManagerURL = SERVER_API_URL + 'services/eip/api/findallbymanager';
  public findByIdURL = SERVER_API_URL + 'services/eip/api/findbyId';
  constructor(protected http: HttpClient) {}

  create(timeSheeetApproval: ITimeSheeetApproval): Observable<EntityResponseType> {
    alert('Timesheet Approval' + timeSheeetApproval.managerName);
    return this.http.post<ITimeSheeetApproval>(this.resourceUrl, timeSheeetApproval, { observe: 'response' });
  }

  findByUser(userLogin: string): Observable<EntityArrayResponseType> {
    return this.http.get<ITimeSheeetApproval[]>(this.resourceFindByUserLogin + userLogin, { observe: 'response' });
  }

  update(timeSheeetApproval: ITimeSheeetApproval): Observable<EntityResponseType> {
    return this.http.put<ITimeSheeetApproval>(this.resourceUpdateTimesheetApproval, timeSheeetApproval, { observe: 'response' });
  }

  findByManager(managerEmail: string): Observable<EntityArrayResponseType> {
    return this.http.get<ITimeSheeetApproval[]>(this.findByManagerURL + '?managerEmail=' + managerEmail, { observe: 'response' });
  }

  findById(id: string): Observable<EntityResponseType> {
    return this.http.get<ITimeSheeetApproval>(this.findByIdURL + '/' + id, { observe: 'response' });
  }

  protected convertDateFromClient(timeSheeetApproval: ITimeSheeetApproval): ITimeSheeetApproval {
    const copy: ITimeSheeetApproval = Object.assign({}, timeSheeetApproval, {
      startDate:
        timeSheeetApproval.fromDate != null && timeSheeetApproval.fromDate.isValid()
          ? timeSheeetApproval.fromDate.format(DATE_FORMAT)
          : null,
      endDate:
        timeSheeetApproval.toDate != null && timeSheeetApproval.toDate.isValid() ? timeSheeetApproval.toDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fromDate = res.body.fromDate != null ? moment(res.body.fromDate) : null;
      res.body.toDate = res.body.toDate != null ? moment(res.body.toDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((timeSheeetApproval: ITimeSheeetApproval) => {
        timeSheeetApproval.fromDate = timeSheeetApproval.fromDate != null ? moment(timeSheeetApproval.fromDate) : null;
        timeSheeetApproval.toDate = timeSheeetApproval.toDate != null ? moment(timeSheeetApproval.toDate) : null;
      });
    }
    return res;
  }
}
