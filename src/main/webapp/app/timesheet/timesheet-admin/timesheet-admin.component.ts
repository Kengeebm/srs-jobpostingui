import { SUCCESS, ERROR, SELECT_ACTION, PRESENT, HOLIDAY, CL, SL, WFH, WCL, CO } from './../../app.constants';
import { IUnfreezedList } from './../../shared/model/EIP/unfreezedlist.model';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { GlobalVariableService } from 'app/global-variable.service';
import { APPROVED, EMAIL_SENT_EMPLOYEE_MAIL, PENDING, TIMESHEET_ADMIN } from 'app/app.constants';
import { TimesheetService } from '../timesheet.service';
import Swal from 'sweetalert2';
import { ITimesheet, Timesheet } from 'app/shared/model/EIP/timesheet.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment, Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { AccountService } from 'app/core/auth/account.service';
import { IEForm, EipForm } from 'app/shared/model/jobPost/eipform.model';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM'
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jhi-timesheet-admin',
  templateUrl: './timesheet-admin.component.html',
  styleUrls: ['./timesheet-admin.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class TimesheetAdminComponent implements OnInit {
  date = new Date();
  displayedColumns: string[] = ['select', 'employeeId', 'userName', 'submitDate', 'submitTime', 'approveStatus'];
  displayedColumns1: string[] = ['select', 'empId', 'firstName'];
  displayedColumns2: string[] = [
    'employeeId',
    'userName',
    'submitDate',
    'submitTime',
    'approveStatus',
    'approvedBy',
    'approvedDate',
    'approvedTime'
  ];
  displayedColumns3: string[] = ['employeeId', 'userName', 'submitDate', 'submitTime'];
  timeSheetSubmittedDataSource: MatTableDataSource<ITimesheet>;
  timeSheetSubmittedDownloadAllData: ITimesheet[];
  arr: ITimesheet[];
  excelName: any;
  timeSheetPendingDataSource: MatTableDataSource<IEForm>;
  timeSheetApprovedDataSource: MatTableDataSource<ITimesheet>;
  timeSheetUnfreezeDataSource: MatTableDataSource<IUnfreezedList>;
  selection = new SelectionModel<ITimesheet>(true, []);
  selectionIE = new SelectionModel<IEForm>(true, []);
  selectedOption: any;
  successTitle: any;
  successMessage: any;
  successText: any;
  errorText: any;
  submitTitle: any;
  timesheetDataSubmittedList: ITimesheet[] = [];
  timesheetDataPendingList: IEForm[] = [];
  timesheetDataApprovedList: ITimesheet[] = [];
  timesheetDataUnfreezeList: IUnfreezedList[] = [];
  numRows: any;
  totalNoRows: any;
  pendingTimesheetData: any;
  selectedData: any;
  dataNotExist: boolean;
  PendingDataNotExist: boolean;
  approvedDataNotExist: boolean;
  submittedListCount: any;
  pendingListCount: any;
  approvedListCount: any;
  noData: boolean;
  data1: any;
  data2: any;
  newArray: any;
  newHeader: any;
  headerRow: any;
  header1: any;
  header2: any;
  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;
  @ViewChild('paginator4', { static: true }) paginator4: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  @ViewChild('sort3', { static: true }) sort3: MatSort;
  @ViewChild('sort4', { static: true }) sort4: MatSort;

  startDateSubmitted: string;
  startDatePending: string;
  startDateApproved: string;
  startDateUnfreezed: string;
  currentAccountName: string;

  chosenMonthHandlerSubmitted(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateSubmitted = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilter1(this.startDateSubmitted);
  }
  chosenMonthHandlerPending(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDatePending = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilter2(this.startDatePending);
  }
  chosenMonthHandlerApproved(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateApproved = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilter3(this.startDateApproved);
  }
  chosenMonthHandlerUnfreezed(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateUnfreezed = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilter4(this.startDateUnfreezed);
  }

  constructor(
    private globalVariableService: GlobalVariableService,
    private timesheetService: TimesheetService,
    private router: Router,
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.selection.changed.subscribe(item => {
      this.dataNotExist = this.selection.selected.length === 0 || this.startDateSubmitted === '' || this.startDateSubmitted === undefined;
      this.approvedDataNotExist = this.selection.selected.length === 0;
    });
    this.selectionIE.changed.subscribe(item => {
      this.PendingDataNotExist = this.selectionIE.selected.length === 0;
    });
  }
  ngOnInit() {
    this.selectedData = 'Submitted List';
    this.findAll();
    this.startDateSubmitted = moment(this.date).format('YYYY-MM');
    this.dataNotExist = true;
    this.PendingDataNotExist = true;
    this.approvedDataNotExist = true;
    this.globalVariableService.setTitle(TIMESHEET_ADMIN);
  }
  tabChanged(event) {
    this.selection.clear();
    this.selectedData = event.tab.textLabel;
    if (this.selectedData === 'Submitted List') {
      this.startDateSubmitted = moment(this.date).format('YYYY-MM');
    } else if (this.selectedData === 'Pending List') {
      this.startDatePending = moment(this.date).format('YYYY-MM');
    } else if (this.selectedData === 'Approved List') {
      this.startDateApproved = moment(this.date).format('YYYY-MM');
    } else if (this.selectedData === 'Unfreeze List') {
      this.startDateUnfreezed = moment(this.date).format('YYYY-MM');
    }
    this.findAll();
  }

  findAll() {
    if (this.selectedData === 'Submitted List') {
      this.timesheetService.findTimeSheetStatus(PENDING).subscribe(res => {
        this.timesheetDataSubmittedList = res.body;
        this.timeSheetSubmittedDataSource = new MatTableDataSource(this.timesheetDataSubmittedList);
        this.applyFilter1(this.startDateSubmitted);
        this.timeSheetSubmittedDataSource.paginator = this.paginator1;
        this.timeSheetSubmittedDataSource.sort = this.sort1;
        this.noData = this.timeSheetSubmittedDataSource.filteredData.length === 0 ? true : false;
      });
    } else if (this.selectedData === 'Pending List') {
      this.timesheetService.findNotSubmittedEmployeeList().subscribe(res => {
        this.timesheetDataPendingList = res.body;
        this.timeSheetPendingDataSource = new MatTableDataSource(this.timesheetDataPendingList);
        this.timeSheetPendingDataSource.paginator = this.paginator2;
        this.timeSheetPendingDataSource.sort = this.sort2;
        this.noData = this.timeSheetPendingDataSource.filteredData.length === 0 ? true : false;
      });
    } else if (this.selectedData === 'Approved List') {
      this.timesheetService.findTimeSheetStatus(APPROVED).subscribe(res => {
        this.timesheetDataApprovedList = res.body;
        this.timeSheetApprovedDataSource = new MatTableDataSource(this.timesheetDataApprovedList);
        this.applyFilter3(this.startDateApproved);
        this.timeSheetApprovedDataSource.paginator = this.paginator3;
        this.timeSheetApprovedDataSource.sort = this.sort3;
        this.noData = this.timeSheetApprovedDataSource.filteredData.length === 0 ? true : false;
      });
    } else if (this.selectedData === 'Unfreeze List') {
      this.timesheetService.findAllUnfreezedList().subscribe(res => {
        this.timesheetDataUnfreezeList = res.body;
        this.timeSheetUnfreezeDataSource = new MatTableDataSource(this.timesheetDataUnfreezeList);
        this.applyFilter4(this.startDateUnfreezed);
        this.timeSheetUnfreezeDataSource.paginator = this.paginator4;
        this.timeSheetUnfreezeDataSource.sort = this.sort4;
        this.noData = this.timeSheetUnfreezeDataSource.filteredData.length === 0 ? true : false;
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.numRows;
  }
  isAllSelectedIe() {
    const numSelectedIe = this.selectionIE.selected.length;
    return numSelectedIe === this.numRows;
  }

  masterToggle1() {
    this.timeSheetSubmittedDataSource.paginator = this.paginator1;
    const skip = this.paginator1.pageSize * this.paginator1.pageIndex;
    const paged = this.timeSheetSubmittedDataSource.filteredData.filter((u, i) => i >= skip).filter((u, i) => i < this.paginator1.pageSize);
    this.numRows = paged.length;
    this.timeSheetSubmittedDataSource.filteredData = paged;
    this.isAllSelected()
      ? this.selection.clear()
      : this.timeSheetSubmittedDataSource.filteredData.forEach(row => this.selection.select(row));
  }

  masterToggle2() {
    this.timeSheetPendingDataSource.paginator = this.paginator2;
    const skip = this.paginator2.pageSize * this.paginator2.pageIndex;
    const paged = this.timeSheetPendingDataSource.filteredData.filter((u, i) => i >= skip).filter((u, i) => i < this.paginator2.pageSize);
    this.numRows = paged.length;
    this.timeSheetPendingDataSource.filteredData = paged;
    this.isAllSelectedIe()
      ? this.selectionIE.clear()
      : this.timeSheetPendingDataSource.filteredData.forEach(row => this.selectionIE.select(row));
  }

  checkboxLabel(row?: Timesheet): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  checkboxLabelIe(row?: EipForm): string {
    if (!row) {
      return `${this.isAllSelectedIe() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionIE.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  submit() {
    if (this.selectedOption === null || this.selectedOption === undefined) {
      Swal.fire({ type: ERROR, title: SELECT_ACTION, showConfirmButton: true, background: '#e6f2ff' });
    } else {
      this.swalalerts();
      this.getLoginName();
    }
  }
  private getLoginName() {
    this.accountService.fetch().subscribe(value => {
      this.currentAccountName = value.body.login;
    });
  }
  swalalerts() {
    if (this.selectedOption === 'Approved') {
      this.submitTitle = 'Do you want to approve this timesheet details ?';
      this.successTitle = 'Approved';
      this.successText = 'Timesheet details has been approved.';
      this.successMessage = 'success';
      this.errorText = 'Timesheet Details are not approved';
    } else if (this.selectedOption === 'pending') {
      this.submitTitle = 'Do you want to submit pending timesheet details';
      this.successTitle = 'Pending';
      this.successText = 'Pending timesheet details has been sent.';
      this.successMessage = 'success';
      this.errorText = 'Pending timesheet details are not sent';
    } else if (this.selectedOption === 'Rejected') {
      this.submitTitle = 'Do you want to reject this timesheet details ?';
      this.successTitle = 'Rejected';
      this.successText = 'Timesheet details has been rejected';
      this.successMessage = 'success';
      this.errorText = 'Rejected timesheet details are not sent';
    } else {
      this.submitTitle = 'Do you want to unfreeze this timesheet ?';
      this.successTitle = 'Unfreezed';
      this.successText = 'Timesheet details has been unfreezed';
      this.successMessage = 'success';
      this.errorText = 'Unfreeze timesheet details are not sent';
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: this.submitTitle,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        background: '#e6f2ff',
        width: '46em'
      })
      .then(result => {
        if (result.value) {
          for (const value of Object.values(this.selection.selected)) {
            value.approvedBy = this.currentAccountName;
            value.approvedDate = moment();
            value.approvedTime = moment().format('HH:mm a');
          }
          this.timesheetService.updateTimesheetApprovedStatus(this.successTitle, this.selection.selected).subscribe(res => {
            this.selection.clear();
            this.findAll();
          });
          swalWithBootstrapButtons.fire({
            width: '37em',
            title: this.successText,
            showConfirmButton: false,
            type: this.successMessage,
            background: '#e6f2ff',
            timer: 2000
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }

  applyFilter1(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.timeSheetSubmittedDataSource.filter = b.trim().toLowerCase();
    this.totalNoRows = this.timeSheetSubmittedDataSource.filteredData.length;
    this.noData = this.timeSheetSubmittedDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetSubmittedDownloadAllData = this.timeSheetSubmittedDataSource.filteredData;
    this.timeSheetSubmittedDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.submitDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }

  applyFilter2(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.timeSheetPendingDataSource.filter = b.trim().toLowerCase();
    this.totalNoRows = this.timeSheetPendingDataSource.filteredData.length;
    this.noData = this.timeSheetPendingDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetPendingDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.empId;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }
  applyFilter3(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.timeSheetApprovedDataSource.filter = b.trim().toLowerCase();
    this.totalNoRows = this.timeSheetApprovedDataSource.filteredData.length;
    this.noData = this.timeSheetApprovedDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetApprovedDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.submitDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }

  applyFilter4(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.timeSheetUnfreezeDataSource.filter = b.trim().toLowerCase();
    this.totalNoRows = this.timeSheetUnfreezeDataSource.filteredData.length;
    this.noData = this.timeSheetUnfreezeDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetUnfreezeDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.submitDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }
  sendMail() {
    this.timesheetService.sendRemainderMailToEmployee(this.selectionIE.selected).subscribe(res => {
      Swal.fire({
        width: '33em',
        type: SUCCESS,
        title: EMAIL_SENT_EMPLOYEE_MAIL,
        showConfirmButton: false,
        background: '#e6f2ff',
        timer: 2000
      });
    });
    this.findAll();
    this.selectionIE.clear();
  }

  onBackButtonEvent() {
    this.router.navigateByUrl('/welcome');
  }

  download() {
    this.timesheetService.downloadAllEmployeeExcel(this.selection.selected).subscribe(res => {
      saveAs(res, 'employees_time_sheet.xlsx');
    });
    this.selection.clear();
  }

  generateExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Timesheet data');
    const arr = this.selection.selected;
    this.header1 = [
      'Id',
      'UserName',
      'EmailId',
      'Save Date',
      'Submit Date',
      'No. of Working Days',
      'No. of WFH',
      'No. of WCL',
      'No. of CO',
      'No. of Leaves'
    ];
    const rowHeader = arr[0];

    for (let j = 0; j < 1; j++) {
      for (let i = 0; i < rowHeader.timeSheetDateStatusList.length; i++) {
        this.header2 = [`${rowHeader.timeSheetDateStatusList[i].date}`];
        this.header1.push(this.header2);
        this.newHeader = Array.prototype.concat.apply([], this.header1);
        worksheet.getColumn(i + 6).width = 11;
      }
      this.headerRow = worksheet.addRow(this.newHeader);
    }

    for (const value of Object.values(arr)) {
      this.data1 = [
        [
          `${value.employeeId}`,
          `${value.userName}`,
          `${value.emailId}`,
          `${value.saveDate}`,
          `${value.submitDate}`,
          `${value.noWorkingDays}`,
          `${value.noWorkFromHome}`,
          `${value.noWorkFromClientLocation}`,
          `${value.noCompOff}`,
          `${value.noLeaves}`
        ]
      ];
      for (let i = 0; i < value.timeSheetDateStatusList.length; i++) {
        this.data2 = [`${value.timeSheetDateStatusList[i].status}`];
        if (value.timeSheetDateStatusList[i].status === PRESENT) {
          this.data1.push('P');
        } else if (value.timeSheetDateStatusList[i].status === HOLIDAY) {
          this.data1.push('H');
        } else if (value.timeSheetDateStatusList[i].status === CL) {
          this.data1.push('CL');
        } else if (value.timeSheetDateStatusList[i].status === SL) {
          this.data1.push('SL');
        } else if (value.timeSheetDateStatusList[i].status === WFH) {
          this.data1.push('WFH');
        } else if (value.timeSheetDateStatusList[i].status === WCL) {
          this.data1.push('WCL');
        } else if (value.timeSheetDateStatusList[i].status === CO) {
          this.data1.push('CO');
        }
        this.newArray = Array.prototype.concat.apply([], this.data1);
      }
      worksheet.addRows([this.newArray]);
    }

    for (let c = 1; c <= 10; c++) {
      this.headerRow.getCell(c).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FDFD0B' }
      };
      this.headerRow.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    }

    for (let d = 11; d <= this.header1.length; d++) {
      this.headerRow.getCell(d).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'A1F1FA' }
      };
      this.headerRow.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    }

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 11;
    worksheet.getColumn(5).width = 14;
    worksheet.getColumn(6).width = 17;
    worksheet.getColumn(7).width = 12;
    worksheet.getColumn(8).width = 12;

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'TimesheetDetails.xlsx');
    });
    this.selection.clear();
  }

  downloadAll() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Timesheet data');
    if (this.selectedData === 'Submitted List') {
      this.arr = this.timeSheetSubmittedDownloadAllData;
      this.excelName = 'AllSubmittedTimesheetDetails.xlsx';
    } else if (this.selectedData === 'Approved List') {
      this.arr = this.timeSheetApprovedDataSource.filteredData;
      this.excelName = 'AllApprovedTimesheetDetails.xlsx';
    }
    this.header1 = [
      'Id',
      'UserName',
      'EmailId',
      'Save Date',
      'Submit Date',
      'No. of Working Days',
      'No. of WFH',
      'No. of WCL',
      'No. of CO',
      'No. of Leaves'
    ];
    const rowHeader = this.arr[0];

    for (let j = 0; j < 1; j++) {
      for (let i = 0; i < rowHeader.timeSheetDateStatusList.length; i++) {
        this.header2 = [`${rowHeader.timeSheetDateStatusList[i].date}`];
        this.header1.push(this.header2);
        this.newHeader = Array.prototype.concat.apply([], this.header1);
        worksheet.getColumn(i + 6).width = 11;
      }
      this.headerRow = worksheet.addRow(this.newHeader);
    }

    for (const value of Object.values(this.arr)) {
      this.data1 = [
        [
          `${value.employeeId}`,
          `${value.userName}`,
          `${value.emailId}`,
          `${value.saveDate}`,
          `${value.submitDate}`,
          `${value.noWorkingDays}`,
          `${value.noWorkFromHome}`,
          `${value.noWorkFromClientLocation}`,
          `${value.noCompOff}`,
          `${value.noLeaves}`
        ]
      ];
      for (let i = 0; i < value.timeSheetDateStatusList.length; i++) {
        this.data2 = [`${value.timeSheetDateStatusList[i].status}`];
        if (value.timeSheetDateStatusList[i].status === PRESENT) {
          this.data1.push('P');
        } else if (value.timeSheetDateStatusList[i].status === HOLIDAY) {
          this.data1.push('H');
        } else if (value.timeSheetDateStatusList[i].status === CL) {
          this.data1.push('CL');
        } else if (value.timeSheetDateStatusList[i].status === SL) {
          this.data1.push('SL');
        } else if (value.timeSheetDateStatusList[i].status === WFH) {
          this.data1.push('WFH');
        } else if (value.timeSheetDateStatusList[i].status === WCL) {
          this.data1.push('WCL');
        } else if (value.timeSheetDateStatusList[i].status === CO) {
          this.data1.push('CO');
        }
        this.newArray = Array.prototype.concat.apply([], this.data1);
      }
      worksheet.addRows([this.newArray]);
    }
    for (let c = 1; c <= 10; c++) {
      this.headerRow.getCell(c).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FDFD0B' }
      };
      this.headerRow.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    }

    for (let d = 11; d <= this.header1.length; d++) {
      this.headerRow.getCell(d).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'A1F1FA' }
      };
      this.headerRow.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    }

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 11;
    worksheet.getColumn(5).width = 14;
    worksheet.getColumn(6).width = 17;
    worksheet.getColumn(7).width = 12;
    worksheet.getColumn(8).width = 12;

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.excelName);
    });
    this.selection.clear();
  }

  nameByFilterPendingList(filterValue: string) {
    this.timeSheetPendingDataSource.filter = filterValue.trim().toLowerCase();
    this.noData = this.timeSheetSubmittedDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetPendingDataSource.filterPredicate = (data: { login: string }, filterValue: string) =>
      data.login
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterSubmittedList(filterValue: string) {
    this.timeSheetSubmittedDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.timeSheetSubmittedDataSource.filteredData.length;
    this.noData = this.timeSheetSubmittedDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetSubmittedDataSource.filterPredicate = (data: { userName: string }, filterValue: string) =>
      data.userName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterPendingLists(filterValue: string) {
    this.timeSheetPendingDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.timeSheetPendingDataSource.filteredData.length;
    this.noData = this.timeSheetPendingDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetPendingDataSource.filterPredicate = (data: { firstName: string }, filterValue: string) =>
      data.firstName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterApprovedLists(filterValue: string) {
    this.timeSheetApprovedDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.timeSheetApprovedDataSource.filteredData.length;
    this.noData = this.timeSheetApprovedDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetApprovedDataSource.filterPredicate = (data: { userName: string }, filterValue: string) =>
      data.userName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterUnfreezedList(filterValue: string) {
    this.timeSheetUnfreezeDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.timeSheetUnfreezeDataSource.filteredData.length;
    this.noData = this.timeSheetUnfreezeDataSource.filteredData.length === 0 ? true : false;
    this.timeSheetUnfreezeDataSource.filterPredicate = (data: { userName: string }, filterValue: string) =>
      data.userName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
}
