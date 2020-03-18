import { IReportingManager, ReportingManager } from './../../core/user/reportingmanager.model';
import { SUCCESS, ERROR, PROJECT, REPORTING_MANAGER } from './../../app.constants';
import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { Config, IConfig } from 'app/shared/model/config.model';
import { ConfigService } from 'app/entities/jobPost/job/config.service';
import { EXPERIENCE, PUBLIC_HOLIDAYS } from 'app/app.constants';
import Swal from 'sweetalert2';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariableService } from 'app/global-variable.service';
import { IPublicHolidays, PublicHolidays } from 'app/leavemanagement/leave/publicHolidays.model';
import { PublicHolidaysService } from 'app/leavemanagement/leave/publicHolidays.service';
import { DatePipe } from '@angular/common';
import { IProject, Project } from 'app/leavemanagement/leave/project.model';
import { ProjectService } from 'app/leavemanagement/leave/project.service';
import { ReportingManagerService } from 'app/core/user/reportingmanager.service';

@Component({
  selector: 'jhi-data-config-mgmt',
  templateUrl: './data-config-management.component.html',
  styleUrls: ['./data-config-management.component.scss']
})
export class DataConfigMgmtComponent implements OnInit {
  currentAccount: any;
  error: any;
  success: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  reverse: any;
  selectionEvent: string;
  selectionList: IConfig[];
  selectionData: IConfig;
  selectionPublicHolidaysList: IPublicHolidays[];
  selectionPublicHolidaysData: IPublicHolidays;
  selectionProjectList: IProject[];
  selectionProjectData: IProject;
  selectionReportingManagerList: IReportingManager[];
  selectionReportingManagerData: IReportingManager;
  isShowAlertDelete: boolean;
  isShowAlertSave: boolean;
  links: { next: 1; last: 2; first: 0 };
  previousPage: any;
  routeData: any;

