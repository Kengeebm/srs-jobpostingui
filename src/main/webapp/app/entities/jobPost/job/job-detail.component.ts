import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from './job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IJob } from 'app/shared/model/jobPost/job.model';

@Component({
  selector: 'jhi-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: IJob;
  modalRef: any;
  dialogRef: any;
  candidates: any;
  candidateRow: any;

  constructor(protected activatedRoute: ActivatedRoute, protected jobservice: JobService, public modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
    });
    this.getCandidate();
  }

  getCandidate() {
    this.jobservice.searchCandidate(this.job.positionName).subscribe(res => {
      this.candidates = res;
      console.log('candidate ', this.candidates);
    });
  }

  previousState() {
    window.history.back();
  }

  selectRow(templateRef, row) {
    this.modalRef = this.modalService.open(templateRef, {
      size: 'lg',
      // modalClass: 'mymodal',
      // hideCloseButton: false,
      // centered: false, -defalut
      // backdrop: false,
      windowClass: 'modal',
      // animation: true,
      keyboard: false,
      // closeOnOutsideClick: true,
      backdropClass: 'modal-backdrop'
    });
    this.candidateRow = row;
    console.log(this.candidateRow);
    // this.modalRef = this.modalService.dismissAll();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
