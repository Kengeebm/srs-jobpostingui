import { PROJECT } from './../../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { Project, IProject } from './project.model';

type EntityResponseType = HttpResponse<Project>;
type EntityArrayResponseType = HttpResponse<Project[]>;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public resourceUrl = SERVER_API_URL + 'services/eip/api/project';

  constructor(private http: HttpClient) {}

  private getUrlBasedType(selectionEvent: string): string {
    if (selectionEvent === PROJECT) {
      return this.resourceUrl;
    }
  }

  create(project: Project): Observable<HttpResponse<Project>> {
    return this.http.post<Project>(this.resourceUrl, project, { observe: 'response' });
  }

  update(project: Project): Observable<HttpResponse<Project>> {
    return this.http.put<Project>(this.resourceUrl, project, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Project[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findById(id: string, selectionEvent: string): Observable<EntityResponseType> {
    return this.http.get<Project>(this.getUrlBasedType(selectionEvent) + `/${id}`, { observe: 'response' });
  }

  query(selectionEvent: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProject[]>(this.getUrlBasedType(selectionEvent), { params: options, observe: 'response' });
  }
}
