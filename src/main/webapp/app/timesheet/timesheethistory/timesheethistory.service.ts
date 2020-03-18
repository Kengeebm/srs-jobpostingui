import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeSheetHistory } from 'app/shared/model/EIP/timesheethistory.model';
type EntityResponseType = HttpResponse<ITimeSheetHistory>;
type EntityArrayResponseType = HttpResponse<ITimeSheetHistory[]>;

@Injectable({ providedIn: 'root' })
export class TimesheetHistoryService {
  public resourceUrl = SERVER_API_URL + 'services/eip/api/timesheet/history';
  constructor(protected http: HttpClient) {}

  insert(timesheethistory: ITimeSheetHistory): Observable<EntityResponseType> {
    return this.http.post<ITimeSheetHistory>(this.resourceUrl, timesheethistory, { observe: 'response' });
  }

  update(timesheethistory: ITimeSheetHistory): Observable<EntityResponseType> {
    return this.http.put<ITimeSheetHistory>(this.resourceUrl, timesheethistory, { observe: 'response' });
  }

  displayAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ITimeSheetHistory[]>(this.resourceUrl, { observe: 'response' });
  }

  findByUser(userLogin: string): Observable<EntityArrayResponseType> {
    return this.http.get<ITimeSheetHistory[]>(this.resourceUrl + '/?userLogin=' + userLogin, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITimeSheetHistory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
