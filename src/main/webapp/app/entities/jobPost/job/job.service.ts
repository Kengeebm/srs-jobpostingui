import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJob } from 'app/shared/model/jobPost/job.model';

type EntityResponseType = HttpResponse<IJob>;
type EntityArrayResponseType = HttpResponse<IJob[]>;

@Injectable({ providedIn: 'root' })
export class JobService {
  public resourceUrl = SERVER_API_URL + 'services/jobpost/api/jobs';
  public searchUrl = SERVER_API_URL + 'services/jobpost/api/_search/candidatesposition';
  public searchClientNameUrl = SERVER_API_URL + 'services/jobpost/api/_search/clientname';
  public searchJobPositionUrl = SERVER_API_URL + 'services/jobpost/api/_search/jobposition';
  public searchByLocationUrl = SERVER_API_URL + 'services/jobpost/api/_search/location';

  constructor(protected http: HttpClient) {}

  create(job: IJob): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(job);
    return this.http
      .post<IJob>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(job: IJob): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(job);
    return this.http
      .put<IJob>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IJob>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJob[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(job: IJob): IJob {
    const copy: IJob = Object.assign({}, job, {
      startDate: job.startDate != null && job.startDate.isValid() ? job.startDate.format(DATE_FORMAT) : null,
      endDate: job.endDate != null && job.endDate.isValid() ? job.endDate.format(DATE_FORMAT) : null,
      closedOn: job.closedOn != null && job.closedOn.isValid() ? job.closedOn.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
      res.body.closedOn = res.body.closedOn != null ? moment(res.body.closedOn) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((job: IJob) => {
        job.startDate = job.startDate != null ? moment(job.startDate) : null;
        job.endDate = job.endDate != null ? moment(job.endDate) : null;
        job.closedOn = job.closedOn != null ? moment(job.closedOn) : null;
      });
    }
    return res;
  }

  searchCandidate(req?: any) {
    return this.http.get(this.searchUrl + '?query=' + req);
  }

  findByClientName(searchData: string) {
    return this.findAllByCondition(searchData, this.searchClientNameUrl);
  }

  findByLocationName(searchData: string) {
    console.log('search data is:' + searchData);
    return this.findAllByCondition(searchData, this.searchByLocationUrl);
  }

  findByJobPositionName(searchData: string) {
    return this.findAllByCondition(searchData, this.searchJobPositionUrl);
  }

  findAllByCondition(query: string, searchUrl: string): Observable<EntityArrayResponseType> {
    return this.http.get<IJob[]>(searchUrl + `/${query}`, { observe: 'response' });
  }
}
