import { SUCCESS, ERROR } from './../../../app.constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { EipformService } from 'app/entities/jobPost/eipform/eipform.service';
import { EipForm, IEForm } from 'app/shared/model/jobPost/eipform.model';
import { Account, AccountService } from 'app/core';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../../../global-variable.service';
import { EIP_TITLE, PROFILE_PAGE, EMPLOYEE_UPDATE_MSG, ENTER_EMP_ID } from 'app/app.constants';
import Swal from 'sweetalert2';
import { IPosition } from 'app/shared/model/jobPost/position.model';
import { IWorklocation } from 'app/shared/model/jobPost/worklocation.model';
import { ModalDismissReasons, NgbModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { IUserDetailHistoryModel, UserDetailHistoryModel } from 'app/home/user-detail-history.model';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';
import moment = require('moment');

@Component({
  selector: 'jhi-eipform',
  templateUrl: './eipform.component.html',
  styleUrls: ['./eipform.component.scss']
})
export class EipformComponent implements OnInit {
  isEditable: boolean;
  isEmployeeIdEditable: boolean;
  disableBtn: boolean;
  eip: IEForm;
  currentAccount: Account;
  isEmpIdAvailable: boolean;
  positions: IPosition[] = [];
  locations: IWorklocation[] = [];
  closeResult: string;
  dataChange: boolean;
  private userDetailHistoryModel: IUserDetailHistoryModel;
  eip_form: any;

  constructor(
    private fb: FormBuilder,
    private eipformService: EipformService,
    private accountService: AccountService,
    private router: Router,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private userdetailhistoryService: UserdetailhistoryService,
    private config: NgbDatepickerConfig
  ) {
    this.eip_form = fb.group({
      phone: [null, Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      experience: [null, Validators.compose([Validators.pattern(/^(\d{1,2}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])]
    });
    const currentDate = new Date();
    config.maxDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    };
  }

  ngOnInit() {
    this.dataChange = false;
    this.eipformService.findPosition().subscribe(value => {
      this.positions = value.body;
    });
    this.eipformService.findWorkLocation().subscribe(value => {
      this.locations = value.body;
    });
    this.globalVariableService.setTitle(EIP_TITLE);
    this.isEmpIdAvailable = false;
    this.isEmployeeIdEditable = false;
    this.isEditable = false;
    this.disableBtn = true;
    this.eip = new EipForm();
    if (this.eip.email === undefined || this.eip.email === null) {
      this.accountService.fetch().subscribe(value => {
        if (value.body) {
          this.currentAccount = value.body;
          this.eip.email = this.currentAccount.email;
          this.eip.firstName = this.currentAccount.firstName;
          this.eip.lastName = this.currentAccount.lastName;
          this.eip.reportingManagerEmail = this.currentAccount.reportingManagerEmail;
          this.eip.projectCode = this.currentAccount.projectCode;
          this.eip.notificationTo = this.currentAccount.notificationTo;
          this.saveUserDetailHistory(null);
          this.eipformService.findByEmailId(this.eip.email).subscribe(res => {
            if (res.body) {
              this.eip = res.body;
              if (this.eip.empId !== null && this.eip.projectCode !== null) {
                this.isEmpIdAvailable = true;
              } else {
                this.isEmpIdAvailable = false;
              }
            }
          });
        }
      });
    }
  }

  forEdit() {
    this.isEditable = true;
    this.disableBtn = false;
    if (this.isEmpIdAvailable) {
      this.isEmployeeIdEditable = false;
    } else {
      this.isEmployeeIdEditable = true;
    }
  }

  update() {
    this.markFormTouched(this.eip_form);
    if (this.eip_form.valid) {
      const formValues = this.eip_form.getRawValue;
      this.eipformService.update(this.eip).subscribe(value => {
        if (value.body) {
          this.eip.email = this.currentAccount.email;
          this.eip.firstName = this.currentAccount.firstName;
          this.eip.lastName = this.currentAccount.lastName;
          this.eip.reportingManagerEmail = this.currentAccount.reportingManagerEmail;
          this.eip = value.body;
          this.saveUserDetailHistory(JSON.stringify(this.eip));
          if (this.eip.empId !== undefined && this.eip.empId !== null && this.eip.projectCode !== null) {
            this.isEmpIdAvailable = true;
            Swal.fire({ type: SUCCESS, title: EMPLOYEE_UPDATE_MSG, showConfirmButton: false, timer: 2000, background: '#e6f2ff' });
            this.router.navigate(['/welcome']);
          } else {
            this.isEmpIdAvailable = false;
            Swal.fire({ type: ERROR, title: ENTER_EMP_ID, showConfirmButton: true, background: '#e6f2ff' });
          }
        } else {
          this.eip_form.controls['terms'].setValue(false);
        }
      });
    }
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) {
        control.markAsTouched();
        this.markFormTouched(control);
      } else {
        control.markAsTouched();
      }
    });
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
  }

  private saveUserDetailHistory(data: any) {
    this.userDetailHistoryModel = new UserDetailHistoryModel();
    this.userDetailHistoryModel.email = this.currentAccount.email;
    this.userDetailHistoryModel.firstName = this.currentAccount.firstName;
    this.userDetailHistoryModel.lastName = this.currentAccount.lastName;
    this.userDetailHistoryModel.login = this.currentAccount.login;
    this.userDetailHistoryModel.loginTime = moment();
    this.userDetailHistoryModel.visitPage = PROFILE_PAGE;
    if (data !== null) {
      this.userDetailHistoryModel.modifyContent = ' profile updated ' + data;
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
