import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobHistory } from 'app/shared/model/jobPost/job-history.model';
import { JobHistoryService } from './job-history.service';
import { JobHistoryComponent } from './job-history.component';
import { JobHistoryDetailComponent } from './job-history-detail.component';
import { JobHistoryUpdateComponent } from './job-history-update.component';
import { JobHistoryDeletePopupComponent } from './job-history-delete-dialog.component';
import { IJobHistory } from 'app/shared/model/jobPost/job-history.model';

@Injectable({ providedIn: 'root' })
export class JobHistoryResolve implements Resolve<IJobHistory> {
  constructor(private service: JobHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJobHistory> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<JobHistory>) => response.ok),
        map((jobHistory: HttpResponse<JobHistory>) => jobHistory.body)
      );
    }
    return of(new JobHistory());
  }
}

export const jobHistoryRoute: Routes = [
  {
    path: '',
    component: JobHistoryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_RECRUITER', 'ROLE_SUPER_ADMIN'],
      defaultSort: 'id,asc',
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobHistoryDetailComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_RECRUITER', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobHistoryUpdateComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_RECRUITER', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobHistoryUpdateComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_RECRUITER', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const jobHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: JobHistoryDeletePopupComponent,
    resolve: {
      jobHistory: JobHistoryResolve
    },
    data: {
      authorities: ['ROLE_RECRUITER', 'ROLE_SUPER_ADMIN'],
      pageTitle: 'JobHistories'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
