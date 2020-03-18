import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EIP_CREATE_URL,
  EIP_USER_DETAIL_EMAILID_URL,
  EIP_USER_DETAIL_URL,
  SERVER_API_URL,
  LOCATION_LIST_URL,
  POSITION_LIST_URL
} from 'app/app.constants';
import { IEForm } from 'app/shared/model/jobPost/eipform.model';
import { IPosition } from 'app/shared/model/jobPost/position.model';
import { IJob } from 'app/shared/model/jobPost/job.model';
import { DATE_FORMAT } from 'app/shared';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { IWorklocation } from 'app/shared/model/jobPost/worklocation.model';

type EntityResponseType = HttpResponse<IEForm>;

@Injectable({
  providedIn: 'root'
})
export class EipformService {
  public resourceUserDetailsUrl = SERVER_API_URL + EIP_USER_DETAIL_URL;
  public resourceCreateUserDetailsUrl = SERVER_API_URL + EIP_CREATE_URL;
  public resourceUserDetailByEmailIdUrl = SERVER_API_URL + EIP_USER_DETAIL_EMAILID_URL;
  public resourcePosition = SERVER_API_URL + POSITION_LIST_URL;
  public resourceLocation = SERVER_API_URL + LOCATION_LIST_URL;

  constructor(private httpClient: HttpClient) {}

  create(eipform: IEForm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eipform);
    return this.httpClient.post<IEForm>(this.resourceUserDetailsUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.httpClient.get<IEForm>(`${this.resourceUserDetailsUrl}/${id}`, { observe: 'response' });
  }

  findByEmailId(emailId: string): Observable<EntityResponseType> {
    return this.httpClient
      .get<IEForm>(`${this.resourceUserDetailByEmailIdUrl}/${emailId}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(eipform: IEForm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eipform);
    return this.httpClient
      .put<IEForm>(this.resourceCreateUserDetailsUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  private convertDateFromClient(eipform: IEForm): IJob {
    const copy: IEForm = Object.assign({}, eipform, {
      startDate: eipform.dateOfJoin != null && eipform.dateOfJoin.isValid() ? eipform.dateOfJoin.format(DATE_FORMAT) : null
    });
    return copy;
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfJoin = res.body.dateOfJoin != null ? moment(res.body.dateOfJoin) : null;
    }
    return res;
  }

  findPosition(): Observable<HttpResponse<IPosition[]>> {
    return this.httpClient.get<IPosition[]>(this.resourcePosition, { observe: 'response' });
  }

  findWorkLocation(): Observable<HttpResponse<IWorklocation[]>> {
    return this.httpClient.get<IWorklocation[]>(this.resourceLocation, { observe: 'response' });
  }
}
