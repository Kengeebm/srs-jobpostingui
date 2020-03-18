import { Subscription } from 'rxjs';
import { IUserDetailsLeave } from './../../leavemanagement/leave/UserDetailsLeave.model';
import { DatePipe } from '@angular/common';
import { UserDetailsLeaveService } from './../../leavemanagement/leave/UserDetailsLeave.service';
import { IUnfreezedList, UnfreezedList } from '../../../app/shared/model/EIP/unfreezedlist.model';
import { Component, OnInit } from '@angular/core';
import { ITimesheet, Timesheet } from './../../shared/model/EIP/timesheet.model';
import { TimesheetService } from './../timesheet.service';
import { Account, AccountService } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GlobalVariableService } from 'app/global-variable.service';
import { IPublicHolidays } from 'app/leavemanagement/leave/publicHolidays.model';
import { PublicHolidaysService } from 'app/leavemanagement/leave/publicHolidays.service';
import { TimeSheetApprovalService } from '../timesheetapproval/timesheetapprovalservice';
import { IStatus } from 'app/shared/model/EIP/status.model';
import { TimesheetDateStatus } from 'app/shared/model/EIP/timesheet-date-status.model';
import { IUserDetailHistoryModel, UserDetailHistoryModel } from 'app/home/user-detail-history.model';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';
import moment = require('moment');
import { EipForm } from 'app/shared/model/jobPost/eipform.model';
import { EipformService } from 'app/entities/jobPost/eipform/eipform.service';
import {
  PRESENT,
  HOLIDAY,
  WORKFROMHOME,
  WORKFROMCLIENTLOCATION,
  COMPOFF,
  TIMESHEET_MANAGEMENT,
  DATE_FORMAT_YYYY_MM_DD,
  SAVED_SUCCESS_MSG,
  DATA_IS_NOT_SAVED_MSG,
  PENDING,
  SL,
  CL,
  SUCCESS,
  TIMESHEET_TITLE,
  APPROVED
} from 'app/app.constants';

