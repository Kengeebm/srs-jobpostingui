import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LEAVE_CANCEL_URL,
  LEAVE_STATUS_URL,
  LEAVE_TYPE_COUNT_EMP_LIST_URL,
  LEAVE_TYPE_EMP_LIST_URL,
  LEAVE_TYPE_URL,
  SERVER_API_URL,
  UPDATE_EMPLOYEE_LIST_BY_LEAVE_STATUS_URL,
  USER_DETAILS__LEAVE_HISTORY_URL,
  USER_DETAILS_LEAVE_URL
} from 'app/app.constants';
import { IUserDetailsLeave } from 'app/leavemanagement/leave/UserDetailsLeave.model';
import { IConfig } from 'app/shared/model/config.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IUserDetailsLeave>;
type EntityArrayResponseType = HttpResponse<IUserDetailsLeave[]>;

@Injectable({
  providedIn: 'root'
})
export class UserDetailsLeaveService {
  public resourceUrl = SERVER_API_URL + USER_DETAILS_LEAVE_URL;
  public resourceHistoryUrl = SERVER_API_URL + USER_DETAILS__LEAVE_HISTORY_URL;
  public resourceLeaveType = SERVER_API_URL + LEAVE_TYPE_URL;
  public resourceLeaveCancel = SERVER_API_URL + LEAVE_CANCEL_URL;
  private LEAVE_STATUS = SERVER_API_URL + LEAVE_STATUS_URL;
  private LEAVE_TYPE_URL = SERVER_API_URL + LEAVE_TYPE_EMP_LIST_URL;
  private SUBMITTED_LEAVE_TYPE_URL = SERVER_API_URL + LEAVE_TYPE_COUNT_EMP_LIST_URL;
  private UPDATE_EMPLOYEE_LIST_BY_LEAVE_STATUS_URL = SERVER_API_URL + UPDATE_EMPLOYEE_LIST_BY_LEAVE_STATUS_URL;
  private LEAVE_STATUS_BY_LEAVETYPE_URL = SERVER_API_URL + 'services/eip/api/userdetailsleave/totalleavestatuscount/';
  private LEAVE_STATUS_BY_LEAVETYPE_BY_MONTH_URL = SERVER_API_URL + 'services/eip/api/userdetailsleave/totalleavestatuscountbymonth/';
  private LEAVE_APPROVED_LIST_URL = SERVER_API_URL + 'services/eip/api/userdetailsleave/leaveapprovedlist/';
  private LEAVE_STATUS_BY_ID = SERVER_API_URL + 'services/eip/api/userdetailsleave/leavelist/';
  private SEND_APPROVED_MAIL_TO_EMP = SERVER_API_URL + 'services/eip/api/userdetailsleave/leave-response';
  private LEAVE_TYPES_AND_STATUS = SERVER_API_URL + 'services/eip/api/userdetailsleave/leavelistbytwoleavetype/';
  private LEAVE_BY_REPORTING_MANAGER = SERVER_API_URL + 'services/eip/api/userdetailsleave/leavelistbyreportingmanager/';

  constructor(private http: HttpClient) {}

  create(userDetailsLeave: IUserDetailsLeave): Observable<EntityResponseType> {
    return this.http.post<IUserDetailsLeave>(this.resourceUrl, userDetailsLeave, { observe: 'response' });
  }

  update(userDetailsLeave: IUserDetailsLeave): Observable<EntityResponseType> {
    return this.http.put<IUserDetailsLeave>(this.resourceUrl, userDetailsLeave, { observe: 'response' });
  }

  // findByEmployeeId(employeeId: string): Observable<EntityResponseType> {
  //   return this.http.get<IUserDetailsLeave>(`${this.resourceUrl}/employee/${employeeId}`, { observe: 'response' });
  // }

  findByEmployeeId(employeeId: string): Observable<EntityArrayResponseType> {
    return this.http.get<IUserDetailsLeave[]>(`${this.resourceHistoryUrl}/${employeeId}`, { observe: 'response' });
  }

  findLeaveType(): Observable<HttpResponse<IConfig[]>> {
    return this.http.get<IConfig[]>(this.resourceLeaveType, { observe: 'response' });
  }

  sendCancelLeaveMail(userDetailLeave): Observable<boolean> {
    return this.http.post<boolean>(this.resourceLeaveCancel, userDetailLeave);
  }

  sendApprovedMailToEmployee(data) {
    return this.http.post(this.SEND_APPROVED_MAIL_TO_EMP, data, {
      observe: 'response'
    });
  }

  findRejectedLeaveList(status: string): Observable<EntityArrayResponseType> {
    return this.http.get<IUserDetailsLeave[]>(this.LEAVE_STATUS + status, { observe: 'response' });
  }

  findByIdAndStatusLeaveList(empId: string, status: string[]): Observable<EntityArrayResponseType> {
    return this.http.get<IUserDetailsLeave[]>(this.LEAVE_STATUS_BY_ID + empId + '/' + status, { observe: 'response' });
  }

  findListByLeaveTypesAndStatus(types: string[], status: string[]): Observable<EntityArrayResponseType> {
    return this.http.get<IUserDetailsLeave[]>(this.LEAVE_TYPES_AND_STATUS + types + '/' + status, { observe: 'response' });
  }

  findListByReportingManager(reportingManager: string[], types: string[], status: string[]): Observable<EntityArrayResponseType> {
    return this.http.get<IUserDetailsLeave[]>(this.LEAVE_BY_REPORTING_MANAGER + reportingManager + '/' + types + '/' + status, {
      observe: 'response'
    });
  }

  findRejectedListByReportingManager(reportingManager: string[], status: string[]): Observable<EntityArrayResponseType> {
    return this.http.get<IUserDetailsLeave[]>(this.LEAVE_BY_REPORTING_MANAGER + reportingManager + '/' + status, { observe: 'response' });
  }
  // findLeavePendingList(type: string): Observable<EntityArrayResponseType> {
  //   return this.http.get<IUserDetailsLeave[]>(this.LEAVE_TYPE_URL + type, { observe: 'response' });
  // }

  // findLeaveApprovedList(type: string): Observable<EntityArrayResponseType> {
  //   return this.http.get<IUserDetailsLeave[]>(this.LEAVE_APPROVED_LIST_URL + type, { observe: 'response' });
  // }

  updateAllLeaveEmployeeListByStatus(status: string, userDetailsLeaveList: IUserDetailsLeave[]): Observable<HttpResponse<Boolean>> {
    return this.http.post<Boolean>(this.UPDATE_EMPLOYEE_LIST_BY_LEAVE_STATUS_URL + status, userDetailsLeaveList, {
      observe: 'response'
    });
  }

  findTotalLeaveStatusCount(type: string, status: string): Observable<HttpResponse<number>> {
    return this.http.get<number>(this.LEAVE_STATUS_BY_LEAVETYPE_URL + type + '/' + status, { observe: 'response' });
  }

  findTotalLeaveStatusCountByMonth(type: string, status: string, date: string): Observable<HttpResponse<number>> {
    return this.http.get<number>(this.LEAVE_STATUS_BY_LEAVETYPE_BY_MONTH_URL + type + '/' + status + '/' + date, { observe: 'response' });
  }
}
