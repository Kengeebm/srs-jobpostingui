import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { Notification } from './notification-management.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public resourceUrl = SERVER_API_URL + 'services/eip/api/notification';

  constructor(private http: HttpClient) {}

  create(report: Notification): Observable<HttpResponse<Notification>> {
    return this.http.post<Notification>(this.resourceUrl + '/create', report, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Notification[]>> {
    return this.http.get<Notification[]>(`${this.resourceUrl}` + '/findAll', { observe: 'response' });
  }

  findLastFive(): Observable<HttpResponse<Notification[]>> {
    return this.http.get<Notification[]>(`${this.resourceUrl}` + '/findLastFive', { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl + '/delete'}/${id}`, { observe: 'response' });
  }
}