@Component({
  selector: 'jhi-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  private currentAccount: Account;
  private timesheets: ITimesheet;
  startDate: any = new Date();
  submittedDate: any;
  fromDate: Date;
  endDate: Date;
  present: any = PRESENT;
  holiday: any = HOLIDAY;
  wfh: any = WORKFROMHOME;
  wcl: any = WORKFROMCLIENTLOCATION;
  co: any = COMPOFF;
  message: any = '';
  totalNoDays: any;
  isSaveDisable: any = false;
  isTimeSheetFilledDisable: any = true;
  dateCounter: Date;
  counter: any = 0;
  currentPayroll: any;
  payrollStartDate: any = 21;
  payrollEndDate: any = 20;
  payrolls: String[] = [];
  monthNo: any = this.startDate.getMonth();
  private publicHolidays: IPublicHolidays[];
  closeResult: string;
  isSaveSubmitDisable: any;
  statusProperty: IStatus[] = [];
  presentCount: any;
  officialHoliday: any;
  workFromHomeCount: any;
  workFromClientLocationCount: any;
  compOffCount: any;
  leavesCount: any;
  dataChange: boolean;
  unfreeze: boolean;
  unfreezeddata: IUnfreezedList;
  unfreezedList: IUnfreezedList[];
  timesheetData: ITimesheet[];
  private userDetailHistoryModel: IUserDetailHistoryModel;
  projectCodeDetail: any;
  eip: EipForm;
  dataSource: IUserDetailsLeave[] = [];
  conditionCheck: boolean;
  public subscriptions: Subscription[] = [];

  constructor(
    private publicHolidaysService: PublicHolidaysService,
    private modalService: NgbModal,
    private service: TimesheetService,
    private accountService: AccountService,
    private globalVariableService: GlobalVariableService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private approvalService: TimeSheetApprovalService,
    private userdetailhistoryService: UserdetailhistoryService,
    private timeSheetService: TimesheetService,
    private eipformService: EipformService,
    private userDetailsLeaveService: UserDetailsLeaveService,
    private datePipe: DatePipe
  ) {
    this.userAccountDetails();
    this.isTimeSheetFilledDisabled();
    this.globalVariableService.setTitle(TIMESHEET_MANAGEMENT);
    this.totalNoDays = 32 - new Date(this.startDate.getFullYear(), this.monthNo - 1, 32).getDate();
    this.payrolls = moment.months();
    this.currentPayroll = this.payrolls[this.monthNo] + ' ' + this.startDate.getFullYear();

    const currentDate = moment();
    this.fromDate = new Date(currentDate.year(), currentDate.month(), 1);
    this.endDate = new Date(currentDate.year(), currentDate.month(), currentDate.daysInMonth());
    this.isSaveDisabled(currentDate);
  }

  ngOnInit() {
    this.saveUserDetailHistory(null, null);
    this.unfreeze = true;
    this.isSaveSubmitDisable = true;
    this.dataChange = false;
  }

  private isTimeSheetFilledDisabled() {
    if (new Date().getDate() >= 1 && new Date().getDate() <= 26) {
      this.isTimeSheetFilledDisable = false;
    }
  }

  private isSaveDisabled(currentDate) {
    if (currentDate.date() >= 27 && currentDate.date() <= moment(currentDate.date()).daysInMonth()) {
      this.isSaveDisable = true;
    }
  }

  private findStatus() {
    this.service.findStatus().subscribe(value => {
      this.statusProperty = value.body;
    });
  }

  private setUnfreez(isUnfreeze: boolean) {
    this.unfreeze = isUnfreeze;
  }

  private userLeaveDetails() {
    this.userDetailsLeaveService.findByIdAndStatusLeaveList(this.accountService.getEmployeeDetails().empId, [APPROVED]).subscribe(value => {
      this.dataSource = value.body;
    });
  }

  private getPublicHolidays() {
    this.publicHolidaysService.findAllByProjectCode(this.projectCodeDetail).subscribe(value => {
      this.publicHolidays = value.body;
    });
  }

  private userAccountDetails() {
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.eipformService.findByEmailId(this.currentAccount.email).subscribe(res => {
          if (res.body) {
            this.eip = res.body;
            this.accountService.setEmployeeDetails(this.eip);
            this.userLeaveDetails();
            this.findStatus();
            this.findBetweenDate();
            this.projectCodeDetail = this.eip.projectCode;
            this.getPublicHolidays();
          }
        });
      }
    });
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

  getData() {
    this.monthNo = this.startDate.getMonth();
    this.currentPayroll = this.payrolls[this.monthNo] + ' ' + this.startDate.getFullYear();
    let date = this.payrollStartDate;
    this.timesheets.employeeId = this.accountService.getEmployeeDetails().empId;
    this.timesheets.emailId = this.accountService.getEmployeeDetails().email;
    this.timesheets.userName = this.accountService.getEmployeeDetails().firstName + ' ' + this.accountService.getEmployeeDetails().lastName;
    for (let i = 0; i < this.totalNoDays; i++) {
      const timeSheetDateStatus = new TimesheetDateStatus();
      this.dateCounter = new Date(this.startDate.getFullYear(), this.monthNo - 1, date);
      date++;

      if (this.dateCounter.getDay() === 6 || this.dateCounter.getDay() === 0) {
        timeSheetDateStatus.date = moment(this.dateCounter);
        timeSheetDateStatus.status = 'Holiday';
        timeSheetDateStatus.leaveDay = false;
        this.timesheets.timeSheetDateStatusList.push(timeSheetDateStatus);
      } else if (this.dateCounter.getDay() > 0 && this.dateCounter.getDay() < 6) {
        const latest_date = this.datePipe.transform(this.dateCounter, 'yyyy-MM-dd');
        outerloop: for (let x = 0; x < this.dataSource.length; x++) {
          const startDate = this.dataSource[x].fromDate;
          const endDate = this.dataSource[x].toDate;
          const allLeaveDays = this.getDateArray(startDate, endDate);
          const leaveType = this.dataSource[x].leaveType;
          if (allLeaveDays.includes(latest_date)) {
            this.conditionCheck = true;
            timeSheetDateStatus.date = moment(latest_date);
            timeSheetDateStatus.status = leaveType;
            timeSheetDateStatus.leaveDay = true;
            this.timesheets.timeSheetDateStatusList.push(timeSheetDateStatus);
            break outerloop;
          } else {
            timeSheetDateStatus.leaveDay = false;
            this.conditionCheck = false;
          }
        }
        if (!this.conditionCheck) {
          timeSheetDateStatus.date = moment(latest_date);
          timeSheetDateStatus.status = 'Present';
          timeSheetDateStatus.leaveDay = false;
          this.timesheets.timeSheetDateStatusList.push(timeSheetDateStatus);
        }
      }
    }
  }

  findBetweenDate() {
    this.currentPayroll = this.payrolls[this.monthNo] + ' ' + this.startDate.getFullYear();
    this.service
      .findTimeSheet(
        moment(this.fromDate).format('YYYY-MM-DD'),
        moment(this.endDate).format('YYYY-MM-DD'),
        this.accountService.getEmployeeDetails().empId
      )
      .subscribe(res => {
        this.timesheets = res.body;
        if (res.body !== null) {
          for (let w = 0; w < this.timesheets.timeSheetDateStatusList.length; w++) {
            const latest_date = this.datePipe.transform(this.timesheets.timeSheetDateStatusList[w].date, 'yyyy-MM-dd');
            outerloop: for (let x = 0; x < this.dataSource.length; x++) {
              const startDate = this.dataSource[x].fromDate;
              const endDate = this.dataSource[x].toDate;
              const allLeaveDays = this.getDateArray(startDate, endDate);
              if (allLeaveDays.includes(latest_date)) {
                this.timesheets.timeSheetDateStatusList[w].leaveDay = true;
                break outerloop;
              }
            }
          }
        }
        if (this.timesheets === null || this.timesheets === '' || this.timesheets === undefined) {
          this.timesheets = new Timesheet();
          this.timesheets.timeSheetDateStatusList = [];
        }
        if (
          this.timesheets.timeSheetDateStatusList !== null &&
          this.timesheets.timeSheetDateStatusList.length === 0 &&
          this.monthNo === this.startDate.getMonth()
        ) {
          if (new Date().getDate() >= 1 && new Date().getDate() <= 26) {
            this.setUnfreez(true);
          }
          this.getData();
          this.isSaveDisabled(moment());
        } else {
          if (
            new Date().getDate() >= 1 &&
            new Date().getDate() <= 26 &&
            (this.timesheets.approveStatus === PENDING || this.timesheets.approveStatus === APPROVED)
          ) {
            this.setUnfreez(false);
            this.isTimeSheetFilledDisable = true;
            this.isSaveDisable = true;
            this.isSaveSubmitDisable = true;
          }
        }
      });
  }

  // previousMonth() {
  //   if (this.monthNo > 0) {
  //     this.isSaveDisable = true;
  //     this.timesheets = new Timesheet();
  //     this.timesheets.timeSheetDateStatusList = [];
  //     this.monthNo = this.monthNo - 1;
  //     this.findBetweenDate();
  //   }
  // }

  // nextMonth() {
  //   this.monthNo = this.monthNo + 1;
  //   if (this.monthNo <= this.startDate.getMonth() - 1) {
  //     this.timesheets = new Timesheet();
  //     this.timesheets.timeSheetDateStatusList = [];
  //     this.isSaveDisable = true;
  //     this.findBetweenDate();
  //   }
  //   if (this.monthNo === this.startDate.getMonth()) {
  //     this.timesheets = new Timesheet();
  //     this.timesheets.timeSheetDateStatusList = [];
  //     this.isSaveDisable = true;
  //     this.findBetweenDate();
  //     this.currentPayroll = this.payrolls[this.monthNo] + ' ' + this.startDate.getFullYear();
  //   }
  //   if (this.monthNo > this.startDate.getMonth()) {
  //     this.monthNo = this.monthNo - 1;
  //   }
  // }

  onSave(isMail: boolean) {
    this.modalService.dismissAll();
    this.timesheets.saveDate = moment();
    this.service.create(this.timesheets).subscribe(res => {
      this.timesheets = res.body;

      for (let w = 0; w < this.timesheets.timeSheetDateStatusList.length; w++) {
        const latest_date = this.datePipe.transform(this.timesheets.timeSheetDateStatusList[w].date, 'yyyy-MM-dd');
        outerloop: for (let x = 0; x < this.dataSource.length; x++) {
          const startDate = this.dataSource[x].fromDate;
          const endDate = this.dataSource[x].toDate;
          const allLeaveDays = this.getDateArray(startDate, endDate);
          if (allLeaveDays.includes(latest_date)) {
            this.timesheets.timeSheetDateStatusList[w].leaveDay = true;
            break outerloop;
          }
        }
      }
      this.saveUserDetailHistory(JSON.stringify(this.timesheets), 'timesheet saved');
      if (this.timesheets !== null || this.timesheets !== '' || this.timesheets !== undefined) {
        this.saveMsgShow(isMail);
      } else {
        this.timesheets = new Timesheet();
        this.timesheets.timeSheetDateStatusList = [];
      }
      this.saveMsgShow(isMail);
    });
    this.isSaveDisable = true;
    this.dataChange = false;
  }

  private saveMsgShow(isMail: boolean) {
    if (this.timesheets.timeSheetDateStatusList.length > 0) {
      if (!isMail) {
        this.isSaveSubmitDisable = false;
        Swal.fire({ title: SAVED_SUCCESS_MSG, background: '#e6f2ff', showConfirmButton: true });
      }
    } else {
      Swal.fire({ title: DATA_IS_NOT_SAVED_MSG, background: '#e6f2ff', showConfirmButton: true });
    }
  }

  prevPage() {
    this.router.navigate(['/welcome']);
    this.modalService.dismissAll();
  }

  onBackButtonEvent(content) {
    this.leavesCount = 0;
    this.presentCount = 0;
    this.officialHoliday = 0;
    if (this.dataChange) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
      this.isSaveSubmitDisable = false;
    } else {
      this.prevPage();
    }
  }

  submitTimesheet(content) {
    this.leavesCount = 0;
    this.presentCount = 0;
    this.officialHoliday = 0;
    this.workFromHomeCount = 0;
    this.workFromClientLocationCount = 0;
    this.compOffCount = 0;
    this.isSaveDisable = true;
    this.isSaveSubmitDisable = false;

    for (let i = 0; i < this.timesheets.timeSheetDateStatusList.length; i++) {
      if (this.timesheets.timeSheetDateStatusList[i].status === SL || this.timesheets.timeSheetDateStatusList[i].status === CL) {
        this.leavesCount = this.leavesCount + 1;
      }
      if (this.timesheets.timeSheetDateStatusList[i].status === HOLIDAY) {
        this.officialHoliday = this.officialHoliday + 1;
      }
      if (this.timesheets.timeSheetDateStatusList[i].status === PRESENT) {
        this.presentCount = this.presentCount + 1;
      }
      if (this.timesheets.timeSheetDateStatusList[i].status === WORKFROMHOME) {
        this.workFromHomeCount = this.workFromHomeCount + 1;
      }
      if (this.timesheets.timeSheetDateStatusList[i].status === WORKFROMCLIENTLOCATION) {
        this.workFromClientLocationCount = this.workFromClientLocationCount + 1;
      }
      if (this.timesheets.timeSheetDateStatusList[i].status === COMPOFF) {
        this.compOffCount = this.compOffCount + 1;
      }
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

    this.dataChange = false;
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

  mailSend(isMail: boolean) {
    this.timesheets.approveStatus = PENDING;
    this.timesheets.submitDate = moment();
    this.timesheets.submitTime = moment().format('HH:mm a');
    this.timesheets.noWorkingDays = this.presentCount;
    this.timesheets.noWorkFromHome = this.workFromHomeCount;
    this.timesheets.noWorkFromClientLocation = this.workFromClientLocationCount;
    this.timesheets.noCompOff = this.compOffCount;
    this.timesheets.noLeaves = this.leavesCount;
    this.onSave(isMail);
    const startDate = new Date(this.startDate.getFullYear(), this.monthNo - 1, this.payrollStartDate);
    const endDate = new Date(this.startDate.getFullYear(), this.monthNo, this.payrollEndDate);
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.service
          .exportasMail(
            startDate,
            endDate,
            this.timesheets.id,
            this.currentAccount.email,
            this.currentAccount.login,
            this.currentAccount.firstName,
            this.currentAccount.lastName
          )
          .subscribe(res => {
            this.saveUserDetailHistory('Mail sent from Date is ' + startDate + ' to ' + endDate, null);
            this.isSaveSubmitDisable = true;
            this.isTimeSheetFilledDisable = true;
            this.unfreeze = false;
            Swal.fire({ type: SUCCESS, background: '#e6f2ff', showConfirmButton: false, timer: 2000, title: res.message });
          });
      }
    });
  }

  changes() {
    this.dataChange = true;
  }

  onUnfreeze() {
    this.unfreezeddata = new UnfreezedList();
    this.unfreezeddata.employeeId = this.timesheets.employeeId;
    this.unfreezeddata.userName = this.timesheets.userName;
    this.unfreezeddata.submitDate = moment();
    this.unfreezeddata.submitTime = moment().format('HH:mm a');

    this.timeSheetService.createUnfreezedList(this.unfreezeddata).subscribe(value => {
      this.unfreezeddata = value.body;
    });

    const startDate = new Date(this.startDate.getFullYear(), this.monthNo - 1, this.payrollStartDate);
    const endDate = new Date(this.startDate.getFullYear(), this.monthNo, this.payrollEndDate);
    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.service
          .unfreeTimeSendMail(startDate, endDate, this.timesheets.id, this.currentAccount.email, this.currentAccount.login)
          .subscribe(res => {
            this.saveUserDetailHistory('OnUnfreeze Applied from' + startDate + ' to ' + endDate, null);
            Swal.fire({ type: SUCCESS, background: '#e6f2ff', showConfirmButton: false, timer: 2000, title: res.message });
          });
      }
    });
  }

  NoOption(modal: any) {
    modal.dismiss('Cross click');
    this.isSaveDisable = false;
  }

  private saveUserDetailHistory(data: any, action: string) {
    this.userDetailHistoryModel = new UserDetailHistoryModel();
    this.userDetailHistoryModel.email = this.accountService.getEmployeeDetails().email;
    this.userDetailHistoryModel.firstName = this.accountService.getEmployeeDetails().firstName;
    this.userDetailHistoryModel.lastName = this.accountService.getEmployeeDetails().lastName;
    this.userDetailHistoryModel.login = this.accountService.getEmployeeDetails().login;
    this.userDetailHistoryModel.loginTime = moment();
    this.userDetailHistoryModel.visitPage = TIMESHEET_TITLE;
    if (data !== null) {
      this.userDetailHistoryModel.modifyContent = action + ' , ' + data;
    }
    this.userdetailhistoryService
      .save(this.userDetailHistoryModel)
      .toPromise()
      .then(value => {
        console.log('user history saved');
      })
      .catch(reason => {
        console.log('user history not saved reason :' + reason);
      });
  }
}
