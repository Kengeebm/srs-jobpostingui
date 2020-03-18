import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet.service';
import { PENDING, APPROVED, DASHBOARD, REJECTED, REJECT, SL, CL, WFH, WCL, CO } from 'app/app.constants';
import { Router } from '@angular/router';
import { GlobalVariableService } from 'app/global-variable.service';
import { UserDetailsLeaveService } from 'app/leavemanagement/leave/UserDetailsLeave.service';
import { AccountService } from 'app/core/auth/account.service';
import { ITimesheet } from 'app/shared/model/EIP/timesheet.model';
@Component({
  selector: 'jhi-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  private timeSheetPendingCount: number;
  private timeSheetApprovedCount: number;
  private timeSheetRejectedCount: number;

  private SLSubmittedCount: number;
  private SLApprovedCount: number;
  private SLRejectedCount: number;

  private CLSubmittedCount: number;
  private CLApprovedCount: number;
  private CLRejectedCount: number;

  private WFHSubmittedCount: number;
  private WFHApprovedCount: number;
  private WFHRejectedCount: number;

  private WCLSubmittedCount: number;
  private WCLApprovedCount: number;
  private WCLRejectedCount: number;

  private COSubmittedCount: number;
  private COApprovedCount: number;
  private CORejectedCount: number;

  private statusList: string[] = [PENDING, APPROVED, REJECTED];
  private leaveStatusList: string[] = [PENDING, APPROVED, REJECT];

  constructor(
    private timesheetService: TimesheetService,
    private router: Router,
    private globalVariableService: GlobalVariableService,
    private userDetailsLeaveService: UserDetailsLeaveService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.globalVariableService.setTitle(DASHBOARD);
    this.getTimesheetPendingCount();
    this.getTimesheetApprovedCount();
    this.getTimesheetRejectedCount();
    this.getLeaveStatusPendingCount(SL, PENDING);
    this.getLeaveStatusApprovedCount(SL, APPROVED);
    this.getLeaveStatusRejectedCount(SL, REJECT);

    this.getCLPendingCount(CL, PENDING);
    this.getCLApprovedCount(CL, APPROVED);
    this.getCLRejectedCount(CL, REJECT);

    this.getWFHPendingCount(WFH, PENDING);
    this.getWFHApprovedCount(WFH, APPROVED);
    this.getWFHRejectedCount(WFH, REJECT);

    this.getWCLPendingCount(WCL, PENDING);
    this.getWCLApprovedCount(WCL, APPROVED);
    this.getWCLRejectedCount(WCL, REJECT);

    this.getCOPendingCount(CO, PENDING);
    this.getCOApprovedCount(CO, APPROVED);
    this.getCORejectedCount(CO, REJECT);
  }

  private getTimesheetPendingCount() {
    this.timesheetService
      .getTotalStatusCount('Pending')
      .toPromise()
      .then(value => {
        this.timeSheetPendingCount = value.body;
      });
  }
  private getTimesheetApprovedCount() {
    this.timesheetService
      .getTotalStatusCount('Approved')
      .toPromise()
      .then(value => {
        this.timeSheetApprovedCount = value.body;
      });
  }

  private getTimesheetRejectedCount() {
    this.timesheetService
      .getTotalStatusCount('Rejected')
      .toPromise()
      .then(value => {
        this.timeSheetRejectedCount = value.body;
      });
  }

  private getLeaveStatusPendingCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.SLSubmittedCount = value.body;
      });
  }

  private getLeaveStatusApprovedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.SLApprovedCount = value.body;
      });
  }

  private getLeaveStatusRejectedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.SLRejectedCount = value.body;
      });
  }

  private getCLPendingCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.CLSubmittedCount = value.body;
      });
  }

  private getCLApprovedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.CLApprovedCount = value.body;
      });
  }

  private getCLRejectedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.CLRejectedCount = value.body;
      });
  }

  // WFH

  private getWFHPendingCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.WFHSubmittedCount = value.body;
      });
  }

  private getWFHApprovedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.WFHApprovedCount = value.body;
      });
  }

  private getWFHRejectedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.WFHRejectedCount = value.body;
      });
  }

  private getWCLPendingCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.WCLSubmittedCount = value.body;
      });
  }

  private getWCLApprovedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.WCLApprovedCount = value.body;
      });
  }

  private getWCLRejectedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.WCLRejectedCount = value.body;
      });
  }

  private getCOPendingCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.COSubmittedCount = value.body;
      });
  }

  private getCOApprovedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.COApprovedCount = value.body;
      });
  }

  private getCORejectedCount(type: string, statusList: string) {
    this.userDetailsLeaveService
      .findTotalLeaveStatusCount(type, statusList)
      .toPromise()
      .then(value => {
        this.CORejectedCount = value.body;
      });
  }
  onBackButtonEvent() {
    this.router.navigateByUrl('/welcome');
  }
}