  constructor(
    private configService: ConfigService,
    protected jhiAlertService: JhiAlertService,
    protected parseLinks: JhiParseLinks,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private globalVariableService: GlobalVariableService,
    private publicHolidaysService: PublicHolidaysService,
    private datePipe: DatePipe,
    private projectService: ProjectService,
    private reportingManagerService: ReportingManagerService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit() {
    this.globalVariableService.setTitle('Configuration');
    this.selectionData = new Config();
    this.selectionEvent = EXPERIENCE;
    this.loadAll();
    this.projectService.findAll().subscribe(value => {
      this.selectionProjectList = value.body;
    });
  }

  private loadAll() {
    if (this.selectionEvent === REPORTING_MANAGER) {
      this.reportingManagerService.findAll().subscribe(value => {
        this.selectionReportingManagerList = value.body;
        this.reportingManagerService
          .query(this.selectionEvent, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IReportingManager[]>) => this.paginate(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      });
    } else if (this.selectionEvent === PROJECT) {
      this.projectService.findAll().subscribe(value => {
        this.selectionProjectList = value.body;
        this.projectService
          .query(this.selectionEvent, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IProject[]>) => this.paginate(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      });
    } else if (this.selectionEvent === PUBLIC_HOLIDAYS) {
      this.publicHolidaysService.findAll().subscribe(value => {
        this.selectionPublicHolidaysList = value.body;
        this.publicHolidaysService
          .query(this.selectionEvent, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IPublicHolidays[]>) => this.paginate(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      });
    } else {
      this.configService.findAll(this.selectionEvent).subscribe(value => {
        this.selectionList = value;
        this.configService
          .query(this.selectionEvent, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IConfig[]>) => this.paginateData(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      });
    }
  }

  protected paginate(data: IPublicHolidays[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.selectionPublicHolidaysList = data;
  }

  protected paginateData(data: IConfig[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.selectionList = data;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  selectionElement(value: string) {
    this.selectionData = new Config();
    this.selectionEvent = value;
    this.loadAll();
  }

  selectionSave() {
   if (this.selectionData !== null && this.selectionData.id == null) {
      this.configService.create(this.selectionData, this.selectionEvent).subscribe(value => {
        if (value.status === 200) {
          this.selectionData = new Config();
          this.loadAll();
          Swal.fire({ type: SUCCESS, title: 'Successfully saved', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        } else if (value.status === 208) {
          this.selectionData = new Config();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    } else {
      this.configService.update(this.selectionData, this.selectionEvent).subscribe(value => {
        if (value.status === 200) {
          this.selectionData = new Config();
          this.loadAll();
          Swal.fire({ type: SUCCESS, title: 'Data edited successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        } else if (value.status === 208) {
          this.selectionData = new Config();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
1        }
      });
    }
  }

  deleteItem(id: any) {
    this.isShowAlertDelete = false;
    this.configService.delete(id, this.selectionEvent).subscribe(value => {
      if (value.status === 200) {
        Swal.fire({ type: SUCCESS, title: 'Data deleted successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        this.loadAll();
      }
    });
  }

  editItem(id: any) {
    this.configService.find(id, this.selectionEvent).subscribe(value => {
      this.selectionData = value.body;
    });
  }

  selectionPublicHolidaysElement(value: string) {
    this.selectionPublicHolidaysData = new PublicHolidays();
    this.selectionEvent = value;
    this.loadAll();
  }

  selectionPublicHolidaysSave() {
     if (this.selectionPublicHolidaysData !== null && this.selectionPublicHolidaysData.id == null) {
      this.publicHolidaysService.create(this.selectionPublicHolidaysData).subscribe(value => {
        if (value.status === 200) {
          this.selectionPublicHolidaysData = new PublicHolidays();
          this.loadAll();
          Swal.fire({ type: SUCCESS, title: 'Successfully saved', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        } else if (value.status === 208) {
          this.selectionPublicHolidaysData = new PublicHolidays();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    } else {
      this.publicHolidaysService.update(this.selectionPublicHolidaysData).subscribe(value => {
        if (value.status === 200) {
          Swal.fire({ type: SUCCESS, title: 'Data edited successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
          this.selectionPublicHolidaysData = new PublicHolidays();
          this.loadAll();
        } else if (value.status === 208) {
          this.selectionPublicHolidaysData = new PublicHolidays();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    }
  }

  deletePublicHolidays(id: any) {
    this.isShowAlertDelete = false;
    this.publicHolidaysService.delete(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire({ type: SUCCESS, title: 'Data deleted successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        this.loadAll();
      }
    });
  }

  editPublicHolidays(id: string) {
    this.publicHolidaysService.findById(id, this.selectionEvent).subscribe(value => {
      this.selectionPublicHolidaysData = value.body;
    });
  }

  selectionProjectElement(value: string) {
    this.selectionProjectData = new Project();
    this.selectionEvent = value;
    this.loadAll();
  }

  selectionProjectSave() {
    if (this.selectionProjectData !== null && this.selectionProjectData.id == null) {
      this.projectService.create(this.selectionProjectData).subscribe(value => {
        if (value.status === 200) {
          this.selectionProjectData = new Project();
          this.loadAll();
          Swal.fire({ type: SUCCESS, title: 'Successfully saved', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        } else if (value.status === 208) {
          this.selectionProjectData = new Project();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    } else {
      this.projectService.update(this.selectionProjectData).subscribe(value => {
        if (value.status === 200) {
          Swal.fire({ type: SUCCESS, title: 'Data edited successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
          this.selectionProjectData = new Project();
          this.loadAll();
        } else if (value.status === 208) {
          this.selectionProjectData = new Project();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    }
  }

  deleteProject(id: any) {
    this.isShowAlertDelete = false;
    this.projectService.delete(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire({ type: SUCCESS, title: 'Data deleted successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        this.loadAll();
      }
    });
  }

  editProject(id: string) {
    this.projectService.findById(id, this.selectionEvent).subscribe(value => {
      this.selectionProjectData = value.body;
    });
  }

  selectionReportingManagerElement(value: string) {
    this.selectionReportingManagerData = new ReportingManager();
    this.selectionEvent = value;
    this.loadAll();
  }

  selectionReportingManagerSave() {
    if (this.selectionReportingManagerData !== null && this.selectionReportingManagerData.id == null) {
      this.reportingManagerService.create(this.selectionReportingManagerData).subscribe(value => {
        if (value.status === 200) {
          this.selectionReportingManagerData = new ReportingManager();
          this.loadAll();
          Swal.fire({ type: SUCCESS, title: 'Successfully saved', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        } else if (value.status === 208) {
          this.selectionReportingManagerData = new ReportingManager();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    } else {
      this.reportingManagerService.update(this.selectionReportingManagerData).subscribe(value => {
        if (value.status === 200) {
          Swal.fire({ type: SUCCESS, title: 'Data edited successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
          this.selectionReportingManagerData = new ReportingManager();
          this.loadAll();
        } else if (value.status === 208) {
          this.selectionReportingManagerData = new ReportingManager();
          Swal.fire({ type: ERROR, title: 'Data already exists', showConfirmButton: true, background: '#e6f2ff' });
        }
      });
    }
  }

  deleteReportingManager(id: any) {
    this.isShowAlertDelete = false;
    this.reportingManagerService.delete(id).subscribe(value => {
      if (value.status === 200) {
        Swal.fire({ type: SUCCESS, title: 'Data deleted successfully', showConfirmButton: false, background: '#e6f2ff', timer: 2000 });
        this.loadAll();
      }
    });
  }

  editReportingManager(id: string) {
    this.reportingManagerService.findById(id, this.selectionEvent).subscribe(value => {
      this.selectionReportingManagerData = value.body;
    });
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/admin/data-config-managemen'], {
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
      '/admin/data-config-managemen',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  trackId(index: number, item: IConfig) {
    return item.id;
  }
}
