import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EIP_BASE_URL, FIND_ALL_USER_DETAIL_HISTORY_SAVE_URL, SERVER_API_URL, USER_DETAIL_HISTORY_SAVE_URL } from 'app/app.constants';
import { UserDetailHistoryModel } from 'app/home/user-detail-history.model';

@Injectable({ providedIn: 'root' })
export class UserdetailhistoryService {
  SAVE_URL = SERVER_API_URL + EIP_BASE_URL + USER_DETAIL_HISTORY_SAVE_URL;
  FIND_ALL_HISTORY_URL = SERVER_API_URL + EIP_BASE_URL + FIND_ALL_USER_DETAIL_HISTORY_SAVE_URL;

  constructor(private http: HttpClient) {}

  save(userDetailHistory: UserDetailHistoryModel): Observable<HttpResponse<any>> {
    return this.http.post(this.SAVE_URL, userDetailHistory, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<UserDetailHistoryModel[]>> {
    return this.http.get<UserDetailHistoryModel[]>(this.FIND_ALL_HISTORY_URL, { observe: 'response' });
  }
}
