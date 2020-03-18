import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL, USER_LEAVE_URL } from 'app/app.constants';
import { IUserLeave } from 'app/leavemanagement/leave/userleave.model';

@Injectable({
  providedIn: 'root'
})
export class UserleaveService {
  public resourceUrl = SERVER_API_URL + USER_LEAVE_URL;

  constructor(private http: HttpClient) {}

  create(user: IUserLeave): Observable<HttpResponse<IUserLeave>> {
    return this.http.post<IUserLeave>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: IUserLeave): Observable<HttpResponse<IUserLeave>> {
    return this.http.put<IUserLeave>(this.resourceUrl, user, { observe: 'response' });
  }

  findByEmployeeId(employeeId: string): Observable<HttpResponse<IUserLeave>> {
    return this.http.get<IUserLeave>(`${this.resourceUrl}/${employeeId}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
