import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IJob, Job } from 'app/shared/model/jobPost/job.model';
import { JobService } from './job.service';
import { User } from '../../../core/user/user.model';
import { UserService } from '../../../core/user/user.service';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { IConfig } from 'app/shared/model/config.model';
import { ConfigService } from 'app/entities/jobPost/job/config.service';
import { CLIENT_NAME, EXPERIENCE, LOCATION, NUMBER_JOB, POSITION, USER_NAME, ROLE_RECRUITER } from 'app/app.constants';

@Component({
  selector: 'jhi-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss']
})
export class JobUpdateComponent implements OnInit {
  isSaving: boolean;
  startDateDp: any;
  endDateDp: any;
  closedOnDp: any;
  page: any;
  itemsPerPage: any;
  predicate: any;
  links: any;
  users: any;
  totalItems: any;
  reverse: any;
  authourities: String[];
  login: String[];
  authorities: String[] = ['Recruiter', 'Recruiter_Manager', 'User', 'Admin', 'ROLE_RECRUITER'];

  JobNumberList: any[];
  locationList: any[];
  experenceRequiredList: IConfig[];
  userList: any[];
  positionList: any[];
  clientNameList: any[];
  content = '';
  keycode: any;

  editForm = this.fb.group({
    id: [],
    jobId: [],
    clientName: [null, [Validators.required]],
    noOfPosition: [],
    positionName: [null, [Validators.required]],
    location: [null, [Validators.required]],
    jobDesc: [null, [Validators.required, Validators.maxLength(1000)]],
    fromExp: [],
    toExp: [],
    filledPosition: [],
    comments: [],
    startDate: [],
    endDate: [],
    closedOn: [],
    openedBy: [],
    closedBy: [],
    assignee: []
  });
  modalService: any;
  dataChange: any;
  closeResult: string;

  constructor(
    protected jobService: JobService,
    protected configService: ConfigService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private parseLinks: JhiParseLinks,
    private alertService: JhiAlertService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.setJobList();
    this.setLocationList();
    this.setUserList();
    this.setexperenceRequiredList();
    this.setPositionList();
    this.setClientNameList();

    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);
    });
    this.loadAll();
  }

  setPositionList() {
    console.log('data is:');
    this.configService.findAll(POSITION).subscribe(value => {
      this.positionList = value;
      console.log('data is:' + value);
    });
  }

  setJobList() {
    console.log('data is:');
    this.configService.findAll(NUMBER_JOB).subscribe(value => {
      this.JobNumberList = value;
      console.log('data is:' + value);
    });
  }

  setClientNameList() {
    console.log('data is:');
    this.configService.findAll(CLIENT_NAME).subscribe(value => {
      this.clientNameList = value;
      console.log('data is:' + value);
    });
  }

  setLocationList() {
    console.log('data is:');
    this.configService.findAll(LOCATION).subscribe(value => {
      this.locationList = value;
      console.log('data is:' + value);
    });
  }

  setUserList() {
    console.log('data is:');
    this.configService.findAll(USER_NAME).subscribe(value => {
      this.userList = value;
      console.log('data is:' + value);
    });
  }

  setexperenceRequiredList() {
    console.log('data is:');
    this.configService.findAll(EXPERIENCE).subscribe(value => {
      this.experenceRequiredList = value;
      console.log('data is:' + value);
    });
  }

  updateForm(job: IJob) {
    this.editForm.patchValue({
      id: job.id,
      jobId: job.jobId,
      clientName: job.clientName,
      noOfPosition: job.noOfPosition,
      positionName: job.positionName,
      location: job.location,
      jobDesc: job.jobDesc,
      fromExp: job.fromExp,
      toExp: job.toExp,
      filledPosition: job.filledPosition,
      comments: job.comments,
      startDate: job.startDate,
      endDate: job.endDate,
      closedOn: job.closedOn,
      openedBy: job.openedBy,
      closedBy: job.closedBy,
      assignee: job.assignee
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJob {
    return {
      ...new Job(),
      id: this.editForm.get(['id']).value,
      jobId: this.editForm.get(['jobId']).value,
      clientName: this.editForm.get(['clientName']).value,
      noOfPosition: this.editForm.get(['noOfPosition']).value,
      positionName: this.editForm.get(['positionName']).value,
      location: this.editForm.get(['location']).value,
      jobDesc: this.editForm.get(['jobDesc']).value,
      fromExp: this.editForm.get(['fromExp']).value,
      toExp: this.editForm.get(['toExp']).value,
      filledPosition: this.editForm.get(['filledPosition']).value,
      comments: this.editForm.get(['comments']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      closedOn: this.editForm.get(['closedOn']).value,
      openedBy: this.editForm.get(['openedBy']).value,
      closedBy: this.editForm.get(['closedBy']).value,
      assignee: this.editForm.get(['assignee']).value
    };
  }
  prevPage() {
    this.router.navigate(['./job']);
    this.modalService.dismissAll();
  }

  open(content) {
    if (this.dataChange) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    } else {
      this.prevPage();
    }
  }
  getDismissReason(reason: any) {
    throw new Error("Method not implemented.");
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJob>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  loadAll() {
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers), (res: HttpResponse<any>) => this.onError(res.body));
  }

  loadForRole() {
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < this.users[i].authorities.length; j++) {
        if (this.users[i].authorities[j] === ROLE_RECRUITER) {
        }
      }
    }
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.users = data;
    this.loadForRole();
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }

  addBulletText(event) {
    this.keycode = event.keyCode ? event.keyCode : event.which;
    // tslint:disable-next-line: triple-equals
    if (this.keycode == '13') {
      this.content += '. ';
    }
    console.log('sdfsd', this.content);

    // tslint:disable-next-line: triple-equals
    if (this.content.substr(this.content.length - 1) == '\n') {
      this.content = this.content.substring(0, this.content.length - 1);
    }
  }

  mytextOnFocus() {
    this.content += '. ';
  }
}
