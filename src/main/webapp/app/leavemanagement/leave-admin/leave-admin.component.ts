import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDatepicker,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from '@angular/material';
import Swal from 'sweetalert2';
import { GlobalVariableService } from 'app/global-variable.service';
import { LEAVE_ADMIN_TITLE, PENDING, WFH, APPROVED, SUCCESS, SELECT_ACTION, ERROR, SL, CL, WCL, CO } from 'app/app.constants';
import { IUserDetailsLeave, UserDetailsLeave } from 'app/leavemanagement/leave/UserDetailsLeave.model';
import { UserDetailsLeaveService } from 'app/leavemanagement/leave/UserDetailsLeave.service';
import { AccountService } from 'app/core';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
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
  selector: 'jhi-leave-admin',
  templateUrl: './leave-admin.component.html',
  styleUrls: ['./leave-admin.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class LeaveAdminComponent implements OnInit {
  date = new Date();
  displayedColumns: string[] = ['select', 'employeeId', 'empName', 'leaveType', 'fromDate', 'toDate', 'status', 'submitDate', 'submitTime'];
  displayedColumns1: string[] = [
    'employeeId',
    'empName',
    'leaveType',
    'fromDate',
    'toDate',
    'status',
    'approvedBy',
    'approvedDate',
    'approvedTime'
  ];
  leaveWFHApprovedDataSource: MatTableDataSource<IUserDetailsLeave>;
  leaveWFHPendingDataSource: MatTableDataSource<IUserDetailsLeave>;
  leaveRejectedDataSource: MatTableDataSource<IUserDetailsLeave>;
  leavePendingDataSource: MatTableDataSource<IUserDetailsLeave>;
  leaveApprovedDataSource: MatTableDataSource<IUserDetailsLeave>;
  WCLCOPendingDataSource: MatTableDataSource<IUserDetailsLeave>;
  WCLCOApprovedDataSource: MatTableDataSource<IUserDetailsLeave>;
  selection = new SelectionModel<IUserDetailsLeave>(true, []);
  selectedOption: any;
  successTitle: any;
  successMessage: any;
  successText: any;
  errorText: any;
  submitTitle: any;
  leaveWFHPendingList: IUserDetailsLeave[];
  leaveWFHApprovedList: IUserDetailsLeave[];
  leaveRejectedList: IUserDetailsLeave[];
  leavePendingList: IUserDetailsLeave[];
  leaveApprovedList: IUserDetailsLeave[];
  WCLCOPendingList: IUserDetailsLeave[];
  WCLCOApprovedList: IUserDetailsLeave[];
  currentAccount: any;
  WFHPendingDataNotExist: boolean;
  leavePendingDataNotExist: boolean;
  WCLCOPendingDataNotExist: boolean;
  rejectedDataNotExist: boolean;
  selectedData: any;
  numRows: any;
  currentAccountName: string;
  noData: boolean;
  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;
  @ViewChild('sort3', { static: true }) sort3: MatSort;
  @ViewChild('paginator4', { static: true }) paginator4: MatPaginator;
  @ViewChild('sort4', { static: true }) sort4: MatSort;
  @ViewChild('paginator5', { static: true }) paginator5: MatPaginator;
  @ViewChild('sort5', { static: true }) sort5: MatSort;
  @ViewChild('paginator6', { static: true }) paginator6: MatPaginator;
  @ViewChild('sort6', { static: true }) sort6: MatSort;
  @ViewChild('paginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  startDateWFHApproved: string;
  startDateLeaveApproved: string;
  startDateWCLCOApproved: string;
  startDateRejected: string;

  chosenMonthHandlerWFHApproved(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateWFHApproved = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilterWFHApproved(this.startDateWFHApproved);
  }
  chosenMonthHandlerLeaveApproved(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateLeaveApproved = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilterLeaveApproved(this.startDateLeaveApproved);
  }
  chosenMonthHandlerWCLCOApproved(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateWCLCOApproved = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilterWCLCOApproved(this.startDateWCLCOApproved);
  }
  chosenMonthHandlerRejected(value: string, datepicker: MatDatepicker<Moment>) {
    this.startDateRejected = moment(value).format('YYYY-MM');
    datepicker.close();
    this.applyFilterRejected(this.startDateRejected);
  }

  constructor(
    private globalVariableService: GlobalVariableService,
    private userDetailsLeaveService: UserDetailsLeaveService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.selection.changed.subscribe(item => {
      this.WFHPendingDataNotExist = this.selection.selected.length === 0;
      this.leavePendingDataNotExist = this.selection.selected.length === 0;
      this.WCLCOPendingDataNotExist = this.selection.selected.length === 0;
      this.rejectedDataNotExist = this.selection.selected.length === 0;
    });
  }

  ngOnInit() {
    this.WFHPendingDataNotExist = true;
    this.leavePendingDataNotExist = true;
    this.WCLCOPendingDataNotExist = true;
    this.rejectedDataNotExist = true;
    this.globalVariableService.setTitle(LEAVE_ADMIN_TITLE);
    this.selectedData = 'WFH Submitted List';
    this.findAll();
  }

  tabChanged(event) {
    this.selection.clear();
    this.selectedData = event.tab.textLabel;
    if (this.selectedData === 'WFH Approved List') {
      this.startDateWFHApproved = moment(this.date).format('YYYY-MM');
    } else if (this.selectedData === 'Leave Approved List') {
      this.startDateLeaveApproved = moment(this.date).format('YYYY-MM');
    } else if (this.selectedData === 'WCL/CO Approved List') {
      this.startDateWCLCOApproved = moment(this.date).format('YYYY-MM');
    } else if (this.selectedData === 'Rejected List') {
      this.startDateRejected = moment(this.date).format('YYYY-MM');
    }
    this.findAll();
  }

  findAll() {
    if (this.selectedData === 'WFH Submitted List') {
      this.userDetailsLeaveService
        .findListByLeaveTypesAndStatus([WFH], [PENDING])
        .toPromise()
        .then(value => {
          this.leaveWFHPendingList = value.body;
          this.leaveWFHPendingDataSource = new MatTableDataSource(this.leaveWFHPendingList);
          this.leaveWFHPendingDataSource.paginator = this.paginator1;
          this.leaveWFHPendingDataSource.sort = this.sort1;
          this.noData = this.leaveWFHPendingDataSource.data.length === 0 ? true : false;
          this.numRows = this.leaveWFHPendingDataSource.data.length;
        });
    } else if (this.selectedData === 'WFH Approved List') {
      this.userDetailsLeaveService
        .findListByLeaveTypesAndStatus([WFH], [APPROVED])
        .toPromise()
        .then(value => {
          this.leaveWFHApprovedList = value.body;
          this.leaveWFHApprovedDataSource = new MatTableDataSource(this.leaveWFHApprovedList);
          this.applyFilterWFHApproved(this.startDateWFHApproved);
          this.leaveWFHApprovedDataSource.paginator = this.paginator2;
          this.leaveWFHApprovedDataSource.sort = this.sort2;
          this.noData = this.leaveWFHApprovedDataSource.filteredData.length === 0 ? true : false;
        });
    } else if (this.selectedData === 'Leave Submitted List') {
      this.userDetailsLeaveService
        .findListByLeaveTypesAndStatus([SL, CL], [PENDING])
        .toPromise()
        .then(value => {
          this.leavePendingList = value.body;
          this.leavePendingDataSource = new MatTableDataSource(this.leavePendingList);
          this.leavePendingDataSource.paginator = this.paginator3;
          this.leavePendingDataSource.sort = this.sort3;
          this.noData = this.leavePendingDataSource.data.length === 0 ? true : false;
          this.numRows = this.leavePendingDataSource.data.length;
        });
    } else if (this.selectedData === 'Leave Approved List') {
      this.userDetailsLeaveService
        .findListByLeaveTypesAndStatus([SL, CL], [APPROVED])
        .toPromise()
        .then(value => {
          this.leaveApprovedList = value.body;
          this.leaveApprovedDataSource = new MatTableDataSource(this.leaveApprovedList);
          this.applyFilterLeaveApproved(this.startDateLeaveApproved);
          this.leaveApprovedDataSource.paginator = this.paginator4;
          this.leaveApprovedDataSource.sort = this.sort4;
          this.noData = this.leaveApprovedDataSource.filteredData.length === 0 ? true : false;
        });
    } else if (this.selectedData === 'WCL/CO Submitted List') {
      this.userDetailsLeaveService
        .findListByLeaveTypesAndStatus([WCL, CO], [PENDING])
        .toPromise()
        .then(value => {
          this.WCLCOPendingList = value.body;
          this.WCLCOPendingDataSource = new MatTableDataSource(this.WCLCOPendingList);
          this.WCLCOPendingDataSource.paginator = this.paginator5;
          this.WCLCOPendingDataSource.sort = this.sort5;
          this.noData = this.WCLCOPendingDataSource.data.length === 0 ? true : false;
          this.numRows = this.WCLCOPendingDataSource.data.length;
        });
    } else if (this.selectedData === 'WCL/CO Approved List') {
      this.userDetailsLeaveService
        .findListByLeaveTypesAndStatus([WCL, CO], [APPROVED])
        .toPromise()
        .then(value => {
          this.WCLCOApprovedList = value.body;
          this.WCLCOApprovedDataSource = new MatTableDataSource(this.WCLCOApprovedList);
          this.applyFilterWCLCOApproved(this.startDateWCLCOApproved);
          this.WCLCOApprovedDataSource.paginator = this.paginator6;
          this.WCLCOApprovedDataSource.sort = this.sort6;
          this.noData = this.WCLCOApprovedDataSource.filteredData.length === 0 ? true : false;
        });
    } else if (this.selectedData === 'Rejected List') {
      this.userDetailsLeaveService
        .findRejectedLeaveList('Reject')
        .toPromise()
        .then(value => {
          this.leaveRejectedList = value.body;
          this.leaveRejectedDataSource = new MatTableDataSource(this.leaveRejectedList);
          this.applyFilterRejected(this.startDateRejected);
          this.leaveRejectedDataSource.paginator = this.paginator7;
          this.leaveRejectedDataSource.sort = this.sort7;
          this.noData = this.leaveRejectedDataSource.filteredData.length === 0 ? true : false;
        });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.numRows;
  }

  masterToggleWFHPending() {
    this.isAllSelected() ? this.selection.clear() : this.leaveWFHPendingDataSource.data.forEach(row => this.selection.select(row));
  }

  masterToggleLeavePending() {
    this.isAllSelected() ? this.selection.clear() : this.leavePendingDataSource.data.forEach(row => this.selection.select(row));
  }

  masterToggleWCLCOPending() {
    this.isAllSelected() ? this.selection.clear() : this.WCLCOPendingDataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: UserDetailsLeave): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeId + 1}`;
  }

  private getLoginName() {
    this.accountService.fetch().subscribe(value => {
      this.currentAccountName = value.body.login;
    });
  }

  submitWFH() {
    if (this.selectedOption === null || this.selectedOption === undefined) {
      Swal.fire({ type: ERROR, title: SELECT_ACTION, showConfirmButton: true, background: '#e6f2ff' });
    } else {
      this.getLoginName();
      this.swalalertswfh();
    }
  }

  swalalertswfh() {
    if (this.selectedOption === 'Approved') {
      this.submitTitle = 'Do you want to approve the WFH request ?';
      this.successTitle = 'Approved';
      this.successText = 'WFH request is approved !';
      this.successMessage = 'Success';
      this.errorText = 'WFH details are not approved';
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
          width: '42em'
        })
        .then(result => {
          if (result.value) {
            swalWithBootstrapButtons.fire({
              title: this.successText,
              showConfirmButton: false,
              type: SUCCESS,
              background: '#e6f2ff',
              timer: 2000
            });

            for (const value of Object.values(this.selection.selected)) {
              value.approvedBy = this.currentAccountName;
              value.approvedDate = moment().format('YYYY-MM-DD');
              value.approvedTime = moment().format('HH:mm a');
            }
            this.userDetailsLeaveService.updateAllLeaveEmployeeListByStatus(this.selectedOption, this.selection.selected).subscribe(res => {
              this.userDetailsLeaveService.sendApprovedMailToEmployee(res.body).subscribe(res => {
                this.findAll();
                this.selection.clear();
              });
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        });
    } else {
      this.submitTitle = 'Do you want to reject the WFH request ?';
      this.successTitle = 'Rejected';
      this.successText = 'WFH request has been rejected';
      this.successMessage = 'Success';
      this.errorText = 'Rejected WFH details are not sent';

      (async () => {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputPlaceholder:
            'Enter the reason for rejection...\nClick on Reject to reject the WFH \nClick on Cancel to go back to the previous screen',
          confirmButtonColor: '#f5365c',
          confirmButtonText: 'Reject',
          showCancelButton: true,
          inputValidator: text => {
            if (!text) {
              return 'You need to mention reason!';
            } else if (text.length < 10) {
              return 'This field cannot be less than 10 characters!';
            }
          },
          inputAttributes: {
            maxlength: '250',
            resize: 'none'
          }
        });
        if (text) {
          Swal.fire({
            title: this.successText,
            showConfirmButton: false,
            type: SUCCESS,
            background: '#e6f2ff',
            timer: 2000
          });
          for (const value of Object.values(this.selection.selected)) {
            value.reasonForReject = text;
            value.approvedBy = this.currentAccountName;
            value.approvedDate = moment().format('YYYY-MM-DD');
            value.approvedTime = moment().format('HH:mm a');
          }
          this.userDetailsLeaveService.updateAllLeaveEmployeeListByStatus(this.selectedOption, this.selection.selected).subscribe(res => {
            this.userDetailsLeaveService.sendApprovedMailToEmployee(res.body).subscribe(res => {
              this.findAll();
              this.selection.clear();
            });
          });
        }
      })();
    }
  }

  submitleave() {
    if (this.selectedOption === null || this.selectedOption === undefined) {
      Swal.fire({ type: ERROR, title: SELECT_ACTION, showConfirmButton: true, background: '#e6f2ff' });
    } else {
      this.getLoginName();
      this.swalalertleave();
    }
  }

  swalalertleave() {
    if (this.selectedOption === 'Approved') {
      this.submitTitle = 'Do you want to approve the leave request ?';
      this.successTitle = 'Approved';
      this.successText = 'Leave request is approved !';
      this.successMessage = 'Success';
      this.errorText = 'Leave Details are not approved';

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
          width: '42em'
        })
        .then(result => {
          if (result.value) {
            for (const value of Object.values(this.selection.selected)) {
              value.approvedBy = this.currentAccountName;
              value.approvedDate = moment().format('YYYY-MM-DD');
              value.approvedTime = moment().format('HH:mm a');
            }
            this.userDetailsLeaveService.updateAllLeaveEmployeeListByStatus(this.selectedOption, this.selection.selected).subscribe(res => {
              this.userDetailsLeaveService.sendApprovedMailToEmployee(res.body).subscribe(res => {
                this.findAll();
                this.selection.clear();
              });
            });
            swalWithBootstrapButtons.fire({
              title: this.successText,
              showConfirmButton: false,
              type: SUCCESS,
              background: '#e6f2ff',
              timer: 2000
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        });
    } else {
      this.submitTitle = 'Do you want to reject the leave request ?';
      this.successTitle = 'Rejected';
      this.successText = 'Leave request has been rejected';
      this.successMessage = 'Success';
      this.errorText = 'Rejected leave details are not sent';
      (async () => {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputPlaceholder:
            'Enter the reason for rejection...\nClick on Reject to reject the leave \nClick on Cancel to go back to the previous screen',
          confirmButtonColor: '#f5365c',
          confirmButtonText: 'Reject',
          showCancelButton: true,
          inputValidator: text => {
            if (!text) {
              return 'You need to mention reason!';
            } else if (text.length < 10) {
              return 'This field cannot be less than 10 characters!';
            }
          },
          inputAttributes: {
            maxlength: '250',
            resize: 'none'
          }
        });
        if (text) {
          Swal.fire({
            title: this.successText,
            showConfirmButton: false,
            type: SUCCESS,
            background: '#e6f2ff',
            timer: 2000
          });
          for (const value of Object.values(this.selection.selected)) {
            value.reasonForReject = text;
            value.approvedBy = this.currentAccountName;
            value.approvedDate = moment().format('YYYY-MM-DD');
            value.approvedTime = moment().format('HH:mm a');
          }
          this.userDetailsLeaveService.updateAllLeaveEmployeeListByStatus(this.selectedOption, this.selection.selected).subscribe(res => {
            this.userDetailsLeaveService.sendApprovedMailToEmployee(res.body).subscribe(res => {
              this.findAll();
              this.selection.clear();
            });
          });
        }
      })();
    }
  }

  submitWCLCO() {
    if (this.selectedOption === null || this.selectedOption === undefined) {
      Swal.fire({ type: ERROR, title: SELECT_ACTION, showConfirmButton: true, background: '#e6f2ff' });
    } else {
      this.getLoginName();
      this.swalalertWCLCO();
    }
  }

  swalalertWCLCO() {
    if (this.selectedOption === 'Approved') {
      this.submitTitle = 'Do you want to approve the WCL/CO request ?';
      this.successTitle = 'Approved';
      this.successText = 'WCL/CO request is approved !';
      this.successMessage = 'Success';
      this.errorText = 'WCL/CO Details are not approved';

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
          width: '45em'
        })
        .then(result => {
          if (result.value) {
            for (const value of Object.values(this.selection.selected)) {
              value.approvedBy = this.currentAccountName;
              value.approvedDate = moment().format('YYYY-MM-DD');
              value.approvedTime = moment().format('HH:mm a');
            }
            this.userDetailsLeaveService.updateAllLeaveEmployeeListByStatus(this.selectedOption, this.selection.selected).subscribe(res => {
              this.userDetailsLeaveService.sendApprovedMailToEmployee(res.body).subscribe(res => {
                this.findAll();
                this.selection.clear();
              });
            });
            swalWithBootstrapButtons.fire({
              title: this.successText,
              showConfirmButton: false,
              type: SUCCESS,
              background: '#e6f2ff',
              timer: 2000
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        });
    } else {
      this.submitTitle = 'Do you want to reject the WCL/CO request ?';
      this.successTitle = 'Rejected';
      this.successText = 'WCL/CO request has been rejected';
      this.successMessage = 'Success';
      this.errorText = 'Rejected WCL/CO details are not sent';
      (async () => {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputPlaceholder:
            'Enter the reason for rejection...\nClick on Reject to reject the WCL/CO \nClick on Cancel to go back to the previous screen',
          confirmButtonColor: '#f5365c',
          confirmButtonText: 'Reject',
          showCancelButton: true,
          inputValidator: text => {
            if (!text) {
              return 'You need to mention reason!';
            } else if (text.length < 10) {
              return 'This field cannot be less than 10 characters!';
            }
          },
          inputAttributes: {
            maxlength: '250',
            resize: 'none'
          }
        });
        if (text) {
          Swal.fire({
            title: this.successText,
            showConfirmButton: false,
            type: SUCCESS,
            background: '#e6f2ff',
            timer: 2000
          });
          for (const value of Object.values(this.selection.selected)) {
            value.reasonForReject = text;
            value.approvedBy = this.currentAccountName;
            value.approvedDate = moment().format('YYYY-MM-DD');
            value.approvedTime = moment().format('HH:mm a');
          }
          this.userDetailsLeaveService.updateAllLeaveEmployeeListByStatus(this.selectedOption, this.selection.selected).subscribe(res => {
            this.userDetailsLeaveService.sendApprovedMailToEmployee(res.body).subscribe(res => {
              this.findAll();
              this.selection.clear();
            });
          });
        }
      })();
    }
  }

  applyFilterWFHApproved(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.leaveWFHApprovedDataSource.filter = b.trim().toLowerCase();
    this.numRows = this.leaveWFHApprovedDataSource.filteredData.length;
    this.noData = this.leaveWFHApprovedDataSource.filteredData.length === 0 ? true : false;
    this.leaveWFHApprovedDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.fromDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }

  applyFilterLeaveApproved(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.leaveApprovedDataSource.filter = b.trim().toLowerCase();
    this.numRows = this.leaveApprovedDataSource.filteredData.length;
    this.noData = this.leaveApprovedDataSource.filteredData.length === 0 ? true : false;
    this.leaveApprovedDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.fromDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }

  applyFilterWCLCOApproved(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.WCLCOApprovedDataSource.filter = b.trim().toLowerCase();
    this.numRows = this.WCLCOApprovedDataSource.filteredData.length;
    this.noData = this.WCLCOApprovedDataSource.filteredData.length === 0 ? true : false;
    this.WCLCOApprovedDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.fromDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }

  applyFilterRejected(filterValue: string) {
    const b = moment(filterValue).format('YYYY-MM');
    this.leaveRejectedDataSource.filter = b.trim().toLowerCase();
    this.numRows = this.leaveRejectedDataSource.filteredData.length;
    this.noData = this.leaveRejectedDataSource.filteredData.length === 0 ? true : false;
    this.leaveRejectedDataSource.filterPredicate = function(data, filter: string): boolean {
      const a = data.fromDate;
      const formatted = moment(a).format('YYYY-MM');
      return formatted.indexOf(filter) >= 0;
    };
  }

  nameByFilterWFHPending(filterValue: string) {
    this.leaveWFHPendingDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.leaveWFHPendingDataSource.filteredData.length;
    this.noData = this.leaveWFHPendingDataSource.filteredData.length === 0 ? true : false;
    this.leaveWFHPendingDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }

  nameByFilterLeavePending(filterValue: string) {
    this.leavePendingDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.leavePendingDataSource.filteredData.length;
    this.noData = this.leavePendingDataSource.filteredData.length === 0 ? true : false;
    this.leavePendingDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }

  nameByFilterWCLCOPending(filterValue: string) {
    this.WCLCOPendingDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.WCLCOPendingDataSource.filteredData.length;
    this.noData = this.WCLCOPendingDataSource.filteredData.length === 0 ? true : false;
    this.WCLCOPendingDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterWFHApprovedList(filterValue: string) {
    this.leaveWFHApprovedDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.leaveWFHApprovedDataSource.filteredData.length;
    this.noData = this.leaveWFHApprovedDataSource.filteredData.length === 0 ? true : false;
    this.leaveWFHApprovedDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterLeaveApprovedList(filterValue: string) {
    this.leaveApprovedDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.leaveApprovedDataSource.filteredData.length;
    this.noData = this.leaveApprovedDataSource.filteredData.length === 0 ? true : false;
    this.leaveApprovedDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterWLCApprovedList(filterValue: string) {
    this.WCLCOApprovedDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.WCLCOApprovedDataSource.filteredData.length;
    this.noData = this.WCLCOApprovedDataSource.filteredData.length === 0 ? true : false;
    this.WCLCOApprovedDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }
  nameByFilterRejectedList(filterValue: string) {
    this.leaveRejectedDataSource.filter = filterValue.trim().toLowerCase();
    this.numRows = this.leaveRejectedDataSource.filteredData.length;
    this.noData = this.leaveRejectedDataSource.filteredData.length === 0 ? true : false;
    this.leaveRejectedDataSource.filterPredicate = (data: { empName: string }, filterValue: string) =>
      data.empName
        .trim()
        .toLowerCase()
        .indexOf(filterValue) !== -1;
  }

  onBackButtonEvent() {
    this.router.navigateByUrl('/welcome');
  }
}
