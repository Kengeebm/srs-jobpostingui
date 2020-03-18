import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST_API_URL, SERVER_API_URL } from 'app/app.constants';
import { IRequest } from 'app/requestmanagement/request/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public resourceUrl = SERVER_API_URL + REQUEST_API_URL;

  constructor(private http: HttpClient) {}

  create(request: IRequest): Observable<HttpResponse<IRequest>> {
    return this.http.post<IRequest>(this.resourceUrl, request, { observe: 'response' });
  }

  update(request: IRequest): Observable<HttpResponse<IRequest>> {
    return this.http.put<IRequest>(this.resourceUrl, request, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<IRequest[]>> {
    return this.http.get<IRequest[]>(`${this.resourceUrl}/findAll`, { observe: 'response' });
  }

  findByEmployeeId(employeeId: string): Observable<HttpResponse<IRequest>> {
    return this.http.get<IRequest>(`${this.resourceUrl}/${employeeId}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
