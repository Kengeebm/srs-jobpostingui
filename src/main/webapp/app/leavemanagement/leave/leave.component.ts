import { APPROVED } from './../../app.constants';
import { NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUserDetailsLeave, UserDetailsLeave } from 'app/leavemanagement/leave/UserDetailsLeave.model';
import { UserDetailsLeaveService } from 'app/leavemanagement/leave/UserDetailsLeave.service';
import { Account, AccountService } from 'app/core';
import { EipformService } from 'app/entities/jobPost/eipform/eipform.service';
import { EipForm } from 'app/shared/model/jobPost/eipform.model';
import { IPublicHolidays } from 'app/leavemanagement/leave/publicHolidays.model';
import { PublicHolidaysService } from 'app/leavemanagement/leave/publicHolidays.service';
import { UserleaveService } from 'app/leavemanagement/leave/userleave.service';
import { GlobalVariableService } from 'app/global-variable.service';
import { DatePipe } from '@angular/common';
import {
  ALREADY_HOLIDAY_CANT_APPLY_LEAVE,
  CANCEL_LEAVE,
  CANCELATION_REQUEST_SENT,
  DATE_FORMAT_YYYY_MM_DD,
  DD_MM_YY,
  LEAVE_PAGE,
  LEAVE_TITLE,
  PENDING,
  SUCCESS,
  UNABLE_SENT_CANCELATION_REQUESTION_HR,
  DATE_ALERT_MSG,
  LEAVE_ALREADY_APPLIED,
  CO
} from 'app/app.constants';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConfig } from 'app/shared/model/config.model';
import Swal from 'sweetalert2';
import { Moment } from 'moment';
import { IUserDetailHistoryModel, UserDetailHistoryModel } from 'app/home/user-detail-history.model';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';
import moment = require('moment');

