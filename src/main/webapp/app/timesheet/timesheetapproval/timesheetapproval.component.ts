import { Component, OnInit } from '@angular/core';
import { ITimeSheeetApproval, TimeSheetApproval } from './timesheetapprovalmodel';
import { TimeSheetApprovalService } from './timesheetapprovalservice';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalVariableService } from 'app/global-variable.service';
import { Moment } from 'moment';
import moment = require('moment');
@Component({
  selector: 'jhi-timesheetapproval',
  templateUrl: './timesheetapproval.component.html',
  styleUrls: ['./timesheetapproval.component.scss']
})
export class TimesheetapprovalComponent implements OnInit {
  private timeSheetApproval: ITimeSheeetApproval;

  constructor(
    private timeSheetApprovalService: TimeSheetApprovalService,
    private router: Router,
    private globalVariableService: GlobalVariableService
  ) {}

  ngOnInit() {
    this.timeSheetApproval = new TimeSheetApproval();
    this.globalVariableService.setTitle('Timesheet Management');
  }

  // save() {
  //   this.timeSheetApprovalService.create(this.timeSheetApproval).subscribe(value => {});
  // }

  save() {
    this.timeSheetApprovalService.create(this.timeSheetApproval).subscribe(value => {
      if (value.body) {
        this.timeSheetApproval = value.body;
        if (this.timeSheetApproval.id !== undefined || this.timeSheetApproval.id !== null) {
          Swal.fire({
            html: '<h1>' + 'Request Raise Succesfully' + '</h1>'
          });
          this.router.navigate(['/timesheet']);
        } else {
          Swal.fire({
            html: '<h1>' + 'Error Occured Please Try Again' + '</h1>'
          });
        }
      }
    });
  }
}
