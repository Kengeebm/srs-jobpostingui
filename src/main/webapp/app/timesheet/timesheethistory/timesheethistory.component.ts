import { Component, OnInit, ViewChild } from '@angular/core';
import { ITimeSheetHistory } from 'app/shared/model/EIP/timesheethistory.model';
import { TimesheetService } from '../timesheet.service';
import { Account, AccountService } from 'app/core';
import { Router } from '@angular/router';
import { JhiAlertService } from 'ng-jhipster';
import { GlobalVariableService } from 'app/global-variable.service';
import { TIMESHEET, APPROVED, PRESENT, HOLIDAY, WORKFROMHOME, WORKFROMCLIENTLOCATION, COMPOFF } from 'app/app.constants';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ITimesheet } from 'app/shared/model/EIP/timesheet.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-timesheethistory',
  templateUrl: './timesheethistory.component.html',
  styleUrls: ['./timesheethistory.component.scss']
})
export class TimesheethistoryComponent implements OnInit {
  timeSheetHistory: ITimeSheetHistory[];
  private currentAccount: Account;
  present: any = PRESENT;
  holiday: any = HOLIDAY;
  wfh: any = WORKFROMHOME;
  wcl: any = WORKFROMCLIENTLOCATION;
  co: any = COMPOFF;
  displayedColumns: string[] = ['employeeId', 'userName', 'submitDate', 'approveStatus'];
  timeSheetApprovedDataSource: MatTableDataSource<ITimesheet>;
  timesheetDataApprovedList: ITimesheet[] = [];
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sort', { static: true }) sort: MatSort;
  dialogRef: any;
  public rowID;
  numRows: any;
  isLoading: boolean;

  constructor(
    protected timesheetService: TimesheetService,
    private accountService: AccountService,
    protected jhiAlertService: JhiAlertService,
    private router: Router,
    private globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
    public modalService: NgbModal
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.globalVariableService.setTitle(TIMESHEET);
    this.findByUser();
  }

  findByUser() {
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.timesheetService.findByEmailApproveStatus(this.currentAccount.email, APPROVED).subscribe(
          res => {
            this.timesheetDataApprovedList = res.body;
            this.timeSheetApprovedDataSource = new MatTableDataSource(this.timesheetDataApprovedList);
            this.timeSheetApprovedDataSource.paginator = this.paginator;
            this.timeSheetApprovedDataSource.sort = this.sort;
            this.numRows = this.timesheetDataApprovedList.length;
            this.isLoading = false;
          },
          error => (this.isLoading = false)
        );
      }
    });
  }

  applyFilter(filterValue: string) {
    this.timeSheetApprovedDataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(templateRef, row) {
    this.rowID = row['id'];
    this.dialogRef = this.modalService.open(templateRef);
  }

  onBackButtonEvent() {
    this.router.navigateByUrl('/timesheet');
  }
}