@Component({
  selector: 'jhi-timesheet',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  obj: any[] = [];
  userDetailsLeave: IUserDetailsLeave;
  currentAccount: Account;
  eip: EipForm;
  leaveTypes: IConfig[] = [];
  private isEmpIdAvailable: boolean;
  publicHolidays: IPublicHolidays[];
  closeResult: string;
  dataChange: boolean;
  start: any;
  dataSource: IUserDetailsLeave[];
  isLeaveTypeDataAvailable: boolean;
  isFromDateAvailable: boolean;
  isToDateAvailable: boolean;
  officialHoliday: any;
  weekOff: any;
  projectCodeDetail: string;

  @ViewChild('fromDateId', { static: true })
  private fromDateId: ElementRef;
  private userDetailHistoryModel: IUserDetailHistoryModel;
  private leavesCount: number;
  private weekEndCount: number;
  private selectedLeaveType: boolean;
  noData: boolean;
  leaveData: IUserDetailsLeave[];

  constructor(
    private userDetailsLeaveService: UserDetailsLeaveService,
    private accountService: AccountService,
    private eipformService: EipformService,
    private publicHolidaysService: PublicHolidaysService,
    private userleaveService: UserleaveService,
    private globalVariableService: GlobalVariableService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private userdetailhistoryService: UserdetailhistoryService
  ) {
    this.userDetailsLeave = new UserDetailsLeave();
    this.userAccountDetails();
    this.getLeaveType();
  }

  ngOnInit() {
    this.saveUserDetailHistory(null, null);
    this.isLeaveTypeDataAvailable = false;
    this.isFromDateAvailable = false;
    this.isToDateAvailable = false;
    this.dataChange = false;
    this.globalVariableService.setTitle(LEAVE_TITLE);
    this.isEmpIdAvailable = false;
    this.selectedLeaveType = false;
  }

  private userAccountDetails() {
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.eipformService.findByEmailId(this.currentAccount.email).subscribe(res => {
          if (res.body) {
            this.eip = res.body;
            this.accountService.setEmployeeDetails(this.eip);
            this.getLeaveHistory();
            this.projectCodeDetail = this.eip.projectCode;
            this.userDetailsLeave.employeeId = this.eip.empId;
            this.userDetailsLeave.empName = this.eip.firstName + ' ' + this.eip.lastName;
            this.userDetailsLeave.reportingManagerEmail = this.currentAccount.reportingManagerEmail;
            this.userDetailsLeave.notificationTo = this.currentAccount.notificationTo;
            this.getPublicHolidays();
            if (this.eip.empId !== null && this.eip.empId !== '') {
              this.isEmpIdAvailable = true;
            } else {
              this.isEmpIdAvailable = false;
            }
          }
        });
      }
    });
  }

  private getLeaveType() {
    this.userDetailsLeaveService.findLeaveType().subscribe(value => {
      this.leaveTypes = value.body;
    });
  }
  private getPublicHolidays() {
    this.publicHolidaysService.findAllByProjectCode(this.projectCodeDetail).subscribe(value => {
      this.publicHolidays = value.body;
    });
  }
  private getLeaveHistory() {
    this.userDetailsLeaveService.findByIdAndStatusLeaveList(this.accountService.getEmployeeDetails().empId, [PENDING]).subscribe(value => {
      this.dataSource = value.body;
      this.noData = this.dataSource.length === 0 ? true : false;
    });
    this.userDetailsLeaveService
      .findByIdAndStatusLeaveList(this.accountService.getEmployeeDetails().empId, [PENDING, APPROVED])
      .subscribe(value => {
        this.leaveData = value.body;
      });
  }

  dateValidate(fromDate: boolean) {
    if (
      this.userDetailsLeave.fromDate !== null &&
      this.userDetailsLeave.toDate !== null &&
      this.userDetailsLeave.fromDate !== undefined &&
      this.userDetailsLeave.toDate !== undefined
    ) {
      if (moment(this.userDetailsLeave.fromDate).isAfter(this.userDetailsLeave.toDate)) {
        Swal.fire({
          showConfirmButton: true,
          background: '#e6f2ff',
          position: 'center',
          width: '38em',
          title: DATE_ALERT_MSG
        });
        if (fromDate) {
          this.userDetailsLeave.fromDate = null;
        } else {
          this.userDetailsLeave.toDate = null;
        }
        this.isFromDate();
        this.isToDate();
        this.userDetailsLeave.totalDays = null;
      } else {
        this.excludeHolidayFromTotalCount();
      }
    }
  }

  getDateArray = function(start, end) {
    const arr = [];
    let dt = moment(start);
    const en = moment(end);
    while (dt <= en) {
      arr.push(moment(dt).format(DATE_FORMAT_YYYY_MM_DD));
      dt = moment(dt).add(1, 'days');
    }
    return arr;
  };

  onSubmit(form: NgForm) {
    let j, l, k;
    const startDate = this.userDetailsLeave.fromDate;
    const endDate = this.userDetailsLeave.toDate;
    const totalDays = this.getDateArray(startDate, endDate);
    const reportingManagerEmail = this.userDetailsLeave.reportingManagerEmail;
    let isAlreadyApplied = false;
    outerloop: for (j = 0; j < this.leaveData.length; j++) {
      const startDay = this.leaveData[j].fromDate;
      const endDay = this.leaveData[j].toDate;
      const days = this.getDateArray(startDay, endDay);

      for (k = 0; k < days.length; k++) {
        for (l = 0; l < totalDays.length; l++) {
          if (days[k] === totalDays[l]) {
            isAlreadyApplied = true;
            Swal.fire({
              showConfirmButton: true,
              background: '#e6f2ff',
              width: '38em',
              title: LEAVE_ALREADY_APPLIED + ' ' + days[k]
            });
            break outerloop;
          }
        }
      }
    }

    if (!isAlreadyApplied) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons
        .fire({
          title: 'Do you want to proceed with' + ' ' + this.userDetailsLeave.leaveType + ' ' + 'application ?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          background: '#e6f2ff'
        })
        .then(result => {
          if (result.value) {
            this.userDetailsLeave.status = PENDING;
            this.userDetailsLeave.submitDate = moment().format('YYYY-MM-DD');
            this.userDetailsLeave.submitTime = moment().format('HH:mm a');
            this.userDetailsLeave.empMail = this.currentAccount.email;
            this.userDetailsLeaveService.create(this.userDetailsLeave).subscribe(value => {
              this.saveUserDetailHistory(JSON.stringify(this.userDetailsLeave), 'leave submit');
              this.getLeaveHistory();
            });
            Swal.fire({
              type: SUCCESS,
              background: '#e6f2ff',
              showConfirmButton: false,
              title: this.userDetailsLeave.leaveType + ' ' + 'application sent for approval',
              timer: 2000
            });
            form.form.markAsPristine();
            form.resetForm();
            form.setValue({ employeeId: this.eip.empId, leaveType: '', fromdate: null, todate: null, days: '', reasonForLeave: '' });
            this.dataChange = false;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        });
    }
  }

  reset(form: NgForm) {
    this.dataChange = false;
    this.isLeaveTypeDataAvailable = false;
    this.isFromDateAvailable = false;
    this.isToDateAvailable = false;
    form.form.markAsPristine();
    form.resetForm();
    form.setValue({ employeeId: this.eip.empId, leaveType: '', fromdate: null, todate: null, days: '', reasonForLeave: '' });
  }

  prevPage() {
    this.router.navigate(['/welcome']);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changes() {
    this.dataChange = true;
    if (this.userDetailsLeave.leaveType === CO) {
      this.selectedLeaveType = true;
    } else {
      this.selectedLeaveType = false;
    }
    if (
      this.userDetailsLeave.leaveType !== null &&
      this.userDetailsLeave.leaveType !== '' &&
      this.userDetailsLeave.leaveType !== undefined
    ) {
      this.isLeaveTypeDataAvailable = true;
    }
  }

  isWeekend(date: Moment, fromDate: boolean) {
    this.dataChange = true;
    let i;
    for (i = 0; i < this.publicHolidays.length; i++) {
      if (this.datePipe.transform(date, DD_MM_YY) === this.datePipe.transform(this.publicHolidays[i].date, DD_MM_YY)) {
        if (fromDate) {
          this.userDetailsLeave.fromDate = null;
        } else {
          this.userDetailsLeave.toDate = null;
        }
        Swal.fire({
          showConfirmButton: true,
          background: '#e6f2ff',
          title: ALREADY_HOLIDAY_CANT_APPLY_LEAVE
        });
        return;
      }
    }

    if (moment(date).day() === 6 || moment(date).day() === 0) {
      this.weekOff = this.weekOff + 1;
      if (fromDate) {
        this.userDetailsLeave.fromDate = null;
      } else {
        this.userDetailsLeave.toDate = null;
      }
      this.isFromDate();
      Swal.fire({
        showConfirmButton: true,
        background: '#e6f2ff',
        title: ALREADY_HOLIDAY_CANT_APPLY_LEAVE
      });
      return;
    }

    this.isFromDate();
    this.isToDate();

    this.dateValidate(fromDate);
  }

  private isToDate() {
    if (this.userDetailsLeave.toDate !== null && this.userDetailsLeave.toDate !== undefined) {
      this.isToDateAvailable = true;
    } else {
      this.isToDateAvailable = false;
    }
  }

  private isFromDate() {
    if (this.userDetailsLeave.fromDate !== null && this.userDetailsLeave.fromDate !== undefined) {
      this.isFromDateAvailable = true;
    } else {
      this.isFromDateAvailable = false;
    }
  }

  submitButtonDisable(): boolean {
    if (this.isLeaveTypeDataAvailable && this.isFromDateAvailable && this.isToDateAvailable) {
      return false;
    }
    return true;
  }

  openCancelDialog(userDetailLeave) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.queue([
      {
        title: CANCEL_LEAVE,
        width: '33em',
        background: '#e6f2ff',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonText: 'No',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.userDetailsLeaveService
            .sendCancelLeaveMail(userDetailLeave)
            .toPromise()
            .then(value => {
              this.saveUserDetailHistory(JSON.stringify(this.userDetailsLeave), 'Cancel leave applied');
              Swal.insertQueueStep({
                type: SUCCESS,
                background: '#e6f2ff',
                showConfirmButton: false,
                title: CANCELATION_REQUEST_SENT,
                timer: 2000
              });
            })
            .catch(() => {
              Swal.insertQueueStep({
                background: '#e6f2ff',
                showConfirmButton: true,
                title: UNABLE_SENT_CANCELATION_REQUESTION_HR,
                width: '33em'
              });
            });
        }
      }
    ]);
  }

  saveUserDetailHistory(data: any, action: string) {
    this.userDetailHistoryModel = new UserDetailHistoryModel();
    this.userDetailHistoryModel.email = this.accountService.getEmployeeDetails().email;
    this.userDetailHistoryModel.firstName = this.accountService.getEmployeeDetails().firstName;
    this.userDetailHistoryModel.lastName = this.accountService.getEmployeeDetails().lastName;
    this.userDetailHistoryModel.login = this.accountService.getEmployeeDetails().login;
    this.userDetailHistoryModel.loginTime = moment();
    this.userDetailHistoryModel.visitPage = LEAVE_PAGE;
    if (data !== null) {
      this.userDetailHistoryModel.modifyContent = action + ' , ' + data;
    }
    this.userdetailhistoryService
      .save(this.userDetailHistoryModel)
      .toPromise()
      .then(value => {})
      .catch(reason => {});
  }

  private excludeHolidayFromTotalCount() {
    const totalNoDays = this.getDateArray(this.userDetailsLeave.fromDate, this.userDetailsLeave.toDate);
    this.countWeekend(totalNoDays);
    this.countPublicHolidays(totalNoDays);
    this.userDetailsLeave.totalDays = totalNoDays.length - (this.leavesCount + this.weekEndCount);
  }

  private countPublicHolidays(totalNoDays) {
    this.leavesCount = 0;
    totalNoDays.forEach(value => {
      this.publicHolidays.forEach(value1 => {
        if (value === value1.date) {
          this.leavesCount = this.leavesCount + 1;
        }
      });
    });
  }

  private countWeekend(totalNoDays) {
    this.weekEndCount = 0;
    totalNoDays.forEach((value, index, array) => {
      if (moment(value).day() === 0 || moment(value).day() === 6) {
        this.weekEndCount = this.weekEndCount + 1;
      }
    });
  }
}
