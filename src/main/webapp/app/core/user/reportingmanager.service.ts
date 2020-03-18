import { REPORTING_MANAGER } from './../../app.constants';
import { ReportingManager, IReportingManager } from './reportingmanager.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<ReportingManager>;
type EntityArrayResponseType = HttpResponse<ReportingManager[]>;

@Injectable({
  providedIn: 'root'
})
export class ReportingManagerService {
  public resourceUrl = SERVER_API_URL + 'services/eip/api/reportingmanager';

  constructor(private http: HttpClient) {}

  private getUrlBasedType(selectionEvent: string): string {
    if (selectionEvent === REPORTING_MANAGER) {
      return this.resourceUrl;
    }
  }

  create(report: ReportingManager): Observable<HttpResponse<ReportingManager>> {
    return this.http.post<ReportingManager>(this.resourceUrl, report, { observe: 'response' });
  }

  update(report: ReportingManager): Observable<HttpResponse<ReportingManager>> {
    return this.http.put<ReportingManager>(this.resourceUrl, report, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ReportingManager[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findById(id: string, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.get<ReportingManager>(this.getUrlBasedType(selectionEvent) + `/${id}`, { observe: 'response' });
  }

  findEmailByName(name: String): Observable<HttpResponse<IReportingManager[]>> {
    return this.http.get<IReportingManager[]>(this.resourceUrl + '/emailbyname' + `/${name}`, { observe: 'response' });
  }

  reportingManagerEmail(): Observable<string[]> {
    return this.http.get<string[]>(this.resourceUrl + '/email');
  }

  query(selectionEvent: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReportingManager[]>(this.getUrlBasedType(selectionEvent), { params: options, observe: 'response' });
  }
}
