import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { IJob } from 'app/shared/model/jobPost/job.model';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { JobService } from './job.service';
import { ConfigService } from 'app/entities/jobPost/job/config.service';
import { GlobalVariableService } from 'app/global-variable.service';
import { CLIENT_NAME, LOCATION, POSITION, JOBPOST_TITLE } from 'app/app.constants';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  currentAccount: any;
  jobs: IJob[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  clientNameList: any[];
  locationList: any[];
  positionList: any[];
  clientName: string;
  locationName: string;
  jobPositionName: string;
  closeResult: string;

  constructor(
    private configService: ConfigService,
    protected jobService: JobService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.jobService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IJob[]>) => this.paginateJobs(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/job'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/job',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.globalVariableService.setTitle(JOBPOST_TITLE);
    this.setClientNameList();
    this.setLocationList();
    this.setPositionList();
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInJobs();
  }

  setClientNameList() {
    this.configService.findAll(CLIENT_NAME).subscribe(value => {
      this.clientNameList = value;
    });
  }

  setLocationList() {
    this.configService.findAll(LOCATION).subscribe(value => {
      this.locationList = value;
    });
  }

  setPositionList() {
    this.configService.findAll(POSITION).subscribe(value => {
      this.positionList = value;
    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IJob) {
    return item.id;
  }

  registerChangeInJobs() {
    this.eventSubscriber = this.eventManager.subscribe('jobListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateJobs(data: IJob[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.jobs = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  sendResult() {}

  searchClientName() {
    if (this.clientName !== undefined && this.clientName !== '') {
      console.log('1client name: ' + this.clientName + ' location Name: ' + this.locationName + ' position name: ' + this.jobPositionName);
      this.jobService.findByClientName(this.clientName).subscribe(value => {
        this.jobs = value.body;
      });
    }
  }

  searchLocationName() {
    if (this.locationName !== undefined && this.locationName !== '') {
      console.log('2client name: ' + this.clientName + ' location Name: ' + this.locationName + ' position name: ' + this.jobPositionName);
      this.jobService.findByLocationName(this.locationName).subscribe(value => {
        this.jobs = value.body;
      });
    }
  }

  searchJobPositionName() {
    if (this.jobPositionName !== undefined && this.jobPositionName !== '') {
      console.log('3client name: ' + this.clientName + ' location Name: ' + this.locationName + ' position name: ' + this.jobPositionName);
      this.jobService.findByJobPositionName(this.jobPositionName).subscribe(value => {
        this.jobs = value.body;
      });
    }
  }

  clearLocationName() {
    this.locationName = '';
    this.loadAll();
  }

  clearClientName() {
    this.clientName = '';
    this.loadAll();
  }

  clearJobPositionName() {
    this.jobPositionName = '';
    this.loadAll();
  }

  prevPage() {
    this.router.navigate(['/welcome']);
  }
}
