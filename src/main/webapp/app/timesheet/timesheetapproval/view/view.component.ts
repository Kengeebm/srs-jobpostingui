import { Component, OnInit } from '@angular/core';
import { TimeSheetApprovalService } from '../timesheetapprovalservice';
import { Account, AccountService } from 'app/core';
import { ITimeSheeetApproval } from '../timesheetapprovalmodel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'jhi-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  approveFlag = true;
  private timeSheetApproval: ITimeSheeetApproval;
  private currentAccount: Account;
  private timeSheetApprovals: ITimeSheeetApproval[] = [];
  private timeSheetApprovalsRequest: ITimeSheeetApproval[] = [];

  constructor(
    protected route: Router,
    private accountService: AccountService,
    private timeSheetApprovalService: TimeSheetApprovalService
  ) {}

  ngOnInit() {
    this.findByUser();
    this.findByManagerEmail();
  }

  findByUser() {
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.timeSheetApprovalService.findByUser(this.currentAccount.login).subscribe(res => {
          this.timeSheetApprovals = res.body;
        });
      }
    });
  }

  findByManagerEmail() {
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.timeSheetApprovalService.findByManager(this.currentAccount.email).subscribe(res => {
          this.timeSheetApprovalsRequest = res.body;
        });
      }
    });
  }

  save(approvals) {
    this.timeSheetApprovalService.create(approvals).subscribe(res => {
      Swal.fire('saved successfully');
      this.timeSheetApproval = res.body;
      this.findByUser();
      this.findByManagerEmail();
    });
  }

  openTimeSheet(approvalId) {
    this.route.navigate(['timesheet', { id: approvalId }]);
  }
}
