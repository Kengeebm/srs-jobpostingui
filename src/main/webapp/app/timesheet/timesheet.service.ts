import { IUnfreezedList } from './../shared/model/EIP/unfreezedlist.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DATE_FORMAT_YYYY_MM_DD, SERVER_API_URL, STATUS_SMALL_TEXT } from 'app/app.constants';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { IStatus } from 'app/shared/model/EIP/status.model';
import { ITimesheetDateStatus } from 'app/shared/model/EIP/timesheet-date-status.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ITimesheet } from './../shared/model/EIP/timesheet.model';
import { map } from 'rxjs/operators';
import { IEForm } from 'app/shared/model/jobPost/eipform.model';

type EntityResponseType = HttpResponse<ITimesheet>;
type EntityArrayResponseType = HttpResponse<ITimesheet[]>;

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private EipServiceURL = 'services/eip/api';
  private resourceUrl = SERVER_API_URL + this.EipServiceURL;
  private TIMESHEET_STATUS = SERVER_API_URL + 'services/eip/api/timesheetstatus/';
  private TIMESHEET_APPROVAL_UPDATE_STATUS_URL = SERVER_API_URL + 'services/eip/api/timesheetstatus';
  private EMPLOYEE_LIST_NOT_SUBMIT_TIMESHEET_URL = SERVER_API_URL + 'services/eip/api/timesheet/no-submit-emp-list';
  private UNFREEZE_TIMESHEET_URL = SERVER_API_URL + 'services/eip/api/timesheet/unfreez-request';
  private TIMESHEET_APPROVAL_STATUS = SERVER_API_URL + 'services/eip/api/timesheet/timesheetapprovalstatus/';
  private TIMESHEET_HISTORY = SERVER_API_URL + 'services/eip/api/timesheet/timesheetlistbyemailstatus/';
  private TIMESHEET_SEND_REMAINDER_MAIL_TO_EMP = SERVER_API_URL + 'services/eip/api/timesheet/sendmailremainder';
  private TIMESHEET_DOWNLOAD_ALL_EMP_URL = SERVER_API_URL + 'services/eip/api/timesheet/download-all-employee-timesheet';
  private TIMESHEET_TOTAL_STATUS = SERVER_API_URL + 'services/eip/api/timesheet/timesheetstatuscount/';
  private TIMESHEET_UNFREEZED_POST_URL = SERVER_API_URL + 'services/eip/api/timesheet/unfreez-list/post';
  private TIMESHEET_UNFREEZED_GET_URL = SERVER_API_URL + 'services/eip/api/timesheet/unfreez-list/all';
  private TIMESHEET_TOTAL_STATUSBYMONTH = SERVER_API_URL + 'services/eip/api/timesheet/timesheetstatusbymonth/';

  constructor(protected http: HttpClient) {}

  create(timeSheeet: ITimesheet): Observable<EntityResponseType> {
    for (let i = 0; i < timeSheeet.timeSheetDateStatusList.length; i++) {
      timeSheeet.timeSheetDateStatusList[i] = this.convertDateFromClient(timeSheeet.timeSheetDateStatusList[i]);
    }
    return this.http.post<ITimesheet>(this.resourceUrl + '/timesheet', timeSheeet, { observe: 'response' });
  }

  findAllByUserLogin(userLogin: string): Observable<EntityArrayResponseType> {
    return this.http.get<ITimesheet[]>(this.resourceUrl + '/timesheet', { observe: 'response' });
  }

  findByEmailApproveStatus(emailId: string, approveStatus: string): Observable<EntityArrayResponseType> {
    return this.http.get<ITimesheet[]>(this.TIMESHEET_HISTORY + `${emailId}` + '/' + `${approveStatus}`, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ITimesheet[]>(this.resourceUrl + '/timesheetAll', { observe: 'response' });
  }

  findTimeSheet(fDate, tDate, employeeId): Observable<EntityResponseType> {
    const params = new HttpParams()
      .set('fromDate', fDate)
      .append('toDate', tDate)
      .append('employeeId', employeeId);
    return this.http
      .get<ITimesheet>(this.resourceUrl + '/timesheet/datebased', {
        params,
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByUserLogin(userLogin: string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('userLogin', userLogin);
    return this.http.get<ITimesheet[]>(this.resourceUrl + '/timesheet/get', { params, observe: 'response' });
  }

  exportasExcel(fromDate, toDate, email) {
    const params = new HttpParams()
      .set('fromDate', moment(fromDate).format('YYYY-MM-DD'))
      .set('toDate', moment(toDate).format('YYYY-MM-DD'))
      .set('email', email);
    return this.http.get(this.resourceUrl + '/timesheet', {
      params,
      responseType: 'blob' as 'json'
    });
  }

  exportasMail(fromDate, toDate, id, email, user, firstName, lastName): any {
    const params = new HttpParams()
      .set('id', id)
      .set('fromDate', moment(fromDate).format('YYYY-MM-DD'))
      .set('toDate', moment(toDate).format('YYYY-MM-DD'))
      .set('email', email)
      .set('user', user)
      .set('firstName', firstName)
      .set('lastName', lastName);
    return this.http.get(this.resourceUrl + '/timesheet/mail', { params });
  }

  sendRemainderMailToEmployee(data) {
    return this.http.post(this.TIMESHEET_SEND_REMAINDER_MAIL_TO_EMP, data, {
      observe: 'response'
    });
  }

  protected convertDateFromClient(timesheetDateStatus: ITimesheetDateStatus): ITimesheetDateStatus {
    const copy: ITimesheetDateStatus = Object.assign({}, timesheetDateStatus, {
      date:
        timesheetDateStatus.date != null && moment(timesheetDateStatus.date).isValid()
          ? moment(timesheetDateStatus.date).format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  findStatus(): Observable<HttpResponse<IStatus[]>> {
    return this.http.get<IStatus[]>(this.resourceUrl + '/status', { observe: 'response' });
  }
  findTimeSheetStatus(status: string): Observable<HttpResponse<ITimesheet[]>> {
    return this.http.get<ITimesheet[]>(this.TIMESHEET_STATUS + status, { observe: 'response' });
  }

  findNotSubmittedEmployeeList(): Observable<HttpResponse<IEForm[]>> {
    return this.http.get<IEForm[]>(this.EMPLOYEE_LIST_NOT_SUBMIT_TIMESHEET_URL, { observe: 'response' });
  }

  updateTimeSheetApprovalStatus(status: string, timeSheeetList: ITimesheet[]): Observable<HttpResponse<ITimesheet[]>> {
    const params = new HttpParams();
    params.set(STATUS_SMALL_TEXT, status);
    return this.http.put<ITimesheet[]>(this.TIMESHEET_APPROVAL_UPDATE_STATUS_URL, timeSheeetList, {
      params,
      observe: 'response'
    });
  }

  unfreeTimeSendMail(fromDate, toDate, id, email, user): any {
    const params = new HttpParams()
      .set('id', id)
      .set('fromDate', moment(fromDate).format(DATE_FORMAT_YYYY_MM_DD))
      .set('toDate', moment(toDate).format(DATE_FORMAT_YYYY_MM_DD))
      .set('email', email)
      .set('user', user);
    return this.http.get(this.UNFREEZE_TIMESHEET_URL, { params });
  }

  updateTimesheetApprovedStatus(status: string, timeSheeetList: ITimesheet[]): Observable<HttpResponse<ITimesheet[]>> {
    return this.http.post<ITimesheet[]>(this.TIMESHEET_APPROVAL_STATUS + status, timeSheeetList, {
      observe: 'response'
    });
  }

  downloadAllEmployeeExcel(data) {
    return this.http.post(this.TIMESHEET_DOWNLOAD_ALL_EMP_URL, data, {
      responseType: 'blob' as 'json'
    });
  }

  getTotalStatusCount(statusList: string) {
    return this.http.get<number>(this.TIMESHEET_TOTAL_STATUS + statusList, { observe: 'response' });
  }

  getTotalStatusCountByMonth(statusList: string, date: string) {
    return this.http.get<number>(this.TIMESHEET_TOTAL_STATUSBYMONTH + statusList + '/' + date, { observe: 'response' });
  }

  createUnfreezedList(unfreezedList: IUnfreezedList): Observable<HttpResponse<IUnfreezedList>> {
    return this.http.post<IUnfreezedList>(this.TIMESHEET_UNFREEZED_POST_URL, unfreezedList, {
      observe: 'response'
    });
  }

  findAllUnfreezedList(): Observable<HttpResponse<IUnfreezedList[]>> {
    return this.http.get<IUnfreezedList[]>(this.TIMESHEET_UNFREEZED_GET_URL, { observe: 'response' });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timeSheetDateStatusList.forEach(x => {
        x.date = x.date != null ? moment(x.date) : null;
      });
    }
    return res;
  }
}
