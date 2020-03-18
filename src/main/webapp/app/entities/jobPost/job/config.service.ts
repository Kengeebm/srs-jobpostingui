import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CLIENT_NAME,
  CLIENT_NAME_LIST_URL,
  EXPERIENCE,
  EXPERIENCE_LIST_URL,
  JOB_NO_LIST_URL,
  LOCATION,
  LOCATION_LIST_URL,
  NUMBER_JOB,
  POSITION,
  POSITION_LIST_URL,
  SERVER_API_URL,
  USER_NAME,
  USER_NAME_LIST_URL,
  LEAVE_TYPE_URL,
  STATUS,
  LEAVE_TYPE
} from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConfig } from 'app/shared/model/config.model';

type EntityResponseType = HttpResponse<IConfig>;
type EntityArrayResponseType = HttpResponse<IConfig[]>;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  public resourceExperienceUrl = SERVER_API_URL + EXPERIENCE_LIST_URL;
  public resourceClientNameUrl = SERVER_API_URL + CLIENT_NAME_LIST_URL;
  public resourceUserNameUrl = SERVER_API_URL + USER_NAME_LIST_URL;
  public resourceLocationUrl = SERVER_API_URL + LOCATION_LIST_URL;
  public resourcePositionUrl = SERVER_API_URL + POSITION_LIST_URL;
  public resourceJobNoUrl = SERVER_API_URL + JOB_NO_LIST_URL;
  public resourceLeaveTypeUrl = SERVER_API_URL + LEAVE_TYPE_URL;
  public resourceStatusUrl = SERVER_API_URL + 'services/eip/api/status';

  constructor(protected http: HttpClient) {}

  create(config: IConfig, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.post<IConfig>(this.getUrlBasedType(selectionEvent), config, { observe: 'response' });
  }

  private getUrlBasedType(selectionEvent: string): string {
    if (selectionEvent === EXPERIENCE) {
      return this.resourceExperienceUrl;
    } else if (selectionEvent === CLIENT_NAME) {
      return this.resourceClientNameUrl;
    } else if (selectionEvent === USER_NAME) {
      return this.resourceUserNameUrl;
    } else if (selectionEvent === LOCATION) {
      return this.resourceLocationUrl;
    } else if (selectionEvent === POSITION) {
      return this.resourcePositionUrl;
    } else if (selectionEvent === NUMBER_JOB) {
      return this.resourceJobNoUrl;
    } else if (selectionEvent === STATUS) {
      return this.resourceStatusUrl;
    } else if (selectionEvent === LEAVE_TYPE) {
      return this.resourceLeaveTypeUrl;
    }
  }

  update(config: IConfig, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.put<IConfig>(this.getUrlBasedType(selectionEvent), config, { observe: 'response' });
  }

  find(id: number, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.get<IConfig>(this.getUrlBasedType(selectionEvent) + `/${id}`, { observe: 'response' });
  }

  query(selectionEvent: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConfig[]>(this.getUrlBasedType(selectionEvent), { params: options, observe: 'response' });
  }

  findAll(selectionEvent: string): Observable<IConfig[]> {
    return this.http.get<IConfig[]>(this.getUrlBasedType(selectionEvent));
  }

  delete(id: any, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.delete(this.getUrlBasedType(selectionEvent) + `/${id}`, { observe: 'response' });
  }
}
