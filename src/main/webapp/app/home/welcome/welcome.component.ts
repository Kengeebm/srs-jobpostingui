import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from 'app/core';
import { EipformService } from 'app/entities/jobPost/eipform/eipform.service';
import { EipForm } from 'app/shared/model/jobPost/eipform.model';
import { Router } from '@angular/router';
import {
  DASHBOARD,
  EDMS,
  EDMS_URL,
  FILL_PROFILE_DETAILS,
  JOB_POST,
  LEAVE_MGT,
  LEAVE_URL,
  REQUEST_MGT,
  REQUEST_URL,
  RESUME_REPO,
  RESUME_REPO_URL,
  ROLE_RECRUITER,
  TIMESHEET,
  TIMESHEET_MANAGEMENT,
  UN_AUTHORIZED_MSG,
  WELCOME,
  ROLE_SUPER_ADMIN,
  ROLE_RECRUITERMANAGER,
  ROLE_HR_MANAGER,
  ERROR,
  ROLE_NETWORK_ADMIN,
  ASSET_INVENTORY
} from 'app/app.constants';
import Swal from 'sweetalert2';
import { GlobalVariableService } from 'app/global-variable.service';
import { NotificationService } from 'app/admin/notification-management/notification-management.service';
import { INotification } from 'app/admin/notification-management/notification-management.model';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private isEngineerAuth: boolean;
  private isRecuriter: boolean;
  private currentAccount: Account;
  private isEmpIdAvailable: boolean;
  private eip: EipForm;
  isRecruiter: boolean;
  edmsUrl: string;
  resumeRepoUrl: string;

  notificationList: INotification[] = [];
  isNetworkAdmin: boolean;

  constructor(
    private accountService: AccountService,
    private eipformService: EipformService,
    private router: Router,
    private globalVariableService: GlobalVariableService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.edmsUrl = EDMS_URL;
    this.resumeRepoUrl = RESUME_REPO_URL;
    this.globalVariableService.setTitle(WELCOME);
    this.isEngineerAuth = false;
    this.isRecuriter = false;
    this.isEmpIdAvailable = false;
    this.isNetworkAdmin = false;

    this.accountService.fetch().subscribe(value => {
      if (value.body) {
        this.currentAccount = value.body;
        this.accountService.authenticate(this.currentAccount);
        this.eipformService.findByEmailId(this.currentAccount.email).subscribe(res => {
          if (res.body) {
            this.eip = res.body;
            this.accountService.setEmployeeDetails(this.eip);
            if (this.accountService.hasAnyAuthority([ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_SUPER_ADMIN])) {
              this.isRecruiter = true;
            }
            if (this.accountService.hasAnyAuthority([ROLE_NETWORK_ADMIN, ROLE_SUPER_ADMIN])) {
              this.isNetworkAdmin = true;
            }
            if (this.eip.empId !== null && this.eip.empId !== '' && this.eip.empId !== undefined) {
              this.isEmpIdAvailable = true;
            } else {
              this.isEmpIdAvailable = false;
            }
          }
        });
      }
    });
    this.getNotificationList();
  }

  getNotificationList() {
    this.notificationService.findLastFive().subscribe(value => {
      this.notificationList = value.body;
    });
  }

  jobPostingUrl(title: string) {
    if (this.accountService.hasAnyAuthority([ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_SUPER_ADMIN])) {
      if (this.isEmpIdAvailable && JOB_POST === title) {
        this.router.navigate(['/', DASHBOARD]);
      } else {
        Swal.fire({ type: ERROR, title: FILL_PROFILE_DETAILS, showConfirmButton: true, background: '#e6f2ff' });
      }
    } else {
      Swal.fire({ type: ERROR, title: UN_AUTHORIZED_MSG, showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  resumeRepositoryUrl(title: string) {
    if (this.accountService.hasAnyAuthority([ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_SUPER_ADMIN])) {
      if (this.isEmpIdAvailable && RESUME_REPO.includes(title)) {
        this.router.navigateByUrl(RESUME_REPO_URL);
      } else {
        Swal.fire({ type: ERROR, title: FILL_PROFILE_DETAILS, showConfirmButton: true, background: '#e6f2ff' });
      }
    } else {
      Swal.fire({ type: ERROR, title: UN_AUTHORIZED_MSG, showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  leaveManagementUrl(title: string) {
    if (this.isEmpIdAvailable && LEAVE_MGT === title) {
      this.router.navigate(['/', LEAVE_URL]);
    } else {
      Swal.fire({ type: ERROR, title: FILL_PROFILE_DETAILS, showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  timesheetMgtUrl(title: string) {
    if (this.isEmpIdAvailable && TIMESHEET_MANAGEMENT === title) {
      this.router.navigate(['/', TIMESHEET]);
    } else {
      Swal.fire({ type: ERROR, title: FILL_PROFILE_DETAILS, showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  edmsValidation(title: string) {
    if (this.accountService.hasAnyAuthority([ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_SUPER_ADMIN, ROLE_HR_MANAGER])) {
      if (this.isEmpIdAvailable && EDMS.includes(title)) {
        this.router.navigateByUrl(EDMS_URL);
      } else {
        Swal.fire({ type: ERROR, title: FILL_PROFILE_DETAILS, showConfirmButton: true, background: '#e6f2ff' });
      }
    } else {
      Swal.fire({ type: ERROR, title: UN_AUTHORIZED_MSG, showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  requestMgtUrl(title: string) {
    if (this.isEmpIdAvailable && REQUEST_MGT === title) {
      this.router.navigate(['/', REQUEST_URL]);
    } else {
      Swal.fire({ type: ERROR, title: FILL_PROFILE_DETAILS, showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  assetInventoryUrl(title: string) {
    this.router.navigateByUrl('/asset-dashboard');
    if (this.accountService.hasAnyAuthority([ROLE_SUPER_ADMIN, ROLE_NETWORK_ADMIN])) {
      if (this.isEmpIdAvailable && ASSET_INVENTORY === title) {
        this.router.navigate(['/', 'asset-dashboard']);
      } else {
        Swal.fire('oops', FILL_PROFILE_DETAILS, 'error');
      }
    } else {
      Swal.fire('oops', UN_AUTHORIZED_MSG, 'error');
    }
  }
}
