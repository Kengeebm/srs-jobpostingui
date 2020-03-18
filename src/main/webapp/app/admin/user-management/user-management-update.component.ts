import { AccountService } from './../../core/auth/account.service';
import { EipForm } from 'app/shared/model/jobPost/eipform.model';
import { SUCCESS } from './../../app.constants';
import { ReportingManagerService } from './../../core/user/reportingmanager.service';
import { IReportingManager } from './../../core/user/reportingmanager.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/user/user.model';
import { UserService } from '../../core/user/user.service';
import Swal from 'sweetalert2';
import { IProject } from 'app/leavemanagement/leave/project.model';
import { ProjectService } from 'app/leavemanagement/leave/project.service';
import { EipformService } from 'app/entities/jobPost/eipform/eipform.service';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
  styleUrls: ['./user-management-update.component.scss']
})
export class UserMgmtUpdateComponent implements OnInit {
  user: User;
  eip: EipForm;
  languages: any[];
  authorities: any[];
  isSaving: boolean;
  modalService: any;
  closeResult: string;
  dataChange: any;
  projectList: IProject[] = [];
  reportingManagerList: IReportingManager[] = [];
  reportingEmailByName: IReportingManager[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private reportingManagerService: ReportingManagerService,
    private eipFormService: EipformService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ user }) => {
      this.user = user.body ? user.body : user;
    });
    this.authorities = [];
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    });
    this.projectService.findAll().subscribe(value => {
      this.projectList = value.body;
    });
    this.reportingManagerService.findAll().subscribe(value => {
      this.reportingManagerList = value.body;
    });
  }

  prevPage() {
    this.router.navigate(['/admin/user-management']);
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

  getDismissReason(reason: any) {
    throw new Error('Method not implemented');
  }

  save() {
    this.isSaving = true;
    this.eip = new EipForm();
    if (this.user.id !== null) {
      this.accountService.fetch().subscribe(
        data => {
          this.eipFormService.findByEmailId(data.body.email).subscribe(value => {
            this.userService.update(this.user).subscribe(response => {
              this.eip = value.body;
              this.eip.email = this.user.email;
              this.eip.firstName = this.user.firstName;
              this.eip.lastName = this.user.lastName;
              this.eip.projectCode = this.user.projectCode;
              this.eip.reportingManagerEmail = this.user.reportingManagerEmail;
              this.eipFormService.update(this.eip).subscribe(value => {});
              this.onSaveSuccess(response);
            });
          });
        },
        () => this.onSaveError()
      );
    } else {
      this.user.langKey = 'en';
      this.userService.create(this.user).subscribe(
        response => {
          this.onSaveSuccess(response);
        },
        () => this.onSaveError()
      );
    }
  }

  private onSaveSuccess(result) {
    this.isSaving = false;
    Swal.fire({
      type: SUCCESS,
      background: '#e6f2ff',
      showConfirmButton: false,
      title: 'Successfully saved',
      timer: 2000
    });
    this.previousState();
  }
  previousState() {
    this.router.navigateByUrl('/admin/user-management');
    throw new Error('Method not implemented');
  }

  private onSaveError() {
    this.isSaving = false;
  }

  getReportingManagerEmail(name: string) {
    this.reportingManagerService.findEmailByName(name).subscribe(value => {
      this.reportingEmailByName = value.body;
      this.user.reportingManagerEmail = this.reportingEmailByName[0].reportingManagerEmail;
    });
  }
}
