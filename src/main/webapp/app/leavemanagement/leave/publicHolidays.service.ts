import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PUBLIC_HOLIDAY_URL, SERVER_API_URL, PUBLIC_HOLIDAYS } from 'app/app.constants';
import { PublicHolidays, IPublicHolidays } from './publicHolidays.model';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<PublicHolidays>;
type EntityArrayResponseType = HttpResponse<PublicHolidays[]>;

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {
  public resourceUrl = SERVER_API_URL + PUBLIC_HOLIDAY_URL;

  constructor(private http: HttpClient) {}

  private getUrlBasedType(selectionEvent: string): string {
    if (selectionEvent === PUBLIC_HOLIDAYS) {
      return this.resourceUrl;
    }
  }

  create(user: PublicHolidays): Observable<HttpResponse<PublicHolidays>> {
    return this.http.post<PublicHolidays>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: PublicHolidays): Observable<HttpResponse<PublicHolidays>> {
    return this.http.put<PublicHolidays>(this.resourceUrl, user, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<PublicHolidays[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findById(id: string, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.get<PublicHolidays>(this.getUrlBasedType(selectionEvent) + `/${id}`, { observe: 'response' });
  }

  query(selectionEvent: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPublicHolidays[]>(this.getUrlBasedType(selectionEvent), { params: options, observe: 'response' });
  }

  findAllByProjectCode(projectCode: String): Observable<HttpResponse<IPublicHolidays[]>> {
    return this.http.get<IPublicHolidays[]>(this.resourceUrl + '/project/' + `${projectCode}`, { observe: 'response' });
  }
}
