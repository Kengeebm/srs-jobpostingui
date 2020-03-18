import { EipForm } from './../../shared/model/jobPost/eipform.model';
import { Router } from '@angular/router';
import { APPROVED } from './../../app.constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IUserDetailsLeave } from 'app/leavemanagement/leave/UserDetailsLeave.model';
import { UserDetailsLeaveService } from 'app/leavemanagement/leave/UserDetailsLeave.service';
import { GlobalVariableService } from 'app/global-variable.service';
import { LEAVE_TITLE } from 'app/app.constants';
import { AccountService } from 'app/core';
import { EipformService } from 'app/entities/jobPost/eipform/eipform.service';

@Component({
  selector: 'jhi-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrls: ['./leavehistory.component.scss']
})
export class LeavehistoryComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'leaveType', 'fromDate', 'toDate', 'totalDays', 'status', 'reasonForLeave'];
  leaveApprovedDataSource: MatTableDataSource<IUserDetailsLeave>;
  leaveApprovedDataList: IUserDetailsLeave[];
  eip: EipForm;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  noData: boolean;
  numRows: any;
  isLoading: boolean;

  constructor(
    private userDetailsLeaveService: UserDetailsLeaveService,
    private globalVariableService: GlobalVariableService,
    private accountService: AccountService,
    private eipFormService: EipformService,
    private route: Router
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.globalVariableService.setTitle(LEAVE_TITLE);
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.eipFormService.findByEmailId(value.body.email).subscribe(res => {
          this.userDetailsLeaveService.findByIdAndStatusLeaveList(res.body.empId, [APPROVED, 'Reject']).subscribe(
            value => {
              this.leaveApprovedDataList = value.body;
              this.leaveApprovedDataSource = new MatTableDataSource(this.leaveApprovedDataList);
              this.leaveApprovedDataSource.paginator = this.paginator;
              this.leaveApprovedDataSource.sort = this.sort;
              this.numRows = this.leaveApprovedDataSource.data.length;
              this.noData = this.leaveApprovedDataSource.data.length === 0 ? true : false;
              this.isLoading = false;
            },
            error => (this.isLoading = false)
          );
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.leaveApprovedDataSource.filter = filterValue.trim().toLowerCase();
    this.noData = this.leaveApprovedDataSource.filteredData.length === 0 ? true : false;
  }

  onBackButtonEvent() {
    this.route.navigateByUrl('/leave');
  }
}
