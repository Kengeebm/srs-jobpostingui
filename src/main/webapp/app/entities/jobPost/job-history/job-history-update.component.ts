import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IJobHistory, JobHistory } from 'app/shared/model/jobPost/job-history.model';
import { JobHistoryService } from './job-history.service';

@Component({
  selector: 'jhi-job-history-update',
  templateUrl: './job-history-update.component.html'
})
export class JobHistoryUpdateComponent implements OnInit {
  isSaving: boolean;
  startDateDp: any;
  endDateDp: any;
  closedOnDp: any;
  updatedDateDp: any;

  editForm = this.fb.group({
    id: [],
    jobId: [],
    clientName: [null, [Validators.required]],
    noOfPosition: [],
    positionName: [null, [Validators.required]],
    location: [null, [Validators.required]],
    jobDesc: [null, [Validators.required, Validators.maxLength(1000)]],
    expReq: [],
    filledPosition: [],
    comments: [],
    startDate: [],
    endDate: [],
    closedOn: [],
    openedBy: [],
    closedBy: [],
    updatedBy: [],
    updatedDate: []
  });

  constructor(protected jobHistoryService: JobHistoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.updateForm(jobHistory);
    });
  }

  updateForm(jobHistory: IJobHistory) {
    this.editForm.patchValue({
      id: jobHistory.id,
      jobId: jobHistory.jobId,
      clientName: jobHistory.clientName,
      noOfPosition: jobHistory.noOfPosition,
      positionName: jobHistory.positionName,
      location: jobHistory.location,
      jobDesc: jobHistory.jobDesc,
      expReq: jobHistory.expReq,
      filledPosition: jobHistory.filledPosition,
      comments: jobHistory.comments,
      startDate: jobHistory.startDate,
      endDate: jobHistory.endDate,
      closedOn: jobHistory.closedOn,
      openedBy: jobHistory.openedBy,
      closedBy: jobHistory.closedBy,
      updatedBy: jobHistory.updatedBy,
      updatedDate: jobHistory.updatedDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistory {
    return {
      ...new JobHistory(),
      id: this.editForm.get(['id']).value,
      jobId: this.editForm.get(['jobId']).value,
      clientName: this.editForm.get(['clientName']).value,
      noOfPosition: this.editForm.get(['noOfPosition']).value,
      positionName: this.editForm.get(['positionName']).value,
      location: this.editForm.get(['location']).value,
      jobDesc: this.editForm.get(['jobDesc']).value,
      expReq: this.editForm.get(['expReq']).value,
      filledPosition: this.editForm.get(['filledPosition']).value,
      comments: this.editForm.get(['comments']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      closedOn: this.editForm.get(['closedOn']).value,
      openedBy: this.editForm.get(['openedBy']).value,
      closedBy: this.editForm.get(['closedBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      updatedDate: this.editForm.get(['updatedDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistory>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
