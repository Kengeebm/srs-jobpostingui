import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core';
import { PasswordService } from './password.service';
import { GlobalVariableService } from 'app/global-variable.service';
import { WELCOME } from 'app/app.constants';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'jhi-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  doNotMatch: string;
  error: string;
  success: string;
  account: any;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  modalService: any;
  dataChange: any;
  closeResult: string;

  constructor(
    private passwordService: PasswordService,
    private accountService: AccountService,
    private globalVariableService: GlobalVariableService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.globalVariableService.setTitle('PASSWORD');
    this.accountService.identity().then(account => {
      this.account = account;
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
  getDismissReason(reason: any) {
    throw new Error("Method not implemented.");
  }
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = null;
      this.success = null;
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.passwordService.save(this.newPassword, this.currentPassword).subscribe(
        () => {
          this.error = null;
          this.success = 'OK';
        },
        () => {
          this.success = null;
          this.error = 'ERROR';
        }
      );
    }
  }
}

